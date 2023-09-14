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
          <span><i class="iconfont shiciguanli"></i> 今日诗词</span>
        </div>
        <div class="webinfo-site-jinrishici" id="jinrishici-sentence"></div>
      </div>
    </div>

    <div class="card-widget card-webinfo">
      <div class="card-content">
        <div class="item-headline">
          <span><i class="iconfont tudigongying"></i> 站点信息</span>
        </div>
        <div class="webinfo">
          <div class="webinfo-item">
            <div class="webinfo-site-uv-name">本站访客数 :</div>
            <div
              class="webinfo-site-uv-count"
              id="busuanzi_value_site_uv"
            ></div>
          </div>
          <div class="webinfo-item">
            <div class="webinfo-site-name">本站总访问量 :</div>
            <div
              class="webinfo-site-pv-count"
              id="busuanzi_value_site_pv"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-widget">
      <div class="item-headline" style="padding: 1rem 1.2rem;">
        <span><i class="iconfont jinengzhangwo"></i> 技能展示</span>
      </div>
      <Vue3SeamlessScroll
        :list="skills"
        direction="left"
        singleLine
        :copyNum="3"
        :step="0.2"
        class="scroll"
      >
        <div v-for="(item, index) in skills" :key="index" class="item">
          <div class="icon" :class="`iconfont ${item}`"></div>
        </div>
      </Vue3SeamlessScroll>
    </div>

  </div>
</template>
<script setup>
import {Vue3SeamlessScroll} from "vue3-seamless-scroll";
import { onMounted, ref } from 'vue'

const skills = ref([
  'Jenkins_logo',
  'sass',
  'JavaScript',
  'CSS',
  'HTML',
  'Iconfont',
  'webpack',
  'Vue',
  'Nodejs',
  'typescript',
  'a-adobeillustrator',
  'a-adobephotoshop',
  'Docker',
])
</script>

<style lang="scss" scoped>
@import '../style/page.scss';
@import '../style/iconfont.css';
.scroll {
  margin: 0 auto;
  overflow: hidden;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.5rem .8rem 3.5rem 0;
    .icon{
      font-size: 70px;
    }
  }
}
</style>