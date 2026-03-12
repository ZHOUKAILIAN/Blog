AI 日报
# AI + Web3 情报日报 [2026-03-11] | 共6条
━━━━━━━━━━━━━━━━━━━━━━

## 🔴 OpenAI把“多模型”并成一把刀
OpenAI 发布 GPT-5.4，并把此前分散在不同型号里的能力做了合并：推理、编程和“可操作电脑/软件”的 Agent 能力放到同一代里。同步上线 GPT-5.4 Pro，并向 Plus/Team/Pro 与 API 用户开放。官方披露相较 GPT-5.2，单条事实性错误概率下降约 **33%**，整段回答含错概率下降约 **18%**。  
**为什么看这条：** 如果你在做企业内 AI 落地，这意味着“选型复杂度”下降，可以用一个主模型覆盖更多业务链路。  
**[Fortune]**

━━━━━━━━━━━━━━━━━━━━━━

## 🔴 Anthropic“营收口径”争议，给估值浇了盆冷水
路透 Breakingviews 援引法庭文件称，Anthropic CFO 提到累计收入已超 **50亿美元**（对应 2023-2025 的 GAAP 口径）；但公司此前对外又出现过 **140亿~190亿美元 run-rate** 的说法。两者差异核心在于：run-rate 是短期消费外推，波动很大，尤其在按量计费占比高时更敏感。  
**为什么看这条：** 看 AI 公司时要分清“已确认收入”和“外推年化”，否则会高估商业化节奏。  
**[Reuters Breakingviews]**

━━━━━━━━━━━━━━━━━━━━━━

## 🔴 a16z Crypto再募资，Web3 风险资本回暖但更克制
CoinDesk 报道称 a16z crypto 计划为第五只基金募资约 **20亿美元**，目标在 2026 年上半年完成。对比其 2023 年第四只基金 **45亿美元**，这次规模明显收敛，但仍高于近期不少同类募资。市场信号是：资金仍在押注下一波区块链基础设施与应用，但更看重现金流与落地节奏。  
**为什么看这条：** 做 AI+Web3 项目现在更适合“先证明商业闭环，再讲平台故事”。  
**[CoinDesk]**

━━━━━━━━━━━━━━━━━━━━━━

## 🟡 AI基础设施继续吸金，光互连成为硬件主线之一
Crunchbase 周度大额融资里，Ayar Labs 获 **5亿美元** E 轮，估值约 **37.5亿美元**，聚焦 AI 基建中的共封装光学（CPO）方向。同一周美国市场出现多笔 5 亿美元级别融资，说明资本仍在追“算力效率”而不只是追“模型故事”。  
**为什么看这条：** 如果你做推理成本优化、机房架构或边缘部署，硬件效率红利还在继续释放。  
**[Crunchbase News]**

━━━━━━━━━━━━━━━━━━━━━━

## 🟡 华尔街开始讨论“AI交易拥挤后的轮动”
CoinDesk 引述 BlackRock、UBS 等观点：AI 叙事并未结束，但“最容易赚的一段”可能过去，资金可能从少数超大科技股向更分散板块轮动。文中也提到比特币在部分场景下仍被当作高贝塔科技代理，但是否能稳定承担“美元对冲”角色仍有争议。  
**为什么看这条：** 做资产配置或行业判断时，不能只押单一 AI 主线，要准备“AI+非AI”的双线组合。  
**[CoinDesk]**

━━━━━━━━━━━━━━━━━━━━━━

## 🟡 OpenAI企业工具继续往办公核心软件里打
除模型发布外，OpenAI 同步推进 ChatGPT for Excel/Google Sheets（测试）及金融数据生态集成（如 FactSet、MSCI、Moody’s 等）。这说明企业竞争重点正在从“谁模型更强”转向“谁能嵌进现有工作流并减少切换成本”。  
**为什么看这条：** 真正决定付费留存的往往不是榜单分数，而是是否嵌入你每天都开的软件。  
**[Fortune]**

━━━━━━━━━━━━━━━━━━━━━━

## 🟢 速览
- 大资金继续押注 AI 周边基础设施，融资重心偏“算力效率/数据通路”而非纯应用层叙事。  
- AI 公司的商业指标披露越来越复杂，“GAAP收入 vs run-rate”将成为投研与采购尽调的必查项。  
- Web3 风险投资没有熄火，但从“规模优先”转向“确定性优先”，对 AI+Web3 项目更看重可验证增长。  
**[Crunchbase / Reuters Breakingviews / CoinDesk]**

━━━━━━━━━━━━━━━━━━━━━━

**今日总结：**  
今天的核心不是“又一个新模型”，而是三件更重要的事：**模型能力整合、营收口径回归现实、资本风格转向确定性**。如果你在做 AI 或 AI+Web3，当前最优策略是：先把业务链路跑通、把单位经济模型做实，再去放大叙事。

IDE/CLI changelog
# AI Frontier Changelog（2026-03-11 10:10 UTC）

**状态：PARTIAL**  
- 已完成：Claude Code、Codex、Cursor、Gemini CLI、OpenCode、模型侧（OpenAI/Anthropic）  
- 部分受限：Antigravity 官方发布页可访问但正文无法抓取（疑似前端动态渲染）；仅补充次级来源线索并标注非官方验证级别。

---

## 1) IDE / CLI 变更

## Claude Code
**版本/时间：2.1.72（近期开源 changelog 条目）**

