# Web-app creation playbook

Use this reference when the requested result is an interactive web app or a
web-app prototype. The app remains a prototype unless its actual host,
services, security, data, and release evidence establish more.
Apply the bundled `medium.web-app` guidance as a local creation adaptation; it
does not claim a measured brand rule.

## Model the experience before styling

Write down the primary reader and decision, then define:

1. **Journey:** the entry condition, useful action, result, and safe recovery.
2. **Screens:** each distinct place the reader needs, with its purpose, primary
   action, and way back. Prefer one screen when it can carry the task clearly.
3. **State model:** loading, empty, error, ready, and long-content behavior,
   plus disabled, partial, proposed, or confirmed states when they matter.
4. **Information contract:** stable facts and behavior separate from tone,
   density, layout, and other per-output style choices.

Use the portable `design-brief.schema.json` when the result crosses tools or
has several outputs. Keep fact IDs, state, and source intact in every output.

## Public portable prototype

Create one offline HTML file with embedded CSS and optional JavaScript. Use
semantic HTML, native controls, and portable system fonts. Use only the
existing approved token catalog for Collibra values; an operational fallback
must be labeled as such rather than added as a new brand value.

The file must have no remote resources, packages, network requests, analytics,
tracking, cookies, local or session storage, service worker, authentication,
or hidden persistence. It must not claim a backend, live data, deployment,
security review, production readiness, or a user identity it cannot verify.

Acceptance checks:

- landmarks, headings, labels, instructions, statuses, and tables have useful
  semantics and a logical reading order;
- every interaction works by keyboard, focus is visible, and focus order
  follows the reading order;
- text and shape carry state as well as color, and accessible names describe
  control actions;
- loading changes are announced without stealing focus; empty and error states
  explain the condition and smallest safe recovery; long content wraps or
  scrolls within a named region without hiding actions;
- content reflows at narrow widths without page-level horizontal scrolling,
  and controls remain usable at touch sizes;
- non-essential motion respects `prefers-reduced-motion`; and
- the useful reading path remains available when JavaScript is unavailable
  whenever the task permits it.

Inspect source and run meaningful automated checks. Describe rendered,
keyboard, assistive-technology, responsive, and browser checks as
`not-checked` until they are actually performed.

## Native or private route

Use a native or private creation tool only when it is available on the current
host, it materially improves the requested result, and the user has separately
authorized its effects. Pass the same portable brief without adding private
labels or paths to public output. Tool availability does not authorize login,
tenant access, file persistence, publication, deployment, or production
changes. If the route is unavailable, return the public portable prototype or
an implementation-ready brief instead of claiming the private result exists.

## Handoff

Return the runnable prototype and a compact state-and-evidence handoff. Use
`review-receipt.schema.json` when a machine-readable receipt helps. The receipt
separates generated, proposed, reviewed, and confirmed content and records
each check as `checked` or `not-checked`; it never grants approval.
