<template>
  <div class="aside_content" id="aside_content">
    <div class="card-widget card-info">
      <div
        class="sidebar-banner"
        style="
          background-image: url('https://ixfish.cn/usr/themes/Cuteen/static/img/center-bg.svg');
        "
      ></div>
      <div class="card-content">
        <div class="card-info-avatar is-center">
          <img
            class="avatar_img"
            src="https://i.miji.bid/2023/08/09/eb59257ffc307103e5907a09eb10cefb.md.webp"
            alt="avatar"
          />
          <div class="author-info__name">XZM</div>
          <div class="author-info__description" v-if="hitokoto.hitokoto">
            {{hitokoto.hitokoto}}《{{hitokoto.from}}》--{{hitokoto.from_who}}
          </div>
        </div>
      </div>
    </div>

    <Clock></Clock>
    <div class="card-widget card-announcement">
      <div class="card-content">
        <div class="item-headline">
          <span>🥳 公告</span>
        </div>
        <div class="webinfo-site-jinrishici">
          <TextScroll />
        </div>
      </div>
    </div>

    <!-- <div class="card-widget card-announcement">
      <div class="card-content">
        <div class="item-headline">
          <span>💕 今日诗词</span>
        </div>
        <div class="webinfo-site-jinrishici" id="jinrishici-sentence">
          轻舟已过万重山
        </div>
      </div>
    </div> -->

    <div class="card-widget card-announcement">
      <div class="card-content">
        <div class="item-headline">
          <span><i class="iconfont jinengzhangwo"></i> 技能</span>
        </div>
        <InfiniteScroll />
      </div>
    </div>

    <div class="card-widget card-announcement">
      <div class="card-content">
        <div class="item-headline">
          <span><i class="iconfont biaoqian"></i> 标签云</span>
        </div>
        <div class="webinfo-site-tag">
          <WordCloud></WordCloud>
        </div>
      </div>
    </div>

    <div class="card-widget card-webinfo">
      <div class="card-content">
        <div class="item-headline">
          <span>📈 站点信息</span>
        </div>
        <div class="webinfo">
          <a class="webinfo-item item-hover" :href="withBase('pages/timeline')">
            <div class="webinfo-site-uv-name">文章总数 :</div>
            <div class="webinfo-site-uv-count">{{ articleNum }}</div>
          </a>
          <a class="webinfo-item item-hover" :href="withBase('pages/tags')">
            <div class="webinfo-site-uv-name">标签 :</div>
            <div class="webinfo-site-uv-count">{{ tags.length }}</div>
          </a>
          <div class="webinfo-item">
            <div class="webinfo-site-uv-name">文章总字数 :</div>
            <div class="webinfo-site-uv-count">
              {{wordsAccount}}
            </div>
          </div>
          <!-- <div class="webinfo-item">
            <div class="webinfo-site-uv-name">IP :</div>
            <div class="webinfo-site-uv-count">
              {{address}} {{`(${IP})`}}
            </div>
          </div>
          <div class="webinfo-item">
            <div class="webinfo-site-uv-name">天气 :</div>
            <div class="webinfo-site-uv-count">
              {{weather || '获取失败'}}
            </div>
          </div> -->
          <div class="webinfo-item">
            <div class="webinfo-site-uv-name">运行时间 :</div>
            <div class="webinfo-site-uv-count">
              {{currentTimeHtml}}
            </div>
          </div>
          <!-- <div class="webinfo-item">
            <div class="webinfo-site-uv-name">本站访客数 :</div>
            <div class="webinfo-site-uv-count" id="busuanzi_value_site_uv">
              -
            </div>
          </div>
          <div class="webinfo-item">
            <div class="webinfo-site-name">本站总访问量 :</div>
            <div class="webinfo-site-pv-count" id="busuanzi_value_site_pv">
              -
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import WordCloud from './WordCloud.vue'
import Clock from './Clock.vue'
import { useData, withBase } from 'vitepress'
import { onMounted, ref } from 'vue'
import { calculateUptime, initTagsParams } from '../../utils/functions'
import TextScroll from './TextScroll.vue'
import axios from 'axios'

const yyUrl = 'https://v1.hitokoto.cn/'
const hitokoto = ref({})
onMounted(async() => {
  const response = await axios.get(yyUrl)
  hitokoto.value = response.data
})

onMounted(() => {
  wordAccount()
  setTime() // 初始化
  setInterval(setTime, 1000) // 每秒钟刷新
})
let currentTimeHtml = ref('')
const setTime = () => {
  const currentTime = calculateUptime() // 调用公用方法
  currentTimeHtml.value = currentTime
}
const { theme } = useData()
const tags = initTagsParams(theme.value.posts)
const articleNum = theme.value.posts.length

let wordsAccount = ref(0)
const wordAccount = () => {
  let posts = theme.value.posts
  posts.map(ele => {
    wordsAccount.value += ele.frontMatter.wordCount
  });
}
</script>
<style lang="scss">
@import '../style/iconfont.css';

#aside_content {
  width: 30%;
  color: #666;
}

#aside_content .card-widget {
  overflow: hidden;
  margin: 0.5rem 0;
  background: #fff;
  border: 1px solid #e3e8f7;
  box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(7, 17, 27, 0.08);
  transition: all 0.3s;
}

.sidebar-banner {
  object-fit: cover;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
  min-height: 85px;
  width: 100%;
  overflow: hidden;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}

#aside_content .card-content {
  padding: 1rem 1.2rem;
}

.is-center {
  text-align: center;
}

.avatar_img {
  display: inline-block;
  margin-top: -50px;
  // border: 1px solid rgb(0, 0, 0, 0.1);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  vertical-align: top;
  transition: transform 0.8s ease; /* 添加过渡效果 */
  transform-origin: center center;
}

.avatar_img:hover {
  transform: rotate(360deg);
}

#aside_content .card-info .author-info__name {
  margin-top: 0.8rem;
  font-weight: 550;
  font-size: 1.4rem;
}

#aside_content .card-info .author-info__description {
  padding-top: 0.8rem;
  font-size: 0.9rem;
}

#aside_content .item-headline {
  font-size: 1.08rem;
  i {
    font-size: 1.2rem;
  }
}

.webinfo-site-jinrishici {
  font-size: 0.9rem;
  display: block;
  padding: 0.5rem 1rem 0.1rem 1rem;
}

.webinfo-site-tag {
  display: block;
  padding: 0.5rem 0 0 0;
}

#aside_content .card-webinfo .webinfo {
  padding: 0.2rem 1rem;
}

#aside_content .card-webinfo .webinfo .webinfo-item {
  font-size: 0.9rem;
  display: block;
  padding: 6px 0 0;
}

#aside_content .card-webinfo .webinfo .webinfo-item div:first-child {
  display: inline-block;
}

#aside_content .card-webinfo .webinfo .webinfo-item div:last-child {
  display: inline-block;
  float: right;
}
.item-hover:hover{
  color:#5d80f4;
}

@media screen and (min-width: 768px) {
  #site-title {
    font-size: 2rem;
  }
}

@media screen and (min-width: 900px) {
  #aside_content .card-widget {
    margin-right: 15px;
  }
}

.article {
  padding: 0.9rem;
  margin: 0.4rem 0.3rem 1.1rem 0.3rem;
  display: block;
  transition: all 400ms ease;
  background: var(--vp-c-bg-alt);
  color: var(--text-color);
  box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(7, 17, 27, 0.08);
  transition: all 0.3s;
}

.article:hover {
  transform: translateY(-4px);
  color: var(--text-color);
}

.article-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 900px) {
  #aside_content {
    width: 100% !important;
  }
}
</style>