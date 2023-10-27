<template>
  <div v-for="(post, indexs) in datas" :key="indexs">
    <a
      class="blog-card"
      :class="{ alt: indexs % 2 === 1 }"
      :href="withBase(post.regularPath)"
    >
      <div class="meta">
        <img class="photo" v-lazy="randomImage()" alt="" />
        <ul class="details">
          <li class="author"><a href="#">前端日记</a></li>
          <li class="date">{{ post.frontMatter.date }}</li>
          <li class="tags">
            <ul>
              <li v-for="(tags, keys) in post.frontMatter.tags" :key="keys">
                <a :href="withBase(`/pages/tags?tag=${tags}`)">{{ tags }} </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="description">
        <h1>{{ post.frontMatter.title }}</h1>
        <h2>Opening a door to the future</h2>
        <p class="dis_content">{{ post.frontMatter.description }}</p>
        <p class="read_more">
          <a :href="withBase(post.regularPath)">Read More</a>
        </p>
      </div>
    </a>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { randomImage } from '../../utils/functions'
const props = defineProps({
  datas: Array,
})

const toDetail = (path) => {
  withBase(path)
}
</script>
<style lang="scss" scoped>
@import url('https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css');
// @import url(https://fonts.googleapis.com/css?family=Raleway:400,900);
// @import url(https://fonts.googleapis.com/css?family=Roboto:400,900);
/*PEN STYLES*/

$color_white: #fff;
$color_prime: #5d80f4;
$color_grey: #e2e2e2;
$color_grey_dark: #a2a2a2;
$color_dark: rgba(60, 60, 67, 0.92);

.blog-card {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  margin: 0.5rem auto;
  box-shadow: 0 3px 4px -1px rgba(#000, 0.2);
  margin-bottom: 1.6%;
  background: $color_white;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 3px;
  overflow: hidden;
  z-index: 0;
  a {
    color: inherit;
    &:hover {
      color: $color_prime;
    }
  }
  &:hover {
    .photo {
      transform: scale(1.3) rotate(3deg);
    }
  }
  .meta {
    position: relative;
    z-index: 0;
    height: 200px;
  }
  .photo {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
    transition: transform 0.2s;
  }
  .details,
  .details ul {
    margin: auto;
    padding: 0;
    list-style: none;
  }

  .details {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    margin: auto;
    transition: left 0.2s;
    background: rgba(#000, 0.6);
    color: $color_white;
    padding: 10px;
    width: 100%;
    font-size: 0.9rem;
    a {
      text-decoration: dotted underline;
    }
    ul li {
      display: inline-block;
    }
    .author:before {
      font-family: FontAwesome;
      margin-right: 10px;
      content: '\f007';
    }
    .date {
      color: $color_white;
      width: 120px;
    }
    .date:before {
      font-family: FontAwesome;
      margin-right: 10px;
      content: '\f133';
    }
    .tags {
      ul:before {
        font-family: FontAwesome;
        content: '\f02b';
        margin-right: 10px;
      }
      li {
        margin-right: 2px;
        &:first-child {
          margin-left: -4px;
        }
      }
    }
  }
  .description {
    padding: 0.7rem;
    border-top: 1px solid rgb(238, 238, 238, 0.5);
    background: $color_white;
    position: relative;
    width: 820px;
    height: 180px;
    z-index: 1;
    h1,
    h2 {
      font-family: Poppins, sans-serif;
      color: $color_dark;
    }
    h1 {
      line-height: 1;
      margin: 4px 0 0;
      font-size: 1.1rem;
    }
    h2 {
      font-size: 0.8rem;
      font-weight: 300;
      text-transform: uppercase;
      color: $color_grey_dark;
      margin-top: 3px;
    }
    .read_more {
      text-align: right;
      padding-right: 5px;
      a {
        color: $color_prime;
        display: inline-block;
        position: relative;
        &:after {
          content: '\f061';
          font-family: FontAwesome;
          margin-left: -10px;
          opacity: 0;
          vertical-align: middle;
          transition: margin 0.3s, opacity 0.3s;
        }
        &:hover:after {
          margin-left: 5px;
          opacity: 1;
        }
      }
    }
  }
  .dis_content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 0.5rem;
    font-size: 0.9rem;
    height: 4.5rem;
    &:before {
      content: '';
      position: absolute;
      height: 5px;
      background: $color_prime;
      width: 35px;
      top: 0;
      border-radius: 3px;
    }
  }
  p {
    color: $color_dark;
    position: relative;
    margin: 0.5rem 0 0;
  }
  &:hover {
    .details {
      left: 0%;
    }
  }

  @media screen and (max-width: 640px) {
    .meta {
      height: 0;
    }
    .description {
      width: 100%;
      height: 100%;
      h1 h2 p {
        margin: 5px 0 0 5px;
      }
    }
  }

  @media screen and (min-width: 640px) {
    flex-direction: row;
    .meta {
      flex-basis: 40%;
      height: auto;
    }
    .description {
      flex-basis: 60%;
      &:before {
        transform: skewX(-3deg);
        content: '';
        background: #fff;
        width: 30px;
        position: absolute;
        left: -10px;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
    }
    &.alt {
      flex-direction: row-reverse;
      .description {
        &:before {
          left: inherit;
          right: -10px;
          transform: skew(3deg);
        }
      }
      .details {
        padding-left: 25px;
      }
    }
  }
}
</style>
