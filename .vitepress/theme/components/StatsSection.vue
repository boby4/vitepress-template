<template>
  <section class="stats-section">
    <div class="stats-grid">
      <div class="stat-item" v-for="stat in stats" :key="stat.label">
        <span class="stat-value">
          <span v-if="stat.loading" class="stat-loading">...</span>
          <span v-else>{{ stat.value }}</span>
        </span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()

const stats = ref([
  { label: 'Articles', value: 0, loading: true },
  { label: 'Projects', value: 5, loading: false },
  { label: 'GitHub Stars', value: 0, loading: true },
  { label: 'Visitors', value: 0, loading: true }
])

onMounted(async () => {
  // Article count from theme data
  const posts = theme.value.posts
  if (posts && Array.isArray(posts)) {
    stats.value[0].value = posts.length
    stats.value[0].loading = false
  }

  // Fetch GitHub stars
  try {
    const res = await fetch('https://api.github.com/users/boby4/repos?per_page=100')
    const repos = await res.json()
    if (Array.isArray(repos)) {
      const nonForkRepos = repos.filter(r => !r.fork)
      const totalStars = nonForkRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      stats.value[2].value = totalStars
    }
  } catch {
    stats.value[2].value = '--'
  }
  stats.value[2].loading = false

  // Visitors
  stats.value[3].value = '58,000+'
  stats.value[3].loading = false
})
</script>

<style scoped>
.stats-section {
  padding: 60px 40px;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 60px;
  max-width: 900px;
  margin: 0 auto;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-value {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-loading {
  color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 640px) {
  .stats-grid {
    flex-wrap: wrap;
    gap: 30px;
  }

  .stat-value {
    font-size: 28px;
  }
}
</style>
