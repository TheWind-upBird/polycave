# 🦴 PolyCave 多言 (Duoyan)

> *多言にして字少なし — Many tongues, few words.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-8-blue.svg)](#24-モード一覧)
[![Modes](https://img.shields.io/badge/modes-24-purple.svg)](#24-モード一覧)

Claude Code、Codex、Gemini CLI、Cursor、Windsurf、Cline、Copilot 向けの **方言・古典語圧縮スキル**。LLM の出力を **60-85% 削減**しつつ、コードや技術用語は一切無傷で残す。**8 つの方言・古典語 × 3 段階の強度 = 24 通りの圧縮モード**。

🌐 **README**：[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

**方言と古典・文学的レジスターの圧縮に特化**。現代英語の圧縮は対象外（設計上の判断）。多言が活きるのは 広東語、河南語、上海語、北京語（老北京 / 京片子）、文言文、古日語、シェイクスピア英語、ラテン語。

---

## なぜ作ったか

LLM の応答は冗長になりがち：冠詞、ヘッジ、「説明します」「いい質問ですね」など。多言は無駄を削り本質を残し、さらに言語スタイルが選べる：

- **広東語 (Cantonese)** — `嘅 / 咗 / 喺 / 咁 / 劲 / 正 / 食花生 / 咁都得` 多用、主語省略、地道粤味
- **河南語 (Henanese)** — 中国河南方言、`中 / 咋 / 恁 / 弄啥嘞` 風
- **上海語 (Shanghainese)** — 上海呉語、`搿 / 侬 / 伊 / 勿 / 哉 / 脱 / 腔调 / 嗲 / 结棍 / 灵光` 多用、地道沪味
- **北京語 / 老北京 (Beijing / 京片子)** — 京味儿、`您 / 爷 / 儿化音 / 哎呦喂 (AUV) / 得嘞 / 倍儿棒 / 门儿清 / 瓷器`
- **文言文 (Wenyan)** — 古典中国語、`之 / 乎 / 者 / 也 / 矣`、約 85% 削減
- **古日語 (Kobun / 文語)** — `〜なり / 〜たり / 〜けり / 〜べし`
- **古英語 (Old English)** — シェイクスピア期の Early Modern English：thee/thou/hast/forsooth
- **ラテン語 (Latin)** — 代名詞省略、絶対奪格、カエサル級の簡潔

各言語に三段階：`lite`（約 30% 削減）、`full`（約 60-70%）、`ultra`（約 80-90%）。

> 「古英語」は本プロジェクトでは **シェイクスピア期の Early Modern English**（thee/thou/hast 等）を指す。学術的な古英語（Beowulf 期）は LLM が安定出力できないため採用しない。

---

## 60 秒デモ

```
You: /polycave kobun-full
Bot: 文語モード起動せり。簡にして要を得たり。

You: React コンポーネントが何度も再レンダリングされる理由は？
Bot: 新参照生み、再描画さる。useMemo にて包むべし。

You: /polycave shanghainese-full
Bot: 沪语模式开脱了，灵咯。

You: N+1 クエリの修正方法は？
Bot: N+1 → eager load。`.includes` 或 join，灵。

You: /polycave old-english-full
Bot: Verily, the bard hath taken the stage.

You: How prevent SQL injection?
Bot: Bind thy params, prithee. Concatenate ne'er. Use prepared statements forsooth.

You: stop polycave
Bot: PolyCave deactivated. 通常モードに戻ります。
```

---

## 24 モード一覧

| | **lite** (約 30%) | **full** (約 60-70%) | **ultra** (約 80-90%) |
|---|---|---|---|
| **粤语** | "因为呢个 object 每次 render 都会创建新嘅 reference，所以重新 render 咗，冇眼睇啦。" | "object 每次 render 新 ref，咁都再 render？包喺 useMemo 度，劲。" | "obj → 新 ref → 重 render。useMemo 包，正。" |
| **河南话** | "这个 object 每次 render 都创建新引用，所以重新 render 咧。" | "object 每回 render 新 ref，弄得重 render 咧。" | "obj → 新 ref → 重 render。useMemo 包，中。" |
| **上海话** | "因为搿个 object 每趟 render 侪会创建新嘅 reference，所以重新 render 哉，邪气勿适意。" | "搿 object 每趟 render 新 ref，再 render 哉。useMemo 包脱，灵光。" | "obj → 新 ref → 重 render。useMemo 包脱，嗲。" |
| **老北京** | "哎您瞧啊，这 object 每回儿 render 都整新的 reference 出来，真真儿的没辙。" | "object 每回儿 render 整新 ref，重 render 没跑儿。useMemo 包上，得嘞。" | "obj → 新 ref → 重 render。useMemo 包，成。AUV。" |
| **文言文** | "盖此 object 每渲皆生新引，故再渲也。" | "每渲生新引，故再渲。useMemo 包之即可。" | "新引 → 再渲。useMemo 之。" |
| **古日語** | "オブジェクト毎度新しき参照を生むがゆゑに、再描画さるるなり。" | "新参照生み、再描画さる。useMemo にて包むべし。" | "新参照 → 再描画。useMemo に包め。" |
| **古英语** | "The new object reference doth cause a re-render. Wrap it in useMemo, prithee." | "Object new ref doth spawn each render. Wrap in `useMemo`, forsooth." | "Obj spawneth ref → re-render. `useMemo`, hark!" |
| **latin** | "Obiectum novam referentiam quoque vice creat, ergo iterum redditur." | "Nova ref quoque vice → iterum redditur. useMemo adhibe." | "Nov ref → re-render. useMemo!" |

---

## 何がインストールされるか

三層が一つにパッケージされている：

| 層 | 役割 | 必要な機能 |
|---|---|---|
| **Skills**（`SKILL.md`）| 各方言・古典語スタイルでの応答方法を Claude に教える | モデルの表現 |
| **スラッシュコマンド**（`.toml`）| `/polycave`、`/polycave-commit` 等を登録 | `/` ショートカット |
| **フック**（`.js`）| セッション跨ぎでモード保持、「粤语模式」等の自然言語起動、ステータスバー描画 | 状態永続化 + ステータスバー |

**プラグイン**は三層をまとめて一発インストールできる包装。モデルに方言を教えるだけで `/` コマンドもステータスバーも不要なら、`skills/polycave/SKILL.md` を `~/.claude/skills/polycave/` に置くだけで足りる。

---

## インストール

四つの方法はどれも同じゴール — Claude Code で `/polycave` と打てば多言モードが起動する。好きな方法を選ぶ：

### 方法 1 — プラグインマーケット（最も簡単、二コマンド）

```bash
claude plugin marketplace add TheWind-upBird/polycave
claude plugin install polycave@polycave
```

Claude Code を再起動し `/polycave` で起動。

### 方法 2 — clone してローカルインストーラを実行

方法 1 と同じ結果。ソースを事前に確認したい、またはプラグインマーケットに接続できない時に便利：

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cd polycave

# macOS / Linux
bash hooks/install.sh

# Windows PowerShell
.\hooks\install.ps1
```

### 方法 3 — ワンライナー遠隔インストール（clone 不要、マーケット経由せず）

```bash
# macOS / Linux
bash <(curl -sL https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.sh)

# Windows PowerShell
irm https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.ps1 | iex
```

### 方法 4 — 最軽量：SKILL.md だけ配置

モデルに方言を教えるだけで、`/polycave` コマンドもステータスバーもセッション越しの状態保持も不要な場合：

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cp -r polycave/skills/polycave* ~/.claude/skills/
```

### その他の AI ツール（Claude Code 以外）

```bash
git clone https://github.com/TheWind-upBird/polycave.git
cd polycave
```

| ツール | 作業内容 |
|--------|----------|
| **Codex CLI** | `.codex/` を Codex 設定ディレクトリへコピー |
| **Gemini CLI** | `gemini extensions install https://github.com/TheWind-upBird/polycave`（clone 不要）|
| **Cursor** | `.cursor/` をプロジェクトルートにコピー（自動適用）|
| **Windsurf** | `.windsurf/` をプロジェクトルートにコピー |
| **Cline** | `.clinerules/polycave.md` をプロジェクトルートにコピー |
| **GitHub Copilot** | `.github/copilot-instructions.md` をプロジェクトにコピー |

### アンインストール

```bash
# 方法 1（マーケット経由）でインストールした場合
claude plugin uninstall polycave

# 方法 2/3（hooks/install.sh）でインストールした場合
bash hooks/uninstall.sh           # macOS / Linux
.\hooks\uninstall.ps1             # Windows

# 方法 4（SKILL.md 手動コピー）の場合
rm -rf ~/.claude/skills/polycave*
```

---

## 使い方

### 起動

| コマンド | 効果 |
|---------|------|
| `/polycave` | wenyan-full（既定）|
| `/polycave <lang>-<level>` | 特定モード、例：`/polycave kobun-ultra` |
| `/polycave <lang>` | `<lang>-full` の省略形 |
| "polycave cantonese full" | 自然言語起動 |
| "粤语模式" / "文言文模式" / "上海话模式" / "老北京模式" / "古英语模式" / "河南话模式" | 中国語起動 |
| "古日語モード" | 日本語起動 |

### 停止

| コマンド | 効果 |
|---------|------|
| `/polycave off` | 通常に復帰 |
| `stop polycave` | 通常に復帰 |
| `normal mode` | 通常に復帰 |

### 言語コードと別名

| コード | 別名 |
|-------|------|
| `cantonese` | `yue`、`粤`、`粤语` |
| `henanese` | `henan`、`河南`、`河南话` |
| `shanghainese` | `shanghai`、`wu`、`沪`、`沪语`、`上海`、`上海话` |
| `beijing` | `bj`、`jing-pianzi`、`京`、`京片子`、`京话`、`老北京`、`北京`、`北京话` |
| `wenyan` | `classical`、`文言`、`文言文` |
| `kobun` | `ja-classical`、`古日`、`古日語`、`文語` |
| `old-english` | `oe`、`early-modern`、`shakespearean`、`古英语`、`古英文` |
| `latin` | `la` |

---

## サブスキル

| Skill | 用途 |
|-------|------|
| `/polycave` | メイン圧縮モード |
| `/polycave-commit` | Conventional Commits 形式、件名 ≤50 字、現在の言語に対応 |
| `/polycave-review` | 一行 PR コメント、深刻度タグ付き（🔴/🟠/🟡/🔵/🟢）|
| `/polycave-stats` | オンデマンド A/B ベンチ — ターミナルに棒グラフ + 表を表示 |
| `/polycave-help` | クイックリファレンス |

### 例：言語別コミットメッセージ

```
$ git diff --cached
[401 トークン自動更新を追加]

$ /polycave-commit kobun
feat(auth): 401 にて令牌を自ら更むる機能を加ふ

$ /polycave-commit shanghainese
feat(auth): 加 401 自动 refresh token，灵咯

$ /polycave-commit old-english
feat(auth): add token refresh anew on 401
```

### 例：言語別 PR レビュー

```
$ /polycave-review src/auth.ts
src/auth.ts:
  L42: 🔴 bug: 令牌尽きし時 user は空なり。先に守るべし。
  L88: 🟠 risk: 限りなき遍歴あり。limit を加ふべし。
  L120: 🟡 smell: 入れ子深し。early-return にて解け。
```

---

## Auto-clarity（自動安全機構）

以下の場面では PolyCave は **一時的に通常言語に復帰**：

1. ⚠️ セキュリティ警告（資格情報漏洩、インジェクション、脆弱性開示）
2. 🔄 取り返しのつかない操作の確認（`rm -rf`、`git push --force`、`DROP TABLE`）
3. 🧩 4 ステップ以上の依存シーケンス
4. 🐛 エラーデバッグ時、明瞭性が簡潔性に優先

その後、直前の polycave モードに自動復帰。

---

## プロジェクト構成

```
polycave/
├── .claude-plugin/{plugin.json, marketplace.json}
├── skills/
│   ├── polycave/SKILL.md                            # メインスキル
│   ├── polycave-commit/SKILL.md
│   ├── polycave-review/SKILL.md
│   └── polycave-help/SKILL.md
├── commands/*.toml
├── hooks/                                           # インストーラ + JS フック
├── rules/polycave-activate.md                       # ルールの単一情報源
├── .codex/, .cursor/, .windsurf/, .clinerules/     # 各プラットフォーム用
├── gemini-extension.json + GEMINI.md
├── .github/copilot-instructions.md
├── AGENTS.md, CLAUDE.md
└── README.md, README.zh-CN.md, README.ja.md
```

---

## トークン削減（予測値）

SKILL.md の指示プロファイルに基づく**予測値**。モード別の実測ベンチマークは `benchmarks/` に追加予定。

| タスク | 通常 | PolyCave full | 削減率 |
|------|-----:|--------------:|------:|
| React 再描画の説明 | 約 1200 | 約 200 | 約 83% |
| auth ミドルウェア修正 | 約 700 | 約 150 | 約 78% |
| DB コネクションプール設定 | 約 2300 | 約 400 | 約 83% |
| アーキテクチャ説明 | 約 450 | 約 150 | 約 67% |
| **平均** | — | — | **約 75%** |

⚠️ 影響を受けるのは出力トークンのみ。推論トークンは変わらない。

---

## なぜ方言と古典語に絞るのか

これらのレジスターは構造的に圧縮に向いている：省略可能な虚詞（現代中国語の 的/了/呢、英語の冠詞）、語尾の重い活用（文言 之/也/矣、古日 〜なり/べし）、確立された電報体（ラテン語の絶対奪格、シェイクスピア期動詞活用）。これらで圧縮すると、**ロボット相手ではなく、その言語を正しく話している**感覚に近い。

奇を衒うためではない。文言やシェイクスピア英語で答えることは **簡潔さと構造化を強制する** — 技術コミュニケーションが本来求めているもの、そのものだ。

---

## 貢献

PR 歓迎。特に：
- 言語追加（古典ギリシャ語？エスペラント？閩南語？低地ドイツ語？古ノルド語？サンスクリット？）
- ベンチマークハーネス
- モード別の実測トークン削減データ
- 同期ワークフロー（単一情報源 → 各プラットフォーム自動生成）

詳細は [CONTRIBUTING.md](CONTRIBUTING.md)。

## ライセンス

MIT — [LICENSE](LICENSE) 参照。自由に使い、果敢に圧縮を。

---

*「少字足矣」— 文言、2026*
*「包脱即灵」— 沪语、2026*
*"Hark, brevity is the soul of wit" — 古英、1601*
