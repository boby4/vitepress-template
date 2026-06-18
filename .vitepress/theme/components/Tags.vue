<template>
  <div class="tag_contain">
    <h2>TAGS</h2>
    <div class="tags">
      <span
        @click="toggleTag(key)"
        v-for="(item, key) in data"
        class="tag"
        :key="key"
        >#{{ key }} <span class="tag-count">{{ data[key].length }}</span>
      </span>
    </div>

    <div
      class="tag_post"
      v-for="(article, index) in posts"
      :key="index"
      :id="article.selectTag"
    >
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
    if (params.get('tag')) {
      toggleTag(params.get('tag'))
    }
  })
})

const { theme } = useData()
const data = computed(() => initTags(theme.value.posts))
const posts = computed(() => initTagsParams(theme.value.posts))
const toggleTag = (tag) => {
  const element = document.getElementById(tag)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss">
.tag_contain {
  h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    text-align: center;
    border-top: none;
    color: #fff;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .tag-count {
    color: rgba(255, 255, 255, 0.35);
    font-size: 12px;
    margin-left: 2px;
  }
  .tag_post {
    padding: 30px 0;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    box-sizing: border-box;
    margin-bottom: 15px;
  }
  .tags {
    margin-top: 14px;
    display: flex;
    flex-wrap: wrap;
    padding: 24px 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  .tag {
    display: inline-block;
    width: auto;
    margin: 4px;
    padding: 4px 10px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.55);
    line-height: 22px;
    box-sizing: border-box;
    font-family: 'Inter', system-ui, sans-serif;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    cursor: pointer;
    margin-right: 10px;
    transition: 0.2s;
    margin-bottom: 10px;
  }
  .tag:hover {
    color: #fff;
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
  .tag-header {
    display: block;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    .tag-header {
      font-size: 1rem;
    }
  }
}
</style>
