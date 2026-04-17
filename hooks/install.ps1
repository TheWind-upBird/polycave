# polycave standalone installer for Claude Code (PowerShell)
# Usage:
#   irm https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks/install.ps1 | iex
# From local clone:
#   .\hooks\install.ps1 [-Force]

param(
  [switch]$Force
)
$ErrorActionPreference = 'Stop'

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host '❌ node is required (for safe JSON merge). Install from https://nodejs.org/' -ForegroundColor Red
  exit 1
}

$claudeDir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $env:USERPROFILE '.claude' }
$settings = Join-Path $claudeDir 'settings.json'
$hooksDir = Join-Path $claudeDir 'polycave-hooks'

New-Item -ItemType Directory -Force -Path $hooksDir | Out-Null

$scriptDir = $PSScriptRoot
$rawBase = 'https://raw.githubusercontent.com/TheWind-upBird/polycave/main/hooks'
$files = @(
  'package.json', 'polycave-config.js', 'polycave-activate.js',
  'polycave-mode-tracker.js', 'polycave-statusline.sh', 'polycave-statusline.ps1',
  'polycave-stats.js'
)

foreach ($f in $files) {
  $dest = Join-Path $hooksDir $f
  $localSrc = if ($scriptDir) { Join-Path $scriptDir $f } else { $null }
  if ($localSrc -and (Test-Path $localSrc)) {
    Copy-Item $localSrc $dest -Force
  } else {
    Invoke-WebRequest -Uri "$rawBase/$f" -OutFile $dest -UseBasicParsing
  }
}

$env:POLYCAVE_SETTINGS = $settings
$env:POLYCAVE_HOOKS_DIR = $hooksDir
$env:POLYCAVE_FORCE = if ($Force) { '1' } else { '0' }

$nodeScript = @'
const fs = require('fs');
const path = require('path');
const SETTINGS = process.env.POLYCAVE_SETTINGS;
const HOOKS_DIR = process.env.POLYCAVE_HOOKS_DIR;
const FORCE = process.env.POLYCAVE_FORCE === '1';

let settings = {};
if (fs.existsSync(SETTINGS)) {
  try { settings = JSON.parse(fs.readFileSync(SETTINGS, 'utf8')); }
  catch (e) { console.error('Parse error:', e.message); process.exit(1); }
  fs.copyFileSync(SETTINGS, SETTINGS + '.bak');
} else {
  fs.mkdirSync(path.dirname(SETTINGS), { recursive: true });
}

const activateCmd = `node "${path.join(HOOKS_DIR, 'polycave-activate.js')}"`;
const trackerCmd = `node "${path.join(HOOKS_DIR, 'polycave-mode-tracker.js')}"`;
const statuslineCmd = `powershell -ExecutionPolicy Bypass -File "${path.join(HOOKS_DIR, 'polycave-statusline.ps1')}"`;

settings.hooks = settings.hooks || {};
function ensureHook(event, cmd, msg) {
  settings.hooks[event] = settings.hooks[event] || [];
  const exists = settings.hooks[event].some(g => (g.hooks||[]).some(h => h.command === cmd));
  if (exists && !FORCE) return false;
  if (exists && FORCE) {
    settings.hooks[event] = settings.hooks[event].map(g => ({...g, hooks:(g.hooks||[]).filter(h=>h.command!==cmd)})).filter(g=>(g.hooks||[]).length>0);
  }
  settings.hooks[event].push({ hooks: [{ type: 'command', command: cmd, timeout: 5, statusMessage: msg }] });
  return true;
}
const a = ensureHook('SessionStart', activateCmd, 'Loading polycave mode...');
const b = ensureHook('UserPromptSubmit', trackerCmd, 'Tracking polycave mode...');

if (!settings.statusLine) {
  settings.statusLine = { type: 'command', command: statuslineCmd };
} else if (!String(settings.statusLine.command || '').includes('polycave-statusline')) {
  console.error('NOTE: existing statusLine preserved. Polycave statusline NOT installed.');
}

fs.writeFileSync(SETTINGS, JSON.stringify(settings, null, 2));
console.log(`✅ polycave installed to ${HOOKS_DIR}`);
console.log(`   Settings: ${SETTINGS} (backup: ${SETTINGS}.bak)`);
console.log(`   SessionStart hook: ${a ? 'added' : 'already present'}`);
console.log(`   UserPromptSubmit hook: ${b ? 'added' : 'already present'}`);
'@

$tmp = Join-Path $env:TEMP 'polycave-install.js'
Set-Content -Path $tmp -Value $nodeScript -Encoding UTF8
node $tmp
Remove-Item $tmp -Force

Write-Host ''
Write-Host '🦴 Done. Restart Claude Code, then say "/polycave" to activate.' -ForegroundColor Green
