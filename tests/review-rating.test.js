import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const vite = await createServer({ configFile: false, plugins: [vue()], server: { middlewareMode: true, watch: null }, appType: 'custom', logLevel: 'silent' })
after(() => vite.close())
const { default: ReviewRating } = await vite.ssrLoadModule('/src/components/common/ReviewRating.vue')

test('별점은 점수·접근 가능한 설명과 일치하는 별을 표시한다', async () => {
  for (const rating of [1, 4, 5]) {
    const html = await renderToString(createSSRApp(ReviewRating, { rating }))
    assert.match(html, new RegExp(`aria-label="5점 만점에 ${rating}점"`))
    assert.match(html, new RegExp(`${rating} / 5`))
    assert.equal((html.match(/class="is-filled"/g) ?? []).length, rating)
  }
})

test('기존 후기의 별점이 없으면 0점이나 임의 점수 대신 미평가를 표시한다', async () => {
  const html = await renderToString(createSSRApp(ReviewRating, { rating: null }))
  assert.match(html, /미평가/)
  assert.doesNotMatch(html, /<svg|0 \/ 5/)
})
