#!/usr/bin/env node
// Cumulative polycave usage stats: scans Claude Code session transcripts +
// polycave-state-history.jsonl, cross-references timestamps to determine which
// mode was active for each assistant response, aggregates, renders chart+table.
const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = process.env.HOME || os.homedir();
const CLAUDE_DIR = process.env.CLAUDE_CONFIG_DIR || path.join(HOME, '.claude');
const HISTORY_FILE = process.env.POLYCAVE_HISTORY || path.join(CLAUDE_DIR, 'polycave-state-history.jsonl');
const PROJECTS_DIR = path.join(CLAUDE_DIR, 'projects');

// SKILL.md compression ratios — used to estimate baseline tokens.
const COMPRESSION_RATIOS = { lite: 0.30, full: 0.65, ultra: 0.85 };

// Token estimation tuned to Claude/GPT-4 BPE behavior:
// - CJK chars typically split into ~2 BPE tokens (UTF-8 byte-level BPE)
// - Hiragana/katakana: ~1.5 tokens
// - Hangul: ~2.5 tokens
// - ASCII: ~4 chars per token
// - Whitespace/punctuation: usually absorbed by neighbors
// Calibrated against Anthropic tokenizer samples — accurate to ~±20%.
function estimateTokens(text) {
  if (!text) return 0;
  let cjk = 0, kana = 0, hangul = 0, ascii = 0;
  for (const c of text) {
    const cc = c.codePointAt(0);
    if ((cc >= 0x4e00 && cc <= 0x9fff) || (cc >= 0x3400 && cc <= 0x4dbf)) cjk++;
    else if (cc >= 0x3040 && cc <= 0x30ff) kana++;
    else if (cc >= 0xac00 && cc <= 0xd7af) hangul++;
    else ascii++;
  }
  return Math.round(cjk * 2 + kana * 1.5 + hangul * 2.5 + ascii * 0.25);
}

function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  const raw = fs.readFileSync(HISTORY_FILE, 'utf8').trim();
  if (!raw) return [];
  return raw.split('\n')
    .map(l => { try { return JSON.parse(l); } catch { return null; }})
    .filter(Boolean)
    .sort((a, b) => (a.ts || '').localeCompare(b.ts || ''));
}

function modeAtTimestamp(history, ts) {
  if (!ts) return { active: false, lang: 'off', level: 'none' };
  let mode = { active: false, lang: 'off', level: 'none' };
  for (const h of history) {
    if (!h.ts) continue;
    if (h.ts <= ts) mode = h;
    else break;
  }
  return mode;
}

function findAllSessionTranscripts() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const out = [];
  for (const proj of fs.readdirSync(PROJECTS_DIR)) {
    const projPath = path.join(PROJECTS_DIR, proj);
    let stat; try { stat = fs.statSync(projPath); } catch { continue; }
    if (!stat.isDirectory()) continue;
    for (const f of fs.readdirSync(projPath)) {
      if (f.endsWith('.jsonl')) out.push(path.join(projPath, f));
    }
  }
  return out;
}

function parseTranscript(filepath) {
  const messages = [];
  let lines;
  try { lines = fs.readFileSync(filepath, 'utf8').split('\n'); }
  catch { return messages; }
  for (const line of lines) {
    if (!line.trim()) continue;
    let ev;
    try { ev = JSON.parse(line); } catch { continue; }
    if (ev.type !== 'assistant') continue;
    const msg = ev.message || {};
    let text = '';
    if (typeof msg.content === 'string') text = msg.content;
    else if (Array.isArray(msg.content)) {
      text = msg.content
        .filter(c => c && c.type === 'text')
        .map(c => c.text || '').join('');
    }
    if (!text || !text.trim()) continue;
    const ts = ev.timestamp || msg.timestamp || ev.ts || null;
    messages.push({ ts, chars: text.length, tokens: estimateTokens(text) });
  }
  return messages;
}

function aggregate() {
  const history = loadHistory();
  const transcripts = findAllSessionTranscripts();
  const byMode = {};
  let total = 0, sessions = 0;
  for (const tp of transcripts) {
    const msgs = parseTranscript(tp);
    if (msgs.length === 0) continue;
    sessions++;
    for (const m of msgs) {
      total++;
      const mode = modeAtTimestamp(history, m.ts);
      const key = mode.active ? `${mode.lang}-${mode.level}` : 'off';
      if (!byMode[key]) byMode[key] = { count: 0, totalChars: 0, totalTokens: 0, lang: mode.lang, level: mode.level, active: mode.active };
      byMode[key].count++;
      byMode[key].totalChars += m.chars;
      byMode[key].totalTokens += m.tokens;
    }
  }
  return { byMode, total, sessions, historyEntries: history.length };
}

