<template>
  <div class="marquee-wrap">
    <ul class="marquee-list" :class="{'animate-up': animateUp}">
      <li v-for="(item, index) in listData" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animateUp: false,
      listData: [
        {
          name: '120件/行政案件',
          type: 0,
        },
        {
          name: '150件/民事案件',
          type: 1,
        },
        {
          name: '110件/刑事案件',
          type: 2,
        },
        // Add more items as needed
      ],
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(this.scrollAnimate, 2000);
  },
  methods: {
    scrollAnimate() {
      this.animateUp = true;
      setTimeout(() => {
        this.listData.push(this.listData.shift());
        this.animateUp = false;
      }, 500);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.marquee-wrap {
  overflow: hidden;
  border-radius: .5rem;
  border: 1px solid #e0e3ed;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  max-width: 1180px;
  height: 50px;
  background: var(--zhsher-card-bg);
  overflow: hidden;
  margin: auto;
  margin-top: 20px;

  .marquee-list {
    margin: 0;
    padding: 0;

    li {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      list-style: none;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #919191;
      font-size: 18px;
      font-weight: 500;
    }
  }

  .animate-up {
    transition: all 1.5s ease-in-out;
    transform: translateY(-50px);
  }
}
</style>
