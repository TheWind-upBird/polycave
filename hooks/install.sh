#!/usr/bin/env bash
# polycave standalone installer for Claude Code (no plugin marketplace required).
# Usage:
#   bash <(curl -sL https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.sh)
# Or from a local clone:
#   bash hooks/install.sh [--force]

set -euo pipefail

FORCE=0
for arg in "$@"; do
  case "$arg" in
    --force|-f) FORCE=1 ;;
    --help|-h)
      cat <<EOF
polycave installer
  --force, -f   Reinstall even if already configured
  --help,  -h   Show this help
EOF
      exit 0
      ;;
  esac
done

# --- Pre-flight checks --------------------------------------------------------
command -v node >/dev/null 2>&1 || {
  echo "❌ node is required (used to safely merge JSON settings)." >&2
  echo "   Install Node.js from https://nodejs.org/ then re-run." >&2
  exit 1
}

CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
SETTINGS="$CLAUDE_DIR/settings.json"
HOOKS_DIR="$CLAUDE_DIR/polycave-hooks"

mkdir -p "$HOOKS_DIR"

# --- Source files: prefer local, fall back to GitHub raw ----------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd 2>/dev/null || echo "")"
RAW_BASE="https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks"

copy_or_fetch() {
  local name="$1"
  local dest="$HOOKS_DIR/$name"
  if [ -n "$SCRIPT_DIR" ] && [ -f "$SCRIPT_DIR/$name" ]; then
    cp "$SCRIPT_DIR/$name" "$dest"
  else
    if command -v curl >/dev/null 2>&1; then
      curl -sSLf "$RAW_BASE/$name" -o "$dest"
    else
      echo "❌ curl required when installing via pipe." >&2
      exit 1
    fi
  fi
}

for f in package.json polycave-config.js polycave-activate.js polycave-mode-tracker.js polycave-statusline.sh polycave-statusline.ps1 polycave-stats.js; do
  copy_or_fetch "$f"
done
chmod +x "$HOOKS_DIR/polycave-statusline.sh" "$HOOKS_DIR/polycave-activate.js" "$HOOKS_DIR/polycave-mode-tracker.js"

# --- Idempotent settings merge via embedded node ------------------------------
export POLYCAVE_SETTINGS="$SETTINGS"
export POLYCAVE_HOOKS_DIR="$HOOKS_DIR"
export POLYCAVE_FORCE="$FORCE"

node - <<'NODE'
const fs = require('fs');
const path = require('path');

const SETTINGS = process.env.POLYCAVE_SETTINGS;
const HOOKS_DIR = process.env.POLYCAVE_HOOKS_DIR;
const FORCE = process.env.POLYCAVE_FORCE === '1';

let settings = {};
if (fs.existsSync(SETTINGS)) {
  try { settings = JSON.parse(fs.readFileSync(SETTINGS, 'utf8')); }
  catch (e) { console.error('Could not parse', SETTINGS, '-', e.message); process.exit(1); }
  fs.copyFileSync(SETTINGS, SETTINGS + '.bak');
} else {
  fs.mkdirSync(path.dirname(SETTINGS), { recursive: true });
}

const activateCmd = `node "${path.join(HOOKS_DIR, 'polycave-activate.js')}"`;
const trackerCmd = `node "${path.join(HOOKS_DIR, 'polycave-mode-tracker.js')}"`;
const statuslineCmd = process.platform === 'win32'
  ? `powershell -ExecutionPolicy Bypass -File "${path.join(HOOKS_DIR, 'polycave-statusline.ps1')}"`
  : `bash "${path.join(HOOKS_DIR, 'polycave-statusline.sh')}"`;

settings.hooks = settings.hooks || {};

function ensureHook(eventName, command, statusMessage) {
  settings.hooks[eventName] = settings.hooks[eventName] || [];
  const already = settings.hooks[eventName].some(group =>
    (group.hooks || []).some(h => h.command === command)
  );
  if (already && !FORCE) return false;
  if (already && FORCE) {
    settings.hooks[eventName] = settings.hooks[eventName].map(group => ({
      ...group,
      hooks: (group.hooks || []).filter(h => h.command !== command),
    })).filter(g => (g.hooks || []).length > 0);
  }
  settings.hooks[eventName].push({
    hooks: [{ type: 'command', command, timeout: 5, statusMessage }],
  });
  return true;
}

const a = ensureHook('SessionStart', activateCmd, 'Loading polycave mode...');
const b = ensureHook('UserPromptSubmit', trackerCmd, 'Tracking polycave mode...');

if (!settings.statusLine) {
  settings.statusLine = { type: 'command', command: statuslineCmd };
} else if (!String(settings.statusLine.command || '').includes('polycave-statusline')) {
  console.error('NOTE: existing statusLine preserved. Polycave statusline NOT installed.');
  console.error('      To use polycave statusline, remove your existing statusLine from settings.json.');
}

fs.writeFileSync(SETTINGS, JSON.stringify(settings, null, 2));
console.log(`✅ polycave installed to ${HOOKS_DIR}`);
console.log(`   Settings: ${SETTINGS} (backup: ${SETTINGS}.bak)`);
console.log(`   SessionStart hook: ${a ? 'added' : 'already present'}`);
console.log(`   UserPromptSubmit hook: ${b ? 'added' : 'already present'}`);
NODE

echo ""
echo "🦴 Done. Restart Claude Code, then say '/polycave' to activate."
