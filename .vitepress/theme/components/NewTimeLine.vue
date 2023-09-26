<template>
  <section id="timeline" class="dynamic-items">
    <div class="demo-card-wrapper">
      <a
        v-for="(card, index) in displayedData"
        :key="index"
        :class="`demo-card demo-card--step${index + 1}`"
        :href="withBase(card.regularPath)"
      >
        <div class="head">
          <div class="number-box">
            <span>{{ padNumber(index + 1) }}</span>
          </div>
          <h2>
            <span class="small">{{ card.frontMatter.date }}</span
            >{{ card.frontMatter.title }}
          </h2>
        </div>
        <div class="body">
          <p>{{ card.frontMatter.description }}</p>
          <img :src="randomImage()" alt="Graphic" />
        </div>
      </a>
      <div v-for="n in emptyCardCount" :key="`empty_${n}`" class="demo-card demo-card-placeholder"></div>
    </div>
  </section>
  <Pagination
    :currentPage="currentPage"
    :totalPages="totalPages"
    @pageChange="handlePageChange"
    :visiblePageCount="5"
  />
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress'
import { computed, ref } from 'vue'
import { useYearSort, randomImage } from '../../utils/functions'

const padNumber = (number: any) => {
  return number < 10 ? `0${number}` : number
}

const { theme } = useData()
const data = computed(() => theme.value.posts)
const currentPage = ref(1);

const handlePageChange = (newPage:number) => {
  currentPage.value = newPage;
  // 根据新的页码加载数据等操作
};

const itemsPerPage = 5;
const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage));

const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.value.slice(startIndex, endIndex);
});

const emptyCardCount = computed(() => {
  // 计算第二页需要的占位元素数量
  const remainingCards = itemsPerPage - displayedData.value.length;
  return remainingCards > 0 ? remainingCards : 0;
});
</script>
<style lang="scss">
// @import url(https://fonts.googleapis.com/css?family=Raleway:400,900);
@import url(https://fonts.googleapis.com/css?family=Roboto:400,900);

/* 添加占位元素的样式 */
.demo-card-placeholder {
  display: block;
  margin: 10px auto 80px;
  max-width: 94%;
  height: 400px; /* 与正常卡片高度一致 */
  box-shadow: none !important; /* 取消阴影 */
}

.cd-container {
  width: 100%;
  margin: 0 auto;
  border-radius: 2px;
  height: 100%;
  font-family: 'Raleway', sans-serif;
}
.cd-container::after {
  content: '';
  display: table;
  clear: both;
}

/* Media Queries */
@mixin mq-xs {
  @media (min-width: 320px) {
    @content;
  }
}

@mixin mq-sm {
  @media (min-width: 480px) {
    @content;
  }
}

@mixin mq-md {
  @media (min-width: 720px) {
    @content;
  }
}

@mixin mq-lg {
  @media (min-width: 1000px) {
    @content;
    #timeline .demo-card-wrapper {
      left: -30%;
    }
  }
}

$background: #f7f7f7;
$box-shadow: 0px 1px 22px 4px rgba(0, 0, 0, 0.07);
$border: 1px solid rgba(191, 191, 191, 0.4);
$items: 5;
$rows: ceil($items / 2);


/* Card sizing */

$card-height: 400px;
$card-width: 450px;
$inner-margin: 15px;
$number-size: 35px;
$stagger: 180px;
$outer-margin: 90px;
$marker-size: 9px;

/* Colors */

$steps: #46b8e9;
$colors: #46b8e9, #3ee9d1, #ce43eb, #4d92eb;
$timeline: #bdbdbd;

/* Calculations */

$container-height: $rows * ($card-height + $outer-margin) + $stagger;
$container-width: $card-width * 2 + $outer-margin * 3;
$head-height: $number-size + 50;
$body-height: $card-height - $head-height;
$marker-dist: $card-width + $outer-margin/2 - $marker-size/2;

