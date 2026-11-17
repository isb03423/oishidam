<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useRoute } from 'vue-router'
import InquiryConversation from '../common/InquiryConversation.vue'
import { getAdminDetail, replyAdminInquiry, replyAdminReview } from '../../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../../stores/session.js'

const emit = defineEmits(['saved'])
const route = useRoute()
const id = useId()
const dialog = ref(null)
const body = ref(null)
const kind = ref('inquiries')
const selectedId = ref(null)
const detail = ref(null)
const loading = ref(false)
const error = ref('')
const reply = ref('')
const saving = ref(false)
const saved = ref(false)
const isInquiry = computed(() => kind.value === 'inquiries')
const inquiryAnswered = computed(() => isInquiry.value && (detail.value?.status === 'ANSWERED' || detail.value?.messages.some((message) => String(message.senderMemberId) !== String(detail.value.memberId))))
const stamp = (value) => value?.replace('T', ' ').slice(0, 16) ?? '—'
let controller
let version = 0
let disposed = false

async function scrollToLatest() {
  await nextTick()
  if (isInquiry.value && body.value) body.value.scrollTop = body.value.scrollHeight
}

async function loadDetail() {
  controller?.abort()
  controller = new AbortController()
  const signal = controller.signal
  const revision = getSessionRevision()
  const current = ++version
  detail.value = null
  error.value = ''
  loading.value = true
  try {
    const result = await getAdminDetail(kind.value, selectedId.value, signal)
    if (signal.aborted || current !== version || revision !== getSessionRevision()) return
    detail.value = result
    if (!isInquiry.value) reply.value = result.answerContent ?? ''
    await scrollToLatest()
  } catch (failure) {
    if (!signal.aborted && current === version && revision === getSessionRevision()) error.value = failure.message
  } finally {
    if (!signal.aborted && current === version && revision === getSessionRevision()) loading.value = false
  }
}

async function open(type, itemId) {
  if (saving.value || session.source !== 'api' || session.member?.role !== 'ADMIN' || !['inquiries', 'reviews'].includes(type)) return
  kind.value = type
  selectedId.value = itemId
  reply.value = ''
  saved.value = false
  await nextTick()
  if (disposed) return
  if (!dialog.value.open) dialog.value.showModal()
  loadDetail()
}

function close(force = false) {
  if (saving.value && !force) return
  controller?.abort()
  version++
  dialog.value?.close()
  selectedId.value = detail.value = null
  reply.value = error.value = ''
  saving.value = loading.value = saved.value = false
}

async function send() {
  if (saving.value || !detail.value || inquiryAnswered.value || !reply.value.trim()) return
  const revision = getSessionRevision()
  const current = version
  saving.value = true
  error.value = ''
  try {
    const result = isInquiry.value ? await replyAdminInquiry(selectedId.value, reply.value) : await replyAdminReview(selectedId.value, reply.value)
    if (disposed || current !== version || revision !== getSessionRevision()) return
    if (isInquiry.value) {
      detail.value.messages.push(result)
      detail.value.status = 'ANSWERED'
      reply.value = ''
    } else {
      detail.value = result
      reply.value = result.answerContent ?? ''
    }
    saved.value = true
    emit('saved', { kind: kind.value, id: selectedId.value, detail: detail.value })
    await scrollToLatest()
  } catch (failure) {
    if (!disposed && current === version && revision === getSessionRevision()) error.value = failure.message
  } finally {
    if (!disposed && current === version && revision === getSessionRevision()) saving.value = false
  }
}

watch([shoppingOwner, () => route.fullPath], () => close(true))
onBeforeUnmount(() => { disposed = true; controller?.abort(); version++ })
defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="admin-reply-dialog" :class="isInquiry ? 'inquiry-reply-dialog' : 'review-reply-dialog'" :aria-labelledby="id + '-heading'" :closedby="saving ? 'none' : 'closerequest'" @cancel.prevent="close()">
    <header class="reply-heading"><div><p class="reply-eyebrow">{{ isInquiry ? '고객 문의' : '고객 후기' }}</p><h2 :id="id + '-heading'">{{ isInquiry ? detail?.title || '문의 확인 및 답변' : '후기 확인 및 답변' }}</h2></div><button type="button" class="reply-close" :disabled="saving" :aria-label="isInquiry ? '문의 답변 닫기' : '후기 답변 닫기'" autofocus @click="close()">닫기</button></header>
    <div ref="body" class="reply-body">
      <p v-if="loading" class="reply-loading" role="status">{{ isInquiry ? '문의' : '후기' }} 내용을 불러오고 있어요.</p>
      <InquiryConversation v-if="detail && isInquiry" :messages="detail.messages" :owner-id="detail.memberId" :owner-name="detail.memberName" />
      <article v-else-if="detail" class="review-original"><header><strong>{{ detail.memberName || '이름 확인 중' }}</strong><time :datetime="detail.createdAt">{{ stamp(detail.createdAt) }}</time></header><h3 v-if="detail.productName">{{ detail.productName }}</h3><p>{{ detail.content }}</p><ul v-if="detail.imageUrls?.length" class="review-attachments"><li v-for="url in detail.imageUrls" :key="url"><a :href="url" target="_blank" rel="noopener noreferrer"><img :src="url" alt="후기 첨부 사진" loading="lazy" /></a></li></ul></article>
      <div v-if="error" class="reply-error" role="alert">{{ error }} <button v-if="!detail" type="button" @click="loadDetail">다시 시도</button></div>
      <p v-if="saved" class="reply-saved" role="status">답변을 등록했습니다.</p>
    </div>
    <form v-if="detail && !inquiryAnswered" class="reply-composer" @submit.prevent="send">
      <label :for="id + '-answer'">답변 작성</label><textarea :id="id + '-answer'" v-model="reply" maxlength="5000" required :disabled="saving" placeholder="고객에게 전달할 답변을 입력해 주세요." @input="saved = false"></textarea>
      <footer><span class="reply-character-count">{{ reply.length.toLocaleString('ko-KR') }} / 5,000</span><div><button type="button" class="reply-cancel" :disabled="saving" @click="close()">닫기</button><button type="submit" class="reply-submit" :disabled="saving || !reply.trim()">{{ saving ? '등록 중…' : !isInquiry && detail.answerContent ? '답변 수정' : '답변 등록' }}</button></div></footer>
    </form>
  </dialog>
</template>

<style scoped src="../../styles/admin-reply.css"></style>
