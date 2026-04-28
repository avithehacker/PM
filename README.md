# PM — Avinash Singh's Portfolio

Portfolio and project pages, hosted on GitHub Pages at [avithehacker.github.io/PM](https://avithehacker.github.io/PM).

---

## Structure

```
PM/
├── index.html              # Portfolio homepage
├── projects.html           # Projects listing
├── style.css               # Global styles
│
├── ramanujan/              # Ramanujan project pages
│   ├── index.html          # Product page — what it does
│   ├── platform.html       # Platform page — all surfaces + downloads
│   └── install.sh          # Mac one-liner installer (handles quarantine)
│
├── avi/                    # Old pages (archived)
├── doc/                    # Documents
├── drafts.html             # Work in progress
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
