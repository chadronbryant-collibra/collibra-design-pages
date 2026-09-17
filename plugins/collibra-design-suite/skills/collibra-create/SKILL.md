---
name: collibra-create
description: >-
  Create and iteratively adjust a Collibra-aligned Artifact, dashboard, page,
  document structure, deck outline, diagram, UI flow, or data story. Use when
  the user wants a new audience-ready surface rather than guidance or review;
  keep generated, proposed, reviewed, and confirmed content distinct.
metadata:
  version: "1.0.0"
---

# Collibra creation

Create the smallest complete surface that helps the intended reader act. Read
`../../references/contract-index.md`, `../../references/creation-playbook.md`,
and only the catalog slices relevant to the requested medium.

## Frame the result

Identify the reader, decision, medium, content or data source, and requested
output. Ask at most two focused questions only when missing inputs would
materially change the result. Otherwise make a low-risk assumption and label
it in the handoff.

Choose a structure before decoration. Lead with the outcome, make hierarchy
and state visible, preserve supplied facts, and never invent evidence,
metrics, owners, dates, links, or brand approvals. Mark proposed data clearly.

## Build by medium

- In Claude Chat, return a self-contained Artifact. For a web Artifact, use one
  portable HTML file with embedded CSS and JavaScript, no external packages,
  remote assets, analytics, hidden tracking, network requests, or storage.
- In Cowork, write portable files only when the user requests a file and only
  into the user-connected folder in scope.
- For branded documents, apply `medium.google-doc` and
  `visual.document-composition`: open with the useful answer, create a visible
  scan path, and use panels, comparisons, sequences, figures, or native tabs
  only when the content has that relationship. Keep the result editable and
  verify the native document and exported pages.
- For decks, diagrams, UI flows, and data stories, return an editable structure
  with content, hierarchy, accessibility treatment, and explicit placeholders
  for unconfirmed facts.

Use semantic HTML and logical reading order. Provide keyboard operation,
visible focus, non-color cues, adequate contrast, reduced-motion behavior,
responsive reflow, safe overflow, useful empty states, and accessible names
where the medium supports them.

## Adjust and finish

After the first result, offer the relevant adjustment lanes in one compact
line: audience, hierarchy, density, tone, visualization, layout, evidence,
accessibility, or responsive behavior. Apply requested adjustments directly;
do not restart discovery unless the goal changed.

Finish with an optional `collibra-review` pass. Distinguish what was generated,
proposed, reviewed, and confirmed. Do not claim visual or runtime validation
unless the rendered result or meaningful test evidence was inspected.
