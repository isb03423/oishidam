<script setup>
import { computed } from 'vue'

const props = defineProps({ messages: { type: Array, required: true }, ownerId: { type: [Number, String], required: true }, ownerName: { type: String, default: '' } })
const isCustomer = (message) => String(message.senderMemberId) === String(props.ownerId)
const groups = computed(() => {
  const result = []
  for (const message of props.messages) {
    const day = message.createdAt?.slice(0, 10) ?? ''
    if (result.at(-1)?.day !== day) result.push({ day, messages: [] })
    result.at(-1).messages.push(message)
  }
  return result
})
</script>

<template>
  <div class="inquiry-chat" aria-label="문의와 답변 대화">
    <section v-for="(group, index) in groups" :key="`${group.day}-${index}`" class="chat-day">
      <p v-if="group.day" class="chat-date"><span>{{ group.day.replaceAll('-', '.') }}</span></p>
      <article v-for="message in group.messages" :key="message.messageId" class="chat-message" :class="{ 'is-outgoing': !isCustomer(message) }">
        <span class="chat-sender">{{ isCustomer(message) ? ownerName || '이름 확인 중' : '관리자' }}</span>
        <div class="chat-message-line"><p class="chat-bubble">{{ message.content }}</p><time class="chat-time" :datetime="message.createdAt">{{ message.createdAt?.slice(11, 16) }}</time></div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.inquiry-chat { display: grid; gap: 24px; }
.chat-day { display: grid; gap: 18px; min-width: 0; }
.chat-date { display: flex; align-items: center; justify-content: center; gap: 14px; margin: 0 0 2px; color: #a18c98; font-size: var(--font-size-caption); font-variant-numeric: tabular-nums; }
.chat-date::before, .chat-date::after { content: ''; width: 42px; height: 1px; background: #e7dce2; }
.chat-date span { white-space: nowrap; }
.chat-message { display: grid; gap: 6px; min-width: 0; }
.chat-sender { color: #8b7481; font-size: var(--font-size-label); line-height: 1.4; }
.chat-message-line { display: flex; align-items: flex-end; gap: 8px; min-width: 0; }
.chat-bubble { max-width: min(80%, 510px); margin: 0; padding: 11px 15px; border: 1px solid #e8dfe4; border-radius: 4px 14px 14px; background: white; color: var(--color-text); font-size: var(--font-size-body); line-height: 1.75; white-space: pre-wrap; overflow-wrap: anywhere; }
.chat-time { flex: none; padding-bottom: 2px; color: #a18c98; font-size: var(--font-size-caption); white-space: nowrap; font-variant-numeric: tabular-nums; }
.chat-message.is-outgoing .chat-sender { text-align: right; color: var(--color-primary); }
.chat-message.is-outgoing .chat-message-line { flex-direction: row-reverse; }
.chat-message.is-outgoing .chat-bubble { border-color: #ecd1da; border-radius: 14px 4px 14px 14px; background: #f6e0e8; color: #633546; }
@media (max-width: 540px) { .chat-bubble { max-width: calc(100% - 48px); padding: 10px 12px; font-size: var(--font-size-table); }.chat-message-line { gap: 6px; }.chat-time { font-size: var(--font-size-caption); } }
</style>
