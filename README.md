![Banner](banner.svg)

# claude-vs-claude

> Two AIs debate. You decide.

[![npm version](https://img.shields.io/npm/v/claude-vs-claude?color=C084FC&label=npm)](https://www.npmjs.com/package/claude-vs-claude)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/NickCirv/claude-vs-claude?style=flat)](https://github.com/NickCirv/claude-vs-claude/stargazers)

## The Problem

GraphQL or REST? Monolith or microservices? Postgres or MongoDB? You could spend hours reading blog posts where the author has already decided and is just justifying their choice. Or you could make two AI architects argue it out — genuinely, technically, on opposite sides — and get an ADR-ready verdict in 60 seconds.

## Quick Start

```bash
export ANTHROPIC_API_KEY=sk-ant-...

npx claude-vs-claude "Should we use GraphQL or REST for our new API?"
```

That's it. Watch them fight.

```bash
# Multi-round debate with rebuttals
npx claude-vs-claude --rounds 3 "React vs Svelte for our dashboard?"

# Save the verdict as an ADR
npx claude-vs-claude --save decision.md "SQL vs NoSQL for our e-commerce platform?"
```

## Example Output

```
$ npx claude-vs-claude "Microservices or monolith for a 5-person startup?"

  ADVOCATE A — FOR MONOLITH
  ──────────────────────────
  With 5 engineers, the cognitive overhead of microservices will kill you.
  You'll spend more time on service mesh config than on features. Shopify,
  Stack Overflow, and Basecamp all scaled to massive traffic on monoliths.
  Start boring, add complexity when the pain is real — not hypothetical.

  ADVOCATE B — FOR MICROSERVICES
  ───────────────────────────────
  Microservices aren't about scale — they're about team autonomy. Even at 5
  people, independent deploy pipelines mean one bad deploy can't take down
  everything. Kubernetes is table stakes in 2026. The tooling has matured.
  The migration cost later is always higher than starting right.

  THE VERDICT
  ───────────
  Monolith. For a 5-person team, the operational burden of microservices
  outweighs the benefits. Ship a well-structured modular monolith with clean
  service boundaries. Migrate individual services when a team or traffic
  pattern demands it — not before. ADR written to decision.md.
```

## Features

- **Genuine opposition** — two Claude instances with opposing system prompts, not a single model playing both sides
- **Multi-round debates** — initial arguments, rebuttals, final statements, then verdict
- **ADR-ready output** — `--save` writes a markdown decision document
- **Technical depth** — advocates cite real-world examples, tradeoffs, and edge cases
- **Neutral judge** — third Claude instance synthesises a final recommendation

## How It Works

1. You pose a technical question
2. **Advocate A** argues passionately for one side
3. **Advocate B** argues passionately for the other
4. *(Optional)* Additional rounds: rebuttals and counter-arguments
5. **The Judge** synthesises a decision document with a clear recommendation

All three are Claude instances with different system prompts. The debate is real, the arguments are technical, and the verdict is actionable.

## Requirements

- Node.js 18+
- `ANTHROPIC_API_KEY` environment variable

```bash
export ANTHROPIC_API_KEY=your_key_here
```

## See Also

- [repo-whisperer](https://github.com/NickCirv/repo-whisperer) — Talk to any codebase
- [ai-code-roast](https://github.com/NickCirv/ai-code-roast) — Brutal code reviews
- [blame-ai](https://github.com/NickCirv/blame-ai) — Find out which AI wrote that code

## License

MIT — [NickCirv](https://github.com/NickCirv)
