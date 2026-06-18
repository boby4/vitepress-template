# 徐智明个人品牌官网 V2.0 PRD（方案A：增量升级）

## 一、升级策略

| 维度 | 决策 |
|------|------|
| **路线** | 增量升级，不动框架底座 |
| **底座** | VitePress 1.x + Vue 3 |
| **核心原则** | 现有功能零丢失，新功能渐进叠加 |
| **总工期** | 约 1 周，分 7 个阶段交付 |

> 核心逻辑：当前博客有 22 篇存量文章 + 30+ 个特色组件（3D模型、流程图编辑器、聊天室、万年历、词云、小游戏、音乐播放器等），这些都是 **已有资产**，全量重写会全部丢失。增量升级在保留一切现有能力的基础上，逐步叠加 V2 的新功能。

---

## 二、现状 vs 目标

### 2.1 当前架构

```
index.md (首页)
├── Banner（随机图片）
├── Aside（个人信息卡片 + 公告 + 技能 + 标签云 + 黄历）
└── 文章列表（按时间分页）

导航: 首页 | 时间轴 | 标签 | 友情链接 | 日历 | 流程图 | 大模型
```

### 2.2 目标架构

```
index.md (新版首页)
├── Hero Section (100vh, 左文案+右粒子动效)
├── Stats 数据面板 (文章数/项目数/Stars/访问量)
├── Featured Projects (精选项目卡片)
├── AI Lab 预览 (最近实验)
├── Latest Articles (按专题分组)
├── Timeline 成长路线
└── Contact 联系方式

导航: 首页 | 项目 | 博客 | AI实验室 | 时间轴 | 标签 | 关于 | 更多...
```

---

## 三、分阶段执行计划

### 阶段 1：底座升级（~0.5天）

| 任务 | 说明 |
|------|------|
| VitePress 升级 | `1.0.0-alpha.47` → `1.x` 最新稳定版 |
| 依赖清理 | 移除无用依赖，解决 breaking changes |
| `vitepress` → `vitepress/theme` import 路径适配 |
| 构建验证 | `npm run build` 零报错 |

**产出**: 项目升级到最新 VitePress，现有功能全部正常。

---

### 阶段 2：新首页 Hero（~1.5天）

#### 2.1 新建组件

| 组件 | 路径 | 功能 |
|------|------|------|
| `HeroSection.vue` | `.vitepress/theme/components/` | 首页 Hero 区 |
| `ParticleBg.vue` | `.vitepress/theme/components/` | 粒子/光晕背景动效 |

#### 2.2 HeroSection 设计规格

| 属性 | 值 |
|------|-----|
| 高度 | `100vh` |
| 布局 | 左侧文案 + 右侧动态视觉（Three.js 粒子/几何体） |
| 主标题 | 徐智明 |
| 副标题 | AI Application Developer / Frontend Engineer |
| 描述 | 构建 AI 驱动的产品与体验 |
| 标签 | `Vue` `React` `Next.js` `AI Agent` `RAG` `Workflow` |
| 按钮 | [查看项目] → `/pages/projects`  [阅读博客] → `/pages/blog` |
| 背景 | 深色渐变 + `ParticleBg.vue` 粒子动效 |

**技术方案**: Three.js（已有依赖）生成粒子背景，SCSS 实现深色渐变光晕，CSS animation 做标签浮动。

---

### 阶段 3：数据面板 + 项目展示（~1.5天）

#### 3.1 Stats 数据面板

新建 `StatsSection.vue`，首页 Hero 下方展示：

| 指标 | 数据源 |
|------|--------|
| Articles | `posts/` 目录文章数（已有 `getPosts` 可获取） |
| Projects | 硬编码或 `pages/projects.md` frontmatter 数据 |
| GitHub Stars | GitHub API 实时拉取（`fetch` + 缓存） |
| Visitors | Umami 统计 API |

#### 3.2 Featured Projects

