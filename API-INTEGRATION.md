# 프런트엔드 API 연결 기준

2026-11-12 첨부 최종 API 상세 명세를 기준으로 정리했습니다. 이 문서는 화면별로 호출할 API와 현재 연결 상태를 안내합니다.

## 실행 및 공통 계약

- `VITE_API_BASE_URL`에 Spring Boot 주소를 설정합니다. `/api` 접두사는 공통 요청 모듈에서 한 번 적용합니다.
- 개발 모드에서 모의 데이터 사용을 끄면 실제 서버를 호출합니다. 회원정보·배송지 변경은 로그인 응답의 액세스 토큰을 Bearer 헤더로 전달합니다.
- 성공 응답은 `data`를 사용하고 목록 페이지 메타데이터는 `page`로 읽습니다. 페이지 번호는 0부터 시작합니다. 204 응답은 본문 없이 처리합니다. 오류는 서버의 `code`, `message`, `details`를 전달합니다.
- 프런트는 Spring Boot의 공개 API를 호출합니다. 추천 계산 및 감정 분석용 `/internal/*`는 Spring Boot에서 FastAPI로 호출하는 내부 경로입니다.

## 현재 화면 연결

| 화면 | API | 반영 기준 |
| --- | --- | --- |
| 이메일 가입·로그인·로그아웃 | `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout` | 가입의 비밀번호 확인과 필수 약관 체크는 화면에서 검증. 실제 가입 요청에는 명세의 필드만 전송. 로그아웃은 Bearer와 refreshToken 사용. |
| 회원정보 | `GET /api/members/me`, `PATCH /api/members/me` | 휴대폰 번호는 숫자 문자열, 출생연도는 정수, 성별은 M/F. 출생연도·성별 삭제 표현은 명세에 없어 기존 값 해제 기능을 제공하지 않음. |
| 비밀번호 변경 | `PUT /api/members/me/password` | currentPassword와 newPassword만 전송. 영문·숫자·ASCII 특수문자 각 1개 이상, 최소 8자·UTF-8 최대 72바이트. 허용 문자 범위는 출력 가능한 ASCII로 적용. 성공하면 세션을 비우고 로그인 화면으로 이동. |
| 배송지 | `GET/POST /api/addresses`, `PATCH/DELETE /api/addresses/{addressId}`, `PATCH /api/addresses/{addressId}/default` | 서버의 addressId와 camelCase 필드 사용. recipientPhone은 숫자 문자열. 기본 배송지 변경은 전용 PATCH. 배송지 메모는 모의 화면에만 표시하며 실 API에서는 주문 생성의 deliveryMemo로 받는 계약. |
| 상품·카테고리·추천 조회 | `GET /api/products`, `GET /api/products/{productId}`, `GET /api/categories`, `GET /api/recommendations/products` | 홈 목록·추천을 실 API 모드에 연결. 목록 요청은 categoryId와 0부터 시작하는 page를 사용. 서버 정렬 코드가 미정이라 홈에서 실 API의 기본 정렬 사용. 상품 목록·상세 라우트는 구현 시 조회 서비스 재사용. |

## 다음 화면을 구현할 때 호출할 API

| 화면 | 지정 API | 현재 상태 또는 확인 사항 |
| --- | --- | --- |
| 카카오 로그인 | `POST /api/auth/kakao` | authorizationCode, redirectUri, state 필요. 현재 모의 로그인만 있음. |
| 토큰 재발급 | `POST /api/auth/refresh` | refreshToken의 Body/쿠키 전달 방식 확정 후 자동 재발급 연결. |
| 회원 탈퇴 | `DELETE /api/members/me` | 메뉴만 있음. 성공 시 로그인 세션 종료. |
| 찜 | `GET /api/wishes`, `PUT/DELETE /api/wishes/{productId}` | 현재 로컬 저장. 명세가 구현 전 설계안이며 응답 필드가 미확정. |
| 장바구니 | `GET/POST /api/cart`, `PATCH/DELETE /api/cart/{itemId}` | 현재 로컬 장바구니. 서버 연결 시 variantId로 담고 cartItemId로 변경·삭제. 화면에 필요한 이미지·옵션명·최대 수량은 조회 응답 필드 확인 필요. |
| 주문·결제 | `POST /api/orders/quote`, `POST /api/orders`, `POST /api/orders/{orderId}/payments`, `POST /api/orders/{orderId}/payments/confirm` | 현재 주문 버튼은 준비 안내. 서버가 견적·결제 상태를 결정. 배송 메모는 주문 생성에서 선택 입력, 최대 255자. |
| 주문 내역 | `GET /api/orders`, `GET /api/orders/{orderId}`, `POST /api/orders/{orderId}/cancel` | 현재 예시 데이터. 목록 API는 상태·페이지를 지원하며 현재 화면의 주문번호·상품명 검색과 기간 조건은 명세에 없음. 상품명·주문일 등 목록 UI에 필요한 응답 필드 확인 필요. |
| 고객 리뷰 | `GET /api/products/{productId}/reviews`, `GET/POST /api/orders/items/{orderItemId}/review`, `PATCH/DELETE /api/reviews/{reviewId}` | 화면 구현 시 작성·수정 권한과 기한은 서버 결과 사용. |
| 고객 문의 | `GET/POST /api/inquiries`, `GET /api/inquiries/{inquiryId}`, `POST /api/inquiries/{inquiryId}/messages` | 화면 구현 시 공개 목록은 제목 범위, 상세는 소유자 권한 적용. |
| 관리자 | 최종 명세의 `/api/admin/*` | 현재 프런트에 관리자 화면 없음. 관리자 전용 요청과 상태·권한 검증을 적용. |

## 서버 팀에 확인할 명세

- 로그인 성공의 `member` 필드 형태와 로그아웃 성공 상태. 공통 설명에는 204, 개별 AUTH-005에는 200과 `data: null`이 적혀 있으며 프런트는 두 형태를 처리합니다.
- 상품 목록·배송지 목록의 `data`가 배열인지 이름 있는 객체인지. 프런트는 두 표기 형태를 처리합니다. 실 상품 정렬 코드와 상세 이미지·옵션의 세부 필드도 확인이 필요합니다.
- 일시의 시간대 표기. 공통 규칙은 오프셋 없는 ISO 8601이지만 리뷰 예시는 `+09:00`을 포함합니다.
- 기본 배송지 삭제 후 새 기본 배송지 지정 정책, 그리고 회원정보 PATCH에서 선택 필드의 기존 값을 지울 때 사용할 값.
