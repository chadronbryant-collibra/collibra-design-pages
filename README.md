# Collibra design atlas and Claude marketplace

## A public window into Collibra design thinking

The atlas is a friendly place to explore the ideas and guidance behind better
Collibra experiences. It helps people start with the reader’s question — what
does this mean, and what should I do next? — then move to the implementation
detail when they are ready to build or review.

[Open the live atlas](https://chadronbryant-collibra.github.io/collibra-design-pages/)

This public repository also carries the public-safe
`collibra-design-suite` Claude plugin, so the visual reference and the
adoption package stay discoverable from one place. The private
`collibra-design` repository remains the canonical source of the contracts.

## Install the Claude plugin

From Claude Code:

```text
/plugin marketplace add chadronbryant-collibra/collibra-design-pages
/plugin install collibra-design-suite@collibra-design
```

For a one-session clone:

```bash
git clone https://github.com/chadronbryant-collibra/collibra-design-pages.git
claude --plugin-dir ./collibra-design-pages/plugins/collibra-design-suite
```

For a ZIP upload, build the self-contained plugin archive:

```bash
python3 scripts/package_claude_plugin.py \
  --package-root . \
  --plugin collibra-design-suite \
  --output-dir /tmp/collibra-claude-plugins
```

Then upload the generated ZIP through Claude's local-plugin flow. The ZIP
contains the plugin root, not the marketplace repository.

## Start here

- Browse the 105 guides in the explorer.
- Use the plain-language explanation before opening the implementation reference.
- Browse the completed contract set; long guidance stays behind an accessible detail view.
- Start the work-memory section with five jobs: Capture, Current, History,
  Knowledge, and Recall. Improve is the loop around them, not a sixth job.
- Read the optional Context Engine panel as a derived infrastructure boundary,
  not a live memory service or a storage commitment.
- Visit the voice section to see how audience, tone, and medium change the way a message should land.
- Use the adoption path when you are turning a user task into a tested surface.

## Why this repository exists

This is the public Pages publication of the Collibra design atlas. The private
`collibra-design` repository is the canonical source; this repository is a
sanitized snapshot made for reading and sharing. Keeping those roles separate
lets the atlas be public without publishing private history or source context.

## What you’ll find

The atlas brings together foundations, UI behavior, UX patterns, visual
capabilities, content guidance, reader personas, tone modes, and practical
accessibility checks. It shows the complete defined contract set and the boundaries consumers still own — because honest edges are more useful than invented certainty.

## Built for more people

The page is designed for keyboard and screen-reader use, readable contrast,
visible focus, responsive layouts, reduced motion, and plain language. The
implementation reference is available when a designer or developer needs to
trace a guide back to its stable source identifier.

## For maintainers

This repository contains the generated public site plus the public-safe Claude
plugin: the page, its styles, its behavior, public data, plugin skills, and
bundled contract snapshot. Changes begin in the private source repository,
pass its source and public-boundary gates, and are then published here as a
reviewed Pages and marketplace release.
