#!/usr/bin/env bash
# Polycave statusline: show active mode in Claude Code status bar.
set -eu
STATE_FILE="${POLYCAVE_STATE:-${CLAUDE_CONFIG_DIR:-$HOME/.claude}/polycave-state.json}"

if [ ! -f "$STATE_FILE" ]; then
  printf '🦴 polycave: off'
  exit 0
fi

active=$(grep -o '"active"[^,}]*' "$STATE_FILE" | grep -o 'true\|false' | head -1)
lang=$(grep -o '"lang"[^,}]*' "$STATE_FILE" | sed -E 's/.*"([a-z]+)".*/\1/' | head -1)
level=$(grep -o '"level"[^,}]*' "$STATE_FILE" | sed -E 's/.*"([a-z]+)".*/\1/' | head -1)

if [ "$active" = "true" ]; then
  printf '🦴 polycave: %s-%s' "${lang:-?}" "${level:-?}"
else
  printf '🦴 polycave: off'
fi
