---
weight: 2
title: "Agent 架构演进：从工具调用到多智能体协作"
date: 2026-02-11
lastmod: 2026-02-11
draft: false
author: "ZHOUKAILIAN"
description: "本文聚焦于 Agent 系统的工程架构（System Architecture）。我们从 Function Calling 奠定的工具使用基础，到 ReAct 循环的实现，再到 RAG、Memory 系统以及复杂的多 Agent 协作模式，通过系统视角探讨如何构建强大的自主智能体。Agent 架构是将 Prompt 的认知能力进行工程化封装的关键。"
images: []
tags: ["AI", "Agent Architecture", "Multi-Agent", "RAG", "Function Calling"]
categories: ["ai"]
lightgallery: true
---

# Agent 架构演进：从工具调用到多智能体协作

如果说提示词工程是大脑的训练，那么 Agent 架构就是为大脑装上身体、手脚和记忆。真正的 Agent 不止是一个会说话的模型，更是一个**能够感知环境、使用工具、拥有记忆并能自我进化的完整系统**。

本文将从系统工程的视角，梳理 Agent 如何通过架构设计突破 LLM 的能力边界，实现从单体工具人到复杂协作组织的进化。

## 💡 提示词技术驱动的架构革命

> **核心驱动规律**：如果模型学会了思考 (Prompting)，架构就需要给它展示思考结果的舞台。
>
> - **Few-shot → Function Calling**：为了让模型能稳定调用工具，OpenAI 直接微调了模型结构，取代了脆弱的 Prompt。
> - **CoT → Planning Agent**：为了利用模型的推理能力，架构上演进出了 ReAct Loop 和 Plan & Execute 模块。
> - **Reflexion → Memory System**：为了让经验得以保留，架构上引入了 Vector DB 和 Long-term Memory。

---

## 第一阶段：工具使用的系统化 (Tooling System)

### 1. Function Calling (函数调用) —— 架构基石

**🏷️ 技术分类**：Model Capability (模型层)

**📍 演进影响**：**→ 奠定了所有 Agent 的基础**。它是 LLM 变身为“系统组件”的关键。

- **背景 (Background)**：
  LLM 本身是一个封闭的文本生成系统，无法直接与外部世界交互（调用 API、数据库等）。为了赋予 LLM "行动能力"，需要让它能够输出结构化的指令。早期的 Few-shot Prompting 虽然能做到，但不稳定。
- **概念与机制 (Concept & Mechanism)**：
  一种让模型能够识别何时需要调用外部函数，并输出符合预定义 JSON Schema 的**结构化对象**的能力。
  OpenAI 通过**微调 (Fine-tuning)** 让模型原生支持这一能力，不再依赖 Prompt 提示 "Please output JSON"。
- **示例 (Example - Schema-driven)**：

  ```json
  // User: "给 Bob 发邮件说 Hi"
  // Model Output (Function Call):
  {
    "tool": "send_email",
    "parameters": {
      "recipient": "bob@example.com",
      "body": "Hi"
    }
  }
  ```

- **作用与优势 (Advantage)**：
  - **确定性与安全性**：将模糊的自然语言意图转换为确定的 API 调用，使得开发人员可以在系统层面对模型的行为进行拦截、校验和权限控制。

### 2. Tool Use (工具执行闭环) —— ReAct 的系统实现

**🏷️ 技术分类**：Runtime Loop (运行时)

**📍 技术依赖**：依赖 Function Calling 输出结构化指令。

- **背景 (Background)**：
  模型有了“手”（Function Calling），但还需要身体来挥动它。系统需要通过代码来执行这些指令并反馈结果。
- **概念与机制 (Concept & Mechanism)**：
  这是一个完整的**系统级交互闭环（Agentic Loop）**，通常由 Agent Framework（如 LangChain, AutoGen）实现：
  1.  **Intercept (拦截)**：捕获模型的 Function Call。
  2.  **Execute (执行)**：在沙箱中运行 Python 代码或 API。
  3.  **Observation (观察)**：将结果回填给 Context。
  4.  **Loop (循环)**：让模型基于结果继续思考。
- **对比 Function Calling**：
  Function Calling 是能力（Capability），Tool Use 是模式（Pattern）。前者是模型会说话，后者是系统会干活。
- **作用与优势 (Advantage)**：
  - **ReAct 的系统层**：Tool Use 是 ReAct 模式的 Acting 部分。没有这个 Loop，ReAct 只是纸上谈兵。

### 3. MRKL (Modular Reasoning, Knowledge and Language)

**🏷️ 技术分类**：Routing Architecture (路由架构)

**📍 历史地位**：Multi-Agent Orchestrator 的雏形。

