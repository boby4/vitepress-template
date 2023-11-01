<template>
  <div class="friend_ship">
    <h3>友情链接</h3>
    <div class="out_scroll">
      <div class="scroller" data-direction="right" data-speed="slow">
        <div class="scroller__inner">
          <a :href="item.link" v-for="(item, index) in FriendshipData" :key="index" target="_blank">
            <img :src="item.imgUrl" alt="" />
          </a>
        </div>
      </div>
    </div>
    <h3>友情格式</h3>
    <div class="friend-info">
      <div class="copy-section">
        <div class="copy-content">
          <p>
            <strong>链接:</strong> <span>https://xzmblog.onrender.com/</span>
          </p>
          <p><strong>名称:</strong> <span>前端日记</span></p>
          <p>
            <strong>头像:</strong>
            <span
              >https://i.miji.bid/2023/08/09/eb59257ffc307103e5907a09eb10cefb.md.webp</span
            >
          </p>
          <p><strong>描述:</strong> <span>前端切图仔一枚</span></p>
        </div>
        <div class="copy-btn" @click="copyToClipboard">© 复制</div>
      </div>
    </div>
    <div class="position_refresh">
      <p style="flex: 1">*友链排列顺序为随机展示</p>
      <p @click="refresh" style="text-align: right">⟳ 刷新</p>
    </div>
    <div class="Friendship">
      <transition-group name="shuffle">
        <a
          class="ships"
          :href="item.link"
          v-for="(item, index) in shuffledFriendshipData"
          :key="index + item.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img class="img-div" :src="item.imgUrl" />
          <div class="introduce">
            <p class="nickName">{{ item.nickName }}</p>
            <p class="discript">{{ item.introduce }}</p>
          </div>
        </a>
      </transition-group>
    </div>
    <blockquote>
      🔗 交换友情链接可以在评论里留言。提供名称，网站链接，描述，头像即可。
    </blockquote>
    <Comment />
  </div>
  <Message ref="notification" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  refresh()
  // 检查用户是否启用了“减少动画”选项
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addAnimation()
  }
})

const scrollers = ref([])
const animationTimeout = ref(null)

// 添加滚动动画的函数
const addAnimation = () => {
  scrollers.value = document.querySelectorAll('.scroller')
  scrollers.value.forEach((scroller) => {
    scroller.setAttribute('data-animated', true)
    const scrollerInner = scroller.querySelector('.scroller__inner')
    const scrollerContent = Array.from(scrollerInner.children)
    // 复制滚动内容以创建无限滚动效果
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      duplicatedItem.setAttribute('aria-hidden', true)
      scrollerInner.appendChild(duplicatedItem)
    })
  })
}

const FriendshipData = ref([
  {
    link: 'https://blog.zhheo.com/',
    imgUrl: 'https://bu.dusays.com/2022/12/28/63ac2812183aa.png',
    nickName: '张洪Heo',
    introduce: '分享设计与科技生活',
  },
  {
    link: 'https://www.isolitude.cn/',
    imgUrl:
      'https://cravatar.cn/avatar/924916294598a950bb80d78012dc3aac?s=100&r=G&d=https://pic.isolitude.cn/2022/01/28/75a6d779e1bc8.png',
    nickName: 'Leo',
    introduce: '是谁说生活生来就要活。',
  },
  {
    link: 'https://xiaoger.top',
    imgUrl: 'https://image.xiaoger.top/xiaoger/config/xiaoger.jpg',
    nickName: 'xiaoger',
    introduce: '个人学习和分享壁纸的博客',
  },
  {
    link: 'https://blog.kobal.top/',
    imgUrl:
      'https://gcore.jsdelivr.net/gh/kebuAAA/Picloud@main/img/avatar.webp',
    nickName: '爱编程的小明',
    introduce: '不要温和地走进那个良夜',
  },
  {
    link: 'https://blog.hikki.site',
    imgUrl: 'https://bu.dusays.com/2022/11/04/636511250b21b.jpg',
    nickName: '小码同学',
    introduce: '喜欢的东西就努力去追求，万一成功了呢!',
  },
  {
    link: 'https://likepoems.com',
    imgUrl: 'https://likepoems.com/wp-content/uploads/2021/01/favicon.jpg',
    nickName: '如诗',
    introduce: '学习笔记',
  },
  {
    link: 'https://www.oldit.cn',
    imgUrl: 'https://image.oldit.cn/image/author.webp',
    nickName: '老生杂谈的IT人',
    introduce: '老生杂谈，后继有人。',
  },
])

const shuffledFriendshipData = ref([])

// 随机展示友链顺序方法
const shuffleArray = (array) => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

