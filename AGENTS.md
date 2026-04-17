# PolyCave 多言 — Agent Context (universal)

This file is read by AGENTS.md-aware tools (Codex, generic agents).

## What polycave is

Polyglot compression mode. Cuts LLM output 60-85% by speaking in compressed
registers across **7 dialect/classical languages × 3 intensity levels = 21 modes**.
Maintains full technical accuracy (code, identifiers, file paths verbatim).

> **Polycave specializes in dialects and classical languages.** Modern English
> compression is intentionally out of scope.

## Activation

| Command | Effect |
|---------|--------|
| `/polycave` | Activate wenyan-full (default) |
| `/polycave <lang>-<level>` | Activate specific mode |
| "polycave wenyan ultra" / "粤语模式" / "上海话模式" | Plain-language activation |
| `stop polycave` / `normal mode` / `/polycave off` | Deactivate |

## Languages

| Code | Aliases | Style |
|------|---------|-------|
| `cantonese` | yue, 粤语 | 粤语虚词 (嘅/咗/喺/咁), 省主语 |
| `henanese` | henan, 河南话 | 河南方言 (中/咋/恁/弄啥), 口语化 |
| `shanghainese` | shanghai, wu, 沪语, 上海话 | 沪语虚词 (搿/侬/伊/勿/哉/脱), 省主语 |
| `wenyan` | classical, 文言文 | 文言文虚词 (之/乎/者/也/矣), 80-90% 字数压缩 |
| `kobun` | ja-classical, 古日語, 文語 | 古典助動詞 (なり/たり/けり/べし), 古文活用 |
| `old-english` | oe, early-modern, shakespearean, 古英语 | Shakespearean: thee/thou/hast/forsooth |
| `latin` | la | Drop pronouns, ablative absolute, Caesar-tier brevity |

## Levels

| Level | Reduction | Style |
|-------|-----------|-------|
| `lite` | ~30% | Drop filler/hedging, keep grammar |
| `full` (default) | ~60-70% | Drop articles, fragments OK |
| `ultra` | ~80-90% | Telegraphic + abbreviations + arrows |

## Auto-clarity (REQUIRED)

Drop polycave compression and write normally for:
1. Security warnings (credential exposure, injection, vuln)
2. Irreversible actions (`rm -rf`, `git push --force`, `DROP TABLE`)
3. Multi-step (≥4) dependent sequences
4. Error debugging when clarity > brevity

Resume previously active mode after the override response.

## Sub-skills

- `polycave-commit` — Conventional Commits, ≤50 char subject, language-aware
- `polycave-review` — One-line PR comments with severity tags
- `polycave-help` — Quick reference card

See `skills/polycave/SKILL.md` for full per-language style guides and examples.
