<template>
  <div class="tag_contain">
    <h2>TAGS</h2>
    <div class="tags">
      <span
        @click="toggleTag(key)"
        v-for="(item, key) in data"
        class="tag"
        :key="key"
        >#{{ key }} <span style="color: #666">{{ data[key].length }}</span>
      </span>
    </div>

    <div class="tag_post" v-for="(article, index) in posts" :key="index" :id="article.selectTag">
      <div class="tag-header" v-if="article.selectTag">
        「{{ article.selectTag }}」
      </div>
      <a
        v-for="(items, keys) in article.item"
        :key="keys"
        :href="withBase(items.regularPath)"
        class="posts"
      >
        <div class="post-container">
          <div class="post-dot"></div>
          {{ items.title }}
        </div>
        <div class="date">{{ items.date }}</div>
      </a>
    </div>

  </div>
</template>
<script setup>
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { useData, withBase } from 'vitepress'
import { initTagsParams, initTags } from '../../utils/functions'
onMounted(() => {
  nextTick(() => {
    let url = ref(window.location.search)
    let params = new URLSearchParams(url.value)
    console.log(params.get('tag'))
    if (params.get('tag')) {
      toggleTag(params.get('tag'))
    }
  })
})

const { theme } = useData()
const data = computed(() => initTags(theme.value.posts))
const posts = computed(() => initTagsParams(theme.value.posts))
const toggleTag = (tag) => {
  const element = document.getElementById(tag);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style scoped>
h2{
  font-size: 2.5rem;
  margin-bottom: 60px;
  text-align: center;
  border-top: none;
}
.tag_post{
  padding: 30px 0;
  background-color: #fff;
  border: 1px solid #e7eaf1;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0 2px 3px rgba(0, 37, 55, 0.1);
  margin-bottom: 15px;
}
.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 20px;
  background-color: #fff;
  border: 1px solid #e7eaf1;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0 2px 3px rgba(0, 37, 55, 0.1);
  margin-bottom: 30px;
}
.tag {
  display: inline-block;
  width: auto;
  /* padding: 4px 8px; */
  margin: 4px;
  padding: 4px;
  font-size: 14px;
  color: #a6abb2;
  line-height: 22px;
  box-sizing: border-box;
  font-family: -apple-system, Verdana, pingfang sc, helvetica neue, arial,
    hiragino sans gb, microsoft yahei, wenquanyi micro hei, sans-serif;
  border-radius: 2px;
  background-color: #fafafa;
  cursor: pointer;
  margin-right: 10px;
  transition: 0.2s;
  margin-bottom: 10px;
}
.tag:hover {
  transition: 0.3s;
  color: #a1a1a1;
}
.tag-header {
  display: block;
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .tag-header {
    font-size: 1rem;
  }
  .date {
    font-size: 0.7rem;
    width: 150px;
  }
}
</style>