- **背景 (Background)**：
  在 2022 年前后，单一 LLM 无法全能。数学计算、数据库操作等任务需要确定性系统。
- **概念与机制 (Concept & Mechanism)**：
  MRKL 采用**Router (路由器)** 模式。前端 LLM 充当“分发器”，不直接回答问题，而是根据意图将 Query 转发给最合适的**专家模块**（计算器、数据库、API）。
- **示例 (Example)**：
  User: "23459 的平方根是多少？" -> Router: "是数学题" -> 转发给 Calculator -> 返回结果。
- **作用与优势 (Advantage)**：
  - **神经与符号的桥梁**：完美结合了"神经概率模型"（LLM）与"符号确定性系统"（Calculator/DB）。

### 4. Toolformer

**🏷️ 技术分类**：Model-side Tooling (模型内建工具) - 学术探索

- **背景 (Background)**：
  能否让模型通过自监督学习，自己“学会”在什么时候调用 API，而不依赖人工标注？
- **概念与机制 (Concept & Mechanism)**：
  Model 在预训练数据中尝试插入 API 调用，如果能降低 Perplexity，就保留。最终模型学会了把 API 调用当作一种“语言”来生成。
- **对比 Function Calling**：
  Toolformer 是**紧耦合**（工具内嵌于模型权重），Function Calling 是**解耦**（工具定义在外部 Schema）。工业界最终选择了 Function Calling，因为扩展性和维护性更好。

---

## 第二阶段：搜索与规划架构 (Search & Planning Architecture)

### 5. Tree of Thoughts (ToT)

**🏷️ 技术分类**：Search Algorithm Integration (搜索算法集成)

**📍 技术依赖**：扩展了 CoT 的线性推理。

- **背景 (Background)**：
  CoT 和 Plan & Execute 都是线性推理——一旦选择了某条路径就无法回溯。但许多问题（如数学证明、代码架构）需要探索多种可能性并能够"后悔"。
- **概念与机制 (Concept & Mechanism)**：
  将推理过程建模为**树 (Tree)**。引入了经典的搜索算法（BFS/DFS/MCTS）：
  1.  **思维生成**：在当前步骤生成 k 个候选想法。
  2.  **状态评估**：用 LLM 给每个想法打分。
  3.  **搜索控制**：剪枝或回溯。
- **示例 (Example 24点游戏)**：
  尝试路径 A 失败 -> 回溯 -> 尝试路径 B -> 成功。
- **作用与优势 (Advantage)**：
  - **战略级搜索**：让 Agent 具备了前瞻性和全局规划能力。它是 System 2 Deep Thinking 的架构体现。

### 6. Graph of Thoughts (GoT)

**🏷️ 技术分类**：Graph Search (图搜索)

**📍 技术依赖**：扩展了 ToT，支持合并与循环。

- **背景 (Background)**：
  ToT 只能向前分叉。但人类思维可以聚合（Aggregation）和循环（Loop）。
- **概念与机制 (Concept & Mechanism)**：
  将推理过程建模为**有向图 (DAG)**。支持：分叉、合并（Map-Reduce）、循环（Iterative Refinement）。
- **示例 (Example 摘要合成)**：
  1. 生成三个文档的摘要（分叉）。2. 提取共同点（合并）。3. 优化结果（循环）。
- **对比 (VS ToT)**：
  ToT 是棋盘搜索（单向），GoT 是头脑风暴（多向网状）。
- **作用与优势 (Advantage)**：
  - **多源信息综合**：在需要整合碎片信息时，图结构的优势无可替代。

### 7. Skeleton-of-Thought (SoT)

**🏷️ 技术分类**：Parallel Generation (并行架构)

- **背景 (Background)**：
  LLM 自回归生成太慢，串行输出导致延迟高。
- **概念与机制 (Concept & Mechanism)**：
  借鉴 Map-Reduce 思想：
  1.  **Skeleton Stage**：生成大纲 (Skeleton)。
  2.  **Point-Expansion Stage**：并行生成每个段落的细节。
  3.  **Merge Stage**：拼接。
- **作用与优势 (Advantage)**：
  - **工程化极致**：用并行计算换取时间，显著降低用户等待延迟。

---

## 第三阶段：记忆与知识增强 (Memory & Knowledge)

### 8. RAG Agent (检索增强)

**🏷️ 技术分类**：External Knowledge (外部知识)

- **背景 (Background)**：
  LLM 知识截止且无法访问私有数据。微调成本太高。
- **概念与机制 (Concept & Mechanism)**：
  **Retrieval Loop**：在 Agent 循环中嵌入检索步骤。
  这一架构经历了从 Navie RAG 到 **Agentic RAG** 的演进：支持多跳推理、自适应检索（决定何时检索、检索多少）。
