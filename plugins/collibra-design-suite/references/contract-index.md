# Contract index

This is the compact routing map for the bundled Collibra design contract. The
full public snapshot is in `references/catalog/`; the visual reference is the
[design atlas](https://chadronbryant-collibra.github.io/collibra-design-pages/).

## The common contract

- Start with the reader's task, decision, and next action.
- Keep the voice steady while the emphasis changes for the audience, moment,
  and medium.
- Prefer the smallest structure that makes the work understandable and safe.
- Make states, uncertainty, provenance, accessibility, and human review
  visible when they affect use.
- Treat `defined` as usable within scope. Treat `proposed`, `open`, and
  `deferred` as explicit edges, not defaults.

## The suite layers

| Need | Read | Use it for |
|---|---|---|
| Foundations | `catalog/tokens/collibra.tokens.json` | Semantic color, type, contrast, radius, and surface roles. Do not invent an open spacing value. |
| UI | `catalog/ui/components.json` | Actions, forms, navigation, feedback, overlays, data, content, and AI surfaces with states and accessible naming. |
| UX | `catalog/ux/patterns.json` | Orientation, discovery, inspection, editing, review, recovery, long-running work, responsiveness, and provenance. |
| Visual | `catalog/visual/visual.json` | Composition, type, imagery, icons, data, motion, surfaces, accessibility, and cross-medium translation. |
| Diagram and workflow theming | `catalog/visual/diagram-theme-suite.json` | Token-backed semantic shapes, connectors, workflow roles, non-color cues, accessibility, and consumer boundaries. |
| Slide visual grammars | `catalog/visual/slide-grammar-suite.json` | Reader-question grammars, shell roles, visual rhythm, cross-medium translation, accessibility cues, and evidence contracts for varied deck composition. |
| Composition intent | `catalog/visual/composition-intents.json` and `presentation-playbook.md` | Mission preservation, catalog search by meaning, WHY/WHAT/ASK, same-content auditions, semantic encodings, mockups and native editability. |
| Presentation story | `presentation-playbook.md` and `catalog/slides/presentation-story.json` | Source-bound executive decisions, solution proposals, go-to-market stories, outcome/dependency roadmaps, meaningful composition auditions, and layered critique. The closed handoff is `catalog/slides/presentation-plan.schema.json`. |
| Shape-label safe insets | `catalog/slides/shape-label-safe-insets.json` | Versioned native-shape inset ratios for keeping measured glyph bounds inside visible semantic silhouettes. |
| Slide type-role usage | `catalog/slides/type-role-usage.json` | Semantic jobs for every slide type role plus the fail-closed reflow, reduction, and split policy for dense content. |
| Slide layout geometry | `catalog/slides/layout-geometry.json` | Strict finite layout-resolution records for semantic stacks, sized components, governed zones, equal gaps, surface-aware layering, labels, leaders, obstacles, and fail-closed fit resolution. |
| Content | `catalog/content/voice.json` | Voice pillars, personas, tone modes, medium guidance, terminology, UI copy, plain language, and human review. |
| Native guides and authoring | `catalog/content/guide-patterns.json` | Conditional team hub, initiative, and task-guide sections; ordered design, bundled Collibra refinement, and audience-ready review; audience and private content boundaries. |
| Slides | `slides-contract.md` | Reader-first slide hierarchy, safe areas, accessibility, evidence, and translation to web, docs, and product. |
| Registry | `catalog/registry/design-registry.json` | Metadata-only source labels, collection maturity, working-default options, and channel policy. |
| Portable creation brief | `design-brief.schema.json` | Closed handoff for reader, decision, source, output, medium, optional tone and constraints, and fact-level state and provenance. |
| Web-app creation | `web-app-playbook.md` | Journeys, screens, state model, semantic HTML, public offline prototypes, authorized private-tool routing, and acceptance checks. |
| Native authoring acceptance | `catalog/content/guide-patterns.json#reader_authoring` and `catalog/content/authoring-review.schema.json` | Reader intent, information architecture, proportional native features, material constraints and evidence, preserved structure, requested notes, and six explicit inspection checks. |
| Review receipt | `review-receipt.schema.json` | Machine-readable separation of output states and checked or not-checked evidence. It is not approval. |

## Reader lenses

The working personas are lenses, not labels: Collibrian, change navigator,
decision-maker, builder, data steward, customer, and People partner. Choose one
primary lens when the content needs a clear emphasis; split the content when
two audiences need materially different information.

## Tone modes

Choose one primary mode: aligned and purposeful, action-oriented, trust-
building, inclusive and approachable, teaching and wise, confident and
approachable, or plainly useful. Keep the three pillars in view: respectfully
direct, wise, and clever and punchy.

The People partner lens and plainly useful mode make early partnership,
designing, building, and supporting useful solutions visible without making
the reader learn technical language first. They do not establish a team's
mandate, service commitments, or delivery history.

## Review boundary

Generated or proposed content is not confirmed content. A person owns final
copy, product behavior, legal review, localization, accessibility validation in
the real surface, and any durable change. The registry metadata does not grant
brand-owner, licensing, or distribution approval.
