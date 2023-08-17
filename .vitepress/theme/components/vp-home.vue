<script lang="ts" setup>
  // code……
</script>

<template>
  <div class="home-bg">
    <div class="content-bg">
      <h1>
        xuzhiming
        <p>95后青年，前端切图仔一枚, <s>一个It技术的探索路上的小学生</s></p>
      </h1>
    </div>
  </div>
  <f-main>
    <f-text align="center">
      <f-button round type="primary" class="start" href="/docs/hello.html">
        😊 快速开始
      </f-button>
      <f-button round href="https://github.com/boby4" target="_blank">
        Github
      </f-button>
    </f-text>
    <f-divider margin="40px" color="#eef" />
    <f-text bold block>欢迎使用</f-text>
    <f-text block>⚡ 欢迎使用 vitePress-template</f-text>
    <f-text block>🌲 在这里编写你的博客吧</f-text>
    <f-text block>
      🔨 官方文档在
      <f-link href="https://vitepress.vuejs.org" type="primary"> 这里 </f-link>
    </f-text>
    <f-divider margin="40px" color="#eef" />
    <f-text bold block>特性</f-text>
    <f-text>📌 开箱即用</f-text>
    <f-text>
      🚀 和
      <f-link href="https://github.com/FightingDesign/fighting-design" type="primary">
        fighting-design
      </f-link>
      完美结合
    </f-text>
    <f-text>💪 使用 Vue.js 最新特性开发</f-text>
    <f-text>🐆 全面基于 Vite，速度够快</f-text>
    <f-text>🖍️ markdown 中直接使用 vue 组件</f-text>
    <f-text>✔️ 配置简单，上手容易</f-text>
    <f-text>🚩 markdown 中直接使用 setup 语法糖</f-text>
    <f-text>📃 第三方组件库支持</f-text>
  </f-main>
</template>

<style scoped>
@media screen and (max-width: 1200px) {
  .content-bg,
  .home-bg {
    height: 15rem !important;
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

.content-bg h1 p {
  font: bold 200% Consolas, Monaco, monospace;
  border-right: 0.1em solid;
  width: 27.5em; /* fallback */
  margin: 2em 1em;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 5s steps(12, end),
    /*英文速度*/ blink-caret 0.5s step-end infinite alternate;
}
.content-bg {
  width: 100%;
  height: 450px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-bg h1 {
  font-size: 32px;
  font-weight: 500;
}
.content-bg h1 p {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
}
.home-bg {
  width: 100%;
  background: url('https://i.miji.bid/2023/08/09/382e790cbf2d7cc657be71440e033347.jpeg') center center / cover no-repeat;
  height: 450px;
  position: relative;
  overflow: hidden;
}
.f-main {
  max-width: 620px;
  margin: 40px auto;
  box-sizing: border-box;
  padding-bottom: 0;
}

.f-button-default {
  margin-left: 10px;
}

.f-text {
  display: block;
  line-height: 40px;
}
</style>
