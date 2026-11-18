# 오이시담 AI 서비스

오이시담(Oishidam) 쇼핑몰의 상품 추천, 후기 감정분석, 고객 구매 분석을 제공하는 FastAPI 프로젝트입니다. Spring Boot 백엔드와 PostgreSQL 데이터베이스를 공유하며 분석 결과를 API로 제공합니다.

## 주요 기능

| 기능 | 내용 |
| --- | --- |
| 상품 추천 | 찜·구매 이력과 상품 정보를 활용한 개인화 추천, 같은 연령대·성별 구매 이력을 활용한 보완 추천 |
| 후기 감정분석 | 한국어 후기를 매우 긍정·긍정·중립·부정·매우 부정으로 분류하고 DB에 저장 |
| 고객 분석 | RFM 기반 고객 유형 분류, 재구매 지표, 첫 구매 월별 코호트 리텐션 |
| 차트 생성 | 고객 유형 산점도, 유형별 평균 구매 금액, 코호트 리텐션 PNG 및 Base64 데이터 생성 |

## 기술 구성

- 개발 환경: Windows, Python **3.12.0**
- API: FastAPI, Uvicorn
- 데이터베이스: PostgreSQL, SQLAlchemy, psycopg2
- 데이터 처리·추천·군집화: NumPy, pandas, scikit-learn
- 감정분석: PyTorch, Hugging Face Transformers
- 시각화: Matplotlib, seaborn

직접 의존성의 버전은 [requirements.txt](requirements.txt)에 현재 개발 가상환경 기준으로 고정했습니다. 전이 의존성까지 고정한 전체 환경 잠금 파일은 아닙니다. 기존 목록은 유지했으며, TensorFlow·Keras·sentence-transformers 등은 현재 위 기능의 핵심 실행 경로에서는 사용하지 않습니다.

## 디렉터리 구조

```text
oishidam-ai-service/
├─ app/
│  ├─ main.py                      # FastAPI 앱, CORS, 라우터 등록
│  ├─ config.py                    # 환경변수 설정
│  ├─ auth.py                      # Spring Boot JWT 확인·공통 권한 검증
│  ├─ database.py                  # DB 연결 및 쿼리 실행
│  ├─ charts.py                    # 차트 저장·Base64 변환
│  ├─ routers/
│  │  ├─ recommend.py              # 상품 추천 API
│  │  ├─ sentiment.py              # 후기 감정분석 API
│  │  └─ customers.py              # 고객 분석 API
│  ├─ services/
│  │  ├─ product_recommendations.py # 추천 계산
│  │  ├─ sentiment.py              # 모델 추론·사전 대체·결과 저장
│  │  └─ customer_analytics.py     # RFM·고객 분류·재구매·리텐션
│  └─ data/
│     ├─ SentiWord_info.json       # KNU 한국어 감성사전
│     └─ README.md                # 사전 출처와 분류 기준
├─ charts/                        # 실행 중 생성되는 차트
├─ .env.example                   # 로컬 환경변수 예시
├─ requirements.txt
└─ README.md
```

## 로컬 설치

다음 명령은 저장소 루트에서 실행하는 Windows PowerShell 기준입니다. Python 3.12와 PostgreSQL을 먼저 준비합니다.

```powershell
cd oishidam-ai-service
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pip check
```

가상환경 활성화 없이 해당 환경의 Python을 직접 사용합니다. 딥러닝 패키지가 포함되어 있어 설치 용량과 시간이 클 수 있습니다. CPU에서 실행할 수 있으며, PyTorch가 CUDA를 사용할 수 있는 환경에서는 감정분석에 GPU를 사용합니다.

### 환경변수

AI 서비스 루트에 `.env`가 없다면 예제 파일을 복사한 뒤 값을 수정합니다.

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

| 변수 | 기본값 | 용도 |
| --- | --- | --- |
| `DB_HOST` | `localhost` | PostgreSQL 호스트 |
| `DB_PORT` | `5432` | PostgreSQL 포트 |
| `DB_NAME` | `oishidam` | 백엔드와 공유하는 DB 이름 |
| `DB_USER` | `postgres` | DB 사용자 |
| `DB_PASSWORD` | 없음 | DB 비밀번호, 실제 접속 정보로 설정 |
| `FRONTEND_ORIGINS` | 아래 설명 참고 | CORS 허용 출처, 쉼표로 구분 |
| `SPRING_API_URL` | `http://127.0.0.1:8080/api` | 모든 FastAPI 요청의 JWT·현재 권한 확인 주소 |
| `CHART_DIR` | `./charts` | 차트 저장 경로, 실행 디렉터리 기준 |

