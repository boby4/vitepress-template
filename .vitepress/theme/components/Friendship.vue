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
        link: 'https://xzmhome.onrender.com/',
        imgUrl:
          'https://i.miji.bid/2023/08/09/382e790cbf2d7cc657be71440e033347.jpeg',
        nickName: '小徐',
        introduce: '95后青年，前端切图仔一枚, 一个It技术的探索路上的小学生',
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
}
.Friendship a {
  box-shadow: rgb(0 0 0 / 20%) 0 0 4px 0;
  text-decoration: none;
  display: block;
  background: white;
  width: 320px;
  margin: 10px 0;
  padding: 10px 0;
  border-radius: 6px;
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