<template>
  <article class="project-card" :class="`status-${project.status.toLowerCase()}`">
    <div class="card-header">
      <div class="card-dot" :class="project.status.toLowerCase()"></div>
      <span class="card-status">{{ statusLabel }}</span>
    </div>

    <h3 class="card-title">{{ project.title }}</h3>
    <p class="card-desc">{{ project.description }}</p>

    <div class="card-tags">
      <span class="card-tag" v-for="tech in project.techStack" :key="tech">{{ tech }}</span>
    </div>

    <div class="card-links">
      <a :href="project.github" target="_blank" class="card-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        GitHub
      </a>
      <a v-if="project.demo" :href="project.demo" target="_blank" class="card-link card-link-demo">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Demo
      </a>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true }
})

const statusLabel = computed(() => {
  const map = { online: 'Online', building: 'Building', archived: 'Archived' }
  return map[props.project.status.toLowerCase()] || props.project.status
})
</script>

<style scoped>
.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.04);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.card-dot.online   { background: #22c55e; }
.card-dot.building { background: #f59e0b; }
.card-dot.archived { background: rgba(255,255,255,0.2); }

.card-status {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.card-title {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
}

.card-desc {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.6;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.card-links {
  display: flex;
  gap: 12px;
  padding-top: 4px;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.15s;
}

.card-link:hover {
  color: #8b5cf6;
}

.card-link-demo {
  color: rgba(255, 255, 255, 0.4);
}
</style>
