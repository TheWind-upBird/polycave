# polycave uninstaller (PowerShell)
$ErrorActionPreference = 'Stop'

$claudeDir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $env:USERPROFILE '.claude' }
$settings = Join-Path $claudeDir 'settings.json'
$hooksDir = Join-Path $claudeDir 'polycave-hooks'

if (-not (Test-Path $settings)) {
  Write-Host "No settings at $settings — nothing to do."
  exit 0
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host '❌ node required' -ForegroundColor Red; exit 1
}

Copy-Item $settings "$settings.bak" -Force
$env:POLYCAVE_SETTINGS = $settings

$nodeScript = @'
const fs = require('fs');
const SETTINGS = process.env.POLYCAVE_SETTINGS;
const s = JSON.parse(fs.readFileSync(SETTINGS, 'utf8'));
function strip(arr) {
  return (arr||[]).map(g=>({...g, hooks:(g.hooks||[]).filter(h=>!String(h.command||'').includes('polycave'))}))
                  .filter(g=>(g.hooks||[]).length>0);
}
if (s.hooks) {
  for (const k of Object.keys(s.hooks)) s.hooks[k] = strip(s.hooks[k]);
  for (const k of Object.keys(s.hooks)) if (s.hooks[k].length === 0) delete s.hooks[k];
  if (Object.keys(s.hooks).length === 0) delete s.hooks;
}
if (s.statusLine && String(s.statusLine.command||'').includes('polycave-statusline')) {
  delete s.statusLine;
}
fs.writeFileSync(SETTINGS, JSON.stringify(s, null, 2));
console.log('✅ polycave hooks removed from settings.json');
'@

$tmp = Join-Path $env:TEMP 'polycave-uninstall.js'
Set-Content -Path $tmp -Value $nodeScript -Encoding UTF8
node $tmp
Remove-Item $tmp -Force

if (Test-Path $hooksDir) {
  Remove-Item -Recurse -Force $hooksDir
  Write-Host "✅ removed $hooksDir"
}
Write-Host '🦴 Uninstalled.' -ForegroundColor Green
