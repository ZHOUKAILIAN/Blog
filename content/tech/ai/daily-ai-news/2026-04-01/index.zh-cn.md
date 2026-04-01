---
weight: 1
title: "AI日报 2026-04-01（Morning Publish）"
date: 2026-04-01
lastmod: 2026-04-01
draft: false
author: "ZHOUKAILIAN"
description: "Morning Publish 合并版：AI 日报 + IDE/CLI Changelog"
images: []
tags: ["AI", "News", "Daily", "Changelog"]
categories: ["ai"]
lightgallery: true
---

AI 日报
# AI 日报｜2026-04-01（UTC）

> 统计窗口：2026-03-31 01:00 UTC ～ 2026-04-01 01:00 UTC（北京时间昨日 09:00 ～ 今日 09:00）
> 说明：本版仅用于 Blog PR，不执行小红书发布。

## 今日重点

1. **OpenAI 把资本故事讲到了公开市场前夜**：最新一轮融资规模达到 **1220 亿美元**，投后估值 **8520 亿美元**，同时把月收入、用户量、Codex 使用量等核心经营数据一次性摆到台面上。
2. **AI 编程工具继续卷“代理化基础设施”**：Cursor 把 **self-hosted cloud agents**、Automations、JetBrains ACP 一起推到台前，企业侧的“内网运行 agent”正在变成标配。
3. **CLI 工具的竞争点从“能不能用”转向“卡不卡、稳不稳、能不能大规模跑”**：Claude Code 2.1.89、Codex 0.118.0、OpenCode 近两日更新都在补权限、缓存、MCP、Windows/PowerShell 和长会话稳定性。

## 一、公司与平台动态

### 1) OpenAI 这轮融资，不只是拿钱，更像在提前排练 IPO 叙事
OpenAI 官方宣布完成新一轮融资，**承诺资本 1220 亿美元**、**投后估值 8520 亿美元**。更关键的是，它没有只说“我们又融了很多钱”，而是顺手把一串经营指标也扔出来：**月收入 20 亿美元**、**ChatGPT 周活超过 9 亿**、**订阅用户超过 5000 万**、**API 每分钟处理超过 150 亿 token**，以及 **Codex 周活超过 200 万，过去三个月增长 5 倍**。

为什么看这条：这说明头部 AI 公司现在卖的不只是模型能力，而是一整套“消费端入口 + 企业落地 + 开发者平台 + 计算基础设施”的复合增长故事。对做产品和平台的人来说，后面的竞争会越来越像云厂商 + 操作系统 + 应用商店的混合体。

来源：OpenAI、TechCrunch

### 2) Cursor 开始把“企业内网 agent”做成正式产品能力
Cursor changelog 当前主推了几件很同方向的事：**self-hosted cloud agents**、**Automations**、**JetBrains IDEs via ACP**，以及一批接入 Atlassian、Datadog、GitLab、Glean、Hugging Face、monday.com、PlanetScale 等生态的新插件。翻成大白话就是：Cursor 不满足于只做编辑器里的 AI 助手，而是在往“可调度、可自动触发、可接企业系统、还能跑在你自己网络里”的 agent 平台走。

为什么看这条：企业真正愿意放权给 agent，前提通常不是“它更聪明”，而是“它在我的网络里、拿我的权限、接我的系统、能被审计”。Cursor 这波更新踩得很准，说明 AI IDE 的主战场已经从补全转向自动化工作流。

来源：Cursor Changelog

## 二、开发者工具与工程流

### 3) Claude Code、Codex、OpenCode 都在补“长流程稳定性”
这一轮工具更新里，最值得注意的不是花哨新功能，而是大规模使用时的工程细节：
- **Claude Code 2.1.89** 增加 `defer` 权限决策、`PermissionDenied` hook、MCP 非阻塞连接、命名 subagents，同时修了一串长会话和跨平台问题；
- **Codex 0.118.0** 补了 Windows sandbox 代理出网控制、device-code 登录、`codex exec` prompt+stdin 工作流，以及动态 bearer token；
- **OpenCode** 在 3 月 31 日至 4 月 1 日连续更新，补了 **Google Vertex Anthropic prompt caching**、**PowerShell 一等支持**、插件入口与 TUI 细节修复。

为什么看这条：Agent 工具真要进团队主流程，最后拼的不是演示视频，而是“权限流会不会卡死、MCP 会不会拖垮启动、Windows 用户是不是也能跑、长会话会不会内存爆掉”。这轮更新说明各家都在往生产级使用场景收敛。

