<template>
  <div class="blog-page">
    <div class="blog-header">
      <h1 class="blog-title">Blog</h1>
      <p class="blog-subtitle">技术思考与实践记录</p>
    </div>

    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.key"
        :class="['tab', { active: activeCategory === cat.key }]"
        @click="activeCategory = cat.key"
      >
        {{ cat.label }}
        <span class="tab-count">{{ getCount(cat.key) }}</span>
      </button>
    </div>

    <div class="post-list">
      <article
        v-for="post in filteredPosts"
        :key="post.regularPath"
        class="post-card"
        @click="navigateTo(post.regularPath)"
      >
        <div class="post-meta">
          <span class="post-date">{{ post.frontMatter.date }}</span>
          <span class="post-reading">{{ post.frontMatter.readingTime }} min read</span>
        </div>
        <h2 class="post-title">{{ post.frontMatter.title }}</h2>
        <p class="post-desc" v-if="post.frontMatter.description">
          {{ post.frontMatter.description }}
        </p>
        <div class="post-tags" v-if="post.frontMatter.tags">
          <span class="post-tag" v-for="tag in post.frontMatter.tags" :key="tag">
            {{ tag }}
          </span>
        </div>
      </article>

      <div v-if="filteredPosts.length === 0" class="empty">
        <p>暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { theme } = useData()

const activeCategory = ref('all')

const categories = [
  { key: 'all', label: '全部' },
  { key: 'ai', label: 'AI开发' },
  { key: 'frontend', label: '前端架构' },
  { key: 'engineering', label: '工程化' },
  { key: 'career', label: '职场成长' }
]

const posts = computed(() => {
  const raw = theme.value.posts || []
  return raw.map(p => ({
    ...p,
    frontMatter: {
      ...p.frontMatter,
      readingTime: p.frontMatter.readingTime || 1
    }
  }))
})

const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return posts.value
  return posts.value.filter(p => {
    const path = p.regularPath || ''
    return path.includes(`/posts/${activeCategory.value}/`)
  })
})

function getCount(key) {
  if (key === 'all') return posts.value.length
  return posts.value.filter(p => (p.regularPath || '').includes(`/posts/${key}/`)).length
}

function navigateTo(path) {
  window.location.href = withBase(path)
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: #0a0a0a;
  padding: 80px 24px;
}

.blog-header {
  text-align: center;
  margin-bottom: 48px;
}

.blog-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}

.blog-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.tab {
  padding: 8px 18px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.tab:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.tab.active {
  color: #fff;
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.tab-count {
  font-size: 12px;
  margin-left: 4px;
  opacity: 0.6;
}

.post-list {
  max-width: 720px;
  margin: 0 auto;
}

.post-card {
  padding: 20px 0;
  cursor: pointer;
  transition: padding 0.2s;
}

.post-card:hover {
  padding-left: 12px;
}

.post-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

.post-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px;
  line-height: 1.4;
}

.post-card:hover .post-title {
  color: #8b5cf6;
}

.post-desc {
  margin: 0 0 12px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

.post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.post-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
}

.empty {
  text-align: center;
  padding: 60px 0;
  color: rgba(255, 255, 255, 0.3);
  font-size: 15px;
}
</style>
