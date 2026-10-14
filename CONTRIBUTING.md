# Contributing

Help someone find the right guidance, understand it, or put it to work. Describe
the reader's problem and keep your change focused on that outcome.

## Find the right place

Use the [repository map](README.md#how-this-repository-fits-together) to find
the affected files. Site behavior lives at the root; the installable skills,
references, and examples live under `plugins/collibra-design-suite/`.
Public guidance is a reviewed export. Coordinate changes to exported files
with the maintainer so the next export preserves them. Keep
`PUBLIC-PROVENANCE.json` aligned with the reviewed source and file hashes.

## Write for the person using it

Use the same voice as the site: respectfully direct, wise, clever and punchy.
Lead with what the reader needs, then explain the reason or useful next step.
Use plain English and concrete examples. A little personality helps when it
serves the point; claims still need evidence.

Keep facts, links, exact technical terms, and meaningful uncertainty intact.
For more detail, see the bundled [voice guidance](plugins/collibra-design-suite/references/catalog/content/voice.json).

## Propose and check a change

1. Use synthetic or public-safe material. Keep tenant data, customer content,
   people information, private source evidence, restricted assets, credentials,
   work-owned prompts, and internal paths out of the change.
2. Preserve the plugin's skills-and-references boundary: no hooks, agents,
   MCP servers, connectors, executable plugin scripts, subprocesses,
   credentials, analytics, trackers, remote runtime assets, or dependencies.
3. Add a meaningful behavior or boundary test when a contract changes. For
   copy edits, check the meaning, links, and reading order.
4. Run the checks below from the repository root. Put build output outside
   the checkout.
5. Open a pull request explaining who benefits, what changes, and what you
   verified. Changes need current checks and owner review.

```sh
python3 -m unittest discover -s tests -v
python3 scripts/package_plugin.py --output /tmp/collibra-design-suite.zip
python3 scripts/check_commit_metadata.py --base <exact-base-commit>
```

Use GitHub no-reply author and committer identities for public commits.
The metadata check covers newly proposed commits; deployment checks the final
publishing commit. Historical metadata needs its own review and is not rewritten
by this process.

To preview the site, serve the repository over HTTP, then open the local URL:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Check the affected page's reading order, keyboard access, and narrow layout.
A local preview is separate from a live Pages deployment. Pages deployment
uses the manual workflow on `main`; merging a PR runs validation without
deploying the site. Version tags drive package releases.

## License

Code is Apache-2.0; guidance and synthetic examples are CC BY 4.0. Collibra
marks, logos, proprietary fonts, trade dress, and restricted assets are
excluded. See [LICENSE.md](LICENSE.md).
