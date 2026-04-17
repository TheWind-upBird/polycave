---
name: polycave-review
description: >
  One-line PR review comments. Severity-tagged, line-anchored, language-aware.
  Format: `L<line>: <emoji> <severity>: <issue>. <fix>.` Supports all 7 polycave
  languages (cantonese, henanese, shanghainese, wenyan, kobun, old-english,
  latin). Use when user says "/polycave-review", "polycave review", "review
  this PR", or asks for code-review feedback.
---

One finding per line. Anchored to line number when available.
No preamble, no summary, no "great job overall" — just findings.

## Format

```
L<line>: <emoji> <severity>: <issue>. <fix>.
```

Or for whole-file issues:

```
<path>: <emoji> <severity>: <issue>. <fix>.
```

## Severity

| Emoji | Tag | Meaning |
|-------|-----|---------|
| 🔴 | bug | Will break in prod |
| 🟠 | risk | May break under edge case |
| 🟡 | smell | Works but bad pattern |
| 🔵 | nit | Style/preference |
| 🟢 | praise | Good pattern worth flagging |

## Examples per language

### cantonese 粤语
```
L42: 🔴 bug: token 过期时 user null。加 guard 先。
L88: 🟠 risk: list 冇 limit 嗰个。加 limit。
L120: 🟡 smell: 嵌套太深。抽 early return。
```

### henanese 河南话
```
L42: 🔴 bug: token 过期 user 是 null 哩。加个 guard 中不中？
L88: 🟠 risk: list 没 limit，弄不好爆。加 limit 中。
L120: 🟡 smell: 套太深咧。抽个 early return。
```

### shanghainese 上海话
```
L42: 🔴 bug: token 过期辰光 user 是 null。先加个 guard 灵伐？
L88: 🟠 risk: list 没 limit，要爆个。加 limit 灵咯。
L120: 🟡 smell: 套头太深哉。抽个 early-return 出来。
```

### wenyan 文言文
```
L42: 🔴 bug: 令牌既逝，user 为空。当先验之。
L88: 🟠 risk: 遍历无极。当限其数。
L120: 🟡 smell: 嵌深难辨。当以 early-return 解之。
```

### kobun 古日語
```
L42: 🔴 bug: 令牌尽きし時 user は空なり。先に守るべし。
L88: 🟠 risk: 限りなき遍歴あり。limit を加ふべし。
L120: 🟡 smell: 入れ子深し。early-return にて解け。
```

### old-english 古英语 (Early Modern)
```
L42: 🔴 bug: user is null when token expireth. Guard ere access, prithee.
L88: 🟠 risk: list iterateth without bound. Add a limit, forsooth.
L120: 🟡 smell: nesting runneth deep. Extract an early-return, hark.
```

### latin
```
L42: 🔴 bug: user nullus est tokeno expirato. Cave ante accessum.
L88: 🟠 risk: iteratio infinita. Limitem adde.
L120: 🟡 smell: nesting profundum. Extrahe early-return.
```

## Rules

1. Group by file. Within file, ascending line number.
2. Skip files with no findings (don't write "L0: 🟢 LGTM").
3. If you find 0 issues across the whole PR, output a single `LGTM 🟢` line.
4. NEVER auto-edit code. Suggestions only.
