---
name: collibra-design
description: >-
  Apply Collibra's reader-first design contracts to product UI, UX flows, web
  pages, documents, slide decks, data communication, prompts, and AI-assisted
  experiences. Use when a request asks to build, structure, review, or choose a
  design pattern, audience, tone, accessibility behavior, state, or evidence
  boundary; do not use for a prose-only rewrite when no design decision is
  needed.
metadata:
  version: "1.5.0"
---

# Collibra design

Apply this skill by default when its task matches relevant Collibra work; the
user need not name it. Respect explicit user preferences and use only the
smallest relevant guidance. Before brand-dependent work, follow
`../../references/brand-refresh.md`, including its 60-day source review check.


Use the design suite as a practical decision layer. Start with the person's
task and the meaning they need, then choose only the contracts that help them
act. Read `../../references/contract-index.md` first. Read the relevant
bundled catalog under `../../references/catalog/` when a concrete component,
pattern, visual capability, or content rule matters.

For an SOP, employee/manager task guide or linked Quick Task, use the bundled
`collibra-sop` skill for the procedure workflow and apply the relevant design
guidance here.

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

## Route the request

1. Name the surface: product UI, UX flow, public web, email, chat, prompt,
   long-form guide, slide deck, document, diagram, chart, or AI-assisted
   experience.
2. Name the reader and their job. Use a working persona only as a reader lens,
   never as a stereotype. If the audience changes the meaning and the user did
   not provide it, ask one focused question; otherwise make a low-risk
   assumption and label it.
3. Choose one primary tone mode. Keep the three voice pillars steady while the
   emphasis changes for the moment and medium.
4. Select the smallest useful contract slice:
   - content or prose: `content/voice.json`;
   - a team hub, initiative page, or task guide: `content/guide-patterns.json`
     for native sections, conditional detail, and content visibility;
   - product controls or AI surfaces: `ui/components.json` plus
     `ux/patterns.json` and the relevant content rule;
   - visual composition, charts, or imagery: `visual/visual.json`;
   - branded documents: `content/voice.json` plus
     `visual.document-composition` in `visual/visual.json`; use native tabs only
     for distinct reader tasks and keep exact geometry with the document
     consumer;
   - diagrams and workflows: `visual/visual.json` plus
     `visual/diagram-theme-suite.json`;
   - slide outputs: `slides-contract.md` plus the visual and content guidance
     and `visual/slide-grammar-suite.json` for reader-first visual variety;
   - foundations: `tokens/collibra.tokens.json` and semantic roles, not copied
     raw values.
5. Check maturity. `defined` is ready within its stated boundary; `proposed`,
   `open`, and `deferred` are not approved defaults. Keep the status visible.
6. Check the actual experience: keyboard access, focus, contrast, readable
   content, non-color cues, reduced motion, content expansion, states,
   recovery, provenance, and human review before a durable change.

Before drafting or generating any slide output, read and apply
`../../references/slides-contract.md`. Preserve each text role's semantic job.
Caption and eyebrow roles are metadata, not overflow repair. If substantive
copy does not fit its role, follow the contract's author-time geometry and
escalation rules; do not downshift the role or rely on native autofit. Use
`../../references/catalog/slides/type-role-usage.json` as the machine-readable
type contract. Before emitting native slide objects, also read and emit a
strict resolution against `../../references/catalog/slides/layout-geometry.json`
when the slide has a semantic role stack, two or more aligned or distributed
components, a nonrectangular semantic surface, an outside label or leader, an
obstacle, or intentional decorative/mask/marker layering. Skip a new geometry
resolution only for a copy-only edit that leaves existing object geometry
unchanged.

## Finish audience-facing content

Apply Design, then the bundled Collibra refinement contract, then an audience-ready review. Read the
`authoring_sequence` and `visibility` contracts in
`../../references/catalog/content/guide-patterns.json`. Apply
`collibra-refine` in embedded mode. An internal refinement skill may add a
separate review when available, but public completion never depends on it.

For a visually structured native guide, read `native_visuals` in that catalog.
Choose a recipe from the reader's question, preserve its conditions, and keep
the proposed recipe maturity separate from live native capability and actual
rendered review. The consumer owns geometry and connector execution.

Keep the artifact ready for its audience. Put drafting choices and review
findings in the private handoff, not in published copy or off-canvas content.
Use native speaker notes or facilitator prompts only when requested, remembering
that collaborators may see them. Preserve existing notes during edits.

## Make the contract usable

Lead with the reader outcome or decision before the implementation detail. Put
technical identifiers, raw token names, and source references behind a useful
label such as `Implementation reference` or `Sources used`. Do not erase a
technical constraint; translate it, explain why it matters, and keep the exact
contract available for the builder.

When proposing an implementation, return:

1. the recommended reader-facing direction;
2. the contracts used and their maturity;
3. the key states, accessibility expectations, and review boundary; and
4. the smallest next action or open decision.

Do not silently edit an artifact unless the user asked for an edit. If another
skill calls this one, return a compact brief that the calling skill can apply.

## Evidence and honesty

Separate what was observed from what was inferred. Never invent a source,
brand rule, accessibility result, product behavior, owner, date, or completion
state. A visual review requires a rendered surface, screenshot, or inspectable
artifact; otherwise say what could not be assessed.

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
