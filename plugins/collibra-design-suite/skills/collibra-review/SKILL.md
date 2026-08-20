---
name: collibra-review
description: >-
  Review a Collibra-facing screen, flow, page, email, prompt, document, slide,
  diagram, chart, or content block before it ships. Use for design review,
  accessibility audit, content review, sanity check, or pre-send requests;
  return ranked, evidence-backed findings and do not silently redesign the
  artifact.
metadata:
  version: "0.1.0"
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
