<template>
  <footer class="site-footer">
    <div class="site-container footer-content">
      <div class="footer-company" aria-label="회사 정보">
        <p class="footer-info-row">
          <span>(주)오이시담</span>
          <span>대표자 : 김오이</span>
          <span>사업자등록번호 : 123-45-67890</span>
        </p>
        <div class="footer-bottom-row">
          <p class="footer-info-row">
            <span>서울특별시 강남구 테헤란로 123, 10층</span>
            <span>고객센터 : 02-1588-0000</span>
            <span>이메일 : support@oishidam.co.kr</span>
          </p>
          <p class="footer-copyright">© 2026 Oishidam Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 푸터 배경과 콘텐츠 여백 */
.site-footer {
  background-color: #FFF7F8;
  color: var(--color-text, #392C32);
  text-align: left;
}

.footer-content {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 120px;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* 데스크톱 · 헤더와 상품 영역의 좌우 기준선에 맞춤 */
@media (min-width: 1101px) {
  .footer-content {
    width: min(100% - 80px, 1020px);
  }
}

/* 회사 정보 · 넓은 화면에서는 두 줄로 표시 */
.footer-company {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  line-height: 1.7;
}

.footer-info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  margin: 0;
}

.footer-info-row span + span::before {
  content: '|';
  margin: 0 12px;
  color: #b6a8ae;
}

/* 주소와 저작권 · 같은 줄의 좌우에 배치 */
.footer-bottom-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px 24px;
}

.footer-copyright {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
}

/* 모바일 · 각 항목을 세로로 표시 */
@media (max-width: 650px) {
  .footer-content {
    padding-top: 28px;
    padding-bottom: 28px;
  }

  .footer-info-row {
    flex-direction: column;
    gap: 4px;
  }

  .footer-info-row span + span::before {
    content: none;
  }
}
</style>
