<template>
  <div class="home_bg" :style="backgroundStyle">
    <div class="content_bg">
      <h1>
        xuzhiming
        <p>95后青年，前端切图仔一枚, <s>一个It技术的探索路上的小学生</s></p>
      </h1>
    </div>
  </div>
  <div class="layout_page">
    <Aside />
    <div class="f_main">
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
import Pagination from './Pagination.vue'
import Aside from './Aside.vue'
import { randomImage } from '../../utils/functions'

const backgroundStyle = computed(() => {
  const backgroundImageStyle = `url('${randomImage()}') center center / cover no-repeat`
  return { background: backgroundImageStyle }
})

const { theme } = useData()
const data = computed(() => theme.value.posts)
const currentPage = ref(1)

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  // 根据新的页码加载数据等操作
}

const itemsPerPage = 5
const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage))

const posts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return data.value.slice(startIndex, endIndex)
})
</script>

<style lang="scss" scoped>
.home_bg {
  width: 100%;
  height: 380px;
  position: relative;
  overflow: hidden;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink-caret {
  50% {
    border-color: transparent;
  }
}

.content_bg h1 p {
  font: bold 200% Consolas, Monaco, monospace;
  border-right: 0.1em solid;
  width: 27.5em;
  /* fallback */
  margin: 2em 1em;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 5s steps(12, end),
    /*英文速度*/ blink-caret 0.5s step-end infinite alternate;
}

.content_bg {
  width: 100%;
  height: 380px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content_bg h1 {
  width: 10rem;
  font-size: 2rem;
  font-weight: 500;
}

.content_bg h1 p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
}

.layout_page,
.layout_post {
  -webkit-animation: main 1s;
  -moz-animation: main 1s;
  -o-animation: main 1s;
  -ms-animation: main 1s;
  animation: main 1s;
}

.f_main {
  width: 70%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .layout_page {
    padding: 0 5px !important;
  }
  .f_main {
    width: 100% !important;
  }
}

@media screen and (max-width: 900px) {
  .layout_page {
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .f_main {
    width: 100% !important;
  }
}

@media screen and (max-width: 1200px) {
  .content_bg,
  .home_bg {
    height: 15rem !important;
  }
}

.layout_page {
  display: flex;
  -webkit-box-align: start;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 10px;
  max-width: 1200px;
}
</style>
