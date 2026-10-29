---
name: collibra-review
description: >-
  Review a Collibra-facing screen, flow, page, email, prompt, document, slide,
  diagram, chart, or content block before it ships. Use for design review,
  accessibility audit, content review, sanity check, or pre-send requests;
  return ranked, evidence-backed findings and do not silently redesign the
  artifact.
metadata:
  version: "1.5.1"
---

# Collibra pre-ship review

Apply this skill by default when its task matches relevant Collibra work; the
user need not name it. Respect explicit user preferences and use only the
smallest relevant guidance. Before brand-dependent work, follow
`../../references/brand-refresh.md`, including its 60-day source review check.


Use this as a review gate, not as an invisible rewrite. Read
`../../references/contract-index.md`, the relevant bundled catalog, and
`../../references/output-protocol.md` before reporting findings.
For a web app, also read `../../references/web-app-playbook.md`. When a
machine-readable handoff is requested, use
`../../references/review-receipt.schema.json`.

For audience-facing Docs, Sheets and Slides, read `reader_authoring` in
`../../references/catalog/content/guide-patterns.json`. Frame the reader's
question and next action, then choose the main view and supporting detail.
Use native features only when they help that task. Keep material conditions
beside claims or actions and preserve requested structure, order and visibility.
Add speaker notes only when requested. Preserve existing notes during edits.
Complete the six checks in
`../../references/catalog/content/authoring-review.schema.json` before a
content-ready claim. Record missing native or rendered inspection as
`not-checked` in the private handoff; a useful draft may still be delivered.

## Review in three passes

1. **Read as the person.** Can the intended reader understand the purpose,
   decision, action, state, and consequence without internal context?
2. **Check the contract.** Look for hierarchy, content, interaction states,
   accessibility, visual roles, evidence, terminology, and human-review
   boundaries that apply to the surface.
3. **Return fixable findings.** Rank only findings supported by what was
   inspected. Distinguish observed facts from inferences and name the smallest
   useful fix.

For audience-facing artifacts, check the `authoring_sequence` and `visibility`
contracts in `../../references/catalog/content/guide-patterns.json`. Verify
the design and bundled `collibra-refine` passes from available evidence, then inspect
the audience view for meaning, completeness, readable structure, working links,
and note placement. Do not infer a completed refinement pass from an enabled
skill or a matching voice catalog. Report missing review evidence in the
private handoff; keep editorial questions and assistant narration out of the
artifact. Native speaker notes and separate facilitator prompts are not
private storage.

For slides, count final visible type roles and inspect likely misuse against
`../../references/catalog/slides/type-role-usage.json`. Treat explanatory copy
in caption or eyebrow roles, role downshifts used to make content fit, and
native autofit as high-priority findings. Recommend reflow, fewer simultaneous
items, or complementary slides according to the contract; do not suggest a
smaller role as the repair.

For a deck, also use `../../references/presentation-playbook.md`. Read the title
sequence and requested decision, check the purpose-specific narrative beats,
source coverage and fact states, then inspect composition and rendered
delivery. Distinguish a source storyboard or planned audition from inspected
slide renders. A complete beat list does not establish that the argument works.

For Google Docs, check `medium.google-doc` and
`visual.document-composition`. Confirm that the opening answers the reader's
question, headings form a useful scan path, panels and visuals have a content
role, tabs represent distinct durable tasks, and exported pages preserve
readability, links, alt text, contrast, and page breaks.
For native visual recipes, also apply `native_visuals` in the guide-pattern
catalog: inspect all visible text against the minimum font floor, preserve
material conditions beside actions, and distinguish editable native structures
from image or UI-only substitutes. Proposed recipes need actual rendered
review in the consuming surface before any acceptance claim.

For visual claims, say whether you inspected a rendered surface, screenshot,
live page, or only source code. Do not claim contrast, focus, responsive
behavior, reading order, or overflow was verified without observing the actual
surface or a meaningful test artifact.

## Finding format

Return a short verdict followed by findings in this shape:

`[severity] Location — problem. Why it matters. Smallest safe fix. Contract
or evidence.`

Use `blocker`, `high`, `medium`, or `low`. Prefer a few high-value findings to
an exhaustive style list. Call out existing strengths when they materially
change the decision, but do not bury the fixes.

In a review receipt, keep generated, proposed, reviewed, and confirmed items
separate. Mark each evidence check `checked` or `not-checked`, name the method
or reason, and record only what that evidence supports. A receipt is not an
approval, release decision, or proof of checks that were not run.

Do not edit the artifact in review mode. If the user explicitly asks for
`fix`, apply only the accepted blocking fixes after presenting the review and
then report what changed. If the artifact is not available, say what cannot be
reviewed and give the narrowest next request needed to continue.

## Preserve mission and visual meaning

For new decks or substantial composition redesigns, follow the mission and
`visual_reasoning` workflow in `../../references/presentation-playbook.md` and
`../../references/catalog/visual/composition-intents.json`. Preserve WHY,
WHAT and ASK; label a pilot as an example. Select from the available library
by semantic relationship and content fit before choosing a shell. Compare
same-content composition auditions and inspect representative renders before
a visual-selection claim. Review what the encoding explains, including task
states, hosting, trust crossings or release conditions where relevant. A
catalog name, clean geometry or shorter prose cannot establish visual meaning.
