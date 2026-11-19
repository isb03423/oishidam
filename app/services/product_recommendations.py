from collections import defaultdict
from math import sqrt
from urllib.parse import urlsplit

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

from database import query_df


CATALOG = """
WITH RECURSIVE visible_categories AS (
    SELECT category_id, name FROM categories WHERE parent_id IS NULL AND is_active
    UNION ALL
    SELECT child.category_id, child.name
    FROM categories child JOIN visible_categories parent ON child.parent_id = parent.category_id
    WHERE child.is_active
)
SELECT p.product_id, p.category_id, p.name,
       p.price, p.published_at, s.stock_quantity,
       LEFT(p.description, 1000) AS description, c.name AS category,
       (p.sale_status = 'ON_SALE' AND s.stock_quantity > 0
        AND p.published_at <= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul')) IS TRUE AS available
FROM products p
JOIN visible_categories c ON c.category_id = p.category_id
LEFT JOIN product_stock s ON s.product_id = p.product_id
WHERE p.deleted_at IS NULL
"""

PRODUCT_SUMMARIES = f"""
SELECT p.product_id, p.category_id, p.name, p.price, p.published_at,
       p.stock_quantity, image.storage_key, image.alt_text
FROM ({CATALOG}) p
LEFT JOIN product_images image ON image.product_id = p.product_id AND image.is_primary
WHERE p.available AND p.product_id = ANY(:product_ids)
"""

# PostgreSQL의 활동 시각은 한국 시간 기준 timestamp without time zone이다.
INTERESTS = """
SELECT product_id, 1.0 AS base_weight,
       EXTRACT(EPOCH FROM ((CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul') - created_at)) / 86400.0 AS age_days
FROM wish_items WHERE member_id = :member_id
UNION ALL
SELECT product_id, 2.0 AS base_weight,
       EXTRACT(EPOCH FROM ((CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul')
           - COALESCE(updated_at, created_at))) / 86400.0 AS age_days
FROM cart_items WHERE member_id = :member_id
"""

RECENCY_HALF_LIFE_DAYS = 30.0


def recency_weight(age_days: float) -> float:
    """최근 활동의 영향력을 높이고, 30일마다 절반으로 감쇠한다."""
    return 2.0 ** (-max(float(age_days), 0.0) / RECENCY_HALF_LIFE_DAYS)


PURCHASES = """
WITH target AS (
    SELECT birth_year, gender,
           EXTRACT(YEAR FROM CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul')::integer AS current_year
    FROM members WHERE member_id = :member_id
)
SELECT o.member_id, i.product_id, SUM(i.quantity) AS quantity,
       EXTRACT(EPOCH FROM ((CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul')
           - MAX(o.created_at))) / 86400.0 AS age_days,
       (o.member_id <> :member_id AND m.gender = target.gender
        AND m.birth_year BETWEEN 1900 AND target.current_year
        AND target.birth_year BETWEEN 1900 AND target.current_year
        AND (target.current_year - m.birth_year) / 10
            = (target.current_year - target.birth_year) / 10) IS TRUE AS same_group
FROM orders o JOIN order_items i ON i.order_id = o.order_id
JOIN members m ON m.member_id = o.member_id
CROSS JOIN target
WHERE o.order_status IN ('PAID', 'PREPARING', 'INTERNATIONAL_SHIPPING',
                         'CUSTOMS_CLEARANCE', 'DOMESTIC_SHIPPING', 'DELIVERED')
  AND m.is_active AND m.role = 'USER'
  AND o.created_at >= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul') - INTERVAL '180 days'
GROUP BY o.member_id, i.product_id, same_group
"""


