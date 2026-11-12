<script setup>
import { computed, ref } from 'vue'

const phone = defineModel({ type: String, default: '' })
defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '휴대폰 번호' },
  required: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  invalid: Boolean,
})
defineEmits(['blur'])

const lengths = [3, 4, 4]
const inputs = ref([])
const parts = computed(() => {
  if (phone.value.includes('-')) {
    const [first = '', middle = '', last = ''] = phone.value.split('-')
    return [first, middle, last]
  }
  return splitDigits(phone.value.replace(/\D/g, ''))
})

function splitDigits(digits) {
  return [digits.slice(0, 3), digits.slice(3, 7), digits.slice(7)]
}

function update(values) {
  phone.value = values.some(Boolean) ? values.join('-') : ''
}

function enter(event, index) {
  const digits = event.target.value.replace(/\D/g, '')
  const value = digits.slice(0, lengths[index])
  event.target.value = value
  const updated = [...parts.value]
  updated[index] = value
  update(updated)
  if (event.inputType !== 'deleteContentBackward' && value.length === lengths[index]) {
    inputs.value[index + 1]?.focus()
    inputs.value[index + 1]?.select()
  }
}

function paste(event, index) {
  const digits = event.clipboardData.getData('text').replace(/\D/g, '')
  if (digits.length === 11) {
    event.preventDefault()
    update(splitDigits(digits))
    inputs.value[2]?.focus()
  } else {
    event.preventDefault()
    const input = event.target
    input.setRangeText(digits, input.selectionStart, input.selectionEnd, 'end')
    enter(event, index)
  }
}
</script>

<template>
  <div class="phone-input" role="group" :aria-label="label">
    <template v-for="(length, index) in lengths" :key="index">
      <span v-if="index" aria-hidden="true">-</span>
      <input
        :id="index ? id + '-' + index : id"
        :ref="(element) => inputs[index] = element"
        :value="parts[index]"
        :aria-label="label + ' ' + (index + 1) + '번째 칸'"
        :aria-invalid="invalid || undefined"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="length"
        :placeholder="['010', '0000', '0000'][index]"
        type="tel"
        inputmode="numeric"
        @input="enter($event, index)"
        @paste="paste($event, index)"
        @blur="$emit('blur')"
        @keydown.backspace="!$event.target.value && inputs[index - 1]?.focus()"
      />
    </template>
  </div>
</template>

<style scoped>
.phone-input {
  display: grid;
  grid-template-columns: minmax(0, 3fr) auto minmax(0, 4fr) auto minmax(0, 4fr);
  align-items: center;
  gap: 5px;
  min-width: 0;
  flex: 1;
}
.phone-input span { color: #71666b; }
.phone-input input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 36px;
  padding: 5px 2px;
  border: 1px solid var(--color-border);
  border-radius: 7px;
  text-align: center;
  background: #fff;
  color: inherit;
  font: inherit;
}
.phone-input input:focus { outline: 1px solid var(--color-primary); }
.phone-input input[readonly] { background: #f7f3f4; }
</style>