新建 `ProjectCard.vue` + `ProjectsSection.vue`，展示精选项目（数据来源：[github.com/boby4](https://github.com/boby4)）：

```yaml
# 数据格式（pages/projects.md frontmatter）
projects:
  - title: 数字宠物养成系统
    description: "会饿、会困、会成长"的网页电子宠物系统
    techStack: [React, TypeScript, Vite]
    cover: /src/img/projects/digitalpet.png
    github: https://github.com/boby4/digitalpet
    demo: https://digitalpet-wine.vercel.app
    status: Online
  - title: 可视化流程编辑器
    description: 画布拖拽 + 连线 + 配置面板，快速搭建「触发器→步骤」工作流
    techStack: [Vue 3, TypeScript, Vue Flow]
    cover: /src/img/projects/vue-flow-editor.png
    github: https://github.com/boby4/vue-flow-editor
    demo: https://vue-flow-editor.vercel.app
    status: Online
  - title: 情绪可视化日记系统
    description: 选择情绪 + 强度，Canvas 实时生成动态视觉画布
    techStack: [TypeScript, Canvas API]
    cover: /src/img/projects/mood-canvas.png
    github: https://github.com/boby4/mood-canvas
    demo: https://mood-canvas-delta.vercel.app
    status: Online
  - title: AI 对话数字人助手
    description: 一个可以和用户对话的 AI 动画角色项目。
    techStack: [Vue, TypeScript]
    cover: /src/img/projects/ai-talking-avatar.png
    github: https://github.com/boby4/ai-talking-avatar
    demo: https://ai-talking-avatar-alpha.vercel.app
    status: Online
```

卡片悬停效果：玻璃拟态 + 渐变边框 + 微动效。

---

### 阶段 4：博客重构（~1天）

#### 4.1 目录重组

```
posts/
├── ai/
│   ├── cursor-workflow.md        # Prompt Engineering 类
│   ├── claude-code-standard.md   # Agent 类
│   └── rag-system.md             # RAG 类
├── frontend/
│   ├── nextjs-15-upgrade.md
│   ├── react-performance.md
│   └── typescript.md             # 已有，移入
├── engineering/
│   ├── docker-command.md         # 已有
│   ├── docker-file.md            # 已有
│   ├── deploy.md                 # 已有
│   └── deployment.md             # 已有
└── career/
    ├── inter-work.md             # 已有
    └── daily-morning.md          # 已有
```

#### 4.2 文章 frontmatter 增强

```yaml
---
date: 2025-06-10
title: Cursor 高效工作流实践
category: ai          # 一级分类: ai / frontend / engineering / career
tags: [Cursor, AI, 效率]
description: 记录使用 Cursor 进行 AI 辅助开发的完整工作流
cover: /src/img/covers/cursor.png    # 新增：封面图
pinned: true                          # 新增：是否置顶
---
```

#### 4.3 博客首页改造

新建 `BlogPage.vue`，替换当前纯列表：

- 顶部按专题 Tab 切换（AI开发 / 前端架构 / 工程化 / 职场成长）
- 置顶文章卡片（`pinned: true`）
- 文章列表带封面缩略图、阅读时长、标签
- 搜索框（前端 `fuse.js` 即可，22 篇文章无需 Orama）

---

### 阶段 5：AI Lab 页面（~1天）

新建 `pages/lab.md` + `Lab.vue` 组件：

```
AI Lab 页面结构:
├── 实验时间轴
│   ├── 2025-06: Cursor 工作流实验 → 结论/成果
│   ├── 2025-05: Claude Code 开发规范 → 踩坑记录
│   ├── 2025-04: AI 自动生成后台系统 → Demo链接
│   └── 2025-03: AI 产品 MVP 实践 → 经验总结
└── 分类筛选: Prompt / Agent / Workflow / RAG / MCP
```

数据格式（`pages/lab.md` frontmatter）：

```yaml
experiments:
  - id: "001"
    title: Cursor 工作流
    date: 2025-06-10
    category: Workflow
    summary: 记录使用 Cursor 进行 AI 辅助开发的完整工作流
    tags: [Cursor, IDE, 效率]
    link: /posts/ai/cursor-workflow    # 关联博客文章
```

---

### 阶段 6：视觉升级（~1.5天）

#### 6.1 全局主题

| 属性 | 现状 | 目标 |
|------|------|------|
| 配色 | 白色 + 蓝色点缀 | 深色主题（黑/灰 + 蓝紫渐变） |
| 背景 | 白色纯色 | 深色 + 微纹理/噪点 |
| 卡片 | 白色圆角阴影 | 玻璃拟态（`backdrop-filter`）+ 渐变边框 |
| 字体 | 系统默认 | Inter（标题）+ 系统等宽（代码） |
| 导航栏 | 白色固定 | 毛玻璃半透明固定顶栏 |

#### 6.2 动效规范

| 场景 | 动效 |
|------|------|
| 页面切换 | `fade` 300ms |
| 卡片 hover | 上浮 4px + 阴影扩散 200ms |
| 标签 hover | 背景色渐变 150ms |
| Hero 粒子 | Three.js `requestAnimationFrame` 循环 |
| 滚动入场 | `IntersectionObserver` + CSS `animate`（已有 `animateFn`） |

#### 6.3 现有组件视觉适配

以下已有组件需要视觉对齐深色主题：

- `Banner.vue` — 图片遮罩由白色渐变 → 深色渐变
- `Aside.vue` — 个人信息卡片玻璃拟态化
- `Card.vue` — 控制台卡片保留，颜色适配
- `TimeLine.vue` / `NewTimeLine.vue` — 时间轴线条颜色适配
- `Tags.vue` — 标签云颜色适配

> 不改变组件逻辑，只改样式变量。现有 SCSS 变量体系改为 CSS 自定义属性，方便主题切换。

---

### 阶段 7：评论升级 + 统计切换（~0.5天）

| 模块 | 现状 | 目标 |
|------|------|------|
| 评论 | Giscus (GitHub Issues) | 不变，升级 Giscus 配置到新版 API |
| 统计 | 百度统计 | 切换为 Umami（自建或 Umami Cloud） |
| 自动化 | GitHub Actions 早安推送 | 保留，不动 |

---

## 四、设计风格

### 4.1 参考网站

| 网站 | 借鉴要点 |
|------|----------|
| **Vercel** | 深色背景 + 高对比度文字 + 产品级卡片网格 + 干净留白 |
| **Linear** | 毛玻璃导航栏 + 微妙的渐变光效 + 极简键盘交互感 |
| **Stripe** | 渐变色彩运用 + 大标题排版 + 交互式产品 Demo |
| **Raycast** | 命令面板式布局 + 深色半透明 UI + 快捷键驱动交互 |

### 4.2 视觉关键词

```
深色主题 · 高级感 · 科技感 · AI感 · 极简风
```

### 4.3 配色方案

| 角色 | 色值 | 用途 |
|------|------|------|
| 背景（最深） | `#0a0a0a` | 页面底色 |
| 表面 | `#1a1a1a` | 卡片、容器背景 |
| 表面悬停 | `#252525` | 卡片 hover 状态 |
| 边框 | `rgba(255,255,255,0.08)` | 卡片/分割线 |
| 主文字 | `#ffffff` | 标题、重要文字 |
| 次文字 | `rgba(255,255,255,0.6)` | 描述、辅助信息 |
| 强调色 | 蓝紫渐变 `#3b82f6` → `#8b5cf6` | 按钮、链接、标签高亮 |

### 4.4 字体层级

| 层级 | 字体 | 字号 | 用途 |
|------|------|------|------|
| H1 | Inter | 48px / 700 | Hero 主标题 |
| H2 | Inter | 32px / 600 | 段落标题 |
| H3 | Inter | 20px / 600 | 卡片标题 |
| Body | system-ui | 16px / 400 | 正文 |
| Code | JetBrains Mono / Fira Code | 14px | 代码块 |
| Caption | Inter | 13px / 400 | 标签、辅助文字 |

### 4.5 卡片设计规范

- **背景**: `backdrop-filter: blur(12px)` + `background: rgba(255,255,255,0.03)`
- **边框**: `1px solid rgba(255,255,255,0.08)`
- **圆角**: `12px`
- **悬停**: 上浮 `translateY(-4px)` + 边框变亮 + 阴影扩散
- **过渡**: `all 0.2s ease`

---

## 五、技术选型（增量版）

| 模块 | 技术 | 说明 |
|------|------|------|
| 框架 | VitePress 1.x + Vue 3 | 保持不变 |
| 样式 | SCSS（存量）+ 少量 TailwindCSS（新组件按需） | 渐进引入 |
| 3D/动效 | Three.js（已有）+ CSS Animation | 已有依赖 |
| 组件库 | Element Plus（存量保留） | 存量页面不动 |
| 内容 | Markdown + gray-matter | 保持一致 |
| 评论 | Giscus | 不变 |
| 统计 | Umami | 替换百度统计 |
| 部署 | Render.com + GitHub Pages | 不变，后续可选迁移 Vercel |

> TailwindCSS 仅在新组件中按需使用，不侵入已有 SCSS 体系，避免全局样式冲突。

---

## 六、目录结构（升级后）

```
vitepress-template/
├── .vitepress/
│   ├── config.ts                 # 主配置（保留）
│   ├── config/
│   │   └── nav.ts                # 导航（新增 Projects、Lab 入口）
│   ├── theme/
│   │   ├── index.ts              # 主题入口（保留）
│   │   ├── style/
│   │   │   ├── index.scss        # 全局样式（新增深色主题变量）
│   │   │   └── tailwind.css      # TailwindCSS 入口（新增）
│   │   ├── components/
│   │   │   ├── Page.vue          # 旧首页（保留，重命名为 OldPage）
│   │   │   ├── NewPage.vue       # 新首页（新增）
│   │   │   ├── HeroSection.vue   # Hero 区（新增）
│   │   │   ├── ParticleBg.vue    # 粒子背景（新增）
│   │   │   ├── StatsSection.vue  # 数据面板（新增）
│   │   │   ├── ProjectsSection.vue # 项目展示（新增）
│   │   │   ├── ProjectCard.vue   # 项目卡片（新增）
│   │   │   ├── LabSection.vue    # Lab 预览（新增）
│   │   │   ├── TimelineSection.vue # 成长路线（新增）
│   │   │   ├── BlogPage.vue      # 博客首页（新增）
│   │   │   ├── Lab.vue           # Lab 页面（新增）
│   │   │   ├── Contact.vue       # 联系方式（新增）
│   │   │   ├── Banner.vue        # （保留，样式适配）
│   │   │   ├── Aside.vue         # （保留，样式适配）
│   │   │   ├── TimeLine.vue      # （保留）
│   │   │   ├── Game.vue          # （保留）
│   │   │   ├── ChatRoom.vue      # （保留）
│   │   │   ├── Clock.vue         # （保留）
│   │   │   ├── ... (其他30+组件全部保留)
│   │   └── ...
│   └── ...
├── index.md                      # 首页入口（指向新 Page）
├── pages/
│   ├── projects.md               # 项目页（新增）
│   ├── lab.md                    # AI Lab 页（新增）
│   ├── blog.md                   # 博客首页（新增）
│   ├── about.md                  # 关于页（新增）
│   ├── timeline.md               # 时间轴（保留）
│   ├── tags.md                   # 标签（保留）
│   ├── link.md                   # 友情链接（保留）
│   ├── calendar.md               # 日历（保留）
│   ├── process.md                # 流程图（保留）
│   ├── game.md                   # 大模型（保留）
│   └── model.md                  # 模型展示（保留）
├── posts/
│   ├── ai/                       # AI开发（新建）
│   ├── frontend/                 # 前端架构（新建）
│   ├── engineering/              # 工程化（新建）
│   └── career/                   # 职场成长（新建）
└── public/
    └── src/img/
        └── covers/               # 文章封面图（新建）
```

---

## 七、路由设计

| 路由 | 页面 | 状态 |
|------|------|------|
| `/` | 新首页（Hero + Stats + Projects + Lab + Blog + Timeline + Contact） | 改造 |
| `/pages/projects` | 项目展示页 | 新增 |
| `/pages/lab` | AI 实验室 | 新增 |
| `/pages/blog` | 博客首页（专题分类） | 新增 |
| `/pages/about` | 关于我 | 新增 |
| `/pages/timeline` | 时间轴 | 保留 |
| `/pages/tags` | 标签云 | 保留 |
| `/pages/link` | 友情链接 | 保留 |
| `/pages/calendar` | 万年历 | 保留 |
| `/pages/process` | 流程图编辑器 | 保留 |
| `/pages/game` | 大模型/小游戏 | 保留 |
| `/pages/model` | 3D 模型展示 | 保留 |
| `/posts/ai/*` | AI 开发文章 | 迁移+新建 |
| `/posts/frontend/*` | 前端架构文章 | 迁移+新建 |
| `/posts/engineering/*` | 工程化文章 | 迁移 |
| `/posts/career/*` | 职场成长文章 | 迁移 |

---

## 八、新首页布局

```
┌─────────────────────────────────────────┐
│ 导航栏（毛玻璃半透明固定，滚动后出现）    │
├─────────────────────────────────────────┤
│                                         │
│  [左] 徐智明                            │
│       AI Application Developer          │
│       构建AI驱动的产品与体验       [右]  │
│       Vue React Next.js AI Agent...     │
│       [查看项目]  [阅读博客]     粒子动效│
│                                         │
├─────────────────────────────────────────┤
│  156+        23       1200+     58000+  │
│  Articles  Projects   Stars   Visitors  │
├─────────────────────────────────────────┤
│          ✦ Featured Projects ✦         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ 数字人  │ │ 宠物   │ │ 日记   │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│             🧪 AI Lab Preview           │
│  · Cursor 工作流 · Claude Code 规范    │
├─────────────────────────────────────────┤
│           📝 Latest Articles            │
│  [AI开发] [前端架构] [工程化] [职场成长] │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ 文章卡片 │ │ 文章卡片 │ │ 文章卡片 │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│           📈 Timeline                   │
│  2021→2023→2025→2026                   │
├─────────────────────────────────────────┤
│           📬 Contact                    │
│  GitHub · 掘金 · CSDN · 邮箱 · 微信    │
└─────────────────────────────────────────┘
```

---

## 九、增量 vs 全量重写对比

| 维度 | 方案A（增量升级） | 方案B（全量重写 Next.js） |
|------|------------------|--------------------------|
| **框架** | VitePress + Vue 3 | Next.js 15 + React |
| **工期** | ~1 周 | ~3 周 |
| **现有组件** | 30+ 全部保留 | 全部丢失需重写 |
| **现有文章** | 直接迁移，不动内容 | 需转 MDX 格式 |
| **风险** | 低，每阶段可独立上线 | 高，必须全部完成后才能切换 |
| **增量交付** | 每阶段完成后即可部署验证 | 无法增量交付 |
| **SEO** | 静态生成（SSG），已达标 | SSR/SSG，理论更优 |
| **未来迁移** | 如需切 Next.js，UI 组件可按设计稿重写 | 直接到位 |

---

## 九、执行顺序

```
阶段1 → 阶段6(主题变量) → 阶段2 → 阶段3 → 阶段4 → 阶段5 → 阶段6(组件适配) → 阶段7
底座升级   先定视觉基调   新首页    数据面板   博客      Lab      存量组件美化    收尾
```

> 阶段 6 拆成两半：前半段先定 CSS 变量和深色主题基准（在 Hero 前完成），后半段批量适配存量组件（在所有新页面完成后统一美化）。

---

## 十一、开发 Prompt（给 AI 开发助手）

```markdown
你是一名资深前端工程师，精通 VitePress + Vue 3+高级UI设计师+动效开发。

请基于以下要求在现有 VitePress 博客项目上进行增量升级：

## 技术约束
- 保持 VitePress 1.x + Vue 3 框架不变
- 现有 .vitepress/theme/components/ 下 30+ 组件全部保留，只改样式不改逻辑
- 新组件使用 SCSS + CSS 自定义属性（深色主题），不引入新 UI 库
- 需要动画的地方使用 CSS animation/transition 或复用现有 Three.js

## 开发原则
1. 增量叠加，不动存量代码
2. 新组件独立文件，不耦合现有组件
3. 确保 npm run build 无报错
4. 每完成一个组件立即验证

## 视觉基准
- 深色主题: background #0a0a0a, surface #1a1a1a, accent 蓝紫渐变
- 卡片: 玻璃拟态 backdrop-filter blur(12px), border 1px rgba(255,255,255,0.08)
- 字体: Inter (标题), system-ui (正文)
- 参考风格: Vercel / Linear

## 禁止项
- TODO / Placeholder / Fake Data
- 引入重型 UI 库
- 修改现有 posts/ 下任何文章的正文内容
```
