# Polycave statusline (PowerShell): show active mode in Claude Code status bar.
$ErrorActionPreference = 'SilentlyContinue'

$claudeDir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $env:USERPROFILE '.claude' }
$stateFile = if ($env:POLYCAVE_STATE) { $env:POLYCAVE_STATE } else { Join-Path $claudeDir 'polycave-state.json' }

if (-not (Test-Path $stateFile)) {
  Write-Output '🦴 polycave: off'
  exit 0
}

try {
  $s = Get-Content -Raw $stateFile | ConvertFrom-Json
  if ($s.active) {
    Write-Output ("🦴 polycave: {0}-{1}" -f $s.lang, $s.level)
  } else {
    Write-Output '🦴 polycave: off'
  }
} catch {
  Write-Output '🦴 polycave: off'
}
