# 오이시담 (Oishidam)

일본 식품 쇼핑몰 프로젝트입니다. 상품 탐색부터 찜·장바구니·주문·결제·후기까지의 구매 흐름과 관리자 운영 화면을 제공하며, 별도 AI 서비스에서 상품 추천·후기 감정분석·고객 구매 분석을 처리합니다.

이 저장소는 `frontend`, `backend`, `ai-service`를 Git subtree로 통합한 저장소입니다. 아래 명령은 별도 안내가 없으면 **이 README와 `compose.yaml`이 있는 저장소 루트**에서 실행합니다.

## 주요 기능

| 영역 | 기능 |
| --- | --- |
| 회원·인증 | 이메일 회원가입·로그인, JWT 발급·갱신·로그아웃, 선택적 카카오 로그인, 회원정보·비밀번호·배송지 관리 |
| 상품·구매 | 상품 검색·카테고리·상세 조회, 신상품·인기 상품·개인화 추천, 찜·장바구니, 주문 금액 확인·주문 생성, 토스페이먼츠 테스트 결제·주문 취소 |
| 후기·문의 | 주문 상품 후기와 이미지, 본인 후기 관리, 문의 작성·조회, 관리자 답변 |
| 관리자 | 상품·이미지·재고 이력, 2단계 카테고리, 주문 상태, 회원 상태, 문의·후기 답변, 운영 대시보드 |
| AI 분석 | 구매·찜 이력 기반 추천, 후기 5단계 감정분석·미분석 후기 일괄 처리, RFM 고객 분류·재구매·코호트 리텐션·차트 |

외부 로그인·이미지 업로드·결제는 해당 서비스의 유효한 키가 있어야 사용할 수 있습니다.

## 기술 구성

| 구성 | 사용 기술 |
| --- | --- |
| 프론트엔드 | Vue 3, Vue Router, Vite, Axios, Bulma / Docker 빌드: Node.js 22 |
| 백엔드 | Java 21, Spring Boot 4, Spring Security, Spring Data JPA, Gradle Wrapper, Swagger/OpenAPI |
| AI 서비스 | Python 3.12, FastAPI, SQLAlchemy, pandas, scikit-learn, PyTorch, Transformers, Matplotlib·seaborn |
| 데이터베이스 | PostgreSQL / Docker: PostgreSQL 17 |
| 실행 환경 | Docker Compose, Caddy (HTTPS), Nginx |
| 외부 연동 | 카카오 로그인, ImageKit, 토스페이먼츠 테스트 결제, Hugging Face 모델 |

실제 의존성 버전은 [frontend/package.json](frontend/package.json), [backend/build.gradle](backend/build.gradle), [ai-service/requirements.txt](ai-service/requirements.txt)를 기준으로 합니다.

## 프로젝트 구조

```text
oishidam/
├─ compose.yaml                   # 외부: Caddy 80·443, 로컬: AI 8000
├─ caddy/Caddyfile                # APP_URL에 따른 HTTP/HTTPS·인증서 자동 관리
├─ compose.db-access.yaml         # 선택: 로컬 DB 관리용 127.0.0.1:5433
├─ .env.example                   # Compose 환경변수 예시
├─ frontend/
│  ├─ src/                        # 화면·컴포넌트·라우터·API 클라이언트
│  ├─ Dockerfile                  # Vite 빌드 → Nginx 정적 파일 제공
│  └─ nginx.conf                  # SPA 라우팅·내부 API 프록시
├─ backend/
│  ├─ src/main/java/com/oishidam/  # 인증·회원·상품·주문·관리자 API
│  ├─ src/main/resources/
│  │  ├─ application.yaml
│  │  └─ sql/schema.sql           # 신규 DB 테이블·인덱스 초기화
│  └─ Dockerfile                  # Gradle bootJar → Java 21 JRE
└─ ai-service/
   ├─ app/                        # 추천·감정분석·고객 분석·인증
   ├─ requirements.txt
   └─ Dockerfile                  # Python API·한글 차트 폰트
```

## Docker 통신 구조

```text
브라우저 ── HTTP 80 / HTTPS 443 ── Caddy ── frontend (Nginx :8080)
                         ├─ /                 → Vue 정적 파일
                         ├─ /api/ai/*         → ai-service:8000
                         ├─ /api/*            → backend:8080
                         ├─ /oauth2/*         → backend:8080
                         └─ /login/oauth2/*   → backend:8080

backend ──→ ai-service:8000       # 고객 분석·후기 분석 등
ai-service ──→ backend:8080/api   # 전달받은 JWT·현재 회원 권한 확인
backend / ai-service ──→ db:5432 # 같은 PostgreSQL 사용
```

