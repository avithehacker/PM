# BuyerPulse — Buyer Success Platform

**Product Type:** Internal Operations Dashboard (Prototype)  
**Built by:** Avinash Singh, Product Manager  
**Stack:** HTML · CSS · Vanilla JavaScript (no frameworks, no backend)  
**Status:** Demo / Frontend-only  

---

## Overview

BuyerPulse is an auction operations dashboard designed for buyer success teams managing large portfolios of dealers and bidders in vehicle auction platforms (e.g., Mahindra First Choice, Shriram Automall). It consolidates buyer health monitoring, risk management, follow-up task tracking, analytics, and AI-generated summaries into a single, unified interface.

The platform is a **frontend prototype** built entirely in plain HTML/CSS/JavaScript with mock data — intended to communicate product vision, interaction design, and feature set without requiring a backend or infrastructure.

---

## Problem Statement

Auction operations teams managing hundreds of active dealer-buyers face several compounding problems:

1. **Fragmented data** — buyer health, EMD balances, bid history, and follow-up tasks live in separate tools (CRM, spreadsheets, auction software).
2. **Reactive risk management** — teams only identify at-risk buyers after defaults or no-shows, not before.
3. **Manual follow-up tracking** — call logs and task assignments managed via email threads or shared sheets.
4. **No unified visibility** — managers lack a live portfolio view to understand where attention is needed right now.

BuyerPulse solves this by bringing all buyer signals into one operational dashboard with proactive health scoring, risk alerting, and an AI summary layer.

---

## Key Features

### 1. Dashboard
The home view gives an immediate operational snapshot:
- **Welcome banner** — personalised greeting with live date and "Live Operations" status tag.
- **KPI stat cards** — four key metrics with directional deltas:
  - Active Buyers (142, ▲ 8 this week)
  - Average Health Score (71/100, ▼ 3 pts)
  - EMD at Risk (₹4.2L, ▲ from last week)
  - Auctions Today (47 live lots)
- **Portfolio Health card** — health bar showing 71% of buyers in the healthy band; 12 below threshold.
- **Today's Auctions card** — 47 live lots, peak bidding window 2–5 PM, 3 flagged for manual intervention.
- **Pending Follow Ups card** — 5 tasks due today, 2 overdue from yesterday.
- **Quick Actions** — one-click buttons: Add Buyer, Log Activity, Schedule Call, Review Risk, View Auctions, Run Report.

---

### 2. Buyers
Full paginated buyer roster with live filtering:

| Column | Description |
|---|---|
| Buyer Name | Dealer/company name + city |
| Status | Active / Inactive / Watchlist / Suspended |
| Health Score | 0–100 with colour-coded badge |
| EMD Balance | Earnest Money Deposit in ₹ |
| Last Active | Relative time (e.g., "Today", "3 days ago") |
| Risk Level | Low / Medium / High / Critical |

**Toolbar features:**
- Live search by name or city (debounced)
- Risk filter pills (All / Low / Medium / High / Critical)
- Results summary bar ("Showing 5 of 25 buyers")
- Clear-filters button on empty state

**Buyer Detail Drawer** — clicking any row opens a slide-in drawer with five tabs:

| Tab | Content |
|---|---|
| Details | Email, phone, account manager, member since, total bids, win rate |
| Activity | Chronological bidding history — lot number, auction name, bid amount, result |
| Follow Ups | Timeline of calls, emails, meetings, and notes |
| Payments | Invoice table — invoice ID, amount, due date, status (Paid / Pending / Overdue) |
| Notes | Free-text account notes with author and date |

**25 mock buyers** — all authentic Indian automotive dealers across 20+ cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Ahmedabad, Jaipur, Surat, Lucknow, Nagpur, Indore, Bhopal, Patna, Vadodara, Bhubaneswar, Chandigarh, Coimbatore, Kochi, Guwahati, Visakhapatnam, Rajkot, Mysore, Dehradun).

Sample buyers:
- Shriram Automall India (Mumbai) — Score 88, EMD ₹2.5L, Low risk
- Agarwal Auto Traders (Bhopal) — Score 93, EMD ₹5L, Low risk
- Kerala Auto Exchange (Kochi) — Score 89, EMD ₹4.5L, Low risk
- Patel Motors & Auctions (Vadodara) — Score 22, EMD ₹0, Critical risk, Suspended
- Priya Logistics Pvt. (Kolkata) — Score 38, EMD ₹25K, Critical risk, Watchlist

---

