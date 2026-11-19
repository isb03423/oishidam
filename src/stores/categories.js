import { computed, ref, watch } from 'vue'
import { development } from '../config/development.js'
import { getCategories } from '../services/catalog.js'

export const categories = ref([])
export const categoryLoading = ref(false)
export const categoryError = ref('')
export const categoryGroups = computed(() => categories.value
  .filter((category) => category.parent_id === null)
  .sort((a, b) => a.sort_order - b.sort_order)
  .map((category) => ({
    ...category,
    children: categories.value
      .filter((child) => child.parent_id === category.category_id)
      .sort((a, b) => a.sort_order - b.sort_order),
  })))
let controller

export async function loadCategories() {
  controller?.abort()
  controller = new AbortController()
  const signal = controller.signal
  categories.value = []
  categoryLoading.value = true
  categoryError.value = ''
  try {
    const result = await getCategories({ signal })
    if (!signal.aborted) categories.value = result.items
  } catch (error) {
    if (!signal.aborted) categoryError.value = '카테고리를 불러오지 못했어요.'
  } finally {
    if (!signal.aborted) categoryLoading.value = false
  }
}

watch(() => [development.mockEnabled, development.scenario], loadCategories, { immediate: true })
