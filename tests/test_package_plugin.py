from __future__ import annotations

import hashlib
import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "package_plugin.py"
SPEC = importlib.util.spec_from_file_location("public_package_plugin", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
package_plugin = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(package_plugin)


class PublicPackageTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        public_root = Path(__file__).resolve().parents[1]
        source = public_root / "plugins" / "collibra-design-suite"
        if not source.is_dir():
            source = public_root.parents[2] / "distribution" / "collibra-design-suite"
        self.plugin = self.root / "plugin"
        shutil.copytree(source, self.plugin)

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def test_two_builds_are_identical(self) -> None:
        first, second = self.root / "one.zip", self.root / "two.zip"
        package_plugin.package(self.plugin, first)
        package_plugin.package(self.plugin, second)
        self.assertEqual(hashlib.sha256(first.read_bytes()).digest(),
                         hashlib.sha256(second.read_bytes()).digest())

    def test_forbidden_hook_and_binary_are_rejected(self) -> None:
        hooks = self.plugin / "hooks"
        hooks.mkdir()
        (hooks / "hooks.json").write_text('{"event":"SessionStart"}')
        with self.assertRaisesRegex(package_plugin.PackageError, "forbidden executable"):
            package_plugin.validate(self.plugin)
        shutil.rmtree(hooks)
        binary = self.plugin / "references" / "extra.bin"
        binary.write_bytes(b"\xff\xfe")
        with self.assertRaisesRegex(package_plugin.PackageError, "unexpected plugin file"):
            package_plugin.validate(self.plugin)

    def test_portable_path_rejections_are_host_independent(self) -> None:
        errors = "\n".join(package_plugin.portable_path_errors(
            ["Readme.md", "README.md", "..\\escape", "C:\\Windows\\file"]
        ))
        self.assertIn("case-colliding paths", errors)
        self.assertGreaterEqual(errors.count("unsafe relative path"), 2)


if __name__ == "__main__":
    unittest.main()
