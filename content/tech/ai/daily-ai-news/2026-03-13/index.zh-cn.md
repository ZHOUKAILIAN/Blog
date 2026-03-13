---
weight: 1
title: "AI日报 2026-03-13（Morning Publish）"
date: 2026-03-13
lastmod: 2026-03-13
draft: false
author: "ZHOUKAILIAN"
description: "Morning Publish 合并版：AI 日报 + IDE/CLI Changelog"
images: []
tags: ["AI", "News", "Daily", "Changelog"]
categories: ["ai"]
lightgallery: true
---

AI 日报
# AI日报 2026-03-11

## 今日总览
- 今天的核心判断：**模型层面进入“发布后消化期”，工具层面进入“高频工程化迭代期”**。
- 在可验证公开源中，OpenAI 本周（3/5）发布 GPT-5.4/5.4 Pro 仍是当前最强信号；Cursor、Claude Code、Codex、OpenCode 在近 24~72 小时继续围绕自动化、权限与稳定性迭代。
- 对团队落地的现实意义：从“用上 AI”转为“让 AI 可靠跑在流程里”。

## 关键新闻与来源

1) **OpenAI API：GPT-5.4 与 GPT-5.4 Pro 进入 API 主线能力集**
- 来源：OpenAI API Changelog（2026-03-05）
- 链接：https://developers.openai.com/api/docs/changelog
- 要点：发布 GPT-5.4 / GPT-5.4-pro；上线 Tool search、Computer use、1M context window 与 compaction。
- 解读：这组能力组合标志着 Agent 从“问答增强”向“任务执行与长流程编排”全面迁移。

2) **Cursor：Automations 与 JetBrains ACP 扩张了 Agent 的触达面**
- 来源：Cursor Changelog（03-04/03-05）
- 链接：https://cursor.com/changelog
- 要点：Automations 支持定时/事件触发（Slack/Linear/GitHub/PagerDuty/Webhook）；并宣布可在 JetBrains IDE 体系接入 Cursor ACP。
- 解读：Cursor 正在从“编辑器能力”走向“组织级自动化节点”。

3) **Claude Code v2.1.72：继续强化长会话稳定性与权限策略**
- 来源：Claude Code Releases
- 链接：https://github.com/anthropics/claude-code/releases
- 要点：新增 `CLAUDE_CODE_DISABLE_CRON`；/plan、/config、权限匹配、并行工具调用、语音与会话恢复等大量细节修复。
- 解读：方向清晰——提高可持续运行能力，降低生产中断与误提示成本。

4) **Codex 0.114.0：实验能力与权限流继续前推**
- 来源：openai/codex Releases
- 链接：https://github.com/openai/codex/releases
- 要点：新增实验 code mode、hooks engine 起步、app-server 健康检查端点、系统 skill 全局禁用开关、权限持久化与恢复修复。
- 解读：重点从“单次完成率”转向“多回合、多会话、可治理的执行体验”。

5) **OpenCode（opencode.ai）继续高频交付工作区与兼容性修复**
- 来源：OpenCode Changelog
- 链接：https://opencode.ai/changelog
- 要点：TUI 引入 workspace 初始支持；增加 Copilot GPT-5.4 xhigh 支持；桌面端在滚动、会话状态、权限提示等方面大量修补。
- 解读：开源/社区路线继续用高迭代速度抢占“终端+桌面混合”开发场景。

6) **Anthropic News：近期新增以政策/立场声明与 Sonnet 4.6 产品发布并行**
- 来源：Anthropic Newsroom
- 链接：https://www.anthropic.com/news
- 要点：2/17 发布 Claude Sonnet 4.6；3/5 等条目为政策与对外声明更新。
- 解读：产品与政策叙事并进，显示其在商业化扩展外也在强化公共议题定位。

## 综合结论
1. **短期（本周）**：模型大版本节奏放缓，但“工具能力 + 上下文管理 + 执行接口”进入收敛。  
2. **中期（本月）**：IDE/CLI 厂商竞争焦点将集中在自动化编排、跨平台接入、权限审计与稳定性。  
3. **落地建议**：团队应优先构建“任务分级、审批策略、失败重试、运行日志”四件套，否则自动化收益会被运维摩擦抵消。

## 详细 changelog

### Claude Code
- 追踪状态：**有更新**
- 最新观测版本：`v2.1.72`
- 关键变更：
  - 新增 `CLAUDE_CODE_DISABLE_CRON`，支持会话内计划任务快速停用。
  - `/plan` 支持携带描述直接启动，减少多一步交互。
  - 权限匹配、并行工具调用、缓存与长会话退出等多个稳定性问题修复。
- 来源：https://github.com/anthropics/claude-code/releases

