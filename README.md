<div align="center">

# claude-vs-claude

**Two Claude instances argue opposite sides of your architecture question — a neutral judge delivers the verdict**

[![license](https://img.shields.io/badge/license-MIT-blue?labelColor=0B0A09)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-339933?labelColor=0B0A09)](https://nodejs.org)

</div>

## Install

```bash
npx github:NickCirv/claude-vs-claude "Your question here"
```

Requires `ANTHROPIC_API_KEY` in your environment.

## Usage

```bash
export ANTHROPIC_API_KEY=sk-ant-...

# Single-round debate
npx github:NickCirv/claude-vs-claude "GraphQL or REST for our new API?"

# Multi-round with rebuttals
npx github:NickCirv/claude-vs-claude --rounds 3 "React vs Svelte for our dashboard?"

# Save verdict as a markdown ADR
npx github:NickCirv/claude-vs-claude --save decision.md "SQL vs NoSQL for our e-commerce platform?"
```

| Flag | Default | Description |
|------|---------|-------------|
| `--rounds <n>` | `2` | Number of debate rounds (1–5) |
| `--save <file>` | — | Save full debate + verdict to a markdown file |

## What it does

Pose a technical architecture question and three separate Claude instances go to work: Advocate A argues passionately for one side, Advocate B argues the other, and a neutral Judge synthesises a clear recommendation. With `--rounds`, advocates get rebuttal turns before the verdict. With `--save`, the output is written as an ADR-ready markdown document.

---
<sub>Node ≥18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
