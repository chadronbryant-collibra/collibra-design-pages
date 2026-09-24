---
name: collibra-review
description: >-
  Review a Collibra-facing screen, flow, page, email, prompt, document, slide,
  diagram, chart, or content block before it ships. Use for design review,
  accessibility audit, content review, sanity check, or pre-send requests;
  return ranked, evidence-backed findings and do not silently redesign the
  artifact.
metadata:
  version: "1.1.0"
---

# Collibra pre-ship review

Use this as a review gate, not as an invisible rewrite. Read
`../../references/contract-index.md`, the relevant bundled catalog, and
`../../references/output-protocol.md` before reporting findings.

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

For Google Docs, check `medium.google-doc` and
`visual.document-composition`. Confirm that the opening answers the reader's
question, headings form a useful scan path, panels and visuals have a content
role, tabs represent distinct durable tasks, and exported pages preserve
readability, links, alt text, contrast, and page breaks.

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

Do not edit the artifact in review mode. If the user explicitly asks for
`fix`, apply only the accepted blocking fixes after presenting the review and
then report what changed. If the artifact is not available, say what cannot be
reviewed and give the narrowest next request needed to continue.
