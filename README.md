# Voices in Science

An open archive of women scientists from the Global South — Africa, Asia, Latin America, and the Middle East — whose contributions have been overlooked, minimized, or erased from the historical record.

Built as a final project for HP 316 (Exploring Women's and Gender Studies). Inspired by Audre Lorde's *The Transformation of Silence into Language*, Jean Kilbourne's *She Was Here*, and Rebecca Solnit's *City of Women* map project.

---

## How to host this on GitHub Pages

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and create a free account if you don't have one.

### Step 2 — Create a new repository
1. Click the **+** icon in the top right corner of GitHub and select **New repository**.
2. Name it something like `voices-in-science` (lowercase, hyphens, no spaces).
3. Set it to **Public**.
4. Do **not** add a README, .gitignore, or license (you already have files to upload).
5. Click **Create repository**.

### Step 3 — Upload all the files
1. On the new empty repository page, click **uploading an existing file**.
2. Drag and drop **all** the files and folders from this download into the upload area:
   - `index.html`
   - `style.css`
   - `script.js`
   - `data/` folder (with `profiles.json` inside)
   - `.nojekyll` (this is important — it tells GitHub not to process the site as a blog)
   - `README.md` (this file, so visitors can see what the project is)
3. Scroll down and click **Commit changes**.

### Step 4 — Turn on GitHub Pages
1. Go to your repository's **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Source**, select the **main** branch and the **/ (root)** folder.
4. Click **Save**.
5. Wait one or two minutes. GitHub will publish your site at:
   `https://prashantsah2061.github.io/voices-in-science/`

### Step 5 — Update the nomination link
Open `script.js` in your repository (you can edit directly on GitHub by clicking the pencil icon).

Find these three lines near the top:

```js
const GITHUB_USER = "prashantsah2061";
const GITHUB_REPO = "voices-in-science";
const NOMINATION_EMAIL = "your-email@example.com";
```

Replace them with your actual GitHub username, your repo name, and your email address. Save (commit) the change. The "Submit a nomination" button will now open a pre-filled GitHub issue on your repo.

That's it. The site is live.

---

## How to add a new profile to the archive

When someone submits a nomination through the "Submit a nomination" button, it appears as an issue on your GitHub repo. You can review it, ask questions, or close it if it doesn't fit.

To **add an approved nomination to the live site**:

1. Open `data/profiles.json` in your repo.
2. Click the pencil icon to edit.
3. Add a new entry to the `profiles` array. Follow the existing format. Example:

```json
{
  "id": "lastname",
  "name": "Full Name",
  "honorific": "Dr.",
  "country": "Country",
  "flag": "🇨🇴",
  "region": "Africa | Asia | Latin America | Middle East",
  "field": "Field of study",
  "born": "1950",
  "died": null,
  "hook": "A short one-sentence tagline.",
  "bio": [
    "First paragraph of biography.",
    "Second paragraph of biography."
  ],
  "obstacles": "Description of the gender, racial, colonial, or class barriers she faced.",
  "achievements": [
    "Achievement one",
    "Achievement two"
  ],
  "sources": [
    { "title": "Source title", "url": "https://example.com" }
  ]
}
```

4. Make sure the JSON is valid (commas in the right places). If you're not sure, paste it into [jsonlint.com](https://jsonlint.com) before committing.
5. Commit the change. The site updates within a minute or two.

---

## How to edit or remove a profile

Same process — open `data/profiles.json`, find the profile, edit or delete it, commit. Done.

---

## File structure

```
voices-in-science/
├── index.html              The main page
├── style.css               All the styles
├── script.js               Loads profiles, search, filter, nomination
├── data/
│   └── profiles.json       The archive — edit this to add new profiles
├── .nojekyll               Tells GitHub Pages to serve the site as-is
└── README.md               This file
```

---

## Optional: switch nominations to Google Forms

If you'd prefer that nominations come through a Google Form (so users don't need a GitHub account), here's how:

1. Create a [Google Form](https://forms.google.com) with the questions you want to ask.
2. Open `script.js` and find the `buildGitHubURL` function.
3. Replace its return line with the URL of your Google Form, e.g. `return "https://forms.gle/abc123";`
4. Commit and you're done.

---

## Credits

- **Type:** Fraunces (Undercase Type), Crimson Pro (Sebastian Kosch), DM Mono (Colophon Foundry) — all open-source.
- **Inspiration:** Audre Lorde, *Sister Outsider* · Jean Kilbourne, *She Was Here* · Rebecca Solnit & Joshua Jelly-Schapiro, *Nonstop Metropolis: A New York City Atlas* · Alice Wong, *Disability Visibility*.
- **Built with:** vanilla HTML, CSS, JavaScript. No frameworks, no build tools, no dependencies.

---

*The history of women in science is not a history of absence. It is a history of erasure. This archive is one small attempt to undo it.*
