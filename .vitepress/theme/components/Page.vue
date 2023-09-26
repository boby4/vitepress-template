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
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @pageChange="handlePageChange"
        :visiblePageCount="5"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { withBase, useData } from 'vitepress'
import Aside from './Aside.vue'
import { randomImage } from '../../utils/functions'
import Pagination from './Pagination.vue'

const backgroundStyle = computed(() => {
  const backgroundImageStyle = `url('${randomImage()}') center center / cover no-repeat`;
  return { background: backgroundImageStyle };
})

const { theme } = useData()
const data = computed(() => theme.value.posts)
const currentPage = ref(1);

const handlePageChange = (newPage:number) => {
  currentPage.value = newPage;
  // 根据新的页码加载数据等操作
};

const itemsPerPage = 5;
const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage));

const posts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.value.slice(startIndex, endIndex);
});
</script>

<style scoped>
@import '../style/page.scss';
@import '../style/iconfont.css';
</style>