const refresh = () => {
  shuffledFriendshipData.value = shuffleArray(FriendshipData.value)
}

const notification = ref('')
const copyToClipboard = () => {
  const textToCopy =
    'link: https://xzmblog.onrender.com/\nname: 前端日记\navatar: https://i.miji.bid/2023/08/09/eb59257ffc307103e5907a09eb10cefb.md.webp\ndescr: 前端切图仔一枚'
  const el = document.createElement('textarea')
  el.value = textToCopy
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  notification.value.show({
    message: '复制成功',
    duration: 3000,
    type: 'success',
  })
}
</script>
<style lang="scss" scoped>
.out_scroll {
  cursor: pointer; /* 添加鼠标指针样式 */
  font-size: 1.125rem;
  margin: 0.5rem 1rem;
}

.tag-list {
  margin: 0;
  padding-inline: 0;
  list-style: none;
}

.tag-list li {
  color: hsl(0, 0%, 100%);
  padding: 1rem;
  background: hsl(215, 25%, 27%);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 0.2rem -0.25rem #e2e7f1;
}

.scroller__inner {
  padding-block: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  img {
    width: 5rem;
    border-radius: 1.1rem;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  }
}

.scroller[data-animated='true'] {
  overflow: hidden;
}

.scroller[data-animated='true'] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll var(--_animation-duration, 40s)
    var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-direction='right'] {
  --_animation-direction: reverse;
}

.scroller[data-direction='left'] {
  --_animation-direction: forwards;
}

.scroller[data-speed='fast'] {
  --_animation-duration: 20s;
}

.scroller[data-speed='slow'] {
  --_animation-duration: 60s;
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 0.5rem));
  }
}
.position_refresh {
  color: #409eff;
  font-size: 0.8rem;
  width: 100%;
  display: flex;
  cursor: pointer;
}
.shuffle-enter-active,
.shuffle-leave-active {
  transition: transform 1.5s ease-in-out;
}

.shuffle-enter, .shuffle-leave-to /* .shuffle-leave-active 在Vue 3中被命名为 .shuffle-leave-to */ {
  transform: translate(0);
}

.friend_ship {
  max-width: 100%;
  overflow-x: hidden;
  blockquote {
    color: #666;
    background-color: #f4f4f5;
    border-left: 0.5rem solid var(--vp-c-brand);
    padding: 1rem 0.1rem 1rem;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.25rem;
  }
  .friend-info {
    margin: 1rem 0.5rem;
    padding: 1rem;
    box-shadow: 0 0.2rem 0.5rem 0 rgba(144, 164, 174, 0.4);
    border-radius: 0.5rem;
  }
  .copy-section {
    display: flex;
    .copy-btn {
      font-size: 0.8rem;
      color: #3a8ee6;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .copy-btn:hover {
      color: #409eff;
    }
  }
  .copy-content {
    display: flex;
    flex-direction: column;
    align-items: left;
    p {
      margin: 0;
      line-height: 1.5;
      span {
        color: #88b119;
      }
    }
    img {
      max-width: 100%;
      height: auto;
      margin-top: 1rem;
    }
  }
  .Friendship {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 0 10px;
    justify-content: space-between;
    align-items: center;
  }
  .Friendship .ships {
    box-shadow: rgb(0 0 0 / 20%) 0 0 4px 0;
    text-decoration: none;
    background: white;
    width: 48%;
    margin-bottom: 1rem;
    padding: 1rem 0;
    border-radius: 4px;
    color: #666;
    position: relative;
    top: 0;
    display: flex;
    align-items: center;
    border: 1px solid var(--border-color);
    transition: all 0.2s;
  }
  .Friendship .ships:hover {
    top: -2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  .Friendship .img-div {
    min-width: 4rem;
    height: 4rem;
    margin: 0 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
  }
  .Friendship .img-div:hover {
    transform: rotate(360deg);
  }
  .introduce {
    flex: 1;
  }
  .introduce p {
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: var(--text-color);
  }
  .nickName {
    font-weight: bold;
    font-size: 1rem;
    color: var(--title-color);
  }
  .discript {
    font-size: 0.8rem;
    width: 13rem;
  }
  @media screen and (max-width: 900px) {
    .Friendship {
      flex-direction: column;
      align-items: center;
      padding: 0.5rem 0;
    }
    .Friendship .ships {
      width: 94%;
    }
    .friend-info {
      margin: 1rem 0.5rem;
    }
    .copy-section {
      flex-direction: column;
      align-items: left;
      .copy-btn {
        text-align: center;
        margin-top: 1rem;
      }
    }
  }
}
</style>