### 3. Health Scores
Portfolio-wide health scoring view:
- **Summary stat cards** — Healthy (75+), Warning (50–74), Risky (<50), Average score.
- **Score Distribution bars** — bucketed histogram across score ranges.
- **Portfolio Snapshot** — at-a-glance breakdown of buyer status mix.
- **Individual Health Cards** — one card per buyer with:
  - Score gauge (colour-coded arc)
  - Status badge and risk badge
  - EMD balance
  - Last active date
- **Filter row** — filter cards by health band (All / Healthy / Warning / Risky).

---

### 4. Risk Center
Triage view for flagged buyers requiring immediate action:
- **Summary cards** — count of Critical, High, and Medium risk buyers; total EMD at risk (₹).
- **Risk filter row** — filter the feed by severity.
- **Risk feed** — individual risk cards showing:
  - Buyer name, city, risk level badge
  - Health score and EMD
  - Risk reason (e.g., "3 consecutive auction no-shows", "EMD balance below threshold", "KYC expired")
  - Status badge
  - Action buttons: Contact, Suspend, Resolve
- **Resolve All Critical** — bulk-resolve button in the page header.

---

### 5. Follow Ups
Kanban board for managing buyer follow-up tasks:
- **Columns:** To Do → In Progress → Done
- **Task cards** — each card shows:
  - Task type (Call / Email / Meeting / Note) with icon
  - Buyer name
  - Priority badge (Urgent / High / Normal / Low)
  - Due date (colour-coded: overdue = red, due today = amber)
  - Assigned team member
  - Notes / description
  - Mark-done / move-column action
- **Stats bar** — total tasks, due today, overdue, completed count.
- **Add Follow Up modal** — form with fields: Buyer (dropdown), Task Type, Priority, Assign To, Due Date, Notes.

---

### 6. Notifications
System alert centre with unread badge on the sidebar and bell icon:
- **Page tabs** — All / Unread / Alerts / Updates.
- **Notification types:**
  - EMD top-up reminders
  - Outbid alerts
  - Payment overdue warnings
  - Auction closing alerts
  - Account status changes
- **Bell dropdown** — quick preview of latest 4–5 notifications without leaving the current page.
- **Mark all read** button.

---

### 7. Analytics
Data visualisation layer for operational reporting:

**KPI Cards (top row):**
- Total Bids This Month
- Win Rate
- Revenue (auction GMV)
- Avg Health Score trend

**Charts (pure CSS/SVG, no charting library):**
- **Portfolio Health Trend** — line chart, avg health score over last 30 days.
- **Risk Distribution** — donut/segment chart, buyers by risk level.
- **Auction Activity** — bar chart, bids placed per period.
- **Top Buyers table** — ranked by bidding activity with win rate and EMD columns.

**Date filter** — 7D / 30D / 90D switcher that updates chart labels and values.

---

### 8. AI Insights
AI-generated operational summaries with a typing animation effect:

- **Generate Summary button** — triggers a 1.8s "thinking" overlay (animated dots) then renders summary cards.
- **Thinking overlay** — pulsing dot animation with "Analyzing portfolio data…" label.
- **Summary cards** (6 categories):

| Card | Summary Topic |
|---|---|
| Portfolio Health | Overall health trend, declining buyers, recommended actions |
| Risk Alerts | Critical buyers, EMD exposure, escalation recommendations |
| EMD Intelligence | Top depositors, at-risk balances, suggested nudges |
| Auction Performance | Win rates, high-activity buyers, bid coaching opportunities |
| Engagement Insights | Inactive buyers, follow-up backlog, outreach recommendations |
| Weekly Forecast | Predicted auction activity, expected risk movements |

- **Typing animation** — each card's text types out character by character with natural rhythm (punctuation pauses, variable speed).
- **Expand/collapse** — each card has a toggle to show full detail or collapse to summary.
- **Variant rotation** — 3 summary variants rotate on each generation for demo freshness.
- **Meta bar** — shows "Last generated: [timestamp] · 6 insights across 25 buyers".

---

## UI / Design System

### Layout
- **Fixed sidebar** (240px) + **scrollable main content** area.
- **Glassmorphic top navbar** — `backdrop-filter: blur(12px)` with sticky positioning.
- **Responsive** — sidebar collapses to hamburger on mobile; layout reflows to single column.

