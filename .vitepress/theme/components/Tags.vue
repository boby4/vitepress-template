<template>
  <div class="tags">
    <span
      @click="toggleTag(key)"
      v-for="(item, key) in data"
      :class="key == selectTag ? 'tag_select' : 'tag'"
    >
      # {{ key }} <strong>{{ data[key].length }}</strong>
    </span>
  </div>
  <div class="tag-header">{{ selectTag }}</div>
  <a
    :href="withBase(article.regularPath)"
    v-for="(article, index) in data[selectTag]"
    :key="index"
    class="posts"
  >
    <div class="post-container">
      <div class="post-dot"></div>
      {{ article.frontMatter.title }}
    </div>
    <div class="date">{{ article.frontMatter.date }}</div>
  </a>
</template>
<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

import { useData, withBase } from 'vitepress'
import { initTags } from '../../utils/functions'
// let url = window.location?.href.split('?')[1]
const currentParam = ref('')
onMounted(() => {
  handleURLChange()
  // 添加 URL 变化事件监听
  window.addEventListener('popstate', handleURLChange)
})
onBeforeUnmount(() => {
  // 移除 URL 变化事件监听
  window.removeEventListener('popstate', handleURLChange)
})

const handleURLChange = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const newParam = searchParams.get('tag') || ''
  if (newParam !== currentParam.value) {
    // 参数发生变化，执行相应的操作
    console.log('Parameter changed:', newParam)
    currentParam.value = newParam
    toggleTag(currentParam.value)
  }
}

let url = ref(window.location.search)
let params = new URLSearchParams(url.value)
const { theme } = useData()
const data = computed(() => initTags(theme.value.posts))
let selectTag = ref(params.get('tag') ? params.get('tag') : '')
const toggleTag = (tag) => {
  selectTag.value = tag
}
</script>

<style scoped>
.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
}
.tag {
  display: inline-block;
  padding: 4px 16px;
  margin: 6px 8px;
  font-size: 0.7rem;
  line-height: 25px;
  font-weight: 600;
  border-radius: 2px;
  background-color: #efefef;
  transition: 0.4s;
  border-radius: 4px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.tag:hover {
  background-color: var(--vp-c-brand);
  transition: 0.4s;
  border-radius: 4px;
  color: rgb(255, 255, 255);
}
.tag_select {
  display: inline-block;
  padding: 4px 16px;
  margin: 6px 8px;
  border-radius: 2px;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 25px;
  background-color: var(--vp-c-brand);
  transition: 0.4s;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
.tag strong {
  color: var(--vp-c-brand);
}
.tag-header {
  font-size: 1rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .tag-header {
    font-size: 1rem;
  }
  .date {
    font-size: 0.7rem;
  }
}
</style>
