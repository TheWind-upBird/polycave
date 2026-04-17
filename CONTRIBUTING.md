# Contributing to PolyCave

Thanks for wanting to make polycave better. Here's how.

## What we want

| Wanted | Notes |
|--------|-------|
| New languages | 古希腊文, 上海话, Plattdeutsch, Esperanto, Old English, Quenya, anything with structure |
| Per-mode benchmarks | Real measured token savings against the prompt set |
| Bug fixes in hooks | Especially Windows-specific edge cases |
| Better SKILL.md examples | More natural, more idiomatic per-language samples |
| Sync workflow | One canonical rule → auto-fan-out to all platform mirrors |

## What we don't want

- Code changes that break the "code never gets compressed" invariant
- New compression that bypasses the auto-clarity safeguards
- Languages without clear structural rules (something purely emoji-based, etc.)

## Adding a new language

1. **Edit `rules/polycave-activate.md`** — add a row to the mode matrix and a per-language section with lite/full/ultra examples
2. **Mirror to `skills/polycave/SKILL.md`** — keep both files in sync
3. **Add aliases** — update `hooks/polycave-config.js` `ALIASES` map and `LANGUAGES` array
4. **Update SKILL.md examples** — add per-language samples in `polycave-commit/SKILL.md` and `polycave-review/SKILL.md`
5. **Update READMEs** — add to mode matrix in all three READMEs (en, zh-CN, ja)
6. **Update `polycave-help/SKILL.md`** — add to language code table

## Style for examples

- Each level should be visibly more compressed than the previous
- Keep technical content (function names, file paths, error messages) verbatim
- Examples should be runnable thinking — explain the same React/SQL/auth concept across all languages so readers can compare
- Prefer authentic dialect/register over cartoon stereotypes

## Testing locally

```bash
# Sanity-check JSON files
node -e "JSON.parse(require('fs').readFileSync('.claude-plugin/plugin.json', 'utf8'))"
node -e "JSON.parse(require('fs').readFileSync('.claude-plugin/marketplace.json', 'utf8'))"

# Try installer in dry-run
bash hooks/install.sh --help

# Try the hooks manually
echo '{"user_message":"/polycave wenyan-ultra"}' | node hooks/polycave-mode-tracker.js
cat ~/.claude/polycave-state.json
```

## Commit style

Use polycave-commit format (feat/fix/refactor/docs/chore, ≤50 char subject).
Either English or any of the supported polycave languages — your choice.

## License

By contributing, you agree your contributions are licensed under MIT.
