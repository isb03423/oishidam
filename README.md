# 오이시담 Spring Boot 백엔드

오이시담(Oishidam) 쇼핑몰의 회원, 상품, 주문·결제와 관리자 기능을 제공하는 REST API 서버입니다. 프론트엔드와는 JSON API로 통신하며, FastAPI 서비스와 연동해 고객 분석과 후기 감정분석을 처리합니다.

## 주요 기능

| 영역 | 기능 |
| --- | --- |
| 인증·회원 | 회원가입, 로그인, JWT 발급·갱신·로그아웃, 카카오 로그인, 회원 정보·비밀번호·배송지 관리 |
| 상품 | 상품 검색·목록·상세, 카테고리 조회, 신상품·인기 상품·개인화 추천 |
| 구매 | 찜, 장바구니, 주문 금액 확인·생성·조회·취소, 토스페이먼츠 테스트 결제 |
| 후기·문의 | 구매 후기 작성·수정·삭제와 이미지 업로드, 상품 문의와 관리자 답변 |
| 관리자 | 회원 상태, 카테고리, 상품·이미지·재고·입출고 이력, 주문 상태, 후기·문의 관리 |
| 분석 | 운영 대시보드, AI 고객 분석 연동, 후기 감정분석 현황·재분석 |

## 기술 구성

| 구분 | 사용 기술 |
| --- | --- |
| 언어 | Java 21 |
| 프레임워크 | Spring Boot 4.1.2, Spring MVC |
| 데이터 접근 | Spring Data JPA, PostgreSQL |
| 인증·인가 | Spring Security, OAuth2 Client·Resource Server, JWT(HS256), BCrypt |
| 요청 검증·코드 간소화 | Jakarta Validation, Lombok |
| API 문서 | springdoc-openapi 3.2.0, Swagger UI |
| 빌드 | Gradle Wrapper 9.8.2 |
| 외부 연동 | Kakao OAuth2, ImageKit, 토스페이먼츠, FastAPI |

버전과 의존성은 [build.gradle](build.gradle) 및 [Gradle Wrapper 설정](gradle/wrapper/gradle-wrapper.properties)을 기준으로 합니다.

## 디렉터리 구조

```text
oishidam-backend/
├─ src/main/java/com/oishidam/
│  ├─ OishidamApplication.java  # 애플리케이션 진입점
│  ├─ config/                  # 보안, JWT, OAuth2, CORS, JPA, API 문서 설정
│  ├─ common/                  # 공통 응답·예외, 이미지 업로드, AI 클라이언트
│  ├─ auth/                    # 인증과 토큰 관리
│  ├─ member/                  # 회원과 배송지
│  ├─ category/                # 카테고리
│  ├─ product/                 # 상품, 추천, 재고 이력
│  ├─ wish/                    # 찜
│  ├─ cart/                    # 장바구니
│  ├─ order/                   # 주문과 취소
│  ├─ payment/                 # 결제 승인과 복구
│  ├─ review/                  # 후기와 감정분석 연동
│  ├─ inquiry/                 # 문의와 답변
│  └─ admin/                   # 관리자 기능과 대시보드
├─ src/main/resources/
│  ├─ application.yaml         # 애플리케이션 설정
│  └─ sql/
│     └─ schema.sql            # 신규 DB 테이블·인덱스·트리거 구성
├─ gradle/wrapper/
├─ .env.example                # 로컬 설정 예시
├─ build.gradle
└─ README.md
```

각 도메인은 기존 `controller`, `service`, `repository`, `entity`, `dto` 패키지 구조를 따릅니다.

## 로컬 실행

아래 명령은 **이 README가 있는 백엔드 프로젝트 루트**에서 실행하는 Windows PowerShell 기준입니다. JDK 21과 PostgreSQL을 먼저 준비합니다. Gradle은 포함된 Wrapper를 사용하므로 별도 설치가 필요하지 않습니다.

### 1. 데이터베이스 준비

PostgreSQL 서버를 실행하고, 아직 데이터베이스가 없다면 생성합니다. `psql`을 사용할 수 있도록 PATH를 설정하거나 pgAdmin의 쿼리 도구에서 같은 SQL을 실행합니다.