- 외부 공개 포트는 Caddy의 **80·443**입니다. AI는 배포 PC에서 상태·문서를 확인할 수 있도록 **127.0.0.1:8000**에만 연결합니다. 프론트·백엔드·DB에는 `ports`를 지정하지 않습니다.
- `APP_URL=http://localhost`는 기존처럼 HTTP로 실행합니다. 공개 도메인의 `https://` 주소를 설정하면 Caddy가 인증서를 자동 발급·갱신하고 HTTP를 HTTPS로 이동시킵니다. [Caddy 자동 HTTPS 문서](https://caddyserver.com/docs/automatic-https)
- Nginx는 내부 Caddy가 전달한 HTTPS·클라이언트 IP 정보를 사용합니다. Nginx의 8080 포트를 별도로 공개하지 않습니다.
- 백엔드와 AI의 업무 API는 프론트 주소 아래에서 접근하며 JWT·역할 검증을 적용합니다. AI 서비스의 상태 확인·API 문서는 인증 없이 공개합니다. 포트 비공개가 업무 API 인증을 대신하지는 않습니다.
- 컨테이너끼리는 `localhost`가 아닌 `backend`, `ai-service`, `db` 서비스 이름으로 통신합니다.
- DB 준비 → 백엔드 준비·스키마 초기화 → AI 준비 → 프론트 준비 → Caddy 순서로 시작합니다. 단순 실행 여부뿐 아니라 healthcheck 결과를 기다립니다. [Docker 실행 순서 문서](https://docs.docker.com/compose/how-tos/startup-order/)
- 백엔드 healthcheck는 공개 카테고리 API로 DB 연결까지 확인합니다. AI는 공개 `/health`의 **200 응답**을 준비 상태로 사용합니다. DB 연결이나 모델 추론 성공까지 확인하는 검사는 아닙니다.
- `restart: unless-stopped`로 비정상 종료 시 재시작합니다. healthcheck 실패 자체가 자동 재시작을 일으키지는 않습니다.

## Docker로 처음 실행하기

### 1. 준비 및 저장소 받기

Docker Engine과 Compose 플러그인 또는 Docker Desktop을 설치하고 엔진을 실행합니다. Windows Docker Desktop에서는 Linux 컨테이너를 사용합니다. Docker로 실행할 때 호스트에 Java·Node.js·Python·PostgreSQL을 따로 설치할 필요는 없습니다.

```sh
git clone https://github.com/isb03423/oishidam.git
cd oishidam
docker --version
docker compose version
docker info
```

이미 저장소가 있다면 해당 폴더로 이동하면 됩니다. 첫 실행에는 이미지·Java/Python/Node 의존성을 다운로드하므로 인터넷이 필요합니다. AI 의존성에 대용량 딥러닝 패키지가 포함되어 있어 첫 빌드는 오래 걸리고 디스크 공간을 많이 사용합니다. 현재 의존성 구성에서는 AI 이미지만 10GB 이상이 될 수 있으며 빌드 캐시·모델·DB 공간도 추가로 필요합니다.

### 2. 루트 `.env` 생성

루트 `.env`는 Compose 전용입니다. 각 서비스 폴더의 `.env`를 복사해 컨테이너 안에 넣지 않습니다. 비밀번호·키는 이미지에 포함하지 않고 컨테이너 환경변수로 전달하며 `.env`는 Git에서 제외합니다.

Windows PowerShell에서 다음 명령은 `.env`가 없을 때만 예제를 복사하고 DB 비밀번호와 JWT 키를 생성합니다. 기존 `.env`는 유지합니다.

```powershell
if (-not (Test-Path .env)) {
    $composeRng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $composeDbBytes = New-Object byte[] 24
    $composeJwtBytes = New-Object byte[] 32
    $composePiiBytes = New-Object byte[] 64
    $composeRng.GetBytes($composeDbBytes)
    $composeRng.GetBytes($composeJwtBytes)
    $composeRng.GetBytes($composePiiBytes)
    $composeRng.Dispose()
    $composeDbPassword = [BitConverter]::ToString($composeDbBytes).Replace('-', '').ToLowerInvariant()
    $composeJwtSecret = [Convert]::ToBase64String($composeJwtBytes)
    $composePiiKeys = [Convert]::ToBase64String($composePiiBytes)
    $composeEnv = (Get-Content .env.example -Raw).Replace('replace_with_random_database_password', $composeDbPassword).Replace('replace_with_base64_encoded_32_random_bytes', $composeJwtSecret)
    $composeEnv = $composeEnv.Replace('replace_with_base64_encoded_64_random_bytes', $composePiiKeys)
    [IO.File]::WriteAllText((Join-Path (Get-Location) '.env'), $composeEnv, [Text.UTF8Encoding]::new($false))
}
```

macOS·Linux에서는 OpenSSL을 이용할 수 있습니다.

```sh
if [ ! -f .env ]; then
  compose_db_password=$(openssl rand -hex 24)
  compose_jwt_secret=$(openssl rand -base64 32)
  compose_pii_keys=$(openssl rand -base64 64 | tr -d '\n')
  sed -e "s|replace_with_random_database_password|$compose_db_password|" \
      -e "s|replace_with_base64_encoded_32_random_bytes|$compose_jwt_secret|" \
      -e "s|replace_with_base64_encoded_64_random_bytes|$compose_pii_keys|" \
      .env.example > .env
  chmod 600 .env
fi
```

직접 작성하려면 `.env.example`을 `.env`로 복사한 뒤 `DB_PASSWORD`, `JWT_SECRET`, `PII_KEYS`의 예시 문자열을 실제 값으로 교체합니다. JWT 키는 **정확히 32바이트**, 개인정보 키는 **정확히 64바이트**의 난수를 Base64로 인코딩한 값이어야 합니다.

기존 DB를 사용하는 경우 해당 DB에 사용한 `PII_KEYS`를 그대로 유지합니다. 로컬 백엔드와 같은 DB를 사용하면 키도 같아야 합니다. 처음 적용할 때는 DB를 백업하고 이전 백엔드를 종료한 뒤 시작합니다. 새 백엔드는 시작 시 기존 개인정보를 한 트랜잭션으로 암호화하며, 별도 SQL 파일을 실행할 필요는 없습니다.

| 변수 | 용도 |
| --- | --- |
| `DB_PASSWORD` | Docker DB 비밀번호. 백엔드·AI에 동일한 값 전달 |
| `JWT_SECRET` | JWT 서명키. 실제 비밀값을 저장소에 올리지 않음 |
| `PII_KEYS` | 개인정보 암호화·이메일 조회 키. 기존 DB에서 사용한 값 유지 |
| `SMTP_USERNAME`, `SMTP_PASSWORD` | 가입·비밀번호 재설정 이메일 발송용 Gmail 주소와 Google 앱 비밀번호 |
| `APP_URL` | 브라우저에서 접속하는 출처. 기본 `http://localhost`. 경로와 끝의 `/` 없이 입력 |
| `KAKAO_LOGIN_ENABLED` | 카카오 로그인 활성화 여부. 기본 `false` |
| `KAKAO_CLIENT_ID`, `KAKAO_CLIENT_SECRET` | 카카오 로그인 사용 시 입력 |
| `IMAGEKIT_PRIVATE_KEY` | 상품·후기 이미지 업로드 사용 시 입력 |
| `TOSS_TEST_CLIENT_KEY`, `TOSS_TEST_SECRET_KEY` | 토스 테스트 결제 사용 시 입력 |

### 3. 빌드 및 실행

```sh
docker compose config --quiet
docker compose up -d --build --wait --wait-timeout 300
docker compose ps
```

`config --quiet`는 설정 문법과 필수 변수 누락을 검사합니다. 비밀번호 문자열의 적합성이나 외부 연동 키까지 검사하지는 않습니다. `--build`는 소스에서 이미지를 만들고, `-d`는 백그라운드 실행, `--wait`는 서비스가 준비될 때까지 기다리는 옵션입니다. `--wait-timeout`은 이미지 빌드 시간이 아닌 컨테이너 준비 대기 시간입니다.

실행 후 [http://localhost](http://localhost)에 접속합니다. Docker 프론트는 개발 서버가 아닌 Nginx의 정적 빌드이며 Mock·개발 패널은 사용하지 않습니다.

```sh
curl -i http://localhost/
curl -i http://localhost/api/categories
```

프론트와 카테고리 API가 HTTP 200을 반환하면 기본 연결을 확인할 수 있습니다. `/products/1`처럼 존재 여부와 관계없이 클라이언트 라우트로 직접 진입해도 Nginx는 Vue의 `index.html`을 제공하고, 화면에서 실제 데이터나 오류를 처리합니다.

### 4. 처음 사용할 데이터 준비

새 DB 볼륨으로 처음 실행하면 PostgreSQL 초기화 단계에서 `schema.sql`로 테이블을 만든 뒤 [개발용 데이터 SQL](scripts/seed/README.md)을 자동 실행합니다. 로컬 DB에서 가져온 카테고리·상품·이미지 스냅샷과 생성한 회원·배송지·주문·리뷰·문의가 준비됩니다. 로컬 DB의 회원이나 주문을 가져오지는 않습니다. 기존 DB 볼륨으로 실행하거나 컨테이너를 재시작할 때는 초기화 SQL을 다시 실행하지 않습니다.

초기 데이터의 대표 로그인 계정은 다음과 같습니다.

| 구분 | 이름 | 아이디(이메일) | 비밀번호 |
| --- | --- | --- | --- |
| 관리자 | 김서현 | `admin@example.com` | `SeedDemo123!` |
| 일반 사용자 | 김민준 | `kim.minjun0001@example.com` | `SeedDemo123!` |

공개 주소로 운영하기 전에는 관리자 비밀번호를 변경하고 샘플 계정의 사용 범위를 확인합니다. 기존 DB에 데이터를 추가하려면 [수동 실행 방법](scripts/seed/README.md#실행)을 따릅니다.

별도 계정을 관리자로 지정하려면 다음 절차를 사용할 수 있습니다.

1. 웹에서 회원가입합니다.
2. 관리자 기능을 사용하려면 DB에서 **본인이 관리할 계정 하나**의 역할을 변경합니다.
3. 로그아웃 후 다시 로그인하여 관리자 토큰을 발급받습니다.
4. 관리자 화면에서 카테고리·상품·재고를 등록합니다. 이미지 업로드에는 ImageKit 키가 필요합니다.

DB 콘솔은 외부 포트 없이 다음 명령으로 엽니다.

```sh
docker compose exec db psql -U oishidam -d oishidam
```

로그인한 계정의 `GET /api/members/me` 응답에서 `memberId`를 확인하고, 다음 SQL의 회원 번호 `123`을 그 값으로 바꿔 실행합니다. 이메일은 암호화되어 있어 평문 이메일로 직접 검색할 수 없습니다. `token_version` 변경으로 기존 액세스 토큰을 무효화하므로 다시 로그인해야 합니다.

```sql
UPDATE members
SET role = 'ADMIN', token_version = token_version + 1
WHERE member_id = 123;
```

콘솔 종료는 `\q`입니다. 기존 데이터가 있는 DB의 스키마 변경은 별도 마이그레이션을 검토해야 하며, `schema.sql`의 `CREATE TABLE IF NOT EXISTS`가 기존 테이블의 컬럼을 자동 갱신해 주지는 않습니다.

후기 별점 기능을 기존 DB에 반영할 때는 백엔드 재시작 전에 별점 컬럼과 제약을 별도로 반영해야 합니다. 기존 후기와 본문은 보존하고 별점은 미평가(NULL)로 유지합니다. 신규 개발 DB의 후기 별점은 [시드 안내](scripts/seed/README.md#후기-별점)를 참고합니다.

## 실행 후 자주 쓰는 명령

| 작업 | 명령 |
| --- | --- |
| 실행 상태 | `docker compose ps` |
| 전체 로그 / 실시간 로그 | `docker compose logs --tail=100` / `docker compose logs -f` |
| 특정 서비스 로그 | `docker compose logs -f backend` / `docker compose logs -f ai-service` |
| 일시 중지 / 다시 시작 | `docker compose stop` / `docker compose start` |
| 서비스 재시작 | `docker compose restart backend` |
| 소스 변경 반영 | `docker compose up -d --build --wait --wait-timeout 300` |
| 특정 이미지 다시 빌드 | `docker compose up -d --build frontend` |
| 환경변수 변경 반영 | `docker compose up -d --build --wait --wait-timeout 300` |
| 컨테이너·네트워크 제거, 데이터 유지 | `docker compose down` |
| DB 콘솔 | `docker compose exec db psql -U oishidam -d oishidam` |

`restart`만으로는 변경한 소스·환경변수가 적용되지 않습니다. 현재 구성은 소스 디렉터리를 컨테이너에 연결하지 않으므로 코드 변경 후 이미지를 다시 빌드해야 합니다. `APP_URL`은 프론트 빌드에도 들어가므로 변경 시 프론트 재빌드가 필요합니다.

데이터는 Docker named volume에 보관합니다.

| 볼륨 | 내용 |
| --- | --- |
| `oishidam_postgres_data` | 회원·상품·주문 등 DB 데이터 |
| `oishidam_ai_models` | 최초 감정분석 시 다운로드하는 Hugging Face 모델 캐시 |
| `oishidam_ai_charts` | 생성한 고객 분석 차트 |
| `oishidam_caddy_data` | TLS 인증서·개인키·발급 계정. 재시작·업데이트 시 유지 |
| `oishidam_caddy_config` | Caddy 자동 저장 설정 |

**모든 Docker DB 데이터와 AI 캐시·차트·TLS 인증서를 지우고 처음부터 시작할 때만** 아래 명령을 사용합니다. 일반 종료에는 `down`까지만 사용합니다.

```sh
docker compose down --volumes
docker compose up -d --build --wait --wait-timeout 300
```

`DB_PASSWORD`를 `.env`에서 바꾸더라도 이미 생성된 PostgreSQL 사용자의 비밀번호는 자동 변경되지 않습니다. 기존 데이터를 유지한다면 DB의 사용자 비밀번호도 함께 변경해야 합니다. 비밀번호 변경을 위해 볼륨을 삭제하면 기존 데이터가 사라집니다.

## DB 관리 도구 연결: 필요한 경우에만

기본 구성은 DB 포트를 공개하지 않습니다. DBeaver·DataGrip·pgAdmin에서 DB를 직접 관리할 때만 보조 Compose를 함께 적용합니다.

```sh
docker compose -f compose.yaml -f compose.db-access.yaml up -d --wait --wait-timeout 300
```

| 항목 | 값 |
| --- | --- |
| 호스트 | `127.0.0.1` |
| 포트 | `5433` |
| 데이터베이스 / 사용자 | `oishidam` / `oishidam` |
| 비밀번호 | 루트 `.env`의 `DB_PASSWORD` |

`127.0.0.1:5433:5432`이므로 Docker 호스트에서만 접근할 수 있습니다. `5433:5432`로 바꾸면 외부 인터페이스에도 공개됩니다. [Docker 포트 공개 문서](https://docs.docker.com/engine/network/port-publishing/)

원격 서버의 DB를 관리하려면 **서버에서 위 보조 설정을 적용한 뒤**, 개발 PC에서 SSH 터널을 열어 사용합니다. 서버에 SSH 접속 권한과 포트 포워딩 허용이 필요합니다.

```sh
ssh -N -L 15433:127.0.0.1:5433 user@server-address
```

터널 실행 중 개발 PC의 관리 도구를 `127.0.0.1:15433`에 연결합니다. 원격 서버의 `5433` 포트를 인터넷에 열 필요가 없습니다. 관리를 마친 뒤 서버에서 다음 명령을 실행하면 DB 포트 매핑을 제거합니다.

```sh
docker compose -f compose.yaml up -d db
```

## DB 백업 및 복원

호스트 PowerShell의 바이너리 파이프 문제를 피하기 위해 컨테이너 안에서 덤프 파일을 만든 뒤 복사합니다. 명령에 비밀번호를 직접 적지 않습니다.

```sh
docker compose exec -T db pg_dump -U oishidam -d oishidam -Fc -f /tmp/oishidam.dump
docker compose cp db:/tmp/oishidam.dump ./oishidam-backup.dump
```

백업에는 회원·주문 등 실제 데이터가 들어갈 수 있으므로 저장소에 올리지 말고 별도 보관합니다.

아래 복원은 **현재 DB의 기존 객체·데이터를 백업 내용으로 교체**합니다. 복원할 파일과 대상 DB를 확인한 뒤 사용합니다.

```sh
docker compose stop frontend ai-service backend
docker compose cp ./oishidam-backup.dump db:/tmp/restore.dump
docker compose exec -T db pg_restore -U oishidam -d oishidam --clean --if-exists --no-owner --single-transaction /tmp/restore.dump
docker compose up -d --wait --wait-timeout 300
```

## 다른 PC 또는 서버에서 접속하기

루트 `.env`의 `APP_URL`을 브라우저에서 사용하는 실제 주소로 바꾸고 재빌드합니다. 예를 들어 내부망 서버가 `192.168.0.204`라면 다음과 같이 설정합니다.

```dotenv
APP_URL=http://192.168.0.204
```

```sh
docker compose up -d --build --wait --wait-timeout 300
```

이후 `http://192.168.0.204`로 접속합니다. 호스트 방화벽·클라우드 보안 그룹은 필요한 HTTP `80` 접근을 허용해야 합니다. 프론트·백엔드 `8080`, AI `8000`, DB `5432`는 공개하지 않습니다. 내부 포트가 달라도 브라우저 요청은 모두 공개 프론트 주소를 사용합니다.

### 공개 도메인 HTTPS: oishidam.kro.kr

배포 Windows PC의 Docker Desktop에서 Linux 컨테이너를 사용합니다. 도메인의 DNS A 레코드는 배포 PC가 있는 회선의 공인 IP를 가리켜야 합니다. AAAA 레코드가 있다면 IPv6도 같은 서버로 연결되도록 설정하거나, 사용하지 않는 AAAA 레코드를 제거합니다.

공유기를 사용하면 외부 **TCP 80 → 배포 PC 80**, **TCP 443 → 배포 PC 443**을 각각 포트 포워딩하고 Windows 방화벽에서도 두 포트를 허용합니다. 인증서 갱신에도 필요하므로 계속 유지합니다. 80~443 전체 범위를 열 필요는 없습니다.

1. 이 저장소의 `compose.yaml`, `caddy/Caddyfile`, `frontend/nginx.conf`를 배포 PC의 같은 경로에 반영합니다. 기존 `.env`의 비밀번호·키는 유지합니다.
2. 배포 PC의 루트 `.env`에서 `APP_URL` 한 줄을 다음 값으로 변경합니다.

   ```dotenv
   APP_URL=https://oishidam.kro.kr
   ```

3. 배포 PC의 PowerShell에서 저장소 루트로 이동한 뒤 실행합니다.

   ```powershell
   docker compose config --quiet
   docker compose pull caddy
   docker compose up -d --build --wait --wait-timeout 300
   docker compose ps
   docker compose logs --tail=100 caddy
   ```

`APP_URL`이 프론트 빌드·백엔드 로그인 주소·AI 허용 출처·Caddy에 함께 적용됩니다. 기존 HTTP 프론트를 Caddy 뒤로 옮기는 동안 잠깐 접속이 끊길 수 있습니다. DB 볼륨은 유지하며 `docker compose down --volumes`는 실행하지 않습니다.

Caddy가 외부에서 도메인 소유를 확인한 뒤 무료 인증서를 발급하고 자동 갱신합니다. 컨테이너가 실행 중이라는 사실만으로 발급 완료를 판단하지 말고 로그와 실제 HTTPS 접속을 확인합니다. [Caddy Docker 실행·영구 볼륨 문서](https://caddyserver.com/docs/running#docker-compose)

```powershell
curl.exe -I http://oishidam.kro.kr
curl.exe -I https://oishidam.kro.kr
curl.exe --fail https://oishidam.kro.kr/api/categories
```

HTTP는 HTTPS 주소로 이동하고, HTTPS는 인증서 오류 없이 응답해야 합니다. 동일 공유기 안에서 공인 도메인으로 접속이 안 되면 휴대폰 Wi-Fi를 끄고 모바일 데이터로 확인합니다. 외부에서도 실패하면 공인 IP·DNS·포트 포워딩 대상 PC·Windows 방화벽을 확인합니다.

카카오 로그인을 사용하면 개발자 콘솔에 `https://oishidam.kro.kr/login/oauth2/code/kakao`를 Redirect URI로 등록합니다. 개인키·인증서·`.env`는 다른 사람에게 보내거나 Git에 올리지 않습니다.

### 카카오 로그인

루트 `.env`에 카카오 키와 `KAKAO_LOGIN_ENABLED=true`를 설정하고 백엔드를 재생성합니다. 카카오 개발자 콘솔의 Redirect URI는 **공개 프론트 주소**를 사용합니다.

```text
로컬: http://localhost/login/oauth2/code/kakao
서버: http://서버주소/login/oauth2/code/kakao
HTTPS: https://oishidam.kro.kr/login/oauth2/code/kakao
```

Nginx가 로그인 시작·콜백을 백엔드로 전달하고, 백엔드는 프록시 헤더로 공개 주소를 인식합니다. 브라우저 출처는 `APP_URL`과 일치해야 합니다. [카카오 로그인 사전 설정](https://developers.kakao.com/docs/ko/kakaologin/prerequisite)

### 이미지와 결제

- ImageKit의 서버 전용 비밀키를 `IMAGEKIT_PRIVATE_KEY`에 입력합니다. Nginx 요청 크기는 기존 백엔드의 전체 multipart 제한에 맞춰 55MB로 설정했습니다. 이미지 한 장은 백엔드 기준 최대 10MB입니다.
- 토스 테스트 결제는 주문서형 키 쌍인 `TOSS_TEST_CLIENT_KEY`와 `TOSS_TEST_SECRET_KEY`를 사용합니다. 실제 승인·취소에는 토스 API 접속이 필요합니다.
- 실제 비밀키는 프론트의 `VITE_` 변수에 넣지 않습니다. `VITE_` 값은 빌드한 브라우저 코드에 공개됩니다.

## 화면 및 API 경로

| 화면 | 경로 |
| --- | --- |
| 홈 / 상품 목록 / 상품 상세 | `/`, `/products`, `/products/:productId` |
| 로그인 / 회원가입 | `/login`, `/signup` |
| 주문·결제 | `/checkout`, `/payment/success`, `/payment/fail` |
| 마이페이지 | `/mypage` 아래 주문·후기·문의·배송지·프로필·장바구니·찜 |
| 관리자 | `/admin` 아래 상품·카테고리·주문·회원·문의·후기·고객 분석·감정분석 |

Spring API의 요청·응답 명세는 [Swagger UI](http://localhost/swagger-ui/index.html)를 참고합니다. 공개 프론트 주소를 통해 접근하며 백엔드 포트를 따로 열지 않습니다.

| API | 경로 |
| --- | --- |
| 인증·현재 회원 | `/api/auth`, `/api/members/me` |
| 상품·카테고리·추천 | `/api/products`, `/api/categories`, `/api/recommendations/products` |
| 찜·장바구니 | `/api/wishes`, `/api/cart` |
| 주문·결제 | `/api/orders`, `/api/orders/{orderId}/payments`, `/api/payments` |
| 후기·문의 | `/api/reviews`, `/api/products/{productId}/reviews`, `/api/inquiries` |
| 관리자·대시보드 | `/api/admin/*`, `/api/admin/dashboard/*` |
| 관리자 고객 분석·후기 분석 | `/api/admin/analytics/customers`, `/api/admin/reviews/analytics` |
| AI 개인화 추천 | `/api/ai/recommend/products` |
| AI 감정분석 | `/api/ai/sentiment/*` |
| AI 고객 분석 | `/api/ai/analytics/customers` |

인증이 필요한 API에는 `Authorization: Bearer <accessToken>`을 전달합니다. AI도 백엔드의 현재 회원 조회로 JWT와 권한을 확인합니다. 개인화 추천과 본인 후기 단건 분석 외의 AI 업무 API는 관리자 권한이 필요합니다. AI 서비스의 `/health`, `/docs`, `/docs/oauth2-redirect`, `/redoc`, `/openapi.json`은 로그인 없이 접근할 수 있습니다. Docker 배포 PC에서는 [AI 상태 확인](http://localhost:8000/health), [Swagger UI](http://localhost:8000/docs), [ReDoc](http://localhost:8000/redoc), [OpenAPI](http://localhost:8000/openapi.json)을 사용할 수 있습니다. 8000 포트는 로컬 전용이므로 다른 PC에서는 직접 접근할 수 없습니다.

## Docker 없이 개발하기

호스트에 Java 21, Node.js, Python 3.12, PostgreSQL을 준비합니다. 서비스별 실행 안내는 [백엔드 README](backend/README.md), [프론트 README](frontend/README.md), [AI README](ai-service/README.md)를 참고하며, 통합 저장소에서는 각각 `backend`, `frontend`, `ai-service` 폴더를 사용합니다.

1. `backend/.env.example`을 `backend/.env`로 복사하고 JWT·외부 연동 키를 입력합니다. DB는 `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`로 지정합니다.
2. `ai-service/.env.example`을 `ai-service/.env`로 복사하고 백엔드와 같은 DB, `SPRING_API_URL=http://localhost:8080/api`를 지정합니다.
3. `frontend/.env.example`을 `frontend/.env.development.local`로 복사하고 `VITE_API_BASE_URL=http://localhost:8080/api`, `VITE_AI_API_BASE_URL=http://localhost:8000`을 지정합니다. 저장소의 `.env.development`에 다른 개발 서버 주소가 있으므로 개인 설정 파일로 덮어씁니다.

각각 별도 터미널에서 실행합니다. 다음은 Windows PowerShell 기준입니다.

```powershell
# 터미널 1: 백엔드
cd backend
.\gradlew.bat bootRun
```

```powershell
# 터미널 2: AI
cd ai-service
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --app-dir app --host 0.0.0.0 --port 8000 --reload
```

```powershell
# 터미널 3: 프론트
cd frontend
npm ci
npm run dev
```

개발 프론트 기본 주소는 `http://localhost:5173`입니다. `backend/.env`의 `FRONTEND_URL`과 AI의 `FRONTEND_ORIGINS`도 이 출처에 맞춥니다. macOS·Linux에서는 `./gradlew bootRun`, 가상환경의 `.venv/bin/python`을 사용합니다.

Docker DB를 개발 서버에서 재사용하려면 위 DB 관리 보조 설정을 켜고 DB 주소를 `localhost:5433`, DB·사용자를 `oishidam`, 비밀번호를 루트 `.env`의 값으로 맞춥니다.

### 빌드·검증 명령

```sh
docker compose config --quiet
docker compose build
docker compose up -d --wait --wait-timeout 300
```

로컬에서는 `frontend`의 `npm run build`, `backend`의 `./gradlew bootJar` 또는 Windows `gradlew.bat bootJar`로 각각 빌드합니다. 로컬 테스트가 있는 환경에서는 프론트의 `npm test`, 백엔드의 `gradlew.bat test`를 사용할 수 있습니다. Docker 이미지 빌드는 테스트를 실행하지 않습니다.

**테스트 파일은 프로젝트 정책에 따라 로컬 검증에만 사용하며 Git에 추가·스테이징·커밋하지 않습니다.** 테스트 추적을 위해 기존 `.gitignore`를 완화하거나 강제 추가하지 않습니다. 새로 받은 저장소에는 개인 로컬 테스트가 없을 수 있습니다.

## 문제 해결

| 증상 | 확인할 내용 |
| --- | --- |
| Docker API/daemon 연결 실패 | Docker Desktop·Engine 실행 여부, Linux 컨테이너 모드, `docker info` |
| 필수 환경변수 오류 | 저장소 루트 `.env`의 `DB_PASSWORD`, `JWT_SECRET` |
| JWT 키 길이 오류 | 예시 문자열을 실제 32바이트 난수의 Base64 값으로 바꿨는지 확인 |
| `port is already allocated` | 호스트의 80·443 포트 사용 프로세스, 선택적 DB 연결 시 5433 사용 여부 |
| HTTPS 인증서 발급 실패 | `docker compose logs --tail=100 caddy`, DNS A/AAAA·공인 IP·TCP 80/443 포워딩·Windows 방화벽 확인 |
| `unhealthy`, 준비 시간 초과 | `docker compose logs --tail=100 db backend ai-service frontend`로 원인 확인 |
| Nginx 502 | backend·ai-service의 실행·healthcheck 확인. 해당 컨테이너만 재생성한 뒤에는 `docker compose restart frontend`로 프록시 연결도 갱신 |
| API 인증 오류 | 업무 API는 로그인·토큰 만료·현재 회원 상태·권한 확인. AI `/health`·문서 조회는 로그인 없이 200 응답이어야 함 |
| 다른 PC에서 AI 요청이 localhost로 감 | 루트 `.env`의 `APP_URL`을 실제 접속 출처로 바꾸고 frontend 재빌드 |
| 카카오 콜백 실패 | 공개 주소의 Redirect URI 등록, `APP_URL`과 실제 브라우저 출처 일치 여부 |
| 이미지 업로드·결제 실패 | 외부 연동 키·서비스 네트워크 접근·요청 크기 확인 |
| DB 비밀번호 변경 후 연결 실패 | 기존 DB 사용자의 비밀번호도 변경했는지 확인 |
| 첫 감정분석이 오래 걸림 | Hugging Face 모델 다운로드·CPU 추론 시간 확인. 초기 요청은 프록시·API 대기 시간을 초과할 수 있음 |
| Docker를 껐다 켜도 데이터가 남음 | named volume의 의도된 동작. 일반 `down`은 데이터를 삭제하지 않음 |

## 알려진 제한

- 감정분석 모델은 첫 요청에 다운로드·로드합니다. 모델을 사용할 수 없으면 기존 코드의 KNU 감성사전 분석으로 대체할 수 있으므로 응답의 `model`과 로그로 실제 분석 출처를 확인합니다.
- 기본 Compose는 GPU 장치를 연결하지 않는 CPU 실행 구성입니다. 기존 `requirements.txt`는 유지하므로 사용하지 않는 TensorFlow·Keras 등도 이미지에 설치됩니다.
- 상품·주문 데이터 자동 시딩, 기존 DB 자동 이관, 외부 서비스 계정·키 발급은 포함하지 않습니다.
