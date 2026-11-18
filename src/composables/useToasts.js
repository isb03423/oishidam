import { onBeforeUnmount, ref } from 'vue'

export function useToasts() {
  const toasts = ref([])
  const timers = new Map()
  let nextId = 0

  function pauseToast(id) {
    clearTimeout(timers.get(id))
    timers.delete(id)
  }
  function dismissToast(id) {
    pauseToast(id)
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }
  function resumeToast(id) {
    pauseToast(id)
    if (toasts.value.some(toast => toast.id === id)) timers.set(id, setTimeout(() => dismissToast(id), 3000))
  }
  function showToast(type, message) {
    const id = nextId++
    toasts.value.push({ id, type, message })
    resumeToast(id)
    return id
  }
  function clearToasts() {
    timers.forEach(clearTimeout)
    timers.clear()
    toasts.value = []
  }
  onBeforeUnmount(clearToasts)
  return { toasts, showToast, dismissToast, pauseToast, resumeToast, clearToasts }
}