```powershell
psql -h localhost -U postgres -c "CREATE DATABASE oishidam;"
```

기본 접속 주소는 `jdbc:postgresql://localhost:5432/oishidam`입니다. 접속 정보는 다음 단계에서 실제 로컬 환경에 맞게 설정합니다.

애플리케이션 시작 시 [schema.sql](src/main/resources/sql/schema.sql)이 실행됩니다(`spring.sql.init.mode=always`). 테이블 구성은 SQL로 관리하며 Hibernate의 자동 스키마 변경은 사용하지 않습니다(`ddl-auto=none`). 초기 상품·회원 데이터는 별도로 준비해야 합니다.

기존 후기의 별점은 NULL(미평가)로 유지되며, 새 후기는 1~5점 정수 별점이 필수입니다. 수정 요청에서 별점을 생략하면 기존 값을 유지합니다. 관리자 답변에는 별점 입력이 필요하지 않습니다.

공개 `GET /api/products/{productId}/reviews/summary`는 삭제되지 않은 해당 상품의 전체 후기 수 `reviewCount`, 별점 평가 수 `ratingCount`, 평균 별점 `averageRating`을 반환합니다. 평균에는 별점이 있는 후기만 포함하며, 평가가 없으면 NULL입니다. 미평가 후기를 0점으로 계산하지 않습니다.

### 2. 로컬 설정

기존 `.env`가 없다면 예제 파일을 복사합니다.

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

프로젝트 루트의 `.env`는 [application.yaml](src/main/resources/application.yaml)에서 Spring properties 형식으로 읽습니다. `.env`의 DB 설정을 실제 접속 정보에 맞게 입력합니다.

```properties
DB_HOST=localhost
DB_PORT=5432
DB_NAME=oishidam
DB_USER=postgres
DB_PASSWORD=실제_DB_비밀번호
```

JWT 서명키는 아래 명령으로 생성한 값을 `.env`의 `JWT_SECRET`에 입력합니다. 현재 구현은 **정확히 32바이트를 Base64로 인코딩한 문자열**을 요구합니다.

```powershell
$jwtKeyBytes = New-Object byte[] 32
$jwtRng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$jwtRng.GetBytes($jwtKeyBytes)
[Convert]::ToBase64String($jwtKeyBytes)
$jwtRng.Dispose()
```

| 설정 | 용도·설정값 |
| --- | --- |
| `JWT_SECRET` | 필수. 위에서 생성한 JWT 서명키 |
| `PII_KEYS` | 필수. 64바이트 개인정보 키의 Base64 값 |
| `SMTP_USERNAME`, `SMTP_PASSWORD` | 이메일 인증 발송용 Gmail 주소와 Google 앱 비밀번호 |
| `FRONTEND_URL` | CORS 허용 출처 하나. 기본 `http://localhost:5173` |
| `AI_SERVICE_URL` | FastAPI 주소. 기본 `http://localhost:8000` |
| `KAKAO_LOGIN_ENABLED` | 카카오 로그인 활성화 여부. 기본 `false` |
| `KAKAO_CLIENT_ID` | 카카오 로그인 활성화 시 REST API 키 |
| `KAKAO_CLIENT_SECRET` | 카카오 로그인 활성화 시 Client Secret |
| `IMAGEKIT_PRIVATE_KEY` | 상품·후기 이미지 업로드에 필요한 서버 비밀키 |
| `TOSS_TEST_CLIENT_KEY` | 주문서형 결제 테스트 클라이언트 키. `test_gck_`로 시작 |
| `TOSS_TEST_SECRET_KEY` | 주문서형 결제 테스트 시크릿 키. `test_gsk_`로 시작 |
| `SUCCESS_REDIRECT` | 예제 설정에 포함되어 있으나 현재 카카오 로그인 성공 처리는 팝업의 `postMessage`를 사용 |

