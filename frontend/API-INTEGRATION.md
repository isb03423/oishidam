# 프런트엔드 API 연결 기준

2026-11-12 첨부 최종 API 상세 명세를 기준으로 정리했습니다. 이 문서는 화면별로 호출할 API와 현재 연결 상태를 안내합니다.

## 실행 및 공통 계약

- `VITE_API_BASE_URL`에 Spring Boot 주소를 설정합니다. `/api` 접두사는 공통 요청 모듈에서 한 번 적용합니다.
- 개발 모드에서 모의 데이터 사용을 끄면 실제 서버를 호출합니다. 회원정보·배송지 변경은 로그인 응답의 액세스 토큰을 Bearer 헤더로 전달합니다.
- 성공 응답은 `data`를 사용하고 상품 목록의 Spring Page 응답은 `data.content`, `data.totalElements`, `data.number`, `data.size`로 읽습니다. 페이지 번호는 0부터 시작합니다. 204 응답은 본문 없이 처리합니다. 오류는 서버의 `code`, `message`, `details`를 전달합니다.
- enum 응답은 한글 표시명입니다. 예: 주문 `결제 완료`, 판매 상태 `판매 중`, 권한 `관리자`·`일반 회원`, 성별 `남성`·`여성`, 결제사 `토스페이먼츠`. 요청 본문과 주문 상태 필터는 기존 코드와 한글 표시명을 모두 허용합니다. 프론트 내부의 권한·성별 비교에는 회원 정보 변환 함수가 기존 코드를 유지합니다.
- AI 추천 메뉴와 마이페이지는 `VITE_AI_API_BASE_URL`의 FastAPI에 `GET /api/ai/recommend/products`를 직접 호출합니다. FastAPI는 기존 로그인 토큰을 Spring Boot의 `/api/members/me`로 확인한 뒤 추천 상품을 반환합니다. 이 흐름은 로그인 액세스 토큰을 사용합니다.
- AI 서비스의 DB 설정은 Spring Boot와 같은 PostgreSQL을 가리켜야 합니다. Spring Boot 주소를 바꿨다면 FastAPI의 `SPRING_API_URL`을 변경하고, 프런트 주소나 포트를 바꿨다면 `FRONTEND_ORIGINS`에 프런트 출처를 추가합니다. 로컬에서는 `ai-service`에서 `python -m uvicorn main:app --app-dir app --host 127.0.0.1 --port 8000`으로 실행할 수 있습니다.
- 찜과 최근 180일의 구매 내역으로 개인화하고, 남는 자리는 같은 10년 단위 연령대·성별 고객의 최근 180일 판매 수량 상위 상품으로 채웁니다. 회원 정보 또는 그룹 구매 내역이 부족하면 추천 가능한 상품 수만 반환합니다.

## 현재 화면 연결

| 화면 | API | 반영 기준 |
| --- | --- | --- |
| 이메일 가입·로그인·로그아웃 | `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout` | 가입의 비밀번호 확인과 필수 약관 체크는 화면에서 검증하고, 실제 가입 요청에도 필수 passwordConfirm을 전송해 서버에서 일치 여부를 재검증한다. 로그아웃은 Bearer와 refreshToken 사용. |
| 로그인 유지·토큰 재발급 | `POST /api/auth/refresh`, `GET /api/members/me` | 시작 시 갱신 토큰을 회전하고 회원정보를 조회한 뒤 라우터를 시작한다. 인증된 요청이 401이면 한 번만 재발급·재시도하며 동시 재발급을 공유한다. 서버 장애 시 갱신 토큰을 보존하고 재시도 안내를 표시한다. |
| 카카오 로그인 | `GET /oauth2/authorization/kakao`, `GET /api/members/me` | 백엔드 카카오 인증 팝업의 출처·창·토큰 응답을 검증한 뒤 회원 정보를 조회하고 로그인. 액세스 토큰은 메모리 보관. 갱신 토큰은 기본 sessionStorage, 자동 로그인 선택 시 localStorage에 보관하며 시작 시 서버 검증 후 복원. |
| 회원정보 | `GET /api/members/me`, `PATCH /api/members/me` | 휴대폰 번호는 숫자 문자열, 출생연도는 정수, 성별은 M/F. 출생연도·성별 삭제 표현은 명세에 없어 기존 값 해제 기능을 제공하지 않음. |
| 비밀번호 변경 | `PUT /api/members/me/password` | currentPassword와 newPassword만 전송. 영문·숫자·ASCII 특수문자 각 1개 이상, 최소 8자·UTF-8 최대 72바이트. 허용 문자 범위는 출력 가능한 ASCII로 적용. 성공하면 세션을 비우고 로그인 화면으로 이동. |
| 배송지 | `GET/POST /api/members/me/addresses`, `PATCH/DELETE /api/members/me/addresses/{addressId}`, `PATCH /api/members/me/addresses/{addressId}/default` | 서버의 addressId와 camelCase 필드 사용. recipientPhone은 숫자 문자열. customsCode는 선택 입력(P와 숫자 12자리)이며 배송지 선택 시 주문서에 자동 입력한다. 기본 배송지 변경은 전용 PATCH. 배송지 메모는 모의 화면에만 표시하며 실 API에서는 주문 생성의 deliveryMemo로 받는 계약. |
| 상품·카테고리·추천 조회 | `GET /api/products`, `GET /api/products/{productId}`, `GET /api/categories`, `GET /api/recommendations/products` | 홈 목록·추천을 실 API 모드에 연결. 목록 요청은 categoryId와 0부터 시작하는 page를 사용. 상품 목록의 Page 응답과 상품 단위 price·stockQuantity·primaryImage 응답을 변환한다. 상품 상세는 옵션 선택 없이 수량으로 담는다. |
| 장바구니 | `GET/POST /api/cart`, `PATCH/DELETE /api/cart/{itemId}` | 실제 로그인 계정의 서버 장바구니 조회·담기·수량 변경·삭제 연결. productId로 담고 cartItemId로 변경·삭제한다. 서버 가격·재고·구매 가능 여부와 대표 이미지를 표시한다. 로그인 변경·로그아웃 후 이전 응답은 반영하지 않는다. |
| 고객 문의 | `GET /api/inquiries/mine`, `POST /api/inquiries`, `GET/DELETE /api/inquiries/{inquiryId}` | 게시글 하나에 문의 본문과 관리자 답변 하나를 표시한다. 추가 문의 입력·전송 API는 제거했다. 답변 전 본인 문의만 삭제할 수 있다. 목록의 상태별 건수·페이지 이동과 오류 안내 모달을 제공한다. |
| 상품 리뷰 조회 | `GET /api/products/{productId}/reviews` | 상품 상세 리뷰 탭 진입 시 목록·전체 건수·사진·관리자 답변을 자동 조회한다. 서버 페이지 이동을 지원한다. 응답에 별점 필드가 없어 실제 데이터에 별점이나 평균을 임의로 표시하지 않는다. 모의 화면 디자인은 유지한다. |

