// Shared config + state helpers for polycave hooks.
// State file lives at $POLYCAVE_STATE or ~/.claude/polycave-state.json
const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();
const CLAUDE_DIR = process.env.CLAUDE_CONFIG_DIR || path.join(HOME, '.claude');
const STATE_FILE = process.env.POLYCAVE_STATE || path.join(CLAUDE_DIR, 'polycave-state.json');
const HISTORY_FILE = process.env.POLYCAVE_HISTORY || path.join(CLAUDE_DIR, 'polycave-state-history.jsonl');

const LANGUAGES = ['cantonese', 'henanese', 'shanghainese', 'wenyan', 'kobun', 'old-english', 'latin'];
const LEVELS = ['lite', 'full', 'ultra'];

const ALIASES = {
  yue: 'cantonese', '粤': 'cantonese', '粤语': 'cantonese',
  henan: 'henanese', '河南': 'henanese', '河南话': 'henanese',
  shanghai: 'shanghainese', wu: 'shanghainese', '沪': 'shanghainese', '沪语': 'shanghainese', '上海': 'shanghainese', '上海话': 'shanghainese',
  classical: 'wenyan', '文言': 'wenyan', '文言文': 'wenyan',
  'ja-classical': 'kobun', '古日': 'kobun', '古日語': 'kobun', '文語': 'kobun',
  oe: 'old-english', 'early-modern': 'old-english', shakespearean: 'old-english', '古英语': 'old-english', '古英文': 'old-english',
  la: 'latin',
};

function normalizeLang(s) {
  if (!s) return null;
  const k = s.toLowerCase().trim();
  if (LANGUAGES.includes(k)) return k;
  return ALIASES[k] || ALIASES[s] || null;
}

function defaultState() {
  return { active: false, lang: 'wenyan', level: 'full', updatedAt: null };
}

function readState() {
  try {
    if (!fs.existsSync(STATE_FILE)) return defaultState();
    const raw = fs.readFileSync(STATE_FILE, 'utf8');
    const s = JSON.parse(raw);
    return { ...defaultState(), ...s };
  } catch {
    return defaultState();
  }
}

function writeState(state) {
  try {
    fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
    const next = { ...state, updatedAt: new Date().toISOString() };
    fs.writeFileSync(STATE_FILE, JSON.stringify(next, null, 2));
    // Append to history for /polycave-stats time-correlation.
    // Only log when active/lang/level actually changed vs prior history tail.
    try {
      const tail = readHistoryTail();
      const changed = !tail || tail.active !== next.active || tail.lang !== next.lang || tail.level !== next.level;
      if (changed) {
        fs.appendFileSync(HISTORY_FILE, JSON.stringify({
          ts: next.updatedAt,
          active: !!next.active,
          lang: next.lang,
          level: next.level,
        }) + '\n');
      }
    } catch {}
    return next;
  } catch {
    return state;
  }
}

function readHistoryTail() {
  try {
    if (!fs.existsSync(HISTORY_FILE)) return null;
    const raw = fs.readFileSync(HISTORY_FILE, 'utf8').trim();
    if (!raw) return null;
    const lines = raw.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      try { return JSON.parse(lines[i]); } catch {}
    }
    return null;
  } catch { return null; }
}

function parseModeFromText(text) {
  if (!text) return null;
  const t = text.toLowerCase();

  // Stop phrases
  if (/\b(stop polycave|normal mode|\/polycave\s+off)\b/.test(t)) {
    return { active: false };
  }

  // Helper: parse "old-english-lite" / "wenyan ultra" / "shanghainese" etc.
  // Strategy: try to peel off a trailing level token, treat remainder as lang.
  function parseModeArgs(args) {
    if (!args) return null;
    const levelTrail = args.match(/[-\s](lite|full|ultra)$/i);
    if (levelTrail) {
      const level = levelTrail[1].toLowerCase();
      const langStr = args.slice(0, args.length - levelTrail[0].length).trim();
      const lang = normalizeLang(langStr);
      if (lang) return { active: true, lang, level };
    }
    // No trailing level → whole thing is the lang, default to 'full'
    const lang = normalizeLang(args.trim());
    if (lang) return { active: true, lang, level: 'full' };
    return null;
  }

  // Slash command: /polycave [args] (skip /polycave-commit, /polycave-review, /polycave-help)
  const slashMatch = text.match(/\/polycave(?!-(?:commit|review|help))\s*([^\n]*)/i);
  if (slashMatch) {
    const args = (slashMatch[1] || '').trim();
    if (!args || args === 'on') {
      return { active: true, lang: 'wenyan', level: 'full' };
    }
    const parsed = parseModeArgs(args);
    if (parsed) return parsed;
  }

  // Natural language activation: "polycave <lang> <level>" or "polycave <lang>-<level>"
  const nlMatch = text.match(/\bpolycave\s+([\p{L}][\p{L}\-\s]*?)(?:\s+(lite|full|ultra))?\b/iu);
  if (nlMatch) {
    const langStr = nlMatch[1].trim();
    const level = (nlMatch[2] || 'full').toLowerCase();
    const lang = normalizeLang(langStr);
    if (lang && LEVELS.includes(level)) {
      return { active: true, lang, level };
    }
  }

  // Chinese / Japanese / English activation phrases
  if (/(粤语|文言文|河南话|上海话|古日|文語|古英语|古英文)模式/.test(text)) {
    const langMap = {
      '粤语': 'cantonese', '文言文': 'wenyan', '河南话': 'henanese',
      '上海话': 'shanghainese', '古日': 'kobun', '文語': 'kobun',
      '古英语': 'old-english', '古英文': 'old-english',
    };
    for (const [k, v] of Object.entries(langMap)) {
      if (text.includes(k)) return { active: true, lang: v, level: 'full' };
    }
  }

  return null;
}

module.exports = {
  HOME, CLAUDE_DIR, STATE_FILE, HISTORY_FILE,
  LANGUAGES, LEVELS, ALIASES,
  normalizeLang, defaultState, readState, writeState, readHistoryTail, parseModeFromText,
};
