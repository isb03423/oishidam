<script setup>
import MyPageSidebar from './MyPageSidebar.vue'

defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  description: { type: String, default: '' },
  stretchContent: { type: Boolean, default: false },
})

const titleIcons = {
  review: 'M5 4h14v12H9l-4 4V4ZM8 8h8m-8 4h6',
  inquiry: 'M20 11a8 8 0 0 1-8 8 8.5 8.5 0 0 1-3.5-.8L4 20l1.4-4A8 8 0 1 1 20 11Z',
  member: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4.5 21a7.5 7.5 0 0 1 15 0',
  address: 'M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0ZM14.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z',
  delivery: 'M3 6h11v11H3zM14 10h4l3 4v3h-7M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM20 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  receipt: 'M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6',
  withdraw: 'M14 3H5v18h9M10 12h11M18 8l4 4-4 4',
  lock: 'M5 10h14v11H5zM8 10V7a4 4 0 0 1 8 0v3',
  cart: 'M3 4h2l2.2 10h10.6l2-7H7.2M9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
}
</script>

<template>
  <main class="mypage-page">
    <div class="mypage-container" :class="{ 'mypage-container--with-below': $slots.below, 'mypage-container--with-side': $slots.side }">
      <MyPageSidebar />
      <section
        class="mypage-content"
        :class="{ 'mypage-content--stretch': stretchContent }"
        aria-labelledby="mypage-title"
      >
        <header class="mypage-heading">
          <h1 id="mypage-title">
            <svg v-if="titleIcons[icon]" class="mypage-title-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="titleIcons[icon]" />
            </svg>
            {{ title }}
          </h1>
          <slot name="description">
            <p v-if="description">{{ description }}</p>
          </slot>
          <slot name="actions" />
        </header>
        <slot />
      </section>
      <slot name="side" />
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

  .mypage-container--with-side {
    display: grid;
    grid-template-columns: 220px minmax(0, 1.2fr) minmax(0, 1fr);
    grid-template-rows: max-content minmax(0, 1fr);
    row-gap: 0;
  }

  .mypage-container--with-side :deep(.mypage-sidebar) {
    width: 100%;
  }

  .mypage-container--with-side .mypage-content {
    grid-column: 2;
    grid-row: 1 / span 2;
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

.mypage-title-icon {
  align-self: flex-end;
  transform: translateY(2px);
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
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
