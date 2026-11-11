<script setup>
import MyPageSidebar from './MyPageSidebar.vue'

defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  stretchContent: { type: Boolean, default: false },
})
</script>

<template>
  <main class="mypage-page">
    <div class="mypage-container" :class="{ 'mypage-container--with-below': $slots.below }">
      <MyPageSidebar />
      <section
        class="mypage-content"
        :class="{ 'mypage-content--stretch': stretchContent }"
        aria-labelledby="mypage-title"
      >
        <header class="mypage-heading">
          <h1 id="mypage-title"><slot name="title-icon" />{{ title }}</h1>
          <slot name="description">
            <p v-if="description">{{ description }}</p>
          </slot>
        </header>
        <slot />
      </section>
      <div v-if="$slots.below" class="mypage-below">
        <slot name="below" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.mypage-page {
  background: #fff;
}

.mypage-container {
  display: flex;
  width: min(100% - 80px, var(--content-width));
  min-height: 520px;
  gap: 18px;
  margin: 0 auto;
  padding: 24px 0 72px;
  box-sizing: border-box;
}

.mypage-content {
  min-width: 0;
  flex: 1;
}

@media (min-width: 861px) {
  .mypage-container--with-below {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    align-content: start;
    row-gap: 0;
  }

  .mypage-container--with-below :deep(.mypage-sidebar) {
    width: 100%;
  }

  .mypage-below {
    grid-column: 2;
  }

  .mypage-content--stretch {
    display: flex;
    flex-direction: column;
  }
}

.mypage-heading {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 18px;
  margin: 0 0 12px;
}

.mypage-heading h1 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--color-text);
  font-size: calc(20px + var(--mypage-title-size-adjustment, 0px));
  font-weight: 500;
  line-height: 1.2;
  transform: translateX(3px);
}

.mypage-heading p {
  margin: 0;
  color: #71666b;
  font-size: 15px;
}

@media (max-width: 860px) {
  .mypage-container {
    flex-direction: column;
    gap: 24px;
  }

  .mypage-below {
    margin-top: -24px;
  }
}

@media (max-width: 720px) {
  .mypage-container {
    width: min(100% - 32px, var(--content-width));
  }

  .mypage-heading h1 {
    font-size: calc(26px + var(--mypage-title-size-adjustment, 0px));
  }
}
</style>
