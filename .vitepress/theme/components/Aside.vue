<template>
  <div class="aside_content" id="aside_content">
    <div class="card-widget card-info">
      <div class="sidebar-banner" style="background-image: url('https://ixfish.cn/usr/themes/Cuteen/static/img/center-bg.svg')"></div>
      <div class="card-content">
        <div class="card-info-avatar is-center">
            <img class="avatar-img"
                src="https://i.miji.bid/2023/08/09/eb59257ffc307103e5907a09eb10cefb.md.webp"
                alt="avatar">
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
        <div class="webinfo-site-jinrishici" id="jinrishici-sentence">轻舟已过万重山</div>
      </div>
    </div>

    <div class="card-widget card-webinfo">
      <div class="card-content">
        <div class="item-headline">
          <span>📈 站点信息</span>
        </div>
        <div class="webinfo">
          <div class="webinfo-item">
            <div class="webinfo-site-uv-name">本站访客数 :</div>
            <div
              class="webinfo-site-uv-count"
              id="busuanzi_value_site_uv"
            >-</div>
          </div>
          <div class="webinfo-item">
            <div class="webinfo-site-name">本站总访问量 :</div>
            <div
              class="webinfo-site-pv-count"
              id="busuanzi_value_site_pv"
            >-</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
@import '../style/page.scss';
</style>