# Presentations that earn a decision

Choose the story from the reader's task before choosing a layout. Use
`catalog/slides/presentation-story.json` with the existing visual grammar,
type-role and geometry contracts. This adds reusable narrative guidance; the
native creation tool still owns template copying, editable object generation,
account access, rendering and delivery.

## Choose the purpose and reading mode

| Purpose | Reader needs |
| --- | --- |
| Executive decision | A recommendation or learning decision, stakes, feasible options and tradeoffs, evidence, risk conditions, and an explicit decision request. |
| Solution proposal | The recipient outcome, requirements and exclusions, how the proposed solution works, delivery dependencies, commercial assumptions, and acceptance/support handoff. |
| Go to market | A named audience and problem, a specific value promise, the mechanism and alternative comparison, attributable proof, offer constraints, and one next action. |
| Outcome roadmap | The outcome, baseline and target state, outcome-linked workstreams, directed dependencies, timing confidence, and decision gates. |

These are narrative jobs, not mandatory slide counts or fixed sequences. One
slide can serve complementary beats; repeat a beat when the argument needs it.
A topic label or completed checklist alone does not earn a conclusion. If a
beat lacks evidence, show the gap and the next learning decision. Do not
manufacture a result, customer claim, owner, price, date or commitment.

Choose `live` for a presenter-led sequence or `self_reading` for a pre-read or
leave-behind. A self-reading deck needs enough visible explanation to travel
without narration. A live deck still keeps material conditions next to the
claim they qualify. Add a complementary page before shrinking type. Neither
mode authorizes speaker notes; notes are not private storage.

## Pass 1: source and narrative

List the accountable reader and the exact decision or next action. Preserve
supplied wording, facts and source ownership. Build an ordered title story;
read it alone to check that the opening, reasoning and final request connect.
Keep conclusions bounded by the evidence rather than forcing a recommendation
when a learning decision is more defensible.

Use `catalog/slides/presentation-plan.schema.json` when a portable source plan
helps. Facts retain their stable ID, text, source and `confirmed`, `proposed`
or `synthetic` state. A slide's evidence references repeat the fact's state.
The state is a declaration, not authentication of the source. A human must
check that visible titles, charts and body text preserve that meaning.

Every supplied fact belongs in the main story, an appendix disposition, or an
explicit omission with a reason. Keep decision-critical facts and caveats in
the main story. A supporting fact may appear on multiple main slides; the
appendix/omission fields classify facts absent from the main story. They are
not a list of all appendix pages. A citation or fact ID alone does not prove
that a claim follows from its source. Proposed inferences need visible
qualification and accountable review.

For a proposal, make the recipient's acceptance criteria assessable before
stating a delivery commitment. Include discovery needs for identity, data,
integration, privacy, support and commercials when they affect feasibility.
Use the plan's `requirements` records to trace each recipient need through the
proposed solution to observable acceptance and source fact IDs. Keep that
acceptance context in the main story. A trace record establishes coverage,
while the accountable reader still decides whether the solution meets the need.
For a market story, match proof to the specific offer and audience; an example,
prototype or forecast is not customer validation. For a roadmap, connect each
workstream to an outcome and record prerequisites before dependents. Name
owner roles, exit criteria, timing state and timing basis. Unknown assignments
and dates stay unknown. `committed`, `forecast` and `exploratory` communicate
different evidence; arrows must not imply a proven causal effect.

## Pass 2: mission, visual intent and composition

For new decks and substantial redesigns, use the closed `visual_reasoning`
extension in `catalog/slides/presentation-plan.schema.json`. The consumer's
source validator must require the extension; the canonical validator exposes
`--require-visual-reasoning`. Legacy v1 plans remain source-valid and do not
prove these checks. A copy-only edit preserving an accepted composition does
not require rebuilding the plan.

Write the mission before the title sequence: primary subject, reader outcome,
and the source facts supporting WHY, WHAT and ASK. Map each to main-story
slides. Give illustrative workloads separate subject IDs. Inspect the opening,
closing and overall emphasis against that mission. An attractive pilot or
familiar workflow must not replace a platform proposal's purpose. IDs and
coverage checks cannot prove that the written headline preserves meaning;
review the actual words and rendered sequence as well.

