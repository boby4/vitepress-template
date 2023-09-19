<template>
  <div class="home-bg" :style="backgroundStyle">
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
      <!-- <a
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
      </a> -->
      <Paging :datas="posts" />
      <div class="pagination">
        <a class="icon" v-if="pageCurrent !== 1" :href="withBase(pageCurrent === 2 ? '/index.html' :`/page_${pageCurrent-1}.html`)"><i class="iconfont icon_paging_left"></i></a>
        <a
          class="link"
          :class="{ active: pageCurrent === i }"
          v-for="i in pagesNum"
          :key="i"
          :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
          >{{ i }}</a
        >
        <a class="icon" style="margin-left:-0.5rem;" v-if="posts.length==5" :href="withBase(`/page_${pageCurrent+1}.html`)"><i class="iconfont icon_paging_right"></i></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import Aside from '../components/Aside.vue'
import { randomImage } from '../../utils/functions'
const backgroundStyle = computed(() => {
  const backgroundImageStyle = `url('${randomImage()}') center center / cover no-repeat`;
  return { background: backgroundImageStyle };
})
const props = defineProps({
  posts: Array,
  pageCurrent: Number,
  pagesNum: Number,
})
</script>

<style scoped>
@import '../style/page.scss';
@import '../style/iconfont.css';
</style>