## 주문·후기 및 관리자 연결

| 화면 | 지정 API | 현재 상태 또는 확인 사항 |
| --- | --- | --- |
| 회원 탈퇴 | `DELETE /api/members/me` | 화면과 연결 완료. 성공 시 로그인 세션을 종료한다. |
| 찜 | `GET /api/wishes`, `PUT/DELETE /api/wishes/{productId}` | 회원 로그인 시 서버 목록을 자동 조회하고 공통 상품 카드·상세·마이페이지에 공유한다. 실 계정은 브라우저의 과거 찜 목록을 복원하지 않는다. 삭제는 성공한 상품만 제거하며 실패는 공통 모달로 알린다. 관리자·비회원은 회원 전용 API를 호출하지 않는다. |
| 주문·결제 | `GET /api/payments/config`, `POST /api/orders/quote`, `POST /api/orders`, `POST /api/orders/{orderId}/payments`, `POST /api/orders/{orderId}/payments/confirm` | 주문서 진입 시 공개 클라이언트 키로 결제 수단을 자동 표시한다. 결제하기를 누르면 서버 견적과 주문 금액을 확인하고 주문·결제 요청을 생성한다. 상품과 배송지·요청사항·통관번호는 탭 저장소에 보관하며 새로고침 시 복원 여부를 묻는다. 결제 수단·약관 동의는 복원하지 않는다. 기존 DB에는 백엔드 통관번호 마이그레이션이 필요하다. |
| 주문 내역 | `GET /api/orders`, `GET /api/orders/{orderId}`, `POST /api/orders/{orderId}/cancel` | 기존 디자인에 목록·상세·주문 취소 연결 완료. 기간·주문번호/상품명 검색·서버 페이지 이동과 결제 대기 제외를 지원한다. |
| 고객 후기 관리 | `GET /api/reviews/eligible`, `GET /api/reviews/mine`, `POST /api/orders/items/{orderItemId}/review`, `PATCH/DELETE /api/reviews/{reviewId}` | 마이페이지 목록·전체 건수·페이지 이동·사진 첨부 작성·내용/사진 수정·삭제를 연결했다. 작성은 배송 완료 후 30일, 수정·삭제는 작성 후 24시간의 서버 정책을 적용한다. 삭제된 리뷰는 재작성하지 못한다. 수정은 multipart의 request(JSON: content, retainedImageUrls)와 files로 기존 사진 유지·제거·새 사진 추가를 전달한다. 사진은 최대 5장, 장당 10MB이며 파일 형식은 JPEG/PNG/GIF/WebP이다. |
| 관리자 대시보드 | `GET /api/admin/dashboard/operations?days=7/14/30` | 서버 집계의 매출·주문·신규 회원·상태별 주문과 최근 주문을 표시한다. 운영 알림은 재고 확인 상품·답변 대기 문의·미답변 리뷰 탭을 선택하면 해당 표의 제목 열·행·상태·관리 동작을 함께 변경한다. 알림·주문번호에서 해당 관리 상세로 이동한다. 주문 전체 건수는 최근 주문 5건과 구분한다. |
| 관리자 카테고리 | `GET/POST /api/admin/categories`, `PUT/DELETE /api/admin/categories/{categoryId}` | 상위·하위 트리와 별도 편집 패널로 관리한다. 접기·펼치기, 경로를 유지하는 로컬 검색, 하위 바로 추가를 지원한다. 상·중 2단계까지만 허용한다. 중분류의 하위 추가를 숨기고 이동할 하위 분류의 높이까지 계산해 상위 선택을 제한한다. 서버도 3단계 등록·이동을 거부한다. 표시 순서·사용 여부를 등록/수정/삭제한다. 순환 참조·사용 중 분류 삭제는 서버 오류를 표시한다. 메뉴는 카테고리 관리 → 상품·재고 관리 순서다. |
| 관리자 상품·이미지 | `GET/POST /api/admin/products`, `GET/PUT/DELETE /api/admin/products/{productId}`, `PATCH /api/admin/products/{productId}/status`, `POST /api/admin/products/{productId}/images`, `PUT/DELETE /api/admin/products/{productId}/images/{imageId}` | 서버 페이지·이름/브랜드 검색, 상품 등록/편집/삭제, 판매 상태 변경, URL 또는 파일 이미지 등록·대표/순서/대체 텍스트 편집·삭제를 연결했다. 상품·재고 관리 화면에서 등록·수정 시 재고 수량도 함께 저장한다. 수정은 expectedStockQuantity로 동시 변경을 검증하며 충돌 시 최신 값을 다시 읽는다. GET /api/admin/products/{productId}/stock-history로 상세 화면 아래에 재고 변경 이력을 표시한다. 기존 /admin/inventory 주소는 /admin/products로 이동한다. |
| 관리자 주문 | `GET /api/admin/orders`, `GET /api/admin/orders/{orderId}`, `PATCH /api/admin/orders/{orderId}/status` | 주문번호/수령인·상태·기간 검색, 상세 수령인/상품/금액/상태 이력 및 서버가 허용한 다음 배송 단계 변경을 처리한다. 결제·취소 상태는 임의로 전환하지 않는다. |
| 관리자 회원 | `GET /api/admin/members`, `GET /api/admin/members/{memberId}`, `PATCH /api/admin/members/{memberId}/status` | 검색·활성 필터·상세 및 활성/비활성 상태 변경을 연결했다. 화면의 모의 관리 메모는 실 API에 저장하지 않는다. |
| 관리자 문의·리뷰 | `GET /api/admin/inquiries`, `GET /api/admin/inquiries/{inquiryId}`, `POST /api/admin/inquiries/{inquiryId}/messages`, `GET /api/admin/reviews`, `GET /api/admin/reviews/{reviewId}`, `PUT /api/admin/reviews/{reviewId}/answer` | 문의 목록은 memberName으로 실제 작성자 이름을 표시하고 날짜·시간은 한 줄로 표시한다. 답변하기 버튼으로 채팅형 모달을 열어 문의·답변 확인과 최초 답변 등록을 처리한다. 수동 상태 변경 API와 고객 추가 문의 API는 제거했다. 최초 관리자 답변 시 ANSWERED로 전환하며 재답변은 409로 거부한다. 완료된 문의는 답변 보기만 제공한다. 리뷰 사진·관리자 답변 등록/수정도 연결했다. 실 리뷰에는 API에 없는 별점을 표시하지 않는다. 검색/필터 및 서버 페이지 이동을 제공한다. |
| 관리자 고객 분석 | `GET /api/admin/analytics/customers`, `GET /api/admin/analytics/customers/members`, `GET/POST /api/admin/analytics/customers/reanalyze` | 고객 분석 결과와 회원 목록 조회, 재분석 시작과 진행 상태 조회에 사용한다. |

