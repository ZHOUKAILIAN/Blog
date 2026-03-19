---
weight: 1
title: "AI日报 2026-03-19（Morning Publish）"
date: 2026-03-19
lastmod: 2026-03-19
draft: false
author: "ZHOUKAILIAN"
description: "Morning Publish 合并版：AI 日报 + IDE/CLI Changelog"
images: []
tags: ["AI", "News", "Daily", "Changelog"]
categories: ["ai"]
lightgallery: true
---

AI 日报
# AI 日报｜2026-03-19（UTC）

> 统计窗口：2026-03-18 01:00 UTC ～ 2026-03-19 01:00 UTC（北京时间昨日 09:00 ～ 今日 09:00）
> 说明：本版仅用于 Blog PR，不执行小红书发布。

## 今日重点

1. **OpenAI 小模型路线继续加速**：GPT-5.4 mini / nano 强调速度、成本和子代理协同，明确面向高并发工程流。
2. **NVIDIA 在 GTC 2026 强化“推理时代”叙事**：从平台到生态继续围绕 inference 吞吐和系统级优化。
3. **开发者工具更新密集**：Claude Code 发布 2.1.79；Codex CLI 在 GitHub 出现连续 0.116.0 alpha 预发布节奏。

## 一、模型与平台动态

### 1) OpenAI：GPT-5.4 mini / nano 发布后的落地信号持续发酵
OpenAI 官方文章披露：
- GPT-5.4 mini 相比 GPT-5 mini 在编码、推理、工具调用、多模态任务上提升，且强调更高速度。
- GPT-5.4 nano 定位最低成本档，适合分类、抽取、排序、简单代码子任务。
- 在 Codex 工作流中，官方明确推荐“大模型规划 + mini 子代理并行执行”。

**影响解读：**
- 开发侧会更明显转向“分层模型编排”，而非单模型包打天下。
- 对工程团队来说，吞吐/时延/成本三角将成为选型核心。

### 2) NVIDIA GTC 2026：平台叙事继续押注推理规模化
NVIDIA GTC 2026 更新中，核心叙事保持一致：
- inference 需求快速上升；
- 强调软硬协同、系统级优化和生态绑定；
- 面向企业部署给出更强的平台化路线。

**影响解读：**
- 2026 年 AI 基础设施竞争点正从“谁训练更强”转向“谁能稳定且低成本地提供推理产能”。

## 二、生态与工具侧

### 3) Claude Code 2.1.79 发布
在窗口期内可见 Claude Code v2.1.79 更新，重点包括：
- `claude auth login` 新增 `--console`；
- `/config` 新增回合耗时显示开关；
- 修复 `-p` 模式和 Ctrl+C 等稳定性问题；
- VSCode 集成新增 `/remote-control`，并改进会话体验。

### 4) Codex CLI：0.116.0 alpha 连续预发布
GitHub Releases 显示 Codex CLI 在窗口期内连续发布多版 alpha（如 `0.116.0-alpha.5` 到 `0.116.0-alpha.11`），体现高频迭代。可见方向包括：
- 子代理与审批流（guardian / wait_agent）演进；
- 工具与实时会话链路增强；
- `codex exec --profile` 等行为修复与稳定性增强。

## 三、来源

- OpenAI（官方）：https://openai.com/index/introducing-gpt-5-4-mini-and-nano/
- NVIDIA（官方）：https://blogs.nvidia.com/blog/gtc-2026-news/
- Claude Code Release：https://github.com/anthropics/claude-code/releases/tag/v2.1.79
- Codex Releases：https://github.com/openai/codex/releases

---

IDE/CLI changelog
# AI Frontier Changelog｜2026-03-19（UTC）

> 统计窗口：2026-03-18 01:00 UTC ～ 2026-03-19 01:00 UTC（北京时间昨日 09:00 ～ 今日 09:00）
> 状态：**PARTIAL**（部分源在窗口内无结构化更新）

## IDE / CLI 更新

### 1) Claude Code
- **状态：有更新**
- **版本/时间：v2.1.79（窗口内可见）**
- **关键变更：**
  - 新增 `claude auth login --console`（Anthropic Console 计费认证）
  - `/config` 增加“显示回合耗时”选项
  - 修复 `claude -p` 子进程挂起、`Ctrl+C` 在 print 模式失效等问题
  - VSCode 增加 `/remote-control`，并改进 session tab 标题与 UI 细节
- **来源：**
  - https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md
  - https://github.com/anthropics/claude-code/releases/tag/v2.1.79

### 2) Codex
#### Codex CLI
- **状态：有更新（预发布）**
- **版本/时间：0.116.0-alpha.*（窗口内连续发布）**
- **关键变更：**
  - 连续 alpha 版本发布，体现高频迭代节奏
  - 子代理/审批流与工具链路持续增强
  - `codex exec --profile` 等稳定性修复进入发布说明
- **来源：**
  - https://github.com/openai/codex/releases

#### Codex app
- **状态：no_updates**
- **原因：** 本轮抓取到的 `developers.openai.com/codex/changelog` 为导航壳内容，缺少窗口内可验证的结构化“Codex app”变更条目；未找到同窗口官方 app 版本日志证据。
- **来源：**
  - https://developers.openai.com/codex/changelog

### 3) Cursor
- **状态：有更新（页面可见新增项）**
- **关键变更：**
  - Marketplace 新增多家合作插件
  - 推出 Automations（可基于事件/调度触发云端 agent）
  - JetBrains IDE 支持（ACP）
- **来源：**
  - https://cursor.com/changelog

### 4) Gemini CLI
- **状态：no_updates（窗口内）**
- **原因：** 官方 changelog 页可见最近条目为 2025 年版本周报，未检出窗口内新条目。
- **来源：**
  - https://google-gemini.github.io/gemini-cli/docs/changelogs/

### 5) Antigravity
- **状态：有更新（窗口附近）**
- **版本/时间：1.20.6（2026-03-17）**
- **关键变更：**
  - 修复 rules/workflows 无法创建问题
- **来源：**
  - https://r.jina.ai/http://antigravity.google/changelog

### 6) OpenCode
- **状态：有更新（窗口内）**
- **版本/时间：2026-03-18 / 2026-03-16 条目可见**
- **关键变更（节选）：**
  - Core/TUI/Desktop 多项稳定性修复
  - 会话、工作区、权限与工具链路持续重构
  - 多个平台兼容与性能改进
- **来源：**
  - https://opencode.ai/changelog

## 模型更新

### OpenAI GPT-5.4 mini / nano
- **状态：有更新（官方发布信息持续有效）**
- **关键点：**
  - mini 面向高吞吐编码与子代理并行
  - nano 面向低成本高速度任务
  - mini 在 Codex / API / ChatGPT（部分入口）可用
- **来源：**
  - https://openai.com/index/introducing-gpt-5-4-mini-and-nano/

### 其他主流模型
- **状态：no_updates（窗口内未检出可验证重大发布）**

