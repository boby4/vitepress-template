<template>
  <div class="out_scroll" @mouseover="stopAnimation" @mouseout="startAnimation">
    <!-- 创建一个滚动容器，包含两个滚动元素 -->
    <div class="scroller" data-direction="left" data-speed="slow">
      <ul class="tag-list scroller__inner">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>SASS</li>
        <li>Iconfont</li>
        <li>Vue</li>
        <li>Nodejs</li>
        <li>TypeScript</li>
        <li>Threejs</li>
        <li>Illustrator</li>
        <li>Photoshop</li>
        <li>Webpack</li>
        <li>Vite</li>
        <li>Docker</li>
        <li>Nginx</li>
        <li>Jenkins</li>
        <li>Wechat Mini Program</li>
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
const animationTimeout = ref(null)

onMounted(() => {
  // 检查用户是否启用了“减少动画”选项
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAnimation()
  }
})

const imageList = ref([
  'https://i.mji.rip/2023/09/21/bfc560470393e9b56bb09da9a1ef6408.png',
  'https://i.mji.rip/2023/09/21/5998f3961581623105eddf47160decc5.png',
  'https://i.mji.rip/2023/09/21/43aaa64f71aa6aabba9055368de1357c.png',
  'https://i.mji.rip/2023/09/21/05afea2fe0c016aa070f6be50af3311c.png',
  'https://i.mji.rip/2023/09/21/7ca328af82a2f2d64f896c5d0d4ce1a8.png',
  'https://i.mji.rip/2023/09/21/0c0f27bfcff9db8c68006e70d092af87.png',
  'https://i.mji.rip/2023/09/21/07e2fb0096800311572f4163b9e070f0.png',
  'https://i.mji.rip/2023/09/21/62c953e47517461fe802b9daa19ded56.png',
  'https://i.mji.rip/2023/09/21/66f7e42e5963da1981322da6b6b500aa.png',
  'https://i.mji.rip/2023/09/21/0e5f71674e9b7380d2d08d10cbf6ea89.png',
  'https://i.mji.rip/2023/09/21/360e24517f2d66a77235e5b93dce3727.png',
  'https://i.mji.rip/2023/09/21/15572a23669a960eb619329a04d8e829.png',
  'https://i.mji.rip/2023/09/21/90b84c4ef7107b0589b84f9619dd321f.png',
  'https://i.mji.rip/2023/09/21/391c3b6bef88f1b5874b8dab75fcfba7.png',
  'https://i.mji.rip/2023/09/21/a74cf93efcc1b5e07e1b7bca46123671.png',
  'https://i.mji.rip/2023/09/21/73335ed420db8284382766fdb2952213.png',
  'https://i.mji.rip/2023/10/25/9e1e3afa41e601cff15400ecf02775de.png',
  'https://i.mji.rip/2023/10/25/33a2ac5d37af8eb6bccff3687d9cfa56.png',
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