`FRONTEND_ORIGINS` 기본값은 `http://localhost:5173,http://127.0.0.1:5173,http://localhost:1573`입니다. 선택 설정은 필요할 때 `.env`에 추가합니다.

```dotenv
SPRING_API_URL=http://127.0.0.1:8080/api
CHART_DIR=./charts
```

`SPRING_API_URL`은 Python 서비스에 설정합니다. Spring Boot는 기존 `AI_SERVICE_URL=http://localhost:8000`으로 FastAPI에 접근합니다. 서버 간에도 현재 로그인한 회원의 JWT를 전달하므로 `AI_RECOMMENDATION_TOKEN`과 `X-Recommendation-Token`은 사용하지 않습니다. 기존 설정은 제거해도 됩니다. `.env`와 실제 JWT·비밀번호는 Git에 올리지 않습니다.

### 데이터베이스 준비

이 서비스는 테이블을 자동 생성하지 않습니다. 백엔드와 같은 데이터베이스를 바라보도록 설정합니다.

- 신규 DB: 백엔드의 [schema.sql](../oishidam-backend/src/main/resources/sql/schema.sql)을 기준으로 초기화합니다.
- 기존 DB의 후기 감정분석 기능: 다음 마이그레이션을 순서대로 적용합니다. 기존 DB에 전체 초기화 스크립트를 재실행하지 않습니다.

1. [20261118_add_review_sentiments.sql](../oishidam-backend/src/main/resources/sql/migrations/20261118_add_review_sentiments.sql)
2. [20261118_remove_sentiment_review_content.sql](../oishidam-backend/src/main/resources/sql/migrations/20261118_remove_sentiment_review_content.sql)

주요 참조 데이터는 회원·주문·주문 항목·상품·재고·카테고리·찜·후기입니다. 실제 분석을 확인하려면 해당 데이터가 필요합니다.

## 실행

AI 서비스 루트에서 실행합니다.

```powershell
.\.venv\Scripts\python.exe -m uvicorn main:app --app-dir app --host 127.0.0.1 --port 8000 --reload
```

| 주소 | 설명 |
| --- | --- |
| [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health) | ADMIN, 프로세스 응답 확인 |
| [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) | ADMIN, Swagger UI |
| [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) | ADMIN, ReDoc API 문서 |

`/health`는 `{"status":"Running"}`을 반환하며, DB 연결이나 감정분석 모델 준비 여부까지 검사하지 않습니다. `--reload`는 개발용 옵션입니다.

Spring Boot에서 AI 서비스를 호출하는 주소는 백엔드 환경변수 `AI_SERVICE_URL`로 설정하며 기본값은 `http://localhost:8000`입니다. 반대로 모든 FastAPI 요청에서 로그인 회원을 확인하려면 `SPRING_API_URL`에 지정한 Spring Boot 서버가 실행 중이어야 합니다.

인증·권한은 아래 공통 정책으로 검사합니다. CORS 허용 출처에서도 JWT가 필요합니다.

## 공통 JWT 검증과 권한

1. 클라이언트 또는 Spring Boot가 FastAPI에 `Authorization: Bearer <JWT>`를 전달합니다.
2. `app/auth.py`가 같은 JWT로 Spring Boot의 `GET /api/members/me`를 호출합니다. 요청 간 인증 결과를 캐시하지 않으며 같은 요청 안에서는 검증을 공유합니다.
3. Spring Security가 서명·만료·issuer·audience·회원 활성 상태·토큰 버전·로그아웃 폐기 여부를 검증합니다. FastAPI는 응답의 현재 회원 ID와 DB 기준 권한을 사용합니다.
4. 추천과 본인 후기 단건 분석 외에는 ADMIN만 허용합니다. 새 API도 별도 예외를 추가하지 않으면 ADMIN 전용입니다.

JWT 누락·만료·폐기는 401, 권한 부족은 403입니다. 인증 확인 서버의 장애·시간 초과·잘못된 응답은 503으로 거부하며 인증을 생략하지 않습니다. JWT 서명 비밀키는 Python 서비스와 공유하지 않습니다.

