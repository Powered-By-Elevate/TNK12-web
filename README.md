# True North K-12 — website

Single-page splash site. Served by GitHub Pages from the `gh-pages` branch. Keep `main`
and `gh-pages` identical.

## Brand

Built on the TNK12 Canva brand kit (`kAGTkx2Z8kc`).

| Token | Value | Use |
| --- | --- | --- |
| Cobalt | `#0A63DA` | Primary. Hero, headings, marks, buttons. |
| Deep cobalt | `#054EAD` | Hover and pressed states. |
| Charcoal | `#343434` | Body copy, and the figures and footer bands. |
| Paper | `#F6F6F6` | Text reversed out of charcoal. |
| Warm ground | `#F6F5F4` | Alternating section bands. |

Light mode only, by instruction. No dark-theme blocks in the stylesheet.

**Marks.** `assets/tnk12-shield.png` is the brand's own shield file. `tnk12-shield-white.png`
is the same artwork with its RGB forced to white, standing in for the kit's "White Logo.png"
reverse until that file can be added directly.

**Type.** The kit's faces come back from Canva as opaque refs rather than names, so the page
is set in **Inter** with **Roboto Mono** for the small caps labels. A matched substitution,
not the licensed face. Swap it once the real font name is confirmed.

## Inquiry page

`contact.html` is reachable only from the call-to-action buttons, never from navigation, and
carries `<meta name="robots" content="noindex">`. It has no backend: submitting composes a
structured `mailto:` so the sender sees exactly what goes out.

**To reroute inquiries, change the form's `action`** in `contact.html`:

```html
<form id="inquiry" action="https://formsubmit.co/info@truenorth-k12.com" method="POST" novalidate>
```

The form is a real POST to FormSubmit, which forwards to that address. It works with
JavaScript disabled, because the browser submits natively. With JavaScript on, the page
intercepts, posts in the background and confirms inline without leaving the page. A hidden
`_honey` field catches the simplest bots.

WARNING: **FormSubmit needs one activation click before anything is delivered.** The first
submission sends a confirmation email to `info@truenorth-k12.com`. Until someone opens that
and clicks the link, inquiries are accepted and silently dropped. Submit the form once
yourself and clear that email before the site takes real traffic.

The address is visible in page source, which bots scrape. After activation FormSubmit issues
a random alias that can replace the address in the `action`. Worth doing.

## Images

Campus photography and the two headshots are real. The campus images were recovered from the
TNK12 project portfolio deck and are **252 x 181 native**, which is sharp at the sizes the
page uses them (244px rail thumbnails, card images) but will not survive being enlarged.
Replace them with originals when those are to hand, keeping the same filenames:

```
assets/campus-boiling-springs.jpg   Libertas Academy Boiling Springs
assets/campus-ridgeland.jpg         Polaris Tech Charter School
assets/campus-hephzibah.jpg         GA School for Innovation & Classics
assets/campus-macon.jpg             Academy for Classical Education
assets/campus-woodruff.jpg          Libertas Academy Woodruff
assets/campus-lancaster.jpg         Cogito Academy Lancaster
assets/campus-colleton.jpg          Libertas Academy Colleton
```

Three of the five leaders render as monogram discs because no usable headshot was available.
Drop a square photo at any of these paths and swap the `<div class="who__mono">` for an
`<img>` in that card:

```
assets/team-gill-walt.png           Walt Gill
assets/team-gill-cameron.png        Cameron Gill
assets/team-provenchar.png          Vicki Provenchar
```

## Editing

`index.html` is self-contained: one file, no build step, no dependencies beyond the Google
Fonts link. The canonical source is `sites/tnk12/index.html` in the `agentic-os` repo, and
the copy here is that file with `<!DOCTYPE html>` prepended.

## Deploying

```
git push origin main
git push origin main:gh-pages
```

A custom domain needs a `CNAME` file here holding the bare hostname, plus DNS at the
registrar: four apex A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`
and `185.199.111.153`, and a `www` CNAME to `powered-by-elevate.github.io`. Leave every MX,
SPF, DMARC and Microsoft record untouched.
