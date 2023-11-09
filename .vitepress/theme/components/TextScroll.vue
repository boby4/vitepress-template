<template>
  <div class="marquee-wrap">
    <ul class="marquee-list" :class="{ 'animate-up': animateUp }">
      <a v-for="(item, index) in listData" :key="index" :href="withBase(item.link)">
        {{ item.name }}
      </a>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'

const animateUp = ref(false)
const listData = ref([
  {
    name: '😍 欢迎来交换友链！',
    link: '/pages/link',
  },
  {
    name: '😍 查看今日黄历！！',
    link: '/pages/calendar',
  },
  {
    name: '😍 去设计一个流程图！！',
    link: '/pages/process',
  },
])
let timer = null

const scrollAnimate = () => {
  animateUp.value = true
  setTimeout(() => {
    listData.value.push(listData.value.shift())
    animateUp.value = false
  }, 3000)
}

onMounted(() => {
  timer = setInterval(scrollAnimate, 4500)
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
    a {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      list-style: none;
      text-align: left;
      font-size: .9rem;
      margin-left: .5rem;
      font-weight: 500;
    }
    a:hover{
      color: #5d80f4;
    }
  }

  .animate-up {
    transition: all 2s ease-in-out;
    transform: translateY(-2rem);
  }
}
</style>
