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
    <a :href="withBase(article.regularPath)" v-for="(article, index) in posts" :key="index" class="article">
      <div class="article-header">
        <div class="title">
          {{ article.frontMatter.title || '' }}
        </div>
        <time :datetime="article.frontMatter.date" class="time">
          {{ article.frontMatter.date || '' }}
        </time>
      </div>

      <div class="line"></div>
      <p class="describe">
        {{ article.frontMatter.description || '' }}
      </p>
    </a>

    <div class="pagination">
      <a
        class="link"
        :class="{ active: pageCurrent === i }"
        v-for="i in pagesNum"
        :key="i"
        :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
        >{{ i }}</a
      >
    </div>
  </f-main>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
const props = defineProps({
  posts: Array,
  pageCurrent: Number,
  pagesNum: Number
})
</script>

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
  font-size: 2rem;
  font-weight: 500;
}
.content-bg h1 p {
  margin: 0;
  font-size: 1rem;
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
  max-width: 720px;
  margin: 40px auto;
  box-sizing: border-box;
  padding-bottom: 0;
}
.article {
  padding: 1rem;
  margin: 1.5rem;
  display: block;
  border: 1.5px solid rgba(247, 244, 244, 0.936);
  color: var(--text-color-light);
  border-radius: 1rem;
}
.article:hover {
  display: block;
  color: var(--text-color-light);
  box-shadow: .1rem .1rem 0.4rem rgba(198, 191, 191, 0.901);
  transition: 500ms;
  border-radius: 1rem;
}
.article-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.describe {
  font-size: 0.9375rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: var(--vp-c-text-2);
  margin: 10px 0;
  line-height: 1.5rem;
}
.time {
  color: #aaa;
  letter-spacing: 0.5px;
}
.title {
  color: var(--vp-c-text-2);
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.5rem 0;
}
.line {
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  border-top: 0.15rem solid var(--text-color-light);
  display: block;
  width: 2rem;
}
.article:hover .line {
  width: 6rem;
}
@media screen and (max-width: 700px) {
  .title {
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 14em;
  }
  .describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    padding: 0 0.5em;
  }
  .time {
    font-size: 14px;
  }
  .line {
    border-top: 0.15rem solid #353535;
  }
}
.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.link {
  display: inline-block;
  width: 24px;
  text-align: center;
  border: 1px var(--vp-c-divider-light) solid;
  border-right: none;
  font-weight: 400;
}
.link.active {
  background: var(--vp-c-text-1);
  color: var(--vp-c-text-inverse-1);
  border: 1px solid var(--vp-c-text-1) !important;
}
.link:first-child {
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.link:last-child {
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-right: 1px var(--vp-c-divider-light) solid;
}
</style>