`/health`, `/docs`, `/redoc`, `/openapi.json`도 ADMIN 인증 대상입니다. 브라우저 주소창만으로 접근하면 인증 헤더가 없어 401이 발생합니다. API 클라이언트에서 관리자 Bearer 헤더를 설정해 접근해야 하며 문서 페이지의 스키마 요청에도 같은 헤더가 필요합니다. CORS 사전 요청인 OPTIONS에는 업무 API를 실행하지 않고 CORS 응답만 제공합니다.

## API

기본 주소: `http://127.0.0.1:8000`

| 메서드 | 경로 | 파라미터·본문 | 인증·동작 |
| --- | --- | --- | --- |
| GET | `/health` | 없음 | ADMIN, 프로세스 상태 조회 |
| GET | `/api/ai/recommend/products` | `limit`: 기본 3, 1~100 | 로그인한 USER·ADMIN, 본인의 추천 상품 요약 |
| POST | `/api/ai/recommend/products` | `limit`: 기본 3, 1~100 / JSON `{"member_id":1}` | 로그인한 USER·ADMIN, 본인 회원 ID만 허용 |
| POST | `/api/ai/sentiment/reviews/{review_id}/analyze` | `review_id`: 1 이상, 본문 없음 | 로그인 회원 본인의 저장된 후기 한 건 분석·DB 저장 |
| POST | `/api/ai/sentiment/analyze-pending` | `limit`: 기본 500, 1~500 | ADMIN, 미분석·본문 수정·구버전 결과 분석 및 DB 저장 |
| GET | `/api/ai/sentiment/summary` | `product_id`: 선택, 1 이상 | ADMIN, 전체 또는 특정 상품의 감정 집계 |
| GET | `/api/ai/analytics/customers` | `charts`: 기본 `true` | ADMIN, `false`이면 차트 생성 생략 |

모든 API는 `Authorization: Bearer <액세스 토큰>` 헤더를 사용합니다. 추천의 “모든 유저”는 로그인한 USER·ADMIN을 의미하며 비로그인 요청은 허용하지 않습니다. 관리자도 단건 후기 분석 경로에서는 본인 후기만 분석할 수 있고, 전체 처리에는 관리자 일괄 API를 사용합니다.

### 관리자 화면에서 다시 분석하기

- **후기 감정분석 → 미분석 후기 분석**: Spring Boot의 `POST /api/admin/reviews/analytics/analyze-pending?limit=500`을 통해 FastAPI 일괄 분석을 실행합니다. 관리자 JWT를 전달하며 미분석·본문 수정·구버전 모델 후기를 한 번에 최대 500건 처리합니다. 완료 건수를 실행별 토스트로 쌓아 표시하고 현황·상품 목록을 다시 조회합니다. 토스트는 찜목록과 공통 구현을 사용하며 각각 3초 뒤 닫힙니다. 마우스·키보드로 알림을 살펴보는 동안에는 타이머를 멈춥니다. 관리자 화면에서는 고정 페이지 헤더 아래 8px에 붙어 이동합니다. 남은 대상은 버튼을 다시 눌러 처리합니다.
- **후기 감정분석 → 현황 새로고침**: 추론 없이 DB에 저장된 집계만 다시 조회합니다.
- **AI 고객 분석 → 분석 새로고침**: 현재 회원·주문 데이터로 RFM, 고객 분류, 재구매 지표와 차트를 다시 계산합니다. 조회 요청마다 계산하므로 별도 재분석 API는 필요하지 않습니다.

후기 분석 실패 시 앞서 저장된 배치는 유지될 수 있어 현황도 다시 조회합니다. 이미 같은 모델로 처리한 모든 후기를 무조건 다시 추론하는 버튼은 제공하지 않습니다. 후기 수가 늘면 전체 재분석을 요청 한 번에 처리하기보다 영속 작업 큐에서 제한된 배치로 실행해야 합니다.

### 호출 예시

```powershell
$adminHeaders = @{ Authorization = 'Bearer <관리자 액세스 토큰>' }
Invoke-RestMethod -Method Get -Headers $adminHeaders -Uri 'http://127.0.0.1:8000/health'
Invoke-RestMethod -Method Get -Headers $adminHeaders -Uri 'http://127.0.0.1:8000/api/ai/analytics/customers?charts=false'
Invoke-RestMethod -Method Get -Headers $adminHeaders -Uri 'http://127.0.0.1:8000/api/ai/sentiment/summary?product_id=1'
```

