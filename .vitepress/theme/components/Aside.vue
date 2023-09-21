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
          <span><i class="iconfont know-your-miner" style="font-size:1.5rem;"></i> 技能</span>
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
          <vue3-word-cloud
            style="height: 250px; width: 100%;"
            :words="generateRandomColors(data)"
            font-family="Roboto"
            rotation-unit="deg"
            font-size-ratio="3"
          >
          <template v-slot="{text, word}">
            <a :title="`#${text}: ${word.value}`" style="cursor: pointer;" :href="withBase(`/pages/tags?tag=${text}`)">
              {{ text }}
            </a>
          </template>
          </vue3-word-cloud>
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
import { withBase } from 'vitepress'
import Vue3WordCloud from 'vue3-word-cloud'
import { useData } from 'vitepress'
import { ref,computed } from 'vue'
import { initTagsParams, initTags } from '../../utils/functions'
const { theme } = useData()
const data = computed(() => initTagsParams(theme.value.posts))
const articleNum = theme.value.posts.length
const randomColor = () => {
  // 生成随机颜色
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const generateRandomColors = (words) => {
  // 为每个词语生成随机颜色
  return words.map((word) => ({
    text: word.selectTag, // 标签名称
    value: word.item.length, // 标签个数
    weight: getRandomSize(), // 单词权重
    // spacing: 10, //单词之间的间距
    color: randomColor(), //单词颜色
    // rotation: getRandomRotation(), // 单词旋转角度
  }));
};

const getRandomSize = () => {
  return Math.floor(Math.random() * (20 - 1 + 1) + 1); // 随机大小在1到20之间
}

// 获取随机旋转角度
const getRandomRotation = () => {
  const randomAngle = Math.random() < 0.5 ? 0 : 90; // 随机选择45度或90度
  return randomAngle;
}
</script>
<style scoped>
@import '../style/page.scss';
@import '../style/iconfont.css';
</style>