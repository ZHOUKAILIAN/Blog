---
weight: 1
title: "AI日报 2026-04-02（Morning Publish）"
date: 2026-04-02
lastmod: 2026-04-02
draft: false
author: "ZHOUKAILIAN"
description: "Morning Publish 合并版：AI 日报 + IDE/CLI Changelog"
images: []
tags: ["AI", "News", "Daily", "Changelog"]
categories: ["ai"]
lightgallery: true
---

AI 日报
# AI 日报｜2026-04-02（UTC）

> 统计窗口：2026-04-01 01:00 UTC ～ 2026-04-02 01:00 UTC（北京时间昨日 09:00 ～ 今日 09:00）
> 说明：本版仅用于 Blog PR，不执行小红书发布。
> 状态：**SUCCESS**

## 今日重点

1. **OpenAI 宣布超大额融资并把“AI 超级应用”写进路线图**：公司披露完成 **1220 亿美元** committed capital 融资，投后估值 **8520 亿美元**，同时明确要把 ChatGPT、Codex、浏览与 agent 能力整合为统一入口。
2. **Google 用月度汇总把 3 月产品方向说透了**：重点押注 Search Live 全球扩张、Workspace 深度接入 Gemini、Personal Intelligence 扩围，以及 Gemini 3.1 Flash-Lite / Flash Live 与 AI Studio “vibe coding”升级。
3. **前沿开发工具继续高频迭代**：Claude Code 已到 **2.1.90**；Codex GitHub Releases 在窗口内出现 **0.119.0-alpha.2**；OpenCode、Cursor、Antigravity 也都出现了可验证更新。

## 一、平台与公司动态

### 1) OpenAI：1220 亿美元融资落地，正式把 ChatGPT + Codex + Browser 统合为“AI superapp”
OpenAI 官方在窗口内发布融资公告，核心信息包括：
- 完成 **1220 亿美元 committed capital** 融资，投后估值 **8520 亿美元**；
- 参投/领投阵容覆盖 Amazon、NVIDIA、SoftBank、Microsoft、a16z、BlackRock、Sequoia 等；
- 披露经营面数据：ChatGPT 超 **9 亿周活**、企业收入占比已超 **40%**、Codex 周活超 **200 万**；
- 明确提出要构建统一的 **AI superapp**，把 ChatGPT、Codex、浏览器能力和更广义 agent 工作流整合在一个入口里。

**影响解读：**
- 这不只是融资新闻，更像是 OpenAI 对外确认“产品形态从聊天入口转向 agent 操作系统”的阶段宣言。
- 对开发者生态来说，Codex 被放进统一分发面，意味着编码 agent 不再只是独立工具，而是 OpenAI 整体平台战略的一部分。

### 2) Reuters：OpenAI 继续向私募资本强化企业 AI 叙事
Reuters OpenAI 聚合页在窗口内可见两条值得关注的增量：
- OpenAI 正向私募股权机构给出更积极条款，以对抗 Anthropic 在企业 AI 联营/融资上的竞争；
- ChatGPT 广告试点在美国上线六周内，已达到 **1 亿美元 ARR** 量级。

**影响解读：**
- 一边是资本层继续加杠杆，一边是广告和企业业务开始证明变现能力，说明头部 AI 公司竞争已经从模型参数战转向“融资能力 + 分发能力 + 商业化速度”的组合战。

## 二、产品与模型动向

### 3) Google：3 月 AI 汇总暴露出四条主线——搜索、办公、个性化、低延迟模型
Google 在 4 月 1 日发布 3 月 AI 汇总，落在本次统计窗口内。可提炼出的重点包括：
- **Search Live** 在 AI Mode 覆盖地区全球扩张到 200+ 国家和地区；
- Gemini 在 **Docs / Sheets / Slides / Drive** 的生产力能力继续加深；
- **Personal Intelligence** 从 Search 扩展到 Gemini in Chrome 与 Gemini App；
- 发布 **Gemini 3.1 Flash-Lite** 与 **Gemini 3.1 Flash Live**，同时升级 Google AI Studio 的全栈 “vibe coding” 体验，并把 Antigravity coding agent 嵌入其中。

