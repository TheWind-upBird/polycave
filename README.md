# 🦴 PolyCave 多言 (Duoyan)

> *多言而少字 — Many tongues, few words.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-8-blue.svg)](#all-24-modes)
[![Modes](https://img.shields.io/badge/modes-24-purple.svg)](#all-24-modes)

A multi-dialect / classical-language compression skill for Claude Code, Codex,
Gemini CLI, Cursor, Windsurf, Cline, and Copilot. Cuts LLM output **60-85%** by
speaking in compressed registers across **8 dialects and classical languages × 3
intensity levels = 24 modes**, while keeping every line of code and every
identifier untouched.

🌐 **README**: [English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

**Specializes in dialects and classical/literary registers.** Modern English compression is intentionally out of scope; polycave's flavor lives in 粤语, 河南话, 上海话, 老北京 (京片子), 文言文, 古日語, 古英语 (Shakespearean), and Latin.

---

## Why

LLM responses are full of fluff: articles, hedging, "let me explain", "great question". Polycave kills the fluff while keeping the substance — and lets you pick the linguistic flavor:

- **粤语 / Cantonese** — `嘅 / 咗 / 喺 / 咁 / 劲 / 正 / 食花生 / 咁都得`, drops subjects, authentic 粤 flavor
- **河南话 / Henanese** — `中 / 咋 / 恁 / 弄啥嘞` flavor, casual
- **上海话 / Shanghainese** — `搿 / 侬 / 伊 / 勿 / 哉 / 脱 / 腔调 / 嗲 / 结棍 / 灵光`, drops subjects, authentic 沪 flavor
- **老北京 / Beijing (京片子)** — `您 / 爷 / 儿化音 / 哎呦喂 (AUV) / 得嘞 / 倍儿棒 / 门儿清 / 瓷器`, rich Beijing register
- **文言文 / Wenyan (Classical Chinese)** — `之 / 乎 / 者 / 也 / 矣`, ~85% character reduction
- **古日語 / Kobun (Classical Japanese, 文語)** — `〜なり / 〜たり / 〜けり / 〜べし`
- **古英语 / Old English** — Shakespearean Early Modern: thee/thou/hast/forsooth
- **拉丁文 / Latin** — drop pronouns, ablative absolute, Caesar-tier brevity

Each in three intensities: `lite` (~30% off), `full` (~60-70% off), `ultra` (~80-90% off).

> Note on "古英语": this means Early Modern English (Shakespeare/KJV-era), not academic Anglo-Saxon Old English. The latter is impractical for most LLMs to produce reliably.

---

## 60-second demo

```
You: /polycave wenyan-full
Bot: 文言模式既启，言简意赅。

You: Why does my React component re-render?
Bot: 每渲生新引，故再渲。useMemo 包之即可。

You: /polycave cantonese-ultra
Bot: 粤语 ultra 模式，得。

You: How fix N+1 query?
Bot: N+1 → eager load。用 .includes 或 join，得。

You: /polycave old-english-full
Bot: Verily, the bard hath taken the stage.

You: How prevent SQL injection?
Bot: Bind thy params, prithee. Concatenate ne'er. Use prepared statements forsooth.

You: stop polycave
Bot: PolyCave deactivated. Back to normal verbose responses.
```

---

## All 24 modes

| | **lite** (~30%) | **full** (~60-70%) | **ultra** (~80-90%) |
|---|---|---|---|
| **粤语** | "因为呢个 object 每次 render 都会创建新嘅 reference，所以重新 render 咗，冇眼睇啦。" | "object 每次 render 新 ref，咁都再 render？包喺 useMemo 度，劲。" | "obj → 新 ref → 重 render。useMemo 包，正。" |
| **河南话** | "这个 object 每次 render 都创建新引用，所以重新 render 咧。" | "object 每回 render 新 ref，弄得重 render 咧。useMemo 包一下，中。" | "obj → 新 ref → 重 render。useMemo 包，中。" |
| **上海话** | "因为搿个 object 每趟 render 侪会创建新嘅 reference，所以重新 render 哉，邪气勿适意。" | "搿 object 每趟 render 新 ref，再 render 哉。useMemo 包脱，灵光。" | "obj → 新 ref → 重 render。useMemo 包脱，嗲。" |
| **老北京** | "哎您瞧啊，这 object 每回儿 render 都整新的 reference 出来，真真儿的没辙。" | "object 每回儿 render 整新 ref，重 render 没跑儿。useMemo 包上，得嘞。" | "obj → 新 ref → 重 render。useMemo 包，成。AUV。" |
| **文言文** | "盖此 object 每渲皆生新引，故再渲也。" | "每渲生新引，故再渲。useMemo 包之即可。" | "新引 → 再渲。useMemo 之。" |
| **古日語** | "オブジェクト毎度新しき参照を生むがゆゑに、再描画さるるなり。" | "新参照生み、再描画さる。useMemo にて包むべし。" | "新参照 → 再描画。useMemo に包め。" |
| **古英语** | "The new object reference doth cause a re-render. Wrap it in useMemo, prithee." | "Object new ref doth spawn each render. Wrap in `useMemo`, forsooth." | "Obj spawneth ref → re-render. `useMemo`, hark!" |
| **拉丁文** | "Obiectum novam referentiam quoque vice creat, ergo iterum redditur." | "Nova ref quoque vice → iterum redditur. useMemo adhibe." | "Nov ref → re-render. useMemo!" |

---

## What gets installed

Three layers, packaged together:

| Layer | What it does | Required for |
|---|---|---|
| **Skills** (`SKILL.md`) | Teach Claude how to write in each dialect/classical register | Model behavior |
| **Slash commands** (`.toml`) | Register `/polycave`, `/polycave-commit`, etc. | `/` shortcuts |
| **Hooks** (`.js`) | Persist mode across sessions, parse "粤语模式" natural-language triggers, render statusbar | State + statusbar |

The **plugin** packages all three so one command installs everything. If you only want the model to know the dialects (no slash commands, no statusbar), dropping `skills/polycave/SKILL.md` into `~/.claude/skills/polycave/` is enough.

---

## Install

Pick the option that fits you. All four paths end with Claude Code responding in polycave mode when you type `/polycave`.

### Option 1 — Plugin marketplace (easiest, two commands)

```bash
claude plugin marketplace add TheWind-upBird/polycave
claude plugin install polycave@polycave
```

Restart Claude Code. Say `/polycave` to activate.

### Option 2 — Clone and run the installer

Same end result as Option 1, handy if you want to inspect the source first or the plugin marketplace is unreachable:

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cd polycave

# macOS / Linux
bash hooks/install.sh

# Windows PowerShell
.\hooks\install.ps1
```

### Option 3 — One-line remote installer (no clone, no marketplace)

```bash
# macOS / Linux
bash <(curl -sL https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.sh)

# Windows PowerShell
irm https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.ps1 | iex
```

### Option 4 — Lightest: just drop in the SKILL.md

If you only want Claude to know the dialects (no slash commands, no statusbar, no state persistence across sessions):

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cp -r polycave/skills/polycave* ~/.claude/skills/
```

### Other AI tools (not Claude Code)

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cd polycave
```

| Tool | What to do |
|------|------------|
| **Codex CLI** | Copy `.codex/` into your Codex config dir |
| **Gemini CLI** | `gemini extensions install https://github.com/TheWind-upBird/polycave` (no clone needed) |
| **Cursor** | Copy `.cursor/` to your project root (rules auto-apply) |
| **Windsurf** | Copy `.windsurf/` to your project root |
| **Cline** | Copy `.clinerules/polycave.md` to your project root |
| **GitHub Copilot** | Copy `.github/copilot-instructions.md` to your project |

### Uninstall

```bash
# If installed via Option 1 (marketplace)
claude plugin uninstall polycave

# If installed via Option 2 or 3 (hooks/install.sh)
bash hooks/uninstall.sh           # macOS / Linux
.\hooks\uninstall.ps1             # Windows

# If installed via Option 4 (manual SKILL.md copy)
rm -rf ~/.claude/skills/polycave*
```

---

## Usage

### Activate

| Command | Effect |
|---------|--------|
| `/polycave` | wenyan-full (default) |
| `/polycave <lang>-<level>` | specific mode, e.g. `/polycave shanghainese-ultra` |
| `/polycave <lang>` | shorthand for `<lang>-full` |
| "polycave cantonese full" | natural-language activation |
| "粤语模式" / "文言文模式" / "上海话模式" / "老北京模式" / "古英语模式" / "河南话模式" | Chinese activation |
| "古日語モード" | Japanese activation |

### Deactivate

| Command | Effect |
|---------|--------|
| `/polycave off` | revert to normal |
| `stop polycave` | revert to normal |
| `normal mode` | revert to normal |

### Language codes & aliases

| Code | Aliases |
|------|---------|
| `cantonese` | `yue`, `粤`, `粤语` |
| `henanese` | `henan`, `河南`, `河南话` |
| `shanghainese` | `shanghai`, `wu`, `沪`, `沪语`, `上海`, `上海话` |
| `beijing` | `bj`, `jing-pianzi`, `京`, `京片子`, `京话`, `老北京`, `北京`, `北京话` |
| `wenyan` | `classical`, `文言`, `文言文` |
| `kobun` | `ja-classical`, `古日`, `古日語`, `文語` |
| `old-english` | `oe`, `early-modern`, `shakespearean`, `古英语`, `古英文` |
| `latin` | `la` |

---

## Sub-skills

| Skill | Purpose |
|-------|---------|
| `/polycave` | Main compression mode |
| `/polycave-commit` | Conventional Commits, ≤50 char subject, language-aware |
| `/polycave-review` | One-line PR comments, severity tags (🔴/🟠/🟡/🔵/🟢) |
| `/polycave-stats` | On-demand A/B benchmark — bar chart + table comparing current mode vs normal |
| `/polycave-help` | Quick-reference card |

### Example: language-aware commits

```
$ git diff --cached
[adds 401 token refresh handler]

$ /polycave-commit wenyan
feat(auth): 增令牌之自更，遇四〇一即行

$ /polycave-commit shanghainese
feat(auth): 加 401 自动 refresh token，灵咯

$ /polycave-commit old-english
feat(auth): add token refresh anew on 401
```

### Example: language-aware PR review

```
$ /polycave-review src/auth.ts
src/auth.ts:
  L42: 🔴 bug: token 过期辰光 user 是 null。先加个 guard 灵伐？
  L88: 🟠 risk: list 没 limit，要爆个。加 limit 灵咯。
  L120: 🟡 smell: 套头太深哉。抽个 early-return 出来。
```

---

## Auto-clarity (built-in safety)

PolyCave **temporarily reverts to normal language** for:

1. ⚠️ Security warnings (credential exposure, injection, vuln disclosure)
2. 🔄 Irreversible action confirmations (`rm -rf`, `git push --force`, `DROP TABLE`)
3. 🧩 Multi-step (≥4) dependent sequences
4. 🐛 Error debugging when clarity > brevity

Then resumes the previously active polycave mode automatically. You don't have to think about it.

---

## Project structure

```
polycave/
├── .claude-plugin/{plugin.json, marketplace.json}   # Claude Code plugin manifest
├── skills/
│   ├── polycave/SKILL.md                            # main skill
│   ├── polycave-commit/SKILL.md
│   ├── polycave-review/SKILL.md
│   └── polycave-help/SKILL.md
├── commands/*.toml                                   # slash command definitions
├── hooks/
│   ├── install.sh, install.ps1                      # standalone installers
│   ├── uninstall.sh, uninstall.ps1
│   ├── polycave-activate.js                         # SessionStart hook
│   ├── polycave-mode-tracker.js                     # UserPromptSubmit hook
│   ├── polycave-config.js                           # shared state helpers
│   └── polycave-statusline.{sh,ps1}                 # status bar
├── rules/polycave-activate.md                        # canonical rule (single source)
├── .codex/, .cursor/, .windsurf/, .clinerules/      # platform mirrors
├── gemini-extension.json + GEMINI.md                # Gemini CLI
├── .github/copilot-instructions.md                  # Copilot
├── AGENTS.md, CLAUDE.md                             # universal / Claude context
└── README.md, README.zh-CN.md, README.ja.md         # tri-lingual docs
```

---

## Token savings (expected)

These are *estimates* based on the SKILL.md instruction profile. Real per-mode benchmarks are a planned addition (`benchmarks/`).

| Task | Normal | PolyCave full | Savings |
|------|-------:|--------------:|--------:|
| Explain React re-render | ~1200 | ~200 | ~83% |
| Fix auth middleware | ~700 | ~150 | ~78% |
| Set up DB connection pool | ~2300 | ~400 | ~83% |
| Architecture explanation | ~450 | ~150 | ~67% |
| **Average** | — | — | **~75%** |

⚠️ Only output tokens are affected. Reasoning/thinking tokens are unchanged.

---

## Why dialects and classical languages

Each of these registers has structural features that make compression natural and idiomatic — virtual particles to drop (modern Chinese 的/了/呢; English articles), heavy verb endings to lean on (文言 之/也/矣; 古日 〜なり/べし), or established telegraphic conventions (Latin ablative absolute, Shakespearean verb forms). Compressing in these registers feels like *speaking* the language properly, not like talking to a robot.

The point isn't to be cute — it's that an answer in 文言文 or Shakespearean is **forced to be terse and structured**, which is exactly what good technical communication wants.

---

## Contributing

PRs welcome. Especially:
- More languages (古希腊文? Esperanto? 闽南话? Plattdeutsch? Old Norse? Sanskrit?)
- Benchmarks harness
- Real per-mode token-savings measurements
- Sync workflow (single source → all platform mirrors)

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE). Use freely. Compress aggressively.

---

*"少字足矣" — 文言, 2026*
*"包脱即灵" — 沪语, 2026*
*"Hark, brevity is the soul of wit" — 古英, 1601*
