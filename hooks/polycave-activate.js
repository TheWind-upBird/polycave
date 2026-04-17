#!/usr/bin/env node
// SessionStart hook: announce polycave is loaded and inject the active mode
// into the session context as a system reminder.
const { readState } = require('./polycave-config');

function main() {
  const state = readState();
  const out = {};

  if (state.active) {
    out.systemMessage = `polycave active: ${state.lang}-${state.level}. Say "stop polycave" to revert.`;
    out.additionalContext = `<polycave-state>active=true lang=${state.lang} level=${state.level}</polycave-state>`;
  } else {
    out.systemMessage = `polycave loaded (inactive). Use /polycave to activate.`;
  }

  process.stdout.write(JSON.stringify(out));
}

try { main(); } catch (e) {
  process.stderr.write(`polycave-activate error: ${e.message}\n`);
  process.exit(0); // never block session start
}
