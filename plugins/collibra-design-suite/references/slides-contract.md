# Collibra slides contract

Use this reader-facing summary when a request involves slides or a deck. The
native template, object ids, and document-delivery mechanics remain owned by
the consuming slide system.

- State the conclusion or question the room needs to hold before the detail.
- Give only the context that helps the audience decide, understand, or
  remember.
- Earn confidence with a source, comparison, measure, or example.
- Preserve the inherited logo and footer safe areas in the native template.
- Use the template-specific geometry contract for canonical anchors, visual
  zones, alignment, repeated-item sizing, and distribution. Do not present
  those numeric rules as a universal Collibra spacing scale.
- Use `visual_body_default` for ordinary title-plus-visual pages. Reserve
  `semantic_body_full_field` for governed diagrams, workflows, and charts
  whose named shell owns the page header.
- Keep explanatory, decision-critical, and evidence-interpretation copy in
  substantive body roles. Reserve `caption` for sources, footnotes, units,
  axes, page furniture, and concise legends; reserve `eyebrow` for short
  locators and tags. The machine-readable v1 role contract is bundled at
  `catalog/slides/type-role-usage.json`.
- Measure every text role at its declared type size before selecting component
  geometry. Allocate separate ordered frames for locator or number, headline
  or label, detail or evidence, and source; never emit distinct semantic roles
  into the same frame or origin.
- Derive each component's minimum and preferred dimensions from measured copy,
  padding, and inter-role gaps. If the minimum cannot fit the visual zone,
  shorten without losing meaning, reflow or expand within the governed zone,
  reduce simultaneous items, or split the story. Never downshift the role or
  enable native autofit.
- Before emitting native objects, use the machine-readable v1 layout contract
  at `catalog/slides/layout-geometry.json` whenever the slide has a semantic
  role stack, two or more aligned or distributed components, a nonrectangular
  semantic surface, an outside label or leader, an obstacle, or intentional
  decorative/mask/marker layering. Copy-only edits that preserve existing
  object geometry do not require a new layout-resolution output.
- Equal-gap distribution may use heterogeneous component sizes; equal gaps do
  not imply equal-size peers. Semantic-content peers may not collide.
  Decorative, mask, or marker overlap requires an explicit owner and distinct
  layer, and must keep protected semantic text clear.
- Classify every nonrectangular surface as `semantic-content`, `decorative`,
  `mask`, or `marker`. Only a `semantic-content` surface may host copy. When a
  marker cannot contain its declared type inside the governed safe inset,
  place the label outside with a governed leader or adjacent rail.
- Verify contrast against the surface actually visible behind each object;
  renderer metadata alone is not proof.
- Keep measured glyph bounds inside the visible silhouette of chevrons,
  hexagons, trapezoids, parallelograms, diamonds, ellipses, and rounded
  rectangles using the versioned shape-family safe insets. Text-frame overlap
  alone is not containment evidence. The consumable v1 treatment is bundled at
  `catalog/slides/shape-label-safe-insets.json`.
- Route relationship lines behind node surfaces, clear of unrelated text, and
  use an opaque mask behind connector labels.
- Keep the visual and logical reading order aligned.
- Meet contrast for the actual text size and background; never rely on color
  alone for meaning.
- Describe meaningful images, icons, charts, and screenshots with useful
  alternatives.
- Make motion optional to comprehension and respect reduced-motion behavior.
- Label the takeaway, units, comparison, and source for tables and charts.
- Treat local geometry, fetched verification, and native human review as three
  distinct evidence levels; promotion requires all three.

The same conclusion-first hierarchy carries to web, documents, product UI, and
public content, adapted to the medium rather than copied mechanically.
