<script setup>
import { computed, ref, useId } from 'vue'
import '../../styles/auth-fields.css'

const props = defineProps({
  id: String,
  label: { type: String, required: true },
  name: { type: String, default: 'password' },
  autocomplete: { type: String, default: 'new-password' },
  placeholder: String,
  describedBy: String,
  minlength: Number,
  invalid: Boolean,
  disabled: Boolean,
})
const password = defineModel({ type: String, required: true })
const emit = defineEmits(['blur'])
const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const input = ref(null)
const visible = ref(false)

defineExpose({ focus: () => input.value?.focus() })
</script>

<template>
  <div class="auth-field" :class="{ 'has-error': invalid }">
    <label class="auth-field-label" :for="inputId">
      <span class="is-sr-only">{{ label }}</span>
      <svg class="auth-field-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </svg>
    </label>
    <input :id="inputId" ref="input" v-model="password" :type="visible ? 'text' : 'password'" :name="name"
      :autocomplete="autocomplete" :placeholder="placeholder ?? label" :minlength="minlength"
      :aria-describedby="describedBy" :aria-invalid="invalid" required :disabled="disabled" @blur="emit('blur', $event)" />
    <button class="auth-field-toggle" type="button" :aria-label="label + ' 표시'" :aria-pressed="visible"
      :aria-controls="inputId" :disabled="disabled" @mousedown.left.prevent @click="visible = !visible">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" /><path v-if="!visible" d="m3 3 18 18" />
      </svg>
    </button>
  </div>
</template>
