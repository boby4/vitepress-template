---
date: 2025-06-15
title: Cursor 高效工作流实践
tags:
  - Cursor
  - AI
  - 效率
description: 记录使用 Cursor 进行 AI 辅助开发的完整工作流，涵盖 prompt 模板、代码审查、自动化重构等实战经验。
---

# Cursor 高效工作流实践

Cursor 作为 AI-Native 编辑器，已经深度改变了我的日常开发方式。经过半年多的实践，我总结了一套高效工作流。

## 核心工作流

### 1. PRD 驱动的项目初始化

```
// Step 1: 写好 Markdown PRD
// Step 2: 在 Cursor 中引用 PRD 文档
// Step 3: 用 .cursorrules 定义项目规范
```

### 2. 代码生成模板

在 `.cursorrules` 中配置：

```yaml
rules:
  - 所有组件使用 TypeScript
  - 样式使用 TailwindCSS
  - 遵循 Feature First 目录结构
  - 每个组件必须有 loading/error/empty 状态
```

### 3. 自动化重构

使用 Cursor 的 Composer 功能进行批量重构：

- 选中需要重构的代码区域
- `Ctrl+I` 打开 Composer
- 描述重构目标，AI 自动生成改动方案

## 效率提升数据

| 场景 | 传统方式 | Cursor 工作流 | 提升 |
|------|----------|---------------|------|
| 新建页面 | 30min | 5min | 6x |
| 代码审查 | 20min | 3min | 6.6x |
| 写单元测试 | 40min | 8min | 5x |

## 踩坑记录

1. **上下文过长**: 单个对话超过 200 行后质量下降，及时开启新对话
2. **幻觉代码**: 对不熟悉的库 AI 可能凭空编造 API，务必运行验证
3. **过度依赖**: AI 生成的代码仍需人工审查，尤其是安全相关逻辑

> 关注我的 [AI Lab](/pages/lab) 了解更多实验记录。
