---
name: collibra-refine
description: >-
  Refine Collibra-facing emails, prompts, chat messages, UI copy, briefs,
  guides, release notes, and other content when the user says refine, tone,
  humanize, rewrite, make clearer, or make it less technical. Apply the
  reader, medium, persona, tone, plain-language, and no-fabrication contracts;
  return the final result first and show before/after or a diff only when
  requested.
metadata:
  version: "0.1.0"
---

# Collibra content refinement

Use this skill when the user wants the content changed. Read
`../../references/output-protocol.md` and the bundled
`../../references/catalog/content/voice.json` before editing. When the content
is product UI, a slide, a document, a public page, or an AI surface, also use
the matching contract in `../../references/catalog/`.

## Decide before rewriting

1. Identify the medium and the reader's job. Use an explicit audience, sample,
   product glossary, legal text, or requested tone over a default.
2. Choose one primary persona and one tone mode. Keep the voice pillars
   respectfully direct, wise, and clever and punchy without performing them.
3. Apply a plain-language pass by default: lead with the useful meaning, name
   the action, use concrete words, and define necessary technical terms at
   first use. Keep domain terms when they carry real meaning; do not replace
   governance language with vague synonyms.
4. Preserve facts, numbers, dates, names, links, quotations, product names,
   code, structured data, and the writer's deliberate human details. Never add
   evidence or certainty that the input does not support.
5. Keep generated, proposed, reviewed, confirmed, and durable states distinct.
   If the content requests a decision or changes a durable record, make the
   human review boundary explicit.

If audience or medium materially changes the answer and the user did not give
it, ask one focused question. Otherwise proceed with a clearly stated,
low-risk assumption rather than making the user fill out a form.

## Default output

Return the refined content only, ready to paste. Do not add a preamble, a
self-congratulatory explanation, or an audit that was not requested. For a
file, make an in-place edit only when the user explicitly asks; protect code,
frontmatter, data, URLs, and exact quotes.

Recognize these requests as intentional output modes:

- `show the changes`, `before and after`, or `show the diff`: return the
  original, the refined version, and a concise change summary;
- `show the checks`: return the refined version plus persona, medium, tone,
  preserved-span, evidence, and review-boundary checks;
- `detect only` or `what would you change?`: do not edit; return findings and
  suggested moves;
- `give me options`: provide no more than three meaningfully different
  versions and label the tradeoff for each;
- `embedded`: return only the final content to the calling workflow.

See `../../references/output-protocol.md` for the exact response shapes.

## What good refinement looks like

- The first sentence tells the reader why this matters or what to do.
- The reader can tell what is known, proposed, blocked, or still needs review.
- The prose sounds like a knowledgeable person, not a template or a press
  release.
- Technical detail is available where it helps the builder, but it does not
  block the reader's first understanding.
- The result is shorter only when shortening preserves meaning. Clarity is the
  goal; token compression and clipped fragments are not.
