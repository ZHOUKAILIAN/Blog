---
title: "AI 日报与前沿变更（2026-03-09）"
date: 2026-03-09T11:16:00Z
draft: false
categories: ["tech", "ai"]
tags: ["AI日报", "Claude Code", "Codex", "Cursor", "OpenCode", "模型更新"]
---

## 今日摘要
今天的可验证增量主要来自开发工具链：Codex 与 OpenCode 均在 24 小时内发布了新版本，Claude Code 发布了 2.1.71 并包含多项可落地修复；Cursor 更新聚焦自动化代理与 JetBrains 集成。模型侧仅确认到 Anthropic 在 2 月中旬发布 Sonnet 4.6，今天未检索到同等级官方新增发布，按 `no_updates` 处理。

## AI 新闻（综合）
1. **AI 编码工具持续高频迭代**：Codex、Claude Code、OpenCode 均出现近日更新，说明「代理式开发 + 云端执行」仍在加速。
2. **Cursor 强化“持续运行代理”范式**：Automation + 事件触发（Slack/Linear/GitHub/PagerDuty/Webhook）把 IDE 从“对话工具”推进到“运维执行面板”。
3. **企业治理成为新主线**：Cursor Team 插件市场、Claude 企业侧产品节奏，都在强调权限、审计、组织级分发。

## IDE / CLI Changelog（前沿）

### 1) Claude Code — 2.1.71（有实质更新）
- 新增 `/loop` 周期执行命令。
- 新增会话内 cron 调度工具。
- 新增 `voice:pushToTalk` 可重绑按键（默认 Space）。
- 修复长会话 stdin 冻结问题。
- 修复 voice 模式启动 5–8 秒卡顿问题。
- 修复 `/fork` 分支共用 plan 文件导致互相覆盖。
- 改进：推迟原生图像处理器加载以提升冷启动。

### 2) Codex（openai/codex）— rust-v0.113.0-alpha.1（有实质更新）
- 发布时间：2026-03-09T01:22:30Z。
- 发布标签：`rust-v0.113.0-alpha.1`（预发布）。
- 发布资产包含多平台构建（含 dmg/binary）。
- 结论：处于快速 alpha 迭代窗口，建议仅在灰度环境跟进。

### 3) Cursor Changelog（有实质更新）
- 新增 **Automations**：支持按计划/事件触发的常驻 Agent。
- 新增 **JetBrains ACP**：可在 IntelliJ/PyCharm/WebStorm 使用 Cursor Agent。
- 新增 **MCP Apps + Team 插件市场**：支持团队私有插件治理。
- Bugbot 增加自动修复 PR 流程（Autofix）。

### 4) OpenCode（anomalyco/opencode）— v1.2.22（有实质更新）
- 发布时间：2026-03-08T22:35:21Z。
- 发布标签：`v1.2.22`。
- 发布资产更新 `latest-linux.yml` / `latest-mac.yml` 等打包元数据。

## 模型更新（Frontier）
- Anthropic Newsroom 可确认最近一次模型级发布：**Claude Sonnet 4.6（2026-02-17）**。
- 截至本次生成时段，未检索到同等可信来源下的“今日新增 frontier 模型发布”可交叉确认条目。
- **结论：`no_updates`**。

## 行动建议
1. 若你团队重度依赖 IDE Agent：优先验证 Cursor Automations 与 JetBrains ACP 的权限与审计策略。
2. 若你用 Claude Code 做长会话：建议尽快升级 2.1.71，重点收益在卡顿与会话稳定性。
3. Codex/OpenCode 暂按“日更追踪 + 周更合入”策略，避免每日直接进入主干开发流。

## 信源
- Claude Code Changelog（GitHub raw）
- OpenAI Codex Releases API
- Cursor Changelog 页面
- anomalyco/opencode Releases API
- Anthropic Newsroom
