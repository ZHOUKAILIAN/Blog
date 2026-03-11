---
weight: 1
title: "AI日报 2026-03-10"
date: 2026-03-10
lastmod: 2026-03-10
draft: false
author: "ZHOUKAILIAN"
description: "GPT-5.4发布带动工具调用与长上下文实战升级，IDE/CLI进入自动化与会话调度加速期。"
images: []
tags: ["AI", "News", "Daily", "Changelog"]
categories: ["ai"]
lightgallery: true
---

# AI日报 2026-03-10

## 概览
- 今日主线：**前沿模型能力继续外溢到开发工作流**，尤其是工具检索、Computer Use、超长上下文与会话调度能力。
- 开发工具主线：Claude Code / Codex / Cursor / OpenCode 均出现持续迭代，重点集中在**稳定性、自动化、权限控制与多工作区能力**。
- 对团队的直接影响：从“能写代码”升级为“可托管执行+可审计复用”的 Agent 工程化阶段。

## 今日关键新闻（含证据与解读）

1) **OpenAI 发布 GPT-5.4 与 GPT-5.4 Pro（API）**
- 证据：OpenAI API Changelog（2026-03-05）
- 链接：https://developers.openai.com/api/docs/changelog
- 关键信息：新增 tool search、Computer Use（Responses API computer tool）、1M context + native compaction。
- 解读：模型能力从“文本问答”进一步转向“任务执行引擎”，尤其利好长流程 Agent 与复杂工程场景。

2) **OpenAI 上线 gpt-5.3-chat-latest（2026-03-03）**
- 证据：OpenAI API Changelog（2026-03-03）
- 链接：https://developers.openai.com/api/docs/changelog
- 关键信息：chat-latest 指向 GPT-5.3 Instant 快照。
- 解读：产品端与 API 端模型基线进一步对齐，降低团队“线上表现与离线评测不一致”风险。

3) **Claude Code 发布 v2.1.72，重点修复/增强会话调度与稳定性**
- 证据：Claude Code Releases
- 链接：https://github.com/anthropics/claude-code/releases
- 关键信息：新增禁用会话 cron 的环境变量、/plan 参数增强、工具搜索代理路径修正、大量权限与并行工具调用修复。
- 解读：Claude Code 从“功能扩展”转向“可长期运行会话的稳定化”，对生产环境更友好。

4) **Cursor 强化 Automations 与跨平台 Agent 使用面**
- 证据：Cursor Changelog
- 链接：https://cursor.com/changelog
- 关键信息：Automations 支持 schedule/event 触发（Slack/Linear/GitHub/PagerDuty/Webhook），并提供云端 sandbox + memory。
- 解读：Cursor 正在将 IDE Agent 扩展为“持续运行的团队工作流节点”，和传统 IDE 插件定位拉开差距。

5) **OpenCode 发布 v1.2.24，引入工作区与模型生态增强**
- 证据：OpenCode Releases
- 链接：https://github.com/anomalyco/opencode/releases
- 关键信息：TUI 初步支持 workspaces，新增 Copilot GPT-5.4 xhigh 支持，桌面端修复滚动/通知等体验问题。
- 解读：OpenCode 持续把社区驱动产品往“多项目多会话管理”推进，适合重度终端派开发者。

6) **Google Gemini 3.1 Deep Think 对外强调复杂推理与 1M 场景**
- 证据：Google DeepMind Gemini 页面
- 链接：https://deepmind.google/models/gemini/
- 关键信息：突出复杂技术问题推理与 agentic coding 场景，对比表持续对齐前沿模型竞赛维度。
- 解读：多家前沿厂商在“深推理 + 代理执行 + 长上下文”收敛，2026 年竞争重心已非常明确。

## 结论
1. **模型层面**：GPT-5.4 类更新把“工具调用/电脑操作/上下文管理”打包成默认能力，Agent 工程进入平台化时代。
2. **工具层面**：Claude Code / Codex / Cursor / OpenCode 的更新方向高度一致：自动化、权限边界、稳定性、长会话治理。
3. **团队建议**：优先建立“任务分级 + 权限策略 + 失败重试 + 运行审计”四件套，否则能力再强也难上生产。

## 前沿 IDE / CLI & Frontier Model Changelog

### Claude Code
- 版本：**v2.1.72**（含 v2.1.71 对比）
- 日期：发布页显示近 24~48h 持续更新
- 修改亮点：
  - 新增 `CLAUDE_CODE_DISABLE_CRON`，支持会话内定时任务紧急停用。
  - `/plan` 支持描述参数，进入规划模式更直接。
  - 改进 Bash 权限提示与 tree-sitter 解析，减少误触发审批。
- 修复重点：
  - 修复并行工具调用中 Read/WebFetch/Glob 失败导致级联取消问题。
  - 修复长会话退出慢、任务初始化卡住、/clear 误杀后台任务等问题。

### Codex
- 版本：**0.112.0（稳定）**，并有 **0.113.0-alpha.1/.2（预发布）**
- 日期：Releases 页可见连续预发布迭代
- 修改亮点：
  - 新增 `@plugin` mentions，聊天中可直接拉取插件/MCP/skill 上下文。
  - 更新模型选择器流程，最新模型目录可见性更好。
  - 沙箱权限模型并入 per-turn policy（zsh-fork 场景）。
- 修复重点：
  - JS REPL 失败后状态保持。
  - SIGTERM 按 Ctrl-C 语义优雅退出。
  - Linux/macOS 沙箱一致性与网络/Unix socket 行为增强。

### Cursor
- 版本：**no_updates（缺显式版本号）**
- 日期：官方 Changelog 当前页未提供统一版本号/精确发布日期字段
- 原因（short reason）：页面以功能块滚动展示为主，缺“版本标签 + 发布时间”组合；本次记录为功能更新追踪而非版本追踪。
- 已观测功能变更（仍属有效变更）：
  - Automations（定时/事件触发 + 云端沙箱 + 记忆）
  - JetBrains 通过 ACP 接入
  - MCP Apps、Team Marketplaces、Bugbot Autofix、Cloud Agents Computer Use

### OpenCode
- 版本：**v1.2.24**（并参考 v1.2.23 / v1.2.22）
- 日期：Releases 页显示最新版本顺序更新
- 修改亮点：
  - TUI 初步支持 workspaces。
  - GitLab 1M context beta header 支持。
  - 新增 Copilot GPT-5.4 xhigh 支持。
- 修复重点：
  - Desktop 滚动抖动与循环问题。
  - 会话标题 spinner 显示问题。
  - 交互 toast 在权限/问题解决后正确消失。

### Frontier Models（OpenAI / Anthropic / Google / xAI）
- OpenAI：
  - **2026-03-05：GPT-5.4 / GPT-5.4 Pro 发布**（tool search、computer use、1M context、compaction）。
  - **2026-03-03：gpt-5.3-chat-latest 发布**。
- Anthropic：
  - **no_updates**（short reason：公开可抓取的 release notes 页面本次抓取仅返回 loading，缺可验证新增条目）。
- Google：
  - Gemini 页面强调 **Gemini 3.1 Deep Think** 与 agentic coding 能力（按官网展示记录）。
- xAI：
  - **no_updates**（short reason：x.ai/news 访问触发 Cloudflare 403，当前运行环境不可验证新发布条目）。
