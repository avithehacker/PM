# PRD: Auto-Bid — Ediig Auction Platform

**Author:** Avinash Singh  
**Date:** June 2026  
**Version:** 2.0 — Complete Rewrite  
**Status:** Final Draft  
**Platform:** Ediig

> This document is written for everyone — no prior knowledge of auctions required.

---

## Table of Contents

- [Part 1 — Auctions 101: Understanding the Basics](#part-1)
- [Part 2 — Two Types of Auctions on Ediig](#part-2)
- [Part 3 — What Is Auto-Bid? (The Simple Version)](#part-3)
- [Part 4 — Who Is This For?](#part-4)
- [Part 5 — Your First Auto-Bid: Step by Step](#part-5)
- [Part 6 — Every Screen Explained](#part-6)
- [Part 7 — The Auto-Bid Session Lifecycle](#part-7)
- [Part 8 — All Business Rules (Plain English)](#part-8)
- [Part 9 — Edge Cases: What Happens When Things Go Wrong](#part-9)
- [Part 10 — Success Metrics](#part-10)
- [Part 11 — Roadmap: What Comes Next](#part-11)
- [Part 12 — Glossary](#part-12)

---

<a id="part-1"></a>
## Part 1 — Auctions 101: Understanding the Basics

> Skip to Part 3 if you already know how auctions work.

### 1.1 What Is an Auction?

An auction is a way of selling something where multiple buyers compete by making offers (called **bids**). The person who offers the most money wins and buys the item.

Think of it like this: imagine 10 people all want the same cricket bat. Instead of one fixed price, the seller says "who offers the most?" Each person shouts a higher number than the last, and eventually the highest bidder wins the bat.

### 1.2 What Is a Vehicle Auction?

A vehicle auction is the same concept, but for cars, motorcycles, or three-wheelers. These vehicles have usually been repossessed by banks (when loan EMIs are not paid) or are surplus fleet vehicles. The bank wants to recover its money, so it sells these vehicles to the highest bidder.

**Who buys at vehicle auctions?**
- Car dealers who want to buy vehicles cheaply and resell them
- Fleet companies who need vehicles for their business
- Individual buyers looking for a good deal

### 1.3 Key People in Every Auction

| Role | Who They Are | What They Do |
|------|-------------|--------------|
| Seller | A bank or finance company | Puts the vehicle up for auction to recover loan money |
| Auctioneer | Ediig platform | Runs the auction, accepts bids, announces the winner |
| Buyer / Bidder | You | Places bids, tries to win the vehicle at the best price |
| Rival Bidder | Other buyers | Other people also trying to win the same vehicle |

### 1.4 How Bidding Works — The Basics

Each auction has a starting price. To participate, you must bid at least the next required amount. On Ediig, bids go up by **fixed increments** depending on the vehicle type:

| Vehicle Type | Examples | Bid Goes Up By |
|-------------|---------|---------------|
| 2-Wheeler | Scooters, motorbikes (Honda Activa, Hero Splendor) | ₹500 per bid |
| 3-Wheeler | Autos, e-rickshaws (Bajaj RE, Piaggio Ape) | ₹1,000 per bid |
| 4-Wheeler | Cars, SUVs (Maruti Swift, Hyundai i20) | ₹2,000 per bid |

> 📌 **Example:** If a car's current bid is ₹2,42,000, the next bid must be exactly ₹2,44,000 (₹2,000 more). You cannot bid ₹2,43,000 or ₹2,45,000 — only the fixed increment is allowed.

### 1.5 What Does "Winning" Mean?

The buyer who places the highest bid when the auction timer runs out wins. They then pay that amount and receive the vehicle. Everyone else loses their bids and pays nothing.

### 1.6 Why Is Bidding Hard?

- A rival can outbid you at any moment — you need to respond quickly
- You might be bidding on several vehicles at the same time
- You can accidentally bid too high and overspend
- You might miss a bid because you were looking at another screen
- Auctions run for many minutes or hours — you can't stare at the screen the whole time

**This is exactly the problem Auto-Bid solves.**

---

<a id="part-2"></a>
## Part 2 — Two Types of Auctions on Ediig

### 2.1 Open Auction (Public Bidding)

In an Open Auction, every bid is visible to everyone. When you bid ₹90,000, the rival immediately sees it. When the rival bids ₹91,000, you immediately see it. It's like a live auction house where people raise their hands and call out numbers. Total transparency.

**Key Facts — Open Auction:**
- All bids are visible to all participants in real time
- Auto-Bid does **NOT** fire automatically (because everyone can see everything, strategy matters)
- You place each bid **manually** by pressing the Bid button
- You can optionally set a **Price Ceiling** — the system stops you from accidentally going above your limit

### 2.2 Closed Auction (Sealed Bidding)

In a Closed Auction (also called a Sealed Auction), nobody can see how much the rival bid. You only know that they bid — not the amount. The actual numbers are hidden until the auction is completely over.

Think of it like two people writing their offers on paper and sealing them in envelopes. The highest envelope wins, and only then are both amounts revealed.

**Key Facts — Closed Auction:**
- Rival's bid amount is hidden (shown as `•••••` on screen)
- You CAN see how many times the rival has bid
- Your own bid amount is always visible to you
- Auto-Bid works **fully** here — it responds to rival bids automatically
- Both amounts are revealed when the auction ends

### 2.3 Side-by-Side Comparison

| Feature | Open Auction | Closed Auction |
|---------|-------------|---------------|
| Rival bid amount visible? | Yes — everyone sees it | No — hidden as ••••• |
| Your bid amount visible to rival? | Yes | No — hidden |
| Auto-Bid fires automatically? | No — manual only | Yes — fires within 2 seconds |
| Price Ceiling available? | Yes — optional safety cap | Yes — called Max Bid |
| Bid history | Public live feed | Your bids visible; rival bids logged but sealed |
| Amounts revealed? | Always visible | Only at auction end |
| Strategy style | Reactive — you see and respond | Algorithmic — system responds for you |

---

<a id="part-3"></a>
## Part 3 — What Is Auto-Bid? (The Simple Version)

### 3.1 The Simple Explanation

Auto-Bid is your personal bidding assistant that sits in the auction and responds on your behalf — so you don't have to watch the screen every second.

You tell it two things:
- What's the maximum amount you're willing to pay? (Your absolute limit.)
- How many bids can it fire automatically before you take over?

That's it. The system does the rest.

### 3.2 A Real-Life Analogy

Imagine you're at an auction house but you have an urgent meeting. Before you leave, you write a note for a trusted colleague:

> *"I want that Maruti Swift. Keep bidding until ₹2,56,000. After that, stop. But I've written 10 bids on Post-it notes for you — use those first. I still have 5 bids I'll place myself when I'm back."*

Your colleague (Auto-Bid) follows these instructions exactly:
- Every time a rival bids, your colleague immediately responds with the next bid
- They never go above ₹2,56,000 — even if you could win by bidding ₹2,58,000
- Once all 10 Post-it bids are used, they stop and wait for you
- If someone bids ₹2,57,000 (above your limit), they tell you and stop

### 3.3 Three Problems Auto-Bid Solves

| Problem | Without Auto-Bid | With Auto-Bid |
|---------|-----------------|--------------|
| Attention | You must stare at the screen during the entire auction (often 30–60 minutes) | Set it up in 30 seconds. Walk away. System handles it. |
| Reaction speed | Manual bidding takes 5–15 seconds. You might miss the window. | Auto-bid fires within 2 seconds. Never too slow. |
| Accidental overspending | Under pressure, you might bid ₹20,000 more than you intended. | Hard limit enforced. System never exceeds your maximum. |

### 3.4 What Auto-Bid Does NOT Do

- Does NOT predict what the winning price will be
- Does NOT adjust your maximum bid intelligently — it follows your instruction exactly
- Does NOT work in Open Auctions (where all bids are public)
- Does NOT share your budget across multiple vehicles
- Does NOT send SMS or push notifications (coming in a future release)

### 3.5 Who Controls Auto-Bid?

You do, always. You can:
- **Pause** it at any time (reversible — you can resume)
- **Stop** it permanently at any time
- Place **manual bids** on top of what Auto-Bid has already done

> ⚠️ **Important:** Stopping a session is **permanent and cannot be undone**. Pausing is reversible.

---

<a id="part-4"></a>
## Part 4 — Who Is This For?

### Persona 1 — Active Dealer Buyer

| Attribute | Details |
|-----------|---------|
| Who they are | A used-car dealer who buys vehicles at auction to resell them |
| Bidding volume | 5 to 20 auction bids per week, across multiple vehicle classes |
| Main challenge | Running multiple auctions simultaneously — physically impossible to watch all of them |
| What they value | Speed, reliability, not missing a bid window |
| How Auto-Bid helps | Runs up to 15 auctions on autopilot, responds within 2 seconds, never misses a rival bid |

### Persona 2 — Fleet Procurement Manager

| Attribute | Details |
|-----------|---------|
| Who they are | A company sourcing vehicles in bulk — e.g. a logistics fleet operator |
| Bidding volume | 10 to 50 vehicles per month with strict per-unit budget ceilings |
| Main challenge | Staying within budget, having an audit trail of every bid for internal approval |
| What they value | Budget control, transparency, bid history log |
| How Auto-Bid helps | Hard max-bid ceiling, full bid history log, manual reserve for final approval bids |

---

<a id="part-5"></a>
## Part 5 — Your First Auto-Bid: Step by Step

### Step 1 — Open Live Auctions & Find a Vehicle

Open Ediig and land on the **Live Auctions** tab. Each card shows:
- Vehicle name, year, and class (2W / 3W / 4W)
- Lot number and the bank selling it
- Current highest bid and next required bid amount
- Time remaining
- Auction type: OPEN or CLOSED
- Status: LIVE (red pulse), UPCOMING (blue), or ENDED (grey)
- Vehicle specs: fuel, transmission, odometer, location

### Step 2 — Open the Setup Panel (Closed Auction)

Click the vehicle card. The card expands to reveal the Auto-Bid Setup Panel. Configure three things:

**A. Set Your Maximum Bid**
Type the highest amount you're willing to pay. Hard ceiling — system never exceeds this. The UI shows how many more bids of the fixed increment are possible from current bid to your maximum.

**B. Set Your Auto-Bid Pool**
Use the slider to set how many bids the system can fire automatically. Range: 1 to 15. Default: 10.

**C. Set Your Manual Reserve**
Use the second slider to set how many bids you keep for yourself. Minimum: 5.

### Step 3 — Understanding Bid Allocation

| Setting | Who Uses These | Example |
|---------|---------------|---------|
| Auto Pool: 10 | System fires automatically | Rival bids at 2:30 PM → system responds by 2:30:02 PM |
| Manual Reserve: 5 | You press manually | After pool runs out, you get 5 more chances to bid yourself |
| Total: 15 | Used so far | 5 bids still available to add to either pool |

> 💡 **Strategy tip:** Set your Auto Pool high (10-15) if you can't watch the screen. Keep Manual Reserve at the minimum (5) unless you want to manually control the endgame.

### Step 4 — Activate & Go

Click **"Activate Auto-Bid"**. From this moment:
- System monitors the auction in real time
- Every rival bid triggers an evaluation — if conditions pass, auto-bid fires within 2 seconds
- Toast notification appears each time a bid fires (auto-dismissed after 4.5 seconds)
- You can close the auction card or navigate away — session continues on server

### Step 5 — Open Auction (Different Flow)

For an Open Auction, there's no Auto-Bid to configure. You only set an optional **Price Ceiling**:
- If set: bid button is disabled when next required bid > your ceiling
- If not set: you can bid freely at any amount
- All bids visible to everyone — you must press the Bid button manually each time

---

<a id="part-6"></a>
## Part 6 — Every Screen Explained

### 6.1 The Three Tabs

| Tab | What It Shows | When to Use It |
|-----|--------------|---------------|
| Live Auctions | All current and upcoming auctions. Vehicle cards with setup panels. | Finding new vehicles, starting a new Auto-Bid session |
| My Bids | Bidder Battle view — your active sessions vs. rivals. Full bid history. | Monitoring ongoing sessions, placing manual bids, pausing/stopping |
| Simulator | Practice arena — test your strategy on a simulated auction. | Learning how Auto-Bid works before your first real auction |

### 6.2 Vehicle Card Elements (Live Auctions Tab)

| Element | What It Means |
|---------|--------------|
| Vehicle name + year | Make, model, and manufacturing year |
| Lot number | Unique ID assigned to this vehicle in the auction catalogue |
| Bank name | Which bank or financial institution is selling this vehicle |
| Current Bid | The highest bid placed so far by anyone |
| Next Bid Required | The exact amount needed to become the new highest bidder |
| Time Remaining | Countdown timer — when this hits zero, the auction closes |
| OPEN / CLOSED badge | Yellow = Sealed/Closed. Green = Open/Public. |
| LIVE / UPCOMING / ENDED | Red pulse = running now. Blue = not started yet. Grey = finished. |
| Vehicle specs chips | Fuel type, transmission, odometer reading, location city |

### 6.3 Auto-Bid Setup Panel — Complete Reference

| UI Element | Purpose | Notes |
|-----------|---------|-------|
| Current Bid box | Shows the bid you need to beat | Read-only |
| Next Bid Required | Shows exactly what your first bid will be | Always Current Bid + vehicle step |
| Step box | Fixed increment for this vehicle | ₹500 / ₹1,000 / ₹2,000 |
| Max Bid input | Your absolute maximum | Must be ≥ Current Bid + 1 step |
| "N bids possible" hint | How many bids fit between current and your max | Helps set realistic pool size |
| Auto-Bid Pool slider | Bids the system fires automatically | Range: 1–15. Default: 10. |
| Manual Reserve slider | Bids you keep for yourself | Range: 5 to (20 − auto pool) |
| Totals summary bar | Auto + Manual + Total + Remaining | Auto + Manual must be ≤ 20 |
| Activate button | Starts the session | Irreversible (but Pause/Stop available after) |

### 6.4 Bidder Battle (My Bids Tab)

**Your Side (Left):**

| Element | Meaning |
|---------|---------|
| Status badge | WINNING (green) / OUTBID (red) / PAUSED (amber) / STOPPED (grey) |
| Your current bid amount | Last bid placed (auto or manual) |
| Auto Bids Used counter | How many pool bids have been spent |
| Auto Bids Left counter | How many auto bids remain |
| Manual Bids Left counter | How many manual bids remain |
| Manual Bid button | Press to place one manual bid at next required amount |
| Pause button | Suspends auto-bid (reversible) |
| Resume button | Restarts auto-bid after pause |
| Stop button | Permanently ends the session — CANNOT be undone |

**Rival Side (Right):**

| Element | Meaning |
|---------|---------|
| Bid amount field | Shows `•••••` in Closed Auction. Shows exact amount in Open Auction. |
| Bid count | How many times the rival has bid — always visible |
| Status | Leading / Behind — relative to your current bid |

### 6.5 Bid History Log (Below Bidder Battle)

| Column | What It Shows |
|--------|--------------|
| Time | Exact timestamp |
| Type badge | AUTO (purple) / MANUAL (green) / RIVAL (red) / SYS (grey) |
| Bidder | Your name or "Rival" |
| Amount | Bid amount — rival amounts sealed until auction ends in closed auctions |
| Note | Plain-English explanation of why the bid was placed |

### 6.6 Simulator Tab

**Left Panel — Auction Room Feed:**  
Real-time message stream. Each message tagged AUTO / RIVAL / MANUAL / SYSTEM. Auto-scrolls to latest. Max 60 messages.

**Right Panel — Controls:**

| Control | What It Does |
|---------|-------------|
| Vehicle selector | Pick vehicle class to simulate |
| Speed control (0.5× / 1× / 2× / 5×) | Make the simulation run faster or slower |
| Session info panel | Your bid, max limit, auto bids used, manual bids left, status |
| Budget progress bar | Visual indicator of how close you are to your max |
| Manual Bid button | Place a manual bid during simulation |
| Stop Simulation button | End the simulated session |

### 6.7 Toast Notifications — All Types

| Toast Type | Colour | When It Appears | What It Means |
|-----------|--------|----------------|---------------|
| Auto-Bid Placed | Purple | System fires an auto bid | System placed a bid for you |
| You're Winning | Teal | Your bid makes you the top bidder | You are now the highest bidder |
| Outbid by Rival | Red | Rival surpasses your current bid | You've been overtaken |
| Max Limit Reached | Red | Next required bid exceeds your max | Auto-bid stopped — act manually |
| Auto Pool Exhausted | Amber | All auto bids used | Switch to manual — X bids remaining |
| Session Paused | Grey | You press Pause | Auto-bid off — rivals can outbid you |
| Session Stopped | Red | Session ends | Permanently ended — no more bids |

All toasts auto-dismiss after **4.5 seconds**. Max **3 visible** at once.

### 6.8 Colour Coding Reference

| Colour | Meaning | Where You'll See It |
|--------|---------|-------------------|
| Teal / Green (#0d9488) | Winning, active, positive | Winning badge, your bid amount, Activate button |
| Red (#ef4444) | Outbid, error, urgent | Rival badge, Outbid alert, Stop button |
| Amber (#d97706) | Warning, paused, caution | Paused badge, Pool Exhausted toast |
| Purple (#7c3aed) | Auto-bid action | Auto-bid tag, Auto Pool slider, Auto toast |
| Grey (#d1d5db) | Sealed, hidden, inactive | Sealed bid •••••, Stopped session |
| Blue (#38bdf8) | Information, navigation | Tab highlights, Upcoming badge |

---

<a id="part-7"></a>
## Part 7 — The Auto-Bid Session Lifecycle

### 7.1 All Session States

| State | What It Means | What Happens | Can It Change? |
|-------|--------------|--------------|---------------|
| IDLE / SETUP | Session not started | Buyer filling in the setup form | Yes — Activate or Cancel |
| ACTIVE | Session running | System watches, responds automatically | Yes — Pause (reversible) or Stop (irreversible) |
| PAUSED | Temporarily suspended | Auto-bid off; manual bids still available | Yes — Resume (→ Active) or Stop |
| STOPPED | Permanently ended | No more bids; final bid locked | No |
| ENDED (auction close) | Auction timer hit zero | All sessions auto-stop; amounts revealed | No |

### 7.2 When Does Auto-Bid Fire? (Decision Logic)

Every time a rival bids, the system checks four conditions in order:

| # | Condition | Checks | If True | If False |
|---|-----------|--------|---------|----------|
| 1 | Session Active? | Is session in Active state? | Continue | 🚫 Do nothing |
| 2 | Auto Pool Available? | Is autoBidsUsed < autoPool? | Continue | ⚠️ Alert: pool exhausted |
| 3 | Next Bid ≤ Max Bid? | Is (currentBid + step) ≤ maxBid? | Continue | 🚫 Alert: max limit reached |
| 4 | Rival Actually Higher? | Did rival surpass your current bid? | ✅ Fire within 2 seconds | — Already winning |

All four must be true for a bid to fire.

### 7.3 The Auto-Bid Fire Timeline

```
0.00s — Rival places sealed bid
0.00s — System detects rival bid event, starts evaluation
0.00–0.50s — Check: session Active? Pool > 0? Next bid ≤ max?
0.75s — Auto-bid placed (always ≤ 2s guarantee)
0.75s — "Auto-Bid Placed: ₹X" toast appears on your screen
5.25s — Toast auto-dismisses
```

---

<a id="part-8"></a>
## Part 8 — All Business Rules (Plain English)

### 8.1 Bid Limits

| Rule | Value | Explanation |
|------|-------|-------------|
| Maximum total bids per closed auction | 20 | Auto pool + manual reserve combined must not exceed 20 |
| Maximum auto-bid pool | 15 | System cannot fire more than 15 automatic bids |
| Minimum manual reserve | 5 | Always keep at least 5 bids for manual control |
| Minimum auto-bid pool | 1 | Must allocate at least 1 bid to the auto pool |
| Fixed increment — 2-Wheeler | ₹500 | Every bid on a scooter/motorbike |
| Fixed increment — 3-Wheeler | ₹1,000 | Every bid on an auto/e-rickshaw |
| Fixed increment — 4-Wheeler | ₹2,000 | Every bid on a car/SUV |

### 8.2 Max Bid Validation

| Scenario | System Behaviour |
|----------|----------------|
| Max bid < current bid + 1 step | Inline error shown. Activate button disabled. |
| Max bid = current bid + 1 step | Allowed. One auto-bid fires, then stops. |
| Max bid > current bid + 1 step | Normal operation. Multiple bids possible. |
| No max bid entered | Activate button stays disabled. Required field. |

### 8.3 Auto-Bid Fire Rules

| Condition | System Action |
|-----------|--------------|
| All conditions met | ✅ Auto-bid fires within 2 seconds |
| Session is Paused | ⚠️ No auto-bid — waits for Resume |
| Auto pool = 0 | ⚠️ Alert: pool exhausted, prompt manual bid |
| Next bid would exceed max | 🚫 Alert: max limit reached, auto-bid stops |
| Both pool and reserve = 0 | ⏹ Session auto-stops permanently |

### 8.4 Manual Bid Rules

| Condition | System Behaviour |
|-----------|----------------|
| Session Active + reserve > 0 | ✅ Bid placed, counter decrements |
| Session Paused | 🚫 Button disabled — "Resume session to place a manual bid" |
| Session Stopped | 🚫 Button disabled — session over |
| Manual reserve = 0 | 🚫 Button disabled — no bids remaining |

### 8.5 Session Control Rules

| Action | Rule | Reversible? |
|--------|------|------------|
| Pause | Available any time while Active | Yes — Resume restarts it |
| Resume | Available any time while Paused | Yes — can Pause again |
| Stop | Available any time | **No — permanent** |
| Auto-stop (pool exhausted) | Automatic when both pool and reserve = 0 | No |
| Auto-stop (auction close) | Automatic when auction timer = 0 | No |

### 8.6 Bid Visibility Rules (Sealed Auction)

| Information | During Auction | After Auction |
|------------|---------------|--------------|
| Your own bid amount | ✅ Always visible | ✅ Always |
| Rival's bid amount | 🔒 Hidden (•••••) | ✅ Revealed at end |
| Rival's bid count | ✅ Always visible | ✅ Always |
| Your bid history | ✅ Full log visible | ✅ Always |

---

<a id="part-9"></a>
## Part 9 — Edge Cases: What Happens When Things Go Wrong

| Scenario | What Triggers It | System Response | What You Should Do |
|----------|-----------------|-----------------|-------------------|
| Rival bids above your max limit | Rival's bid requires your response to exceed maxBid | "Max Limit Reached" toast. Auto-bid stops. | Place a manual bid above your max (if reserve remains), or accept defeat |
| Auto pool fully exhausted | All auto bids used | "Auto Pool Exhausted — X manual bids remaining" toast | Use manual reserve bids |
| Both pool and reserve exhausted | Every bid used | Session auto-stops. Final bid locked. | Nothing — wait for result |
| Max bid set too low | Entering a number below current bid + step | Inline validation error. Activate button disabled. | Increase max bid |
| Auction ends while session Active | Timer reaches zero | Session auto-stops. Sealed amounts revealed. | Review result |
| Rival never bids | Nobody outbids you after setup | Auto-bid never fires. Initial bid stands. | Nothing — you're winning |
| Manual bid attempted while Paused | Press Bid button while paused | Button disabled. Tooltip: "Resume session to place a manual bid" | Click Resume first |
| Rapid rival bids | Multiple rival bids in quick succession | System processes each sequentially, fires one auto-bid per event | Normal behaviour |
| Network disconnection | Internet drops during active session | UI shows last known state; reconciles on reconnect | Reconnect quickly; check bid history |
| Paused session when auction ends | Auction closes before user resumes | Session stops. Final bid = last bid before pausing. | Review result |

### 9.1 Frequently Asked Questions

**Q: Can I change my max bid after activating?**  
No. Max bid is locked once a session is Active. Stop the session and start a new one to change configuration.

**Q: Can I run Auto-Bid on two vehicles at the same time?**  
Yes — each session is independent. (Concurrency cap is an open question; see Part 11.)

**Q: What if I accidentally click Stop instead of Pause?**  
Cannot be undone. This is by design. The UI clearly differentiates Pause (amber, reversible) and Stop (red, permanent) to prevent this.

**Q: Does the rival know I have Auto-Bid running?**  
No. From the rival's perspective, they see a sealed bid from an anonymous bidder. They cannot tell if it was Auto-Bid or manual.

**Q: What if there are two rivals bidding against me?**  
Auto-Bid responds to any rival bid event regardless of which rival placed it. Each event triggers one evaluation cycle.

---

<a id="part-10"></a>
## Part 10 — Success Metrics

| Metric | Target (90 days post-launch) | Why It Matters |
|--------|------------------------------|----------------|
| Auto-Bid adoption rate (% of eligible sessions) | ≥ 40% | Shows buyers are finding and using the feature |
| Session completion rate | ≥ 80% | Sessions that start but produce no bids = usability problem |
| Auto-bid response latency (p95) | ≤ 2 seconds | Slow responses undermine trust |
| Budget overrun incidents | **0 (zero)** | Absolute guarantee — never exceed the buyer's max |
| Simulator usage before first live session | ≥ 30% | Reduces errors in real auctions |
| Support tickets related to Auto-Bid | < 5% of active sessions | High tickets = confusing UX or unhandled edge cases |

---

<a id="part-11"></a>
## Part 11 — Roadmap: What Comes Next

| Phase | What Gets Built | Why It Matters |
|-------|----------------|----------------|
| **M1 — Core Auto-Bid** (Current) | Closed auction auto-bid pool, manual reserve, pause/resume/stop, bid history | Foundation |
| **M2 — Open Auction Ceiling** | Price ceiling enforcement, outbid alerts, full open auction bid flow | Serves buyers in public auctions |
| **M3 — Simulator** | Strategy simulator with speed controls and message feed | Onboarding tool, reduces errors |
| **M4 — Notifications** | SMS, WhatsApp, and push for key events (outbid, pool exhausted, stopped) | Lets buyers truly walk away from the screen |
| **M5 — Export & Reporting** | Bid history export (CSV/PDF), session summary | Fleet procurement audit trails |

### Open Questions (Decisions Pending)

| Question | Why It Needs a Decision |
|----------|------------------------|
| Concurrent session limit — is there a cap on simultaneous Auto-Bid sessions? | No cap = potential runaway spend. A cap = fleet buyer frustration. |
| Bid increment flexibility — are increments fixed platform-wide or seller-configurable? | Custom increments change all setup panel calculations. |
| Rival identity — show anonymised ID or keep fully anonymous? | Anonymised ID helps buyers track a single rival across bids. |
| Paused session expiry — what happens if buyer never resumes before auction close? | Current assumption: session just stops. Should a warning be shown? |

---

<a id="part-12"></a>
## Part 12 — Glossary

| Term | Definition |
|------|-----------|
| Auction | A method of selling where buyers compete by offering money. Highest offer wins. |
| Auto-Bid | A feature that automatically places bids on your behalf when a rival bids, within limits you set. |
| Auto Pool | The number of bids you allocate for the system to fire automatically (max 15). |
| Bid | An offer to buy at a specific price. In an auction, bids go up, not down. |
| Bid History | A chronological log of every bid placed in a session. |
| Bid Increment | The fixed amount each new bid must be higher than the previous one. |
| Ceiling (Price Ceiling) | In open auctions, an optional limit — bid button disables when next bid would exceed it. |
| Closed Auction | An auction where bid amounts are hidden from all participants until auction ends. |
| Ediig | The vehicle auction platform where Auto-Bid runs. |
| Manual Reserve | Bids you keep for yourself (minimum 5). System cannot use these automatically. |
| Max Bid | The highest amount you are willing to pay. System never places a bid above this. |
| Open Auction | An auction where all bid amounts are visible to all participants in real time. |
| Outbid | Being surpassed by a rival — the rival's bid is now higher than yours. |
| Paused | Session state where auto-bid is temporarily suspended but can be resumed. |
| Rival | Another buyer competing in the same auction for the same vehicle. |
| Sealed Bid | A bid whose amount is hidden from all parties until auction ends. Used in Closed Auctions. |
| Session | One instance of Auto-Bid running for one vehicle in one auction. |
| Simulator | A practice environment that mimics a real auction — no real money, no consequences. |
| Stopped | Session state where the session has permanently ended. Cannot be reversed. |
| Toast | Small pop-up notification. Auto-dismisses after 4.5 seconds. Max 3 visible at once. |

---

*End of Document · Auto-Bid PRD v2.0 · Ediig Platform · Avinash Singh · June 2026*
