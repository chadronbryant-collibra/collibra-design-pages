# Executive dashboard walkthrough

## Initial request

> Use `collibra-create` to create a single-file, offline executive dashboard
> Artifact from `data.json`. The reader is a program lead deciding where to
> intervene this week. Treat every metric as synthetic and proposed.

The first result should lead with the decision, summarize the three metrics,
show workstream status with text as well as color, and state the data boundary.

## Adjustment conversation

1. “Reduce density. Keep only what changes this week's decision.”
2. “Make the four awaiting-owner decisions the primary callout.”
3. “At narrow widths, stack the metrics and keep the workstream table usable.”
4. “Add an explanation of what proposed means without adding a tooltip.”

## Accessibility review

> Use `collibra-review`. Check semantic landmarks and headings, keyboard and
> focus behavior, contrast, non-color cues, reduced motion, responsive reflow,
> overflow, table semantics, and the proposed-data label. Do not edit.

Record what was inspected. Source-only review cannot confirm the rendered
contrast, final focus appearance, or real screen-reader output.

## Final output

Save the accepted Artifact as `index.html`. Keep CSS and JavaScript inline,
make no network requests, and retain the synthetic/proposed label. The example
file is an editable reference, not proof of a Collibra product implementation.
