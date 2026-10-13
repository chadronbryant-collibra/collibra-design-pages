import importlib.util
from pathlib import Path
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "check_commit_metadata.py"
SPEC = importlib.util.spec_from_file_location("publication_metadata", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class PublicationMetadataTests(unittest.TestCase):
    def test_human_and_app_noreply_identities_are_accepted(self):
        self.assertEqual(MODULE.violations("a" * 40 + "\t123+person@users.noreply.github.com\tnoreply@github.com"), [])
        self.assertEqual(MODULE.violations("a" * 40 + "\t123+person@users.noreply.github.com\tapp[bot]@users.noreply.github.com"), [])

    def test_nonpublic_identities_and_malformed_records_fail(self):
        errors = MODULE.violations("b" * 40 + "\towner@example.org\tapp[bot]@users.noreply.github.com")
        self.assertEqual(errors, ["b" * 12 + " has a non-noreply author identity"])
        self.assertNotIn("example.org", " ".join(errors))
        self.assertEqual(MODULE.violations("invalid"), ["malformed Git identity record"])


if __name__ == "__main__":
    unittest.main()
