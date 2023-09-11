<template>
  <h3>友情链接</h3>
  <blockquote>
    🔗友情链接。在评论里给出你的名称，网址，一小段描述，一张头像即可。
  </blockquote>
  <div class="Friendship">
    <a
      :href="item.link"
      v-for="(item, index) in FriendshipData"
      :key="index + item.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <!-- <img :src="item.imgUrl" > -->
      <div
        class="img-div"
        :style="{
          background:
            'url(' + item.imgUrl + ') center center / cover no-repeat',
        }"
      ></div>
      <div class="introduce">
        <p class="nickName">{{ item.nickName }}</p>
        <p class="discript">{{ item.introduce }}</p>
      </div>
    </a>
  </div>
  <Comment />
</template>

<script>
export default {
  data() {
    return {
      FriendshipData: [],
    }
  },
  mounted() {
    this.FriendshipData = [
      {
        link: 'https://blog.zhheo.com/',
        imgUrl: 'https://bu.dusays.com/2022/12/28/63ac2812183aa.png',
        nickName: '张洪Heo',
        introduce: '分享设计与科技生活',
      },
      {
        link: 'https://liuyuyang.net/',
        imgUrl: 'https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640',
        nickName: '宇阳',
        introduce: '互联网从不缺乏天才，而努力才是最终的入场券！',
      },
      {
        link: 'https://www.isolitude.cn/',
        imgUrl: 'https://cravatar.cn/avatar/924916294598a950bb80d78012dc3aac?s=100&r=G&d=https://pic.isolitude.cn/2022/01/28/75a6d779e1bc8.png',
        nickName: 'Leo',
        introduce: '是谁说生活生来就要活。',
      },
      {
        link: 'https://xiaoger.top',
        imgUrl: 'https://image.xiaoger.top/xiaoger/config/xiaoger.jpg',
        nickName: 'xiaoger',
        introduce: '个人学习和分享壁纸的博客',
      },
    ]
  },
}
</script>
<style scoped>
blockquote {
  position: relative;
  color: #666;
  background-color: #f4f4f5;
  border-left: 0.5rem solid var(--vp-c-brand);
  padding: 1rem 0.1rem 1rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.25rem;
}
.Friendship {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
}
.Friendship a {
  box-shadow: rgb(0 0 0 / 20%) 0 0 4px 0;
  text-decoration: none;
  display: block;
  background: white;
  width: 21rem;
  margin-bottom: 1rem;
  padding: .8rem 0;
  border-radius: 4px;
  color: #666;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  position: relative;
  top: 0;
  transition: all 0.2s;
}
.Friendship a:hover {
  top: -2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.Friendship .img-div {
  min-width: 60px;
  height: 60px;
  margin: 0 10px;
  border-radius: 50%;
  cursor: pointer;
}
.introduce {
  flex: 1;
}
.introduce p {
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
  width: 18em;
  color: var(--text-color);
}
.nickName {
  font-weight: 550;
  font-size: 17px;
  color: var(--title-color);
}
.discript{
  font-size: 13px;
}
</style>