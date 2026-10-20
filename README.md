# Collibra design suite

Make the work you share easier to follow. The design suite brings Collibra's
voice, visual style, and accessibility guidance to decks, documents, messages,
dashboards, speeches, and web apps. You bring the facts and the purpose.

[Explore the design suite](https://chadronbryant-collibra.github.io/collibra-design-pages/)
to see the guidance in practice. Browse without installing anything, or add
the Claude plugin to help you create and adjust your own work.

## Start with your task

| You want to… | Start here |
| --- | --- |
| Turn an idea into a brief | [Make something](https://chadronbryant-collibra.github.io/collibra-design-pages/#make/web-app) |
| See what a clearer deck or guide looks like | [Try examples](https://chadronbryant-collibra.github.io/collibra-design-pages/#examples/deck) |
| Choose color, type, tone, or accessible layouts | [Learn the brand](https://chadronbryant-collibra.github.io/collibra-design-pages/#brand) |
| Find a specific rule | [Browse the guidance library](https://chadronbryant-collibra.github.io/collibra-design-pages/#catalog) |
| Create, refine, simplify, or review work in Claude | [Install the plugin](#use-it-in-claude) |

The examples use made-up content to show design choices. For a finished deck
or document, use your approved assets and authoring tools, then review the
output before sharing it.

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

## Six ways to ask for help

| Skill | What it helps you do |
| --- | --- |
| `collibra-sop` | Create or revise an SOP, employee guide, or Quick Task from sources or guided questions. |
| `collibra-design` | Choose guidance for your reader, task, and format. |
| `collibra-create` | Create and adjust a page, dashboard, deck outline, document structure, diagram, UI flow, web app, speech, or data story. |
| `collibra-refine` | Make copy clearer and ready for its audience. |
| `collibra-simplify` | Explain technical ideas in plain language while keeping their meaning. |
| `collibra-review` | Find and prioritize improvements before you share the work. |

See the [plugin guide](plugins/collibra-design-suite/README.md) for prompts and
limits, or try the [worked examples](plugins/collibra-design-suite/examples/README.md).
The [changelog](plugins/collibra-design-suite/CHANGELOG.md) records package changes;
[releases](https://github.com/chadronbryant-collibra/collibra-design-pages/releases)
hold versioned downloads.

## How this repository fits together

This repository holds the public site and Claude package. The site files stay
at the root so GitHub Pages can serve them directly.

| Location | What you'll find |
| --- | --- |
| [index.html](index.html), [app.js](app.js), [styles.css](styles.css) | Site layout, interactions, and styling. |
| [data/](data/) | Public guidance used by the site. |
| [plugins/collibra-design-suite/](plugins/collibra-design-suite/) | The installable package: six skills, reference guidance, and synthetic examples. |
| [.claude-plugin/marketplace.json](.claude-plugin/marketplace.json) | The public marketplace entry that points to the package. |
| [scripts/](scripts/) and [tests/](tests/) | Package building, publication checks, and boundary tests. |
| [.github/](.github/) | Ownership, issue and PR templates, validation, release, and Pages workflows. |
| [PUBLIC-PROVENANCE.json](PUBLIC-PROVENANCE.json) | Source revision and file hashes for the reviewed export. |

If you're proposing a change, start with [Contributing](CONTRIBUTING.md).

## What to expect

The brief builder makes no AI calls. What you type stays in the current page
until you reload or close it; copying or downloading happens only when you
choose it. The site stores no input and uses no analytics.

The plugin contains guidance and examples, with no connectors, credentials,
hooks, agents, MCP servers, executable plugin scripts, subprocesses, external
packages, tracking, or remote runtime assets. HTML examples run offline.
Prompts you give Claude follow your account's terms and organization policy.
In Cowork, file writes require your request and stay in the connected folder
in scope.

Web output is a prototype. Real sign-in, databases, connectors, native
slides or documents, and deployment need suitable tools and separate authority.
The suite adds no persistent memory service and does not approve or publish
your work.

Source and package checks are separate from real-device acceptance. The
owner waived standard-user Claude Desktop acceptance for the earlier release;
these files claim no new Chat, Cowork, update, or uninstall acceptance receipt.

## Get help

Manage the suite under **Customize → Plugins**. If a skill is missing, confirm
the plugin is enabled, start a new session, and check whether your organization
allows personal plugins.

Use [Support](SUPPORT.md) to report a general problem with made-up reproduction
material. Use the private route in [Security](SECURITY.md) for vulnerabilities.

## License

Code is Apache-2.0; guidance and synthetic examples are CC BY 4.0. Collibra
trademarks, logos, proprietary fonts, trade dress, and restricted assets are
excluded from both grants. See [LICENSE.md](LICENSE.md), [NOTICE](NOTICE), and
[LICENSES/](LICENSES/).