Read `catalog/visual/composition-intents.json`. Choose the semantic relation
that answers the reader question before choosing a shell. Search the available
consumer library by that intent, related task and required data, then inspect
matching entries and their capabilities. Use the whole available catalog as
the search space, even when it has hundreds of entries. Do not stop at the
first familiar card grid or claim every template was inspected without evidence.
Record the catalog source, exact entry IDs and availability; Design Suite
intent IDs do not invent native support. A composed native structure is a
valid candidate when the consumer supports it.

Useful directions include:

- WHY: show the friction, mechanism and changed outcome through a causal chain
  or comparable before/after states. Distinguish a proposed mechanism from
  measured impact; never invent savings or causality.
- A task: show a person acting on an artifact, changing its state and handing
  it to an owner. Use a storyboard or actual UI mockup when that helps explain
  what the person sees and does.
- A platform: show hosted tools and agents inside their runtime, connections
  outside it, and ownership or permission at the crossing. A connected cutaway
  can explain relationships a service-name hub leaves unstated.
- Trust: show the caller, crossing, permission check, resource and denied
  branch, with unresolved identity choices visible.
- Release: show environments connected by promotion conditions, an owner
  handoff and a supported failure or rollback path.
- Exact choices: use a table or comparison when aligned criteria are the
  reader's task. A cover or decision request may use text as its main anchor.

For each explanatory composition, audition at least two meaningfully different
encodings under the same inherited mission, headline, reader question, evidence
and fact states. Include entities with semantic roles and typed relations tied
to the slide's facts. Show what position, containment, connection, order or
state reveals. Compare reading path, content fit and tradeoffs. Different
layout names, colors, silhouettes or rewritten prose do not make a new
encoding. The same grammar can support different useful compositions. A straightforward
opening thesis or decision request may retain one justified candidate when
its single-conclusion intent is already clear.

For a representative slide or short sequence, render the alternatives through
the consumer before claiming a visual selection. Keep the remaining auditions
`source_only` until rendered. Review both renders under the same mission and
content. Ask: what can the reader now infer from the visual relationships that
they could not infer from a list of labels? If removing the surfaces leaves
the entire explanation in paragraphs, the composition needs a reason or a
stronger encoding. Do not turn this into a shape quota or a ban on text,
cards or tables. Choose the medium for the job.

Keep diagrams natively editable where practical. Permitted screenshots, image
inserts and generated mockups can complement native labels and connectors.
Record what remains editable, image provenance and alt text; do not flatten a
whole workflow merely because one useful visual is an image. Placeholder UI
and proposed interactions must not be presented as a running product.

Source topology checks reject duplicate auditions and missing semantic roles,
not bad art direction in general. A valid declaration, an HTML storyboard and a
referenced render do not prove that the encoding is visible or persuasive.
Native capabilities, geometry, type roles, template protection and actual
render inspection remain consumer-owned. Keep evidence and editorial records
in the private handoff, and add speaker notes only when requested.

## Pass 3: critique and delivery

Review in layers so a clean layout cannot hide a weak argument:

1. Read the title sequence and ask. Is the reader able to make the intended
   decision, and does the final request follow from the story?
2. Inspect claims, source coverage, states, scope and numeric reconciliation.
   Keep missing evidence and caveats visible where they change interpretation.
3. Review the contact sheet for hierarchy, emphasis, repetition and sequence.
   Inspect every final slide at presentation size for density and readability.
4. Check the existing geometry/type-role contracts, actual surface contrast,
   reading order, alt text, chart labels, connectors, cropping and overflow.
5. Verify native editability, links, protected elements, output/export behavior,
   notes and hidden content against the authorized destination and format.

Report fixable findings by location, severity, observed problem, consequence,
and smallest useful repair. Separate source checks, rendered previews, native
readback and human acceptance in the private handoff. Neither a valid plan nor
a quality score proves that a deck is rendered, persuasive, accessible,
accepted or delivered. Repair the owning source and rebuild when available.
Apply requested fixes within scope and rerun only the affected checks.
