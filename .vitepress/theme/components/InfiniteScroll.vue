<template>
  <div class="out_scroll" @mouseover="stopAnimation" @mouseout="startAnimation">
    <!-- 创建一个滚动容器，包含两个滚动元素 -->
    <div class="scroller" data-direction="left" data-speed="slow">
      <ul class="tag-list scroller__inner">
        <li v-for="item in skillList" :key="item.objectId">{{item.title}}</li>
        <!-- <li>HTML</li>
        <li>CSS</li>
        <li>SASS</li>
        <li>Wechat Mini Program</li>
        <li>Vue</li>
        <li>Vite</li>
        <li>Nodejs</li>
        <li>Threejs</li>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>Nginx</li>
        <li>Webpack</li>
        <li>Docker</li>
        <li>Jenkins</li>
        <li>Kubernets</li>
        <li>Echarts</li>
        <li>Iconfont</li>
        <li>Gitlab</li>
        <li>Illustrator</li>
        <li>Photoshop</li> -->
      </ul>
    </div>

    <div class="scroller" data-direction="right" data-speed="slow">
      <div class="scroller__inner">
        <img
          v-for="(item) in skillList"
          :key="item.objectId"
          :src="item.image"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../utils/request'

const skillList = ref([])
const scrollers = ref([])
const animationTimeout = ref(null)

onMounted(() => {
  getFirendship()
  // 检查用户是否启用了“减少动画”选项
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAnimation()
  }
})

const getFirendship = async() => {
  let res = await request('/classes/Skills')
  skillList.value = res.results
}

// 添加滚动动画的函数
const addAnimation = () => {
  scrollers.value = document.querySelectorAll('.scroller')
  scrollers.value.forEach((scroller) => {
    scroller.setAttribute('data-animated', true)
    const scrollerInner = scroller.querySelector('.scroller__inner')
    const scrollerContent = Array.from(scrollerInner.children)
    // 复制滚动内容以创建无限滚动效果
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      duplicatedItem.setAttribute('aria-hidden', true)
      scrollerInner.appendChild(duplicatedItem)
    })
  })
}

const stopAnimation = () => {
  scrollers.value.forEach((scroller) => {
    scroller.removeAttribute('data-animated')
  })
}

const startAnimation = () => {
  scrollers.value = document.querySelectorAll('.scroller')
  scrollers.value.forEach((scroller) => {
    scroller.setAttribute('data-animated', true)
  })
}
</script>

<style lang="scss" scoped>
.out_scroll {
  cursor: pointer; /* 添加鼠标指针样式 */
  font-size: 1.125rem;
  margin: .5rem 0 0;
}

.tag-list {
  margin: 0;
  padding-inline: 0;
  list-style: none;
}

.tag-list li {
  color: hsl(0, 0%, 100%);
  padding: 1rem;
  background: hsl(215, 25%, 27%);
  border-radius: 0.5rem;
  box-shadow: 0 .5rem .2rem -.25rem #e2e7f1;
}

.scroller {
  max-width: 600px;
}

.scroller__inner {
  padding-block: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  img{
    width: 5rem;
    border-radius: 1.1rem;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  }
}

.scroller[data-animated='true'] {
  overflow: hidden;
}

.scroller[data-animated='true'] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll var(--_animation-duration, 40s)
    var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-direction='right'] {
  --_animation-direction: reverse;
}

.scroller[data-direction='left'] {
  --_animation-direction: forwards;
}

.scroller[data-speed='fast'] {
  --_animation-duration: 20s;
}

.scroller[data-speed='slow'] {
  --_animation-duration: 60s;
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 0.5rem));
  }
}
</style>