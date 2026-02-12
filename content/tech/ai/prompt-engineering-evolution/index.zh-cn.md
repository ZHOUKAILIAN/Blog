---
weight: 2
title: "提示词工程演进：Agent 的认知核心"
date: 2026-02-11
lastmod: 2026-02-11
draft: false
author: "ZHOUKAILIAN"
description: "本文聚焦于 Agent 发展背后的认知引擎——提示词工程（Prompt Engineering）。我们从 Zero-shot 到 ReAct 再到 Reflexion，系统梳理了如何通过 Prompt 激发大模型的推理、规划与自我反思能力。提示词不仅是对话的艺术，更是 Agent 系统认知的源头，许多架构模式（如 Function Calling）最初都是由 Prompt 技术启发而来。"
images: []
tags: ["AI", "Prompt Engineering", "CoT", "ReAct", "Reflexion"]
categories: ["ai"]
lightgallery: true
---

# 提示词工程演进：Agent 的认知核心

Agent 系统的强大不仅取决于架构（身体），更取决于核心模型的认知能力（大脑）。而**提示词工程 (Prompt Engineering)** 正是解锁这颗大脑潜力的钥匙。

在 Agent 的发展历程中，Prompt 技术的每一次突破，都直接催生了更高级的 Agent 模式。很多后来被封装进系统框架甚至被训练进模型的能力（如 Function Calling、推理步骤），最初都是作为一种 Prompt 技巧被发现的。

本文将从提示词演进的视角，梳理 Agent 认知的觉醒之路。

## 💡 提示词与 Agent 架构的共生关系

提示词工程不仅仅是“说话的艺术”，它是 Agent 架构的**先导技术**。

> **核心驱动规律**：
>
> 1. **Prompt 探索边界**：研究者先通过 Prompt 证明某种能力（如推理、工具使用）的可行性。
> 2. **Agent 架构落地**：系统框架将这种能力封装成稳定的工程模式（如 LangChain 封装 ReAct）。
> 3. **模型内化能力**：最终，这种能力被训练进下一代模型（如 CoT 进化为 o1，Few-shot 进化为 Function Calling）。

---

## 🧭 时间线双列视角：从 Prompt 证明到架构落地

下面用一条时间线把“谁推动谁、谁建立在谁的基础上”说清楚：左边是 Prompt 先“试出来”的能力，右边是架构把它做成稳定可用的功能，最后再反过来影响下一代模型。

| 时间线 | Prompt 先试出来的能力 | 架构做成稳定功能 | 关键关系（读者视角） |
| --- | --- | --- | --- |
| 零样本 / 少样本 | **Zero-shot / Few-shot**：靠指令/示例就能控制输出格式 | **早期工具调用雏形**：用 Few-shot 强制输出 JSON | 先证明“可控输出”，再做成工具接口 |
| CoT | **Chain-of-Thought**：让模型写出推理过程 | **Planning / ReAct Loop**：把“想+做”固化成流程 | 先能想清楚，再让系统按步骤执行 |
| Self-Consistency | **多路径采样 + 投票**：用多条思路选更稳答案 | **鲁棒决策机制**：多路评估/验证 | 先引入“多样性”，再工程化为“稳定性” |
| ReAct | **Thought/Action/Observation** 提示模板 | **Tool Use + Agentic Loop**：有执行体的闭环 | Prompt 定协议，架构实现协议 |
| Function Calling | **Few-shot 逼近结构化调用** | **Function Calling 微调** 成为基石能力 | 先试验可行性，后训练成原生能力 |
| Toolformer | **模型自监督学工具**（学术探索） | **工业界用外部 Schema**（更可控、易扩展） | 研究推动取舍：可控性更重要 |
| MRKL | **“该找谁”意识**（路由/分发） | **Router / Orchestrator** 多模块协作 | Prompt 暴露需求，架构把它系统化 |
| ToT / GoT | **树/图式推理**：允许回溯与合并 | **搜索与规划架构**（BFS/DFS/MCTS） | 思维结构先出现，工程再接入搜索 |
| SoT | **先大纲后展开**：提示并行写作 | **并行生成管线**：降低延迟 | Prompt 给思路，系统把并行落地 |
| Reflexion | **反思与自我修正** | **Memory / Feedback Loop**：长期记忆 | 先能反思，再把经验保存下来 |
| RAG | **检索增强提示**：把外部资料塞进上下文 | **检索管线 + 向量库**：系统组件 | 先用检索“补脑”，再做成模块 |
| 多智能体 | **角色分工提示**：让模型分角色协作 | **Multi-Agent 编排**：工程化协作 | 先有角色分工，再有组织结构 |

