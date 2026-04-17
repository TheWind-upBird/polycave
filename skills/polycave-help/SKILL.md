---
name: polycave-help
description: >
  Quick-reference for polycave 多言 modes and commands. Lists all 7 languages × 3
  intensity levels and the trigger phrases. Use when user says "/polycave-help",
  "polycave help", "what polycave modes are there", or asks how to use polycave.
---

# PolyCave 多言 Quick Reference

> *Less words. More flavor.*

## Activate

| Phrase | Effect |
|--------|--------|
| `/polycave` | Activate `wenyan-full` (default) |
| `/polycave <lang>-<level>` | Activate specific mode |
| "polycave cantonese full" | Plain-English activation |
| "粤语模式" / "文言文模式" / "上海话模式" / "古英语模式" / "河南话模式" | CN activation |
| "古日語モード" | JP activation |

## Modes

| Lang code | Aliases |
|-----------|---------|
| `cantonese` | yue, 粤, 粤语 |
| `henanese` | henan, 河南, 河南话 |
| `shanghainese` | shanghai, wu, 沪, 沪语, 上海, 上海话 |
| `wenyan` | classical, 文言, 文言文 |
| `kobun` | ja-classical, 古日, 古日語, 文語 |
| `old-english` | oe, early-modern, shakespearean, 古英语, 古英文 |
| `latin` | la |

| Level | Token reduction |
|-------|----------------|
| `lite` | ~30% |
| `full` (default) | ~60-70% |
| `ultra` | ~80-90% |

## Sub-skills

| Skill | Purpose |
|-------|---------|
| `/polycave` | Main compression mode |
| `/polycave-commit` | Conventional Commits, ≤50 char subject |
| `/polycave-review` | One-line PR comments |
| `/polycave-help` | This card |

## Stop

| Phrase | Effect |
|--------|--------|
| `stop polycave` | Revert to normal |
| `normal mode` | Revert to normal |
| `/polycave off` | Revert to normal |

## Auto-clarity (built-in)

PolyCave temporarily reverts to normal language for:
- Security warnings
- Irreversible action confirmations
- Multi-step sequences (≥4 dependent steps)
- Error debugging

Then resumes the previous mode automatically.

## Examples

```
/polycave wenyan-full        → 文言文 full mode (default)
/polycave 粤语-ultra          → Cantonese ultra
/polycave 上海话-full          → Shanghainese full
/polycave 古英语-full          → Old English (Shakespearean)
/polycave latin-lite         → Latin lite
/polycave kobun-full         → 古日語 full
/polycave henanese-ultra     → 河南话 ultra
```

## Note on naming

- "古英语" / `old-english` here means **Early Modern English** (Shakespeare/KJV-era,
  with thee/thou/hast/forsooth). True academic Anglo-Saxon Old English (Beowulf-era)
  is impractical for most LLMs to produce reliably; we use the colloquial sense.
- Modern English compression is intentionally out of scope; polycave focuses on
  dialects and classical/literary registers.
