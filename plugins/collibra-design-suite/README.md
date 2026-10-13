# Collibra design suite 1.2

- **Status:** public release
- **Version:** `1.2.1`
- **Source:** the merged private `collibra-design` release branch

The Collibra design suite helps people make content and experiences easier to
understand, use, and trust. It brings the reader-first design contract into
Claude for five jobs:

- choose the right design, audience, medium, and accessibility guidance;
- create and adjust an Artifact, dashboard, page, document structure, deck
  outline, diagram, UI flow, web app, speech, or data story;
- refine emails, prompts, UI copy, briefs, and other Collibra-facing content;
- simplify technical language without flattening the meaning; and
- review a surface before it ships, with ranked, fixable findings.

The suite returns the useful result first. Ask for `before and after`, `show the
changes`, `show the diff`, or `show the checks` when you want the reasoning
trail as well.

The [public design atlas](https://chadronbryant-collibra.github.io/collibra-design-pages/)
is the visual reference. The bundled `references/catalog/` snapshot keeps the
plugin useful when the atlas is not available. It includes a metadata-only
registry snapshot so the package can explain source maturity and channel
policy without receiving local paths or licensed asset files.

## Design a web app

Ask: "Design a web app for my team to review proposals. Use synthetic data,
make the main task clear, and include empty, loading, error, and success states."
Claude starts with the reader and journey, then returns an editable offline
prototype or a plan appropriate to the tools available. It does not provision
authentication, connect a backend, or deploy an application.

Reuse the portable brief in `references/design-brief.schema.json` for a new
medium without losing the facts. See `examples/web-app/`, `examples/cross-medium/`,
and `examples/speech/` for worked outputs. A separate review receipt records
checked and unchecked evidence; it is not a brand or human approval.

The site adds a guided brief builder and component-state playground. Inputs
remain in the current page until you explicitly copy or download them. No
plugin memory backend, automatic capture, or hidden persistence is added.

## Five skill lanes

| Skill | Use it when |
|---|---|
| `collibra-design` | You are building or structuring a product, page, flow, document, deck, data surface, or AI experience. |
| `collibra-create` | You want Claude to create and iteratively adjust an Artifact, dashboard, page, document structure, deck outline, diagram, UI flow, or data story. |
| `collibra-refine` | You say “refine this,” “tone this,” “humanize this,” or ask for a clearer email, prompt, UI copy, or brief. |
| `collibra-simplify` | You explicitly ask for plain English, less technical language, or a simpler explanation. |
| `collibra-review` | You ask for a design, content, accessibility, or pre-ship review. |

## Boundaries

The suite preserves facts, links, quotations, product names, code, and durable
review boundaries. It does not invent evidence, silently change a file, claim
to have seen a rendered surface it did not inspect, or turn a proposed or open
contract into an approved standard. The registry snapshot is descriptive; it
does not connect to Drive, enable an Apps Script deployment, or change the
private source repository.

## Claude Desktop installation

The accountable owner approved public publication and in-place remediation
on 2026-09-17. A paid-plan user can install the release in
Claude Desktop through **Customize → Plugins → Add → Add marketplace**, add
the public GitHub repository, and select this suite.

Verified 2026-10-13 against the official
[Claude Desktop installation requirements](https://support.claude.com/en/articles/10065433-install-claude-desktop)
and [plugin marketplace instructions](https://support.claude.com/en/articles/13837440-use-plugins-in-claude):
this supported path requires an already installed Claude Desktop app on macOS
13+ or Windows 10+. This package does not extend support to Linux.

That route requires no operating-system elevation or Claude organization-admin
role when personal plugins are permitted. Organization policy can disable
personal plugins and is not something this package bypasses. An already
installed supported Claude Desktop app is a prerequisite.

The package has no hooks, agents, MCP servers, connectors, credentials,
subprocesses, external packages, or remote runtime assets. In Cowork it writes
only when the user requests a file and only into the connected folder in scope.

See `examples/README.md` for copy-ready synthetic examples and
`examples/dashboard/WALKTHROUGH.md` for the complete Artifact flow.

## License and brand boundary

Code is Apache-2.0 and guidance and synthetic examples are CC BY 4.0. Collibra
trademarks, logos, proprietary fonts, trade dress, and restricted brand or
media assets are excluded from those grants. The standalone examples use
measured palette values plus explicitly labeled operational accessibility
fallbacks; those fallbacks are not new brand tokens. See `LICENSE.md`, `NOTICE`,
and `LICENSES/`.

This Claude package intentionally has no `.codex-plugin` manifest. The private
`collibra-plugins` repository remains canonical for the paired Codex adapter
and installed-client parity.

For the private Claude Code marketplace, install with `/plugin install` after
adding the approved marketplace. For Codex, use `codex plugin add` with the
approved local marketplace entry. These CLI routes do not prove Claude Desktop
installation. The accountable owner waived real-device Claude Desktop and
rendered human acceptance for 1.0, so those checks are not claimed as passing
release evidence.
