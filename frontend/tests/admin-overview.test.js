import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fulfillmentStages, overviewPeriods, priorityTasks, stockWatch } from '../src/data/adminOverview.js'

test('대시보드 예시의 기간별 시계열은 금액 비교에 필요한 동일 길이와 양수 기준을 가진다', () => {
  for (const period of overviewPeriods) {
    assert.ok(period.labels.length >= 2)
    assert.equal(period.current.length, period.labels.length)
    assert.equal(period.previous.length, period.labels.length)
    assert.ok(period.current.every(value => Number.isSafeInteger(value) && value >= 0))
    assert.ok(period.previous.reduce((sum, value) => sum + value, 0) > 0)
  }
  assert.equal(overviewPeriods[0].current.reduce((sum, value) => sum + value, 0), 3845000)
  assert.equal(overviewPeriods[2].labels.at(-1), '11.17')
})

test('단계 필터와 상세 펼치기에 쓰는 예시 업무의 식별자가 중복되지 않는다', () => {
  assert.equal(new Set(priorityTasks.map(task => task.id)).size, priorityTasks.length)
  assert.ok(priorityTasks.every(task => ['orders', 'inquiries', 'reviews'].includes(task.kind)))
  assert.ok(priorityTasks.some(task => task.kind === 'reviews'))
  assert.ok(!priorityTasks.some(task => task.kind === 'products'))
  assert.ok(priorityTasks.filter(task => task.stage).every(task => fulfillmentStages.some(stage => stage.key === task.stage)))
  assert.ok(stockWatch.every(product => product.quantity <= 5 && product.quantity >= 0))
})
