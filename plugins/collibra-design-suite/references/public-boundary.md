# Public distribution boundary

This plugin is a public-safe adoption surface. It contains the reader-facing
design contract and sanitized catalog snapshots, not private source history,
local paths, credentials, tenant data, internal routing, or unlicensed asset
packages.

The plugin can explain a contract and help a user apply it. It cannot grant
brand-owner approval, legal approval, localization approval, product release
approval, or access to a private system. Keep those review boundaries visible.

The bundled registry is metadata-only. It contains source labels, maturity,
collection policy, and safe default options; it excludes Drive URIs, local
paths, licensed binaries, credentials, and tenant data. The local registry UI
and the Apps Script adapter remain private administration surfaces.

The public atlas is a visual reference and the bundled snapshot is the stable
runtime reference. Neither one replaces testing in the consuming product or
document surface.

The package contains no analytics or hidden feedback channel. Public feedback
uses the documented GitHub support route after publication; private security
reports must use the security contact rather than a public issue. Context
Engine and every T3/runtime activation remain outside this plugin.
