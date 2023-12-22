<template>
  <div class="marquee-wrap">
    <ul class="marquee-list" :class="{ 'animate-up': animateUp }">
      <a v-for="(item, index) in listData" :key="index" _blank :href="withBase(item.link)">
        {{ item.name }}
      </a>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { withBase } from 'vitepress'
import { request } from '../../utils/request'

const animateUp = ref(false)
const listData = ref([])
let timer = null

onMounted(() => {
  timer = setInterval(scrollAnimate, 4500)
  getNotice()
})

const getNotice = async () => {
  const res = await request('/classes/Notice')
  listData.value = res.results
}

const scrollAnimate = () => {
  animateUp.value = true
  setTimeout(() => {
    listData.value.push(listData.value.shift())
    animateUp.value = false
  }, 3000)
}

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
