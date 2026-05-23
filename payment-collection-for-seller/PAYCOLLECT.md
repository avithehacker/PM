# PayCollect — Bank Payment Collection Portal
### Product Documentation & Reuse Guide
**Version:** 2.0 | **Author:** Avinash Singh | **Last Updated:** 23-May-2026

---

## Table of Contents
1. [What is PayCollect](#1-what-is-paycollect)
2. [Problem it Solves](#2-problem-it-solves)
3. [Who Uses It](#3-who-uses-it)
4. [Product Architecture](#4-product-architecture)
5. [Feature Breakdown](#5-feature-breakdown)
6. [Design System (E2R Theme)](#6-design-system-e2r-theme)
7. [Data Schema](#7-data-schema)
8. [Reuse Guide — E2R Integration](#8-reuse-guide--e2r-integration)
9. [Reuse Guide — GainPlus Integration](#9-reuse-guide--gainplus-integration)
10. [Excel Upload Module](#10-excel-upload-module)
11. [Notification Engine](#11-notification-engine)
12. [Component Catalog](#12-component-catalog)
13. [Platform Integrations](#13-platform-integrations)
14. [KPIs & Metrics](#14-kpis--metrics)
15. [Future Roadmap](#15-future-roadmap)

---

## 1. What is PayCollect

PayCollect is a **bank-facing, single-page web application** that manages the end-to-end payment collection workflow after vehicle auctions. Banks that repossess and auction vehicles need to collect the winning bid amount from buyers — PayCollect automates that entire process: from uploading auction results, to sending payment demands, to tracking each rupee vehicle-wise.

**Built for:** Asset Recovery & Repo Teams in Indian banks (HDFC, SBI, ICICI, Axis, Kotak, etc.)

**Core loop:**
```
Auction closes → Bank uploads Excel → System generates demands →
Buyers get WhatsApp/SMS with payment details → Bank tracks payments vehicle-wise →
RC transfer released on full payment confirmation
```

---

## 2. Problem it Solves

| Pain Point | Before PayCollect | After PayCollect |
|---|---|---|
| Tracking payments | Manual Excel sheets, WhatsApp groups | Single dashboard, real-time status |
| Notifying buyers | Ops team calling each buyer manually | Auto WhatsApp + SMS on upload |
| Overdue follow-up | No visibility until money doesn't come | Overdue flagged automatically with days count |
| Auction platform data | Separate files from Bidkaro, eDiig, CarTrade, CarDekho | One upload, normalised format |
| RC transfer release | Manual check before release | Auto-triggered on payment confirmation |
| Reporting to management | Monthly Excel, lagging | Live dashboard with collection rate, platform performance |

**Key insight:** Banks lose 5–12% of auction value every cycle due to poor post-auction collection processes. PayCollect closes that gap.

---

## 3. Who Uses It

| Role | What They Do in PayCollect |
|---|---|
| **Relationship Manager (RM)** | Primary user. Uploads Excel, monitors tracker, records payments |
| **Branch Manager / Recovery Head** | Reviews dashboard, monitors overdue, approves RC releases |
| **Operations Team** | Sends reminders, handles notification failures |
| **Bank CEO / Senior Leadership** | Views reports — collection rate, platform performance, outstanding value |
| **Buyer (Indirect)** | Receives WhatsApp/SMS notification; does not log in |

---

## 4. Product Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    PayCollect SPA                           │
│                                                            │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ Sidebar  │  │    Header    │  │   Page Container   │  │
│  │  (nav)   │  │ (bank/user)  │  │   (6 screens)      │  │
│  └──────────┘  └──────────────┘  └────────────────────┘  │
│                                                            │
│  Pages:                                                    │
│  1. Dashboard      4. Buyer Notifications                  │
│  2. Upload Data    5. Vehicle-wise View                    │
│  3. Tracker        6. Reports & Analytics                  │
│                                                            │
│  Shared Modules:                                           │
│  - Modal system       - Toast engine                       │
│  - Excel import       - Excel export                       │
│  - Chart renderer     - Table renderer                     │
└────────────────────────────────────────────────────────────┘

External Dependencies (CDN only, no backend required):
├── Bootstrap Icons 1.11.3  (icons)
├── Chart.js 4.4.0          (charts)
└── SheetJS / xlsx          (Excel read/write)
```

**Architecture choice:** Pure frontend SPA. No server, no database, no build step. Runs directly in browser from `index.html`. This makes it:
- Easy to demo to bank executives
- Easy to embed in existing bank portals
- Easy to iterate on — change one file, refresh, done

---

## 5. Feature Breakdown

### 5.1 Dashboard
- **5 KPI cards:** Total Vehicles, Total Auction Value, Collected, Outstanding, Overdue
- **Collection progress bars:** Overall rate, within-deadline rate, overdue rate
- **Doughnut chart:** Status distribution (Paid / Pending / Overdue / Partial)
- **Bar chart:** Collection performance by auction platform
- **Overdue action table:** Immediate visibility on at-risk payments, one-click Collect or Remind
- **Platform performance table:** Per-platform lots, value, collected, collection %
- **Activity feed:** Last 5 collection events with timestamps

### 5.2 Upload Auction Data
- **4-step stepper:** Download Template → Upload File → Review Data → Notify Buyers
- **Drag-and-drop zone:** Accepts `.xlsx` and `.csv`
- **Template download:** Generates a pre-formatted `.xlsx` with all required columns via SheetJS
- **Auto-parse:** Detects column positions by header name (fuzzy match), maps to internal schema
- **Preview table:** Shows first 20 rows before confirming import
- **Confirm & import:** Creates DEMANDS records from uploaded rows
- **Notification step:** Sample WhatsApp/SMS message preview, channel selection, Send All button

### 5.3 Payment Tracker
Full table with **30 columns:**

| # | Column | Description |
|---|---|---|
| 1 | Auction ID | Which auction batch |
| 2 | Lot No | Lot number within auction |
| 3 | Registration No | Vehicle reg number |
| 4 | Make & Model | Brand and model name |
| 5 | Variant | Trim level (ZX CVT, XT+, etc.) |
| 6 | Year | Manufacturing year |
| 7 | Type | 4W Sedan / 4W SUV / 2W / EV etc. |
| 8 | Chassis No | Full chassis number |
| 9 | Engine No | Engine number |
| 10 | Colour | Vehicle colour |
| 11 | Yard Location | Where the vehicle is physically held |
| 12 | Auction Date | Date of auction |
| 13 | Platform | Bidkaro / eDiig / CarTrade / CarDekho |
| 14 | Reserve Price | Minimum acceptable bid |
| 15 | Hammer Price | Final winning bid |
| 16 | No. of Bids | Bidding activity count |
| 17 | Buyer Name | Winning bidder name |
| 18 | Company | Buyer's business name |
| 19 | Mobile | Buyer's contact number |
| 20 | EMD Paid | Earnest Money Deposit already collected |
| 21 | Balance Due | Hammer Price minus EMD |
| 22 | Due Date | Payment deadline |
| 23 | Payment Mode | NEFT / RTGS / UPI / Cheque / Cash |
| 24 | UTR / Ref | Transaction reference number |
| 25 | Paid Date | Date payment was received |
| 26 | Status | Paid / Pending / Overdue / Partial |
| 27 | Notified | Was buyer sent payment demand? |
| 28 | RC Transfer | Not Started / In Progress / Complete |
| 29 | Remarks | Free text notes |

**Interactions:** Filter by status, search across all text fields, Export to Excel, per-row actions (Record Payment, View Details, Send Reminder)

### 5.4 Buyer Notifications
- Full notification log for all 24+ buyers
- Sent / pending / failed indicators
- Re-send button per buyer
- Reminder schedule config: T+0 (instant), T+1 (follow-up), T+3 (escalation), T+7 (legal notice)
- Delivery summary pie chart
- Channel selector: WhatsApp, SMS, Email

### 5.5 Vehicle-wise View
- Card grid (3 columns) — one card per vehicle
- Each card shows: reg number, make/model/year, yard, hammer price, balance due (colour-coded), buyer name + mobile, due date, status badge, collection progress bar (%)
- Filter by payment status
- Actions on card: Record Payment, Send Reminder, View Details

### 5.6 Reports & Analytics
- 4 summary stat boxes: Total Auction Value, Collected, Pending, Overdue
- Stacked bar chart: Collection by platform (Bidkaro, eDiig, CarTrade, CarDekho)
- Doughnut: Status distribution
- Auction-wise summary table (per batch: lots, value, collected, collection %)
- Platform performance table (per platform: lots, total value, collected, %, avg days to collect)
- Export full report to Excel

---

## 6. Design System (E2R Theme)

This design system is shared across PayCollect, E2R (Auctimeter), and GainPlus. Use these exact values for visual consistency.

### 6.1 Colour Tokens

```css
/* Primary palette */
--primary:        #1F4E79;   /* Sidebar background, headings */
--primary-mid:    #2E75B6;   /* Buttons, links, active states */
--primary-light:  #BDD7EE;   /* Sidebar text, accents */

/* Status colours */
--success:        #217346;   /* Paid, complete, approved */
--success-bg:     #E2EFDA;
--warning:        #C55A11;   /* Overdue, partial, escalated */
--warning-bg:     #FFF4E0;
--danger:         #C00000;   /* Critical overdue, rejected */
--danger-bg:      #FFE0E0;
--info:           #2E75B6;   /* Pending, in-progress */
--info-bg:        #EFF6FF;
--neutral:        #595959;   /* Closed, not started */
--neutral-bg:     #F2F2F2;

/* Platform badges */
--bidkaro:        #1a56db;
--ediig:          #0f766e;
--cartrade:       #c2410c;
--cardekho:       #b91c1c;

/* Background & borders */
--bg-app:         #EEF2F7;   /* Page background */
--bg-card:        #FFFFFF;   /* Card background */
--border:         #E0E0E0;
--border-light:   #F2F2F2;

/* Text */
--text-primary:   #1A1A1A;
--text-secondary: #595959;
--text-muted:     #888888;
```

### 6.2 Layout

```
Sidebar:     240px fixed left, full height, #1F4E79
Header:      58px fixed top (left: 240px), white, box-shadow
Main:        margin-left: 240px, margin-top: 58px
Card:        background #FFF, border-radius 8px, box-shadow: 0 2px 8px rgba(0,0,0,0.1)
Card padding: 20px
Gap between cards: 16px
```

### 6.3 Typography

```css
font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
font-size:   14px base
h2 (page):   20px, 700, color #1F4E79
h3 (card):   15px, 700, color #1F4E79
label:       11px, 600, uppercase, letter-spacing 0.04em
small/meta:  12px, color #888
```

### 6.4 Badge Classes

```html
<!-- Status -->
<span class="badge bg">Paid</span>        <!-- green -->
<span class="badge bb">Pending</span>     <!-- blue -->
<span class="badge br">Overdue</span>     <!-- red -->
<span class="badge ba">Partial</span>     <!-- amber -->
<span class="badge bgr">Closed</span>     <!-- grey -->

<!-- Platform -->
<span class="badge" style="background:#1a56db;color:#fff">Bidkaro</span>
<span class="badge" style="background:#0f766e;color:#fff">eDiig</span>
<span class="badge" style="background:#c2410c;color:#fff">CarTrade</span>
<span class="badge" style="background:#b91c1c;color:#fff">CarDekho</span>
```

### 6.5 Button Classes

```html
<button class="btn bp">Primary (blue)</button>
<button class="btn bs">Secondary (outline)</button>
<button class="btn bn">Success (green)</button>
<button class="btn bd">Danger (red)</button>
<button class="btn bsm">Small size modifier</button>
<button class="btn bxsm">Extra small</button>
```

### 6.6 KPI Card Pattern

```html
<div class="kcard [green|red|amber|purple]">
  <!-- left border colour changes by variant -->
  <i class="bi bi-car-front-fill kico"></i>
  <div class="kval">24</div>
  <div class="klbl">Total Vehicles</div>
  <div class="ksub">From 3 auctions</div>
</div>
```

### 6.7 Table Pattern

```html
<div class="twrap">  <!-- overflow-x: auto wrapper -->
  <table>
    <thead><tr><th>Column</th>...</tr></thead>
    <tbody>
      <tr><td>Data</td>...</tr>
    </tbody>
  </table>
</div>
<!-- thead: background #1F4E79, white text -->
<!-- tr:hover: background #D5E8F0 -->
<!-- sticky header: position:sticky; top:0; z-index:10 -->
```

### 6.8 SPA Navigation Pattern

```javascript
// All pages are pre-rendered div#pg-{name} with class="pg"
// Only one page has class="pg active" at a time

function nav(pg) {
  document.querySelectorAll('.pg').forEach(e => e.classList.remove('active'));
  document.getElementById('pg-' + pg).classList.add('active');
  document.getElementById('ptitle').textContent = PAGE_TITLES[pg];
  RENDER_FUNCTIONS[pg]();  // each page has its own render function
}
```

### 6.9 Modal Pattern

```html
<div id="ov" onclick="ovc(event)">
  <div class="mbox">
    <button class="mx" onclick="cM()">✕</button>
    <div id="mbody"></div>
  </div>
</div>

<script>
function sM(html) { document.getElementById('mbody').innerHTML = html; document.getElementById('ov').classList.add('on'); }
function cM()     { document.getElementById('ov').classList.remove('on'); }
function ovc(e)   { if (e.target.id === 'ov') cM(); }
</script>
```

### 6.10 Toast Pattern

```javascript
function toast(msg, type = 'ok') {
  // type: 'ok' = green, 'er' = red, 'wr' = amber
  const el = document.createElement('div');
  el.className = 'toast t' + type;
  el.textContent = msg;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 350); }, 3500);
}
```

---

## 7. Data Schema

### 7.1 Demand Object (core record)

```javascript
{
  id:           'D001',              // Internal ID
  aucId:        'AUC-2026-051',      // Auction batch reference
  lot:          'L-001',             // Lot number within auction
  
  // Vehicle fields
  reg:          'MH12AB1234',        // Registration number
  make:         'Honda',
  model:        'City',
  variant:      'ZX CVT',
  year:         2021,
  type:         '4W Sedan',          // 4W Sedan / 4W SUV / 4W MPV / 2W / EV
  chassis:      'MAHHG2GAPLH123456',
  engine:       'L15Z11A23456',
  color:        'Lunar Silver',
  yard:         'Mumbai Central Yard',
  
  // Auction fields
  aucDate:      '15-May-2026',
  platform:     'Bidkaro',           // Bidkaro | eDiig | CarTrade | CarDekho
  reserve:      380000,              // In INR (no formatting)
  hammer:       420000,
  bids:         7,
  
  // Buyer fields
  buyer:        'Rajesh Mehta',
  buyerCo:      'Mehta Auto Traders',
  mobile:       '9876543210',
  email:        'rajesh@example.com',
  
  // Payment fields
  emd:          42000,               // Earnest Money already paid
  due:          378000,              // Current balance (updates on partial)
  dueDate:      '22-May-2026',
  mode:         null,                // NEFT | RTGS | UPI | Cheque | Cash
  utr:          null,                // Transaction reference
  paidDate:     null,
  status:       'overdue',           // paid | pending | overdue | partial
  
  // Notification fields
  notified:     true,
  notifDate:    '15-May-2026',
  notifChannel: 'WhatsApp + SMS',
  
  // Post-collection
  rc:           'Not Started',       // Not Started | In Progress | Complete
  remarks:      ''
}
```

### 7.2 Excel Import Column Mapping

The upload module looks for these headers (case-insensitive, partial match):

| Internal Field | Excel Header to Match |
|---|---|
| aucId | "auction id", "auction" |
| lot | "lot" |
| reg | "reg", "registration" |
| make | "make" |
| model | "model" |
| year | "year" |
| chassis | "chassis" |
| engine | "engine" |
| yard | "yard", "location" |
| platform | "platform" |
| reserve | "reserve" |
| hammer | "hammer" |
| buyer | "buyer" |
| mobile | "mobile" |
| email | "email" |
| emd | "emd" |
| dueDate | "due date", "due" |

### 7.3 Excel Template Columns (in order)

```
Auction ID | Lot No | Registration No | Make | Model | Variant | Year | Type |
Chassis No | Engine No | Colour | Yard Location | Reserve Price | Hammer Price |
Auction Date | Platform | Buyer Name | Buyer Company | Buyer Mobile | Buyer Email |
EMD Paid | Payment Due Date
```

---

## 8. Reuse Guide — E2R Integration

**E2R (Auctimeter 2.0)** is the repossession lifecycle management tool. It covers EMI tracking → Repo decision → Repossession → Yard → Inspection → Auction → Payments → Release.

PayCollect's **Payments** module maps directly to E2R's `pg-payments` page, which currently only has basic payment recording. Here's how to upgrade E2R's payment page using PayCollect components:

### 8.1 What to lift from PayCollect into E2R

| PayCollect Module | E2R Page | How to Use |
|---|---|---|
| Dashboard KPIs | `pg-payments` (enhance) | Add 5-card KPI row at top |
| Payment Tracker table | `pg-payments` (replace) | Replace basic PAY table with full 30-col tracker |
| Notification engine | `pg-payments` → new tab | Add "Notify Buyers" tab with reminder schedule |
| Vehicle-wise cards | `pg-release` (enhance) | Add payment status card before RC release step |
| Collection charts | `pg-dashboard` (enhance) | Add collection rate to E2R main dashboard |
| Export Excel | All pages | Add export button to existing tables |

### 8.2 Step-by-step: Upgrading E2R Payments page

**Step 1** — Replace the basic stats with KPI cards:
```javascript
// E2R pg-payments — replace s3 section with kgrid
document.getElementById('pg-payments').innerHTML = `
  <div class="ph"><h2>Payment Collection</h2>...</div>
  <div class="kgrid">
    ${kpiCard('Total Collected', fmt(collected), 'bi-check-circle-fill', 'green')}
    ${kpiCard('Pending', fmt(pending), 'bi-clock-fill', '')}
    ${kpiCard('Overdue', fmt(overdue), 'bi-exclamation-triangle-fill', 'red')}
    ...
  </div>
  ...
```

**Step 2** — Add the full tracker table (copy `renderTracker()` function from PayCollect, filter by `aucId` to show only E2R's current auction batch)

**Step 3** — Wire `PAY` array in E2R to the `DEMANDS` schema from PayCollect (add missing fields: `lot`, `chassis`, `engine`, `yard`, `platform`, `bids`, `notified`, `rc`)

**Step 4** — Add the upload module to E2R's auction page (`pg-auction`) — so when an auction closes and results come from Bidkaro/eDiig, the RM can upload directly from E2R

**Step 5** — Link RC Transfer status from PayCollect's `rc` field to E2R's `pg-release` page (auto-populate release candidates when `status === 'paid'`)

### 8.3 Shared data flow between E2R and PayCollect

```
E2R Auction closes (pg-auction)
        ↓
  Results exported to Excel (by platform)
        ↓
PayCollect Upload (pg-upload)
        ↓
  Demands created, buyers notified
        ↓
PayCollect Tracker (pg-tracker) — payment recorded
        ↓
  status = 'paid' → rc = 'Not Started'
        ↓
E2R Release (pg-release) — RC transfer initiated
```

In a future integrated version, E2R and PayCollect share one `DEMANDS` array. E2R writes the auction outcome; PayCollect reads and drives payment collection.

---

## 9. Reuse Guide — GainPlus Integration

**GainPlus** is a portfolio / investment / wealth management tool (planned). While it operates in a different domain from vehicle auctions, several PayCollect modules are domain-agnostic and can be reused directly.

### 9.1 Reusable modules (zero changes needed)

| PayCollect Module | GainPlus Use Case |
|---|---|
| **Excel Upload** | Upload client portfolio data, SIP records, investment sheets |
| **Notification Engine** | Alert clients on SIP due dates, maturity events, rebalancing |
| **KPI Card pattern** | AUM, returns, SIP count, overdue SIPs |
| **Tracker table** | Portfolio holdings tracker, transaction log |
| **Status badge system** | Active / Paused / Matured / Defaulted |
| **Modal system** | Record transaction, view client details |
| **Toast engine** | Confirmation on investment recorded |
| **Export Excel** | Download portfolio statements |
| **Chart patterns** | Asset allocation pie, returns bar chart |
| **Sidebar + Header layout** | Identical — just change logo and nav items |

### 9.2 Domain mapping

| PayCollect Concept | GainPlus Equivalent |
|---|---|
| Vehicle | Investment / Portfolio |
| Auction | SIP / Lumpsum event |
| Hammer Price | Invested Amount |
| Balance Due | Outstanding SIP |
| Buyer | Client / Investor |
| Due Date | SIP deduction date |
| Overdue | Missed SIP / Bounce |
| EMD | Token amount / advance |
| RC Transfer | Statement / Certificate dispatch |
| Platform | Fund house (Mirae, HDFC MF, SBI MF, etc.) |

### 9.3 GainPlus Demand Object (adapted schema)

```javascript
{
  id:           'INV001',
  portfolioId:  'PF-2026-001',
  clientName:   'Anil Kumar Gupta',
  clientMobile: '9876543210',
  fundHouse:    'Mirae Asset',         // replaces platform
  scheme:       'Emerging Bluechip',
  sipAmount:    5000,                  // replaces hammer
  totalInvested: 60000,
  currentValue:  68500,
  nextDueDate:  '05-Jun-2026',        // replaces dueDate
  status:       'active',             // active | paused | missed | matured
  notified:     true,
  ...
}
```

### 9.4 Steps to build GainPlus from PayCollect

1. **Copy** `payment-collection-for-seller/index.html` → `gainplus/index.html`
2. **Rename** sidebar items: Dashboard, Upload Client Data, Portfolio Tracker, Client Alerts, Scheme-wise View, Reports
3. **Swap** DEMANDS array with investment records (adapted schema above)
4. **Change** column headers in tracker table (Hammer Price → Invested Amount, etc.)
5. **Update** KPI labels (Collected → AUM, Overdue → Missed SIPs)
6. **Rebrand** platform badges to fund house colours
7. **Rewrite** notification message template (SIP reminder instead of payment demand)
8. Design and data change takes ~4–6 hours. All JS logic reuses as-is.

---

## 10. Excel Upload Module

This module is the most reusable piece across all three products. Here's the standalone implementation:

### 10.1 HTML structure

```html
<!-- Step indicator -->
<div class="steps">
  <div class="step done"><div class="step-num">1</div><span>Download Template</span></div>
  <div class="step-line"></div>
  <div class="step active"><div class="step-num">2</div><span>Upload File</span></div>
  <div class="step-line"></div>
  <div class="step"><div class="step-num">3</div><span>Review Data</span></div>
  <div class="step-line"></div>
  <div class="step"><div class="step-num">4</div><span>Confirm & Import</span></div>
</div>

<!-- Upload zone -->
<div class="upload-zone" id="dropzone"
     onclick="document.getElementById('fileInput').click()"
     ondragover="dzDrag(event)" ondragleave="dzLeave()" ondrop="dzDrop(event)">
  <i class="bi bi-cloud-arrow-up"></i>
  <h3>Drop Excel File Here</h3>
  <p>Supports .xlsx and .csv</p>
  <button class="btn bp">Browse File</button>
</div>
<input type="file" id="fileInput" accept=".xlsx,.xls,.csv" style="display:none"
       onchange="handleFile(event)">
```

### 10.2 JavaScript (copy-paste ready)

```javascript
// Requires: SheetJS (https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js)

let uploadedData = [];

function dzDrag(e)  { e.preventDefault(); document.getElementById('dropzone').classList.add('drag'); }
function dzLeave()  { document.getElementById('dropzone').classList.remove('drag'); }
function dzDrop(e)  { e.preventDefault(); dzLeave(); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }
function handleFile(e) { if (e.target.files[0]) processFile(e.target.files[0]); }

function processFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const wb   = XLSX.read(e.target.result, { type: 'binary' });
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (data.length < 2) { toast('File is empty', 'er'); return; }
      uploadedData = data;
      showPreview(data);
    } catch(err) { toast('Could not read file. Use the template.', 'er'); }
  };
  reader.readAsBinaryString(file);
}

function downloadTemplate(headers, sampleRow, sheetName, filename) {
  const ws = XLSX.utils.aoa_to_sheet([headers, sampleRow]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
}

function exportToExcel(data, headers, sheetName, filename) {
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename + '_' + new Date().toISOString().split('T')[0] + '.xlsx');
}
```

---

## 11. Notification Engine

### 11.1 Message template structure

```javascript
const NOTIFICATION_TEMPLATE = {
  whatsapp: (d) => `
Dear ${d.buyer},

Congratulations! You have won Lot #${d.lot} — ${d.make} ${d.model} ${d.year}
Registration: ${d.reg} | Auction: ${d.aucId} (${d.aucDate})

PAYMENT DETAILS:
Hammer Price : ₹${fmt(d.hammer)}
EMD Paid     : ₹${fmt(d.emd)}
Balance Due  : ₹${fmt(d.due)}
Pay By       : ${d.dueDate}

BANK DETAILS:
Bank  : HDFC Bank
A/c   : 50100XXXXXXXX
IFSC  : HDFC0001234
Branch: Asset Recovery, Mumbai

Failure to pay by the due date may result in forfeiture of EMD and legal proceedings.

For queries: 1800-XXX-XXXX | assetrecovery@hdfcbank.com
  `.trim(),

  sms: (d) =>
    `HDFC ASSET RECOVERY: You won Lot ${d.lot} (${d.reg} ${d.make} ${d.model}). ` +
    `Pay ₹${fmt(d.due)} by ${d.dueDate}. IFSC: HDFC0001234 A/c: 50100XXXXXXXX. Queries: 1800-XXX-XXXX`
};
```

### 11.2 Reminder schedule logic

```javascript
const REMINDER_SCHEDULE = [
  { trigger: 0,  label: 'T+0 Instant demand',     channel: ['whatsapp', 'sms'] },
  { trigger: 1,  label: 'T+1 Follow-up',           channel: ['sms'] },
  { trigger: 3,  label: 'T+3 Escalation warning',  channel: ['whatsapp', 'sms'] },
  { trigger: 7,  label: 'T+7 Legal notice',        channel: ['whatsapp', 'sms', 'email'] },
];

// Check which reminders are due today
function getDueReminders(demands, today) {
  return demands.flatMap(d => {
    const daysSinceAuction = Math.floor((today - new Date(d.aucDate)) / 86400000);
    return REMINDER_SCHEDULE
      .filter(r => daysSinceAuction === r.trigger && d.status !== 'paid')
      .map(r => ({ demand: d, reminder: r }));
  });
}
```

---

## 12. Component Catalog

Quick reference for every reusable HTML/CSS component in the E2R design system.

### Sidebar nav item
```html
<div class="ni active" data-pg="dashboard" onclick="nav('dashboard')">
  <i class="bi bi-speedometer2 ico"></i>
  <span>Dashboard</span>
  <span class="badge-count">4</span>  <!-- optional red count bubble -->
</div>
```

### Progress bar
```html
<div class="pb">
  <div class="pf pf-green" style="width:63%"></div>
  <!-- pf-blue | pf-green | pf-red | pf-amber -->
</div>
```

### Filter tabs
```html
<div class="fbar">
  <button class="ftab on" onclick="setFilter('all',this)">All <span>(24)</span></button>
  <button class="ftab" onclick="setFilter('overdue',this)">Overdue <span>(12)</span></button>
</div>
```

### Vehicle card (Vehicle-wise View)
```html
<div class="veh-card [paid|overdue|partial]">
  <!-- top border colour changes by status -->
  <div class="vc-reg">MH12AB1234</div>
  <div class="vc-name">Honda City ZX CVT 2021 · Mumbai Central Yard</div>
  <div class="vc-row"><span class="lbl">Hammer Price</span><span class="val">₹4,20,000</span></div>
  <div class="vc-row"><span class="lbl">Balance Due</span><span class="val" style="color:#C00000">₹3,78,000</span></div>
  <div class="vc-progress">
    <div class="pb"><div class="pf pf-red" style="width:10%"></div></div>
  </div>
</div>
```

### Form field
```html
<div class="fg">
  <label>Amount Received (₹)</label>
  <input class="form-input" type="number" placeholder="e.g. 3,78,000">
</div>
<!-- Two columns: <div class="fr"> (2-col grid) -->
<!-- Three columns: <div class="fr3"> (3-col grid) -->
```

### Activity feed item
```html
<div class="aitem">
  <div class="adot" style="background:#70AD47"></div>  <!-- colour = event type -->
  <div class="atim">Today 11:42</div>
  <div class="atxt"><strong>MH12AB1234</strong> — Payment ₹3,78,000 received via NEFT</div>
</div>
```

---

## 13. Platform Integrations

Supported auction platforms and their export formats:

| Platform | Export Format | Key Columns | Notes |
|---|---|---|---|
| **Bidkaro** | `.xlsx` | Lot No, Reg No, Hammer Price, Buyer Mobile | Standard columns match template |
| **eDiig** | `.xlsx` | Lot ID, Vehicle No, Final Bid, Winner Contact | Needs column mapping |
| **CarTrade** | `.xlsx` / `.csv` | Listing ID, Reg, Auction Price, Bidder Name | CarTrade uses "Listing ID" not "Lot No" |
| **CarDekho** | `.xlsx` | Lot, Vehicle Reg, Winning Bid, Buyer Details | Close to standard |

The upload module's fuzzy column match handles all four formats. If headers differ, the mapper falls back to positional matching for the first 19 standard columns.

**To add a new platform:**
1. Add it to the platform badge colour map in CSS
2. Add it to the `<select>` dropdown in Add Demand modal
3. Document its column headers here

---

## 14. KPIs & Metrics

### 14.1 Primary KPIs (CEO Dashboard)

| Metric | Formula | Target |
|---|---|---|
| **Collection Rate** | (Total Collected ÷ Total Hammer Value) × 100 | >80% within 15 days |
| **On-time Collection Rate** | (Paid within due date ÷ Total Paid) × 100 | >90% |
| **Overdue Rate** | (Overdue count ÷ Total demands) × 100 | <10% |
| **Avg Days to Collect** | Mean of (paidDate − aucDate) for paid records | <8 days |
| **EMD at Risk** | Sum of EMD where overdue >30 days | ₹0 target |
| **Notification Delivery Rate** | (Notified ÷ Total demands) × 100 | 100% within T+1 |

### 14.2 Platform Performance KPIs

| Metric | Purpose |
|---|---|
| Platform collection % | Which platform brings more serious buyers |
| Platform avg days to collect | Payment speed by platform |
| Platform overdue rate | Default risk by platform |

Banks can use these to negotiate better placement fees with platforms, or to prefer platforms with lower overdue rates.

---

## 15. Future Roadmap

### Near-term (next sprint)
- [ ] Real backend API (Node.js / Supabase) to replace in-memory JS data
- [ ] User authentication (bank staff login with role-based access)
- [ ] Actual WhatsApp Business API integration (via Gupshup / Infobip)
- [ ] SMS gateway integration (Textlocal / MSG91)
- [ ] Bank account auto-reconciliation via UPI webhook

### Medium-term
- [ ] Multi-bank support (each bank gets isolated data namespace)
- [ ] Integrated with E2R — single app from EMI default to RC transfer
- [ ] Mobile app (React Native) for field RMs to collect and confirm payments
- [ ] Buyer self-service portal (buyer logs in, sees their pending payment, pays via UPI)
- [ ] Document upload (buyer can upload UTR screenshot)

### Long-term / GainPlus
- [ ] GainPlus adaptation (SIP collection, investment portfolio tracking)
- [ ] AI-powered overdue risk scoring (predict who is likely to default)
- [ ] Auto-generate legal notice PDF on T+7 overdue
- [ ] Integration with CIBIL / bureau for buyer credit checks pre-auction

---

## Appendix: File Structure

```
payment-collection-for-seller/
├── index.html          ← Single-file SPA (all CSS + HTML + JS)
└── PAYCOLLECT.md       ← This documentation file
```

**Why single file?**
Demos run without a server. Banks can open directly in browser. Email-able. No deployment required for POC stage. When productionising, split into `index.html`, `style.css`, `app.js`, `data.js`.

---

*PayCollect is built by Avinash Singh (Product Manager, Mahindra Finance) as part of the E2R product suite. For questions or contributions, raise an issue at the PM GitHub repository.*
