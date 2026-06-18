<template>
  <section class="hero">
    <ParticleBg />

    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-name">
          <span class="gradient-text">徐智明</span>
        </h1>
        <p class="hero-title">AI Application Developer / Frontend Engineer</p>
        <p class="hero-desc">构建 AI 驱动的产品与体验</p>

        <div class="hero-tags">
          <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>

        <div class="hero-actions">
          <a href="/pages/projects" class="btn btn-primary">查看项目</a>
          <a href="/pages/blog" class="btn btn-secondary">阅读博客</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="glow-orb"></div>
        <div class="code-snippet">
          <pre><code><span class="comment">// AI-Powered Development</span>
<span class="keyword">const</span> <span class="var">xzm</span> = {
  <span class="prop">role</span>: <span class="string">'AI Developer'</span>,
  <span class="prop">stack</span>: [<span class="string">'Vue'</span>, <span class="string">'React'</span>, <span class="string">'Next.js'</span>],
  <span class="prop">focus</span>: [<span class="string">'AI Agent'</span>, <span class="string">'Workflow'</span>],
  <span class="prop">mission</span>: <span class="string">'Build AI Products'</span>
}</code></pre>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script setup>
import ParticleBg from './ParticleBg.vue'

const tags = ['Vue', 'React', 'Next.js', 'TypeScript', 'TailwindCSS', 'AI Agent', 'Workflow', 'Prompt Engineering']
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0a0a0a;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  gap: 60px;
}

.hero-text {
  flex: 1;
  max-width: 560px;
}

.hero-name {
  margin: 0 0 12px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.02em;
}

.hero-desc {
  margin: 0 0 28px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 36px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tag:hover {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.3);
  color: #fff;
}

.hero-actions {
  display: flex;
  gap: 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #fff;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* Right side - code snippet */
.hero-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.glow-orb {
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
  filter: blur(40px);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

.code-snippet {
  position: relative;
  z-index: 1;
  max-width: 100%;
  overflow: hidden;
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px 28px;
  backdrop-filter: blur(12px);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.8;
}

.code-snippet pre {
  margin: 0;
}

.code-snippet code {
  font-family: inherit;
  color: rgba(255, 255, 255, 0.85);
}

.code-snippet .comment { color: rgba(255, 255, 255, 0.35); font-style: italic; }
.code-snippet .keyword { color: #c084fc; }
.code-snippet .var    { color: #67e8f9; }
.code-snippet .string { color: #86efac; }
.code-snippet .prop   { color: #fde68a; }

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  transform: rotate(45deg);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: rotate(45deg) translate(0, 0); }
  50% { transform: rotate(45deg) translate(6px, 6px); }
}

/* Responsive */
@media (max-width: 900px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 40px;
    padding: 40px 24px;
  }

  .hero-text { max-width: 100%; }

  .hero-name { font-size: 38px; }
  .hero-title { font-size: 17px; }

  .hero-tags { justify-content: center; }
  .hero-actions { justify-content: center; }

  .hero-visual { display: none; }
}
</style>
