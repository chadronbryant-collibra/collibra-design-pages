# Creation playbook

Use this reference for net-new surfaces. It supplements the catalog; it does
not turn an open token or proposed rule into an approved default.

## Portable creation brief

Capture reader, decision, source material, output, and one supported medium
from `design-brief.schema.json`. The closed JSON shape is shared by the public
suite and an authorized private creation host; it carries facts and intent, not
tool authority. Optional tone and constraints travel with the brief. Each fact
keeps its stable ID, text, `confirmed` or `proposed` state, and source across
outputs. Use trimmed, nonempty, non-NUL strings and keep every fact ID unique
within the brief.

Ask no more than two questions. Safe defaults are a general reader, clearly
labeled example data, and an editable draft that needs owner review. Return
the brief as part of the requested output or pass it to the selected tool. Do
not save, upload, or register it automatically.

## Product truth and output style

Keep durable product truth separate from per-output style. Facts, behavior,
states, source meaning, and human decisions stay stable unless the user changes
them. Tone, density, hierarchy, layout, pace, and visual treatment may change
for the medium. A punchier message or shorter speech must not promote a
proposed fact, erase its source, or imply a capability the product does not
have.

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

Read `web-app-playbook.md` for journeys, screen and state models, public versus
private routes, and the complete web-app acceptance contract.

## Spoken output

For a speech or spoken update, preserve fact IDs and states in the private
working handoff, apply `medium.speech`, then write for hearing rather than
scanning. State the intended pace in words per minute and an estimated duration
based on the actual word count. Treat the estimate as a planning aid. Do not
invent an official speech format, delivery standard, or approval contract.

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

- `generated`: produced by Claude from supplied or example input;
- `proposed`: plausible content or behavior awaiting an owner decision;
- `reviewed`: checked against named contracts or inspected evidence; and
- `confirmed`: explicitly supplied or accepted by an accountable person.

Never silently promote one state to another.