## 서버 팀에 확인할 명세

- 로그인 성공의 `member` 필드 형태와 로그아웃 성공 상태. 공통 설명에는 204, 개별 AUTH-005에는 200과 `data: null`이 적혀 있으며 프런트는 두 형태를 처리합니다.
- 상품 목록·배송지 목록의 `data`가 배열인지 이름 있는 객체인지. 프런트는 두 표기 형태를 처리합니다. 실 상품 정렬 코드와 상세 이미지 필드도 확인이 필요합니다.
- 일시의 시간대 표기. 공통 규칙은 오프셋 없는 ISO 8601이지만 리뷰 예시는 `+09:00`을 포함합니다.
- 기본 배송지 삭제 후 새 기본 배송지 지정 정책, 그리고 회원정보 PATCH에서 선택 필드의 기존 값을 지울 때 사용할 값.

관리자 주문 목록·상세와 리뷰 목록·상세는 memberName으로 주문자·작성자를 표시한다. 재고 이력은 actorName으로 처리자를 표시하며 자동 처리는 시스템으로 표시한다. 표시 이름은 관리자 전용 API에서 조회한다.

후기 관리 목록은 `GET /api/admin/reviews?answered=true/false`로 답변 완료·대기를 필터링한다. 응답의 productName은 주문 당시 상품명을 사용한다. 문의·후기는 공통 답변 모달을 사용하고 대시보드에서도 페이지 이동 없이 열어 저장 후 알림 건수를 갱신한다.
