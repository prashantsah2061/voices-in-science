# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Voices in Science is a static single-page archive of overlooked women scientists from the Global South. It is plain HTML/CSS/JavaScript — no frameworks, no build tools, no package manager, no dependencies. It is deployed via GitHub Pages.

## Local development

Because `script.js` uses `fetch()` to load `data/profiles.json`, the site must be served over HTTP — opening `index.html` directly as a `file://` URL will fail with a CORS error. Use any local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

There is no build step, no lint command, and no test suite.

## Architecture

All logic lives in three files:

- **`data/profiles.json`** — the entire archive. The only file that needs to change when adding, editing, or removing profiles.
- **`script.js`** — fetches `profiles.json` on `DOMContentLoaded`, stores profiles in a module-level `state` object, and re-renders the grid on every filter/search change. Also builds the GitHub issue URL and email fallback for nominations.
- **`index.html`** — static shell. The `#profileGrid` div is empty on load; `script.js` populates it. The modal (`#profileModal`) is always in the DOM, shown/hidden via the `hidden` attribute.

Data flow: `loadProfiles()` → `state.profiles` → `render()` → `cardHTML()` per profile → click → `openModal(id)` → inline modal HTML.

### Config constants (top of `script.js`)

```js
const GITHUB_USER = "prashantsah2061";
const GITHUB_REPO = "voices-in-science";
const NOMINATION_EMAIL = "prashantsah2061@gmail.com";
```

These control the GitHub issue nomination URL and the email fallback. Update them if the repo is forked or transferred.

## Profile schema (`data/profiles.json`)

Each entry in the `profiles` array:

| Field | Type | Notes |
|---|---|---|
| `id` | string | URL-safe, lowercase, used as `data-id` on cards |
| `name` | string | Full name |
| `honorific` | string | `"Dr."`, `"Prof."`, or `""` |
| `country` | string | |
| `flag` | string | Emoji flag |
| `region` | string | Must be exactly `"Africa"`, `"Asia"`, `"Latin America"`, or `"Middle East"` — controls the filter chips |
| `field` | string | Scientific discipline |
| `born` | string | Year as string |
| `died` | string \| null | Year as string, or `null` if living |
| `hook` | string | One-sentence tagline shown on the card |
| `bio` | string[] | Array of paragraph strings |
| `obstacles` | string | Single paragraph |
| `achievements` | string[] | Bullet list |
| `sources` | `{title, url}[]` | At least one required; rendered as links in the modal |
| `image` | `{url, credit}` | Optional. Only use freely licensed images (CC or Public Domain). `url` should be a direct `upload.wikimedia.org` link; `credit` is the attribution string shown under the portrait (e.g. `"Wikimedia Commons · CC BY-SA 2.0"`). |

Profiles without an `image` field show a styled placeholder with the person's initials on the card.

## Deployment

The site is hosted at `https://prashantsah2061.github.io/voices-in-science/`. The `.nojekyll` file in the root tells GitHub Pages to serve the files as-is rather than processing them through Jekyll. Commits to `main` deploy automatically within a minute or two.
