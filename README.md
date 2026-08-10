# PM — Avinash Singh's Portfolio

Portfolio and project pages, hosted on GitHub Pages at [avithehacker.github.io/PM](https://avithehacker.github.io/PM).

---

## Structure

```
PM/
├── index.html              # Portfolio homepage
├── projects.html           # Experiments listing (built projects)
├── drafts.html             # First Draft — work prototypes and product docs
├── whatif.html             # What If — listing page, free-form space for imagination
├── whatif/                 # Individual "What If" entries, one page each
│   ├── jan-sloot.html      # What if Jan Sloot had lived to sign that contract?
│   └── blackberry-shantiniketan.html  # The Smoking Zone at Shantiniketan — what if BlackBerry had never closed?
├── style.css               # Global styles
│
├── auto-bid/               # Hammerly Smart Auto Bidding prototype
├── bulk-bid/               # Hammerly Bulk Bid prototype
├── swipe-bid/              # Hammerly Swipe Bid prototype
├── swipe-bid-new/          # Hammerly Swipe Bid v2 prototype
├── hammerly/               # Hammerly hub pages (auto-bid.html, swipe-bid.html)
│
├── ramanujan/              # Ramanujan project pages
│   ├── index.html          # Product page — what it does
│   ├── platform.html       # Platform page — all surfaces + downloads
│   └── install.sh          # Mac one-liner installer (handles quarantine)
│
├── e2r/                    # E2R Collections Digital Twin
├── gainsight/              # GainPulse — customer success platform (separate repo, linked)
├── avi/                    # Old pages (archived)
├── doc/                    # Documents (PRDs for auto-bid, bulk-bid)
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

## What If page (`whatif.html` + `whatif/`)

A space for imagination, unconstrained — no rules, no roadmap, no obligation to stay on the topic of tech or product. Just wherever a thought wants to go. Linked from the homepage in its own section, right after Experiments.

Structured like Experiments/First Draft: `whatif.html` is a listing page, and each entry gets its own file under `whatif/` so new pieces can keep being added without the listing page growing unbounded.

Current entries:
- **What if Jan Sloot had lived to sign that contract?** (`whatif/jan-sloot.html`) — built around the real, unsolved mystery of the Dutch engineer who claimed he could compress a movie into 8KB and died the night before signing the deal. Imagines a world where his compression discipline spread everywhere: local AI, lag-free internet, decades-long device lifespans, lower data-center water/energy draw, closing digital divides, and more. Closes with a short note owning the poetic license taken with the physics.
- **The Smoking Zone at Shantiniketan** (`whatif/blackberry-shantiniketan.html`) — what if BlackBerry had never closed? A story following a product manager in Bengaluru who runs a five-city work meeting from an office smoking zone using a BlackBerry that still exists in 2026, then contrasts it against how differently his personal Android phone's attention-driven design treats his evening.

---

## Changelog

### August 10, 2026
- Added second "What If" entry, "The Smoking Zone at Shantiniketan" — a story imagining BlackBerry never having closed, written in full by Avinash and published as-is under `whatif/blackberry-shantiniketan.html`

### August 9, 2026
- Added `whatif.html` — new "What If" page for speculative/creative what-if scenarios, linked from a new homepage section placed right after Experiments
- Wrote the first "What If" entry, "What if Jan Sloot had lived to sign that contract?" — an alternate history built around Jan Sloot's lost 1999 compression breakthrough
- Restructured `whatif.html` into a listing page + `whatif/` folder of individual entry pages (same pattern as Experiments/First Draft), so future entries each get their own page
- Added a closing note to the Sloot entry clarifying that whether his technology ever actually worked has never been proven either way

### June 19, 2026
- Fixed blank page on `auto-bid/`, `swipe-bid/`, `swipe-bid-new/`, `hammerly/auto-bid.html`, `hammerly/swipe-bid.html` — pinned `@babel/standalone` to `7.17.12` (latest unpinned version switched to automatic JSX runtime, incompatible with CDN-global React)
- Fixed stale closure bug in `auto-bid/index.html` — closed-auction auto-bid decisions now made inside functional state updater to avoid incorrect pool exhaustion checks and wrong bid amounts on rapid rival bids

### May 24, 2026
- Overhauled `e2r/index.html` — CSS variables, Bootstrap Icons, readable markup, responsive layout
- Added PayCollect as 6 submodules under the Payments module in E2R — Pay Dashboard, Upload Auction Data, Payment Tracker, Buyer Notifications, Vehicle-wise View, Reports & Analytics
- Added `e2r/E2R.md` — full product documentation, data schema, module breakdown, architecture guide
- Added PayCollect to First Draft portfolio page (`drafts.html`)

### May 8, 2026
- Added GainPulse to Experiments page with a description focused on what it does for the user, not what it's built with
- Added E2R Collections Digital Twin to Experiments page — moved out of First Draft since it's a complete working product
- Removed E2R from `drafts.html` to avoid duplication
- Updated README structure to reflect current state of the repo
