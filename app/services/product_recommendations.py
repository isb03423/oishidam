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
SELECT p.product_id, p.category_id, p.name, COALESCE(p.brand, '') AS brand,
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
SELECT p.product_id, p.category_id, p.name, p.brand, p.price, p.published_at,
       p.stock_quantity, image.storage_key, image.alt_text
FROM ({CATALOG}) p
LEFT JOIN product_images image ON image.product_id = p.product_id AND image.is_primary
WHERE p.available AND p.product_id = ANY(:product_ids)
"""

PURCHASES = """
WITH target AS (
    SELECT birth_year, gender,
           EXTRACT(YEAR FROM CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Seoul')::integer AS current_year
    FROM members WHERE member_id = :member_id
)
SELECT o.member_id, i.product_id, SUM(i.quantity) AS quantity,
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
    """찜과 구매 이력을 바탕으로 추천 상품 순위 계산"""
    # 1. 노출 가능한 카테고리의 상품 조회
    catalog = query_df(CATALOG)
    if not catalog["available"].any():
        return {"recommendationType": "DEFAULT", "productIds": []}

    # 2. 찜과 최근 180일 구매 내역 수집
    params = {"member_id": member_id}
    wish_df = query_df(
        "SELECT product_id FROM wish_items WHERE member_id = :member_id",
        params,
    )
    purchase_df = query_df(PURCHASES, params)

    purchases = defaultdict(dict)
    group_sales = defaultdict(int)
    for row in purchase_df.itertuples(index=False):
        purchases[row.member_id][row.product_id] = row.quantity
        if row.same_group:
            group_sales[row.product_id] += row.quantity

    # 3. 찜보다 구매 이력에 높은 가중치 부여
    own_purchases = purchases.get(member_id, {})
    weights = dict.fromkeys(wish_df["product_id"], 1.0)
    for product_id in own_purchases:
        weights[product_id] = weights.get(product_id, 0) + 2.0

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

    # 5. 남은 자리는 같은 연령대·성별 고객의 판매 수량 순으로 채움
    selected = set(personalized)
    demographic = sorted(
        (product for product in available if product in group_sales and product not in selected),
        key=lambda product: (-group_sales[product], product),
    )[: limit - len(personalized)]

    recommendation_type = "DEFAULT"
    if demographic:
        recommendation_type = "PERSONALIZED_WITH_DEMOGRAPHIC" if personalized else "DEMOGRAPHIC"
    elif personalized:
        recommendation_type = "PERSONALIZED"
    return {
        "recommendationType": recommendation_type,
        "productIds": personalized + demographic,
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
            "brand": row.brand,
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
    documents = catalog["name"] + " " + catalog["brand"] + " " + catalog["category"] + " " + description
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

    # 대량 구매가 유사도를 좌우하지 않도록 상품별 구매 여부만 사용
    neighbors = []
    for user, history in purchases.items():
        if user == member_id:
            continue
        common = len(own.keys() & history.keys())
        if common:
            similarity = common / sqrt(len(own) * len(history))
            neighbors.append((similarity, user))

    scores = defaultdict(float)
    # 구매 패턴이 가장 비슷한 고객 30명의 미구매 상품에 점수 합산
    nearest = sorted(neighbors, reverse=True)[:30]
    total = sum(similarity for similarity, _ in nearest)
    for similarity, user in nearest:
        for product in purchases[user].keys() - own.keys():
            scores[product] += similarity / total
    return scores
