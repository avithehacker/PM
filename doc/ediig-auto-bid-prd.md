# PRD: Auto-Bid — Ediig Auction Platform

**Author:** Avinash Singh  
**Date:** 2026-05-30  
**Status:** Draft  
**Platform:** Ediig

---

## 1. Overview

Auto-Bid is a smart bidding assistant on Ediig that lets buyers participate in vehicle auctions without monitoring the screen continuously. Users set a maximum price and a bid allocation, and the system automatically responds to rival bids on their behalf — within their defined limits — for both sealed (closed) and public (open) auction formats.

---

## 2. Problem Statement

Buyers in vehicle auctions face a fundamental tension: auctions move fast and require constant attention, but buyers have other responsibilities. Missing a rival bid or failing to respond in time means losing a vehicle — often to a competitor who was simply more alert, not more willing to pay.

This creates three real pain points:

1. **Attention tax** — buyers must stay glued to the screen during active auctions, which is impractical in a dealer or fleet context.
2. **Reaction lag** — manual bidding under time pressure leads to mistakes (wrong amount, missed increment, delayed response).
3. **Strategic opacity** — buyers have no systematic way to pre-commit to a budget and let the system work within it.

Auto-Bid solves all three by separating the buyer's *intent* (maximum price, bid allocation) from their *presence* (watching the screen).

---

## 3. Goals

| Goal | Metric |
|------|--------|
| Increase buyer session completion rate | ≥ 80% of Auto-Bid sessions result in a final bid placed |
| Reduce time-to-bid on rival bid events | Auto-response fires within 2 seconds of rival bid |
| Reduce buyer drop-off due to attention fatigue | 30% reduction in abandoned sessions vs. manual bidding baseline |
| Give buyers budget confidence | ≥ 90% of sessions stay within user-defined max bid |

---

## 4. Non-Goals

- Real-time price prediction or AI-driven bid optimisation (future phase)
- Cross-auction budget pooling (bidding across multiple vehicles with one shared limit)
- Mobile push notification layer (future phase)
- Backend implementation spec (this is a product PRD, not a technical spec)

---

## 5. User Personas

**Primary — Active Dealer Buyer**  
Runs 5–20 auction bids per week across multiple vehicle classes. Monitors several auctions simultaneously. Values speed and reliability over sophistication. Cannot afford to watch each auction individually.

**Secondary — Fleet Procurement Manager**  
Sources vehicles in bulk with strict per-unit budget ceilings. Needs auditability — wants a log of every bid placed and why. Risk-averse; prefers capping auto-bids and reserving manual control for final bids.

---

## 6. Feature Description

### 6.1 Auction Types Supported

| Type | Bid Visibility | Auto-Bid Support |
|------|---------------|-----------------|
| **Closed (Sealed)** | Rival's amount hidden | Yes — full auto-bid pool |
| **Open (Public)** | All bids visible | Partial — ceiling enforcement only; bids placed manually |

### 6.2 Closed Auction — Auto-Bid Flow

#### Setup Phase
Before activating Auto-Bid, the buyer configures:

| Parameter | Range | Default | Rule |
|-----------|-------|---------|------|
| Max Bid | ≥ (current bid + 1 step) | — | Hard ceiling; system never exceeds this |
| Auto-Bid Pool | 1 – 15 | 10 | Bids the system fires automatically |
| Manual Reserve | 5 – (20 − auto pool) | 5 | Bids the buyer places manually |
| **Total** | ≤ 20 | — | Auto + Manual must not exceed 20 |

The UI shows in real time how many bid increments the max bid allows, helping buyers set realistic limits.

#### Active Phase
Once enabled, the session enters **Active** state. The system:

1. Monitors for rival bids.
2. On each rival bid that exceeds the buyer's current standing bid — if auto pool remains AND next bid would not exceed max bid — fires an automatic response bid within ≤ 2 seconds.
3. Each auto-bid increments by the fixed vehicle-class step (see §6.4).
4. If the rival bid would push the next required bid above the buyer's max — stops auto-bidding and notifies the buyer.
5. When auto pool is exhausted — surfaces a prompt for the buyer to place manual bids from their reserve.