function renderBar(value, max, width = 30) {
  if (max <= 0) return '·'.repeat(width);
  const filled = Math.max(0, Math.min(width, Math.round((value / max) * width)));
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

const fmt = n => Number(n).toLocaleString('en-US');

function pad(s, w, right = false) {
  s = String(s);
  return right ? s.padStart(w) : s.padEnd(w);
}

function render() {
  const { byMode, total, sessions, historyEntries } = aggregate();

  console.log('🦴 PolyCave 多言 — Cumulative Usage Stats');
  console.log('═'.repeat(72));

  if (total === 0) {
    console.log('No assistant responses found in any session transcript.');
    console.log(`Looked under: ${PROJECTS_DIR}`);
    return;
  }
  if (historyEntries === 0) {
    console.log('⚠️  No polycave state history found yet — every response will be counted as `off`.');
    console.log('    Use polycave for a while (activate it, ask questions, switch modes), then re-run.');
    console.log('');
  }

  const onCount = Object.entries(byMode).filter(([k]) => k !== 'off').reduce((s, [, v]) => s + v.count, 0);
  const offCount = (byMode.off || { count: 0 }).count;

  console.log(`Sessions analyzed : ${fmt(sessions)}`);
  console.log(`Total responses   : ${fmt(total)}`);
  console.log(`Polycave on       : ${fmt(onCount)} (${((onCount / total) * 100).toFixed(1)}%)`);
  console.log(`Polycave off      : ${fmt(offCount)} (${((offCount / total) * 100).toFixed(1)}%)`);
  console.log(`State changes     : ${fmt(historyEntries)}`);
  console.log('═'.repeat(72));
  console.log('');

  // Empirical baseline = user's own off-mode avg tokens (much more honest than
  // SKILL.md aspirational ratios)
  const offMode = byMode.off;
  const empiricalBaseline = offMode && offMode.count > 0
    ? offMode.totalTokens / offMode.count
    : null;

  if (empiricalBaseline !== null) {
    console.log(`📐 Empirical baseline (your own off-mode avg): ${Math.round(empiricalBaseline)} tokens/response`);
    console.log(`   Based on ${offMode.count.toLocaleString('en-US')} off-mode samples — your real comparison point.`);
  } else {
    console.log('📐 No off-mode samples yet — using only SKILL.md aspirational ratios.');
    console.log('   For more honest stats, use polycave off for some responses too.');
  }
  console.log('');

  // Per-mode rows with TWO savings estimates: aspirational (SKILL.md) and empirical
  const rows = Object.entries(byMode).map(([mode, m]) => {
    const avg = m.count ? m.totalTokens / m.count : 0;

    // Method A: SKILL.md ratio (aspirational)
    const ratio = m.active ? (COMPRESSION_RATIOS[m.level] || 0) : 0;
    const aspirationalBaseline = m.active && ratio > 0 ? avg / (1 - ratio) : avg;
    const aspirationalSaved = m.active ? (aspirationalBaseline - avg) * m.count : 0;

    // Method B: empirical baseline (user's own off-mode avg)
    // Show signed difference — negative means polycave responses were LONGER
    // than baseline (probably handling harder questions)
    const empiricalSavedRaw = m.active && empiricalBaseline !== null
      ? (empiricalBaseline - avg) * m.count
      : 0;

    return {
      mode,
      count: m.count,
      avgTokens: Math.round(avg),
      aspirationalSaved: Math.round(aspirationalSaved),
      empiricalSaved: Math.round(empiricalSavedRaw),
      empiricalDelta: empiricalBaseline !== null && m.active ? Math.round(avg - empiricalBaseline) : null,
      isOn: m.active,
    };
  });
  rows.sort((a, b) => b.empiricalSaved - a.empiricalSaved || b.aspirationalSaved - a.aspirationalSaved || b.count - a.count);

  // Table with both estimates side-by-side. Empirical column shows signed value.
  console.log('| Mode                   | Count | Avg tok | Saved (SKILL ratio) | Saved (empirical) |');
  console.log('|------------------------|------:|--------:|--------------------:|------------------:|');
  for (const r of rows) {
    const a = r.isOn ? fmt(r.aspirationalSaved) : '—';
    let e = '—';
    if (r.isOn) {
      if (empiricalBaseline === null) e = 'no baseline';
      else if (r.empiricalSaved > 0) e = fmt(r.empiricalSaved);
      else e = `${fmt(r.empiricalSaved)} (longer)`;
    }
    console.log(
      `| ${pad(r.mode, 22)} | ${pad(r.count, 5, true)} | ${pad(r.avgTokens, 7, true)} | ` +
      `${pad(a, 19, true)} | ${pad(e, 17, true)} |`
    );
  }
  const totalAspirational = rows.reduce((s, r) => s + r.aspirationalSaved, 0);
  const totalEmpirical = rows.reduce((s, r) => s + r.empiricalSaved, 0);
  console.log(
    `| ${pad('** TOTAL on **', 22)} | ${pad(onCount, 5, true)} | ${pad('—', 7, true)} | ` +
    `${pad(fmt(totalAspirational), 19, true)} | ${pad(empiricalBaseline !== null ? fmt(totalEmpirical) : 'no baseline', 17, true)} |`
  );
  console.log('');

  // Diagnostic: show per-mode delta vs baseline
  if (empiricalBaseline !== null) {
    const deltaRows = rows.filter(r => r.isOn && r.empiricalDelta !== null);
    if (deltaRows.length > 0) {
      console.log('🔍 Per-mode comparison vs your off-mode baseline (negative = shorter = good):');
      for (const r of deltaRows) {
        const sign = r.empiricalDelta < 0 ? '✅' : '⚠️';
        const d = r.empiricalDelta < 0 ? fmt(r.empiricalDelta) : `+${fmt(r.empiricalDelta)}`;
        console.log(`  ${sign} ${pad(r.mode, 22)} avg ${pad(r.avgTokens, 4, true)} vs baseline ${Math.round(empiricalBaseline)} → ${d} tokens/response`);
      }
      console.log('');
    }
  }

  // Bar chart 1: counts per ACTIVE mode (off excluded — usually dwarfs the rest)
  const onRowsForChart = rows.filter(r => r.isOn);
  if (onRowsForChart.length > 0) {
    const maxOn = Math.max(...onRowsForChart.map(r => r.count), 1);
    console.log('📊 Responses per polycave mode (off-mode excluded — usually dominates):');
    for (const r of onRowsForChart) {
      console.log(`  ${pad(r.mode, 22)} ${renderBar(r.count, maxOn, 32)} ${r.count}`);
    }
    if (offCount > 0) {
      console.log(`  ${pad('(off, for reference)', 22)} ${pad('—', 32)} ${fmt(offCount)}`);
    }
    console.log('');
  }

  // Bar chart 2: total tokens saved per mode (use empirical if available, else aspirational)
  const useEmpirical = empiricalBaseline !== null;
  const savingsKey = useEmpirical ? 'empiricalSaved' : 'aspirationalSaved';
  const savingRows = rows.filter(r => r.isOn && r[savingsKey] > 0);
  if (savingRows.length > 0) {
    const maxSaved = Math.max(...savingRows.map(r => r[savingsKey]));
    console.log(`💰 Total tokens saved per mode (${useEmpirical ? 'vs your own off-mode avg' : 'per SKILL.md ratio'}):`);
    for (const r of savingRows) {
      console.log(`  ${pad(r.mode, 22)} ${renderBar(r[savingsKey], maxSaved, 32)} ${fmt(r[savingsKey])}`);
    }
    console.log('');
  }

  const totalShown = useEmpirical ? totalEmpirical : totalAspirational;
  const totalOnTokens = rows.filter(r => r.isOn).reduce((s, r) => s + (r.avgTokens * r.count), 0);

  console.log('═'.repeat(72));
  console.log(`🎉 Total estimated savings: ${fmt(totalShown)} tokens across ${fmt(onCount)} polycave-active responses`);
  if (totalShown > 0 && totalOnTokens > 0) {
    const overallRatio = totalShown / (totalShown + totalOnTokens);
    console.log(`   Overall compression: ~${(overallRatio * 100).toFixed(1)}% off baseline`);
  }
  console.log(`   Method: ${useEmpirical ? 'EMPIRICAL (compared to your own off-mode avg)' : 'ASPIRATIONAL (SKILL.md ratios)'}`);
  console.log('═'.repeat(72));
  console.log('');
  console.log('Notes & accuracy:');
  console.log('  • Token estimate ±20%: CJK × 2 + kana × 1.5 + hangul × 2.5 + ascii × 0.25');
  console.log('    (calibrated to Claude/GPT-4 BPE; for exact counts use Anthropic tokenizer API)');
  console.log('  • Empirical baseline ASSUMES off-mode prompts are similar in complexity to on-mode prompts.');
  console.log('    If you only use polycave for hard questions and off for easy ones, savings are over-estimated.');
  console.log('  • SKILL.md ratios (lite=30%, full=65%, ultra=85%) are aspirational, not measured.');
  console.log('  • For ground-truth measurements, run benchmarks/ (TODO) with API key.');
  console.log(`  • State history: ${HISTORY_FILE}`);
}

try { render(); } catch (e) {
  console.error('polycave-stats error:', e.message);
  process.exit(1);
}