**影响解读：**
- Google 的节奏很明确：先用 Search、Workspace 和手机入口拿分发，再用更低延迟/更低成本模型去吃高频交互与开发者场景。
- “从别家 AI 应用迁移聊天记录和记忆到 Gemini” 这件事也很关键，说明 2026 年竞争点已从“抢第一次使用”变成“抢长期上下文归属权”。

## 三、来源

- OpenAI（官方）：https://openai.com/index/accelerating-the-next-phase-ai/
- Google Blog（官方）：https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-march-2026/
- Reuters OpenAI 聚合页：https://www.reuters.com/technology/openai/

---

IDE/CLI changelog
# AI Frontier Changelog｜2026-04-02（UTC）

> 统计窗口：2026-04-01 01:00 UTC ～ 2026-04-02 01:00 UTC（北京时间昨日 09:00 ～ 今日 09:00）
> 状态：**SUCCESS**

## IDE / CLI 更新

### 1) Claude Code
- **状态：有更新**
- **版本：2.1.90**
- **关键变更：**
  - 新增 `/powerup` 交互式教学入口；
  - 强化 PowerShell 权限检查，补了一批安全边界；
  - 修复 `--resume`、`Edit/Write`、hook 阻断、权限弹窗和长会话性能问题；
  - 优化 MCP schema cache、SSE 大帧处理与 transcript 写入性能。
- **来源：**
  - https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md

### 2) Codex
#### Codex CLI
- **状态：有更新（预发布）**
- **版本/时间：0.119.0-alpha.2（GitHub Releases 页面在窗口内可见）**
- **关键变更：**
  - Windows sandbox 新增更强的 proxy-only networking 支持；
  - app-server 客户端支持 device code 登录；
  - `codex exec` 支持 prompt 与 stdin 混合输入；
  - 动态 bearer token、MCP 启动稳定性、TUI `/copy` / `/resume` / skills picker 等问题得到修复。
- **来源：**
  - https://github.com/openai/codex/releases

#### Codex app
- **状态：no_updates（独立官方 app changelog 证据不足）**
- **原因：** `developers.openai.com/codex/changelog` 本次抓取到的是站点壳与导航主体，缺少可稳定抽取的窗口内结构化 app 更新条目。
- **来源：**
  - https://developers.openai.com/codex/changelog

### 3) Cursor
- **状态：有更新**
- **关键变更：**
  - 最新官方 changelog 可见 **Self-hosted Cloud Agents**；
  - 保持了“云端 agent + 私有网络执行”的产品方向；
  - 继续强化多模型 harness、插件与企业可控部署。
- **来源：**
  - https://cursor.com/changelog

### 4) Gemini CLI
- **状态：no_updates（窗口内）**
- **原因：** 官方 changelog 页本次抓取到的最近结构化条目仍停留在 2025 年周更摘要，不属于本窗口。
- **来源：**
  - https://google-gemini.github.io/gemini-cli/docs/changelogs/

### 5) Antigravity
- **状态：有更新**
- **版本：1.21.9（2026-03-30，窗口附近最近条目）**
- **关键变更：**
  - 修复新用户无法完成 onboarding 的问题；
  - 结合此前 1.21.6，可见其在 Linux sandboxing、MCP 认证与 Manager 体验上仍在继续打磨。
- **来源：**
  - https://r.jina.ai/http://antigravity.google/changelog

### 6) OpenCode
- **状态：有更新**
- **版本/时间：2026-04-01 / 2026-03-31 条目可见**
- **关键变更：**
  - 开启 Google Vertex Anthropic prompt caching 与 token tracking；
  - 持续修复插件安装、TUI 渲染、会话迁移与存储稳定性问题；
  - 在插件、扩展与多 provider 适配层面仍保持很快的迭代速度。
- **来源：**
  - https://opencode.ai/changelog

## 模型更新

### Google Gemini 3.1 Flash-Lite / Flash Live
- **状态：有更新（通过 Google 4 月 1 日官方月报再次确认并扩大分发）**
- **关键点：**
  - Flash-Lite 主打更低成本、更低延迟；
  - Flash Live 主打实时语音/音频交互体验；
  - 已与 Search Live、Gemini Live 和 Google AI Studio 形成更完整联动。
- **来源：**
  - https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-march-2026/

### 其他主流模型
- **状态：no_major_new_release（本窗口未检出更强的官方新增模型发布证据）**
