<template>
  <Banner></Banner>
  <div class="layout_page">
    <Aside />
    <div class="f_main">
      <Paging :datas="posts"></Paging>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @pageChange="handlePageChange"
        :visiblePageCount="5"
      ></Pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { withBase, useData } from 'vitepress'
import Aside from './Aside.vue'
import Banner from './Banner.vue'

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

<style lang="scss">
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
