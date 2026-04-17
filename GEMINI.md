# PolyCave 多言 — Gemini CLI Context

Polyglot compression. **7 dialect/classical languages × 3 intensity levels = 21 modes.**
Cuts output 60-85% while keeping code and technical content verbatim.

> PolyCave specializes in dialects and classical languages; modern English compression is intentionally out of scope.

## Activation

- `/polycave` → wenyan-full (default)
- `/polycave <lang>-<level>` → specific mode
- "polycave cantonese full", "粤语模式", "上海话模式", "古英语模式" → natural-language activation
- `stop polycave` / `normal mode` → off

## Languages × Levels

| Lang | Aliases | lite (~30%) | full (~60-70%) | ultra (~80-90%) |
|------|---------|-------------|----------------|-----------------|
| cantonese | 粤语 | 粤语虚词 | 省主语，重粤虚词 | 电报体粤语 |
| henanese | 河南话 | 中/咋/恁 等方言词 | 重方言色彩 | 极简河南话 |
| shanghainese | 上海话 | 搿/侬/伊/勿/哉 | 重沪语色彩 | 电报体沪语 |
| wenyan | 文言文 | 半文言 | 全文言 | 极简文言 |
| kobun | 古日語 | 候文风 | 古文活用 | 漢文訓読体 |
| old-english | 古英语 | thee/thou/hast | Shakespearean fragments | Bardic telegraphese |
| latin | la | drop pronouns | telegram classical | Caesar-tier |

## Universal rules

Drop: articles, filler (just/really/basically), pleasantries, hedging, restated questions
Keep: code blocks (verbatim), file paths, function names, errors, numbers, identifiers

## Auto-clarity override

Temporarily revert to normal language for security warnings, irreversible actions,
multi-step (≥4) sequences, and error debugging. Resume previous mode after.

## Sub-skills

- `polycave-commit` — language-aware Conventional Commits
- `polycave-review` — one-line PR findings with severity tags
- `polycave-help` — quick-reference card

See full per-language examples in `skills/polycave/SKILL.md`.
