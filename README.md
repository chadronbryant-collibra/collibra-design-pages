# Collibra design suite

This repository hosts the public Collibra design atlas and the
`collibra-design-suite` 1.0 release.

## Install in Claude Desktop

Prerequisites: an already installed Claude Desktop app on macOS 11+ or Windows
10+, a paid Claude plan, and an organization policy that permits personal
plugins.

1. Open **Customize → Plugins → Personal plugins → Add marketplace**.
2. Add `chadronbryant-collibra/collibra-design-pages`.
3. Select and install **Collibra design suite**.
4. Start a new Chat or Cowork session and ask Claude to design, create, refine,
   simplify, or review a surface.

The personal-plugin route requires no administrator password, operating-system
elevation, system-directory write, environment-variable change, terminal
command, connector authorization, or Claude organization-admin role. It does
not bypass an organization's policy.

## Claude Code alternative

Desktop installation is the primary supported path. In Claude Code, add this
marketplace and install the suite with:

```text
/plugin marketplace add chadronbryant-collibra/collibra-design-pages
/plugin install collibra-design-suite@collibra-design
```

Start a new session if skill discovery does not refresh immediately.

## What it includes

- `collibra-design`: choose and explain the smallest useful contract.
- `collibra-create`: create and adjust an Artifact, dashboard, page, document
  structure, deck outline, diagram, UI flow, or data story.
- `collibra-refine`: produce audience-ready copy.
- `collibra-simplify`: reduce technical complexity without losing meaning.
- `collibra-review`: return ranked findings without silently editing.

The plugin is offline and dependency-free. It contains no hooks, agents, MCP
servers, connectors, executable plugin scripts, subprocesses, credentials,
analytics, or tracking. Synthetic Artifact examples may use self-contained
HTML, CSS, and JavaScript with no remote assets. In Cowork, files are written
only when requested and only to the connected folder in scope.

## Manage the plugin

Use **Customize → Plugins** to enable, disable, update, or uninstall the suite.
If a skill is not visible, confirm the plugin is enabled, start a new session,
and check whether personal plugins are allowed by your organization. Report
general problems through GitHub issues without including work-owned data,
tenant details, prompts, credentials, or private files.

See `SECURITY.md` for private security reporting and `SUPPORT.md` for the
supported boundary.

User-provided content stays in the active Claude conversation or, after an
explicit file request in Cowork, the connected folder the user selected. The
plugin itself stores no content and performs no analytics or network calls.

The 1.0 release was source-, package-, and portability-validated. The
accountable owner waived standard-user Claude Desktop and rendered human
acceptance for this release, so no real-device Chat, Cowork, update, or
uninstall receipt is claimed.

## License

Code is Apache-2.0 and guidance and synthetic examples are CC BY 4.0. Collibra
trademarks, logos, proprietary fonts, trade dress, and restricted assets are
excluded from both grants. See `LICENSE.md`, `NOTICE`, and `LICENSES/`.
