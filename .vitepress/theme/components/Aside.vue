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
            class="avatar-img"
            src="https://i.miji.bid/2023/08/09/eb59257ffc307103e5907a09eb10cefb.md.webp"
            alt="avatar"
          />
          <div class="author-info__name">XZM</div>
          <div class="author-info__description" id="hitokoto"></div>
        </div>
      </div>
    </div>

    <div class="card-widget card-announcement">
      <div class="card-content">
        <div class="item-headline">
          <span>💕 今日诗词</span>
        </div>
        <div class="webinfo-site-jinrishici" id="jinrishici-sentence">
          轻舟已过万重山
        </div>
      </div>
    </div>

    <div class="card-widget card-announcement">
      <div class="card-content">
        <div class="item-headline">
          <span><i class="iconfont jinengzhangwo"></i> 技能</span>
        </div>
        <InfiniteScrollContainer></InfiniteScrollContainer>
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
          <div class="webinfo-item">
            <div class="webinfo-site-uv-name">文章总数 :</div>
            <div class="webinfo-site-uv-count">{{ articleNum }}</div>
          </div>
          <div class="webinfo-item">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import InfiniteScrollContainer from './InfiniteScrollContainer.vue'
import WordCloud from './WordCloud.vue'
import { useData } from 'vitepress'
const { theme } = useData()
const articleNum = theme.value.posts.length
</script>
<style lang="scss" scoped>
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
  -webkit-box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(7, 17, 27, 0.08);
  box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(7, 17, 27, 0.08);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
}

.sidebar-banner {
  -o-object-fit: cover;
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

.tool a {
  color: #ff0066;
}

.is-center {
  text-align: center;
}

#aside_content .card-info img {
  display: inline-block;
  margin-top: -50px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  vertical-align: top;
  transition: all 0.3s;
}

img {
  max-width: 100%;
  transition: all 0.2s;
}

.avatar-img {
  animation: avatar_turn_around 2s linear infinite;
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

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #ff0066 0%, #ff00cc 100%);
  width: 85%;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

.article {
  padding: 0.9rem;
  margin: 0.4rem 0.3rem 1.1rem 0.3rem;
  display: block;
  transition: all 400ms ease;
  background: var(--vp-c-bg-alt);
  color: var(--text-color);
  -webkit-box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(7, 17, 27, 0.08);
  box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(7, 17, 27, 0.08);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
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

.describe {
  font-size: 0.9rem;
  text-indent: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: var(--vp-c-text-2);
  margin: 10px 0;
  line-height: 1.5rem;
  letter-spacing: 0.06rem;
}

.time {
  font-size: 0.5rem;
  color: #aaa;
  letter-spacing: 0.5px;
}

.title {
  color: var(--vp-c-text-2);
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem 0;
}

@media screen and (max-width: 700px) {
  .title {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 14em;
  }
  .describe {
    font-size: 0.7rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    padding: 0 0.5em;
    letter-spacing: 0.06rem;
  }
  .time {
    font-size: 0.5rem;
  }
  .line {
    border-top: 0.15rem solid #353535;
  }
}

@media screen and (max-width: 900px) {
  #aside_content {
    width: 100% !important;
  }
}
</style>