# Auctimeter 2.0 — E2R Collections Digital Twin
### Product Documentation & Architecture Guide
**Version:** 2.0 | **Author:** Avinash Singh | **Last Updated:** 24-May-2026

---

## Table of Contents
1. [What is E2R](#1-what-is-e2r)
2. [Problem it Solves](#2-problem-it-solves)
3. [Who Uses It](#3-who-uses-it)
4. [Product Architecture](#4-product-architecture)
5. [Module Breakdown](#5-module-breakdown)
   - 5.1 Dashboard
   - 5.2 EMI Tracking
   - 5.3 Repo Decision Evaluator
   - 5.4 Repossession Seizure Orders
   - 5.5 Yard Management
   - 5.6 Inspection Management
   - 5.7 Auction Management
   - 5.8 Payments (with 6 PayCollect submodules)
   - 5.9 Vehicle Release & Handover
6. [PayCollect Submodules (Payments)](#6-paycollect-submodules-payments)
7. [Design System](#7-design-system)
8. [Data Schema](#8-data-schema)
9. [Navigation & Routing](#9-navigation--routing)
10. [KPIs & Metrics](#10-kpis--metrics)
11. [Future Roadmap](#11-future-roadmap)

---

## 1. What is E2R

**E2R** stands for **EMI-to-Release** — the full lifecycle of a non-performing vehicle loan from the first missed payment through repossession, yard storage, inspection, auction, payment collection, and finally vehicle handover to the winning buyer.

**Auctimeter 2.0** is the digital twin of this lifecycle — a single-page web application that gives the Collections & Asset Recovery team a real-time operational dashboard for every vehicle in their portfolio.

**Core loop:**
```
Borrower misses EMI → System flags default → Decision to repo →
Seizure order issued → Vehicle goes to yard → Inspection done →
Vehicle listed for auction → Buyer wins → Payment collected →
RC transferred → Vehicle released
```

Every step of this loop is tracked, actioned, and audited inside Auctimeter 2.0.

---

## 2. Problem it Solves

| Pain Point | Before E2R | After E2R |
|---|---|---|
| Tracking repossessed vehicles | Excel sheets, WhatsApp updates from field | Single live dashboard — one row per vehicle |
| Repo decision | RM judgment call, no data | Automated scoring — outstanding, EMIs missed, asset value, legal status |
| Yard visibility | Calls to yard manager | Live slot allocation, condition, days in yard |
| Inspection reports | Paper form, scanned PDF | Digital grading with estimated auction value |
| Auction scheduling | Manual coordination with Bidkaro/eDiig/CarTrade | Managed from tool — platform, reserve price, timeline |
| Payment collection | Basic spreadsheet | Full PayCollect suite — 30-col tracker, notifications, reports |
| Release & RC transfer | Physical paperwork, no tracking | Digital NOC issuance, RC status, handover confirmation |

**Key insight:** The average vehicle sits in the repo-to-release cycle for 60–90 days. E2R reduces this to under 45 days by eliminating information gaps between teams.

---

## 3. Who Uses It

| Role | What They Do in E2R |
|---|---|
| **Collections RM** | Primary user. Tracks EMI defaults, raises repo orders, updates payment status |
| **Field Recovery Agent** | Updates seizure status; confirms vehicle pickup |
| **Yard Manager** | Manages slot allocation, vehicle condition, inspection scheduling |
| **Auction Coordinator** | Lists vehicles, sets reserve prices, records hammer prices |
| **Recovery Head / Branch Manager** | Monitors dashboard KPIs, approves repo decisions |
| **Finance / MIS Team** | Pulls Reports & Analytics — auction value, collection rates, platform performance |
| **Winning Buyer (Indirect)** | Receives WhatsApp/SMS payment demand; does not log in |

---

## 4. Product Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Auctimeter 2.0 — E2R SPA                     │
│                                                                  │
│  ┌───────────────┐  ┌────────────────┐  ┌──────────────────────┐│
│  │   Sidebar     │  │    Header      │  │   Page Container     ││
│  │  (9 modules + │  │ (title, date,  │  │   (one page active   ││
│  │   6 sub-mods) │  │  alert badge)  │  │    at a time)        ││
│  └───────────────┘  └────────────────┘  └──────────────────────┘│
│                                                                  │
│  Main Modules:                                                   │
│  1. Dashboard         6. Inspection                              │
│  2. EMI Tracking      7. Auction                                 │
│  3. Repo Decision     8. Payments ──► 6 PayCollect submodules    │
│  4. Repossession      9. Vehicle Release                         │
│  5. Yard Management                                              │
│                                                                  │
│  PayCollect Submodules (under Payments):                         │
│  8.1 Pay Dashboard       8.4 Buyer Notifications                 │
│  8.2 Upload Auction Data 8.5 Vehicle-wise View                   │
│  8.3 Payment Tracker     8.6 Reports & Analytics                 │
│                                                                  │
│  Shared Infrastructure:                                          │
│  - Modal system (sM / cM)    - Toast engine                      │
│  - Chart renderer (Chart.js) - Excel import/export (SheetJS)     │
└──────────────────────────────────────────────────────────────────┘

External Dependencies (CDN, no backend):
├── Bootstrap Icons 1.11.3   (icons)
├── Chart.js 4.4.0           (charts)
└── SheetJS / xlsx           (Excel read/write)
```

**Single-file SPA.** No build step, no server, no database. All data is in-memory JS arrays. Opens directly in browser from `index.html`.

---

## 5. Module Breakdown

### 5.1 Dashboard

The main overview screen. Renders on load.

**KPI cards:**
- Total Vehicles in Portfolio
- EMI Defaults (active)
- In Repossession
- In Yard / Inspection
- Auctions Active
- Critical Defaults count (drives header badge)

**Charts:**
- Pipeline funnel — vehicles at each lifecycle stage
- Recovery rate — auctions closed vs outstanding vs released

**Activity feed:** Latest 5 events across all vehicles

**Quick actions:** Jump to any vehicle's current stage

---

### 5.2 EMI Tracking

Tracks all borrowers and their loan repayment status.

**Data:** `L[]` array — one record per loan (linked to vehicle via `vi` field)

| Column | Description |
|---|---|
| Borrower Name | Loan holder |
| Contact | Mobile number |
| Loan Amount | Original disbursement |
| Outstanding | Current balance |
| Missed EMIs | Count of defaults |
| EMI Amount | Monthly instalment |
| Legal Status | Clean / Notice Sent / Court Case Filed |

**Actions:**
- View borrower profile
- Log a payment received
- Escalate to repo decision

---

### 5.3 Repo Decision Evaluator

Automated scoring to decide whether to initiate repossession.

**Inputs:** Outstanding balance, missed EMIs, asset estimated value, legal status, location

**Output:** Repo Recommended (green) / Not Recommended (red) with reasoning

**Score factors:**
- Missed EMIs ≥ 3 → strong signal
- Outstanding > 60% of asset value → proceed
- Legal notice already sent → accelerate
- Asset in good condition → worth recovering

**Action:** "Raise Repo Order" button — creates a Repossession Order record in `RO[]`

---

### 5.4 Repossession Seizure Orders

Manages field operations — assigning recovery vendors, tracking seizure progress.

**Data:** `RO[]` array

| Field | Values |
|---|---|
| Vendor | Swift Repo Pvt Ltd / FastGrab Solutions / RecoverX India |
| Assignment Date | When order was raised |
| SLA Days | Target days to seize |
| Status | Pending / In Progress / Delivered |
| Physical Uplift | Confirmed or not |

**Actions:**
- Assign vendor
- Mark as seized (moves vehicle to Yard)
- View seizure details

---

### 5.5 Yard Management

Tracks all repossessed vehicles in physical storage.

**Data:** `Y[]` array — linked to vehicle via `vi`

| Field | Description |
|---|---|
| Yard Location | Named yard (Mumbai Central, Delhi North, etc.) |
| Entry Date | When vehicle arrived at yard |
| Slot | Physical slot identifier (A-12, B-04, etc.) |
| Condition | Good / Fair / Poor |
| Days in Yard | Auto-calculated from entry date |

**KPIs shown:** Total vehicles in yard, average days, vehicles by condition

**Actions:**
- Update condition
- Schedule inspection
- View slot map

---

### 5.6 Inspection Management

Records vehicle assessment before auction listing.

**Data:** `INS[]` array

| Field | Values |
|---|---|
| Inspector / Vendor | AutoCheck India / VehicleScan Pro |
| Inspection Date | Calendar date |
| Grade | A / B / C (A = best) |
| Estimated Value | Appraised auction value in INR |
| QC Status | Approved / Pending / Rejected |
| Photos | Count of inspection photos |

**Actions:**
- Record new inspection
- Approve / reject inspection report
- View inspection details — links to auction page

---

### 5.7 Auction Management

Lists vehicles for auction and records results.

**Data:** `AU[]` array

| Field | Values |
|---|---|
| Reserve Price | Minimum acceptable bid (from inspection estimate) |
| Current Best Bid | Highest bid received |
| Bid Count | Number of bids placed |
| Start / End Date | Auction window |
| Status | Active / Closed - Awaiting Payment / Closed |
| Platform | Internal + BidCar / CarDekho / Bidkaro / eDiig |

**Actions:**
- Create auction listing (modal with reserve price, platform, timeline)
- Close auction — generates payment demand in `PAY[]`
- View bid history

**Trigger:** Closing an auction auto-creates a payment record and surfaces it in the Payments module.

---

### 5.8 Payments (with PayCollect Submodules)

The Payments module is a **parent module** in the sidebar. Clicking it expands 6 submodules — a full port of the PayCollect product into E2R.

See [Section 6](#6-paycollect-submodules-payments) for full breakdown.

**Data sources:**
- `PAY[]` — basic E2R auction-to-payment records (original)
- `DEMANDS[]` — full 24-record PayCollect dataset (new, replaces/extends PAY)

---

### 5.9 Vehicle Release & Handover

Final stage — closes the loop after full payment.

**Data:** `REL[]` array

| Field | Values |
|---|---|
| Authorized Buyer | Winning bidder from auction |
| Final Hammer Price | Confirmed auction amount |
| Escrow Payment | Complete / Not Started |
| NOC Certificate | Complete / In Progress / Not Started |
| RC Transfer | Complete / In Progress / Not Started |
| Physical Handover | Complete / In Progress / Not Started |

**Actions:**
- Issue Release Order (generates NOC, sets handover to In Progress)
- Confirm Physical Handover (modal — operator name + date)
- Download Release Dossier (all documents packaged)

---

## 6. PayCollect Submodules (Payments)

The Payments module expands into 6 submodules in the sidebar. These are a full port of the standalone PayCollect product.

```
Payments (parent)
├── Pay Dashboard
├── Upload Auction Data
├── Payment Tracker
├── Buyer Notifications
├── Vehicle-wise View
└── Reports & Analytics
```

### 6.1 Pay Dashboard

**KPI cards (5):**
- Total Vehicles: 24
- Total Auction Value: ₹1.39 Cr
- Collected: ₹44.3L (31.9% collection rate)
- Outstanding: ₹81.2L
- Overdue: ₹54.2L — 12 vehicles past due date

**Charts:**
- Doughnut: Status distribution (Paid / Pending / Overdue / Partial)
- Bar: Collections by platform (Bidkaro, eDiig, CarTrade, CarDekho)

**Tables:**
- Overdue accounts — immediate action required (Collect / Remind buttons)
- Platform performance summary

**Activity feed:** 5 recent collection events

---

### 6.2 Upload Auction Data

4-step stepper workflow:

| Step | Action |
|---|---|
| 1. Download Template | Generates `.xlsx` with all 22 required column headers |
| 2. Upload File | Drag-drop or browse — accepts `.xlsx`, `.csv` |
| 3. Review Data | Preview first 5 rows before confirming |
| 4. Notify Buyers | Auto-generates payment demands, sends WhatsApp + SMS |

**Column reference:** 19 required columns displayed as colour-coded tags

**Notification preview:** Shows sample WhatsApp message with buyer name, vehicle, balance, due date, bank account details

---

### 6.3 Payment Tracker

Full 30-column tracker table for all 24 auction demands.

**Filters:** All (24) / Pending (3) / Overdue (12) / Partial (2) / Paid (7)

**Search:** Across registration, buyer name, company, chassis, make, model, auction ID

**Export:** One-click Excel export via SheetJS

**Per-row actions:**
- `Collect` — opens Record Payment modal (amount, mode, UTR, date, remarks)
- `Details` — full vehicle + payment details modal
- `Remind` — send WhatsApp/SMS reminder modal

---

### 6.4 Buyer Notifications

**Notification log:** All 24 buyers with WhatsApp/SMS sent/pending status

**Delivery stats:**
- 22 sent / 2 pending
- 91.7% response rate
- 4.2 days avg payment time

**Reminder schedule toggles (T+0 to T+7):**
| Trigger | Channel | Purpose |
|---|---|---|
| T+0 | WhatsApp + SMS | Immediate on auction close |
| T+1 | SMS | Next-day follow-up |
| T+3 | WhatsApp + SMS | Mid-period escalation |
| T+7 | WhatsApp + SMS | Final legal notice |

---

### 6.5 Vehicle-wise View

Card grid (3 columns) — one card per vehicle.

**Each card shows:**
- Registration number (monospace, navy chip)
- Make, model, year
- Yard location
- Hammer price / Balance due (colour-coded by status)
- Due date
- Collection progress bar (%)
- Buyer name, company, mobile
- Platform badge + RC transfer status
- Status badge (Paid / Pending / Overdue / Partial)

**Filter tabs:** All / Paid / Overdue / Pending / Partial

**Card actions:** Collect Payment, View Details, Send Reminder

---

### 6.6 Reports & Analytics

**Stat boxes:** Total Auction Value, Total Collected, Total Pending, Total Overdue

**Charts:**
- Bar (stacked): Collection by platform — Hammer Value vs Collected
- Doughnut: Status distribution

**Auction-wise summary table:**

| Column | Description |
|---|---|
| Auction ID | Batch reference |
| Auction Date | Date of auction |
| No. of Lots | Vehicles in batch |
| Total Hammer Value | Sum of winning bids |
| EMD Collected | Upfront deposits |
| Balance Collected | Post-auction receipts |
| Total Collected | EMD + Balance |
| Outstanding | Uncollected amount |
| Collection % | Progress bar |

**Auctions tracked:** AUC-2026-041 (25-Apr), AUC-2026-048 (05-May), AUC-2026-051 (15-May)

**Platform performance table:**
- Bidkaro, eDiig, CarTrade, CarDekho
- Per platform: lots, hammer value, collected, collection %, avg days to collect

---

## 7. Design System

Shared with PayCollect and GainPulse. Full token reference in `PAYCOLLECT.md §6`.

### 7.1 Colour Tokens

```css
:root {
  --navy:        #1F4E79;   /* sidebar, headings */
  --navy-dark:   #163a5c;
  --navy-light:  #2563a8;
  --bg:          #EEF2F7;   /* page background */
  --white:       #ffffff;
  --text:        #1e293b;
  --muted:       #64748b;
  --border:      #e2e8f0;

  --green:       #16a34a;  --green-bg: #dcfce7;
  --blue:        #2563eb;  --blue-bg:  #dbeafe;
  --red:         #dc2626;  --red-bg:   #fee2e2;
  --amber:       #d97706;  --amber-bg: #fef3c7;
  --grey:        #6b7280;  --grey-bg:  #f3f4f6;

  /* Platform badges */
  --bidkaro:     #1a56db;
  --ediig:       #0f766e;
  --cartrade:    #c2410c;
  --cardekho:    #b91c1c;
}
```

### 7.2 Status Badge Classes

```html
<span class="badge badge-paid">Paid</span>
<span class="badge badge-pending">Pending</span>
<span class="badge badge-overdue">Overdue</span>
<span class="badge badge-partial">Partial</span>
<span class="badge badge-grey">Closed</span>
```

### 7.3 RC Transfer Badges

```html
<span class="badge-rc-complete">Complete</span>
<span class="badge-rc-progress">In Progress</span>
<span class="badge-rc-notstarted">Not Started</span>
```

### 7.4 Sub-navigation (module + submodule pattern)

```html
<!-- Parent sidebar item -->
<div class="sb-item has-children expanded" data-page="payments" onclick="toggleSub('payments')">
  <i class="bi bi-credit-card"></i>
  <span>Payments</span>
  <i class="bi bi-chevron-down sb-chevron"></i>
</div>

<!-- Sub-items group (toggled via JS) -->
<div class="sb-sub-group" id="sub-payments">
  <div class="sb-sub-item active" data-page="pay-dashboard" onclick="nav('pay-dashboard')">
    <i class="bi bi-speedometer2"></i> Pay Dashboard
  </div>
  <!-- ... other sub-items -->
</div>
```

```css
.sb-sub-group    { background: rgba(0,0,0,.18) }
.sb-sub-item     { padding: 8px 20px 8px 36px; font-size: 12.5px; /* indented */ }
.sb-sub-item.active { border-left-color: #60a5fa; font-weight: 600 }
.sb-chevron      { margin-left: auto; transition: transform .2s }
.sb-item.expanded .sb-chevron { transform: rotate(-180deg) }
```

---

## 8. Data Schema

### 8.1 Vehicle Record (`V[]`)

```javascript
{
  id:   'V001',
  n:    'MH12AB1234',   // registration number
  mk:   'Honda',
  mo:   'Activa',
  yr:   2021,
  tp:   '2W',           // 2W | 4W
  loc:  'Mumbai',
  st:   'In Auction',   // lifecycle stage
  ys:   'A-12'          // yard slot (null if not in yard)
}
```

**Lifecycle stages:** `EMI Default` → `Repo Ordered` → `In Yard` → `In Inspection` → `In Auction` → `Payment Pending` → `Released`

### 8.2 Loan Record (`L[]`)

```javascript
{
  id:  'L001',
  vi:  'V001',          // vehicle reference
  br:  'Ramesh Kumar',  // borrower name
  ct:  '9876543210',    // contact
  la:  75000,           // loan amount
  os:  52000,           // outstanding
  me:  4,               // missed EMIs
  ea:  3200,            // EMI amount
  ls:  'Notice Sent'    // legal status
}
```

### 8.3 Repossession Order (`RO[]`)

```javascript
{
  id:  'RO001',
  vi:  'V001',
  vn:  'Swift Repo Pvt Ltd',   // vendor name
  ad:  '2026-02-10',            // assignment date
  sd:  7,                       // SLA days
  st:  'Delivered',             // status
  pu:  true                     // physical uplift confirmed
}
```

### 8.4 Yard Record (`Y[]`)

```javascript
{
  id:  'Y001',
  vi:  'V001',
  yl:  'Mumbai Central Yard',
  ed:  '2026-02-13',    // entry date
  sl:  'A-12',          // slot
  cn:  'Fair',          // condition: Good | Fair | Poor
  dy:  28               // days in yard
}
```

### 8.5 Inspection Record (`INS[]`)

```javascript
{
  id:  'I001',
  vi:  'V001',
  vn:  'AutoCheck India',    // vendor
  dt:  '2026-02-16',         // inspection date
  gr:  'B',                  // grade: A | B | C
  ev:  45000,                // estimated value
  qc:  'Approved',           // QC status
  ph:  8                     // photo count
}
```

### 8.6 Auction Record (`AU[]`)

```javascript
{
  id:     'A001',
  vi:     'V001',
  rp:     40000,             // reserve price
  cb:     47500,             // current best bid
  bc:     6,                 // bid count
  st:     '2026-03-08',      // start date
  et:     '2026-03-15',      // end date
  status: 'Active',          // Active | Closed - Awaiting Payment | Closed
  pl:     'Internal + BidCar'// platforms
}
```

### 8.7 Payment Record (`PAY[]`) — basic

```javascript
{
  id:    'P001',
  ai:    'A002',             // auction reference
  vi:    'V005',             // vehicle reference
  buyer: 'Suresh Dealers Pvt Ltd',
  ad:    26000,              // amount due
  ap:    26000,              // amount paid
  mt:    'Bank Transfer',    // mode
  st:    'Paid',             // status
  pd:    '2026-03-12'        // paid date
}
```

### 8.8 Demand Record (`DEMANDS[]`) — full PayCollect schema

24 records covering 3 auction batches (AUC-2026-041, AUC-2026-048, AUC-2026-051).

Key fields: `id, auctionId, auctionDate, lot, reg, make, model, variant, year, type, chassis, engine, colour, yard, platform, reserve, hammer, bids, buyer, company, mobile, emd, balanceDue, balancePaid, dueDate, status, notified, payMode, utr, paidDate, rc, remarks`

Status distribution: Paid (7) / Pending (3) / Overdue (12) / Partial (2)

### 8.9 Release Record (`REL[]`)

```javascript
{
  id:    'REL001',
  vi:    'V007',
  buyer: 'Deepak Joshi',
  am:    72000,              // final hammer price
  ps:    'Paid',             // payment status
  ns:    'Complete',         // NOC status
  rc:    'Complete',         // RC transfer status
  hv:    'Complete'          // physical handover status
}
```

---

## 9. Navigation & Routing

### 9.1 NAV array structure

```javascript
const NAV = [
  { id: 'dashboard', ico: 'bi bi-speedometer2',          lbl: 'Dashboard' },
  { id: 'emi',       ico: 'bi bi-file-earmark-ruled',    lbl: 'EMI Tracking' },
  { id: 'repodec',   ico: 'bi bi-shield-check',          lbl: 'Repo Decision' },
  { id: 'repo',      ico: 'bi bi-truck',                 lbl: 'Repossession' },
  { id: 'yard',      ico: 'bi bi-house-gear',            lbl: 'Yard Management' },
  { id: 'inspect',   ico: 'bi bi-clipboard-check',       lbl: 'Inspection' },
  { id: 'auction',   ico: 'bi bi-tags',                  lbl: 'Auction' },
  { id: 'payments',  ico: 'bi bi-credit-card',           lbl: 'Payments',
    sub: [
      { id: 'pay-dashboard',     ico: 'bi bi-speedometer2',      lbl: 'Pay Dashboard' },
      { id: 'pay-upload',        ico: 'bi bi-cloud-arrow-up',    lbl: 'Upload Auction Data' },
      { id: 'pay-tracker',       ico: 'bi bi-grid-3x3',          lbl: 'Payment Tracker' },
      { id: 'pay-notifications', ico: 'bi bi-bell',              lbl: 'Buyer Notifications' },
      { id: 'pay-vehicles',      ico: 'bi bi-car-front-fill',    lbl: 'Vehicle-wise View' },
      { id: 'pay-reports',       ico: 'bi bi-bar-chart-line',    lbl: 'Reports & Analytics' },
    ]
  },
  { id: 'release',   ico: 'bi bi-arrow-right-circle',   lbl: 'Vehicle Release' }
];
```

### 9.2 nav() function behaviour

```javascript
nav('payments')      // → toggleSub, auto-redirects to pay-dashboard
nav('pay-tracker')   // → activates pg-pay-tracker, highlights parent + sub-item
nav('dashboard')     // → activates pg-dashboard, calls rDash()
```

### 9.3 Page → Render function map

| Page ID | Render Function | Data Source |
|---|---|---|
| `dashboard` | `rDash()` | `V[], L[], RO[], Y[], INS[], AU[]` |
| `emi` | `rEMI()` | `L[], V[]` |
| `repodec` | `rRepoDec()` | `L[], V[]` |
| `repo` | `rRepo()` | `RO[], V[]` |
| `yard` | `rYard()` | `Y[], V[]` |
| `inspect` | `rInspect()` | `INS[], V[]` |
| `auction` | `rAuction()` | `AU[], V[]` |
| `pay-dashboard` | `renderPayDashboard()` | `DEMANDS[]` |
| `pay-upload` | `renderPayUpload()` | `DEMANDS[]` |
| `pay-tracker` | `renderPayTracker()` | `DEMANDS[]` |
| `pay-notifications` | `renderPayNotifications()` | `DEMANDS[]` |
| `pay-vehicles` | `renderPayVehicles()` | `DEMANDS[]` |
| `pay-reports` | `renderPayReports()` | `DEMANDS[]` |
| `release` | `rRelease()` | `REL[], V[]` |

---

## 10. KPIs & Metrics

### 10.1 Portfolio-level (E2R Dashboard)

| Metric | Formula |
|---|---|
| Vehicles in default | Count where `L.me >= 3` |
| Active repossessions | Count `RO` where `st != 'Delivered'` |
| Avg days in yard | Mean of `Y.dy` |
| Auction close rate | (Closed auctions / Total auctions) × 100 |
| Overall recovery rate | (Total collected / Total hammer value) × 100 |

### 10.2 Payment collection (PayCollect submodules)

| Metric | Formula | Target |
|---|---|---|
| Collection Rate | (Collected ÷ Hammer Value) × 100 | >80% within 15 days |
| On-time Rate | (Paid within due date ÷ Total Paid) × 100 | >90% |
| Overdue Rate | (Overdue count ÷ Total demands) × 100 | <10% |
| Avg Days to Collect | Mean of (paidDate − aucDate) | <8 days |
| Notification Delivery Rate | (Notified ÷ Total demands) × 100 | 100% within T+1 |

### 10.3 Platform benchmarks (current data)

| Platform | Lots | Collection % |
|---|---|---|
| Bidkaro | 7 | ~35% |
| eDiig | 6 | ~47% |
| CarTrade | 5 | ~38% |
| CarDekho | 6 | ~28% |

---

## 11. Future Roadmap

### Near-term
- [ ] Connect E2R lifecycle data to PayCollect — when auction closes in E2R, auto-populate DEMANDS
- [ ] Link PayCollect `status === 'paid'` → auto-surface in `pg-release` as ready for handover
- [ ] Add `pg-payments` redirect to `pay-dashboard` as landing (currently basic table)
- [ ] Add search and filter to E2R main modules (EMI, Repo, Yard)

### Medium-term
- [ ] Backend API (Supabase / Node.js) — replace in-memory arrays with real persistence
- [ ] User authentication — role-based access (RM / Manager / Yard / Finance)
- [ ] Real WhatsApp Business API (Gupshup / Infobip) + SMS gateway (MSG91)
- [ ] Mobile-responsive overhaul for field teams
- [ ] Document upload — attach inspection photos, seizure photos, payment UTR screenshots

### Long-term
- [ ] AI-powered default prediction — flag accounts likely to miss next EMI
- [ ] Auto-generate legal notice PDF at T+7 overdue
- [ ] RTO API integration — auto-check RC transfer status
- [ ] Integration with bank CBS (Core Banking System) for live loan data
- [ ] GainPulse adaptation — port E2R design system to customer success platform

---

## Appendix: File Structure

```
e2r/
├── index.html     ← Single-file SPA (all CSS + HTML + JS, 2,500+ lines)
└── E2R.md         ← This documentation file
```

**Why single file?** Same reasoning as PayCollect — demos run without a server, works from file system, email-able for review, zero deployment overhead at POC stage.

---

*Auctimeter 2.0 / E2R is built by Avinash Singh (Product Manager, Mahindra Finance) as part of the E2R product suite. For questions or contributions, raise an issue at the PM GitHub repository.*