/* Placeholders */
@include mq-lg {
  %arrow {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
  %marker {
    position: absolute;
    content: '';
    width: $marker-size;
    height: $marker-size;
    background-color: $timeline;
    border-radius: $marker-size;
    box-shadow: 0px 0px 2px 8px $background;
  }
}

/* Some Cool Stuff */

$counter: $items - $rows + 2;
@for $i from 1 through $rows {
  .demo-card:nth-child(#{$i*2-1}) {
    order: $i;
  }
  .demo-card:nth-child(#{$i*2}) {
    order: $counter;
  }
  $counter: $counter + 1;
}

#timeline {
  font-family: Roboto;
  padding: 10px 0;
  // 循环生成后续卡片样式类
  @for $i from 4 through $items {
    .demo-card--step#{$i + 1} {
      @extend .demo-card--step#{$i - 3};
    }
  }
  h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 200;
    margin-bottom: 20px;
  }
  p.leader {
    text-align: center;
    max-width: 90%;
    margin: auto;
    margin-bottom: 45px;
  }
  .demo-card-wrapper {
    position: relative;
    margin: auto;
    @include mq-lg {
      display: flex;
      flex-flow: column wrap;
      width: $container-width;
      height: $container-height;
      margin: 0 auto;
    }
    &::after {
      z-index: 1;
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      border-left: $border;
      @include mq-lg {
        border-left: 1px solid $timeline;
      }
    }
  }
  .demo-card {
    position: relative;
    display: block;
    margin: 10px auto 80px;
    max-width: 94%;
    z-index: 2;
    @include mq-sm {
      max-width: 60%;
      box-shadow: $box-shadow;
    }
    @include mq-md {
      max-width: 40%;
    }
    @include mq-lg {
      max-width: $card-width;
      height: $card-height;
      margin: $outer-margin;
      margin-top: $outer-margin/2;
      margin-bottom: $outer-margin/2;
      &:nth-child(odd) {
        margin-right: $outer-margin/2;
        .head::after {
          @extend %arrow;
          border-left-width: 15px;
          border-left-style: solid;
          left: 100%;
        }
        .head::before {
          @extend %marker;
          left: $marker-dist + 1;
        }
      }
      &:nth-child(even) {
        margin-left: $outer-margin/2;
        .head::after {
          @extend %arrow;
          border-right-width: 15px;
          border-right-style: solid;
          right: 100%;
        }
        .head::before {
          @extend %marker;
          right: $marker-dist - 1;
        }
      }
      &:nth-child(2) {
        margin-top: $stagger;
      }
    }
    .head {
      position: relative;
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: 400;
      .number-box {
        display: inline;
        float: left;
        margin: $inner-margin;
        padding: 10px;
        font-size: $number-size;
        line-height: $number-size;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.17);
      }
      h2 {
        text-transform: uppercase;
        font-size: 1.1rem;
        font-weight: inherit;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        letter-spacing: 2px;
        border-top: none;
        margin: 0;
        padding-top: 3px;
        padding-bottom: 6px;
        line-height: 1.4rem;
        @include mq-sm {
          font-size: 110%;
          line-height: 1.4rem;
        }
        span {
          display: block;
          font-size: 0.6rem;
          margin: 0;
          @include mq-sm {
            font-size: 0.8rem;
          }
        }
      }
    }
    .body {
      background: #fff;
      border: $border;
      border-top: 0;
      padding: 1px 15px;
      @include mq-lg {
        height: $body-height;
      }
      p {
        font-size: 14px;
        line-height: 18px;
        text-indent: 2em;
        display: -webkit-box; /* 使用弹性盒子布局模型 */
        -webkit-line-clamp: 3; /* 最大行数为3 */
        -webkit-box-orient: vertical; /* 垂直方向排列 */
        overflow: hidden;
        margin-bottom: $inner-margin;
      }
      img {
        display: block;
        width: 100%;
        height: 210px;
        object-fit: cover; /* 保持纵横比，裁剪多余部分 */
      }
    }
    @for $i from 1 through $items {
      &--step#{$i} {
        $color: nth($colors, ((($i - 1) % 4) + 1));
        background-color: $color;
        .head::after {
          border-color: $color;
        }
      }
    }
  }
}
</style>