#### Session States

| State | Behaviour |
|-------|-----------|
| **Active** | Auto-bid fires on rival bids; manual bid available when outbid |
| **Paused** | Auto-bid suspended; session preserved; manual bids still available |
| **Stopped** | Session ended permanently; cannot be resumed |

Pausing is reversible. Stopping is not. The UI makes this distinction explicit.

#### Bid Visibility (Sealed Auction)
- Buyer's own current bid: always visible.
- Rival's bid amount: hidden (shown as `•••••`) during the session.
- Rival's bid count: visible (so buyers know competitive pressure level).
- Both amounts revealed at session end or auction close.

### 6.3 Open Auction — Ceiling-Enforced Flow

#### Setup Phase
- Buyer optionally sets a price ceiling.
- If no ceiling set, buyer can bid freely at any time.

#### Active Phase
- All bids (buyer's and rivals') are publicly visible.
- Buyer places bids manually; system does not auto-fire.
- If buyer's ceiling is set and the next required bid exceeds it — bid button is disabled and shows "Max Ceiling Reached."
- Outbid alert shown in real time: "Outbid by ₹X — place a bid to take the lead."

### 6.4 Bid Increments by Vehicle Class

| Class | Fixed Increment |
|-------|----------------|
| 2-Wheeler | ₹500 |
| 3-Wheeler | ₹1,000 |
| 4-Wheeler | ₹2,000 |

Increments are fixed per class and cannot be changed by the buyer.

---

## 7. User Interface Requirements

### 7.1 Live Auctions Tab
- Vehicle cards display: current bid, next bid required, time remaining, auction type badge (OPEN / CLOSED), vehicle specs (fuel, transmission, odometer, color, location, bank, lot number).
- Filter by vehicle class (2W / 3W / 4W).
- Card is expandable — clicking the header reveals the Auto-Bid setup panel.
- Status indicators: LIVE (with pulse animation), UPCOMING, ENDED.

### 7.2 My Bids Tab
- **Bidder Battle** view: two-column layout showing buyer vs. rival.
  - Buyer card: status badge (WATCHING / WINNING / OUTBID), current bid, session controls (Pause / Resume / Stop), manual bid button with remaining count.
  - Rival card: sealed amount for closed auctions, exact amount for open auctions, bid count placed.
- **Bid History Table**: chronological log — columns: Time, Vehicle, Bidder (AUTO / MANUAL / RIVAL / SYS), Amount, Note. Sorted newest-first.
- Active session count badge on tab.

### 7.3 Simulator Tab
- Left panel: live auction room feed (message stream with RIVAL / AUTO / MANUAL / SYSTEM tags, timestamps, amounts).
- Right panel: vehicle selector, speed control (0.5x / 1x / 2x / 5x), session info, Start/Stop simulation, manual bid placement.
- Enables buyers to test strategies before participating in a real auction.
- Message feed capped at 60 items; auto-scrolls to latest.

### 7.4 Visual States & Feedback

