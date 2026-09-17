# Creation playbook

Use this reference for net-new surfaces. It supplements the catalog; it does
not turn an open token or proposed rule into an approved default.

## Minimum creation brief

Capture five facts: reader, decision, medium, source material, and output. Ask
no more than two questions. Safe defaults are a general internal reader,
clearly labeled synthetic data, and an editable draft that needs owner review.

## Artifact contract

A web Artifact is one offline HTML file with embedded CSS and JavaScript. It
must not import fonts, packages, images, analytics, trackers, remote APIs, or
storage. Prefer system fonts, inline SVG only when necessary, and native HTML
controls. The file should remain useful without JavaScript when practical.

Required checks:

- semantic landmarks, headings, labels, and table structure;
- complete keyboard use and visible focus;
- text and meaningful graphics that meet contrast expectations;
- state and meaning conveyed by text or shape as well as color;
- `prefers-reduced-motion` support for any non-essential motion;
- useful reflow at narrow widths without clipped content or horizontal page
  scrolling; and
- clear empty, loading, error, and proposed-data treatments when applicable.

## Adjustment lanes

| Lane | Typical change |
| --- | --- |
| Audience | Reframe vocabulary, context, and call to action. |
| Hierarchy | Change reading order, grouping, and emphasis. |
| Density | Reduce simultaneous detail or add progressive disclosure. |
| Tone | Choose the most relevant bundled tone mode. |
| Visualization | Change comparison, trend, status, flow, or relationship form. |
| Layout | Reflow zones while preserving the reading path. |
| Evidence | Add citations supplied by the user or label uncertainty. |
| Accessibility | Repair names, focus, contrast, cues, motion, or semantics. |
| Responsive behavior | Define priority, stacking, overflow, and touch targets. |

## Completion states

- `generated`: produced by Claude from supplied or synthetic input;
- `proposed`: plausible content or behavior awaiting an owner decision;
- `reviewed`: checked against named contracts or inspected evidence; and
- `confirmed`: explicitly supplied or accepted by an accountable person.

Never silently promote one state to another.