다음 요청은 분석 결과를 **DB에 저장·갱신**합니다. 서버 시작만으로 전체 후기를 자동 분석하지는 않습니다.

```powershell
Invoke-RestMethod -Method Post -Headers $adminHeaders -Uri 'http://127.0.0.1:8000/api/ai/sentiment/analyze-pending?limit=500'
```

분석 응답은 `{"analyzed":처리건수,"model":"모델명"}`입니다. 남은 후기는 다시 호출해 처리합니다. 다른 분석 요청이 처리 중인 행은 건너뛰므로 동시 실행 중의 처리 건수 0이 전체 처리 완료를 보장하지는 않습니다.

추천 GET 응답은 `{"data":{"recommendationType":"...","products":[...]}}`, 추천 POST 응답은 `{"recommendationType":"...","productIds":[...]}`입니다. 감정 집계는 `overall`·`products`, 고객 분석은 `summary`·`segments`·`top_customers`·`by_age_band`·`by_region`·`retention`·`charts`를 반환합니다. 현재 라우터에 세부 응답 모델이 선언되어 있지 않으므로 상세 필드는 실제 API 응답과 서비스 코드를 기준으로 확인합니다.

## 후기 감정분석

### 후기 등록·수정 시 자동 단건 분석

```text
후기 작성·수정 요청(JWT)
  → Spring Boot: 작성자·주문·작성/수정 기한 검증, 후기 저장
  → DB 커밋 성공
  → Spring Boot: 백그라운드 작업에 작성자의 JWT와 후기 ID 전달
  → POST /api/ai/sentiment/reviews/{review_id}/analyze
  → FastAPI: Spring Boot에서 JWT 재검증, DB에서 후기 소유권 확인
  → 해당 후기의 최신 본문 한 건만 추론, review_sentiments 저장
```

JSON·사진 첨부 등록, JSON·사진 첨부 수정 경로 모두 연결됩니다. 삭제·롤백된 저장은 분석 요청을 발생시키지 않습니다. FastAPI는 작성자 ID를 클라이언트 본문에서 받지 않고 검증된 JWT의 회원 ID와 `reviews.member_id`를 비교하며, 없는 후기·다른 사람의 후기·삭제된 후기는 모두 404로 처리합니다.

같은 모델로 이미 분석된 후기는 중복 추론을 생략합니다. 본문 수정 시 DB 트리거가 기존 결과를 지우므로 새 본문을 다시 분석합니다. 모델 로딩 실패 시 KNU로 대체하되 기존 문장 모델 결과를 사전 결과로 덮어쓰지 않습니다.

단건 호출 예시입니다. 보통은 Spring Boot가 자동 호출하므로 프론트에서 중복 호출할 필요가 없습니다.

```powershell
$memberHeaders = @{ Authorization = 'Bearer <후기 작성자의 액세스 토큰>' }
Invoke-RestMethod -Method Post -Headers $memberHeaders -Uri 'http://127.0.0.1:8000/api/ai/sentiment/reviews/1/analyze'
```

응답은 `review_id`, `analyzed`, `model`이며 새로 분석한 경우 `sentiment`, `confidence`도 포함합니다. `analyzed=0`이면 기존 결과를 유지한 것입니다.

Spring Boot의 `applicationTaskExecutor`로 커밋 후 백그라운드 호출하므로 후기 저장 응답은 추론 완료를 기다리지 않습니다. 요청 시점의 JWT를 캡처해 작업에 전달하며, 작업 실행 시 FastAPI에서 다시 검증합니다. 접속 제한은 5초, 읽기 제한은 기본 60초(`oishidam.ai.timeout-seconds`)입니다. 첫 모델 다운로드는 이 시간을 넘을 수 있습니다.

AI 장애·작업 거부·인증 만료·추론 오류가 발생해도 후기 저장은 유지합니다. 결과가 없는 후기는 미분석 상태로 남겨 관리자가 일괄 API로 재처리합니다. 작업은 메모리에만 있으므로 서버 재시작 시 대기 작업이 사라질 수 있으며 자동 재시도·영속 작업 큐는 제공하지 않습니다.

관리자 고객 분석 호출도 공통 `AiServiceClient`에서 관리자 JWT를 전달합니다. 기존 관리자 후기 목록·대시보드는 DB에 저장된 분석 결과를 그대로 조회합니다.

