import assert from 'node:assert/strict'
import { test } from 'node:test'
import { activateAdminRow, activateAdminRowKey } from '../src/utils/adminRow.js'

test('관리자 행 클릭은 일반 셀만 열고 내부 컨트롤·텍스트 선택은 보존한다', () => {
  let calls = 0
  globalThis.window = { getSelection: () => ({ toString: () => '' }) }
  const cell = { target: { closest: () => null } }
  activateAdminRow(cell, () => calls++)
  for (const event of [{ ...cell, defaultPrevented: true }, { ...cell, ctrlKey: true }, { ...cell, metaKey: true }, { ...cell, shiftKey: true }, { ...cell, altKey: true }, { target: { closest: () => ({ tagName: 'BUTTON' }) } }]) activateAdminRow(event, () => calls++)
  window.getSelection = () => ({ toString: () => '선택한 상품명' })
  activateAdminRow(cell, () => calls++)
  delete globalThis.window
  assert.equal(calls, 1)
})

test('상세 버튼 없이도 행에서 Enter와 Space를 사용하며 내부 입력이나 IME 조합은 건드리지 않는다', () => {
  const row = {}, child = {}
  let actions = 0, prevented = 0
  const event = { target: row, currentTarget: row, preventDefault: () => prevented++ }
  for (const key of ['Enter', ' ']) activateAdminRowKey({ ...event, key }, () => actions++)
  for (const change of [{key:'a'}, {key:'Enter',target:child}, {key:'Enter',isComposing:true}, {key:'Enter',repeat:true}, {key:'Enter',ctrlKey:true}, {key:'Enter',shiftKey:true}]) activateAdminRowKey({ ...event, ...change }, () => actions++)
  assert.equal(actions, 2)
  assert.equal(prevented, 2)
})
