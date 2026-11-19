-- 개발용 후기의 내용에 맞춰 별점을 채운다. 이미 입력된 별점과 후기 본문은 변경하지 않는다.
BEGIN;
SET LOCAL lock_timeout = '5s';

WITH bodies AS (
    SELECT review_id, regexp_replace(content, '^.*?(구매 후기입니다[.] |주문했어요[.] )', '') AS body
    FROM reviews WHERE rating IS NULL AND deleted_at IS NULL
), scores AS (
    SELECT review_id, CASE
        WHEN body ~ '(최악|끔찍|전부 버렸|거의 먹지 못|별 하나도 아깝)' THEN 1
        WHEN body ~ '(기대했던 맛과 달라서 아쉬|입맛에는 조금 안 맞|포장 상태가 좋지|포장이 찢어진|기분이 좋지는|만족스럽지 않)' THEN 2
        WHEN body ~ '(조금 달았|평범한|특별한 맛은 못|아직 먹기 전|가격에 비해 양이 적)' THEN 3
        WHEN body ~ '무난하게' THEN CASE WHEN body ~ '재구매하면서' THEN 4 ELSE 3 END
        WHEN body ~ '(다 먹으면 다시 주문|또 구매할게|다음 주문할 때도|재주문했습니다|최고|완벽|다섯 개|재구매하면서|기대 이상으로)' THEN 5
        WHEN body ~ '(만족해요|맛있|잘 먹|부담 없이 먹기|유통기한|친구도 좋아|문제없이 도착)' THEN 4
        ELSE NULL
    END AS rating
    FROM bodies
)
UPDATE reviews r SET rating = s.rating::smallint
FROM scores s WHERE r.review_id = s.review_id AND r.rating IS NULL AND s.rating IS NOT NULL;

COMMIT;
