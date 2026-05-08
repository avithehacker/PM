# PM — Avinash Singh's Portfolio

Portfolio and project pages, hosted on GitHub Pages at [avithehacker.github.io/PM](https://avithehacker.github.io/PM).

---

## Structure

```
PM/
├── index.html              # Portfolio homepage
├── projects.html           # Experiments listing (built projects)
├── drafts.html             # First Draft — work prototypes and product docs
├── style.css               # Global styles
│
├── ramanujan/              # Ramanujan project pages
│   ├── index.html          # Product page — what it does
│   ├── platform.html       # Platform page — all surfaces + downloads
│   └── install.sh          # Mac one-liner installer (handles quarantine)
│
├── e2r/                    # E2R Collections Digital Twin
├── gainsight/              # GainPulse — customer success platform (separate repo, linked)
├── avi/                    # Old pages (archived)
├── doc/                    # Documents
└── .github/workflows/      # GitHub Pages auto-deploy
```

---

## Ramanujan pages

**`ramanujan/index.html`** — The product page. Explains what Ramanujan does without mentioning models, routing, or any technical detail. "You prompt. It figures out the rest."

**`ramanujan/platform.html`** — All the surfaces: Desktop, Terminal, VS Code, API. Has download links and install instructions for each platform.

**`ramanujan/install.sh`** — Mac installer script. Downloads the DMG, installs to `/Applications`, and strips the macOS quarantine flag automatically (avoids "damaged app" error on unsigned builds).

Usage:
```bash
curl -fsSL https://avithehacker.github.io/PM/ramanujan/install.sh | bash
```

---

## Download links

All assets are hosted on [github.com/avithehacker/ai-desktop/releases](https://github.com/avithehacker/ai-desktop/releases).

| Asset | Filename |
|---|---|
| Mac desktop app | `Ramanujan-mac.dmg` |
| Windows desktop app | `Ramanujan-windows.exe` |
| Linux desktop app | `Ramanujan-1.0.0.AppImage` |
| VS Code extension | `ramanujan-1.0.0.vsix` |
| CLI — Mac | `ram-macos` |
| CLI — Windows | `ram-win.exe` |
| CLI — Linux | `ram-linux` |

---

## GitHub Pages

Deployed automatically on every push to `main`. Uses legacy Pages build (no Jekyll — `.nojekyll` present).

Live at: **avithehacker.github.io/PM**

---

## The ai-desktop repo

The actual app code lives at [github.com/avithehacker/ai-desktop](https://github.com/avithehacker/ai-desktop). That repo contains the Electron app, CLI, VS Code extension, and HTTP API. This PM repo only contains the portfolio and marketing pages.

---

## Experiments page (`projects.html`)

The Experiments page lists things built outside of work — for curiosity or to solve a real problem.

### What's listed and why

**Project Ramanujan**
An AI router that runs prompts through local models first and only calls the cloud when needed. Listed here because it's a fully working product with a desktop app, CLI, VS Code extension, and HTTP API — not just a prototype.
- Links to: `ramanujan/index.html`

**GainPulse**
A customer success platform that does what expensive enterprise tools do — health scoring, churn signals, NPS, playbooks — at a fraction of the cost. Listed here because it solves a real problem for CS teams priced out of the big platforms.
- Links to: [avithehacker.github.io/gainsight](https://avithehacker.github.io/gainsight/) (separate repo, deployed on GitHub Pages)

**E2R Collections Digital Twin**
Tracks the full lifecycle of a repossessed vehicle — from missed EMIs through repossession, yard intake, inspection, and back to auction. Moved here from First Draft because it's a complete, working dashboard, not just an early sketch.
- Links to: `e2r/index.html`

---

## Changelog

### May 8, 2026
- Added GainPulse to Experiments page with a description focused on what it does for the user, not what it's built with
- Added E2R Collections Digital Twin to Experiments page — moved out of First Draft since it's a complete working product
- Removed E2R from `drafts.html` to avoid duplication
- Updated README structure to reflect current state of the repo
