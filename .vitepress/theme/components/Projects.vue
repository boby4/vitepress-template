<template>
  <div class="projects-page">
    <div class="projects-header">
      <h1 class="projects-title">项目作品集</h1>
      <p class="projects-subtitle">AI 驱动的产品与实验</p>
    </div>

    <div class="projects-grid">
      <div class="project-card" v-for="p in projects" :key="p.title">
        <div class="card-header">
          <h3 class="card-name">{{ p.title }}</h3>
          <div class="card-status" :class="p.status">{{ p.status }}</div>
        </div>
        <p class="card-desc">{{ p.description }}</p>
        <div class="card-tech">
          <span class="tech-tag" v-for="t in p.techStack" :key="t">{{ t }}</span>
        </div>
        <div class="card-links">
          <a :href="p.github" target="_blank" class="card-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a v-if="p.demo" :href="p.demo" target="_blank" class="card-link demo-link">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            在线体验
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    title: '数字宠物养成系统',
    description: '"会饿、会困、会成长"的网页电子宠物系统，基于 React + TypeScript + Vite 构建。',
    techStack: ['React', 'TypeScript', 'Vite'],
    github: 'https://github.com/boby4/digitalpet',
    demo: 'https://digitalpet-wine.vercel.app',
    status: 'Online'
  },
  {
    title: '可视化流程编辑器',
    description: '画布拖拽 + 连线 + 配置面板，快速搭建「触发器→步骤」工作流。',
    techStack: ['Vue 3', 'TypeScript', 'Vue Flow'],
    github: 'https://github.com/boby4/vue-flow-editor',
    demo: 'https://vue-flow-editor.vercel.app',
    status: 'Online'
  },
  {
    title: '情绪可视化日记系统',
    description: '选择情绪 + 强度，Canvas 实时生成动态视觉画布。',
    techStack: ['TypeScript', 'Canvas API'],
    github: 'https://github.com/boby4/mood-canvas',
    demo: 'https://mood-canvas-delta.vercel.app',
    status: 'Online'
  },
  {
    title: 'AI 对话数字人助手',
    description: '一个可以和用户对话的 AI 动画角色项目。',
    techStack: ['Vue', 'TypeScript'],
    github: 'https://github.com/boby4/ai-talking-avatar',
    demo: 'https://ai-talking-avatar-alpha.vercel.app',
    status: 'Online'
  }
]
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: #0a0a0a;
  padding: 100px 24px 80px;
}

.projects-header {
  text-align: center;
  margin-bottom: 56px;
}

.projects-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}

.projects-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  max-width: 960px;
  margin: 0 auto;
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 28px;
  transition: all 0.2s ease;
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(139, 92, 246, 0.2);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.card-status {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 10px;
  background: rgba(34, 197, 94, 0.12);
  color: #22c55e;
  letter-spacing: 0.03em;
}

.card-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  margin: 0 0 16px;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.tech-tag {
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.card-links {
  display: flex;
  gap: 14px;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.15s;
}

.card-link:hover {
  color: #8b5cf6;
}

.demo-link {
  color: rgba(255, 255, 255, 0.35);
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .projects-title {
    font-size: 32px;
  }
}
</style>