## 第一阶段：本能与直觉 (Instinct & Intuition)

### 1. Zero-shot Prompting (零样本提示)

**🏷️ 认知层级**：System 1 (快思考/直觉)

- **背景 (Background)**：
  随着大模型规模的扩大，研究者发现了一个惊人现象：模型在未见过的任务上也能表现出色。这种**涌现能力 (Emergent Ability)** 的发现，让人们意识到大规模预训练带来的不仅是知识记忆，更是强大的泛化能力。
- **概念与机制 (Concept & Mechanism)**：
  依靠模型在大规模预训练中内化的知识和推理模式来生成回答。它本质上是"指令遵循 (Instruction Following)"，即模型仅凭对自然语言指令的理解就能执行从未训练过的任务。
  - **机制**：Prompt -> Tokenizer -> Transformer Model -> Output Probabilities -> Decoding。
- **示例 (Example 翻译任务)**：

  ```text
  [Instruction]:
  将以下中文句子翻译成英文，并保持正式商务语气。

  [Input]:
  我们在收到贵方付款后会立即发货。

  [Output]:
  We will ship the goods immediately upon receipt of your payment.
  ```

- **作用与优势 (Advantage)**：
  - **知识迁移 (Knowledge Transfer)**：模型在预训练阶段学习了海量的通用知识，能够将其迁移到新任务中。
  - **便捷性**：用户使用门槛最低，无需准备数据。

### 2. Few-shot Prompting (少样本提示 / ICL)

**🏷️ 认知层级**：System 1.5 (基于类比的直觉)

**📍 演进影响**：**→ 启发了 Function Calling**。Few-shot 证明了"通过示例控制输出格式"的可行性，为后续的工具调用铺路。

- **背景 (Background)**：
  GPT-3 揭示了 **In-Context Learning (ICL)** 能力——模型能从 Prompt 的示例中实时学习模式。
- **概念 (Concept)**：
  在提示词中提供少量（通常 1-5 个）高质量"输入-输出"对作为示例（Demonstrations），让模型通过上下文中的模式推理来处理新输入。
- **示例 (Example)**：

  ```text
  任务：将水果归类并提取颜色。

  示例1：
  输入：Apple
  输出：{"category": "fruit", "color": "red"}

  示例2：
  输入：Spinach
  输出：{"category": "vegetable", "color": "green"}

  // 待处理
  输入：Sky
  输出：
  ```

- **对比 (VS Zero-shot)**：
  - **Zero-shot**：更依赖模型自身的智商（Parametric Knowledge）。
  - **Few-shot**：更依赖 Prompt 的设计（Context Knowledge）。对于复杂、非标任务，Few-shot 完胜。
- **🚀 对 Agent 架构的驱动**：
  **早期工具调用的基础**。在 2023 年 Function Calling 微调普及之前，所有 Agent（如早期的 ReAct 论文）都依赖 Few-shot 来强制模型输出 JSON 格式。

---

## 第二阶段：推理与规划 (Reasoning & Planning)

### 3. Chain-of-Thought (CoT)

**🏷️ 认知层级**：System 2 (慢思考/逻辑推理)

**📍 演进影响**：**→ Agent 规划能力的核心**。没有 CoT，Agent 就无法分解复杂任务。它直接启发了 o1 模型、ToT 架构等。