| State | Colour |
|-------|--------|
| Winning / active | Teal (#0d9488) |
| Outbid / error | Red (#c0392b) |
| Paused / warning | Amber (#d97706) |
| Auto-bid action | Purple (#7c3aed) |
| Sealed / hidden | Gray (#d1d5db) |

- Toast notifications for every significant event (bid placed, outbid, pool exhausted, session stopped). Auto-dismiss after 4.5 seconds. Max stack of 3 visible at once.
- Pulse animation on live status dot.
- Responsive: cards stack at < 640px; simulator collapses at < 900px.

---

## 8. Business Rules Summary

| Rule | Value |
|------|-------|
| Max total bids per closed auction | 20 |
| Max auto-bid pool | 15 |
| Min manual reserve | 5 |
| Auto-fire condition | Auto pool > 0 AND next bid ≤ max bid AND session Active |
| Manual bid condition | Outbid AND manual bids remain AND session Active (not Paused) |
| Open auction auto-bid | Not supported — buyer bids manually |
| Open auction ceiling | Optional; disables bid button when hit |
| Stop session | Irreversible |
| Pause session | Reversible; manual bids still available while paused |
| Max bid validation | Must be ≥ current bid + 1 step |

---

## 9. Data Model (Logical)

```
Vehicle
  id, vehicleClass (2W/3W/4W), make, model, year
  fuel, transmission, odometer, color, location
  bank, lot, auctionType (open/closed)
  reservePrice, currentBid, bidStep
  timeLeft, status (live/upcoming/ended)

BidSession
  sessionId, vehicleId, buyerId
  status (idle/active/paused/stopped)
  mode (auto/open)
  maxBid, openCeiling
  autoPool, manualReserve
  autoBidsUsed, manualBidsUsed
  currentBid, rivalBidCount
  createdAt, updatedAt

BidEvent
  eventId, sessionId, vehicleId
  type (auto/manual/rival/system)
  bidder
  amount (nullable for sealed rival bids)
  note
  timestamp
```

---

## 10. Edge Cases & Error Handling

| Scenario | System Behaviour |
|----------|-----------------|
| Rival bid pushes next step above max bid | Stop auto-bid; notify buyer with "Max Limit Reached" toast |
| Auto pool exhausted, manual bids remain | Show "Auto Pool Exhausted — X manual bids remaining" alert |
| Both auto pool and manual reserve exhausted | Session auto-stops; final outcome shown |
| Buyer tries to set max bid below current bid + step | Validation error inline; enable button disabled |
| Auction ends while session is Active | Session transitions to Stopped; outcome displayed |
| Buyer tries to place manual bid while session Paused | Manual bid button disabled; tooltip: "Resume session to place a manual bid" |
| Network drop during active session | UI shows last known state; on reconnect, reconcile with server state |

---

## 11. Success Metrics (Post-Launch)

| Metric | Target (90 days post-launch) |
|--------|------------------------------|
| Auto-Bid adoption rate (% of eligible sessions) | ≥ 40% |
| Session completion rate | ≥ 80% |
| Auto-bid response latency (p95) | ≤ 2 seconds |
| Budget overrun incidents | 0 (system must never exceed max bid) |
| Simulator usage before first live session | ≥ 30% of new Auto-Bid users |
| Support tickets related to Auto-Bid | < 5% of active Auto-Bid sessions |

---

## 12. Open Questions

1. **Concurrent auctions** — Should a buyer be able to run Auto-Bid sessions on more than one vehicle simultaneously? If yes, is there a cap?
2. **Bid increment flexibility** — Are the per-class increments fixed on Ediig, or does the platform allow variable increments set by the seller?
3. **Rival identity** — In closed auctions, should Ediig show the rival's anonymised ID or keep them fully anonymous?
4. **Notification layer** — Should outbid and pool-exhausted events trigger SMS/WhatsApp/push in addition to in-app toasts?
5. **Audit trail** — Does the Fleet Procurement persona need to export bid history (CSV/PDF) for internal reporting?
6. **Session expiry** — What happens to a paused session if the buyer does not return before auction close?

---

## 13. Milestones

| Phase | Scope | Target |
|-------|-------|--------|
| **M1 — Core Auto-Bid** | Closed auction auto-bid pool, manual reserve, pause/resume/stop, bid history | TBD |
| **M2 — Open Auction Ceiling** | Ceiling enforcement, outbid alerts, open auction bid flow | TBD |
| **M3 — Simulator** | Strategy simulator with speed controls and message feed | TBD |
| **M4 — Notifications** | SMS/WhatsApp/push for key events | TBD |
| **M5 — Export & Reporting** | Bid history export, session summary | TBD |
