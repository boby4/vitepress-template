---
date: 2023-10-13
title: 在vue3中使用两种方案实现无限水平滚动
tags:
- 组件
- Vue
description: 使用SwiperJs 的Autoplay/使用CSS+Js两种方案在vue3中实现元素水平无限滚动。
---

# **在vue3中使用两种方案实现无限水平滚动**

前几天看到别的大佬的博客有那种无限滚动的效果，就想着自己实现一下，于是就找到了两种方案，一种是使用SwiperJs 的Autoplay，另一种是使用CSS+Js实现。

## **SwiperJs 的Autoplay**
Swiper最新的版本10.3+已经完美支持了vue3，所以我们可以直接使用SwiperJs 的Autoplay。
Swiper的Autoplay是官方提供的无限滚动插件，使用起来很简单，只需要在swiper的配置中添加autoplay属性即可。更多swiper的配置可以参考<a href="https://swiperjs.com/" style="color:blue">官方文档</a>。以下是我实现无限滑动的代码以及相关配置：

### 首先安装swiper

```bash
npm install swiper --save
yarn add swiper --save
```

### 然后在你的组件里引入swiper

```js
//引入Autoplay方法
import { Autoplay } from 'swiper/modules'
//引入swiper,SwiperSlide组件
import { Swiper, SwiperSlide } from 'swiper/vue'
// 引入组件样式
import 'swiper/css'
```

### 然后在你的组件里使用swiper实现你想要的效果

```vue
<template>
  <swiper
    :slidesPerView="4"                 <!-- 一次显示的幻灯片数量 -->
    :centeredSlides="true"             <!-- 幻灯片是否居中显示 -->
    :spaceBetween="15"                <!-- 幻灯片之间的间距 -->
    :loop="true"                       <!-- 是否循环轮播 -->
    effect="slide"                     <!-- 幻灯片切换效果为滑动 -->
    :speed="2000"                     <!-- 幻灯片切换速度，单位为毫秒 -->
    :allowTouchMove="false"            <!-- 禁止触摸滑动 -->
    :autoplay="{                       <!-- 自动播放设置 -->
      delay: 0,                       <!-- 自动播放延迟，0表示立即开始 -->
      disableOnInteraction: false,     <!-- 是否在用户交互时禁用自动播放 -->
    }"
    :modules="[Autoplay]"             <!-- 使用Swiper Autoplay模块 -->
  >
    <swiper-slide                      <!-- 开始定义幻灯片内容 -->
      v-for="(item, index) in imageList"
      :key="index"
      class="swiper-slide"
    >
      <img :src="item" alt="" />      <!-- 显示图片，item是轮播图片的URL -->
    </swiper-slide>
  </swiper>
</template>
```

### 效果

<InfiniteScrollContainer />

可以看到这个虽然实现了效果，但是会有那种swiper特有的停顿感，不顺畅，于是就有了下面这个方案

## 使用CSS+js实现

创建一个addAnimation 函数用于添加滚动动画效果。
通过 querySelectorAll 获取所有具有类名 .scroller 的滚动元素，并将它们存储在 scrollers 中。
对于每个滚动元素，它设置 data-animated 属性为 true，以指示启用动画。
然后复制滚动元素内部的内容，以创建无限滚动效果。
使用css的@keyframes scroll创建一个动画关键帧，用于实现滚动效果。通过 transform: translate 属性实现左右滚动，其中 var(--_animation-direction, forwards) 用于根据滚动元素的 data-direction 属性控制滚动方向。

```vue
<template>
  <div class="out_scroll">
    <!-- 创建一个滚动容器，包含两个滚动元素 -->
    <div class="scroller" data-direction="left" data-speed="slow">
      <ul class="tag-list scroller__inner">
        <li>...</li>
      </ul>
    </div>
    <div class="scroller" data-direction="right" data-speed="slow">
      <div class="scroller__inner">
        <img
          v-for="(item, index) in imageList"
          :key="index"
          :src="item"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const scrollers = ref([])
onMounted(() => {
  // 检查用户是否启用了“减少动画”选项
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addAnimation()
  }
})
const imageList = ref([
  // 你的图片数组
])
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
</script>
<style lang="scss" scoped>
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
```
### 实现效果

<InfiniteScroll />

完美！

<Fancybox />
<Comment />