### Codex
- 追踪状态：**有更新**
- 最新观测版本：`0.114.0`（另见 `0.115.0-alpha.1` 预发布）
- 关键变更：
  - 实验 `code mode` 与 hooks 引擎雏形。
  - app-server 增加 `/readyz` `/healthz`，利于运维探针接入。
  - 权限申请跨 turn 持久化、恢复与兼容性修复。
- 来源：https://github.com/openai/codex/releases

### Cursor
- 追踪状态：**有更新**
- 最新观测：官方 changelog 以条目页为主（03-04/03-05），无统一语义版本号。
- 关键变更：
  - Automations（定时与事件触发）。
  - JetBrains IDE via ACP。
  - 团队插件市场、Bugbot Autofix、Cloud Agents with Computer Use。
- 来源：https://cursor.com/changelog

### OpenCode
- 追踪状态：**有更新**
- 最新观测日期：`2026-03-09`
- 关键变更：
  - 工作区（workspace）支持推进至 TUI 主线。
  - 兼容/稳定性修复持续高频（桌面端与 TUI）。
  - 模型生态接入扩展（如 Copilot GPT-5.4 xhigh）。
- 来源：https://opencode.ai/changelog

### Frontier Models（OpenAI / Anthropic / Google / xAI）
- OpenAI：**有更新（本周）**  
  - 2026-03-05：GPT-5.4 / GPT-5.4 Pro + Tool search + Computer use + 1M context + compaction。  
  - 来源：https://developers.openai.com/api/docs/changelog
- Anthropic：**no_updates**（short reason：本次抓取周期内未见新模型版本发布条目，新增主要为政策/声明类新闻）  
  - 来源：https://www.anthropic.com/news
- Google：**no_updates**（short reason：本次抓取周期内未验证到新的 Gemini 版本发布公告）
- xAI：**no_updates**（short reason：本次运行未获取到可验证的新版本发布条目）

IDE/CLI changelog
# AI Frontier Changelog（UTC 2026-03-13）

## 状态总览
**NO_UPDATES**（按“仅统计当日 UTC（2026-03-13）更新”规则过滤后，未发现符合条件的 IDE/CLI 或模型级重大更新）

---

## IDE / CLI 变更明细

### 1) Claude Code
- **no_updates**：官方 changelog 可见最新版本为 `2.1.74`，但结合 npm 包时间戳看最近修改时间为 `2026-03-12T00:33:45Z`，不属于 2026-03-13 UTC 当日。
- 来源：
  - https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
  - https://www.npmjs.com/package/@anthropic-ai/claude-code （时间戳通过 `npm view @anthropic-ai/claude-code time` 校验）

### 2) Codex
- **no_updates**：Codex changelog 最近条目为 `2026-03-12`（Codex app 26.312）与 `2026-03-11`（CLI 0.114.0），无 2026-03-13 UTC 条目。
- 来源：
  - https://developers.openai.com/codex/changelog
  - https://github.com/openai/codex/releases/tag/rust-v0.114.0

### 3) Cursor
- **no_updates**：changelog 最新可见条目为 `03-11-26`（New Plugins on the Cursor Marketplace），无 2026-03-13 UTC 条目。
- 来源：
  - https://cursor.com/changelog
  - https://cursor.com/changelog/03-11-26

### 4) Gemini CLI
- **no_updates**：官方 changelog 页面最新可见为 `v0.7.0 - 2025-09-22`，无 2026-03-13 UTC 条目。
- 来源：
  - https://google-gemini.github.io/gemini-cli/docs/changelogs/

### 5) Antigravity
- **no_updates**：最新版本 `1.20.5` 日期为 `Mar 9, 2026`，无 2026-03-13 UTC 条目。
- 来源：
  - https://antigravity.google/changelog

### 6) OpenCode
- **no_updates**：最新条目为 `Mar 12, 2026`，无 2026-03-13 UTC 条目。
- 来源：
  - https://opencode.ai/changelog

---

## 模型更新明细（Frontier Models）

### OpenAI（GPT / Codex 系列）
- **no_updates**：检索到的公开模型相关更新集中在 3/5–3/10（如 GPT-5.4、GPT-5.2-Codex 等），未见 2026-03-13 UTC 当日新发布/重大能力更新。
- 来源：
  - https://openai.com/index/introducing-gpt-5-4/
  - https://openai.com/index/introducing-gpt-5-2-codex/
  - https://openai.com/index/introducing-upgrades-to-codex/

### Anthropic（Claude 系列）
- **no_updates**：公开可检索信息未显示 2026-03-13 UTC 当日模型发布或重大能力更新（近期可见信息早于该日期）。
- 来源：
  - https://docs.anthropic.com/en/release-notes/overview
  - https://www.anthropic.com/news

### Google（Gemini 系列）
- **no_updates**：检索结果显示近期条目（如 Gemini 3.1 Pro）早于 2026-03-13 UTC，当日未见新增模型发布/重大能力更新。
- 来源：
  - https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/
  - https://blog.google/innovation-and-ai/
