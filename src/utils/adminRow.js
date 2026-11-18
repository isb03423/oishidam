// 행 안의 버튼·링크는 자체 동작을 유지하고, 텍스트 선택은 상세 열기로 처리하지 않는다.
export function activateAdminRow(event, action) {
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey
    || event.target.closest('button, a, input, select, textarea, summary, [contenteditable="true"]')
    || window.getSelection()?.toString()) return
  action()
}

export function activateAdminRowKey(event, action) {
  if (event.target !== event.currentTarget || event.isComposing || event.repeat
    || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
    || !['Enter', ' '].includes(event.key)) return
  event.preventDefault()
  action()
}