- **背景 (Background)**：
  大模型在处理数学和复杂逻辑时表现不佳。Google 研究者发现，强制模型“把中间步骤写出来”，能显著提升准确率。
- **概念 (Concept)**：
  一种提示工程技术，要求模型在给出最终答案之前，先显式地生成**中间推理步骤**。即 "Let's think step by step"。
- **示例 (Example - 对比效果)**：

  ```text
  Q: 迈克尔有5个苹果，吃了2个，买来3个。现在几个？

  ❌ Zero-shot（直接回答）:
  A: 8 个。 (错误直觉)

  ✅ CoT（显式推理步骤）:
  A: 让我一步步分析：
  1. 起始有 5 个苹果。
  2. 吃了 2 个，剩余：5 - 2 = 3 个。
  3. 又买来 3 个，总共：3 + 3 = 6 个。
  答案是 6 个苹果。
  ```

- **对比 (VS Zero-shot)**：
  - **CoT**：用更多的 Token 换取更高的准确率（System 2）。
  - **Zero-shot**：直觉反应（System 1）。
- **作用与优势 (Advantage)**：
  - **解锁 System 2 思维**：CoT 是大模型能力涌现的典型代表。它是所有高级 Planning 模式的**核心原语**。

### 4. Self-Consistency (CoT-SC)

**🏷️ 认知层级**：集成思维 (Ensemble Thinking)

**📍 技术依赖**：基于 CoT，增加了多路径采样。

- **背景 (Background)**：
  单条推理路径容易“钻牛角尖”，具有随机性和脆弱性。
- **概念与机制 (Concept & Mechanism)**：
  基于**Ensemble Learning (集成学习)** 思想。
  1.  **多路径采样**：设置 `Temperature > 0`，对同一 Prompt 生成 k 条不同的 CoT 路径。
  2.  **多数投票**：选择出现频率最高的答案。
- **示例 (Example)**：
  对同一个逻辑题生成 5 次推理，其中 3 次得出答案 A，2 次得出答案 B。Agent 选择答案 A，从而过滤掉偶然错误。
- **作用与优势 (Advantage)**：
  - **决策鲁棒性**：在 Agent 做关键决策（如资金操作）时，提供了必要的“安全确认”机制。

### 5. ReAct (Reasoning + Acting) —— Prompt 视角

**🏷️ 认知层级**：认知与行动的闭环

**📍 演进影响**：**→ Agent 的“灵魂架构”**。它定义了 Agent 与环境交互的标准协议。

- **背景 (Background)**：
  CoT 擅长内部推理，Tool Use 实现了外部交互，但两者是割裂的。需要将推理和行动融合成一个统一的循环。
- **概念 (Concept)**：
  一种 Prompt Template，强制模型按照 `Thought` (思考) -> `Action` (行动) -> `Observation` (观察) 的格式输出。
- **示例 (Example)**：

  ```text
  Thought 1: 我需要先查一下这台服务器的 IP。
  Action 1: get_server_ip(name="prod-web-01")
  Observation 1: 192.168.1.10

  Thought 2: 现在我连上这台 IP 查日志。
  Action 2: ssh_and_cat_log("192.168.1.10")
  ```

- **对比 (VS CoT)**：
  - **CoT**：只是在脑子里想（Internal Reasoning）。
  - **ReAct**：不仅想，还动手（Reasoning + Acting）。
- **作用与优势 (Advantage)**：
  - **自主性的里程碑**：ReAct 标志着 LLM 从“被动问答”走向了“自主解决问题”。

### 6. Plan & Execute (Plan-and-Solve)

**🏷️ 认知层级**：全局规划

**📍 技术依赖**：CoT 的进阶版，解决 ReAct 视野狭窄问题。

- **背景 (Background)**：
  ReAct 的"走一步看一步"策略在复杂长链路任务中容易迷失方向。
- **概念 (Concept)**：
  将 Prompt 拆分为两阶段：
  1.  **Planner Prompt**：生成完整的 Todo List。
  2.  **Executor Prompt**：逐项执行。
