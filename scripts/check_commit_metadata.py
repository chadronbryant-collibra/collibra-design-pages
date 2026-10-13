#!/usr/bin/env python3
"""Reject non-public identity metadata on newly proposed publication commits."""
from __future__ import annotations

import argparse
import re
import subprocess


def public_email(value: str) -> bool:
    return bool(re.fullmatch(r"(?:[^\s@]+@users\.noreply\.github\.com|noreply@github\.com)", value, re.IGNORECASE))


def violations(records: str) -> list[str]:
    errors = []
    for line in records.splitlines():
        fields = line.split("\t")
        if len(fields) != 3 or not re.fullmatch(r"[a-f0-9]{40,64}", fields[0]):
            errors.append("malformed Git identity record")
            continue
        commit, author, committer = fields
        for label, value in (("author", author), ("committer", committer)):
            if not public_email(value):
                errors.append(f"{commit[:12]} has a non-noreply {label} identity")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", help="scan only commits after this exact base commit")
    args = parser.parse_args()
    if args.base and not re.fullmatch(r"[a-f0-9]{40,64}", args.base):
        parser.error("base must be an exact Git commit ID")
    try:
        if args.base:
            subprocess.run(["git", "merge-base", "--is-ancestor", args.base, "HEAD"], check=True, capture_output=True)
            revisions = [f"{args.base}..HEAD"]
        else:
            revisions = ["-1", "HEAD"]
        result = subprocess.run(["git", "log", "--format=%H%x09%ae%x09%ce", *revisions], check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError:
        print("Cannot verify the exact publication commit range.")
        return 1
    errors = violations(result.stdout)
    for error in errors:
        print(error)
    if not errors:
        print("Publication commit identities verified. Historical commits were not rewritten.")
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
