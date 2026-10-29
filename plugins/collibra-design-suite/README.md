# Collibra design suite

Version `1.5.1`. See the [changelog](CHANGELOG.md) for package changes.

Use the suite for Collibra design, guides, decks and writing. Relevant skills
apply without being named. The source review check refreshes brand guidance
when its last successful review is missing or at least 60 days old. See
[brand refresh](references/brand-refresh.md).

The Collibra design suite helps people make content and experiences easier to
understand, use, and trust. It brings the reader-first design contract into
Claude for six jobs:

- write or revise an SOP or guide from sources or guided questions;
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
is the visual reference. Official brand resources and the Slides template are
linked in [brand refresh](references/brand-refresh.md); use your Collibra sign-in. The bundled `references/catalog/` snapshot keeps the
plugin useful when the atlas is not available. It includes a metadata-only
registry snapshot so the package can explain source maturity and channel
policy without receiving local paths or licensed asset files.

## Design a web app

Ask: "Design a web app for my team to review proposals. Use example data,
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

## Choose the help you need

| Skill | Use it when |
|---|---|
| `collibra-sop` | Create or revise an SOP, employee guide, or Quick Task from sources or guided questions. |
| `collibra-design` | You are building or structuring a product, page, flow, document, deck, data surface, or AI experience. |
| `collibra-create` | You want Claude to create and iteratively adjust an Artifact, dashboard, page, document structure, deck outline, diagram, UI flow, web app, speech, or data story. |
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

## See the document examples

[Browse the complete documents](https://chadronbryant-collibra.github.io/collibra-design-pages/#documents/internal-sop): an internal SOP, an employee guide and a linked Quick Task. They use example data and open without a GitHub account or Drive access. Open a document to read or print it, then adapt its prompt for your own process.

## Use it in Claude

Start with the [Claude setup walkthrough](https://chadronbryant-collibra.github.io/collibra-design-pages/#start): install the suite, connect your Google tools, and try a guide with made-up content.

Download [collibra-design-suite.zip](https://github.com/chadronbryant-collibra/collibra-design-pages/releases/latest/download/collibra-design-suite.zip) from the latest release. In Claude, open **Customize → Plugins** and use the custom-plugin upload option. Enable the suite and start a new conversation. Paid plans and organization permission are required for plugins. If your organization provides the suite, use its supplied entry.

For SOP writing alone, download [collibra-sop.zip](https://github.com/chadronbryant-collibra/collibra-design-pages/releases/latest/download/collibra-sop.zip). Open **Customize → Skills → + → Create skill → Upload a skill**, upload the ZIP and enable it. Skills require code execution and file creation to be enabled under your account or organization policy. Choose the full plugin or the standalone SOP skill; you do not need both.

The [complete setup guide](https://github.com/chadronbryant-collibra/collibra-design-pages/blob/main/plugins/collibra-design-suite/references/claude-setup.md) includes Google Docs, Slides and Sheets examples. The suite adds no connectors or account access by itself.

In Claude Code, the public marketplace remains an alternative:

```text
/plugin marketplace add chadronbryant-collibra/collibra-design-pages
/plugin install collibra-design-suite@collibra-design
```

See [Claude plugin instructions](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) and [skill instructions](https://support.claude.com/en/articles/12512180-use-skills-in-claude) for current menus and organization options.

## License and brand boundary

Code is Apache-2.0 and guidance and examples are CC BY 4.0. Collibra
trademarks, logos, proprietary fonts, trade dress, and restricted brand or
media assets are excluded from those grants. The standalone examples use
measured palette values plus explicitly labeled operational accessibility
fallbacks; those fallbacks are not new brand tokens. See `LICENSE.md`, `NOTICE`,
and `LICENSES/`.

## Find your way around the package

| Location | Use it for |
| --- | --- |
| [skills/](skills/) | The six sets of instructions Claude uses for your task. |
| [references/contract-index.md](references/contract-index.md) | Find the guidance behind a design choice. |
| [references/catalog/](references/catalog/) | Browse the bundled guidance offline. |
| [examples/README.md](examples/README.md) | Try a prompt and compare worked outputs with made-up content. |
| [references/design-brief.schema.json](references/design-brief.schema.json) | Reuse a brief across formats. |
| [references/review-receipt.schema.json](references/review-receipt.schema.json) | Record what was checked and what remains unverified. |

## Claude Code and help

Add the public marketplace, then install the suite:

```text
/plugin marketplace add chadronbryant-collibra/collibra-design-pages
/plugin install collibra-design-suite@collibra-design
```

Start a new session if the skills don't appear. This public package supports
Claude; it contains no Codex manifest.

See the repository's [support guide](https://github.com/chadronbryant-collibra/collibra-design-pages/blob/main/SUPPORT.md)
for general problems and [security policy](https://github.com/chadronbryant-collibra/collibra-design-pages/blob/main/SECURITY.md)
for private reporting. Use example reproduction material in public issues.
The earlier owner waiver of real-device Desktop and rendered human acceptance
is not a passing test receipt.