- **示例 (Example)**：
  _Planner_: "1. 搜集资料; 2. 整理大纲; 3. 撰写正文。"
  _Executor_: 依次执行上述步骤。
- **对比 (VS ReAct)**：
  ReAct 是动态规划（边走边看），Plan & Execute 是静态规划（三思后行）。Plan & Execute 更适合步骤明确的长任务。

---

## 第三阶段：反思与自我进化 (Reflection & Evolution)

### 7. Self-Refine (自我修正)

**🏷️ 认知层级**：元认知 (Metacognition) - 主观优化

- **背景 (Background)**：
  模型生成的初稿往往不完美。
- **概念与机制 (Concept & Mechanism)**：
  让模型扮演“批评家”，对自己的生成结果提出反馈（Critique），然后根据反馈修改（Refine）。这一过程不需要外部工具反馈。
- **示例 (Example)**：
  Draft: "快还钱！" -> Feedback: "太没礼貌" -> Refine: "请问您方便安排一下付款吗？"
- **作用与优势 (Advantage)**：
  - **提升主观质量**：特别适合写作、创意类任务。
  - **无需外部反馈**：这是冷启动优化的最佳纯 Prompt 方法。

### 8. Chain-of-Verification (CoVe)

**🏷️ 认知层级**：元认知 (Metacognition) - 客观核查

- **背景 (Background)**：
  LLM 容易产生幻觉（Hallucination）。
- **概念与机制 (Concept & Mechanism)**：
  Prompt 流程：生成底稿 -> 提取事实点 -> 生成验证问题 -> 独立回答验证 -> 修正底稿。这是一个自我查错的过程。
- **对比 Self-Refine**：
  Self-Refine 像文科生（优化文笔），CoVe 像理科生（核对事实）。
- **作用与优势 (Advantage)**：
  构建**可信 Agent** 的关键技术，特别是在金融、法律等严谨领域。

### 9. Reflexion (记忆与反思) —— Prompt 视角

**🏷️ 认知层级**：经验学习 (Experiential Learning)

**📍 演进影响**：**→ 推动 Memory 系统发展**。它引入了将“经验”作为 Context 输入的需求。

- **背景 (Background)**：
  传统 Agent 是"无状态"的，容易重复犯同样的错误。
- **概念与机制 (Concept & Mechanism)**：
  将“过去的失败教训”作为 Prompt 的一部分（Context）输入给模型。
  Prompt 结构变化：`Input` + `Short-term Memory (Previous Trajectory)` + `Long-term Memory (Key Learnings)`。
  当 Agent 失败时，触发反思生成“经验”，存入记忆。
- **示例 (Example)**：
  尝试 1 失败 -> 反思："不要用 sort() 因为它返回 None" -> 存入经验 -> 尝试 2 成功。
- **作用与优势 (Advantage)**：
  - **持续学习能力**：赋予 Agent 类似人类的“短期记忆学习”能力，无需微调模型就能变强。

---

## 总结：Prompt 驱动架构

| Prompt Pattern    | 核心认知能力 | 演进而成的架构/模型                      |
| :---------------- | :----------- | :--------------------------------------- |
| **Simple Prompt** | 指令遵循     | Base LLM                                 |
| **Few-shot**      | 模式模仿     | **Function Calling** / Toolformer        |
| **CoT**           | 逻辑推理     | **OpenAI o1** / ToT Framework            |
| **ReAct Prompt**  | 动态决策     | **LangChain AgentExecutor**              |
| **Reflexion**     | 经验积累     | **Long-term Memory / Generative Agents** |

提示词工程探索了认知的上限，而 Agent 架构则将这些认知能力工程化、系统化。在下一篇文档中，我们将探讨**Agent 系统架构**是如何围绕这些核心能力构建起来的。

👉 **下一篇：[Agent 架构演进：从工具调用到多智能体协作](../agent-architecture-evolution/)**
