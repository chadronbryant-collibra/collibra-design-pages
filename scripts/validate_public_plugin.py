#!/usr/bin/env python3
"""Validate the public Claude marketplace and bundled plugin."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN = re.compile(
    r"(?:workspace:|ported-skills|/Users/[A-Za-z0-9._-]+|"
    r"jarvis-brain|synology-nas|tail-scale|ai-max|ai-mini|People Ops Monthly)",
    re.IGNORECASE,
)


def load(path: Path) -> dict:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(f"cannot read {path.relative_to(ROOT)}: {exc}") from exc
    if not isinstance(value, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must contain an object")
    return value


def main() -> int:
    errors: list[str] = []
    marketplace = load(ROOT / ".claude-plugin/marketplace.json")
    if marketplace.get("name") != "collibra-design":
        errors.append("marketplace name must be collibra-design")
    plugins = marketplace.get("plugins")
    if not isinstance(plugins, list) or len(plugins) != 1:
        errors.append("public marketplace must expose exactly one plugin")
        plugins = []
    plugin = ROOT / "plugins" / "collibra-design-suite"
    manifest = load(plugin / ".claude-plugin/plugin.json")
    entry = plugins[0] if plugins else {}
    if entry.get("name") != manifest.get("name"):
        errors.append("marketplace and plugin manifest names differ")
    if entry.get("version") != manifest.get("version"):
        errors.append("marketplace and plugin manifest versions differ")
    skill_dirs = sorted(path for path in (plugin / "skills").iterdir() if path.is_dir())
    expected = {"collibra-design", "collibra-refine", "collibra-simplify", "collibra-review"}
    if {path.name for path in skill_dirs} != expected:
        errors.append("public plugin skill set is incomplete")
    for skill_dir in skill_dirs:
        skill = skill_dir / "SKILL.md"
        if not skill.is_file():
            errors.append(f"missing {skill.relative_to(ROOT)}")
            continue
        text = skill.read_text(encoding="utf-8")
        if f"name: {skill_dir.name}" not in text or "description:" not in text:
            errors.append(f"invalid frontmatter in {skill.relative_to(ROOT)}")
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        if path.resolve() == Path(__file__).resolve():
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        if FORBIDDEN.search(text):
            errors.append(f"public marker found in {path.relative_to(ROOT)}")
    if errors:
        for error in errors:
            print(f"FAIL: {error}", file=sys.stderr)
        return 1
    print("ok: public marketplace and four-skill plugin are boundary-clean")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
