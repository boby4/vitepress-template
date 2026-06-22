---
date: 2025-06-17
title: 从零搭建一个 MCP Server 接入 Claude 和 Cursor
tags:
  - AI
  - MCP
  - Node
description: 用 TypeScript 从零实现一个 MCP Server，理解工具（tools）的定义与注册，并接入 Claude Desktop 和 Cursor 实际调用。
---

# 从零搭建一个 MCP Server 接入 Claude 和 Cursor

MCP（Model Context Protocol）是 Anthropic 提出的一个开放协议，简单说就是给 AI 模型一个标准化的方式去调用外部工具、读取数据源。你可以把它理解成「AI 的 USB 接口」——只要按协议实现一个 Server，Claude、Cursor 这些客户端就能即插即用地调用你的能力。

这篇我们从零写一个最小可用的 MCP Server，让 Claude 能调用我们自己定义的工具。

## 先搞清楚 MCP 在解决什么问题

没有 MCP 之前，想让 AI 调用外部能力，每个工具都得自己写适配。你给 Cursor 写的插件，搬到 Claude 上又得重来一遍。

MCP 把这件事标准化了。它定义了三类核心能力：

- **Tools（工具）**：模型可以主动调用的函数，比如「查天气」「读数据库」。
- **Resources（资源）**：模型可以读取的数据，比如文件、API 返回。
- **Prompts（提示模板）**：预置的提示词模板。

只要你的 Server 遵循协议，任何支持 MCP 的客户端都能用。这篇重点讲最常用的 Tools。

## 一、初始化项目

```bash
mkdir my-mcp-server && cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node tsx
```

`@modelcontextprotocol/sdk` 是官方 SDK，`zod` 用来做参数校验（SDK 推荐搭配它定义工具的入参 schema）。

配置 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

`package.json` 里加上 `"type": "module"`，因为 SDK 是 ESM 的。

## 二、写一个最小 Server

新建 `src/index.ts`。我们先实现一个简单的工具：根据城市名返回模拟天气（实际项目里换成真实 API 即可）。

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. 创建 Server 实例
const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

// 2. 注册一个工具
server.tool(
  "get_weather",
  "查询指定城市的当前天气",
  {
    city: z.string().describe("城市名称，例如：北京、上海"),
  },
  async ({ city }) => {
    // 这里用模拟数据，真实场景换成天气 API 调用
    const weather = {
      city,
      temperature: "22°C",
      condition: "晴",
      humidity: "45%",
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(weather, null, 2),
        },
      ],
    };
  }
);

// 3. 用 stdio 传输启动（Claude Desktop / Cursor 都走这个）
const transport = new StdioServerTransport();
await server.connect(transport);
```

几个要点：

- `server.tool()` 四个参数分别是：工具名、描述、参数 schema、处理函数。
- **描述很重要**——模型靠它判断什么时候该调这个工具，写清楚能显著提升调用准确率。
- 参数用 `zod` 定义，`.describe()` 的说明也会传给模型，帮它理解每个字段。
- 返回值必须是 `{ content: [...] }` 结构，`type: "text"` 是最常用的。

## 三、本地调试

MCP 官方提供了一个调试工具 Inspector，不用接客户端就能测：

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

它会起一个网页界面，你能看到注册了哪些工具、手动填参数调用、看返回结果。开发阶段强烈建议先用它跑通，再去接客户端。

## 四、接入 Claude Desktop

Claude Desktop 通过一个配置文件加载 MCP Server。配置文件位置：

- macOS：`~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows：`%APPDATA%\Claude\claude_desktop_config.json`

编辑它，加上我们的 Server：

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["tsx", "/绝对路径/my-mcp-server/src/index.ts"]
    }
  }
}
```

注意路径要写**绝对路径**。改完重启 Claude Desktop，在对话框里问「北京天气怎么样」，Claude 就会自动调用 `get_weather` 工具。

## 五、接入 Cursor

Cursor 的配置类似，在设置里找到 MCP 配置（或编辑项目根目录的 `.cursor/mcp.json`）：

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": ["tsx", "/绝对路径/my-mcp-server/src/index.ts"]
    }
  }
}
```

接好之后，在 Cursor 的对话里同样能触发工具调用。

## 六、进阶：让工具更可靠

跑通基础版后，实际项目里还要补几件事：

**参数校验和错误处理**。zod 会帮你拦住非法入参，但工具内部的异常要自己处理好，别让 Server 崩掉：

```ts
async ({ city }) => {
  try {
    const data = await fetchRealWeather(city);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  } catch (err) {
    return {
      content: [{ type: "text", text: `查询失败：${(err as Error).message}` }],
      isError: true,
    };
  }
}
```

`isError: true` 会告诉模型这次调用出错了，它能据此决定要不要重试或换方式。

**不要把敏感信息硬编码**。API key 这类东西走环境变量，别写进代码：

```ts
const apiKey = process.env.WEATHER_API_KEY;
if (!apiKey) {
  throw new Error("缺少 WEATHER_API_KEY 环境变量");
}
```

启动时就校验必需的环境变量，缺了直接报错，比运行到一半才挂掉好排查。

## 写在最后

MCP 的核心价值在于「写一次，到处能用」。你为团队封装的内部工具——查订单、读文档、跑脚本——做成一个 MCP Server，全公司用 Claude 或 Cursor 的人都能直接调，不用各自折腾。

这篇只覆盖了 Tools，Resources 和 Prompts 的玩法类似，官方文档和 SDK 里都有例子。先把这个最小 Server 跑通，剩下的扩展就很自然了。
