import { computed, reactive, ref, watch } from 'vue'
import { getSessionRevision, session, shoppingOwner } from './session.js'
import { addWish, deleteWish, getWishes } from '../services/wishes.js'

const wishlists = reactive(new Map())
const canUseWishes = computed(() => Boolean(session.member) && session.member.role !== 'ADMIN')
const storageKey = (owner) => `oishidam:wishlist:v1:${owner}`
export const wishedProducts = computed(() => canUseWishes.value ? wishlists.get(shoppingOwner.value) ?? [] : [])
export const wishedIds = computed(() => wishedProducts.value.map((product) => product.product_id))
export const wishLoading = ref(false)
export const wishBusy = ref(false)
export const wishError = ref('')
let controller

export async function loadWishes() {
  if (session.source !== 'api' || !canUseWishes.value || wishBusy.value) return
  controller?.abort()
  controller = new AbortController()
  const signal = controller.signal
  const owner = shoppingOwner.value
  const revision = getSessionRevision()
  wishLoading.value = true
  wishError.value = ''
  try {
    const products = await getWishes({ signal })
    if (!signal.aborted && revision === getSessionRevision()) wishlists.set(owner, products)
  } catch (failure) {
    if (!signal.aborted && revision === getSessionRevision()) wishError.value = failure.message
  } finally {
    if (!signal.aborted && revision === getSessionRevision()) wishLoading.value = false
  }
}

watch([shoppingOwner, () => session.member], ([owner], [previous] = []) => {
  controller?.abort()
  wishLoading.value = wishBusy.value = false
  wishError.value = ''
  if (previous) wishlists.delete(previous)
  try { localStorage.removeItem(storageKey('guest')) } catch { /* 저장소 사용 불가 */ }
  if (!canUseWishes.value) return
  wishlists.set(owner, [])
  if (session.source === 'api') { loadWishes(); return }
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(owner)) ?? '[]')
    if (Array.isArray(saved)) wishlists.set(owner, saved.filter((product) => product?.product_id && typeof product.name === 'string'))
  } catch { /* 모의 모드에서는 메모리에서 관리한다. */ }
}, { immediate: true, flush: 'sync' })

function saveWishes(products) {
  if (!canUseWishes.value) return
  const owner = shoppingOwner.value
  wishlists.set(owner, products)
  if (session.source === 'api') return
  try { localStorage.setItem(storageKey(owner), JSON.stringify(products)) } catch { /* 모의 저장소 사용 불가 */ }
}

export async function removeWishes(ids) {
  const selected = [...new Set(ids.map(String))].filter((id) => wishedIds.value.includes(id))
  if (!canUseWishes.value || wishBusy.value || wishLoading.value) return { removed: 0, failed: selected.length }
  if (session.source !== 'api') {
    saveWishes(wishedProducts.value.filter((product) => !selected.includes(product.product_id)))
    return { removed: selected.length, failed: 0 }
  }
  const revision = getSessionRevision()
  wishBusy.value = true
  wishError.value = ''
  try {
    const results = await Promise.allSettled(selected.map(deleteWish))
    if (revision !== getSessionRevision()) return { removed: 0, failed: selected.length }
    const removed = selected.filter((_, index) => results[index].status === 'fulfilled')
    saveWishes(wishedProducts.value.filter((product) => !removed.includes(product.product_id)))
    const failure = results.find((result) => result.status === 'rejected')
    if (failure) wishError.value = failure.reason.message
    return { removed: removed.length, failed: selected.length - removed.length }
  } finally {
    if (revision === getSessionRevision()) wishBusy.value = false
  }
}

export async function toggleWish(product) {
  if (!canUseWishes.value || !product || wishBusy.value || wishLoading.value) return false
  const id = String(product.product_id)
  if (wishedIds.value.includes(id)) return (await removeWishes([id])).failed === 0
  if (session.source !== 'api') { saveWishes([{ ...product, product_id: id }, ...wishedProducts.value]); return true }
  const revision = getSessionRevision()
  wishBusy.value = true
  wishError.value = ''
  try {
    await addWish(id)
    if (revision !== getSessionRevision()) return false
    saveWishes([{ ...product, product_id: id }, ...wishedProducts.value])
    return true
  } catch (failure) {
    if (revision === getSessionRevision()) wishError.value = failure.message
    return false
  } finally {
    if (revision === getSessionRevision()) wishBusy.value = false
  }
}