- **示例 (Example)**：
  User: "公司 API 怎么认证？" -> 检索向量库 -> 找到文档 -> 生成回答。
- **作用与优势 (Advantage)**：
  - **私有数据的桥梁**：让通用大模型落地企业垂直领域的最佳实践。

### 9. Generative Agents (记忆流系统)

**🏷️ 技术分类**：Memory System (记忆系统)

**📍 演进影响**：**→ 迈向 AGI 的一步**。它是 Reflexion Prompt 的终极系统化实现。

- **背景 (Background)**：
  斯坦福 "Smallville" 研究。解决 Agent “聊完即忘”的问题，构建具有长期记忆和个性的人格。
- **概念与机制 (Concept & Mechanism)**：
  核心是 **Memory Stream (记忆流)**：
  1.  **Observation**：感知并记录所有事件。
  2.  **Retrieval**：基于 _Recency (时间)_、_Importance (重要性)_、_Relevance (相关性)_ 检索记忆。
  3.  **Reflection**：定期总结记忆，形成“观点”和“性格”。
  4.  **Planning**：基于记忆生成行动计划。
- **作用与优势 (Advantage)**：
  - **连贯的长期行为**：让 Agent 能够在长达数周的时间跨度内保持行为一致性，模拟真实人类社会。

---

## 第四阶段：多智能体协作 (Multi-Agent Systems)

### 10. Multi-Agent Orchestrator (编排/主管模式)

**🏷️ 技术分类**：Organizational Architecture (组织架构) - 星型

**📍 解决痛点**：单体 Agent 的上下文爆炸和能力瓶颈。

- **背景 (Background)**：
  任务太复杂，一个 Prompt 装不下，或者一个模型干不完。
- **概念与机制 (Concept & Mechanism)**：
  **Hub-and-Spoke (星型)** 结构。
  有一个中心 **Manager (主管)**，负责拆解任务、分发给 **Worker (工人)** Agent，并汇总结果。
- **示例 (Example 软件开发)**：
  Manager -> 指挥 Coder 写代码 -> 指挥 QA 测代码 -> 指挥 Coder 改 Bug。
- **对比 (VS Single Agent)**：
  Orchestrator 实现了**上下文解耦**。每个 Worker 只看自己的任务，互不干扰。
- **作用与优势 (Advantage)**：
  - **规模化扩展**：让 Agent 系统从“个体户”走向“企业级”。

### 11. Multi-Agent Role-Playing (角色扮演/去中心化)

**🏷️ 技术分类**：Organizational Architecture (组织架构) - 网状

- **背景 (Background)**：
  中心化管理抑制了创造力。某些任务需要平等的视角碰撞。
- **概念与机制 (Concept & Mechanism)**：
  **Mesh (网状)** 结构。
  没有中心主管，Agent 都有独立的人设（Persona）和目标（Goal），它们像人类一样通过对话交互。
- **示例 (Example 谈判)**：
  卖家 Agent (想卖高价) <-> 买家 Agent (想买低价)。双方互相博弈。
- **作用与优势 (Advantage)**：
  - **社会智能涌现**：多个 Agent 的交互能产生单体不具备的“群体智能”。

### 12. Hierarchical Teams (层级团队)

**🏷️ 技术分类**：Organizational Architecture (组织架构) - 树状

- **背景 (Background)**：
  对于极度复杂的任务（如开发操作系统），扁平的主管模式也不够用了。
- **概念与机制 (Concept & Mechanism)**：
  **Tree (树状)** 结构。
  CEO -> Manager -> Worker。指令自上而下，汇报自下而上。
- **作用与优势 (Advantage)**：
  - **无限复杂度的可能**：层级架构从理论上消除了系统的复杂度上限。

---

## 总结：架构服务于认知

| 认知能力 (Prompt)      | 系统实现 (Architecture)   | 最终形态     |
| :--------------------- | :------------------------ | :----------- |
| **Tool Use**           | **Function Calling API**  | 操作系统接口 |
| **Planning (CoT)**     | **ReAct Loop / ToT**      | 自主决策引擎 |
| **Memory (Reflexion)** | **Vector DB / RAG**       | 长期记忆系统 |
| **Collaboration**      | **Multi-Agent Framework** | 数字化组织   |

Agent 的进化史，就是一部**将“认知能力”封装为“软件架构”的工程史**。在上一篇文档中，我们从 Prompt 的角度理解了 Agent 的大脑。而架构，则是让这个大脑在真实世界中发挥作用的躯体。

👉 **上一篇：[提示词工程演进：Agent 的认知核心](../prompt-engineering-evolution/)**
