#!/usr/bin/env node
// UserPromptSubmit hook: parse user input for polycave mode changes,
// persist new state, and inject a reminder if active.
const { readState, writeState, parseModeFromText } = require('./polycave-config');

function main() {
  let input = '';
  try {
    input = require('fs').readFileSync(0, 'utf8');
  } catch {}

  let payload = {};
  try { payload = JSON.parse(input); } catch {}

  const userText = payload.user_message || payload.prompt || payload.message || '';
  const parsed = parseModeFromText(userText);

  let state = readState();
  if (parsed) {
    if (parsed.active === false) {
      state = writeState({ ...state, active: false });
    } else {
      state = writeState({ ...state, ...parsed });
    }
  }

  const out = {};
  if (state.active) {
    out.additionalContext = `<polycave-active mode="${state.lang}-${state.level}">Respond per polycave SKILL.md ${state.lang} ${state.level} rules. Suspend for security/irreversible/multi-step then resume.</polycave-active>`;
  }
  process.stdout.write(JSON.stringify(out));
}

try { main(); } catch (e) {
  process.stderr.write(`polycave-mode-tracker error: ${e.message}\n`);
  process.exit(0);
}
