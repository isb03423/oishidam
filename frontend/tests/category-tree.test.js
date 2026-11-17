import test from 'node:test'
import assert from 'node:assert/strict'
import { buildCategoryTree, filterCategoryTree, categoryParentOptions } from '../src/utils/categoryTree.js'

const categories = [
  { categoryId: 3, parentId: 1, name: '세븐일레븐', sortOrder: 2 },
  { categoryId: 2, parentId: 1, name: '로손', sortOrder: 1 },
  { categoryId: 4, parentId: 2, name: '추천 간식', sortOrder: 0 },
  { categoryId: 5, parentId: null, name: '라면', sortOrder: 2 },
  { categoryId: 1, parentId: null, name: '편의점', sortOrder: 1 },
]
test('카테고리를 부모 아래에 표시하고 형제는 표시 순서대로 정렬한다', () => {
  const tree = buildCategoryTree(categories)
  assert.deepEqual(tree.map((n) => n.categoryId), [1, 5])
  assert.deepEqual(tree[0].children.map((n) => n.categoryId), [2, 3])
  assert.equal(tree[0].children[0].children[0].categoryId, 4)
  assert.equal(tree[0].height, 3)
  assert.equal(tree[0].children[0].children[0].depth, 3)
  assert.equal(categories[0].children, undefined)
  assert.equal(buildCategoryTree([{ ...categories[0], parentId: 99 }])[0].categoryId, 3)
})
test('검색은 상위 경로를 유지하고 상위 이름이 일치하면 하위 분류도 표시한다', () => {
  const tree = buildCategoryTree(categories)
  const found = filterCategoryTree(tree, ' 추천 ')
  assert.equal(found.length, 1)
  assert.equal(found[0].children[0].children[0].categoryId, 4)
  assert.equal(filterCategoryTree(tree, '편의점')[0].children.length, 2)
  assert.deepEqual(filterCategoryTree(tree, '없는 분류'), [])
})
test('상위 분류 선택에서 자기 자신과 모든 하위 분류를 제외한다', () => {
  const options = categoryParentOptions(buildCategoryTree(categories), 3)
  assert.deepEqual(options.map((n) => n.categoryId), [1, 5])
  assert.deepEqual(categoryParentOptions(buildCategoryTree(categories), 1), [])
  const forNew = categoryParentOptions(buildCategoryTree(categories))
  assert.deepEqual(forNew.map((n) => n.categoryId), [1, 5])
  assert.equal(forNew[1].label, '라면')
  assert.deepEqual(categoryParentOptions(buildCategoryTree(categories), 2), [])
})
