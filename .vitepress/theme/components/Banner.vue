<template>
  <div class="home_bg">
    <img alt="background Image" v-lazy="{ src: imgs, loading: '/src/img/20210622113916157.gif', delay: 2000 }">
    <div class="content_bg">
      <h1>
        xuzhiming
        <p>95后青年，前端切图仔一枚, <s>一个It技术的探索路上的小学生</s></p>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { randomImage } from '../../utils/functions'
const imgs = ref(randomImage())
</script>

<style lang="scss" scoped>
.home_bg {
  width: 100%;
  height: 380px;
  position: relative;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink-caret {
  50% {
    border-color: transparent;
  }
}

.content_bg h1 p {
  font: bold 200% Consolas, Monaco, monospace;
  border-right: 0.1em solid;
  width: 27.5em;
  /* fallback */
  margin: 2em 1em;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 5s steps(12, end),
    /*英文速度*/ blink-caret 0.5s step-end infinite alternate;
}

.content_bg {
  width: 100%;
  height: 380px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
}

.content_bg h1 {
  width: 10rem;
  font-size: 2rem;
  font-weight: 500;
}

.content_bg h1 p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
}

@media screen and (max-width: 900px) {
  .content_bg,
  .home_bg {
    height: 15rem;
  }
}

</style>