외부 연동을 사용하지 않는 로컬 실행에서는 예제의 해당 키를 빈 값으로 둘 수 있습니다. 이미지 업로드와 결제는 유효한 키를 설정해야 사용할 수 있습니다. `.env`와 실제 비밀번호·비밀키는 Git에 올리지 않습니다.

### 개인정보 암호화 키 설정

개인정보 암호화는 `.env`의 `PII_KEYS`에서 Base64로 인코딩한 64바이트 키를 읽습니다. 앞 32바이트는 개인정보 암호화에, 뒤 32바이트는 이메일 조회에 사용합니다. 이 프로젝트의 로컬 백엔드와 Docker Compose는 같은 값을 사용합니다.

키를 처음 설정할 때 PowerShell로 값을 생성해 Git에서 제외한 `.env`에 추가합니다. 파일로 이미 키를 설정했다면 그 파일의 기존 Base64 값을 `PII_KEYS`에 넣습니다.

```powershell
$piiKeyBytes = [byte[]]::new(64)
$piiRng = [Security.Cryptography.RandomNumberGenerator]::Create()
try {
    $piiRng.GetBytes($piiKeyBytes)
    'PII_KEYS=' + [Convert]::ToBase64String($piiKeyBytes)
} finally {
    $piiRng.Dispose()
}
```

기존 DB를 재시작하거나 백업에서 복원할 때는 그 DB에 사용한 `PII_KEYS` 값을 유지합니다.

기존 DB에 처음 적용할 때는 DB를 백업하고 이전 백엔드를 모두 종료한 뒤 새 백엔드를 시작합니다. 시작 시 회원·배송지·주문과 이메일 인증 조회값을 한 트랜잭션으로 이관합니다. 평문이 포함된 이전 백업은 접근을 제한하고 별도로 관리합니다. 암호화 후에는 관리자 회원·주문 부분 검색을 백엔드에서 수행하므로 데이터가 늘어나면 조회 비용도 커집니다.

### 3. 서버 실행

```powershell
.\gradlew.bat bootRun
```

