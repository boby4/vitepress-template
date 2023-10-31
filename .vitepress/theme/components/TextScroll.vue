<template>
  <div class="marquee-wrap">
    <span>😍</span>
    <ul class="marquee-list" :class="{ 'animate-up': animateUp }">
      <li v-for="(item, index) in listData" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const animateUp = ref(false)
const listData = ref([
  {
    name: '欢迎来交换友链！',
  },
  {
    name: '欢迎来交换友链！！',
  },
  {
    name: '欢迎来交换友链！！！',
  },
])
let timer = null

const scrollAnimate = () => {
  animateUp.value = true
  setTimeout(() => {
    listData.value.push(listData.value.shift())
    animateUp.value = false
  }, 1200)
}

onMounted(() => {
  timer = setInterval(scrollAnimate, 1500)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.marquee-wrap {
  border-radius: 0.5rem;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  overflow: hidden;
  display: flex;
  cursor: pointer;
  .marquee-list {
    li {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      list-style: none;
      text-align: left;
      font-size: .9rem;
      margin-left: .5rem;
      font-weight: 500;
    }
  }

  .animate-up {
    transition: all 1.5s ease-in-out;
    transform: translateY(-2rem);
  }
}
</style>
