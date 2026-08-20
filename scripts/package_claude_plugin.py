#!/usr/bin/env python3
"""Build a deterministic direct-upload ZIP for one Claude plugin."""

from __future__ import annotations

import argparse
import hashlib
import json
import stat
import sys
import zipfile
from pathlib import Path


EXCLUDED_NAMES = {".codex-plugin"}
EXCLUDED_PARTS = {"__pycache__", ".git"}


class PackageError(Exception):
    pass


def read_manifest(plugin_root: Path) -> dict:
    path = plugin_root / ".claude-plugin" / "plugin.json"
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise PackageError(f"cannot read {path}: {exc}") from exc
    if not isinstance(value, dict):
        raise PackageError("plugin manifest must contain an object")
    for field in ("name", "version"):
        if not isinstance(value.get(field), str) or not value[field].strip():
            raise PackageError(f"plugin manifest is missing {field}")
    return value


def files_for(plugin_root: Path) -> list[Path]:
    files: list[Path] = []
    for path in sorted(plugin_root.rglob("*")):
        relative = path.relative_to(plugin_root)
        if not path.is_file():
            continue
        if any(part in EXCLUDED_PARTS for part in relative.parts):
            continue
        if relative.parts and relative.parts[0] in EXCLUDED_NAMES:
            continue
        if path.is_symlink():
            raise PackageError(f"refusing symlink in plugin package: {relative}")
        mode = path.stat().st_mode
        if not stat.S_ISREG(mode):
            raise PackageError(f"refusing non-regular file: {relative}")
        files.append(path)
    required = {
        Path(".claude-plugin/plugin.json"),
        Path("README.md"),
        Path("CHANGELOG.md"),
    }
    present = {path.relative_to(plugin_root) for path in files}
    missing = sorted(required - present)
    if missing:
        raise PackageError("plugin package is missing: " + ", ".join(str(path) for path in missing))
    if not any(path.relative_to(plugin_root).match("skills/*/SKILL.md") for path in files):
        raise PackageError("plugin package has no skills/<name>/SKILL.md")
    return files


def package(plugin_root: Path, output_dir: Path) -> dict:
    manifest = read_manifest(plugin_root)
    files = files_for(plugin_root)
    output_dir.mkdir(parents=True, exist_ok=True)
    archive = output_dir / f"{manifest['name']}-v{manifest['version']}.zip"
    if archive.exists():
        archive.unlink()
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
        for path in files:
            relative = path.relative_to(plugin_root).as_posix()
            info = zipfile.ZipInfo(relative, date_time=(2020, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            bundle.writestr(info, path.read_bytes())
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    return {
        "plugin": manifest["name"],
        "version": manifest["version"],
        "archive": str(archive),
        "sha256": digest,
        "file_count": len(files),
        "excluded": [".codex-plugin"],
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--package-root", type=Path, default=Path.cwd())
    parser.add_argument("--plugin", required=True, help="plugin directory name")
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args(argv)
    try:
        result = package((args.package_root / "plugins" / args.plugin).resolve(), args.output_dir.resolve())
    except PackageError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
