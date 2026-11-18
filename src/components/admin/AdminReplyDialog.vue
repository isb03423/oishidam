<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useRoute } from 'vue-router'
import AdminIcon from './AdminIcon.vue'
import AdminSentimentBadge from './AdminSentimentBadge.vue'
import InquiryConversation from '../common/InquiryConversation.vue'
import { getAdminDetail, replyAdminInquiry, replyAdminReview } from '../../services/admin.js'
import { getSessionRevision, session, shoppingOwner } from '../../stores/session.js'

const emit = defineEmits(['saved'])
const route = useRoute()
const id = useId()
const dialog = ref(null)
const body = ref(null)
const photoDialog = ref(null)
const photoIndex = ref(-1)
const photoError = ref(false)
const failedPhotos = ref(new Set())

async function openPhoto(index) {
  photoIndex.value = index
  await nextTick()
  if (photoUrl.value && !photoDialog.value.open) photoDialog.value.showModal()
}

function closePhoto() {
  photoDialog.value?.close()
  photoIndex.value = -1
}
const kind = ref('inquiries')
const selectedId = ref(null)
const detail = ref(null)
const photoUrl = computed(() => detail.value?.imageUrls?.[photoIndex.value])
watch(photoUrl, () => { photoError.value = false })
const loading = ref(false)
const error = ref('')
const reply = ref('')
const saving = ref(false)
const isInquiry = computed(() => kind.value === 'inquiries')
const inquiryAnswered = computed(() => isInquiry.value && (detail.value?.status === 'ANSWERED' || detail.value?.messages?.some((message) => String(message.senderMemberId) !== String(detail.value.memberId))))
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
  closePhoto()
  failedPhotos.value = new Set()
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
  await nextTick()
  if (disposed) return
  if (!dialog.value.open) dialog.value.showModal()
  loadDetail()
}

function close(force = false) {
  if (saving.value && !force) return
  closePhoto()
  failedPhotos.value = new Set()
  controller?.abort()
  version++
  dialog.value?.close()
  selectedId.value = detail.value = null
  reply.value = error.value = ''
  saving.value = loading.value = false
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
    const resultNotice = { kind: kind.value, id: selectedId.value, detail: detail.value }
    close(true)
    emit('saved', resultNotice)
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
    <header class="reply-heading"><div><h2 :id="id + '-heading'">{{ isInquiry ? '문의 상세' : '후기 상세' }}</h2><p v-if="detail">{{ isInquiry ? '문의' : '후기' }} #{{ selectedId }}<span>{{ stamp(detail.createdAt) }}</span></p></div><button type="button" class="reply-close" :disabled="saving" :aria-label="isInquiry ? '문의 답변 닫기' : '후기 답변 닫기'" autofocus @click="close()"><AdminIcon name="close" />닫기</button></header>
    <div class="reply-workspace" :class="{ 'is-readonly': !detail || inquiryAnswered }">
      <div ref="body" class="reply-body">
        <p v-if="loading" class="reply-loading" role="status">{{ isInquiry ? '문의' : '후기' }} 내용을 불러오는 중입니다.</p>
        <template v-if="detail">
          <div class="reply-context"><div><span class="reply-customer">{{ detail.memberName || '이름 확인 중' }}</span><div class="reply-badges"><AdminSentimentBadge v-if="!isInquiry" :sentiment="detail.sentiment" /><span class="inquiry-status" :class="(isInquiry ? inquiryAnswered : detail.answerContent) ? 'is-answered' : 'is-pending'">{{ (isInquiry ? inquiryAnswered : detail.answerContent) ? '답변 완료' : '답변 대기' }}</span></div></div><h3>{{ isInquiry ? detail.title : detail.productName || '상품 후기' }}</h3></div>
          <InquiryConversation v-if="isInquiry" :messages="detail.messages || []" :owner-id="detail.memberId" :owner-name="detail.memberName" />
          <article v-else class="review-original"><p>{{ detail.content }}</p><section v-if="detail.imageUrls?.length" class="review-photo-section" :aria-labelledby="id + '-photos'"><h4 :id="id + '-photos'">첨부 사진 <span>{{ detail.imageUrls.length }}장</span></h4><ul class="review-attachments"><li v-for="(url, index) in detail.imageUrls" :key="index"><button type="button" :aria-label="'첨부 사진 ' + (index + 1) + ' 크게 보기'" aria-haspopup="dialog" @click="openPhoto(index)"><span v-if="failedPhotos.has(url)" class="review-photo-failed">사진을 불러오지 못했습니다</span><img v-else :src="url" :alt="'후기 첨부 사진 ' + (index + 1)" loading="lazy" @error="failedPhotos.add(url)" /></button></li></ul></section></article>
        </template>
        <div v-if="error" class="reply-error" role="alert">{{ error }} <button v-if="!detail" type="button" @click="loadDetail">다시 시도</button></div>
      </div>
      <form v-if="detail && !inquiryAnswered" class="reply-composer" @submit.prevent="send">
        <div class="reply-compose-heading"><label :for="id + '-answer'">{{ !isInquiry && detail.answerContent ? '관리자 답변 수정' : '관리자 답변' }}</label><p v-if="!isInquiry && detail.answeredAt">등록 {{ stamp(detail.answeredAt) }}</p></div>
        <textarea :id="id + '-answer'" v-model="reply" maxlength="5000" required :disabled="saving" placeholder="고객에게 전달할 답변을 입력하세요"></textarea>
        <footer><span class="reply-character-count">{{ reply.length.toLocaleString('ko-KR') }} / 5,000</span><button type="submit" class="reply-submit" :disabled="saving || !reply.trim()">{{ saving ? '등록 중…' : !isInquiry && detail.answerContent ? '답변 수정' : '답변 등록' }}</button></footer>
      </form>
    </div>
  </dialog>
  <dialog ref="photoDialog" class="review-photo-dialog" :aria-labelledby="id + '-photo-title'" @close="photoIndex = -1">
    <header class="review-photo-heading"><h2 :id="id + '-photo-title'">첨부 사진 <span v-if="photoUrl">{{ photoIndex + 1 }} / {{ detail.imageUrls.length }}</span></h2><button type="button" aria-label="사진 닫기" autofocus @click="closePhoto"><AdminIcon name="close" />닫기</button></header>
    <div class="review-photo-stage"><p v-if="photoError" role="alert">사진을 불러오지 못했습니다. <a :href="photoUrl" target="_blank" rel="noopener noreferrer">원본 열기</a></p><img v-else-if="photoUrl" :key="photoUrl" :src="photoUrl" :alt="'후기 첨부 사진 ' + (photoIndex + 1)" @error="photoError = true" /></div>
    <nav v-if="detail?.imageUrls?.length > 1" class="review-photo-navigation" aria-label="첨부 사진 이동"><button type="button" :disabled="photoIndex <= 0" @click="photoIndex--">이전 사진</button><button type="button" :disabled="photoIndex >= detail.imageUrls.length - 1" @click="photoIndex++">다음 사진</button></nav>
  </dialog>
</template>

<style scoped src="../../styles/admin-reply.css"></style>
