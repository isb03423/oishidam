<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  slides: { type: Array, default: () => [] },
})
const activeIndex = ref(0)
const currentSlide = computed(() => props.slides[activeIndex.value])
const hasMultipleSlides = computed(() => props.slides.length > 1)

watch(() => props.slides, () => { activeIndex.value = 0 })
function moveSlide(direction) {
  if (!hasMultipleSlides.value) return
  activeIndex.value = (activeIndex.value + direction + props.slides.length) % props.slides.length
}

function formatSlideNumber(index) {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <section
    v-if="currentSlide"
    class="main-banner"
    aria-roledescription="캐러셀"
    aria-label="오이시담 추천 컬렉션"
  >
    <Transition name="banner-fade" mode="out-in">
      <RouterLink
        :key="currentSlide.id"
        class="banner-visual"
        :to="currentSlide.to"
        :aria-label="`${currentSlide.title.replace(/\n/g, ' ')} · ${currentSlide.buttonLabel}`"
      >
        <img
          class="banner-image"
          :src="currentSlide.image"
          :alt="currentSlide.imageAlt || ''"
          width="1720"
          height="916"
          fetchpriority="high"
        />
        <div class="banner-shade" aria-hidden="true"></div>
        <div class="banner-content">
          <h1 class="banner-title">{{ currentSlide.title }}</h1>
          <p class="banner-description">{{ currentSlide.description }}</p>
          <span class="banner-cta">
            {{ currentSlide.buttonLabel }}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </RouterLink>
    </Transition>

    <div class="banner-controls">
      <div class="banner-navigation">
      <button
        type="button"
        class="banner-arrow"
        aria-label="이전 배너"
        :disabled="!hasMultipleSlides"
        @click="moveSlide(-1)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
      </button>
      <p class="banner-pagination" aria-live="polite">
        <strong>{{ formatSlideNumber(activeIndex) }}</strong>
        <span aria-hidden="true">/</span>
        <span>{{ formatSlideNumber(slides.length - 1) }}</span>
      </p>
      <button
        type="button"
        class="banner-arrow"
        aria-label="다음 배너"
        :disabled="!hasMultipleSlides"
        @click="moveSlide(1)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
      </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 배너 기본 영역 */
.main-banner {
  --banner-ink: var(--color-text);
  --banner-muted: var(--color-secondary);
  --banner-navigation-width: 162px;
  position: relative;
  isolation: isolate;
  width: 100%;
  height: clamp(420px, 28vw, 620px); 
  overflow: hidden;
  background: var(--color-background);
  color: var(--banner-ink);
}

/* 배경 이미지와 가독성 오버레이 */
.banner-visual,
.banner-image,
.banner-shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* 배너 전체를 하나의 링크로 사용 · 슬라이드 조작 버튼은 별도 유지 */
.banner-visual,
.banner-visual:hover {
  color: inherit;
  text-decoration: none;
}

.banner-visual:focus-visible {
  outline: 3px solid #76617e;
  outline-offset: -4px;
}

.banner-image {
  display: block;
  object-fit: cover;
  object-position: center;
}

.banner-shade {
  background: linear-gradient(90deg, rgb(255 247 248 / 48%), transparent 58%);
}

/* 문구 배치 */
.banner-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: min(100% - 80px, 1320px);
  height: 100%;
  margin: 0 auto;
  padding: 44px 0 60px;
}

.banner-title {
  margin: 0;
  font-size: clamp(34px, 3.15vw, 54px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -.045em;
  white-space: pre-line;
  word-break: keep-all;
}

.banner-description {
  margin: 18px 0 24px;
  color: var(--banner-muted);
  font-size: clamp(14px, 1.1vw, 17px);
  line-height: 1.7;
  word-break: keep-all;
}

/* 말차 간식 보기 버튼 · 높이와 여백은 여기서 조정 */
.banner-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 40px;
  padding: 7px 18px;
  border-radius: 7px;
  background: var(--banner-ink);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  transition: background .18s ease;
}

