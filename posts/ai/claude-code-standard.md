---
date: 2025-05-20
title: Claude Code 开发规范与实践
tags:
  - Claude
  - 规范
  - 协作
description: 制定并实践 Claude Code 的开发规范，包括项目结构约定、代码风格指南、AI 协作最佳实践。
---

# Claude Code 开发规范与实践

## 为什么需要规范

Claude Code 是 Anthropic 推出的命令行 AI 编程助手。与 Cursor 的 GUI 交互不同，Claude Code 通过终端对话完成开发任务。没有规范约束，AI 容易写出风格不统一、架构混乱的代码。

## 核心规范

### 1. 项目结构约定（Feature First）

```
src/
├── features/
│   ├── auth/          # 认证模块
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   ├── dashboard/     # 仪表盘模块
│   └── settings/      # 设置模块
├── shared/            # 共享组件
└── lib/               # 工具库
```

### 2. CLAUDE.md 配置

在项目根目录创建 `CLAUDE.md`：

```markdown
# 项目开发规范

## 技术栈
- React 18 + TypeScript 5
- TailwindCSS 4
- Zustand 状态管理

## 命名约定
- 组件: PascalCase (UserProfile.tsx)
- Hooks: camelCase + use 前缀 (useAuth.ts)
- API: camelCase + api 后缀 (userApi.ts)

## 编码规则
- 所有组件使用函数式组件 + Hooks
- Props 用 interface 定义，导出供外部使用
- 错误边界包裹每个 feature 模块
```

### 3. Prompt 模板

```
/clear
请基于以下需求实现功能：

【背景】...
【需求】...
【技术约束】...
【验收标准】...

请：
1. 先列出实现计划
2. 逐个文件生成代码
3. 每一步完成后等待我确认
```

## 最佳实践

1. **小步迭代**: 每次只让 AI 改一个文件，减少幻觉
2. **先规划后编码**: 让 AI 先在注释中写出方案，确认后再生成代码
3. **测试驱动**: 让 AI 先生成测试用例，再实现功能代码

---

> 下一篇: [AI 产品 MVP 实践](/pages/lab)
