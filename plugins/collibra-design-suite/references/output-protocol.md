# Output protocol

The suite uses a final-first interface so the user can copy the useful result
without reading a ceremony. The user can ask for the reasoning surface when it
helps them review or learn.

## Default refinement

Return only the final content. Do not add a preamble, a generic explanation,
or a change log unless requested.

## Before and after

When requested, return:

```text
Before
[original]

After
[refined version]

What changed
- [meaningful change]
- [meaningful change]

Checks
- Audience: [persona or assumption]
- Medium: [medium]
- Tone: [primary mode]
- Preserved: [facts, links, quotes, names, code, or other protected spans]
- Review boundary: [what still needs a person]
```

Keep the change list short and specific. Explain a move, not your effort.

## Review

Return a one-line verdict, then ranked findings. Include the inspected surface
and the evidence level when a claim depends on rendering or execution.

## Design brief

Return:

1. reader outcome;
2. recommended contract slice;
3. key states and accessibility expectations;
4. evidence, maturity, and open decisions; and
5. smallest next action.

## No-edit and embedded modes

`detect only` and `what would you change?` do not edit. `embedded` returns only
the result required by the calling workflow. If the user asks for a file edit,
make the smallest explicit change and report the path plus a short summary.
