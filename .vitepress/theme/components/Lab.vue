<template>
  <div class="lab-page">
    <div class="lab-header">
      <h1 class="lab-title">AI Lab</h1>
      <p class="lab-subtitle">实验记录中心 — 探索 AI 的边界</p>
    </div>

    <div class="lab-timeline">
      <div class="timeline-line"></div>
      <div
        v-for="exp in experiments"
        :key="exp.id"
        class="timeline-item"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="exp-header">
            <span class="exp-number">{{ exp.id }}</span>
            <span class="exp-date">{{ exp.date }}</span>
            <span class="exp-category">{{ exp.category }}</span>
          </div>
          <h3 class="exp-title">{{ exp.title }}</h3>
          <p class="exp-summary">{{ exp.summary }}</p>
          <div class="exp-tags">
            <span v-for="tag in exp.tags" :key="tag" class="exp-tag">{{ tag }}</span>
          </div>
          <a v-if="exp.link" :href="exp.link" class="exp-link">查看详情 →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const experiments = [
  {
    id: 'Experiment 001',
    title: 'Cursor 工作流',
    date: '2025-06',
    category: 'Workflow',
    summary: '记录使用 Cursor 进行 AI 辅助开发的完整工作流，涵盖 prompt 模板、代码审查、自动化重构等实战经验。',
    tags: ['Cursor', 'IDE', '效率'],
    link: '/posts/ai/cursor-workflow'
  },
  {
    id: 'Experiment 002',
    title: 'Claude Code 开发规范',
    date: '2025-05',
    category: 'Agent',
    summary: '制定并实践 Claude Code 的开发规范，包括项目结构约定、代码风格指南、AI 协作最佳实践。',
    tags: ['Claude', '规范', '协作'],
    link: '/posts/ai/claude-code-standard'
  },
  {
    id: 'Experiment 003',
    title: 'AI 自动生成后台系统',
    date: '2025-04',
    category: 'Automation',
    summary: '探索用 AI 从 PRD 文档自动生成完整后台管理系统的可行性，包括数据建模、API 生成、前端页面搭建。',
    tags: ['后台管理', '自动化', 'MVP'],
    link: null
  },
  {
    id: 'Experiment 004',
    title: 'AI 产品 MVP 实践',
    date: '2025-03',
    category: 'Prompt',
    summary: '从零到一使用 AI 构建产品 MVP 的全流程实践，总结 prompt 工程在真实产品开发中的应用模式。',
    tags: ['MVP', 'Prompt', '产品'],
    link: null
  }
]
</script>

<style scoped>
.lab-page {
  min-height: 100vh;
  background: #0a0a0a;
  padding: 80px 24px;
}

.lab-header {
  text-align: center;
  margin-bottom: 60px;
}

.lab-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}

.lab-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.lab-timeline {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}

.timeline-line {
  position: absolute;
  left: 11px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.08);
}

.timeline-item {
  position: relative;
  padding-left: 40px;
  padding-bottom: 48px;
}

.timeline-dot {
  position: absolute;
  left: 6px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 2px solid rgba(139, 92, 246, 0.4);
}

.timeline-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.2s;
}

.timeline-content:hover {
  border-color: rgba(139, 92, 246, 0.2);
}

.exp-header {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  font-size: 12px;
}

.exp-number {
  color: rgba(139, 92, 246, 0.7);
  font-weight: 600;
}

.exp-date {
  color: rgba(255, 255, 255, 0.35);
}

.exp-category {
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  padding: 1px 8px;
  border-radius: 4px;
}

.exp-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px;
}

.exp-summary {
  margin: 0 0 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
}

.exp-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.exp-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.exp-link {
  font-size: 13px;
  color: rgba(139, 92, 246, 0.7);
  text-decoration: none;
  transition: color 0.15s;
}

.exp-link:hover {
  color: #a78bfa;
}
</style>