def recommend_products(member_id: int, limit: int) -> dict:
    """찜·장바구니·구매 이력과 활동 시점을 바탕으로 추천 순위 계산"""
    # 1. 노출 가능한 카테고리의 상품 조회
    catalog = query_df(CATALOG)
    if not catalog["available"].any():
        return {"recommendationType": "DEFAULT", "productIds": []}

    # 2. 현재 찜·장바구니와 최근 180일 구매 내역 수집
    params = {"member_id": member_id}
    interest_df = query_df(INTERESTS, params)
    purchase_df = query_df(PURCHASES, params)

    purchases = defaultdict(dict)
    group_sales = defaultdict(float)
    overall_sales = defaultdict(float)
    for row in purchase_df.itertuples(index=False):
        freshness = recency_weight(row.age_days)
        purchases[row.member_id][row.product_id] = freshness
        overall_sales[row.product_id] += row.quantity * freshness
        if row.same_group:
            group_sales[row.product_id] += row.quantity * freshness

    # 3. 찜 1, 장바구니 2, 구매 3에 최근 활동 가중치를 곱해 합산
    # 수량은 개인 취향에 반영하지 않아 대량 구매/장바구니 담기의 영향을 제한한다.
    own_purchases = purchases.get(member_id, {})
    weights = defaultdict(float)
    for row in interest_df.itertuples(index=False):
        weights[row.product_id] += float(row.base_weight) * recency_weight(row.age_days)
    for product_id, freshness in own_purchases.items():
        weights[product_id] += 3.0 * freshness

    # 4. 콘텐츠 유사도와 구매 패턴 점수를 합산해 개인화 순위 계산
    content = content_scores(catalog, weights)
    collaborative = collaborative_scores(purchases, member_id)
    available = [
        int(product_id)
        for product_id in catalog.loc[catalog["available"], "product_id"]
        if product_id not in weights
    ]
    scores = {
        product: 0.65 * content.get(product, 0) + 0.35 * collaborative.get(product, 0)
        for product in available
    }
    personalized = sorted(
        (product for product in available if scores[product] > 0),
        key=lambda product: (-scores[product], product),
    )[:limit]

    # 5. 남은 자리는 같은 연령대·성별 고객의 최근 가중 판매 수량 순으로 채움
    selected = set(personalized)
    demographic = sorted(
        (product for product in available if product in group_sales and product not in selected),
        key=lambda product: (-group_sales[product], product),
    )[: limit - len(personalized)]

    # 6. 연령·성별과 무관하게 전체 고객의 최근 가중 판매 수량으로 보충
    selected.update(demographic)
    popular = sorted(
        (product for product in available if product in overall_sales and product not in selected),
        key=lambda product: (-overall_sales[product], product),
    )[: limit - len(selected)]

    # 7. 구매 데이터도 부족하면 공개된 최신 상품부터 보충한다.
    selected.update(popular)
    newest = [
        int(product)
        for product in catalog.sort_values(
            ["published_at", "product_id"], ascending=[False, False], na_position="last",
        )["product_id"]
        if product in available and product not in selected
    ][: limit - len(selected)]

    recommendation_type = "DEFAULT"
    if demographic:
        recommendation_type = "PERSONALIZED_WITH_DEMOGRAPHIC" if personalized else "DEMOGRAPHIC"
    elif personalized:
        recommendation_type = "PERSONALIZED"
    if popular or newest:
        stages = sum(bool(items) for items in (personalized, demographic, popular, newest))
        recommendation_type = "MIXED" if stages > 1 else ("POPULAR" if popular else "NEW")
    return {
        "recommendationType": recommendation_type,
        "productIds": personalized + demographic + popular + newest,
    }


def product_summaries(product_ids: list[int]) -> list[dict]:
    """구매 가능한 상품 정보를 추천 순서대로 반환"""
    if not product_ids:
        return []

    rows = query_df(PRODUCT_SUMMARIES, {"product_ids": product_ids})
    products = {}
    for row in rows.itertuples(index=False):
        image_url = None
        if row.storage_key:
            try:
                url = urlsplit(row.storage_key)
                if url.scheme == "https" and url.hostname and url.username is None:
                    image_url = row.storage_key
            except ValueError:
                pass
        products[row.product_id] = {
            "productId": row.product_id,
            "categoryId": row.category_id,
            "name": row.name,
            "price": int(row.price),
            "publishedAt": row.published_at.isoformat(),
            "stockQuantity": int(row.stock_quantity),
            "isSoldOut": False,
            "primaryImage": {"imageUrl": image_url, "altText": row.alt_text} if image_url else None,
        }
    return [products[product_id] for product_id in product_ids if product_id in products]


def content_scores(catalog: pd.DataFrame, weights: dict[int, float]) -> dict[int, float]:
    """상품 텍스트의 TF-IDF 벡터를 이용한 콘텐츠 유사도 계산"""
    ids = catalog["product_id"].tolist()
    seeds = [index for index, product in enumerate(ids) if product in weights]
    if not seeds:
        return {}

    # 한국어와 일본어 상품명을 형태소 분석 없이 비교하도록 문자 단위로 벡터화
    description = catalog["description"].str.replace(r"<[^>]+>", " ", regex=True)
    documents = catalog["name"] + " " + catalog["category"] + " " + description
    vectors = TfidfVectorizer(analyzer="char", ngram_range=(2, 3), max_features=50_000).fit_transform(documents)
    seed_weights = np.array([weights[ids[index]] for index in seeds])
    profile = vectors[seeds].T @ (seed_weights / seed_weights.sum())
    scores = vectors @ profile
    # 유사도가 낮은 상품은 제외해 연령대·성별 추천이 들어갈 자리를 확보
    return {product: score for product, score in zip(ids, scores) if score >= 0.05}


def collaborative_scores(purchases: dict, member_id: int) -> dict[int, float]:
    """구매 상품이 비슷한 고객을 기준으로 협업 필터링 점수 계산"""
    own = purchases.get(member_id, {})
    if not own:
        return {}

    # 구매 수량 대신 활동 시점 가중치로 코사인 유사도를 계산한다.
    own_norm = sqrt(sum(weight ** 2 for weight in own.values()))
    neighbors = []
    for user, history in purchases.items():
        if user == member_id:
            continue
        common = sum(own[product] * history[product] for product in own.keys() & history.keys())
        if common:
            similarity = common / (own_norm * sqrt(sum(weight ** 2 for weight in history.values())))
            neighbors.append((similarity, user))

    scores = defaultdict(float)
    # 구매 패턴이 가장 비슷한 고객 30명의 미구매 상품에 점수 합산
    nearest = sorted(neighbors, reverse=True)[:30]
    total = sum(similarity for similarity, _ in nearest)
    for similarity, user in nearest:
        for product in purchases[user].keys() - own.keys():
            scores[product] += similarity * purchases[user][product] / total
    return scores
