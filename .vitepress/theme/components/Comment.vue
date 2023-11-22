<template>
  <div class="post_comments">
    <div class="line">
      <div class="line_name">评论</div>
    </div>
    <section class="page-edit">
      <div class="page-edit-read">
        <!-- id 将作为查询条件 -->
        <span class="leancloud-visitors" data-flag-title="Your Article Title">
          <em class="post-meta-item-text">阅读量： </em>
          <i class="leancloud-visitors-count"></i>
        </span>
      </div>
      <div id="vcomments"></div>
    </section>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import { remoteImport } from '../../utils/functions'

const route = useRoute()
const initValine = () => {
  let path = location.origin + location.pathname
  document.getElementsByClassName('leancloud-visitors')[0].id = path
  new Valine({
    el: '#vcomments',
    appId: 'Nt8o9ggO0lF2Sc7nAuCEuG2W-gzGzoHsz',
    appKey: 'nh5CSdDF83fdnKMWVwvs0uog',
    path: path,
    visitor: true,
    avatarForce: true,
    recordIP: true,
    avatar: 'monsterid',
    placeholder: '在这里留言，填写邮箱还能及时收到邮件回复哦，点击头像跳转填写的地址',
  })
}

watch(
  () => route.path,
  () => {
    initValine()
  }
)

onMounted(() => {
  remoteImport('//cdn.jsdelivr.net/gh/HCLonely/Valine@latest/dist/Valine.min.js').then(() => initValine())
})
</script>

<style lang="scss">
#veditor {
  background-image: url(https://cdn.jsdelivr.net/gh/drew233/cdn/20200409110727.webp);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  background-color: rgba(255, 255, 255, 0);
  resize: vertical;
}
#vcomments .vheader .vnick {
  width: 29%;
  border: 2px solid #dedede;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vheader .vmail {
  width: 29%;
  border: 2px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
#vcomments .vheader .vlink {
  width: 30%;
  border: 2px solid #dedede;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
}
img.vimg {
  transition: all 1s; /* 旋转时间为 1s */
}
img.vimg:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
#vcomments .vcards .vcard {
  padding: 15px 20px 0 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
}
#vcomments .vcards .vcard:hover {
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.12);
}
#vcomments .vcards .vcard .vh .vcard {
  border: none;
  box-shadow: none;
}
#vcomments .vrow .vsubmit{
    color: #555;
    padding: 0.5em 2.3em;
    margin: 0 0.5em;
    min-width: 60px;
    max-width: 100%;
    background: #e9eff3;
}
.post_comments {
  background-color: #fff;
  padding: 1.25rem 0;
  margin-top: 1.4rem;
}
.post_comments .line {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
  position: relative;
  margin-bottom: 1.2rem;
}
.post_comments .line_name {
  color: #666;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  padding-left: 1rem;
}
.page-edit-read {
  font-size: 14px;
  text-align: right;
  margin: 14px 0;
}
</style>
