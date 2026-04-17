#!/usr/bin/env python3
"""Sanity-check that polycave repo invariants hold.
Run from repo root: python tests/verify_repo.py
"""
import io
import json
import sys
from pathlib import Path

# Force UTF-8 output on Windows so emoji don't crash on GBK consoles
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
errors = []

def check(condition, message):
    if not condition:
        errors.append(message)

# --- Required files exist ---
required_files = [
    ".claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
    "skills/polycave/SKILL.md",
    "skills/polycave-commit/SKILL.md",
    "skills/polycave-review/SKILL.md",
    "skills/polycave-help/SKILL.md",
    "commands/polycave.toml",
    "commands/polycave-commit.toml",
    "commands/polycave-review.toml",
    "commands/polycave-help.toml",
    "commands/polycave-stats.toml",
    "hooks/install.sh",
    "hooks/install.ps1",
    "hooks/uninstall.sh",
    "hooks/uninstall.ps1",
    "hooks/polycave-activate.js",
    "hooks/polycave-mode-tracker.js",
    "hooks/polycave-config.js",
    "hooks/polycave-statusline.sh",
    "hooks/polycave-statusline.ps1",
    "hooks/polycave-stats.js",
    "hooks/package.json",
    "rules/polycave-activate.md",
    "gemini-extension.json",
    ".codex/config.toml",
    ".codex/hooks.json",
    ".cursor/rules/polycave.mdc",
    ".windsurf/rules/polycave.md",
    ".clinerules/polycave.md",
    ".github/copilot-instructions.md",
    "AGENTS.md",
    "CLAUDE.md",
    "GEMINI.md",
    "README.md",
    "README.zh-CN.md",
    "README.ja.md",
    "LICENSE",
    "CONTRIBUTING.md",
    ".gitignore",
]
for rel in required_files:
    check((ROOT / rel).exists(), f"missing required file: {rel}")

# --- JSON files parse ---
for rel in [".claude-plugin/plugin.json", ".claude-plugin/marketplace.json",
            ".codex/hooks.json", "gemini-extension.json", "hooks/package.json"]:
    p = ROOT / rel
    if p.exists():
        try:
            json.loads(p.read_text(encoding="utf-8"))
        except Exception as e:
            errors.append(f"invalid JSON in {rel}: {e}")

# --- SKILL.md files have frontmatter ---
for rel in ["skills/polycave/SKILL.md", "skills/polycave-commit/SKILL.md",
            "skills/polycave-review/SKILL.md", "skills/polycave-help/SKILL.md"]:
    p = ROOT / rel
    if p.exists():
        text = p.read_text(encoding="utf-8")
        check(text.startswith("---\n"), f"{rel}: missing YAML frontmatter")
        check("name:" in text[:300], f"{rel}: frontmatter missing 'name:'")
        check("description:" in text[:500], f"{rel}: frontmatter missing 'description:'")

# --- All 8 languages mentioned in main SKILL ---
main_skill = (ROOT / "skills/polycave/SKILL.md").read_text(encoding="utf-8")
for lang in ["cantonese", "henanese", "shanghainese", "beijing", "wenyan", "kobun", "old-english", "latin"]:
    check(lang in main_skill, f"main SKILL.md missing language: {lang}")

# --- 'english' (modern) should NOT be present as a polycave mode ---
config = (ROOT / "hooks/polycave-config.js").read_text(encoding="utf-8")
check("'english'" not in config, "hooks/polycave-config.js still references modern 'english' mode (out of scope by design)")

# --- All 8 langs in the LANGUAGES array of polycave-config.js ---
for lang in ["cantonese", "henanese", "shanghainese", "beijing", "wenyan", "kobun", "old-english", "latin"]:
    check(f"'{lang}'" in config, f"hooks/polycave-config.js LANGUAGES missing: {lang}")

# --- Report ---
if errors:
    print("❌ verify_repo failed:")
    for e in errors:
        print(f"   - {e}")
    sys.exit(1)
else:
    print(f"✅ All {len(required_files)} required files present and valid.")
