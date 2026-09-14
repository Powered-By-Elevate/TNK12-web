# True North K-12 — website

Live source for the True North K-12 site. Served by GitHub Pages from the `gh-pages`
branch. Keep `main` and `gh-pages` identical.

## Brand

Built on the TNK12 Canva brand kit (`kAGTkx2Z8kc`), not on a traced logo or an
invented palette.

| Token | Value | Use |
| --- | --- | --- |
| Cobalt | `#0A63DA` | Primary. Headlines, marks, buttons, rules. |
| Deep cobalt | `#054EAD` | Hover and pressed states. |
| Charcoal | `#343434` | Body copy. |
| Paper | `#F6F6F6` | Text reversed out of cobalt or navy. |
| Warm ground | `#F6F5F4` | Alternating section bands. |

**Marks.** `tnk12-wordmark.svg` is the primary logo rebuilt as vector: TRUE NORTH in
wide-tracked caps, a script `K-12` crossing the baseline, `ESTD.` and `2024` flanking.
`tnk12-shield.svg` is the secondary shield: quartered, with a compass-drawn K, a cap over
an open book, an olive branch, and a script 12. Both take `--mk-ink` and `--mk-paper`, so
the reversed version on a dark ground is the same file.

Zero raster assets anywhere on the page. The favicon is an inline SVG data URI.

**Type.** The brand kit's faces come back from Canva as opaque refs rather than names, so
the site is set in **Inter** (display and body) with **Roboto Mono** for the small caps
labels. That is a substitution matched to the letterforms, not the brand's licensed face.
Swap it when the real font name is confirmed.

## Editing

`index.html` is self-contained: one file, no build step, no dependencies beyond the Google
Fonts link. The canonical source lives at `sites/tnk12/index.html` in the `agentic-os`
repo, and the copy here is that file with `<!DOCTYPE html>` prepended.

## Deploying

Push to both branches. Pages auto-enables from the `gh-pages` branch name.

```
git push origin main
git push origin main:gh-pages
```

A custom domain needs a `CNAME` file here holding the bare hostname, plus DNS at the
registrar: four apex A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`
and `185.199.111.153`, and a `www` CNAME to `powered-by-elevate.github.io`. Leave every MX,
SPF, DMARC and Microsoft record untouched.
