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
  version: "0.1.0"
---

# Collibra design

Use the design suite as a practical decision layer. Start with the person's
task and the meaning they need, then choose only the contracts that help them
act. Read `../../references/contract-index.md` first. Read the relevant
bundled catalog under `../../references/catalog/` when a concrete component,
pattern, visual capability, or content rule matters.

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
   - product controls or AI surfaces: `ui/components.json` plus
     `ux/patterns.json` and the relevant content rule;
   - visual composition, diagrams, charts, or imagery: `visual/visual.json`;
   - slide outputs: `slides-contract.md` plus the visual and content guidance;
   - foundations: `tokens/collibra.tokens.json` and semantic roles, not copied
     raw values.
5. Check maturity. `defined` is ready within its stated boundary; `proposed`,
   `open`, and `deferred` are not approved defaults. Keep the status visible.
6. Check the actual experience: keyboard access, focus, contrast, readable
   content, non-color cues, reduced motion, content expansion, states,
   recovery, provenance, and human review before a durable change.

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
