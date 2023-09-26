<template>
  <div class="pagination">
    <div class="pagin prev-button" @click="prevPage" :disabled="currentPage === 1">上一页</div>
    <div class="page-numbers">
      <!-- 显示页码 -->
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ 'active': currentPage === page }"
        class="page-button"
      >{{ page }}</button>
    </div>
    <div class="pagin next-button" @click="nextPage" :disabled="currentPage === totalPages">下一页</div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  visiblePageCount: {
    type: Number,
    default: 5, // 可见页码数量，默认为 5
  },
});

const emits = defineEmits(['page-change']);

const currentPage = ref(props.currentPage);

const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage.value - Math.floor(props.visiblePageCount / 2));
  const endPage = Math.min(props.totalPages, startPage + props.visiblePageCount - 1);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

function goToPage(page) {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
    emits('page-change', page);
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
}

function nextPage() {
  if (currentPage.value < props.totalPages) {
    goToPage(currentPage.value + 1);
  }
}
</script>

<style lang="scss" scoped>
/* 分页样式 */
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100% !important;
  position: relative;
}

.pagin {
  border-radius: 5px;
  padding: 8px 16px;
  margin: 0 5px;
  background-color: var(--vp-c-brand) !important;
  color: #fff !important;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

/* 上一页按钮样式 */
.prev-button {
  margin-right: 10px;
}

/* 下一页按钮样式 */
.next-button {
  margin-left: 10px;
}

/* 页码按钮样式 */
.page-button {
  color: var(--vp-c-text-1);
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
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
