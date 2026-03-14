---
title: "每日 AI 情报 2026-03-14"
date: 2026-03-14
lastmod: 2026-03-14
draft: false
author: "ZHOUKAILIAN"
description: "AI + Web3 每日情报：IDE/CLI 前沿能力持续迭代，Agent 基础设施与生态联动增强。"
tags: ["AI", "Daily News", "Web3", "Agent"]
categories: ["ai"]
---

# AI + Web3 情报日报 [2026-03-14] | 共5条

> 统计窗口：近 24-48 小时（截至 2026-03-14 03:10 UTC）
> 说明：本期可高置信核验的新增信号主要来自 IDE/CLI 官方 changelog 与行业媒体一手报道。

━━━━━━━━━━━━━━━━━━━━━━

[🔴] OpenCode 连续两日高频迭代，聚焦企业可用性与多端稳定性

OpenCode 在 3 月 12-13 日 changelog 中集中发布大量更新：包括会话历史分页、文本附件支持、多窗口桌面端、Azure 非 OpenAI completion 模型支持、以及多项权限/路径安全限制（如禁止访问系统目录）。

为什么看这条：这类“高频 + 多层（Core/TUI/Desktop）”迭代，意味着工具正从“可玩”走向“可运维”，对团队试点落地价值更高。

来源：
- https://opencode.ai/changelog

━━━━━━━━━━━━━━━━━━━━━━

[🟡] Cursor 扩展生态加速：新增 30+ 插件，MCP 工具接入面显著扩大

Cursor 3 月 11 日 changelog 显示新增 30+ 官方市场插件（含 Atlassian、Datadog、GitLab、Hugging Face 等），并强调云端 agent 可直接调用这些插件中的 MCP 能力。

为什么看这条：Agent 的真实价值取决于“可调用系统边界”，插件与 MCP 覆盖面扩大，通常会直接提升企业内工作流自动化深度。

来源：
- https://cursor.com/changelog/03-11-26

━━━━━━━━━━━━━━━━━━━━━━

[🟡] Cursor Automations 进入可用阶段，Agent 定时/事件触发流程产品化

Cursor 3 月 5 日发布 Automations：支持按计划任务或由 Slack、Linear、GitHub、PagerDuty、Webhook 触发执行，并在云沙箱内运行配置好的模型与 MCP。

为什么看这条：从“手动唤起 Agent”到“持续运行 Agent”是组织采用门槛的重要拐点，直接关系到 ROI 和流程替代率。

来源：
- https://cursor.com/changelog/03-05-26

━━━━━━━━━━━━━━━━━━━━━━

[🟡] Google Antigravity 1.20.5 发布，强化 AGENTS.md 规则读取与长会话性能

Google Antigravity changelog（3 月 9 日）显示：新增对 AGENTS.md 规则读取支持、默认启用 auto-continue、并改进长会话加载与 token 统计稳定性。

为什么看这条：规则文件兼容与长会话性能优化，是 Agent 在复杂工程仓库中可持续运行的基础能力。

来源：
- https://antigravity.google/changelog

━━━━━━━━━━━━━━━━━━━━━━

[🟢] AI × Crypto 联动升温：Nvidia 开源 Agent 平台预期带动 AI 代币板块走强

CoinDesk 报道称，受 Nvidia 计划发布开源自治 Agent 平台消息影响，AI 相关代币板块市值短线走强（文中提及 TAO、NEAR、ICP 等）。

为什么看这条：无论短期价格波动是否持续，这反映出市场正在把“Agent 基础设施路线图”作为 AI+Web3 叙事的关键变量。

来源：
- https://www.coindesk.com/markets/2026/03/10/ai-tokens-rally-after-nvidia-open-source-agent-plan-beating-coindesk-20

━━━━━━━━━━━━━━━━━━━━━━

## Frontier Updates（IDE/CLI + 模型）

- Claude Code：本次窗口未检索到可明确锚定发布日期（24-48h）的新增条目；保留观察。
  - 参考：https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
- Codex：官方 changelog 页面当前抓取结果以导航内容为主，未稳定提取到新增条目；保留观察。
  - 参考：https://developers.openai.com/codex/changelog
- Cursor：有更新（插件扩展、Automations 持续推进）。
- Gemini CLI：本次窗口无 24-48h 内新增版本（页面最新可见更新停留在 2025-09）。
  - 参考：https://google-gemini.github.io/gemini-cli/docs/changelogs/
- OpenCode：有更新（3/12-3/13 多项迭代）。
- Antigravity：近期版本 1.20.5（3/9），本窗口无更近版本。

━━━━━━━━━━━━━━━━━━━━━━

## 今日总结

今天的主线很清晰：**Agent 工具链正在从“模型能力竞争”转向“系统接入与流程自动化竞争”**。Cursor 与 OpenCode 的更新都在强化“可接系统、可持续运行、可组织协作”的能力。对团队实践而言，建议优先评估两类指标：

1. MCP/插件可连接的关键系统覆盖率（Jira/GitHub/监控/数据仓）；
2. 自动化任务在真实流程中的闭环完成率（触发 → 执行 → 回写）。

当这两项指标稳定后，Agent 才会真正从“效率工具”变成“生产流程节点”。