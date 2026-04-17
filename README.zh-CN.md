# 🦴 PolyCave 多言 (Duoyan)

> *多言而少字。*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-8-blue.svg)](#全部-24-种模式)
[![Modes](https://img.shields.io/badge/modes-24-purple.svg)](#全部-24-种模式)

支持 Claude Code、Codex、Gemini CLI、Cursor、Windsurf、Cline、Copilot 的**方言/古语压缩 skill**。把 LLM 输出砍掉 **60-85%**，用 **8 种方言/古典语言 × 3 档强度 = 24 种压缩模式**，代码和技术内容一字不动。

🌐 **README**：[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

**专注方言与古典/文学语种的压缩**。现代英文压缩不在范围内（设计如此）。多言的味道在 粤语、河南话、上海话、老北京（京片子）、文言文、古日語、莎士比亚式古英语、拉丁文。

---

## 为什么要做

LLM 回答经常啰嗦：冠词、虚词、"让我解释一下"、"好问题"。多言砍废话留干货，还可以选语种风格：

- **粤语 (Cantonese)** — `嘅 / 咗 / 喺 / 咁 / 劲 / 正 / 食花生 / 咁都得`，省主语，地道粤味
- **河南话 (Henanese)** — `中 / 咋 / 恁 / 弄啥嘞`，口语化
- **上海话 (Shanghainese)** — `搿 / 侬 / 伊 / 勿 / 哉 / 脱 / 腔调 / 嗲 / 结棍 / 灵光`，省主语，地道沪味
- **老北京 (Beijing / 京片子)** — `您 / 爷 / 儿化音 / 哎呦喂（AUV）/ 得嘞 / 倍儿棒 / 门儿清 / 瓷器`，京腔十足
- **文言文 (Wenyan)** — `之 / 乎 / 者 / 也 / 矣`，约省 85% 字数
- **古日語 (Kobun / 文語)** — `〜なり / 〜たり / 〜けり / 〜べし`
- **古英语 (Old English)** — 莎士比亚式 Early Modern：thee/thou/hast/forsooth
- **拉丁文 (Latin)** — 省代词，绝对夺格，凯撒级简洁

每种语言三档强度：`lite`（约省 30%）、`full`（约省 60-70%）、`ultra`（约省 80-90%）。

> "古英语" 在这里指的是**莎士比亚-钦定本时期的早期现代英语**，不是学术上的盎格鲁-撒克逊古英语（《贝奥武甫》那种）——后者绝大多数 LLM 都没法稳定输出。

---

## 60 秒演示

```
你: /polycave wenyan-full
我: 文言模式既启，言简意赅。

你: 我的 React 组件为什么一直 re-render？
我: 每渲生新引，故再渲。useMemo 包之即可。

你: /polycave shanghainese-full
我: 沪语模式开脱了，灵咯。

你: 怎么修 N+1 查询问题？
我: N+1 → eager load。用 .includes 或 join，灵。

你: /polycave old-english-full
我: Verily, the bard hath taken the stage.

你: How prevent SQL injection?
我: Bind thy params, prithee. Concatenate ne'er. Use prepared statements forsooth.

你: stop polycave
我: PolyCave 已停用，恢复正常表达。
```

---

## 全部 24 种模式

| | **lite** (约 30%) | **full** (约 60-70%) | **ultra** (约 80-90%) |
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

## 安装的是什么

三层打包在一起：

| 层 | 作用 | 决定的能力 |
|---|---|---|
| **Skills**（`SKILL.md`）| 教 Claude 用各种方言/古语风格回答 | 模型表达 |
| **斜杠命令**（`.toml`）| 注册 `/polycave`、`/polycave-commit` 等命令 | `/` 快捷键 |
| **Hooks**（`.js`）| 跨会话保留模式、解析"粤语模式"等自然语言触发、渲染状态栏 | 状态持久化 + 状态栏 |

**Plugin** 是把这三层打成一个包，一条命令全装。如果你只想让模型懂方言、不要 `/` 命令也不要状态栏，把 `skills/polycave/SKILL.md` 复制到 `~/.claude/skills/polycave/` 就够了。

---

## 安装

下面四种装法殊途同归——装完 Claude Code 里打 `/polycave` 就能用。按喜好选一种：

### 方式 1 — 插件市场（最简单，两条命令）

```bash
claude plugin marketplace add TheWind-upBird/polycave
claude plugin install polycave@polycave
```

重启 Claude Code，打 `/polycave` 激活。

### 方式 2 — clone 下来跑本地安装器

和方式 1 效果一样，适合想先看源码或者插件市场连不上的情况：

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cd polycave

# macOS / Linux
bash hooks/install.sh

# Windows PowerShell
.\hooks\install.ps1
```

### 方式 3 — 一行远程安装（不 clone，不走市场）

```bash
# macOS / Linux
bash <(curl -sL https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.sh)

# Windows PowerShell
irm https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.ps1 | iex
```

### 方式 4 — 最轻：只丢 SKILL.md

如果你只想让模型懂方言、不要 `/polycave` 命令也不要状态栏和跨会话状态：

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cp -r polycave/skills/polycave* ~/.claude/skills/
```

### 其他 AI 工具（非 Claude Code）

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cd polycave
```

| 工具 | 要做什么 |
|------|----------|
| **Codex CLI** | 把 `.codex/` 复制到你的 Codex 配置目录 |
| **Gemini CLI** | `gemini extensions install https://github.com/TheWind-upBird/polycave`（无需 clone）|
| **Cursor** | 把 `.cursor/` 复制到项目根目录（规则自动生效）|
| **Windsurf** | 把 `.windsurf/` 复制到项目根目录 |
| **Cline** | 把 `.clinerules/polycave.md` 复制到项目根目录 |
| **GitHub Copilot** | 把 `.github/copilot-instructions.md` 复制到你的项目 |

### 卸载

```bash
# 方式 1（插件市场）装的
claude plugin uninstall polycave

# 方式 2/3（跑 hooks/install.sh）装的
bash hooks/uninstall.sh           # macOS / Linux
.\hooks\uninstall.ps1             # Windows

# 方式 4（手动复制 SKILL.md）装的
rm -rf ~/.claude/skills/polycave*
```

---

## 使用方法

### 激活

| 指令 | 效果 |
|------|------|
| `/polycave` | wenyan-full（默认）|
| `/polycave <lang>-<level>` | 指定模式，如 `/polycave shanghainese-ultra` |
| `/polycave <lang>` | 简写为 `<lang>-full` |
| "polycave cantonese full" | 自然语言激活 |
| "粤语模式" / "文言文模式" / "上海话模式" / "老北京模式" / "古英语模式" / "河南话模式" | 中文激活 |
| "古日語モード" | 日文激活 |

### 关闭

| 指令 | 效果 |
|------|------|
| `/polycave off` | 恢复正常 |
| `stop polycave` | 恢复正常 |
| `normal mode` | 恢复正常 |

### 语言代码与别名

| 代码 | 别名 |
|------|------|
| `cantonese` | `yue`、`粤`、`粤语` |
| `henanese` | `henan`、`河南`、`河南话` |
| `shanghainese` | `shanghai`、`wu`、`沪`、`沪语`、`上海`、`上海话` |
| `beijing` | `bj`、`jing-pianzi`、`京`、`京片子`、`京话`、`老北京`、`北京`、`北京话` |
| `wenyan` | `classical`、`文言`、`文言文` |
| `kobun` | `ja-classical`、`古日`、`古日語`、`文語` |
| `old-english` | `oe`、`early-modern`、`shakespearean`、`古英语`、`古英文` |
| `latin` | `la` |

---

## 子 skill

| Skill | 用途 |
|-------|------|
| `/polycave` | 主压缩模式 |
| `/polycave-commit` | Conventional Commits 提交信息，主题 ≤50 字符，按当前语种生成 |
| `/polycave-review` | 一行式 PR 评论，带严重性标签（🔴/🟠/🟡/🔵/🟢）|
| `/polycave-stats` | 即时 A/B 基准——终端柱状图 + 表格对比当前模式 vs 正常模式 |
| `/polycave-help` | 速查卡 |

### 例子：按语种生成 commit message

```
$ git diff --cached
[新增 401 token 自动刷新]

$ /polycave-commit wenyan
feat(auth): 增令牌之自更，遇四〇一即行

$ /polycave-commit shanghainese
feat(auth): 加 401 自动 refresh token，灵咯

$ /polycave-commit old-english
feat(auth): add token refresh anew on 401
```

### 例子：按语种 PR review

```
$ /polycave-review src/auth.ts
src/auth.ts:
  L42: 🔴 bug: token 过期辰光 user 是 null。先加个 guard 灵伐？
  L88: 🟠 risk: list 没 limit，要爆个。加 limit 灵咯。
  L120: 🟡 smell: 套头太深哉。抽个 early-return 出来。
```

---

## Auto-clarity（内置安全机制）

下列情况 PolyCave **自动暂停压缩**，恢复正常表达：

1. ⚠️ 安全警告（凭证泄漏、注入、漏洞披露）
2. 🔄 不可逆操作确认（`rm -rf`、`git push --force`、`DROP TABLE`）
3. 🧩 ≥4 步的依赖序列
4. 🐛 错误调试，清晰度优先于简洁度

处理完自动恢复之前的 polycave 模式，无需手动切换。

---

## 项目结构

```
polycave/
├── .claude-plugin/{plugin.json, marketplace.json}   # Claude Code 插件清单
├── skills/
│   ├── polycave/SKILL.md                            # 主 skill
│   ├── polycave-commit/SKILL.md
│   ├── polycave-review/SKILL.md
│   └── polycave-help/SKILL.md
├── commands/*.toml                                   # 斜杠命令定义
├── hooks/
│   ├── install.sh, install.ps1                      # 独立安装器
│   ├── uninstall.sh, uninstall.ps1
│   ├── polycave-activate.js                         # SessionStart hook
│   ├── polycave-mode-tracker.js                     # UserPromptSubmit hook
│   ├── polycave-config.js                           # 共享状态
│   └── polycave-statusline.{sh,ps1}                 # 状态栏
├── rules/polycave-activate.md                        # 规则单一事实源
├── .codex/, .cursor/, .windsurf/, .clinerules/      # 各平台镜像
├── gemini-extension.json + GEMINI.md                # Gemini CLI
├── .github/copilot-instructions.md                  # Copilot
├── AGENTS.md, CLAUDE.md                             # 通用 / Claude 上下文
└── README.md, README.zh-CN.md, README.ja.md         # 三语 README
```

---

## Token 节省（预期）

以下为基于 SKILL.md 指令规则的**预估**数字。各模式实测 benchmark 计划补在 `benchmarks/` 里。

| 任务 | 正常 | PolyCave full | 节省 |
|------|-----:|--------------:|-----:|
| 解释 React 重渲染 | 约 1200 | 约 200 | 约 83% |
| 修复 auth 中间件 | 约 700 | 约 150 | 约 78% |
| 配置数据库连接池 | 约 2300 | 约 400 | 约 83% |
| 架构说明 | 约 450 | 约 150 | 约 67% |
| **平均** | — | — | **约 75%** |

⚠️ 只压缩输出 token，思考链 token 不影响。

---

## 为什么选方言和古典语种

这些语种本身就有结构性优势：虚词可省（现代汉语的 的/了/呢；英语的冠词）、动词后缀重（文言 之/也/矣；古日 〜なり/べし）、或者天然电报体（拉丁文绝对夺格、莎翁动词）。用这些语种压缩，更像是**正经在说这门语言**，不是在跟机器人讲话。

重点不是猎奇——而是用文言或莎士比亚回答**强制简洁、强制结构化**，刚好是好技术沟通该有的样子。

---

## 贡献

欢迎 PR，特别是：
- 加更多语言（古希腊文？世界语？闽南话？低地德语？古诺尔斯语？梵语？）
- benchmarks 测试框架
- 各模式实测 token 节省
- 同步 workflow（单一源 → 各平台镜像自动生成）

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可

MIT — 见 [LICENSE](LICENSE)。自由使用，激进压缩。

---

*"少字足矣" — 文言，2026*
*"包脱即灵" — 沪语，2026*
*"Hark, brevity is the soul of wit" — 古英，1601*
