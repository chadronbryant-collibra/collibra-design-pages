# Portable styles

Use these aliases in a web prototype. They are generated from approved palette
and radius values plus the labeled portable font fallback. They do not supply
font files or a new spacing, gradient, status, or theme standard.

```css
/* Generated implementation aliases. font-web is an operational fallback.
 * Source: tokens/collibra.tokens.json; SHA-256: 2159cb72b6b7baff02a8e1e2b506c862203eaacd2ed732aa2f7a957966a973a8 (raw-file-bytes). */
:root {
  --collibra-color-heading: #002B40;
  --collibra-color-body: #4B4B4B;
  --collibra-color-surface: #FFFFFF;
  --collibra-color-muted-surface: #F0F2F3;
  --collibra-color-dark-surface: #002B40;
  --collibra-color-on-dark: #DFE6E8;
  --collibra-color-action-fill: #72BF00;
  --collibra-color-action-text: #002B40;
  --collibra-color-link: #03755F;
  --collibra-font-web: system-ui, -apple-system, Segoe UI, sans-serif;
  --collibra-font-document: Arial;
  --collibra-radius-control: 4px;
}
```

The matching `style-tokens.json` records each source token and evidence label.
Use the document font only for the document or slide medium. Test every
actual text/background combination and interaction in the consuming surface.
