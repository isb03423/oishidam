-- 기존 후기는 미평가(NULL)로 보존하고, 별점이 있으면 1~5점만 저장한다.
BEGIN;
SET LOCAL lock_timeout = '5s';

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS rating SMALLINT;
DO $migration$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conrelid = 'reviews'::regclass AND conname = 'ck_reviews_rating'
    ) THEN
        ALTER TABLE reviews ADD CONSTRAINT ck_reviews_rating CHECK (rating BETWEEN 1 AND 5);
    END IF;
END;
$migration$;
COMMENT ON COLUMN reviews.rating IS '구매자 별점 1~5점; 기존 미평가 후기는 NULL';

COMMIT;