### 모델과 분류

- 모델: [tabularisai/multilingual-sentiment-analysis](https://huggingface.co/tabularisai/multilingual-sentiment-analysis)
- 고정 리비전: `eea032081f8d247b4303ef3565e7cec1b6f201c9`
- 모델 라벨을 아래 5단계로 직접 연결합니다. 예측 확률을 기준으로 감정 강도를 임의 변환하지 않습니다.

| 저장 코드 | 화면 표시 |
| --- | --- |
| `VERY_POSITIVE` | 매우 긍정 |
| `POSITIVE` | 긍정 |
| `NEUTRAL` | 중립 |
| `NEGATIVE` | 부정 |
| `VERY_NEGATIVE` | 매우 부정 |

첫 분석 시 모델과 토크나이저를 Hugging Face 캐시에 다운로드하므로 네트워크 연결과 준비 시간이 필요합니다. 이후 로컬에서 추론하며 리뷰 본문을 외부 추론 API로 보내지 않습니다. 긴 후기는 512토큰 구간으로 나누고 64토큰씩 겹쳐 처리한 뒤 구간별 확률을 평균합니다.

`confidence`는 선택 클래스의 softmax 값이며 긴 후기는 구간 평균값입니다. 실제 정답 확률로 보정된 수치는 아닙니다. 빈 문자열은 중립·0으로 처리합니다. 한국어 상품 후기의 정확도는 별도 정답 데이터로 평가해야 합니다.

**모델 라이선스는 CC BY-NC 4.0입니다. 교육·포트폴리오 용도로 사용하며, 상업 운영 시 모델 이용 조건을 확인하거나 다른 모델을 선택해야 합니다.**

### 결과 저장과 재분석

- `review_sentiments`에는 후기 ID, 감정, 신뢰도, 모델명, 분석 시각을 저장합니다. 후기 원문은 `reviews`에만 보관합니다.
- 모델명은 모델 ID와 고정 리비전 앞 12자리를 조합합니다. 모델 버전이 달라지면 다음 분석 요청에서 기존 결과를 갱신합니다.
- DB 트리거가 후기 본문 변경 시 기존 분석 결과를 삭제합니다. 다음 분석 요청에서 수정한 본문을 처리합니다.
- 16건 단위 트랜잭션으로 분석·저장합니다. 처리 중 오류가 나면 해당 배치를 롤백하고 앞서 완료한 배치는 유지합니다.
- 후기 ID별로 갱신하므로 반복 호출로 중복 결과를 만들지 않습니다.
- 상품 연결은 `reviews → order_items → products`를 사용합니다. 이 서비스의 감정 집계에서는 삭제된 후기·상품과 아직 분석되지 않은 후기를 제외합니다.
- 감정 집계 API는 저장된 결과가 있는 상품만 반환하며 전체 상품 페이징 API는 아닙니다.

### KNU 감성사전 대체 처리

모델 로딩에 실패하면 [KNU 한국어 감성사전](https://github.com/park1200656/KnuSentiLex)으로 대체하고 `model_name`을 `knu-sentilex`로 저장합니다. 이때 기존 분석 결과를 덮어쓰지 않고 미분석 후기만 처리합니다. 모델이 복구되면 다음 분석 요청에서 사전 결과도 재분석합니다.

DB 배치 추론 도중 오류가 나면 해당 배치를 롤백합니다. Python 단건 함수 `analyze()`는 모델 추론 오류 시에도 사전으로 대체합니다. 임의 텍스트를 보내는 REST API는 제공하지 않습니다. 단건 API도 DB의 후기 ID를 받아 저장된 최신 본문만 분석합니다.

사전은 프로젝트에 포함되어 실행 중 다운로드하지 않습니다. 출처·작성자·극성 점수·대체 분류 기준은 [app/data/README.md](app/data/README.md)를 참고합니다.

## 고객 구매 분석

일반 회원(`USER`)의 주문 이력으로 RFM을 계산합니다. 결제 대기·결제 실패·취소 대기·취소 주문은 제외합니다.

| 값 | 의미 |
| --- | --- |
| R, `recency_days` | 마지막 주문으로부터 경과한 일수 |
| F, `frequency` | 분석 대상 주문 건수 |
| M, `monetary` | 분석 대상 주문 금액 합계 |

고객 유형은 다음 우선순위로 나눕니다.

1. 신규 고객: 가입 후 30일 이내
2. 이탈 위험 고객: 신규가 아니고 구매 이력이 있으며 마지막 구매가 90일 초과
3. 저활동 고객: 위 유형에 해당하지 않고 구매 0~1회
4. 일반·우수 고객: 나머지 고객의 RFM을 표준화해 KMeans 2개 군집으로 분류, 구매 빈도·금액이 높고 최근 구매한 군집을 우수 고객으로 지정

군집화할 데이터가 부족하거나 모두 같으면 나머지 고객은 일반 고객으로 유지합니다. 생년이 없거나 유효하지 않으면 연령대는 `미상`으로 표시합니다.

- `repurchase_rate`: 구매 고객 중 2회 이상 구매한 고객 비율
- `retention_rate_90d`: 구매 고객 중 최근 90일 내 구매한 고객 비율. 월별 코호트 리텐션과는 다른 지표입니다.
- `ltv_estimate`: 구매 고객의 평균 누적 구매 금액. 미래 고객 생애가치 예측값은 아닙니다.
- `retention`: 첫 구매 월 고객 수를 기준으로 이후 각 월에 구매한 고객 비율. 아직 도래하지 않은 월은 `null`입니다.
- `by_region`: 현재 지역별 분석은 구현되지 않아 빈 배열을 반환합니다.

`charts=true`이면 `CHART_DIR`에 PNG를 저장하고 응답에 파일 경로와 `image_base64`를 포함합니다. 파일 경로는 서버 내부 경로이며 이미지 공개 URL이 아닙니다. 데이터만 필요하면 `charts=false`로 호출합니다.

## 상품 추천

상품명·카테고리·설명을 활용한 문자 TF-IDF 유사도와 최근 180일 구매 이력 기반 협업 필터링을 결합합니다. 콘텐츠 점수 65%, 협업 점수 35%를 적용하고 이미 찜하거나 구매한 상품은 후보에서 제외합니다. 부족한 추천은 같은 연령대·성별의 구매 수량 순으로 보완합니다.

판매 중이며 재고가 있고 공개 시각이 지난 상품을 대상으로 합니다. 추천 유형은 `PERSONALIZED`, `DEMOGRAPHIC`, `PERSONALIZED_WITH_DEMOGRAPHIC`, `DEFAULT`입니다. 후보가 부족하면 요청한 수량보다 적거나 빈 목록을 반환할 수 있습니다.

추천 SQL과 응답은 백엔드의 최신 `schema.sql`에 맞춰 브랜드 필드를 사용하지 않습니다. 프론트엔드의 로그인 회원 개인화 추천은 이 Python API를 호출하며, 신상품·인기 상품 조회는 Spring Boot API를 사용합니다. Spring Boot의 자체 추천 서비스는 이 Python 추천 API를 직접 호출하지 않습니다.

## 확인 및 문제 해결

```powershell
.\.venv\Scripts\python.exe -m pip check
```

| 증상 | 확인할 내용 |
| --- | --- |
| `ModuleNotFoundError`, `Could not import module main` | AI 서비스 루트에서 가상환경의 Python으로 실행했는지, `--app-dir app`을 지정했는지 확인 |
| DB 접속 실패 | `.env` 접속 정보, PostgreSQL 실행 여부, 백엔드와 DB 일치 여부 확인 |
| `review_sentiments` 테이블 없음 | 감정분석 마이그레이션 적용 여부 확인 |
| 첫 감정분석 요청이 오래 걸림 | 모델 다운로드·로딩 시간을 확인. 응답의 `model`로 실제 분석 출처 확인 |
| 결과 모델명이 `knu-sentilex`임 | 로그에서 모델 로딩 실패 원인을 확인. 모델 준비 후 분석 API를 다시 호출 |
| API의 401·403·503 | JWT 누락·만료·폐기, 현재 회원 권한, Spring Boot 실행 여부와 `SPRING_API_URL` 확인 |
| 추천 POST의 403 | 본문의 `member_id`가 로그인 회원 ID와 같은지 확인 |
| 단건 후기 분석의 404 | 본인 후기인지, 커밋된 후기인지, 삭제되지 않았는지 확인 |
| 차트 한글이 깨짐 | 시스템에 맑은 고딕·나눔고딕 등 지원 한글 폰트가 있는지 확인 |
