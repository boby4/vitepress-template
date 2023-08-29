<template>
  <div class="home-bg">
    <div class="content-bg">
      <h1>xuzhiming
        <p>95后青年，前端切图仔一枚, <s>一个It技术的探索路上的小学生</s></p>
      </h1>
    </div>
  </div>
  <div class="layout_page">
    <Aside/>
    <div class="f-main">
      <div class="meting_js">
        <meting-js
          server="tencent"
          type="playlist"
          id="7534581780"
          fixed="false"
          autoplay="false"
          loop="all"
          order="list"
          preload="auto"
          list-folded="true"
          theme="#1890ff"
          list-max-height="380px"
          lrc-type="1"
          auto="https://y.qq.com/n/ryqq/playlist/7534581780"
          >
        </meting-js>
      </div>
      <a :href="withBase(article.regularPath)" v-for="(article, index) in posts" :key="index" class="article">
        <div class="article-header">
          <div class="title">🛄 {{ article.frontMatter.title || '' }}</div>
          <time :datetime="article.frontMatter.date" class="time">⌛{{ article.frontMatter.date || '' }}</time>
        </div>
        <p class="describe">{{ article.frontMatter.description || '' }}</p>
      </a>
      <div class="pagination">
        <a class="link"
          :class="{ active: pageCurrent === i }"
          v-for="i in pagesNum"
          :key="i"
          :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
          >{{ i }}</a
        >
      </div>
    </div>
  </div>
  <Model></Model>

</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import Aside from '../components/Aside.vue'
const props = defineProps({
  posts: Array,
  pageCurrent: Number,
  pagesNum: Number
})
</script>

<style scoped>
@import '../style/page.scss';
</style>
