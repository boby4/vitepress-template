<template>
  <div class="site-footer">
    Copyright © 2023-2024
    <a class="vitepress" :href="website">{{ webTitle }}</a
    ><br />
    Powered by
    <a class="vitepress" target="_blank" href="//vitepress.vuejs.org/"
      >VitePress - 1.0.0-rc.47</a
    >
    <!-- <p class="htmer_time">
      本站已实际运行 <strong>{{ currentTimeHtml }}</strong>
    </p> -->
  </div>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress'
const { site, theme } = useData()
const website = theme.value.website
const webTitle = site.value.title
</script>

<style>
.site-footer {
  color: #888;
  text-align: center;
  font-size: 0.75rem;
  width: 100%;
  padding: 10px 0 10px 0;
  /* height: 4rem;
    background: white;
    position: fixed;
    bottom: 0;
    z-index: 9; */
}
.vitepress {
  color: var(--vp-c-text-1);
  font-weight: 700;
}
</style>
