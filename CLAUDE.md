# PolyCave 多言 — Claude Code Project Context

You are working on **polycave (多言 / Duoyan)**, a Claude Code plugin and standalone
skill that compresses LLM output across 7 dialect/classical languages × 3 intensity levels.

It specializes in dialects and classical languages. Modern English compression
is intentionally out of scope.

## Project layout

```
polycave/
├── .claude-plugin/{plugin.json, marketplace.json}   # Claude Code plugin
├── skills/{polycave,polycave-commit,polycave-review,polycave-help}/SKILL.md
├── commands/*.toml                                   # /polycave slash commands
├── hooks/                                            # install/uninstall + JS hooks
├── rules/polycave-activate.md                        # canonical rule (single source of truth)
├── .codex/, .cursor/, .windsurf/, .clinerules/      # multi-platform mirrors
├── gemini-extension.json + GEMINI.md                # Gemini CLI
├── .github/copilot-instructions.md                  # GitHub Copilot
├── AGENTS.md                                         # universal agent context
└── README.md, README.zh-CN.md, README.ja.md         # tri-lingual docs
```

## Single source of truth

`rules/polycave-activate.md` is the canonical content. All platform-specific
files (`.cursor/rules/`, `.windsurf/rules/`, etc.) should mirror its rules.
When you change one, change them all (or set up the sync workflow).

## Key invariants

- Seven languages: `cantonese, henanese, shanghainese, wenyan, kobun, old-english, latin`
- Three levels: `lite, full, ultra`
- Mode string format: `<lang>-<level>` (e.g. `wenyan-ultra`, `old-english-full`)
- Default mode: `wenyan-full` (matches the spirit of the project's home directory)
- State file: `~/.claude/polycave-state.json` (managed by hooks)
- Plugin name `polycave` is referenced in many files — rename via global str-replace if needed
- "古英语" / `old-english` here means **Early Modern English** (Shakespearean), not academic Anglo-Saxon

## Don't

- Don't compress code blocks
- Don't compress security warnings, irreversible action confirmations, ≥4-step sequences
- Don't add a co-authored-by line in commits unless user requests it
- Don't add a modern-English compression mode — out of scope for this project
