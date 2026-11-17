import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { pageNumbers } from '../src/utils/pageNumbers.js'

test('shows at most five page numbers without ellipses', () => {
  assert.deepEqual(pageNumbers(1, 0), [])
  assert.deepEqual(pageNumbers(1, 4), [1, 2, 3, 4])
  assert.deepEqual(pageNumbers(1, 10), [1, 2, 3, 4, 5])
  assert.deepEqual(pageNumbers(5, 10), [3, 4, 5, 6, 7])
  assert.deepEqual(pageNumbers(8, 20), [6, 7, 8, 9, 10])
  assert.deepEqual(pageNumbers(10, 10), [6, 7, 8, 9, 10])
})