来源：Anthropic Claude Code Changelog、GitHub Releases（openai/codex）、OpenCode Changelog

## 三、今日一句话

今天最明显的信号不是“又有新模型”，而是 **AI 公司和 AI 工具都在同时补齐规模化叙事**：大公司补资本与营收故事，开发工具补代理、权限、缓存和企业部署能力。接下来真正拉开差距的，还是谁能把 agent 放进真实工作流，而不是只放进发布会。

---

IDE/CLI changelog
# AI Frontier Changelog｜2026-04-01（UTC）

> 统计窗口：2026-03-31 01:00 UTC ～ 2026-04-01 01:00 UTC（北京时间昨日 09:00 ～ 今日 09:00）
> 状态：**PARTIAL**（部分来源缺少严格时间戳，或无可验证窗口内条目）

## IDE / CLI 更新

### 1) Claude Code
- **状态：有更新**
- **版本/时间：v2.1.89（2026-04-01 01:07，页面可见）**
- **关键变更：**
  - `PreToolUse` hooks 新增 `defer` 决策，headless 会话可在工具调用处暂停并稍后恢复。
  - 新增 `PermissionDenied` hook、命名 subagents、`MCP_CONNECTION_NONBLOCKING=true`，明显在优化自动化与并行场景。
  - 修复大量长会话、Windows、MCP、prompt cache、history、UI 抖动与 OOM 相关问题。
  - `/buddy` 作为 4 月 1 日彩蛋上线。
- **来源：**
  - https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
  - https://github.com/anthropics/claude-code/releases

### 2) Codex
#### Codex CLI
- **状态：有更新**
- **版本/时间：0.118.0（2026-03-31 17:02，页面可见）；同日还有 `0.118.0-alpha.4/.5` 与 `0.119.0-alpha.1` 预发布**
- **关键变更：**
  - Windows sandbox 支持基于 OS 级规则的 proxy-only networking。
  - app-server 客户端新增 ChatGPT device-code 登录流。
  - `codex exec` 支持 prompt 与 stdin 组合工作流。
  - 自定义 model provider 支持动态刷新 bearer token。
  - 修复 `.codex` 首次创建保护、Linux bwrap 查找、TUI/app-server、MCP 启动与 Windows apply_patch 等问题。
- **来源：**
  - https://github.com/openai/codex/releases

#### Codex app
- **状态：no_updates**
- **原因：** 官方 `developers.openai.com/codex/changelog` 当前抓取结果仍以导航壳内容为主，未提供窗口内可验证的结构化 Codex app 更新条目。
- **来源：**
  - https://developers.openai.com/codex/changelog

### 3) Cursor
- **状态：PARTIAL（页面展示新增项，但正文抓取未暴露精确发布时间）**
- **关键变更：**
  - Self-hosted cloud agents：agent 运行和代码/密钥保留在企业自有网络。
  - Automations：可按 schedule / Slack / Linear / GitHub / PagerDuty / webhook 触发云端 agent。
  - JetBrains IDE 通过 ACP 接入 Cursor agent 能力。
  - Marketplace 新增 30+ 合作插件，扩展对更多企业系统的操作能力。
- **来源：**
  - https://cursor.com/changelog

### 4) Gemini CLI
- **状态：no_updates**
- **原因：** 官方 changelog 页面当前可见更新停留在 2025 年 9 月的周报，未检出窗口内新条目。
- **来源：**
  - https://google-gemini.github.io/gemini-cli/docs/changelogs/

### 5) Antigravity
- **状态：no_updates**
- **原因：** 官方 changelog 最近条目为 `1.21.9`（2026-03-30），按默认北京时间 09:00→09:00 窗口与“仅日期”规则，不属于“昨天或今天”日期范围。
- **来源：**
  - https://r.jina.ai/http://antigravity.google/changelog

### 6) OpenCode
- **状态：有更新**
- **版本/时间：2026-03-31 / 2026-04-01 条目可见**
- **关键变更：**
  - 为 Google Vertex Anthropic 启用 prompt caching 与 cache token tracking。
  - 新增 Windows 一等 PowerShell 支持。
  - 持续修复插件入口、TUI 输出透传、变体选择、存储迁移、异步 hooks 等问题。
- **来源：**
  - https://opencode.ai/changelog

## 模型更新

### OpenAI / Anthropic / Google / Meta 等主流模型
- **状态：no_updates**
- **原因：** 在本窗口内未检出来自官方发布页或可验证报道的“新模型正式发布 / 重大能力更新”条目；当天更显著的是 OpenAI 资本与经营数据披露，以及工具链更新。
