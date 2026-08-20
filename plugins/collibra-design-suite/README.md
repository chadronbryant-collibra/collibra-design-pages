# Collibra design suite

**Status:** public-safe adoption package · **Version:** 0.1.0 · **Source:**
[Collibra design atlas](https://chadronbryant-collibra.github.io/collibra-design-pages/)

Install it from the public marketplace:

```text
/plugin marketplace add chadronbryant-collibra/collibra-design-pages
/plugin install collibra-design-suite@collibra-design
```

The same plugin can be loaded from this checkout with
`claude --plugin-dir plugins/collibra-design-suite` or uploaded as a ZIP built
with `scripts/package_claude_plugin.py` from the repository root.

The Collibra design suite helps people make content and experiences easier to
understand, use, and trust. It brings the reader-first design contract into
Claude for four jobs:

- choose the right design, audience, medium, and accessibility guidance;
- refine emails, prompts, UI copy, briefs, and other Collibra-facing content;
- simplify technical language without flattening the meaning; and
- review a surface before it ships, with ranked, fixable findings.

The suite returns the useful result first. Ask for `before and after`, `show the
changes`, `show the diff`, or `show the checks` when you want the reasoning
trail as well.

The [public design atlas](https://chadronbryant-collibra.github.io/collibra-design-pages/)
is the visual reference. The bundled `references/catalog/` snapshot keeps the
plugin useful when the atlas is not available.

## Skills

| Skill | Use it when |
|---|---|
| `collibra-design` | You are building or structuring a product, page, flow, document, deck, data surface, or AI experience. |
| `collibra-refine` | You say “refine this,” “tone this,” “humanize this,” or ask for a clearer email, prompt, UI copy, or brief. |
| `collibra-simplify` | You explicitly ask for plain English, less technical language, or a simpler explanation. |
| `collibra-review` | You ask for a design, content, accessibility, or pre-ship review. |

## Boundaries

The suite preserves facts, links, quotations, product names, code, and durable
review boundaries. It does not invent evidence, silently change a file, claim
to have seen a rendered surface it did not inspect, or turn a proposed or open
contract into an approved standard.
