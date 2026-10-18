# Zenith Corp. — Official Corporate Website

A complete, polished, static corporate website for **Zenith Corp.**, a fictional Japanese technology and hardware engineering company specializing in health-monitoring hardware, wearable technology, and connected health-device engineering.

> **Context:** The website includes an official public apology statement from Zenith Corp. regarding a data breach incident involving its partner platform, Aura Health.

---

## Project Structure

```
zenith-corp/
├── index.html          Main HTML — homepage with all sections
├── style.css           Vanilla CSS — design tokens, layout, responsive
├── script.js           Vanilla JavaScript — carousel, nav, utilities
├── README.md           This file
└── assets/
    └── images/
        ├── zenith-apology-team.jpg     Hero slide 1 — corporate bow / apology visual
        ├── zenith-health-hardware.jpg  Hero slide 2 — wearable health hardware
        └── zenith-engineering.jpg     Hero slide 3 — engineering / technology
```

---

## Features

| Feature | Description |
|---|---|
| **Hero Carousel** | 3-slide auto-advancing carousel; slide 1 is always the official apology |
| **Apology Slide** | Prominent corporate apology with bowing executives photograph |
| **Official Statement** | Full formal apology text in a dedicated page section |
| **About Section** | Corporate introduction — "We Are Zenith" |
| **Products Section** | Three product/solution cards with SVG icons |
| **Technology/Values Section** | Dark navy section with four engineering values |
| **Updates Section** | Incident communications with link to official statement |
| **Contact Section** | Three contact cards with `mailto:` links |
| **Footer** | Brand wordmark, navigation links, copyright year |
| **Responsive** | Desktop, tablet, and mobile breakpoints with hamburger menu |
| **Accessible** | ARIA labels, keyboard navigation, focus styles, reduced-motion support |
| **No dependencies** | Pure HTML5 + CSS + Vanilla JS — no build tools, no npm |

---

## Previewing Locally

Because this is a pure static website with no build step, you can open it directly in your browser:

**Option A — Open directly:**
```
Double-click  zenith-corp/index.html
```

**Option B — Local development server (recommended, avoids any CORS quirks):**

If you have Python installed:
```bash
cd zenith-corp
python -m http.server 8080
```
Then open: [http://localhost:8080](http://localhost:8080)

Or with Node.js (`npx serve`):
```bash
npx serve zenith-corp
```

---

## Publishing to GitHub Pages

Follow these steps to deploy the website live:

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it (e.g., `zenith-corp`).
4. Set visibility to **Public** (required for free GitHub Pages).
5. Click **Create repository**.

### Step 2 — Push your files

```bash
cd zenith-corp
git init
git add .
git commit -m "Initial commit — Zenith Corp. website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/zenith-corp.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 3 — Enable GitHub Pages

1. In your repository on GitHub, go to **Settings**.
2. In the left sidebar, click **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set the branch to **main** and the folder to **/ (root)**.
5. Click **Save**.

### Step 4 — Access your live site

After about 1–2 minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/zenith-corp/
```

> **Note:** GitHub Pages serves files from the root of the selected branch. All asset paths in this project use relative paths (e.g., `assets/images/...`) and will work correctly under both the root URL and a repository subpath.

---

## Technology

- **HTML5** — Semantic markup with ARIA attributes
- **CSS3** — Custom properties (design tokens), Flexbox, Grid, media queries
- **Vanilla JavaScript (ES6)** — No frameworks, no dependencies, no build step
- **Google Fonts** — Inter (sans-serif), Noto Serif (statement section)

---

## Image Credits

All images sourced from [Unsplash](https://unsplash.com) under the Unsplash License (free for commercial and non-commercial use):

| File | Usage |
|---|---|
| `zenith-apology-team.jpg` | Hero Slide 1 — Corporate apology visual |
| `zenith-health-hardware.jpg` | Hero Slide 2 — Wearable health hardware |
| `zenith-engineering.jpg` | Hero Slide 3 & Technology section — Engineering environment |

---

## Disclaimer

Zenith Corp. is a **fictional company** created for educational purposes. The data breach incident described is also fictional. All contact details, company representations, and statements on this website are part of a simulated corporate scenario.
