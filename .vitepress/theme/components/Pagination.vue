<template>
  <div class="pagination">
    <div class="pages">
      <div class="pagin" @click="prevPage" :disabled="currentPage === 1">
        上一页
      </div>
      <div class="page-numbers">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: currentPage === page }"
          class="page-button"
        >
          {{ page }}
        </button>
      </div>
      <div
        class="pagin"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        下一页
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  visiblePageCount: {
    type: Number,
    default: 5, // 可见页码数量，默认为 5
  },
})
const emits = defineEmits(['page-change'])
const currentPage = ref(props.currentPage)
const visiblePages = computed(() => {
  const startPage = Math.max(
    1,
    currentPage.value - Math.floor(props.visiblePageCount / 2)
  )
  const endPage = Math.min(
    props.totalPages,
    startPage + props.visiblePageCount - 1
  )
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
})
const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page
    emits('page-change', page)
  }
}
const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}
const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    goToPage(currentPage.value + 1)
  }
}
</script>

<style lang="scss" scoped>
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
}
.pagin {
  border-radius: .2rem;
  padding: .5rem .9rem;
  margin: 0 .3rem;
  font-size: .8rem;
  background-color: var(--vp-c-brand);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  user-select: none;
}

.page-button {
  color: var(--vp-c-text-1);
  border: none;
  border-radius: .2rem;
  padding: .5rem .9rem;
  margin: 0 .3rem;
  font-size: .8rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  user-select: none;
}

.page-button.active {
  background-color: var(--vp-c-brand);
  color: #fff;
}

.page-button:hover {
  background-color: var(--vp-c-brand);
  color: #fff;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}
</style>
