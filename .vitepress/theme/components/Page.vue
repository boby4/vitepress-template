<template>
  <div class="home-bg">
    <div class="content-bg">
      <h1>
        xuzhiming
        <p>95后青年，前端切图仔一枚, <s>一个It技术的探索路上的小学生</s></p>
      </h1>
    </div>
  </div>
  <div class="layout_page">
    <Aside />
    <div class="f-main">
      <a
        :href="withBase(article.regularPath)"
        v-for="(article, index) in posts"
        :key="index"
        class="article"
      >
        <div class="article-header">
          <div class="title">🛄 {{ article.frontMatter.title || '' }}</div>
          <time :datetime="article.frontMatter.date" class="time"
            >⌛{{ article.frontMatter.date || '' }}</time
          >
        </div>
        <p class="describe">{{ article.frontMatter.description || '' }}</p>
      </a>
      <div class="pagination">
        <a
          class="link"
          :class="{ active: pageCurrent === i }"
          v-for="i in pagesNum"
          :key="i"
          :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
          >{{ i }}</a
        >
      </div>
    </div>
    <Aplayer/>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import Aside from '../components/Aside.vue'
import Aplayer from '../components/Aplayer.vue'
const props = defineProps({
  posts: Array,
  pageCurrent: Number,
  pagesNum: Number,
})
</script>

<style scoped>
@import '../style/page.scss';
</style>
