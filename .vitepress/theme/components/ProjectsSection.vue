<template>
  <section class="projects-section">
    <h2 class="section-title">
      <span class="section-icon">✦</span>
      Featured Projects
    </h2>

    <div class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </div>

    <div class="section-more">
      <a href="/pages/projects" class="more-link">View All Projects →</a>
    </div>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

const projects = [
  {
    title: '数字宠物养成系统',
    description: '"会饿、会困、会成长"的网页电子宠物系统',
    techStack: ['React', 'TypeScript', 'Vite'],
    github: 'https://github.com/boby4/digitalpet',
    demo: 'https://digitalpet-wine.vercel.app',
    status: 'Online'
  },
  {
    title: '可视化流程编辑器',
    description: '画布拖拽 + 连线 + 配置面板，快速搭建「触发器→步骤」工作流',
    techStack: ['Vue 3', 'TypeScript', 'Vue Flow'],
    github: 'https://github.com/boby4/vue-flow-editor',
    demo: 'https://vue-flow-editor.vercel.app',
    status: 'Online'
  },
  {
    title: '情绪可视化日记系统',
    description: '选择情绪 + 强度，Canvas 实时生成动态视觉画布',
    techStack: ['TypeScript', 'Canvas API'],
    github: 'https://github.com/boby4/mood-canvas',
    demo: 'https://mood-canvas-delta.vercel.app',
    status: 'Online'
  },
  {
    title: 'AI 对话数字人助手',
    description: '一个可以和用户对话的 AI 动画角色项目',
    techStack: ['Vue', 'TypeScript'],
    github: 'https://github.com/boby4/ai-talking-avatar',
    demo: 'https://ai-talking-avatar-alpha.vercel.app',
    status: 'Online'
  }
]
</script>

<style scoped>
.projects-section {
  padding: 80px 40px;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  text-align: center;
  margin: 0 0 48px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
}

.section-icon {
  display: inline-block;
  margin-right: 8px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.section-more {
  text-align: center;
  margin-top: 36px;
}

.more-link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.15s;
}

.more-link:hover {
  color: #8b5cf6;
}

@media (max-width: 700px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