### Colour System (Light Mode)
| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#4F63E8` | Buttons, active states, links |
| `--bg-base` | `#EEF0FA` | Page background |
| `--bg-surface` | `#FFFFFF` | Cards, drawers, modals |
| `--bg-elevated` | `#F4F5FC` | Table headers, secondary panels |
| `--text-primary` | `#0F172A` | Headings, body copy |
| `--text-secondary` | `#475569` | Labels, sub-text |
| `--text-muted` | `#94A3B8` | Placeholders, timestamps |
| `--color-success` | `#16A34A` | Healthy scores, positive deltas |
| `--color-danger` | `#DC2626` | Critical risk, overdue, danger |
| `--color-warning` | Amber | Medium risk, due-soon dates |

### Typography
- **Headings:** Inter 500/600
- **Body:** Inter 300/400
- **Page titles:** 1.5–1.8rem
- **Labels / meta:** 0.7–0.8rem, letter-spacing 0.08–0.2em, uppercase

### Interactive Patterns
- **Ripple effect** — pointer-down wave animation on all interactive surfaces (buttons, nav items, filter pills).
- **Hover lift** — `box-shadow` transition on cards and stat tiles.
- **Smooth page transitions** — `opacity` + `translateY` fade-in on page switch.
- **Drawer slide-in** — right-to-left slide with overlay backdrop.
- **Micro-interactions** — badge count update, tab switch, kanban card drag highlight.
- **AI cursor blink** — blinking cursor during typing animation.

---

## Data Model (Mock)

### Buyer Object
```
{
  id:         number,
  name:       string,       // Dealer name
  city:       string,       // Indian city
  status:     'Active' | 'Inactive' | 'Watchlist' | 'Suspended',
  score:      number,       // 0–100 health score
  emd:        number,       // EMD balance in ₹
  lastActive: 'YYYY-MM-DD',
  risk:       'Low' | 'Medium' | 'High' | 'Critical'
}
```

### Extended Buyer Data (generated deterministically from ID)
- **Contact:** email, phone (+91), account manager, member since date
- **Bids:** lot number, auction name, bid amount (₹), date, result (Won/Lost/Outbid/Withdrawn)
- **Follow Ups:** type, description, assigned manager, date
- **Payments:** invoice ID, amount, due date, status
- **Notes:** text, author, date

All extended data is generated deterministically from the buyer's ID — no randomness on each render — so the drawer always shows consistent data for the same buyer.

---

## File Structure

```
buyer-success-platform/
├── index.html      # All page sections, drawer, modal markup
├── style.css       # Full design system — ~2,900 lines
├── script.js       # All logic, mock data, renderers — ~2,770 lines
└── BUYERPULSE.md   # This document
```

### script.js Architecture
| Section | Responsibility |
|---|---|
| `MOCK_BUYERS` | 25 buyer records |
| `getBuyerExtended()` | Derives drawer content from buyer ID |
| `openDrawer()` / `closeDrawer()` | Slide-in drawer lifecycle |
| `renderDetailsTab()` etc. | Five drawer tab renderers |
| `initBuyersPage()` | Table render, search, filter, pagination |
| `initHealthPage()` | Health score cards and distribution |
| `initRiskPage()` | Risk feed with filter and resolve actions |
| `initFollowUps()` | Kanban board and Add Follow Up modal |
| `initNotifications()` | Bell dropdown and full notification page |
| `initAnalytics()` | KPI cards and SVG charts |
| `generateAISummaries()` | Typing animation, card rendering |
| `initRipple()` | Global pointer-down ripple effect |
| `renderStats()` | Dashboard KPI stat cards |

---

## Design Decisions

**No framework** — The prototype is deliberately built in plain HTML/CSS/JS to keep it lightweight, instantly deployable to GitHub Pages, and shareable without a build step.

**Deterministic mock data** — All extended buyer data derives from `buyer.id` via modular arithmetic, so the same buyer always shows the same history. No `Math.random()` in data generation.

**CSS variables for theming** — All colours, shadows, and spacing live in `:root` variables, enabling a full light/dark mode toggle with a single class swap.

**AI as UX metaphor** — The AI Insights page is not connected to any LLM. The typing animation + thinking overlay creates the *feel* of AI reasoning to communicate the intended product experience in demos.

**Ripple in CSS** — The click ripple effect is achieved via a dynamically appended `<span>` with a CSS `@keyframes` animation, avoiding any animation library dependency. `overflow: hidden` lives in CSS (not inline JS) to prevent permanent style mutation side effects.

---

## Deployment

Published on GitHub Pages via the `avithehacker/PM` repository.  
Listed in `drafts.html` under the **First Draft** prototypes section.

**Live URL:** `https://avithehacker.github.io/PM/buyer-success-platform/`

---

*BuyerPulse — Avinash Singh · 2026*