macOS·Linux에서는 같은 위치에서 `./gradlew bootRun`을 사용합니다. 기본 서버 주소는 [http://localhost:8080](http://localhost:8080)입니다.

### 4. 빌드와 JAR 실행

```powershell
.\gradlew.bat bootJar
java -jar build/libs/oishidam-0.0.1-SNAPSHOT.jar
```

JAR 실행 시에도 프로젝트 루트에서 실행해야 위에서 만든 `.env`를 읽습니다. `bootJar`는 실행 가능한 JAR을 생성하며 테스트를 실행하지 않습니다. 로컬 테스트가 준비된 환경에서는 아래 명령으로 검증합니다.

```powershell
.\gradlew.bat test
.\gradlew.bat build
```

테스트 파일은 프로젝트 정책에 따라 로컬 검증에 사용하며 Git에 추가·스테이징·커밋하지 않습니다. 테스트 추적을 위해 `.gitignore`를 변경하거나 강제 추가하지 않습니다.

관리자 주문 목록에는 결제 대기 주문이 표시되지 않습니다. 결제 요청이 없는 주문은 생성 후 15분이 지나면 삭제합니다. 결제 요청이 있는 주문은 마지막 요청 후 45분이 지나면 결제 실패로 바꾸고 `결제 시간 만료` 사유를 기록합니다. 백엔드는 만료 대상을 1분마다 확인하며 결제 승인 중이거나 승인 기록이 있는 주문은 보존합니다.

## API 사용

- [Swagger UI](http://localhost:8080/swagger-ui/index.html)
- [OpenAPI JSON](http://localhost:8080/v3/api-docs)

요청·응답 DTO, 쿼리 파라미터와 개별 경로는 Swagger UI에서 확인합니다. 주요 API 경로는 다음과 같습니다.

| 영역 | 기본 경로 |
| --- | --- |
| 인증 | `/api/auth` |
| 내 정보·배송지 | `/api/members/me`, `/api/members/me/addresses` |
| 상품·카테고리·추천 | `/api/products`, `/api/categories`, `/api/recommendations` |
| 찜·장바구니 | `/api/wishes`, `/api/cart` |
| 주문·결제 | `/api/orders`, `/api/orders/{orderId}/payments`, `/api/payments` |
| 후기 | `/api/products/{productId}/reviews`, `/api/orders/items/{itemId}/review`, `/api/reviews` |
| 문의 | `GET /api/inquiries/mine`, `POST /api/inquiries`, `GET/DELETE /api/inquiries/{inquiryId}` |
| 관리자 | `/api/admin/members`, `/api/admin/categories`, `/api/admin/products`, `/api/admin/orders`, `/api/admin/reviews`, `/api/admin/inquiries` |
| 대시보드·고객 분석 | `/api/admin/dashboard`, `/api/admin/analytics` |

### 인증과 공통 응답

로그인으로 발급받은 액세스 토큰을 인증이 필요한 요청의 헤더에 전달합니다.

```http
Authorization: Bearer <accessToken>
```

일반 API는 세션 없이 JWT를 사용합니다. 액세스 토큰 유효기간은 1시간, 리프레시 토큰 유효기간은 14일입니다. 토큰 검증 시 서명·만료·issuer·audience뿐 아니라 회원 활성 상태, 토큰 버전, 로그아웃으로 폐기된 토큰 여부도 확인합니다.

회원가입·로그인·토큰 갱신, 상품·카테고리·상품 후기 조회, API 문서는 비로그인 접근을 허용합니다. 개인화 추천은 로그인이 필요하며, `/api/admin/**`는 `ADMIN` 권한이 필요합니다. 문의 작성·개별 조회 등은 `USER` 권한을 요구합니다. 세부 권한은 [SecurityConfig.java](src/main/java/com/oishidam/config/SecurityConfig.java)와 각 컨트롤러를 기준으로 합니다.

공통 응답은 `success`, `message`, `data` 필드를 사용합니다.

```json
{
  "success": true,
  "message": "OK",
  "data": null
}
```

실제 성공 응답의 `data`에는 해당 API의 데이터가 담깁니다. 공통 예외 처리기가 처리하는 오류는 HTTP 상태 코드와 함께 `success: false`, 오류 메시지, `data: null`을 반환합니다.

## 외부 서비스 연동

### 카카오 로그인

`KAKAO_LOGIN_ENABLED=true`와 카카오 키를 설정합니다. 로컬 Redirect URI는 `http://localhost:8080/login/oauth2/code/kakao`이며, 카카오 개발자 콘솔에 등록해야 합니다. 로그인 시작 경로는 `/oauth2/authorization/kakao`입니다. 로그인 성공 시 팝업이 `FRONTEND_URL`의 부모 창으로 토큰을 전달합니다.

### 이미지·결제

이미지는 ImageKit에 업로드합니다. JPEG·PNG·GIF·WebP를 지원하며 이미지 한 장은 최대 10MB, 전체 multipart 요청은 최대 55MB입니다. 결제는 토스페이먼츠 **주문서형 테스트 키 쌍**을 사용하는 흐름입니다.

### AI 서비스

고객 분석과 후기 감정분석을 사용하려면 FastAPI 서비스를 별도로 실행하고 백엔드와 같은 PostgreSQL DB를 사용하도록 설정합니다. 서버 간 요청에도 현재 로그인한 회원의 JWT를 전달합니다. FastAPI의 `SPRING_API_URL`은 기본 `http://127.0.0.1:8080/api`이며, 회원 확인을 위해 이 백엔드가 실행 중이어야 합니다.

후기는 DB 저장 확정 후 백그라운드에서 감정분석을 요청합니다. AI 호출이 실패하면 후기는 저장된 상태로 남고 관리자 재분석이 필요합니다. 현재 작업은 메모리에서 실행하므로 서버 재시작 시 자동 복구되지 않습니다.

`/api/recommendations/products`는 신상품(`type=new`)과 베스트 상품(`type=best`, 기본값)을 조회합니다. 로그인 회원의 개인화 추천은 프론트엔드에서 FastAPI의 `GET /api/ai/recommend/products`를 호출해 조회합니다.
