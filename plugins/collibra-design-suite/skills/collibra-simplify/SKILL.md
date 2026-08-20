---
name: collibra-simplify
description: >-
  Simplify Collibra-facing content when the user explicitly asks for plain
  English, less technical language, a clearer explanation, or a simpler
  version. Preserve the facts, necessary governance terms, audience intent,
  and important limits; do not compress the answer into fragments or strip
  away useful nuance.
metadata:
  version: "0.1.0"
---

# Collibra plain-language simplification

Use this as the explicit simplification lane inside the design suite. It is
informed by the suite's plain-English and reader-first contracts, not by a
display-rewriting hook or a token-compression mode.

## Simplify without flattening

1. State the reader's useful takeaway first.
2. Replace abstract nouns, stacked clauses, and unexplained acronyms with
   concrete language.
3. Define a necessary technical term in place, then use the stable term.
4. Break long instructions into the smallest complete steps.
5. Keep numbers, conditions, evidence, uncertainty, ownership, and recovery
   paths intact.
6. Keep a human voice: natural sentence rhythm, complete thoughts, and enough
   context for the reader to make a good decision.

Do not turn `asset`, `lineage`, `classification`, `steward`, or another
governance term into a vague synonym when the term is the actual concept. Do
not promise that a simpler explanation is easier to implement than it is.

Return the simplified version only unless the user asks for `before and
after`, `show the changes`, `show the diff`, or `show the checks`. When the
user asks for a technical and a plain-language version, provide both and label
which audience each serves.
