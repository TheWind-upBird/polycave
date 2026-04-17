#!/usr/bin/env bash
# polycave uninstaller for Claude Code.
set -euo pipefail

CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
SETTINGS="$CLAUDE_DIR/settings.json"
HOOKS_DIR="$CLAUDE_DIR/polycave-hooks"

if [ ! -f "$SETTINGS" ]; then
  echo "No settings found at $SETTINGS — nothing to do."
  exit 0
fi

command -v node >/dev/null 2>&1 || { echo "❌ node required" >&2; exit 1; }

cp "$SETTINGS" "$SETTINGS.bak"
export POLYCAVE_SETTINGS="$SETTINGS"

node - <<'NODE'
const fs = require('fs');
const SETTINGS = process.env.POLYCAVE_SETTINGS;
const s = JSON.parse(fs.readFileSync(SETTINGS, 'utf8'));

function strip(arr) {
  return (arr || []).map(g => ({...g, hooks: (g.hooks||[]).filter(h => !String(h.command||'').includes('polycave'))}))
                    .filter(g => (g.hooks || []).length > 0);
}

if (s.hooks) {
  for (const k of Object.keys(s.hooks)) s.hooks[k] = strip(s.hooks[k]);
  for (const k of Object.keys(s.hooks)) if (s.hooks[k].length === 0) delete s.hooks[k];
  if (Object.keys(s.hooks).length === 0) delete s.hooks;
}
if (s.statusLine && String(s.statusLine.command || '').includes('polycave-statusline')) {
  delete s.statusLine;
}

fs.writeFileSync(SETTINGS, JSON.stringify(s, null, 2));
console.log('✅ polycave hooks removed from settings.json');
NODE

if [ -d "$HOOKS_DIR" ]; then
  rm -rf "$HOOKS_DIR"
  echo "✅ removed $HOOKS_DIR"
fi
echo "🦴 Uninstalled. State file at $CLAUDE_DIR/polycave-state.json kept (delete manually if desired)."
