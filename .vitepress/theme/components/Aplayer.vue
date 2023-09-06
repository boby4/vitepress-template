<template>
  <div class="meting-player">
    <button @click="togglePlayer">{{ isPlayerVisible ? '>' : '<' }}</button>
    <transition name="slide-fade">
      <div v-show="isPlayerVisible">
        <div class="meting_js">
          <meting-js
            server="tencent"
            type="playlist"
            id="7459592653"
            fixed="false"
            autoplay="false"
            loop="all"
            order="list"
            preload="auto"
            list-folded="true"
            theme="#1890ff"
            list-max-height="280px"
            lrc-type="1"
            auto="https://y.qq.com/n/ryqq/playlist/7459592653"
          >
          </meting-js>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let isPlayerVisible = ref(false)

const togglePlayer = () => {
  isPlayerVisible.value = !isPlayerVisible.value
}
</script>

<style lang="scss">
.meting-player {
  position: fixed;
  top: 20%;
  right: 0;
  background-color: #fff;
  box-shadow: -2px 3px 5px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
}
.meting-player button {
  font-size: 1.1rem;
  color: #666;
  padding: 10px;
}
.meting_js {
  color: #666;
  z-index: 2;
  width: 18rem;
}

/* 定义进入和离开动画的 CSS 类 */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}
</style>
