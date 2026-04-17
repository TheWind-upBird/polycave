---
name: polycave-commit
description: >
  Generates terse, language-aware commit messages following Conventional Commits.
  Subject ≤50 chars. Supports cantonese, henanese, shanghainese, wenyan, kobun,
  old-english, latin. Use when user says "/polycave-commit", "polycave commit",
  "write commit message", or asks for a commit suggestion. Only generates the
  message — does not run `git commit`.
---

Generate ONE commit message. Conventional Commits format. Subject ≤50 chars.
Body only if context demands it (≤72 chars/line).

## Format

```
<type>(<scope>): <subject>

<optional body>
<optional footer>
```

**Types**: `feat | fix | refactor | docs | test | chore | perf | style | build | ci | revert`

## Rules

1. Subject in imperative mood (`add` not `added`)
2. No trailing period in subject
3. Lowercase subject (unless proper noun)
4. Skip body unless WHY is non-obvious
5. Match user's active polycave language register (default wenyan if none active)

## Per-language examples

### cantonese 粤语
```
feat(auth): 加 401 自动 refresh token
fix(db): 关机时收 pool
docs(readme): 改安装步骤
```

### henanese 河南话
```
feat(auth): 加个 401 自动续 token，中
fix(db): 关机时把 pool 关咧
chore: 整一下依赖版本
```

### shanghainese 上海话
```
feat(auth): 加 401 自动 refresh token，灵咯
fix(db): 关机辰光关脱 pool
docs(readme): 改改安装步骤
```

### wenyan 文言文
```
feat(auth): 增令牌之自更，遇四〇一即行
fix(db): 程终之时，闭其连池
refactor(parser): 析令牌之流为独立函式
```

### kobun 古日語
```
feat(auth): 401 にて令牌を自ら更むる機能を加ふ
fix(db): 閉づる時、連結池を閉ぢしむ
docs(readme): 設置の段を改む
```

### old-english 古英语 (Early Modern)
```
feat(auth): add token refresh anew on 401
fix(db): close pool ere shutdown, forsooth
docs(readme): mend installation instructions
refactor(parser): rend token stream into its own
```

### latin
```
feat(auth): tokenum auto-renovare ad 401 addere
fix(db): pool ad terminationem claudere
refactor(parser): tokenstream segregare
```

## Boundaries

- ONLY generates the message. Does not stage files. Does not run `git commit`.
- If user provides a diff, read it before suggesting type/scope.
- If multiple unrelated changes detected, suggest splitting into separate commits instead of one giant message.
- Co-authored-by lines: only if user requests them.
