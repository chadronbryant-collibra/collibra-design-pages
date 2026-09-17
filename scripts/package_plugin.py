#!/usr/bin/env python3
"""Validate and deterministically package the public Claude plugin."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import stat
import sys
import zipfile
from pathlib import Path

REQUIRED_SKILLS = {
    "collibra-create", "collibra-design", "collibra-refine",
    "collibra-review", "collibra-simplify",
}
ROOT_FILES = {"CHANGELOG.md", "LICENSE.md", "NOTICE", "README.md", "SBOM.spdx.json"}
EXACT_FILES = {
    ".claude-plugin/plugin.json", "LICENSES/Apache-2.0.txt", "LICENSES/CC-BY-4.0.txt",
}
TREE_SUFFIXES = {
    "examples": {".html", ".json", ".md", ".svg"},
    "references": {".json", ".md"},
}
FORBIDDEN_COMPONENTS = {"hooks", "scripts", "agents", ".mcp.json", ".app.json"}
FORBIDDEN_FIELDS = {"dependencies", "hooks", "agents", "mcpServers", "apps"}
WINDOWS_RESERVED = {
    "CON", "PRN", "AUX", "NUL", *(f"COM{i}" for i in range(1, 10)),
    *(f"LPT{i}" for i in range(1, 10)),
}


class PackageError(ValueError):
    pass


def portable_path_errors(values: list[str]) -> list[str]:
    errors: list[str] = []
    folded: dict[str, str] = {}
    for value in values:
        path = Path(value)
        if (path.is_absolute() or value.startswith(("/", "\\"))
                or re.match(r"^[A-Za-z]:[\\/]", value) or "\\" in value):
            errors.append(f"unsafe relative path: {value}")
        if any(part in {"", ".", ".."} for part in path.parts):
            errors.append(f"unsafe relative path: {value}")
        for part in path.parts:
            if part.split(".", 1)[0].upper() in WINDOWS_RESERVED or part.endswith((" ", ".")):
                errors.append(f"Windows-incompatible path: {value}")
        key = path.as_posix().casefold()
        prior = folded.setdefault(key, path.as_posix())
        if prior != path.as_posix():
            errors.append(f"case-colliding paths: {prior} and {path.as_posix()}")
    return errors


def allowed(relative: Path) -> bool:
    value = relative.as_posix()
    if value in EXACT_FILES:
        return True
    if len(relative.parts) == 1:
        return value in ROOT_FILES
    if relative.parts[0] in TREE_SUFFIXES:
        return relative.suffix.lower() in TREE_SUFFIXES[relative.parts[0]]
    return (relative.parts[0] == "skills" and len(relative.parts) == 3
            and relative.parts[1] in REQUIRED_SKILLS and relative.parts[2] == "SKILL.md")


def validate(plugin: Path) -> tuple[dict, list[Path]]:
    if any((plugin / name).exists() for name in FORBIDDEN_COMPONENTS):
        raise PackageError("forbidden executable plugin component")
    paths = sorted(plugin.rglob("*"), key=lambda item: item.relative_to(plugin).as_posix())
    path_errors = portable_path_errors([path.relative_to(plugin).as_posix() for path in paths])
    if path_errors:
        raise PackageError("; ".join(path_errors))
    files: list[Path] = []
    for path in paths:
        relative = path.relative_to(plugin)
        if path.is_symlink():
            raise PackageError(f"symlink is not allowed: {relative.as_posix()}")
        if not path.is_file():
            continue
        if not allowed(relative):
            raise PackageError(f"unexpected plugin file: {relative.as_posix()}")
        if path.stat().st_mode & (stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH):
            raise PackageError(f"executable file is not allowed: {relative.as_posix()}")
        raw = path.read_bytes()
        if raw.startswith(b"\xef\xbb\xbf"):
            raise PackageError(f"UTF-8 BOM is not allowed: {relative.as_posix()}")
        try:
            raw.decode("utf-8")
        except UnicodeDecodeError as error:
            raise PackageError(f"non-UTF-8 file: {relative.as_posix()}: {error}") from error
        if b"\r" in raw:
            raise PackageError(f"non-LF line ending: {relative.as_posix()}")
        files.append(path)
    manifest_path = plugin / ".claude-plugin" / "plugin.json"
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise PackageError(f"invalid plugin manifest: {error}") from error
    if FORBIDDEN_FIELDS.intersection(manifest):
        raise PackageError(f"forbidden manifest fields: {sorted(FORBIDDEN_FIELDS.intersection(manifest))}")
    skills = {path.parent.name for path in plugin.glob("skills/*/SKILL.md")}
    if skills != REQUIRED_SKILLS:
        raise PackageError(f"unexpected skill set: {sorted(skills)}")
    sbom = json.loads((plugin / "SBOM.spdx.json").read_text(encoding="utf-8"))
    if sbom.get("spdxVersion") != "SPDX-2.3" or sbom.get("dataLicense") != "CC0-1.0":
        raise PackageError("invalid SPDX 2.3 SBOM header")
    if sbom.get("packages", [{}])[0].get("versionInfo") != manifest.get("version"):
        raise PackageError("SBOM and manifest versions differ")
    return manifest, files


def package(plugin: Path, output: Path) -> str:
    manifest, files = validate(plugin)
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_STORED) as archive:
        for path in files:
            relative = path.relative_to(plugin).as_posix()
            info = zipfile.ZipInfo(relative, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_STORED
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes())
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    print(json.dumps({"name": manifest["name"], "version": manifest["version"],
                      "files": len(files), "sha256": digest}, sort_keys=True))
    return digest


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--plugin", type=Path, default=Path("plugins/collibra-design-suite"))
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    try:
        package(args.plugin, args.output)
    except (OSError, PackageError, zipfile.BadZipFile) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
