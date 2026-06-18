<template>
  <div class="link-page">
    <div class="link-header">
      <h1 class="link-title">友情链接</h1>
      <p class="link-subtitle">跟优秀的人一起成长</p>
    </div>

    <!-- 头像滚动条 -->
    <div class="avatar-scroll">
      <div class="scroller" data-direction="right" data-speed="slow">
        <div class="scroller__inner">
          <a v-for="(item, i) in avatarRoll" :key="i" :href="item.link" target="_blank" :title="item.nickName">
            <img :src="item.imgUrl" alt="" @error="onImgError" />
          </a>
        </div>
      </div>
    </div>

    <!-- 友链卡片网格 -->
    <div class="link-grid">
      <a
        v-for="item in shuffledFriendshipData"
        :key="item.link"
        class="link-card"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class="link-card-avatar" :src="item.imgUrl" @error="onImgError" />
        <div class="link-card-info">
          <span class="link-card-name">{{ item.nickName }}</span>
          <span class="link-card-desc">{{ item.introduce }}</span>
        </div>
      </a>
    </div>

    <!-- 申请入口 -->
    <div class="apply-card">
      <h3 class="apply-title">申请友链</h3>
      <p class="apply-info">
        名称：<code>XZM AI Studio</code> &nbsp;·&nbsp;
        链接：<code>https://xzmblog.onrender.com</code> &nbsp;·&nbsp;
        描述：<code>构建AI产品 · 分享技术思考</code>
      </p>
      <button class="apply-btn" @click="copyInfo">复制本站信息</button>
      <p class="apply-hint">在评论区留言，提供名称、链接、头像、描述即可</p>
    </div>

    <Comment />
    <Message ref="notification" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../utils/request'

const fallbackData = [
  { nickName: '张洪Heo', link: 'https://blog.zhheo.com', imgUrl: 'https://bu.dusays.com/2022/12/28/63ac2812183aa.png', introduce: '分享设计与科技生活' },
  { nickName: 'Leo', link: 'https://www.isolitude.cn', imgUrl: 'https://cravatar.cn/avatar/924916294598a950bb80d78012dc3aac?s=100&r=G&d=https://pic.isolitude.cn/2022/01/28/75a6d779e1bc8.png', introduce: '是谁说生活生来就要活。' },
  { nickName: '爱编程的小明', link: 'https://blog.kobal.top', imgUrl: 'https://gcore.jsdelivr.net/gh/kebuAAA/Picloud@main/img/avatar.webp', introduce: '不要温和地走进那个良夜' },
  { nickName: '小码同学', link: 'https://blog.hikki.site', imgUrl: 'https://bu.dusays.com/2022/11/04/636511250b21b.jpg', introduce: '喜欢的东西就努力去追求，万一成功了呢!' },
  { nickName: '如诗', link: 'https://likepoems.com', imgUrl: 'https://static.likepoems.com/cdn/images/logo.jpg', introduce: '学习笔记' },
  { nickName: '老生杂谈的IT人', link: 'https://www.oldit.cn', imgUrl: 'https://image.oldit.cn/image/author.webp', introduce: '老生杂谈，后继有人。' },
  { nickName: '楠笙', link: 'https://blog.nanshengwx.cn/', imgUrl: 'https://blog.nanshengwx.cn/upload/logo.png', introduce: '空谈误国，实干兴邦' }
]

const shuffleArray = (array) => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

const avatarRoll = ref([...fallbackData, ...fallbackData])
const FriendshipCache = ref(fallbackData)
const shuffledFriendshipData = ref(shuffleArray(fallbackData))

onMounted(async () => {
  try {
    let res = await request('/classes/Firends')
    avatarRoll.value = [...res.results, ...res.results]
    FriendshipCache.value = res.results
    shuffledFriendshipData.value = shuffleArray(res.results)
  } catch {}
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setupScroll()
  }
})

const setupScroll = () => {
  const scrollers = document.querySelectorAll('.scroller')
  scrollers.forEach((scroller) => {
    scroller.setAttribute('data-animated', true)
    const inner = scroller.querySelector('.scroller__inner')
    Array.from(inner.children).forEach((item) => {
      const dup = item.cloneNode(true)
      dup.setAttribute('aria-hidden', true)
      inner.appendChild(dup)
    })
  })
}

const onImgError = (e) => {
  e.target.style.display = 'none'
}

const notification = ref('')
const copyInfo = () => {
  const text = `name: XZM AI Studio\nlink: https://xzmblog.onrender.com\navatar: https://i.miji.bid/2023/08/09/eb59257ffc307103e5907a09eb10cefb.md.webp\ndescr: 构建AI产品 · 分享技术思考`
  navigator.clipboard?.writeText(text).catch(() => {
    const el = document.createElement('textarea')
    el.value = text; document.body.appendChild(el); el.select()
    document.execCommand('copy'); document.body.removeChild(el)
  })
  notification.value?.show?.({ message: '已复制', duration: 2000, type: 'success' })
}
</script>

<style scoped>
.link-page {
  min-height: 100vh;
  background: #0a0a0a;
  padding: 100px 24px 80px;
  max-width: 960px;
  margin: 0 auto;
}

/* Header */
.link-header {
  text-align: center;
  margin-bottom: 40px;
}

.link-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}

.link-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}

/* Avatar scroll bar */
.avatar-scroll {
  margin-bottom: 56px;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
}

.avatar-scroll .scroller__inner {
  padding-block: 0.5rem;
  display: flex;
  gap: 1rem;
}

.avatar-scroll .scroller__inner img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.2s;
  object-fit: cover;
}

.avatar-scroll .scroller__inner img:hover {
  border-color: rgba(139, 92, 246, 0.5);
}

.scroller[data-animated='true'] {
  overflow: hidden;
}
.scroller[data-animated='true'] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll 60s linear infinite;
}
.scroller[data-direction='right'] { animation-direction: reverse; }
@keyframes scroll { to { transform: translate(-50%); } }

/* Link card grid */
.link-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 48px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(139, 92, 246, 0.25);
  transform: translateY(-2px);
}

.link-card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.link-card-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.link-card-name {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-card-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Apply card */
.apply-card {
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 32px 24px;
  margin-bottom: 48px;
}

.apply-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 12px;
}

.apply-info {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 16px;
  line-height: 1.8;
}

.apply-info code {
  font-size: 12px;
  color: rgba(139, 92, 246, 0.8);
  background: rgba(139, 92, 246, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
}

.apply-btn {
  display: inline-block;
  padding: 8px 22px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  margin-bottom: 14px;
}

.apply-btn:hover {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.25);
  color: #fff;
}

.apply-hint {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
}

@media (max-width: 640px) {
  .link-grid {
    grid-template-columns: 1fr;
  }

  .link-title {
    font-size: 32px;
  }
}
</style>
