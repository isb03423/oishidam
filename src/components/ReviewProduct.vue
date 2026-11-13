
<script setup>
defineProps({ item: { type: Object, required: true } })
</script>

<template>
  <div class="review-product">
    <div class="review-thumbnail">
      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" loading="lazy" />
      <span v-else>{{ item.brand || item.name }}</span>
    </div>
    <div class="review-product-info">
      <h3>{{ item.name }}</h3>
      <p v-if="item.ordered || item.delivered">
        <span v-if="item.ordered">주문일 {{ item.ordered }}</span>
        <span v-if="item.delivered">배송 완료 {{ item.delivered }}</span>
      </p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.review-product { display: grid; grid-template-columns: 76px minmax(0, 1fr); align-items: center; gap: 14px; min-width: 0; }
.review-thumbnail { display: grid; place-items: center; aspect-ratio: 1.2; overflow: hidden; border-radius: 8px; background: var(--color-background); color: var(--color-secondary); text-align: center; font-size: 11px; padding: 4px; }
.review-thumbnail img { width: 100%; height: 100%; object-fit: contain; }
.review-product-info { display: grid; gap: 5px; overflow-wrap: anywhere; }
.review-product-info h3 { font-size: 14px; font-weight: 700; }
.review-product-info p { display: flex; flex-wrap: wrap; gap: 4px 12px; color: var(--color-secondary); font-size: 12px; }
</style>