### 重点更新（实质性）
- 新增 `/copy` 的 `w` 直写文件能力（远程 SSH 场景更实用）。
- 新增 `/plan <description>` 快捷进入并立即启动计划模式。
- 新增 `ExitWorktree` 工具；支持退出 `EnterWorktree` 会话。
- 新增 `CLAUDE_CODE_DISABLE_CRON`，可在会话中即时停止已调度 cron 任务。
- Effort 档位简化为 low/medium/high，并优化 UI 呈现与默认恢复逻辑。
- 大量稳定性与权限系统修复（含 sandbox 规则匹配、并行工具调用失败级联、长会话 CPU/退出问题、插件安装与缓存问题等）。

**来源：**
- https://code.claude.com/docs/en/changelog  
- https://github.com/anthropics/claude-code/releases

---

## Codex
**版本/时间：Codex CLI 0.114.0（2026-03-11）**

### 重点更新（实质性）
- 新增**实验性 code mode**（更隔离的编码工作流）。
- 新增**实验性 hooks engine**（SessionStart / Stop 事件）。
- WebSocket app-server 增加 `/readyz` 与 `/healthz` 健康检查端点。
- 支持关闭 bundled system skills（配置开关）。
- Handoff 现在可携带实时 transcript 上下文，跨回合交接连续性更好。
- 权限流与 `apply_patch` 一致性修复；Linux tmux crash、线程恢复卡住等关键稳定性修复。

**来源：**
- https://developers.openai.com/codex/changelog/  
- https://github.com/openai/codex/releases/tag/rust-v0.114.0

---

## Cursor
**版本/时间：2026-03-05 / 03-04 / 2.6（官方 changelog）**

### 重点更新（实质性）
- **Automations** 上线：可按计划或事件（Slack/Linear/GitHub/PagerDuty/Webhook）触发常驻云端代理。
- **JetBrains IDE 支持**（通过 ACP）：在 IntelliJ/PyCharm/WebStorm 等中使用 Cursor agent 能力。
- **MCP Apps + Team Plugin Marketplace**：在对话内嵌交互 UI，并支持团队私有插件分发治理。
- **Bugbot Autofix**：自动修复 PR 中问题并回推建议更改。

**来源：**
- https://cursor.com/changelog  
- https://cursor.com/blog/automations

---

## Gemini CLI
**版本/时间：v0.32.1 Stable（2026-03-04）**

### 重点更新（实质性）
- Plan Mode 增强：支持外部编辑器修改计划、复杂任务多选流程等。
- 启用 generalist agent，增强任务委派与子代理编排。
- 新增 interactive shell 自动补全。
- 并行加载扩展、A2A streaming 重组、终端关闭后孤儿进程防护等稳定性增强。
- 配额与计费：新增 overage/billing telemetry 与更完善 fallback 路径。

**来源：**
- https://geminicli.com/docs/changelogs/latest/  
- https://github.com/google-gemini/gemini-cli/releases

---

## Antigravity
**状态：no_updates（官方页可达但正文不可提取）**  
**短原因：** `https://antigravity.google/releases` 与 `/changelog` 当前抓取仅返回壳页面文本，无法稳定提取条目内容。  
**补充线索（非官方聚合/二级来源，待官方页复核）：**
- 疑似 1.20.3（2026-03-05）含 AGENTS.md 规则读取、Auto-continue 默认化、会话与稳定性改进等。

**来源：**
- 官方（正文不可提取）：https://antigravity.google/releases  
- 官方（正文不可提取）：https://antigravity.google/changelog  
- 次级线索（非官方验证级别）：https://releasebot.io/updates/google/antigravity

---

## OpenCode
**版本/时间：2026-03-03 ~ 2026-03-09（官方 changelog）**

### 重点更新（实质性）
- 初步引入 **workspace** 能力到 TUI / Core（含远程工作区基础支持）。
- 新增/增强模型适配（如 Copilot GPT-5.4 xhigh、Codex 允许模型列表更新）。
- 强化进程与资源管理（防孤儿 MCP 子进程、防 fsmonitor 泄漏、TUI 退出/TTY 清理修复）。
- 大量 Desktop/TUI 交互稳定性改进（滚动、会话切换、侧边栏、review 面板、性能抖动等）。

**来源：**
- https://opencode.ai/changelog  
- https://github.com/anomalyco/opencode/releases

---

## 2) 模型更新（Frontier Models）

## OpenAI
**时间：2026-03-05 / 2026-03-03**

### 重点更新（实质性）
- 发布 **GPT-5.4**（Responses + Chat Completions）与 **GPT-5.4-pro**（Responses）。
- GPT-5.4 引入：工具搜索（tool search）、内建 computer use、1M context + 原生 compaction 支持。
- 发布 **gpt-5.3-chat-latest**（对齐 ChatGPT 当前 5.3 Instant 快照）。

**来源：**
- https://developers.openai.com/api/docs/changelog/

---

## Anthropic
**时间：2026-03（模型向新增较少）**

### 重点更新（实质性）
- 3 月可见条目更多是产品功能（如 memory for free users），**模型层本月暂无明确新大版本发布条目**。
- 最近一次关键模型发布（仍具参考价值）：  
  - Claude Sonnet 4.6（2026-02-17）  
  - Claude Opus 4.6（2026-02-05）

**来源：**
- https://support.claude.com/en/articles/12138966-release-notes  
- https://www.anthropic.com/news/claude-sonnet-4-6  
- https://www.anthropic.com/news/claude-opus-4-6

---

## Google/Gemini 模型侧
**状态：no_updates（本次检索受限）**  
**短原因：** 本轮外部搜索触发速率限制（429），且部分官方页面动态渲染导致抓取困难；未拿到可稳定复核的“模型级”官方新增条目。  
**后续建议：** 下一轮优先补拉官方模型发布页再合并。
