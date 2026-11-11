import { computed, reactive, watch } from 'vue'
import { shoppingOwner } from './session.js'

const wishlists = reactive(new Map())
const storageKey = (owner) => `oishidam:wishlist:v1:${owner}`
export const wishedProducts = computed(() => wishlists.get(shoppingOwner.value) ?? [])
export const wishedIds = computed(() => wishedProducts.value.map((product) => product.product_id))

watch(shoppingOwner, (owner) => {
  if (wishlists.has(owner)) return
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(owner)) ?? '[]')
    if (Array.isArray(saved)) {
      wishlists.set(owner, saved.filter((product) => product?.product_id && typeof product.name === 'string'))
    }
  } catch {
    // 저장소를 사용할 수 없으면 현재 탭의 메모리에서 관리합니다.
  }
}, { immediate: true, flush: 'sync' })

function saveWishes(products) {
  const owner = shoppingOwner.value
  wishlists.set(owner, products)
  try {
    localStorage.setItem(storageKey(owner), JSON.stringify(products))
  } catch {
    // 브라우저 저장에 실패해도 현재 화면에는 찜 상태를 반영합니다.
  }
}

export function removeWishes(ids) {
  saveWishes(wishedProducts.value.filter((product) => !ids.includes(product.product_id)))
}

export function toggleWish(product) {
  if (!product) return
  if (wishedIds.value.includes(product.product_id)) {
    removeWishes([product.product_id])
  } else {
    saveWishes([product, ...wishedProducts.value])
  }
}