.banner-cta:hover {
  background: var(--color-primary);
  color: #fff;
}

.banner-cta span {
  font-size: 19px;
  line-height: 1;
}

/* 슬라이드 조작부 배치 */
.banner-controls {
  position: absolute;
  /* CTA와 시선 흐름이 이어지도록 하단에서 조금 위로 배치 */
  bottom: 40px;
  left: 50%;
  display: flex;
  align-items: center;
  width: min(100% - 80px, 1020px);
  gap: 16px;
  transform: translateX(-50%);
  pointer-events: none;
}

/* 기존 '말차 간식 보기' 버튼의 자연스러운 너비와 맞춘 이동바 */
.banner-navigation {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--banner-navigation-width);
}

/* 데스크톱 · 배경은 전체 폭, 내부 콘텐츠는 헤더와 같은 기준선 */
@media (min-width: 1101px) {
  .banner-content {
    width: min(100% - 80px, 1020px);
  }

  .banner-controls {
    width: min(100% - 80px, 1020px);
  }
}

/* 이전 · 다음 버튼 */
.banner-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 1px solid rgb(52 69 47 / 45%);
  border-radius: 999px;
  background: rgb(255 255 255 / 36%);
  color: var(--banner-ink);
  cursor: pointer;
  transition: background .18s ease;
}

.banner-arrow:hover:enabled {
  background: rgb(255 255 255 / 70%);
}

.banner-arrow:disabled {
  opacity: .4;
  cursor: default;
}

.banner-arrow svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 하단 페이지 표시 · 현재 번호와 전체 번호 */
.banner-pagination {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  color: rgb(52 69 47 / 65%);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.banner-pagination strong {
  color: var(--color-primary);
  font-weight: 700;
}

/* 키보드 포커스 표시 */
.banner-arrow:focus-visible {
  outline: 3px solid #76617e;
  outline-offset: 4px;
}

/* 슬라이드 전환 효과 */
.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity .18s ease;
}

.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}

/* 반응형 · 대형 화면 (2000px 이상) */
@media (min-width: 2000px) {
  .banner-content {
    width: min(100% - 160px, 1020px);
  }
}

/* 반응형 · 태블릿 (900px 이하) */
@media (max-width: 900px) {
  .banner-content {
    width: calc(100% - 64px);
  }

  .banner-title {
    font-size: 36px;
  }

  .banner-shade {
    background: linear-gradient(90deg, rgb(250 244 235 / 85%), rgb(250 244 235 / 35%) 48%, transparent 75%);
  }

  .banner-controls {
    width: calc(100% - 48px);
  }
}

/* 반응형 · 모바일 (600px 이하) */
@media (max-width: 600px) {
  .main-banner {
    height: 580px;
  }

  .banner-image {
    top: auto;
    height: 54%;
    object-position: 75% center;
  }

  .banner-shade {
    background: linear-gradient(180deg, #fff2f4 0%, #fff2f4 40%, rgb(255 242 244 / 70%) 49%, transparent 64%);
  }

  .banner-content {
    width: calc(100% - 48px);
    justify-content: flex-start;
    padding: 68px 0 0;
  }

  .banner-title {
    font-size: 32px;
    line-height: 1.4;
  }

  .banner-description {
    max-width: 290px;
    margin: 12px 0 16px;
    font-size: 13px;
  }

  .banner-cta {
    min-height: 38px;
    font-size: 13px;
  }

  .banner-controls {
    bottom: 30px;
  }

  .banner-arrow {
    background: rgb(255 255 255 / 65%);
  }
}

/* 접근성 · 동작 줄이기 설정 */
@media (prefers-reduced-motion: reduce) {
  .banner-fade-enter-active,
  .banner-fade-leave-active,
  .banner-cta,
  .banner-arrow,
  .banner-pagination {
    transition: none;
  }
}
</style>
