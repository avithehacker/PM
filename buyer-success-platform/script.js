/* ═══════════════════════════════════════════════
   BuyerPulse — script.js  |  Step 3: Side Drawer
═══════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════
   MOCK DATA — Buyers
══════════════════════════════════════════════ */

const MOCK_BUYERS = [
  { id:  1, name: 'Shriram Automall India',    city: 'Mumbai',        status: 'Active',    score: 88, emd: 250000, lastActive: '2026-05-15', risk: 'Low'      },
  { id:  2, name: 'Mahindra First Choice',     city: 'Delhi',         status: 'Active',    score: 74, emd: 125000, lastActive: '2026-05-14', risk: 'Medium'   },
  { id:  3, name: 'Vinayak Motors Pvt. Ltd.',  city: 'Bangalore',     status: 'Watchlist', score: 44, emd: 50000,  lastActive: '2026-05-10', risk: 'High'     },
  { id:  4, name: 'Sunder Enterprises',        city: 'Chennai',       status: 'Suspended', score: 31, emd: 0,      lastActive: '2026-04-28', risk: 'Critical' },
  { id:  5, name: 'Balaji Vehicle Traders',    city: 'Hyderabad',     status: 'Active',    score: 91, emd: 400000, lastActive: '2026-05-15', risk: 'Low'      },
  { id:  6, name: 'Deccan Auto Dealers',       city: 'Pune',          status: 'Active',    score: 83, emd: 175000, lastActive: '2026-05-13', risk: 'Low'      },
  { id:  7, name: 'Priya Logistics Pvt.',      city: 'Kolkata',       status: 'Watchlist', score: 38, emd: 25000,  lastActive: '2026-05-08', risk: 'Critical' },
  { id:  8, name: 'Ganesh Motor Works',        city: 'Ahmedabad',     status: 'Active',    score: 62, emd: 90000,  lastActive: '2026-05-12', risk: 'Medium'   },
  { id:  9, name: 'Rajputana Fleet Solutions', city: 'Jaipur',        status: 'Active',    score: 55, emd: 70000,  lastActive: '2026-05-11', risk: 'Medium'   },
  { id: 10, name: 'Delta Auto Finance',        city: 'Surat',         status: 'Active',    score: 79, emd: 160000, lastActive: '2026-05-15', risk: 'Low'      },
  { id: 11, name: 'Sharma Brothers Motors',    city: 'Lucknow',       status: 'Inactive',  score: 48, emd: 30000,  lastActive: '2026-04-20', risk: 'High'     },
  { id: 12, name: 'Tata Motors Dealers Ltd.',  city: 'Nagpur',        status: 'Active',    score: 86, emd: 300000, lastActive: '2026-05-14', risk: 'Low'      },
  { id: 13, name: 'Narmada Vehicle Hub',       city: 'Indore',        status: 'Watchlist', score: 41, emd: 15000,  lastActive: '2026-05-05', risk: 'High'     },
  { id: 14, name: 'Agarwal Auto Traders',      city: 'Bhopal',        status: 'Active',    score: 93, emd: 500000, lastActive: '2026-05-15', risk: 'Low'      },
  { id: 15, name: 'Bihar Transport Corp.',     city: 'Patna',         status: 'Active',    score: 67, emd: 80000,  lastActive: '2026-05-13', risk: 'Medium'   },
  { id: 16, name: 'Patel Motors & Auctions',   city: 'Vadodara',      status: 'Suspended', score: 22, emd: 0,      lastActive: '2026-04-05', risk: 'Critical' },
  { id: 17, name: 'Utkal Auto Pvt. Ltd.',      city: 'Bhubaneswar',   status: 'Active',    score: 71, emd: 110000, lastActive: '2026-05-12', risk: 'Medium'   },
  { id: 18, name: 'Punjab Auto Syndicate',     city: 'Chandigarh',    status: 'Active',    score: 82, emd: 200000, lastActive: '2026-05-14', risk: 'Low'      },
  { id: 19, name: 'Coimbatore Vehicle Mart',   city: 'Coimbatore',    status: 'Watchlist', score: 36, emd: 10000,  lastActive: '2026-05-03', risk: 'Critical' },
  { id: 20, name: 'Kerala Auto Exchange',      city: 'Kochi',         status: 'Active',    score: 89, emd: 450000, lastActive: '2026-05-15', risk: 'Low'      },
  { id: 21, name: 'Brahmaputra Fleet Co.',     city: 'Guwahati',      status: 'Inactive',  score: 52, emd: 40000,  lastActive: '2026-04-15', risk: 'Medium'   },
  { id: 22, name: 'Vizag Motors Pvt. Ltd.',    city: 'Visakhapatnam', status: 'Active',    score: 76, emd: 140000, lastActive: '2026-05-13', risk: 'Low'      },
  { id: 23, name: 'Saurashtra Auto Traders',   city: 'Rajkot',        status: 'Watchlist', score: 43, emd: 20000,  lastActive: '2026-05-07', risk: 'High'     },
  { id: 24, name: 'Mysuru Royal Automobiles',  city: 'Mysore',        status: 'Active',    score: 85, emd: 280000, lastActive: '2026-05-14', risk: 'Low'      },
  { id: 25, name: 'Doon Valley Motors',        city: 'Dehradun',      status: 'Active',    score: 58, emd: 65000,  lastActive: '2026-05-11', risk: 'Medium'   },
];

/* ══════════════════════════════════════════════
   MOCK DATA — Extended (drawer content)
══════════════════════════════════════════════ */

const MANAGERS      = ['Rahul Mehta', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Joshi'];
const MEMBER_DATES  = ['Jan 2021', 'Mar 2022', 'Jul 2020', 'Nov 2023', 'May 2019', 'Aug 2022', 'Feb 2021', 'Oct 2023'];
const EMAIL_DOMAINS = ['autodealer.in', 'fleetco.com', 'bidders.in', 'vehicles.co.in', 'motors.com'];
const PHONES        = [
  '+91 98201 45678', '+91 97318 23456', '+91 96745 67890',
  '+91 95623 34560', '+91 94512 23456', '+91 93401 12345',
  '+91 92387 56789', '+91 91256 78901', '+91 90145 89012',
  '+91 89034 90120', '+91 88923 01234', '+91 87812 12340',
  '+91 86701 23456', '+91 85690 34567', '+91 84589 45678',
  '+91 83478 56789', '+91 82367 67890', '+91 81256 78901',
  '+91 80145 89012', '+91 79034 90123', '+91 78923 01234',
  '+91 77812 12345', '+91 76701 23456', '+91 75690 34567',
  '+91 74589 45678',
];

const BID_LOTS    = ['Lot #4421', 'Lot #4389', 'Lot #4401', 'Lot #4512', 'Lot #4298', 'Lot #4633', 'Lot #4710', 'Lot #4195'];
const BID_AUCTIONS= ['Mumbai Fleet Sale', 'Delhi NCR Auction', 'Bangalore Auto Fair', 'Chennai Repossession', 'Hyderabad Bulk Sale', 'Pune Commercial Lots', 'Kolkata Fleet Drive'];
const BID_RESULTS = ['Won', 'Lost', 'Won', 'Outbid', 'Won', 'Lost', 'Withdrawn', 'Won'];

const FU_TYPES    = ['Call', 'Email', 'Meeting', 'Note', 'Call', 'Email'];
const FU_DESCS    = [
  'Discussed pending EMD top-up. Buyer confirmed deposit within 3 business days.',
  'Sent payment reminder for 2 overdue invoices totalling ₹1,25,000.',
  'Completed onboarding call. Buyer is familiar with the platform and keen on fleet segment.',
  'Health score flagged — 3 consecutive no-shows in auction. Sent formal warning communication.',
  'Introduced buyer to new lot category: commercial vehicles registered post-2020.',
  'Escalated non-payment issue to finance team. Account placed on temporary hold.',
  'Bid coaching session completed. Buyer now uses auto-bid feature for 5+ lots per cycle.',
  'Quarterly account review completed. Buyer satisfied; requested higher per-lot bid limit.',
];

const PAY_STATUSES = ['Paid', 'Pending', 'Overdue', 'Paid', 'Partially Paid', 'Paid', 'Pending', 'Overdue'];

const NOTE_TEXTS   = [
  'Priority account — consistently active in fleet and commercial vehicle lots. High retention value.',
  'EMD balance running low. Flag for top-up reminder before next auction cycle begins.',
  'Health score declined due to 2 consecutive no-shows in last 30 days. Monitor closely.',
  'Strong buyer interest in LCVs and pre-owned fleet vehicles (2019–2022 range).',
  'KYC re-verification pending since April. Legal hold: do not activate bid permissions.',
  'Account manager changed from Priya Sharma to Rahul Mehta effective 1 Apr 2026.',
  'Buyer requested bulk bidding access for Lot #4400 series. Approval pending from ops.',
];

/* Fixed "today" for consistent mock date calculations */
const TODAY = new Date('2026-05-15');

function getRecentDate(daysAgo) {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* Generates consistent extended data for any buyer based on their ID */
function getBuyerExtended(buyer) {
  const id = buyer.id;

  // Contact
  const firstName   = buyer.name.toLowerCase().replace(/[^a-z\s]/g, '').trim().split(' ')[0];
  const email       = `${firstName}@${EMAIL_DOMAINS[id % EMAIL_DOMAINS.length]}`;
  const totalBids   = 50 + id * 23 + (id * 7) % 80;
  const wonAuctions = 8  + id * 3  + (id * 5) % 15;

  const contact = {
    email,
    phone:       PHONES[(id - 1) % PHONES.length],
    manager:     MANAGERS[id % MANAGERS.length],
    memberSince: MEMBER_DATES[id % MEMBER_DATES.length],
    totalBids,
    wonAuctions,
    winRate:     Math.round((wonAuctions / totalBids) * 100),
  };

  // Bidding Activity
  const bidCount = 4 + (id % 3);
  const bids = Array.from({ length: bidCount }, (_, i) => ({
    lot:     BID_LOTS[(id + i) % BID_LOTS.length],
    auction: BID_AUCTIONS[(id + i * 2) % BID_AUCTIONS.length],
    amount:  90000 + ((id * 7 + i * 13) % 50) * 5000,
    date:    getRecentDate(i * 5 + (id % 7)),
    result:  BID_RESULTS[(id + i) % BID_RESULTS.length],
  }));

  // Follow-ups
  const fuCount  = 3 + (id % 3);
  const followUps = Array.from({ length: fuCount }, (_, i) => ({
    type: FU_TYPES[(id + i) % FU_TYPES.length],
    text: FU_DESCS[(id + i) % FU_DESCS.length],
    by:   MANAGERS[(id + i * 2) % MANAGERS.length],
    date: getRecentDate(i * 8 + (id % 5) + 1),
  }));

  // Payments — mix of past-due and upcoming
  const payments = Array.from({ length: 3 }, (_, i) => ({
    invoice: `INV-2026-${1000 + id * 10 + i}`,
    amount:  50000 + ((id * 5 + i * 11) % 10) * 25000,
    due:     getRecentDate(5 - i * 15 - (id % 10)),
    status:  PAY_STATUSES[(id + i) % PAY_STATUSES.length],
  }));

  // Notes
  const noteCount = 1 + (id % 3);
  const notes = Array.from({ length: noteCount }, (_, i) => ({
    text: NOTE_TEXTS[(id + i) % NOTE_TEXTS.length],
    by:   MANAGERS[(id + i) % MANAGERS.length],
    date: getRecentDate(i * 12 + (id % 15) + 3),
  }));

  return { contact, bids, followUps, payments, notes };
}

/* ══════════════════════════════════════════════
   DRAWER STATE
══════════════════════════════════════════════ */

const drawerState = { buyerId: null, tab: 'details' };

/* ══════════════════════════════════════════════
   DRAWER — Open / Close
══════════════════════════════════════════════ */

function openDrawer(buyerId) {
  const buyer = MOCK_BUYERS.find(b => b.id === buyerId);
  if (!buyer) return;

  const ext    = getBuyerExtended(buyer);
  const drawer = document.getElementById('buyerDrawer');

  drawerState.buyerId = buyerId;
  drawerState.tab     = 'details';

  // Highlight selected row (deselect others)
  document.querySelectorAll('#buyerTableBody tr').forEach(tr => tr.classList.remove('row-selected'));
  const selectedRow = document.querySelector(`#buyerTableBody tr[data-id="${buyerId}"]`);
  if (selectedRow) selectedRow.classList.add('row-selected');

  // Header
  document.getElementById('drawerAvatar').textContent = getInitials(buyer.name);
  document.getElementById('drawerName').textContent   = buyer.name;
  document.getElementById('drawerMeta').textContent   = `${buyer.city} · Member since ${ext.contact.memberSince}`;

  // Score strip
  renderDrawerStrip(buyer);

  // Reset tabs to Details
  document.querySelectorAll('.dtab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'details'));

  // Render content
  document.getElementById('drawerBody').innerHTML = renderDetailsTab(buyer, ext);
  document.getElementById('drawerBody').scrollTop = 0;

  // Open (skip re-animation if already open)
  const alreadyOpen = drawer.classList.contains('open');
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.getElementById('drawerOverlay').classList.add('open');
  if (!alreadyOpen) document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('buyerDrawer').classList.remove('open');
  document.getElementById('buyerDrawer').setAttribute('aria-hidden', 'true');
  document.getElementById('drawerOverlay').classList.remove('open');
  document.body.style.overflow = '';

  document.querySelectorAll('#buyerTableBody tr').forEach(tr => tr.classList.remove('row-selected'));
  drawerState.buyerId = null;
}

/* ══════════════════════════════════════════════
   DRAWER — Score Strip
══════════════════════════════════════════════ */

function renderDrawerStrip(buyer) {
  const si  = scoreInfo(buyer.score);
  const emd = formatEMD(buyer.emd);

  document.getElementById('drawerStrip').innerHTML = `
    <div class="dstrip-item">
      <span class="dstrip-label">Health Score</span>
      <span class="score-badge ${si.cls}">${buyer.score}</span>
    </div>
    <div class="dstrip-divider"></div>
    <div class="dstrip-item">
      <span class="dstrip-label">EMD Balance</span>
      <span class="dstrip-value">${emd || '—'}</span>
    </div>
    <div class="dstrip-divider"></div>
    <div class="dstrip-item">
      <span class="dstrip-label">Risk Level</span>
      <span class="risk-badge ${riskClass(buyer.risk)}">${buyer.risk}</span>
    </div>
  `;
}

/* ══════════════════════════════════════════════
   TAB RENDERERS
══════════════════════════════════════════════ */

function renderDetailsTab(buyer, ext) {
  const { contact } = ext;
  return `
    <div class="drawer-section">
      <h4 class="drawer-section-title">Contact Information</h4>
      <div class="detail-list">
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">${contact.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone</span>
          <span class="detail-value">${contact.phone}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Account Manager</span>
          <span class="detail-value">${contact.manager}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Member Since</span>
          <span class="detail-value">${contact.memberSince}</span>
        </div>
      </div>
    </div>

    <div class="drawer-section">
      <h4 class="drawer-section-title">Account Overview</h4>
      <div class="detail-list">
        <div class="detail-row">
          <span class="detail-label">Total Bids Placed</span>
          <span class="detail-value">${contact.totalBids}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Auctions Won</span>
          <span class="detail-value">${contact.wonAuctions}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Win Rate</span>
          <span class="detail-value">${contact.winRate}%</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Current Status</span>
          <span class="detail-value">
            <span class="status-badge ${statusClass(buyer.status)}">${buyer.status}</span>
          </span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Last Active</span>
          <span class="detail-value">${relativeTime(buyer.lastActive).label}</span>
        </div>
      </div>
    </div>
  `;
}

function renderActivityTab(buyer, ext) {
  const resultCls = {
    Won: 'result-won', Lost: 'result-lost',
    Outbid: 'result-outbid', Withdrawn: 'result-withdrawn',
  };

  return `
    <div class="drawer-section">
      <h4 class="drawer-section-title">Recent Bidding Activity</h4>
      <div class="activity-list-d">
        ${ext.bids.map(bid => `
          <div class="activity-entry">
            <div class="activity-result">
              <span class="result-badge ${resultCls[bid.result] || 'result-lost'}">${bid.result}</span>
            </div>
            <div class="activity-info">
              <div class="activity-lot">${bid.lot}</div>
              <div class="activity-auc-name">${bid.auction}</div>
            </div>
            <div class="activity-meta">
              <div class="activity-amount">₹${bid.amount.toLocaleString('en-IN')}</div>
              <div class="activity-date">${bid.date}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// SVG icons for timeline types
const TL_ICONS = {
  Call: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.08 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>`,
  Email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  Meeting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  Note: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
};
const TL_CLS = { Call: 'tl-call', Email: 'tl-email', Meeting: 'tl-meeting', Note: 'tl-note' };

function renderFollowUpsTab(buyer, ext) {
  return `
    <div class="drawer-section">
      <h4 class="drawer-section-title">Follow-Up History</h4>
      <div class="timeline">
        ${ext.followUps.map(fu => {
          const cls  = TL_CLS[fu.type]  || 'tl-note';
          const icon = TL_ICONS[fu.type] || TL_ICONS.Note;
          return `
            <div class="timeline-item">
              <div class="timeline-left">
                <div class="timeline-dot ${cls}">${icon}</div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-body">
                <div class="timeline-top">
                  <span class="timeline-type">${fu.type}</span>
                  <span class="timeline-date">${fu.date}</span>
                </div>
                <p class="timeline-text">${fu.text}</p>
                <div class="timeline-by">by ${fu.by}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderPaymentsTab(buyer, ext) {
  const payCls = {
    Paid:            'pstatus-paid',
    Pending:         'pstatus-pending',
    Overdue:         'pstatus-overdue',
    'Partially Paid':'pstatus-partial',
  };

  return `
    <div class="drawer-section">
      <h4 class="drawer-section-title">Invoice History</h4>
      <div class="payment-list">
        ${ext.payments.map(p => `
          <div class="payment-item">
            <div>
              <div class="payment-invoice">${p.invoice}</div>
              <div class="payment-due">Due: ${p.due}</div>
            </div>
            <div class="payment-right">
              <div class="payment-amount">₹${p.amount.toLocaleString('en-IN')}</div>
              <span class="pay-badge ${payCls[p.status] || 'pstatus-pending'}">${p.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="drawer-section">
      <h4 class="drawer-section-title">EMD Account</h4>
      <div class="detail-list">
        <div class="detail-row">
          <span class="detail-label">Current Balance</span>
          <span class="detail-value">${formatEMD(buyer.emd) || '—'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Minimum Required</span>
          <span class="detail-value">₹25,000</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Account Status</span>
          <span class="detail-value">
            ${buyer.emd >= 25000
              ? '<span class="chip chip-green">Sufficient</span>'
              : '<span class="chip chip-red">Below Minimum</span>'}
          </span>
        </div>
      </div>
    </div>
  `;
}

function renderNotesTab(buyer, ext) {
  return `
    <div class="drawer-section">
      <h4 class="drawer-section-title">Internal Notes</h4>
      <div class="notes-list">
        ${ext.notes.map(n => `
          <div class="note-card">
            <p class="note-text">${n.text}</p>
            <div class="note-meta">
              <span class="note-author">${n.by}</span>
              <span class="note-date">${n.date}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ══════════════════════════════════════════════
   DRAWER — Init
══════════════════════════════════════════════ */

function initDrawer() {
  // Close button
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);

  // Overlay click to close
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawerState.buyerId !== null) closeDrawer();
  });

  // Tab switching
  document.getElementById('drawerTabs').addEventListener('click', e => {
    const tab = e.target.closest('.dtab');
    if (!tab || drawerState.buyerId === null) return;

    const tabId = tab.dataset.tab;
    if (tabId === drawerState.tab) return; // already active

    const buyer = MOCK_BUYERS.find(b => b.id === drawerState.buyerId);
    if (!buyer) return;

    const ext  = getBuyerExtended(buyer);
    const body = document.getElementById('drawerBody');

    document.querySelectorAll('.dtab').forEach(t => t.classList.toggle('active', t === tab));
    drawerState.tab = tabId;

    const renderers = {
      details:  () => renderDetailsTab(buyer, ext),
      activity: () => renderActivityTab(buyer, ext),
      followups:() => renderFollowUpsTab(buyer, ext),
      payments: () => renderPaymentsTab(buyer, ext),
      notes:    () => renderNotesTab(buyer, ext),
    };

    body.innerHTML = (renderers[tabId] || renderers.details)();
    body.scrollTop = 0;
  });
}

/* ══════════════════════════════════════════════
   FILTER STATE
══════════════════════════════════════════════ */

const filterState = {
  search:  '',
  risk:    'all',
  page:    1,
  perPage: 10,
};

/* ══════════════════════════════════════════════
   FILTERING LOGIC
   ─────────────────────────────────────────────
   Pipeline: MOCK_BUYERS → applyFilters() → paginateData() → renderTable()

   1. SEARCH: buyer.name OR buyer.city contains query (case-insensitive). Empty = no-op.
   2. RISK:   buyer.risk === filterState.risk (exact). 'all' = no-op.
   3. Both filters are ANDed — a row must pass both to be included.
   4. Any change resets page → 1 so user lands at top of new result set.
══════════════════════════════════════════════ */

function applyFilters() {
  const q    = filterState.search.trim().toLowerCase();
  const risk = filterState.risk;

  return MOCK_BUYERS.filter(buyer => {
    const matchesSearch = !q
      || buyer.name.toLowerCase().includes(q)
      || buyer.city.toLowerCase().includes(q);

    const matchesRisk = risk === 'all' || buyer.risk === risk;

    return matchesSearch && matchesRisk;
  });
}

function paginateData(data) {
  const { page, perPage } = filterState;
  const totalCount = data.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const safePage   = Math.min(Math.max(1, page), totalPages);
  const start      = (safePage - 1) * perPage;
  return { rows: data.slice(start, start + perPage), totalPages, totalCount, safePage };
}

/* ══════════════════════════════════════════════
   FORMATTERS (shared by table + drawer)
══════════════════════════════════════════════ */

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function formatEMD(amount) {
  return amount ? '₹' + amount.toLocaleString('en-IN') : null;
}

function relativeTime(dateStr) {
  const diff = Math.floor((TODAY - new Date(dateStr)) / 86400000);
  if (diff === 0)  return { label: 'Today',                   cls: 'today'  };
  if (diff === 1)  return { label: 'Yesterday',               cls: 'recent' };
  if (diff <= 7)   return { label: `${diff}d ago`,            cls: 'recent' };
  if (diff <= 30)  return { label: `${Math.floor(diff/7)}w ago`, cls: 'stale' };
  return               { label: `${Math.floor(diff/30)}mo ago`, cls: 'old'   };
}

function scoreInfo(score) {
  if (score >= 80) return { cls: 'score-healthy', fillCls: 'fill-healthy' };
  if (score >= 60) return { cls: 'score-good',    fillCls: 'fill-good'    };
  if (score >= 40) return { cls: 'score-fair',    fillCls: 'fill-fair'    };
  return                   { cls: 'score-poor',   fillCls: 'fill-poor'    };
}

function statusClass(status) {
  return { Active: 'status-active', Inactive: 'status-inactive', Watchlist: 'status-watchlist', Suspended: 'status-suspended' }[status] || 'status-inactive';
}

function riskClass(risk) {
  return { Low: 'risk-low', Medium: 'risk-medium', High: 'risk-high', Critical: 'risk-critical' }[risk] || 'risk-low';
}

/* ══════════════════════════════════════════════
   RENDER — Table
══════════════════════════════════════════════ */

function renderRow(buyer) {
  const initials = getInitials(buyer.name);
  const emd      = formatEMD(buyer.emd);
  const time     = relativeTime(buyer.lastActive);
  const si       = scoreInfo(buyer.score);
  const seed     = buyer.id % 5;

  return `
    <tr data-id="${buyer.id}">
      <td>
        <div class="buyer-cell">
          <div class="buyer-avatar" data-seed="${seed}">${initials}</div>
          <div>
            <div class="buyer-name">${buyer.name}</div>
            <div class="buyer-city">${buyer.city}</div>
          </div>
        </div>
      </td>
      <td><span class="status-badge ${statusClass(buyer.status)}">${buyer.status}</span></td>
      <td>
        <div class="score-wrap">
          <span class="score-badge ${si.cls}">${buyer.score}</span>
          <div class="score-bar-track">
            <div class="score-bar-fill ${si.fillCls}" style="width:${buyer.score}%"></div>
          </div>
        </div>
      </td>
      <td>${emd ? `<span class="emd-value">${emd}</span>` : `<span class="emd-zero">—</span>`}</td>
      <td><span class="last-active ${time.cls}">${time.label}</span></td>
      <td><span class="risk-badge ${riskClass(buyer.risk)}">${buyer.risk}</span></td>
    </tr>
  `;
}

function renderTable(rows) {
  const tbody   = document.getElementById('buyerTableBody');
  const emptyEl = document.getElementById('tableEmptyState');
  const tableEl = document.getElementById('buyerTable');

  if (!rows.length) {
    tbody.innerHTML = '';
    tableEl.style.display = 'none';
    emptyEl.classList.add('visible');
    return;
  }

  tableEl.style.display = '';
  emptyEl.classList.remove('visible');
  tbody.innerHTML = rows.map(renderRow).join('');

  // Re-highlight if drawer is open for a buyer visible on this page
  if (drawerState.buyerId !== null) {
    const row = tbody.querySelector(`tr[data-id="${drawerState.buyerId}"]`);
    if (row) row.classList.add('row-selected');
  }
}

function renderSummary(totalCount) {
  const el = document.getElementById('resultsSummary');
  if (!el) return;

  const { search, risk } = filterState;
  const parts = [];
  if (search) parts.push(`"${search}"`);
  if (risk !== 'all') parts.push(`Risk: ${risk}`);

  el.innerHTML = parts.length
    ? `<strong>${totalCount}</strong> result${totalCount !== 1 ? 's' : ''} for ${parts.join(', ')}`
    : `Showing <strong>${totalCount}</strong> buyers`;

  const subtitle = document.getElementById('buyerSubtitle');
  if (subtitle) subtitle.textContent = `${MOCK_BUYERS.length} buyers in your portfolio`;
}

function renderPagination(totalPages, currentPage, totalCount) {
  const infoEl     = document.getElementById('paginationInfo');
  const controlsEl = document.getElementById('paginationControls');
  const barEl      = document.getElementById('paginationBar');
  if (!infoEl || !controlsEl) return;

  barEl.style.display = totalCount === 0 ? 'none' : 'flex';

  const start = (currentPage - 1) * filterState.perPage + 1;
  const end   = Math.min(currentPage * filterState.perPage, totalCount);
  infoEl.innerHTML = `Showing <strong>${start}–${end}</strong> of <strong>${totalCount}</strong> buyers`;

  const chevL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
  const chevR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

  let html = `<button class="page-btn" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''} title="Previous">${chevL}</button>`;

  buildPageRange(currentPage, totalPages).forEach(p => {
    html += p === '…'
      ? `<span class="page-ellipsis">…</span>`
      : `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
  });

  html += `<button class="page-btn" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''} title="Next">${chevR}</button>`;

  controlsEl.innerHTML = html;
  controlsEl.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.dataset.page, 10);
      if (p >= 1 && p <= totalPages) {
        filterState.page = p;
        applyAndRender();
      }
    });
  });
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push('…');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}

function applyAndRender() {
  const filtered            = applyFilters();
  const { rows, totalPages, totalCount, safePage } = paginateData(filtered);
  filterState.page = safePage;
  renderTable(rows);
  renderSummary(totalCount);
  renderPagination(totalPages, safePage, totalCount);
}

/* ══════════════════════════════════════════════
   INIT — Buyers Page
══════════════════════════════════════════════ */

function initBuyersPage() {
  const searchInput     = document.getElementById('buyerSearch');
  const clearBtn        = document.getElementById('searchClearBtn');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');

  searchInput.addEventListener('input', () => {
    filterState.search = searchInput.value;
    filterState.page   = 1;
    clearBtn.classList.toggle('visible', filterState.search.length > 0);
    applyAndRender();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value  = '';
    filterState.search = '';
    filterState.page   = 1;
    clearBtn.classList.remove('visible');
    searchInput.focus();
    applyAndRender();
  });

  clearFiltersBtn.addEventListener('click', resetFilters);

  document.getElementById('riskFilterGroup').addEventListener('click', e => {
    const pill = e.target.closest('.risk-pill');
    if (!pill) return;
    document.querySelectorAll('.risk-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    filterState.risk = pill.dataset.risk;
    filterState.page = 1;
    applyAndRender();
  });

  // Row click → open drawer
  document.getElementById('buyerTableBody').addEventListener('click', e => {
    const row = e.target.closest('tr[data-id]');
    if (!row) return;
    openDrawer(parseInt(row.dataset.id, 10));
  });

  /* Show skeleton rows briefly before first render */
  const tbody = document.getElementById('buyerTableBody');
  if (tbody) {
    tbody.innerHTML = Array(6).fill('<tr class="skeleton-row"><td colspan="6"></td></tr>').join('');
  }
  setTimeout(applyAndRender, 400);
}

function resetFilters() {
  filterState.search = '';
  filterState.risk   = 'all';
  filterState.page   = 1;
  const searchInput = document.getElementById('buyerSearch');
  if (searchInput) searchInput.value = '';
  document.getElementById('searchClearBtn')?.classList.remove('visible');
  document.querySelectorAll('.risk-pill').forEach(p => p.classList.toggle('active', p.dataset.risk === 'all'));
  applyAndRender();
}

/* ══════════════════════════════════════════════
   DASHBOARD — KPI + Welcome
══════════════════════════════════════════════ */

const STATS = [
  { label:'Active Buyers',    value:'1,284', delta:'+34',    deltaNote:'this month',   dir:'up',   iconColor:'blue',
    icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { label:'Avg Health Score', value:'71',    delta:'−3 pts', deltaNote:'this week',    dir:'down', iconColor:'green',
    icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
  { label:'At-Risk Buyers',   value:'63',    delta:'+12',    deltaNote:'flagged today', dir:'down', iconColor:'red',
    icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
  { label:'Open Follow Ups',  value:'21',    delta:'5 due',  deltaNote:'today',         dir:'flat', iconColor:'yellow',
    icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
];

function renderStats() {
  const grid = document.getElementById('statGrid');
  if (!grid) return;

  /* Brief skeleton flash for perceived performance */
  grid.innerHTML = Array(4).fill('<div class="skeleton-card"></div>').join('');

  setTimeout(() => {
    const arrowMap = { up: '▲', down: '▼', flat: '—' };
    grid.innerHTML = STATS.map(s => `
      <div class="stat-card">
        <div class="stat-card-top">
          <span class="stat-card-label">${s.label}</span>
          <span class="stat-card-icon ${s.iconColor}">${s.icon}</span>
        </div>
        <div class="stat-card-value">${s.value}</div>
        <div class="stat-card-delta ${s.dir}">
          <span class="delta-arrow">${arrowMap[s.dir]}</span>
          ${s.delta} <span class="delta-note">${s.deltaNote}</span>
        </div>
      </div>
    `).join('');
  }, 350);
}

function renderWelcomeDate() {
  const el = document.getElementById('welcomeDate');
  if (el) el.textContent = new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

/* ══════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════ */

function initNav() {
  const navItems   = document.querySelectorAll('.nav-item[data-page]');
  const pages      = document.querySelectorAll('.page');
  const breadcrumb = document.getElementById('breadcrumbCurrent');
  const content    = document.querySelector('.content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      const target = document.getElementById('page-' + item.dataset.page);
      if (target) target.classList.add('active');
      if (breadcrumb) breadcrumb.textContent = item.querySelector('.nav-label').textContent.trim();
      /* Scroll content area back to top on navigation */
      if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
      closeSidebar();
      if (item.dataset.page === 'health')     setTimeout(animateHealthVisuals, 80);
      if (item.dataset.page === 'analytics') setTimeout(animateAnalytics, 80);
      if (item.dataset.page === 'ai')        setTimeout(() => { if (!aiHasGenerated) generateAISummaries(); }, 200);
    });
  });
}

/* ══════════════════════════════════════════════
   SIDEBAR TOGGLE
══════════════════════════════════════════════ */

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  if (window.innerWidth > 768) return;
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initSidebar() {
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('sidebar').classList.contains('open') ? closeSidebar() : openSidebar();
  });
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('sidebarOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ══════════════════════════════════════════════
   MISC
══════════════════════════════════════════════ */

function initSearch() {
  const input = document.querySelector('.search-input');
  if (!input) return;
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault(); input.focus();
    }
  });
}

function initQuickActions() {
  document.querySelectorAll('.qa-btn').forEach(btn => {
    btn.addEventListener('click', () => console.info('[BuyerPulse] Quick action:', btn.querySelector('span:last-child').textContent.trim()));
  });
}

/* ══════════════════════════════════════════════
   HEALTH SCORES PAGE
══════════════════════════════════════════════ */

const RING_C = 2 * Math.PI * 40; // circumference for r=40 → 251.33

/* ── Category helpers ───────────────────────── */

function healthCat(score) {
  if (score >= 75) return 'healthy';
  if (score >= 50) return 'warning';
  return 'risky';
}

function healthLabel(score) {
  if (score >= 75) return 'Healthy';
  if (score >= 50) return 'Warning';
  return 'Risky';
}

/* Deterministic per-buyer factor scores derived from overall score */
function healthFactors(buyer) {
  const id = buyer.id, s = buyer.score;
  return {
    activity:   Math.min(100, Math.max(5, s + (id * 3  % 15) - 7)),
    payments:   Math.min(100, Math.max(5, s + (id * 5  % 12) - 6)),
    engagement: Math.min(100, Math.max(5, s + (id * 7  % 10) - 5)),
  };
}

function factorQual(v)   { return v >= 75 ? 'High'   : v >= 50 ? 'Medium' : 'Low'; }
function paymentQual(v)  { return v >= 75 ? 'Good'   : v >= 50 ? 'Fair'   : 'Poor'; }
function emdQual(emd)    { return emd >= 100000 ? 'Strong' : emd >= 25000 ? 'OK' : 'Low'; }

/* ── Summary stat cards ─────────────────────── */

function renderHSSummary() {
  const b   = MOCK_BUYERS;
  const tot = b.length;
  const H   = b.filter(x => x.score >= 75).length;
  const W   = b.filter(x => x.score >= 50 && x.score < 75).length;
  const R   = b.filter(x => x.score < 50).length;
  const avg = Math.round(b.reduce((s, x) => s + x.score, 0) / tot);

  const cards = [
    { label: 'Portfolio Avg Score', value: avg, note: 'out of 100',                              color: 'blue'   },
    { label: 'Healthy Buyers',      value: H,   note: `${Math.round(H/tot*100)}% of portfolio`,  color: 'green'  },
    { label: 'Warning Buyers',      value: W,   note: `${Math.round(W/tot*100)}% need attention`, color: 'yellow' },
    { label: 'Risky Buyers',        value: R,   note: `${Math.round(R/tot*100)}% need action`,    color: 'red'    },
  ];

  const el = document.getElementById('hsSummary');
  if (!el) return;
  el.innerHTML = cards.map(c => `
    <div class="hs-stat-card hs-stat-${c.color}">
      <div class="hs-stat-label">${c.label}</div>
      <div class="hs-stat-value">${c.value}</div>
      <div class="hs-stat-note">${c.note}</div>
    </div>
  `).join('');
}

/* ── Score distribution bars ────────────────── */

function renderDistribution() {
  const ranges = [
    { label:'80 – 100', tag:'Excellent', cls:'dr-excellent', min:80,  max:101 },
    { label:'65 – 79',  tag:'Good',      cls:'dr-good',      min:65,  max:80  },
    { label:'50 – 64',  tag:'Fair',      cls:'dr-fair',      min:50,  max:65  },
    { label:'35 – 49',  tag:'Poor',      cls:'dr-poor',      min:35,  max:50  },
    { label:'0 – 34',   tag:'Critical',  cls:'dr-critical',  min:0,   max:35  },
  ];

  const counts   = ranges.map(r => MOCK_BUYERS.filter(b => b.score >= r.min && b.score < r.max).length);
  const maxCount = Math.max(...counts);

  const el = document.getElementById('distBarsList');
  if (!el) return;
  el.innerHTML = ranges.map((r, i) => {
    const count   = counts[i];
    const vizPct  = maxCount > 0 ? Math.round((count / maxCount) * 88) : 0;
    const realPct = Math.round((count / MOCK_BUYERS.length) * 100);
    return `
      <div class="dist-bar-row">
        <div class="dist-bar-meta">
          <span class="dist-bar-range">${r.label}</span>
          <span class="dist-bar-tag ${r.cls}-text">${r.tag}</span>
        </div>
        <div class="dist-bar-track">
          <div class="dist-bar-fill ${r.cls}" data-width="${vizPct}" style="width:0%"></div>
        </div>
        <div class="dist-bar-count">
          <span class="dist-count-num">${count}</span>
          <span class="dist-count-pct">${realPct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ── Portfolio snapshot ─────────────────────── */

function renderPortfolioSnap() {
  const scores  = MOCK_BUYERS.map(b => b.score);
  const maxS    = Math.max(...scores);
  const minS    = Math.min(...scores);
  const topBuyer = MOCK_BUYERS.find(b => b.score === maxS);
  const lowBuyer = MOCK_BUYERS.find(b => b.score === minS);

  const el = document.getElementById('portfolioSnap');
  if (!el) return;
  el.innerHTML = `
    <div class="snap-rows">
      <div class="snap-row">
        <span class="snap-label">Highest Score</span>
        <span class="snap-val score-healthy-text">${maxS}<span class="snap-sub"> /100</span></span>
      </div>
      <div class="snap-row">
        <span class="snap-label">Top Buyer</span>
        <span class="snap-val snap-name">${topBuyer?.name || '—'}</span>
      </div>
      <div class="snap-row">
        <span class="snap-label">Lowest Score</span>
        <span class="snap-val score-poor-text">${minS}<span class="snap-sub"> /100</span></span>
      </div>
      <div class="snap-row">
        <span class="snap-label">Needs Attention</span>
        <span class="snap-val snap-name">${lowBuyer?.name || '—'}</span>
      </div>
      <div class="snap-row">
        <span class="snap-label">Improved This Week</span>
        <span class="snap-val score-healthy-text">8 buyers</span>
      </div>
      <div class="snap-row">
        <span class="snap-label">Declined This Week</span>
        <span class="snap-val score-poor-text">5 buyers</span>
      </div>
    </div>
  `;
}

/* ── Filter buttons ─────────────────────────── */

function renderHSFilters() {
  const tot = MOCK_BUYERS.length;
  const H   = MOCK_BUYERS.filter(b => b.score >= 75).length;
  const W   = MOCK_BUYERS.filter(b => b.score >= 50 && b.score < 75).length;
  const R   = MOCK_BUYERS.filter(b => b.score < 50).length;

  const filters = [
    { id:'all',     label:'All',     count: tot, cls:'' },
    { id:'healthy', label:'Healthy', count: H,   cls:'hf-healthy' },
    { id:'warning', label:'Warning', count: W,   cls:'hf-warning' },
    { id:'risky',   label:'Risky',   count: R,   cls:'hf-risky'   },
  ];

  const el = document.getElementById('hsFilterRow');
  if (!el) return;
  el.innerHTML = filters.map((f, i) => `
    <button class="hf-btn ${i === 0 ? 'active' : ''} ${f.cls}" data-filter="${f.id}">
      ${f.label} <span class="hf-count">${f.count}</span>
    </button>
  `).join('');
}

/* ── Individual health cards ────────────────── */

function renderHealthCards(filter) {
  const source = filter === 'all'
    ? MOCK_BUYERS
    : MOCK_BUYERS.filter(b => healthCat(b.score) === filter);

  const buyers = [...source].sort((a, b) => b.score - a.score);

  const el = document.getElementById('healthGrid');
  if (!el) return;

  el.innerHTML = buyers.map(buyer => {
    const cat      = healthCat(buyer.score);
    const label    = healthLabel(buyer.score);
    const fac      = healthFactors(buyer);
    const time     = relativeTime(buyer.lastActive);
    const initials = getInitials(buyer.name);
    const offset   = (RING_C * (1 - buyer.score / 100)).toFixed(1);

    // Tooltip point breakdown (weights: 35/30/20/15)
    const actPts  = Math.round(buyer.score * 0.35);
    const payPts  = Math.round(buyer.score * 0.30);
    const emdPts  = Math.round(buyer.score * 0.20);
    const resPts  = buyer.score - actPts - payPts - emdPts;

    const fillCls = { healthy:'hfb-healthy', warning:'hfb-warning', risky:'hfb-risky' }[cat];
    const ringCls = { healthy:'ring-healthy', warning:'ring-warning', risky:'ring-risky' }[cat];
    const rlCls   = { healthy:'rl-healthy',   warning:'rl-warning',   risky:'rl-risky'  }[cat];

    return `
      <div class="health-card hc-${cat}">

        <div class="hc-top">
          <div class="hc-avatar">${initials}</div>
          <div class="hc-name-block">
            <div class="hc-name">${buyer.name}</div>
            <div class="hc-city">${buyer.city}</div>
          </div>
          <span class="risk-label ${rlCls}">${label}</span>
        </div>

        <div class="hc-ring-wrap">
          <svg class="health-ring" viewBox="0 0 100 100" aria-label="${buyer.score} out of 100">
            <circle class="ring-bg" cx="50" cy="50" r="40" fill="none" stroke-width="8"/>
            <circle class="ring-progress ${ringCls}" cx="50" cy="50" r="40"
              fill="none" stroke-width="8" stroke-linecap="round"
              stroke-dasharray="${RING_C.toFixed(1)}"
              stroke-dashoffset="${RING_C.toFixed(1)}"
              data-offset="${offset}"
              transform="rotate(-90 50 50)"/>
          </svg>
          <div class="ring-center">
            <div class="ring-score">${buyer.score}</div>
            <div class="ring-unit">/100</div>
          </div>

          <div class="score-tooltip">
            <div class="st-title">Score Breakdown</div>
            <div class="st-factors">
              <div class="st-row">
                <span class="st-label">Bid Activity</span>
                <span class="st-val">${factorQual(fac.activity)} · <strong>${actPts}pts</strong></span>
              </div>
              <div class="st-row">
                <span class="st-label">Payment History</span>
                <span class="st-val">${paymentQual(fac.payments)} · <strong>${payPts}pts</strong></span>
              </div>
              <div class="st-row">
                <span class="st-label">EMD Status</span>
                <span class="st-val">${emdQual(buyer.emd)} · <strong>${emdPts}pts</strong></span>
              </div>
              <div class="st-row">
                <span class="st-label">Response Rate</span>
                <span class="st-val">${factorQual(fac.engagement)} · <strong>${resPts}pts</strong></span>
              </div>
            </div>
            <div class="st-total">Total: <strong>${buyer.score} / 100</strong></div>
          </div>
        </div>

        <div class="hc-factors">
          <div class="hf-bar-row">
            <span class="hf-bar-label">Bid Activity</span>
            <div class="hf-bar-track">
              <div class="hf-bar-fill ${fillCls}" data-width="${fac.activity}" style="width:0%"></div>
            </div>
            <span class="hf-bar-pct">${fac.activity}%</span>
          </div>
          <div class="hf-bar-row">
            <span class="hf-bar-label">Payments</span>
            <div class="hf-bar-track">
              <div class="hf-bar-fill ${fillCls}" data-width="${fac.payments}" style="width:0%"></div>
            </div>
            <span class="hf-bar-pct">${fac.payments}%</span>
          </div>
          <div class="hf-bar-row">
            <span class="hf-bar-label">Engagement</span>
            <div class="hf-bar-track">
              <div class="hf-bar-fill ${fillCls}" data-width="${fac.engagement}" style="width:0%"></div>
            </div>
            <span class="hf-bar-pct">${fac.engagement}%</span>
          </div>
        </div>

        <div class="hc-footer">
          <span class="status-badge ${statusClass(buyer.status)}">${buyer.status}</span>
          <span class="hc-last">${time.label}</span>
        </div>

      </div>
    `;
  }).join('');
}

/* ── Animation: rings + bars ─────────────────
   Strategy: render DOM at 0, then set real values
   after one frame so CSS transitions fire.
─────────────────────────────────────────────── */

function animateHealthVisuals() {
  // Animate SVG rings
  document.querySelectorAll('.ring-progress[data-offset]').forEach(ring => {
    ring.style.strokeDashoffset = ring.dataset.offset;
  });

  // Stagger factor bar fills
  document.querySelectorAll('#healthGrid .hf-bar-fill[data-width]').forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 25);
  });

  // Stagger distribution bar fills
  document.querySelectorAll('#distBarsList .dist-bar-fill[data-width]').forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 90);
  });
}

/* ── Health page bootstrap ──────────────────── */

function initHealthPage() {
  renderHSSummary();
  renderDistribution();
  renderPortfolioSnap();
  renderHSFilters();
  renderHealthCards('all');

  // Filter pill clicks
  document.getElementById('hsFilterRow').addEventListener('click', e => {
    const btn = e.target.closest('.hf-btn');
    if (!btn) return;
    document.querySelectorAll('.hf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderHealthCards(btn.dataset.filter);
    // Re-animate after new cards are in DOM
    setTimeout(animateHealthVisuals, 60);
  });
}

/* ══════════════════════════════════════════════
   FOLLOW UPS — KANBAN
══════════════════════════════════════════════ */

const MOCK_FOLLOWUPS = [
  { id:  1, buyerId:  4, buyerName: 'Sunder Enterprises',        type: 'EMD Review',      assignee: 'Priya Sharma',  dueDate: '2026-05-16', priority: 'Urgent', status: 'pending',    notes: 'EMD balance is zero. Urgent review needed before next auction cycle.' },
  { id:  2, buyerId:  7, buyerName: 'Priya Logistics Pvt.',      type: 'Schedule Call',   assignee: 'Rajan Mehta',   dueDate: '2026-05-16', priority: 'Urgent', status: 'pending',    notes: 'Account suspended. Discuss reactivation path and outstanding dues.' },
  { id:  3, buyerId: 16, buyerName: 'Patel Motors & Auctions',   type: 'Payment Chase',   assignee: 'Anika Singh',   dueDate: '2026-05-17', priority: 'High',   status: 'pending',    notes: 'Outstanding payment for 2 lots. Legal escalation pending if no response.' },
  { id:  4, buyerId: 19, buyerName: 'Coimbatore Vehicle Mart',   type: 'Account Review',  assignee: 'Dev Kapoor',    dueDate: '2026-05-18', priority: 'High',   status: 'pending',    notes: 'Critical health score and near-zero EMD. Full account review required.' },
  { id:  5, buyerId:  3, buyerName: 'Vinayak Motors Pvt. Ltd.',  type: 'Follow-up Email', assignee: 'Meera Patel',   dueDate: '2026-05-20', priority: 'Normal', status: 'pending',    notes: 'Send monthly engagement summary and upcoming auction schedule.' },
  { id:  6, buyerId: 13, buyerName: 'Narmada Vehicle Hub',       type: 'Bid Support',     assignee: 'Priya Sharma',  dueDate: '2026-05-17', priority: 'High',   status: 'inprogress', notes: 'Buyer unable to submit bids on mobile. Portal access issue under investigation.' },
  { id:  7, buyerId: 11, buyerName: 'Sharma Brothers Motors',    type: 'Credit Check',    assignee: 'Rajan Mehta',   dueDate: '2026-05-17', priority: 'High',   status: 'inprogress', notes: 'Credit limit review for increased bidding capacity. Finance team looped in.' },
  { id:  8, buyerId: 23, buyerName: 'Saurashtra Auto Traders',   type: 'Schedule Call',   assignee: 'Dev Kapoor',    dueDate: '2026-05-18', priority: 'Normal', status: 'inprogress', notes: 'Quarterly check-in on auction experience and upcoming inventory needs.' },
  { id:  9, buyerId:  2, buyerName: 'Mahindra First Choice',     type: 'Account Review',  assignee: 'Anika Singh',   dueDate: '2026-05-20', priority: 'Normal', status: 'inprogress', notes: 'Routine health review. Score dropped 6 pts this month — investigate cause.' },
  { id: 10, buyerId:  8, buyerName: 'Ganesh Motor Works',        type: 'Follow-up Email', assignee: 'Meera Patel',   dueDate: '2026-05-14', priority: 'Normal', status: 'completed',  notes: 'Engagement nudge sent. Buyer responded positively, will bid next week.' },
  { id: 11, buyerId:  9, buyerName: 'Rajputana Fleet Solutions', type: 'EMD Review',      assignee: 'Priya Sharma',  dueDate: '2026-05-13', priority: 'Normal', status: 'completed',  notes: 'EMD topped up to ₹70K after reminder call. Account back in good standing.' },
  { id: 12, buyerId: 15, buyerName: 'Bihar Transport Corp.',     type: 'Payment Chase',   assignee: 'Rajan Mehta',   dueDate: '2026-05-13', priority: 'High',   status: 'completed',  notes: 'Full payment received for 3 pending lots. Account reconciled.' },
  { id: 13, buyerId: 17, buyerName: 'Utkal Auto Pvt. Ltd.',      type: 'Bid Support',     assignee: 'Dev Kapoor',    dueDate: '2026-05-12', priority: 'Low',    status: 'completed',  notes: 'Mobile bidding interface walkthrough completed. Buyer comfortable now.' },
  { id: 14, buyerId: 21, buyerName: 'Brahmaputra Fleet Co.',     type: 'Send Alert',      assignee: 'Meera Patel',   dueDate: '2026-05-11', priority: 'Normal', status: 'completed',  notes: 'Inactivity alert sent. No response yet — flagging for next cycle.' },
];

let fuNextId = MOCK_FOLLOWUPS.length + 1;
let fuDragId  = null;

const FU_STATUSES = ['pending', 'inprogress', 'completed'];

const FU_STATUS_META = {
  pending:    { label: 'Pending',     dot: '#F59E0B', topCls: 'col-pending'    },
  inprogress: { label: 'In Progress', dot: '#5B6EF5', topCls: 'col-inprogress' },
  completed:  { label: 'Completed',   dot: '#22C55E', topCls: 'col-completed'  },
};

const FU_PRIORITY_META = {
  Urgent: { cls: 'fu-urgent', label: 'Urgent' },
  High:   { cls: 'fu-high',   label: 'High'   },
  Normal: { cls: 'fu-normal', label: 'Normal' },
  Low:    { cls: 'fu-low',    label: 'Low'    },
};

const FU_TASK_TYPES = [
  'Schedule Call', 'Follow-up Email', 'EMD Review',
  'Payment Chase', 'Account Review',  'Credit Check',
  'Bid Support',   'Send Alert',
];

const FU_ASSIGNEES = [
  'Priya Sharma', 'Rajan Mehta', 'Anika Singh',
  'Dev Kapoor',   'Meera Patel',
];

function fuInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function fuDueLabel(dateStr) {
  const diff = Math.floor((new Date(dateStr) - new Date('2026-05-15')) / 86400000);
  if (diff < 0)   return { label: `${Math.abs(diff)}d overdue`, cls: 'fu-overdue' };
  if (diff === 0) return { label: 'Today',                      cls: 'fu-today'   };
  if (diff === 1) return { label: 'Tomorrow',                   cls: 'fu-soon'    };
  if (diff <= 3)  return { label: `${diff}d left`,              cls: 'fu-soon'    };
  const d = new Date(dateStr);
  return { label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), cls: '' };
}

function renderFUStats() {
  const total      = MOCK_FOLLOWUPS.length;
  const pending    = MOCK_FOLLOWUPS.filter(t => t.status === 'pending').length;
  const inprogress = MOCK_FOLLOWUPS.filter(t => t.status === 'inprogress').length;
  const completed  = MOCK_FOLLOWUPS.filter(t => t.status === 'completed').length;
  const overdue    = MOCK_FOLLOWUPS.filter(t => {
    return t.status !== 'completed' && new Date(t.dueDate) < new Date('2026-05-15');
  }).length;

  document.getElementById('fuStats').innerHTML = `
    <div class="fu-stat">
      <span class="fu-stat-val">${total}</span>
      <span class="fu-stat-lbl">Total Tasks</span>
    </div>
    <div class="fu-stat-divider"></div>
    <div class="fu-stat">
      <span class="fu-stat-dot" style="background:#F59E0B"></span>
      <span class="fu-stat-val">${pending}</span>
      <span class="fu-stat-lbl">Pending</span>
    </div>
    <div class="fu-stat">
      <span class="fu-stat-dot" style="background:#5B6EF5"></span>
      <span class="fu-stat-val">${inprogress}</span>
      <span class="fu-stat-lbl">In Progress</span>
    </div>
    <div class="fu-stat">
      <span class="fu-stat-dot" style="background:#22C55E"></span>
      <span class="fu-stat-val">${completed}</span>
      <span class="fu-stat-lbl">Completed</span>
    </div>
    <div class="fu-stat-divider"></div>
    <div class="fu-stat">
      <span class="fu-stat-val ${overdue ? 'fu-stat-overdue' : ''}">${overdue}</span>
      <span class="fu-stat-lbl ${overdue ? 'fu-stat-overdue' : ''}">Overdue</span>
    </div>`;
}

function renderFUCard(task) {
  const pri  = FU_PRIORITY_META[task.priority] || FU_PRIORITY_META.Normal;
  const due  = fuDueLabel(task.dueDate);
  const done = task.status === 'completed';

  return `
  <div class="fu-card ${done ? 'fu-card-done' : ''}" draggable="true" data-task-id="${task.id}">
    <div class="fu-card-top">
      <span class="fu-priority-badge ${pri.cls}">${pri.label}</span>
      <span class="fu-task-type">${task.type}</span>
    </div>
    <div class="fu-card-buyer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      ${task.buyerName}
    </div>
    ${task.notes ? `<p class="fu-card-notes">${task.notes}</p>` : ''}
    <div class="fu-card-footer">
      <div class="fu-assignee" title="${task.assignee}">
        <span class="fu-assignee-av">${fuInitials(task.assignee)}</span>
        <span class="fu-assignee-name">${task.assignee.split(' ')[0]}</span>
      </div>
      <span class="fu-due ${due.cls}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        ${due.label}
      </span>
    </div>
    <div class="fu-card-actions">
      ${!done
        ? `<button class="fu-action-btn fu-btn-done"   data-task-id="${task.id}">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>Done
           </button>`
        : `<button class="fu-action-btn fu-btn-reopen" data-task-id="${task.id}">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>Reopen
           </button>`}
      <button class="fu-action-btn fu-btn-remove" data-task-id="${task.id}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>Remove
      </button>
    </div>
  </div>`;
}

function renderFUColumn(status) {
  const tasks   = MOCK_FOLLOWUPS.filter(t => t.status === status);
  const colBody = document.getElementById('col-' + status);
  if (!colBody) return;

  colBody.innerHTML = tasks.length
    ? tasks.map(renderFUCard).join('')
    : `<div class="fu-col-empty">Drop a task here or<br>use <strong>+ Add task</strong> below</div>`;

  const countEl = colBody.closest('.kanban-col')?.querySelector('.col-count');
  if (countEl) countEl.textContent = tasks.length;
}

function renderAllFUColumns() {
  FU_STATUSES.forEach(renderFUColumn);
  renderFUStats();
}

/* ── Drag-and-drop (event delegation on board) ── */

function initFUDragDrop() {
  const board = document.getElementById('kanbanBoard');

  board.addEventListener('dragstart', e => {
    const card = e.target.closest('.fu-card');
    if (!card) return;
    fuDragId = parseInt(card.dataset.taskId);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => card.classList.add('fu-dragging'), 0);
  });

  board.addEventListener('dragend', () => {
    board.querySelectorAll('.fu-dragging').forEach(c => c.classList.remove('fu-dragging'));
    board.querySelectorAll('.drag-over').forEach(c => c.classList.remove('drag-over'));
  });

  board.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const colBody = e.target.closest('.kanban-col-body');
    board.querySelectorAll('.kanban-col-body').forEach(c => c.classList.remove('drag-over'));
    if (colBody) colBody.classList.add('drag-over');
  });

  board.addEventListener('dragleave', e => {
    if (!board.contains(e.relatedTarget)) {
      board.querySelectorAll('.kanban-col-body').forEach(c => c.classList.remove('drag-over'));
    }
  });

  board.addEventListener('drop', e => {
    e.preventDefault();
    board.querySelectorAll('.kanban-col-body').forEach(c => c.classList.remove('drag-over'));
    const colBody = e.target.closest('.kanban-col-body');
    if (!colBody || fuDragId === null) return;
    const newStatus = colBody.closest('.kanban-col').dataset.status;
    const task = MOCK_FOLLOWUPS.find(t => t.id === fuDragId);
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      renderAllFUColumns();
    }
    fuDragId = null;
  });
}

/* ── Modal ── */

function openFUModal() {
  document.getElementById('fuModalOverlay').classList.add('open');
  document.getElementById('fuModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('fuDueDate').value = '2026-05-17';
  document.getElementById('fuDueDate').min   = '2026-05-15';
}

function closeFUModal() {
  document.getElementById('fuModalOverlay').classList.remove('open');
  document.getElementById('fuModal').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('fuForm').reset();
}

function initFUModal() {
  const buyerSel    = document.getElementById('fuBuyer');
  const typeSel     = document.getElementById('fuType');
  const assigneeSel = document.getElementById('fuAssignee');
  const prioritySel = document.getElementById('fuPriority');

  buyerSel.innerHTML    = MOCK_BUYERS.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
  typeSel.innerHTML     = FU_TASK_TYPES.map(t => `<option value="${t}">${t}</option>`).join('');
  assigneeSel.innerHTML = FU_ASSIGNEES.map(a => `<option value="${a}">${a}</option>`).join('');
  prioritySel.innerHTML = ['Urgent','High','Normal','Low'].map(p => `<option value="${p}">${p}</option>`).join('');

  document.getElementById('fuAddBtn').addEventListener('click', openFUModal);
  document.getElementById('fuModalClose').addEventListener('click', closeFUModal);
  document.getElementById('fuCancelBtn').addEventListener('click', closeFUModal);
  document.getElementById('fuModalOverlay').addEventListener('click', closeFUModal);
  document.getElementById('fuModal').addEventListener('click', e => e.stopPropagation());

  document.getElementById('fuForm').addEventListener('submit', e => {
    e.preventDefault();
    const buyerId = parseInt(buyerSel.value);
    const buyer   = MOCK_BUYERS.find(b => b.id === buyerId);
    MOCK_FOLLOWUPS.push({
      id:        fuNextId++,
      buyerId,
      buyerName: buyer.name,
      type:      typeSel.value,
      assignee:  assigneeSel.value,
      dueDate:   document.getElementById('fuDueDate').value,
      priority:  prioritySel.value,
      status:    'pending',
      notes:     document.getElementById('fuNotes').value.trim(),
    });
    renderFUColumn('pending');
    renderFUStats();
    closeFUModal();
    showRCToast(`Task added for ${buyer.name}`, 'success');
  });
}

/* ── Board click actions ── */

function initFUBoardActions() {
  document.getElementById('kanbanBoard').addEventListener('click', e => {

    const addBtn = e.target.closest('.fu-col-add-btn');
    if (addBtn) { openFUModal(); return; }

    const doneBtn = e.target.closest('.fu-btn-done');
    if (doneBtn) {
      const task = MOCK_FOLLOWUPS.find(t => t.id === parseInt(doneBtn.dataset.taskId));
      if (task) { task.status = 'completed'; renderAllFUColumns(); }
      return;
    }

    const reopenBtn = e.target.closest('.fu-btn-reopen');
    if (reopenBtn) {
      const task = MOCK_FOLLOWUPS.find(t => t.id === parseInt(reopenBtn.dataset.taskId));
      if (task) { task.status = 'pending'; renderAllFUColumns(); }
      return;
    }

    const removeBtn = e.target.closest('.fu-btn-remove');
    if (removeBtn) {
      const id   = parseInt(removeBtn.dataset.taskId);
      const card = document.querySelector(`.fu-card[data-task-id="${id}"]`);
      if (card) {
        card.classList.add('fu-card-removing');
        setTimeout(() => {
          const idx = MOCK_FOLLOWUPS.findIndex(t => t.id === id);
          if (idx > -1) MOCK_FOLLOWUPS.splice(idx, 1);
          renderAllFUColumns();
        }, 260);
      }
    }
  });
}

/* ── Bootstrap ── */

function initFollowUps() {
  const board = document.getElementById('kanbanBoard');
  board.innerHTML = FU_STATUSES.map(status => {
    const m = FU_STATUS_META[status];
    return `
    <div class="kanban-col ${m.topCls}" data-status="${status}">
      <div class="kanban-col-header">
        <span class="col-dot" style="background:${m.dot}"></span>
        <span class="col-title">${m.label}</span>
        <span class="col-count">0</span>
      </div>
      <div class="kanban-col-body" id="col-${status}"></div>
      <div class="kanban-col-footer">
        <button class="fu-col-add-btn" data-status="${status}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add task
        </button>
      </div>
    </div>`;
  }).join('');

  renderAllFUColumns();
  initFUDragDrop();
  initFUModal();
  initFUBoardActions();
}

/* ══════════════════════════════════════════════
   RISK CENTER
══════════════════════════════════════════════ */

const RC_REASON_META = {
  inactive:       { label: 'Inactive',             cls: 'reason-inactive'  },
  payment_delay:  { label: 'Payment Delay',         cls: 'reason-payment'   },
  low_bidding:    { label: 'Low Bidding Activity',  cls: 'reason-bidding'   },
  approval_issue: { label: 'Approval Issue',        cls: 'reason-approval'  },
};

function getRiskReasons(buyer) {
  const reasons = [];
  const id = buyer.id;
  const daysSince = Math.floor((new Date('2026-05-15') - new Date(buyer.lastActive)) / 86400000);

  if (daysSince > 14 || buyer.status === 'Inactive')                    reasons.push('inactive');
  if (buyer.emd === 0 || (id % 3 === 0 && buyer.score < 65))           reasons.push('payment_delay');
  if (buyer.score < 55  || (id % 5 === 2 && buyer.score < 72))         reasons.push('low_bidding');
  if (buyer.status === 'Suspended' || id % 7 === 0)                     reasons.push('approval_issue');
  if (reasons.length === 0)                                              reasons.push('low_bidding');

  return [...new Set(reasons)];
}

function rcPriority(buyer) {
  if (buyer.risk === 'Critical') return { label: 'Critical', cls: 'priority-critical', order: 0 };
  if (buyer.risk === 'High')     return { label: 'High',     cls: 'priority-high',     order: 1 };
  return                                { label: 'Medium',   cls: 'priority-medium',   order: 2 };
}

function getRiskyBuyers() {
  return MOCK_BUYERS
    .filter(b => b.risk !== 'Low')
    .sort((a, b) => rcPriority(a).order - rcPriority(b).order);
}

function fmtEMD(v) {
  if (v === 0)        return '—';
  if (v >= 100000)    return '₹' + (v / 100000).toFixed(1) + 'L';
  return '₹' + (v / 1000).toFixed(0) + 'K';
}

function renderRCSummary() {
  const risky    = getRiskyBuyers();
  const critical = risky.filter(b => b.risk === 'Critical').length;
  const high     = risky.filter(b => b.risk === 'High').length;
  const medium   = risky.filter(b => b.risk === 'Medium').length;
  const escalated = risky.filter(b => b.id % 4 === 1).length;

  document.getElementById('rcSummary').innerHTML = `
    <div class="rc-stat-card rc-stat-red">
      <div class="rc-stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div class="rc-stat-body">
        <div class="rc-stat-value">${risky.length}</div>
        <div class="rc-stat-label">Total At Risk</div>
        <div class="rc-stat-sub">of ${MOCK_BUYERS.length} buyers</div>
      </div>
    </div>
    <div class="rc-stat-card rc-stat-critical">
      <div class="rc-stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="rc-stat-body">
        <div class="rc-stat-value">${critical}</div>
        <div class="rc-stat-label">Critical Priority</div>
        <div class="rc-stat-sub">immediate action needed</div>
      </div>
    </div>
    <div class="rc-stat-card rc-stat-high">
      <div class="rc-stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <div class="rc-stat-body">
        <div class="rc-stat-value">${high}</div>
        <div class="rc-stat-label">High Priority</div>
        <div class="rc-stat-sub">follow up this week</div>
      </div>
    </div>
    <div class="rc-stat-card rc-stat-medium">
      <div class="rc-stat-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="rc-stat-body">
        <div class="rc-stat-value">${escalated}</div>
        <div class="rc-stat-label">Escalated Today</div>
        <div class="rc-stat-sub">${medium} medium flagged</div>
      </div>
    </div>`;
}

let rcActiveFilter = 'all';

function renderRCFilters() {
  const risky = getRiskyBuyers();
  const counts = {
    all:      risky.length,
    critical: risky.filter(b => b.risk === 'Critical').length,
    high:     risky.filter(b => b.risk === 'High').length,
    medium:   risky.filter(b => b.risk === 'Medium').length,
  };
  const defs = [
    { key: 'all',      label: 'All',      count: counts.all      },
    { key: 'critical', label: 'Critical', count: counts.critical  },
    { key: 'high',     label: 'High',     count: counts.high      },
    { key: 'medium',   label: 'Medium',   count: counts.medium    },
  ];
  document.getElementById('rcFilterRow').innerHTML = defs.map(f =>
    `<button class="rc-filter-btn${rcActiveFilter === f.key ? ' active rc-active-' + f.key : ''}" data-filter="${f.key}">
       ${f.label} <span class="rc-filter-count">${f.count}</span>
     </button>`
  ).join('');
}

function renderRCFeed(filter) {
  let buyers = getRiskyBuyers();
  if (filter && filter !== 'all') {
    buyers = buyers.filter(b => b.risk.toLowerCase() === filter);
  }

  const countEl = document.getElementById('rcCount');
  if (countEl) countEl.textContent = `${buyers.length} buyer${buyers.length !== 1 ? 's' : ''} flagged`;

  if (!buyers.length) {
    document.getElementById('rcFeed').innerHTML = `
      <div class="rc-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <p>No buyers in this category</p>
      </div>`;
    return;
  }

  document.getElementById('rcFeed').innerHTML = buyers.map(buyer => {
    const priority  = rcPriority(buyer);
    const reasons   = getRiskReasons(buyer);
    const daysSince = Math.floor((new Date('2026-05-15') - new Date(buyer.lastActive)) / 86400000);
    const lastStr   = daysSince === 0 ? 'Today'
                    : daysSince === 1 ? 'Yesterday'
                    : daysSince < 7   ? `${daysSince}d ago`
                    : daysSince < 30  ? `${Math.floor(daysSince / 7)}w ago`
                    : `${Math.floor(daysSince / 30)}mo ago`;
    const lastCls   = daysSince === 0 ? 'rcm-today'
                    : daysSince <= 3  ? ''
                    : daysSince <= 10 ? 'rcm-stale'
                    : 'rcm-old';
    const emdCls    = buyer.emd === 0 ? 'rcm-old' : buyer.emd < 50000 ? 'rcm-stale' : '';
    const scoreCls  = buyer.score >= 75 ? 'rcm-ok' : buyer.score >= 50 ? 'rcm-warn' : 'rcm-bad';
    const initials  = buyer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return `
    <div class="rc-card ${priority.cls}" data-buyer-id="${buyer.id}">

      <div class="rc-card-left">
        <div class="rc-avatar rcav-${priority.cls}">${initials}</div>
        <div class="rc-info">
          <div class="rc-buyer-name">${buyer.name}</div>
          <div class="rc-buyer-meta">${buyer.city} &middot; ${buyer.status}</div>
        </div>
      </div>

      <div class="rc-card-mid">
        <span class="rc-priority-badge rcbadge-${priority.cls}">${priority.label}</span>
        <div class="rc-reasons">
          ${reasons.map(r =>
            `<span class="rc-reason ${RC_REASON_META[r].cls}">${RC_REASON_META[r].label}</span>`
          ).join('')}
        </div>
      </div>

      <div class="rc-metrics">
        <div class="rc-metric">
          <span class="rc-metric-val ${scoreCls}">${buyer.score}</span>
          <span class="rc-metric-label">Health</span>
        </div>
        <div class="rc-metric">
          <span class="rc-metric-val ${emdCls}">${fmtEMD(buyer.emd)}</span>
          <span class="rc-metric-label">EMD</span>
        </div>
        <div class="rc-metric">
          <span class="rc-metric-val ${lastCls}">${lastStr}</span>
          <span class="rc-metric-label">Last Active</span>
        </div>
      </div>

      <div class="rc-actions">
        <button class="rc-btn rc-btn-alert"    data-action="alert"    data-buyer="${buyer.name}" title="Send risk alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Send Alert
        </button>
        <button class="rc-btn rc-btn-call"     data-action="call"     data-buyer="${buyer.name}" title="Schedule a call">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Schedule Call
        </button>
        <button class="rc-btn rc-btn-escalate" data-action="escalate" data-buyer="${buyer.name}" title="Escalate to senior team">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/></svg>
          Escalate
        </button>
        <button class="rc-btn rc-btn-dismiss"  data-action="dismiss"  data-buyer="${buyer.name}" data-id="${buyer.id}" title="Dismiss from queue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          Dismiss
        </button>
      </div>

    </div>`;
  }).join('');
}

function showRCToast(message, type) {
  let toast = document.getElementById('rcToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'rcToast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `rc-toast rc-toast-${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function initRiskPage() {
  renderRCSummary();
  renderRCFilters();
  renderRCFeed('all');

  document.getElementById('rcFilterRow').addEventListener('click', e => {
    const btn = e.target.closest('.rc-filter-btn');
    if (!btn) return;
    rcActiveFilter = btn.dataset.filter;
    renderRCFilters();
    renderRCFeed(rcActiveFilter);
  });

  document.getElementById('rcFeed').addEventListener('click', e => {
    const btn = e.target.closest('.rc-btn');
    if (!btn) return;
    const { action, buyer: name, id } = btn.dataset;
    if      (action === 'alert')    showRCToast(`Alert sent to ${name}`, 'success');
    else if (action === 'call')     showRCToast(`Call scheduled with ${name}`, 'info');
    else if (action === 'escalate') showRCToast(`${name} escalated to senior team`, 'warning');
    else if (action === 'dismiss') {
      const card = document.querySelector(`.rc-card[data-buyer-id="${id}"]`);
      if (card) {
        card.classList.add('rc-card-removing');
        setTimeout(() => {
          card.remove();
          const remaining = document.querySelectorAll('.rc-card').length;
          const countEl = document.getElementById('rcCount');
          if (countEl) countEl.textContent = `${remaining} buyer${remaining !== 1 ? 's' : ''} flagged`;
          if (!remaining) renderRCFeed('__empty__');
        }, 320);
      }
      showRCToast(`${name} dismissed from risk queue`, 'muted');
    }
  });

  document.getElementById('rcResolveAll')?.addEventListener('click', () => {
    const criticals = document.querySelectorAll('.rc-card.priority-critical');
    criticals.forEach((card, i) => {
      setTimeout(() => card.classList.add('rc-card-removing'), i * 80);
      setTimeout(() => card.remove(), i * 80 + 320);
    });
    setTimeout(() => {
      const remaining = document.querySelectorAll('.rc-card').length;
      const countEl = document.getElementById('rcCount');
      if (countEl) countEl.textContent = `${remaining} buyer${remaining !== 1 ? 's' : ''} flagged`;
      if (!remaining) renderRCFeed('__empty__');
    }, criticals.length * 80 + 350);
    showRCToast(`${criticals.length} critical buyer${criticals.length !== 1 ? 's' : ''} resolved`, 'success');
  });
}

/* ══════════════════════════════════════════════
   ANALYTICS
══════════════════════════════════════════════ */

const AN_RANGES = {
  '7d': {
    periodLabel: 'last 7 days',
    kpis: {
      activeBuyers:  { value: 16, trend: +1,  unit: '',  trendLabel: '+1 vs prev 7d'  },
      riskyBuyers:   { value:  8, trend: +1,  unit: '',  trendLabel: '+1 vs prev 7d'  },
      recoveryRate:  { value: 68, trend: -3,  unit: '%', trendLabel: '−3% vs prev 7d' },
      paymentDelays: { value:  5, trend: +2,  unit: '',  trendLabel: '+2 vs prev 7d'  },
    },
    sparklines: {
      activeBuyers:  [14,15,14,16,15,17,16],
      riskyBuyers:   [ 6, 7, 7, 8, 7, 8, 8],
      recoveryRate:  [72,70,69,71,68,67,68],
      paymentDelays: [ 3, 3, 4, 3, 5, 4, 5],
    },
    healthTrend: [
      {label:'Mon',value:64},{label:'Tue',value:67},{label:'Wed',value:63},
      {label:'Thu',value:70},{label:'Fri',value:66},{label:'Sat',value:71},{label:'Sun',value:68},
    ],
    bidActivity: [
      {label:'Mon',value:22},{label:'Tue',value:35},{label:'Wed',value:18},
      {label:'Thu',value:45},{label:'Fri',value:38},{label:'Sat',value:12},{label:'Sun',value:29},
    ],
    riskDist: [
      {label:'Low',value:10,color:'#22C55E'},{label:'Medium',value:7,color:'#F59E0B'},
      {label:'High',value:4,color:'#F97316'},{label:'Critical',value:4,color:'#EF4444'},
    ],
    topBuyers: [
      {name:'Agarwal Auto Traders',    city:'Bhopal',   score:93,bids: 8,delta:+2},
      {name:'Balaji Vehicle Traders',  city:'Hyderabad',score:91,bids: 7,delta:+1},
      {name:'Kerala Auto Exchange',    city:'Kochi',    score:89,bids: 6,delta: 0},
      {name:'Tata Motors Dealers Ltd.',city:'Nagpur',   score:86,bids: 5,delta:-1},
      {name:'Mysuru Royal Automobiles',city:'Mysore',   score:85,bids: 4,delta:+1},
    ],
  },
  '30d': {
    periodLabel: 'last 30 days',
    kpis: {
      activeBuyers:  { value: 18, trend: +2,  unit: '',  trendLabel: '+2 vs prev 30d'  },
      riskyBuyers:   { value:  7, trend: -3,  unit: '',  trendLabel: '−3 vs prev 30d'  },
      recoveryRate:  { value: 71, trend: +8,  unit: '%', trendLabel: '+8% vs prev 30d' },
      paymentDelays: { value:  4, trend: +1,  unit: '',  trendLabel: '+1 vs prev 30d'  },
    },
    sparklines: {
      activeBuyers:  [13,14,15,14,16,17,18],
      riskyBuyers:   [10, 9, 9, 8, 8, 7, 7],
      recoveryRate:  [63,65,66,68,69,70,71],
      paymentDelays: [ 3, 4, 3, 5, 4, 4, 4],
    },
    healthTrend: [
      {label:'Wk 1',value:61},{label:'Wk 2',value:64},{label:'Wk 3',value:67},{label:'Wk 4',value:70},
    ],
    bidActivity: [
      {label:'Wk 1',value:87},{label:'Wk 2',value:112},{label:'Wk 3',value:134},{label:'Wk 4',value:156},
    ],
    riskDist: [
      {label:'Low',value:10,color:'#22C55E'},{label:'Medium',value:7,color:'#F59E0B'},
      {label:'High',value:4,color:'#F97316'},{label:'Critical',value:4,color:'#EF4444'},
    ],
    topBuyers: [
      {name:'Agarwal Auto Traders',    city:'Bhopal',   score:93,bids:28,delta:+3},
      {name:'Balaji Vehicle Traders',  city:'Hyderabad',score:91,bids:24,delta:+2},
      {name:'Kerala Auto Exchange',    city:'Kochi',    score:89,bids:21,delta:+1},
      {name:'Shriram Automall India',  city:'Mumbai',   score:88,bids:19,delta:-1},
      {name:'Mysuru Royal Automobiles',city:'Mysore',   score:85,bids:16,delta:+2},
    ],
  },
  '90d': {
    periodLabel: 'last 90 days',
    kpis: {
      activeBuyers:  { value: 21, trend: +4,  unit: '',  trendLabel: '+4 vs prev 90d'  },
      riskyBuyers:   { value:  9, trend: -1,  unit: '',  trendLabel: '−1 vs prev 90d'  },
      recoveryRate:  { value: 65, trend: +5,  unit: '%', trendLabel: '+5% vs prev 90d' },
      paymentDelays: { value:  9, trend: +3,  unit: '',  trendLabel: '+3 vs prev 90d'  },
    },
    sparklines: {
      activeBuyers:  [17,18,19,20,20,21,21],
      riskyBuyers:   [10,10, 9, 9,10, 9, 9],
      recoveryRate:  [60,62,63,64,64,65,65],
      paymentDelays: [ 6, 7, 8, 7, 9, 8, 9],
    },
    healthTrend: [
      {label:'Jan',value:58},{label:'Feb',value:61},{label:'Mar',value:63},
      {label:'Apr',value:65},{label:'May',value:62},{label:'Jun',value:65},
    ],
    bidActivity: [
      {label:'Jan',value:310},{label:'Feb',value:285},{label:'Mar',value:340},
      {label:'Apr',value:390},{label:'May',value:420},{label:'Jun',value:445},
    ],
    riskDist: [
      {label:'Low',value:8,color:'#22C55E'},{label:'Medium',value:8,color:'#F59E0B'},
      {label:'High',value:5,color:'#F97316'},{label:'Critical',value:4,color:'#EF4444'},
    ],
    topBuyers: [
      {name:'Agarwal Auto Traders',    city:'Bhopal',   score:93,bids:74,delta:+5},
      {name:'Balaji Vehicle Traders',  city:'Hyderabad',score:91,bids:68,delta:+3},
      {name:'Kerala Auto Exchange',    city:'Kochi',    score:89,bids:61,delta:+2},
      {name:'Shriram Automall India',  city:'Mumbai',   score:88,bids:55,delta:-2},
      {name:'Delta Auto Finance',      city:'Surat',    score:79,bids:48,delta:+4},
    ],
  },
  '6m': {
    periodLabel: 'last 6 months',
    kpis: {
      activeBuyers:  { value: 23, trend: +6,  unit: '',  trendLabel: '+6 vs prev 6m'   },
      riskyBuyers:   { value: 11, trend: +2,  unit: '',  trendLabel: '+2 vs prev 6m'   },
      recoveryRate:  { value: 62, trend: +11, unit: '%', trendLabel: '+11% vs prev 6m' },
      paymentDelays: { value: 14, trend: +5,  unit: '',  trendLabel: '+5 vs prev 6m'   },
    },
    sparklines: {
      activeBuyers:  [17,18,19,21,22,23,23],
      riskyBuyers:   [ 9, 9,10,11,11,11,11],
      recoveryRate:  [51,54,57,59,61,62,62],
      paymentDelays: [ 9,10,11,13,13,14,14],
    },
    healthTrend: [
      {label:'Nov',value:54},{label:'Dec',value:57},{label:'Jan',value:58},
      {label:'Feb',value:61},{label:'Mar',value:63},{label:'Apr',value:65},{label:'May',value:62},
    ],
    bidActivity: [
      {label:'Nov',value:240},{label:'Dec',value:190},{label:'Jan',value:310},
      {label:'Feb',value:285},{label:'Mar',value:340},{label:'Apr',value:390},{label:'May',value:420},
    ],
    riskDist: [
      {label:'Low',value:9,color:'#22C55E'},{label:'Medium',value:8,color:'#F59E0B'},
      {label:'High',value:4,color:'#F97316'},{label:'Critical',value:2,color:'#EF4444'},
    ],
    topBuyers: [
      {name:'Agarwal Auto Traders',    city:'Bhopal',   score:93,bids:142,delta: +8},
      {name:'Balaji Vehicle Traders',  city:'Hyderabad',score:91,bids:128,delta: +6},
      {name:'Kerala Auto Exchange',    city:'Kochi',    score:89,bids:118,delta: +4},
      {name:'Shriram Automall India',  city:'Mumbai',   score:88,bids:105,delta: -3},
      {name:'Delta Auto Finance',      city:'Surat',    score:79,bids: 94,delta: +7},
    ],
  },
};

let anCurrentRange = '30d';

const AN_KPI_COLORS = {
  activeBuyers:  '#5B6EF5',
  riskyBuyers:   '#EF4444',
  recoveryRate:  '#22C55E',
  paymentDelays: '#F59E0B',
};
const AN_KPI_LABELS = {
  activeBuyers:  'Active Buyers',
  riskyBuyers:   'Risky Buyers',
  recoveryRate:  'Recovery Rate',
  paymentDelays: 'Payment Delays',
};
const AN_KPI_ICONS = {
  activeBuyers:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  riskyBuyers:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  recoveryRate:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  paymentDelays: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
};

/* ── Sparklines ── */
function buildSparkline(values, color) {
  const W = 80, H = 28, pad = 3;
  const max = Math.max(...values), min = Math.min(...values), range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - pad * 2);
    const y = (H - pad) - ((v - min) / range) * (H - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const last  = pts.split(' ').at(-1);
  const gid   = `sg${color.replace('#','')}`;
  const fillPts = `${pad},${H} ${pts} ${W - pad},${H}`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    <polygon points="${fillPts}" fill="url(#${gid})"/>
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}

/* ── KPI cards ── */
function renderAnKPIs(d) {
  const keys  = ['activeBuyers','riskyBuyers','recoveryRate','paymentDelays'];
  const goodUp = { activeBuyers: true, riskyBuyers: false, recoveryRate: true, paymentDelays: false };

  document.getElementById('anKpiGrid').innerHTML = keys.map(key => {
    const kpi   = d.kpis[key];
    const color = AN_KPI_COLORS[key];
    const isPos = kpi.trend > 0;
    const good  = goodUp[key] ? isPos : !isPos;
    const trendCls  = kpi.trend === 0 ? 'an-trend-flat' : good ? 'an-trend-pos' : 'an-trend-neg';
    const trendIcon = kpi.trend === 0 ? '→' : isPos ? '↑' : '↓';
    const trendAbs  = Math.abs(kpi.trend);

    return `
    <div class="an-kpi-card" style="border-left-color:${color}">
      <div class="an-kpi-top">
        <div class="an-kpi-icon" style="background:${color}1a;color:${color}">${AN_KPI_ICONS[key]}</div>
        ${buildSparkline(d.sparklines[key], color)}
      </div>
      <div class="an-kpi-val" data-target="${kpi.value}" data-unit="${kpi.unit}">${kpi.value}${kpi.unit}</div>
      <div class="an-kpi-label">${AN_KPI_LABELS[key]}</div>
      <div class="an-kpi-trend ${trendCls}">
        <span class="an-trend-arrow">${trendIcon}</span>
        ${trendAbs > 0 ? (isPos ? '+' : '−') + trendAbs + kpi.unit : 'No change'}
        <span class="an-trend-period">${kpi.trendLabel}</span>
      </div>
    </div>`;
  }).join('');
}

/* ── SVG Line chart ── */
function renderLineChart(containerId, data, color) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const W = 540, H = 180, pL = 44, pR = 16, pT = 12, pB = 32;
  const cW = W - pL - pR, cH = H - pT - pB;
  const vals = data.map(d => d.value);
  const rawMin = Math.min(...vals), rawMax = Math.max(...vals);
  const pad = Math.ceil((rawMax - rawMin) * 0.15) || 5;
  const minV = Math.floor((rawMin - pad) / 5) * 5;
  const maxV = Math.ceil((rawMax + pad) / 5) * 5;
  const range = maxV - minV;
  const xS = i => pL + (i / (data.length - 1)) * cW;
  const yS = v => pT + (1 - (v - minV) / range) * cH;

  const gridVals = Array.from({length: 4}, (_, i) => Math.round(minV + (range / 3) * i));
  const grids = gridVals.map(v => {
    const y = yS(v).toFixed(1);
    return `<line x1="${pL}" y1="${y}" x2="${W - pR}" y2="${y}" stroke="#1E2540" stroke-width="1"/>
            <text x="${pL - 8}" y="${(+y + 4).toFixed(1)}" text-anchor="end" fill="#475569" font-size="10" font-family="system-ui,sans-serif">${v}</text>`;
  }).join('');

  const pts     = data.map((d, i) => `${xS(i).toFixed(1)},${yS(d.value).toFixed(1)}`).join(' ');
  const fillPts = `${pL},${(pT+cH).toFixed(1)} ${pts} ${(pL+cW).toFixed(1)},${(pT+cH).toFixed(1)}`;
  const xLabels = data.map((d, i) => `<text x="${xS(i).toFixed(1)}" y="${H-6}" text-anchor="middle" fill="#475569" font-size="10" font-family="system-ui,sans-serif">${d.label}</text>`).join('');
  const dotEls  = data.map((d, i) => `<circle class="an-ldot" cx="${xS(i).toFixed(1)}" cy="${yS(d.value).toFixed(1)}" r="4.5" fill="${color}" stroke="#131726" stroke-width="2" data-v="${d.value}" data-l="${d.label}"/>`).join('');
  const gid = `lg${color.replace('#','')}`;

  el.innerHTML = `<div class="an-svg-wrap">
    <svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.01"/>
        </linearGradient>
      </defs>
      ${grids}
      <polygon class="an-fill" points="${fillPts}" fill="url(#${gid})" opacity="0" style="transition:opacity .7s ease"/>
      <polyline class="an-line" points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0" style="transition:opacity .5s ease .1s"/>
      ${dotEls}
      ${xLabels}
    </svg>
    <div class="an-tt" id="tt-${containerId}"></div>
  </div>`;

  el.querySelectorAll('.an-ldot').forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      const tt = document.getElementById(`tt-${containerId}`);
      tt.innerHTML = `<strong>${dot.dataset.l}</strong><br><span style="font-size:16px;font-weight:900">${dot.dataset.v}</span>`;
      tt.style.opacity = '1';
      dot.setAttribute('r','6.5');
    });
    dot.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const tt = document.getElementById(`tt-${containerId}`);
      tt.style.left = Math.min(e.clientX - r.left + 14, r.width - 108) + 'px';
      tt.style.top  = Math.max(e.clientY - r.top  - 56, 4) + 'px';
    });
    dot.addEventListener('mouseleave', () => {
      document.getElementById(`tt-${containerId}`).style.opacity = '0';
      dot.setAttribute('r','4.5');
    });
  });
}

/* ── SVG Donut chart ── */
function renderDonutChart(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 52, cx = 80, cy = 80, C = 2 * Math.PI * r;
  let cum = 0;
  const segs = data.map(d => {
    const arc = (d.value / total) * C;
    const s = { ...d, arc, cum };
    cum += arc;
    return s;
  });

  const circles = segs.map(s => `
    <circle class="an-dseg" cx="${cx}" cy="${cy}" r="${r}" fill="none"
      stroke="${s.color}" stroke-width="18"
      stroke-dasharray="0 ${C.toFixed(2)}"
      data-arc="${s.arc.toFixed(2)}" data-c="${C.toFixed(2)}"
      style="stroke-dashoffset:${(-s.cum).toFixed(2)};transform:rotate(-90deg);transform-origin:${cx}px ${cy}px;transition:stroke-dasharray 0.75s cubic-bezier(0.4,0,0.2,1);"
      data-v="${s.value}" data-l="${s.label}"/>`).join('');

  const biggest = segs.reduce((a, b) => b.value > a.value ? b : a);
  const legend  = data.map(d => `
    <div class="an-leg-row">
      <span class="an-leg-dot" style="background:${d.color}"></span>
      <span class="an-leg-label">${d.label}</span>
      <span class="an-leg-val">${d.value}</span>
      <span class="an-leg-pct">${Math.round(d.value/total*100)}%</span>
    </div>`).join('');

  el.innerHTML = `<div class="an-donut-wrap">
    <div class="an-donut-svg-wrap" style="position:relative">
      <svg viewBox="0 0 160 160" width="160" height="160">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1A1F35" stroke-width="18"/>
        ${circles}
        <text x="${cx}" y="${cy-6}" text-anchor="middle" fill="#F1F5F9" font-size="21" font-weight="900" font-family="system-ui,sans-serif">${biggest.value}</text>
        <text x="${cx}" y="${cy+12}" text-anchor="middle" fill="#475569" font-size="10" font-family="system-ui,sans-serif">${biggest.label}</text>
      </svg>
      <div class="an-tt" id="tt-${containerId}"></div>
    </div>
    <div class="an-donut-legend">${legend}</div>
  </div>`;

  el.querySelectorAll('.an-dseg').forEach(seg => {
    seg.addEventListener('mouseenter', e => {
      const tt = document.getElementById(`tt-${containerId}`);
      tt.innerHTML = `<strong>${seg.dataset.l}</strong><br>${seg.dataset.v} buyers`;
      tt.style.opacity = '1';
      seg.style.strokeWidth = '22';
    });
    seg.addEventListener('mousemove', e => {
      const r2 = el.getBoundingClientRect();
      const tt = document.getElementById(`tt-${containerId}`);
      tt.style.left = (e.clientX - r2.left + 10) + 'px';
      tt.style.top  = (e.clientY - r2.top  - 48) + 'px';
    });
    seg.addEventListener('mouseleave', () => {
      document.getElementById(`tt-${containerId}`).style.opacity = '0';
      seg.style.strokeWidth = '18';
    });
  });
}

/* ── CSS Bar chart ── */
const AN_BAR_MAX_H = 150;

function renderBarChart(containerId, data, color) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const maxV = Math.max(...data.map(d => d.value));
  const cols = data.map(d => {
    const h = Math.round((d.value / maxV) * AN_BAR_MAX_H);
    return `
    <div class="an-bcol">
      <span class="an-bval">${d.value}</span>
      <div class="an-btrack">
        <div class="an-bfill" data-h="${h}" style="height:0;background:${color};border-radius:4px 4px 0 0;width:100%;transition:height 0.65s cubic-bezier(0.4,0,0.2,1)"></div>
      </div>
      <span class="an-blabel">${d.label}</span>
    </div>`;
  }).join('');
  el.innerHTML = `<div class="an-bar-wrap"><div class="an-bars">${cols}</div></div>`;
}

/* ── Top buyers table ── */
function renderTopBuyers(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="an-buyers">
    ${data.map((b, i) => {
      const dCls = b.delta > 0 ? 'an-d-up' : b.delta < 0 ? 'an-d-dn' : 'an-d-flat';
      const dStr = b.delta > 0 ? `↑ +${b.delta}` : b.delta < 0 ? `↓ ${b.delta}` : '—';
      const sCls = b.score >= 85 ? 'score-healthy' : b.score >= 70 ? 'score-good' : 'score-fair';
      return `
      <div class="an-buyer-row">
        <span class="an-buyer-rank">${i + 1}</span>
        <div class="an-buyer-info">
          <span class="an-buyer-name">${b.name}</span>
          <span class="an-buyer-city">${b.city}</span>
        </div>
        <div class="an-buyer-metrics">
          <span class="an-buyer-bids">${b.bids} bids</span>
          <span class="an-score-badge ${sCls}">${b.score}</span>
          <span class="an-delta ${dCls}">${dStr}</span>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

/* ── Animation engine ── */
function animateAnalytics() {
  // Bar heights
  document.querySelectorAll('#anBidChart .an-bfill[data-h]').forEach((bar, i) => {
    setTimeout(() => { bar.style.height = bar.dataset.h + 'px'; }, i * 55);
  });

  // Line chart: fade in fill + line
  document.querySelectorAll('#anHealthChart .an-fill, #anHealthChart .an-line').forEach(el => {
    setTimeout(() => { el.style.opacity = '1'; }, 80);
  });

  // Donut segments: unwind staggered
  document.querySelectorAll('#anRiskChart .an-dseg').forEach((seg, i) => {
    setTimeout(() => {
      const arc = parseFloat(seg.dataset.arc);
      const C   = parseFloat(seg.dataset.c);
      seg.style.strokeDasharray = `${arc} ${C - arc}`;
    }, i * 130);
  });

  // KPI count-up
  document.querySelectorAll('#anKpiGrid .an-kpi-val[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const unit   = el.dataset.unit || '';
    const t0     = performance.now();
    const dur    = 900;
    (function tick(now) {
      const p    = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * ease) + unit;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + unit;
    })(t0);
  });
}

/* ── Render everything for a given range ── */
function renderAnalytics(range) {
  const d = AN_RANGES[range];
  renderAnKPIs(d);
  renderLineChart('anHealthChart',  d.healthTrend,  '#5B6EF5');
  renderDonutChart('anRiskChart',   d.riskDist);
  renderBarChart('anBidChart',      d.bidActivity,  'linear-gradient(to top,#5B6EF5,#7B8CF7)');
  renderTopBuyers('anTopBuyers',    d.topBuyers);
  const el = id => document.getElementById(id);
  if (el('anHealthSub'))   el('anHealthSub').textContent   = `Avg health score over ${d.periodLabel}`;
  if (el('anActivitySub')) el('anActivitySub').textContent = `Bids placed over ${d.periodLabel}`;
  if (el('anBuyersSub'))   el('anBuyersSub').textContent   = `Ranked by bidding activity (${d.periodLabel})`;
}

/* ── Bootstrap ── */
function initAnalytics() {
  const filterEl = document.getElementById('anDateFilter');
  const ranges   = [{key:'30d',label:'30D'},{key:'7d',label:'7D'},{key:'90d',label:'90D'},{key:'6m',label:'6M'}];

  filterEl.innerHTML = ranges.map(r =>
    `<button class="an-date-btn${anCurrentRange === r.key ? ' active' : ''}" data-range="${r.key}">${r.label}</button>`
  ).join('');

  filterEl.addEventListener('click', e => {
    const btn = e.target.closest('.an-date-btn');
    if (!btn) return;
    anCurrentRange = btn.dataset.range;
    filterEl.querySelectorAll('.an-date-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderAnalytics(anCurrentRange);
    setTimeout(animateAnalytics, 60);
  });

  renderAnalytics(anCurrentRange);
}

/* ══════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════ */

const MOCK_NOTIFICATIONS = [
  { id:  1, type: 'payment_issue',    buyerName: 'Sunder Enterprises',        title: 'EMD Balance Zero',         message: 'EMD balance dropped to ₹0. Buyer is ineligible for the next auction cycle.',       time: '2026-05-15T10:30:00', read: false },
  { id:  2, type: 'risky_buyer',      buyerName: 'Priya Logistics Pvt.',      title: 'Health Score Critical',    message: 'Health score fell to 38 — lowest this quarter. Suspension risk elevated.',         time: '2026-05-15T09:45:00', read: false },
  { id:  3, type: 'followup_pending', buyerName: 'Sharma Brothers Motors',    title: 'Follow-up Overdue',        message: 'Credit check task assigned to Rajan Mehta is 2 days overdue.',                    time: '2026-05-15T08:20:00', read: false },
  { id:  4, type: 'approval_issue',   buyerName: 'Patel Motors & Auctions',   title: 'Account Suspended',        message: 'Account auto-suspended after 3 consecutive payment failures. Review needed.',      time: '2026-05-14T16:10:00', read: false },
  { id:  5, type: 'payment_issue',    buyerName: 'Coimbatore Vehicle Mart',   title: 'Payment Delay',            message: 'Payment for Lot #AU-2241 is 7 days overdue. Escalate if no response today.',     time: '2026-05-14T14:55:00', read: false },
  { id:  6, type: 'risky_buyer',      buyerName: 'Vinayak Motors Pvt. Ltd.',  title: 'Low Bidding Activity',     message: 'No bids placed in 10 days. Engagement risk flagged by system.',                   time: '2026-05-14T11:30:00', read: false },
  { id:  7, type: 'followup_pending', buyerName: 'Sunder Enterprises',        title: 'EMD Review Due Today',     message: 'Task assigned to Priya Sharma is due today with no action recorded yet.',         time: '2026-05-15T07:00:00', read: false },
  { id:  8, type: 'approval_issue',   buyerName: 'Saurashtra Auto Traders',   title: 'Watchlist Escalation',     message: 'Buyer moved to Watchlist after failing compliance screening.',                    time: '2026-05-14T09:00:00', read: false },
  { id:  9, type: 'followup_pending', buyerName: 'Mahindra First Choice',     title: 'Account Review Due',       message: 'Quarterly review scheduled today. Anika Singh assigned — no update yet.',        time: '2026-05-15T08:00:00', read: false },
  { id: 10, type: 'payment_issue',    buyerName: 'Narmada Vehicle Hub',       title: 'Low EMD Warning',          message: 'EMD balance below minimum threshold (₹15K). Top-up required before bidding.',    time: '2026-05-13T15:40:00', read: true  },
  { id: 11, type: 'risky_buyer',      buyerName: 'Brahmaputra Fleet Co.',     title: 'Inactivity Alert',         message: 'Account inactive for 30 days. Auto-flag triggered. Consider outreach.',          time: '2026-05-13T10:20:00', read: true  },
  { id: 12, type: 'followup_pending', buyerName: 'Patel Motors & Auctions',   title: 'Payment Chase Overdue',    message: 'Anika Singh\'s follow-up task has been open for 4 days with no resolution.',     time: '2026-05-13T09:00:00', read: true  },
  { id: 13, type: 'approval_issue',   buyerName: 'Rajputana Fleet Solutions', title: 'Document Expired',         message: 'Trade license expired 5 days ago. Re-upload required for continued eligibility.', time: '2026-05-12T14:00:00', read: true  },
  { id: 14, type: 'payment_issue',    buyerName: 'Priya Logistics Pvt.',      title: 'Lot Payment Failed',       message: 'Payment for Lot #AU-2198 was declined. Finance team has been notified.',         time: '2026-05-12T11:30:00', read: true  },
  { id: 15, type: 'risky_buyer',      buyerName: 'Coimbatore Vehicle Mart',   title: 'Score Drop Alert',         message: 'Health score dropped 12 points in 7 days. Full account review recommended.',      time: '2026-05-11T16:45:00', read: true  },
];

const NOTIF_TYPE_META = {
  payment_issue:    { label: 'Payment Issue',     cls: 'nt-payment',  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' },
  risky_buyer:      { label: 'Risky Buyer',       cls: 'nt-risky',    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
  followup_pending: { label: 'Follow-up Pending', cls: 'nt-followup', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  approval_issue:   { label: 'Approval Issue',    cls: 'nt-approval', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' },
};

let notifPageFilter = 'all';
let notifDropdownOpen = false;

function notifTimeAgo(isoStr) {
  const now  = new Date('2026-05-15T17:00:00');
  const then = new Date(isoStr);
  const mins = Math.floor((now - then) / 60000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  if (hrs < 48)  return 'Yesterday';
  return then.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function unreadCount() {
  return MOCK_NOTIFICATIONS.filter(n => !n.read).length;
}

/* ── Bell badge ── */

function renderNotifBadge() {
  const count   = unreadCount();
  const badge   = document.getElementById('notifBadge');
  const bellBtn = document.getElementById('notifBell');
  if (!badge) return;
  if (count > 0) {
    badge.textContent = count > 9 ? '9+' : count;
    badge.classList.add('has-count');
  } else {
    badge.textContent = '';
    badge.classList.remove('has-count');
  }
  if (bellBtn) bellBtn.setAttribute('aria-label', `Notifications — ${count} unread`);
}

/* ── Dropdown ── */

function buildDropdownCard(notif) {
  const meta = NOTIF_TYPE_META[notif.type];
  return `
  <div class="notif-dd-card ${notif.read ? 'nd-read' : 'nd-unread'}" data-notif-id="${notif.id}">
    <div class="nd-icon ${meta.cls}">${meta.icon}</div>
    <div class="nd-body">
      <div class="nd-top">
        <span class="nd-buyer">${notif.buyerName}</span>
        <span class="nd-time">${notifTimeAgo(notif.time)}</span>
      </div>
      <div class="nd-title">${notif.title}</div>
      <div class="nd-msg">${notif.message}</div>
    </div>
    ${!notif.read ? '<span class="nd-dot"></span>' : ''}
  </div>`;
}

function renderNotifDropdown() {
  const count   = unreadCount();
  const countEl = document.getElementById('notifDDUnread');
  if (countEl) countEl.textContent = count > 0 ? `${count} unread` : 'All caught up';

  const list = document.getElementById('notifDDList');
  if (!list) return;

  const items = MOCK_NOTIFICATIONS.slice(0, 8);
  list.innerHTML = items.length
    ? items.map(buildDropdownCard).join('')
    : `<div class="nd-empty">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
         <p>No notifications</p>
       </div>`;
}

function openNotifDropdown() {
  notifDropdownOpen = true;
  document.getElementById('notifDropdown').classList.add('open');
  document.getElementById('notifBell').setAttribute('aria-expanded', 'true');
  renderNotifDropdown();
}

function closeNotifDropdown() {
  notifDropdownOpen = false;
  document.getElementById('notifDropdown').classList.remove('open');
  document.getElementById('notifBell').setAttribute('aria-expanded', 'false');
}

/* ── Full page ── */

function buildPageCard(notif) {
  const meta = NOTIF_TYPE_META[notif.type];
  return `
  <div class="notif-page-card ${notif.read ? 'np-read' : 'np-unread'}" data-notif-id="${notif.id}">
    ${!notif.read ? '<div class="np-unread-bar"></div>' : ''}
    <div class="np-icon ${meta.cls}">${meta.icon}</div>
    <div class="np-body">
      <div class="np-top">
        <span class="np-type-label ${meta.cls}-label">${meta.label}</span>
        <span class="np-time">${notifTimeAgo(notif.time)}</span>
      </div>
      <div class="np-buyer">${notif.buyerName}</div>
      <div class="np-title">${notif.title}</div>
      <p class="np-msg">${notif.message}</p>
    </div>
    <div class="np-actions">
      ${!notif.read
        ? `<button class="np-mark-btn" data-notif-id="${notif.id}">Mark read</button>`
        : `<span class="np-read-tag">Read</span>`}
    </div>
  </div>`;
}

function renderNotifPageTabs() {
  const counts = {
    all:              MOCK_NOTIFICATIONS.length,
    unread:           MOCK_NOTIFICATIONS.filter(n => !n.read).length,
    payment_issue:    MOCK_NOTIFICATIONS.filter(n => n.type === 'payment_issue').length,
    risky_buyer:      MOCK_NOTIFICATIONS.filter(n => n.type === 'risky_buyer').length,
    followup_pending: MOCK_NOTIFICATIONS.filter(n => n.type === 'followup_pending').length,
    approval_issue:   MOCK_NOTIFICATIONS.filter(n => n.type === 'approval_issue').length,
  };
  const tabs = [
    { key: 'all',              label: 'All'             },
    { key: 'unread',           label: 'Unread'          },
    { key: 'payment_issue',    label: 'Payment Issues'  },
    { key: 'risky_buyer',      label: 'Risky Buyers'    },
    { key: 'followup_pending', label: 'Follow-ups'      },
    { key: 'approval_issue',   label: 'Approvals'       },
  ];
  document.getElementById('notifPageTabs').innerHTML = tabs.map(t => `
    <button class="np-tab-btn ${notifPageFilter === t.key ? 'active' : ''}" data-filter="${t.key}">
      ${t.label}
      <span class="np-tab-count">${counts[t.key]}</span>
    </button>`).join('');
}

function renderNotifPageList(filter) {
  let items = [...MOCK_NOTIFICATIONS];
  if (filter === 'unread') items = items.filter(n => !n.read);
  else if (filter !== 'all') items = items.filter(n => n.type === filter);

  const list = document.getElementById('notifPageList');
  if (!list) return;
  list.innerHTML = items.length
    ? items.map(buildPageCard).join('')
    : `<div class="np-empty">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
         <p>No notifications in this category</p>
       </div>`;
}

function markNotifRead(id) {
  const notif = MOCK_NOTIFICATIONS.find(n => n.id === id);
  if (!notif || notif.read) return;
  notif.read = true;
  renderNotifBadge();
  renderNotifDropdown();
  renderNotifPageTabs();
  renderNotifPageList(notifPageFilter);
}

function markAllRead() {
  MOCK_NOTIFICATIONS.forEach(n => { n.read = true; });
  renderNotifBadge();
  renderNotifDropdown();
  renderNotifPageTabs();
  renderNotifPageList(notifPageFilter);
}

function navigateToNotifPage() {
  closeNotifDropdown();
  const navItem = document.querySelector('.nav-item[data-page="notifications"]');
  if (navItem) navItem.click();
}

function initNotifications() {
  renderNotifBadge();

  /* Bell toggle */
  document.getElementById('notifBell').addEventListener('click', e => {
    e.stopPropagation();
    notifDropdownOpen ? closeNotifDropdown() : openNotifDropdown();
  });

  /* Close on outside click */
  document.addEventListener('click', e => {
    if (notifDropdownOpen && !document.getElementById('notifBellWrap').contains(e.target)) {
      closeNotifDropdown();
    }
  });

  /* Close on ESC */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && notifDropdownOpen) closeNotifDropdown();
  });

  /* Dropdown: mark individual read on card click */
  document.getElementById('notifDDList').addEventListener('click', e => {
    const card = e.target.closest('.notif-dd-card');
    if (card) markNotifRead(parseInt(card.dataset.notifId));
  });

  /* Dropdown: mark all */
  document.getElementById('notifMarkAll').addEventListener('click', markAllRead);

  /* Dropdown: view all */
  document.getElementById('notifViewAll').addEventListener('click', navigateToNotifPage);

  /* Full page: tab filters */
  document.getElementById('notifPageTabs').addEventListener('click', e => {
    const btn = e.target.closest('.np-tab-btn');
    if (!btn) return;
    notifPageFilter = btn.dataset.filter;
    renderNotifPageTabs();
    renderNotifPageList(notifPageFilter);
  });

  /* Full page: mark individual read */
  document.getElementById('notifPageList').addEventListener('click', e => {
    const btn = e.target.closest('.np-mark-btn');
    if (btn) { markNotifRead(parseInt(btn.dataset.notifId)); return; }
    const card = e.target.closest('.notif-page-card');
    if (card) markNotifRead(parseInt(card.dataset.notifId));
  });

  /* Full page: mark all */
  document.getElementById('pageMarkAllRead')?.addEventListener('click', markAllRead);

  /* Initial page render (renders hidden; updates when page is activated) */
  renderNotifPageTabs();
  renderNotifPageList('all');
}

/* ══════════════════════════════════════════════
   AI INSIGHTS
══════════════════════════════════════════════ */

const AI_CARDS = [
  {
    id: 'portfolio',
    title: 'Portfolio Health',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    variants: [
      'Portfolio health has improved by 6 points this week, reaching an average score of 74/100. 18 buyers moved from Medium to Low risk following successful EMD renewals. However, 5 accounts remain critically inactive for 30+ days and require immediate outreach. The Hyderabad cluster continues to show consistent bid participation, contributing 38% of total auction volume.',
      'Current portfolio stands at 74/100 average health score across 32 active buyers. The top quartile of buyers (8 accounts) contribute 61% of auction revenue — a concentration risk worth monitoring. 3 buyers have improved risk tier this week after completing payment settlements. Recommend scheduling quarterly reviews for the bottom 20% of accounts.',
      'Overall portfolio is trending stable with minor improvement this period. 6 out of 32 buyers are flagged for deteriorating engagement metrics. Payment compliance rate is at 87%, up from 82% last month. EMD coverage is healthy at 94%, though 2 high-value accounts are approaching renewal deadlines within 7 days.',
    ],
  },
  {
    id: 'risk',
    title: 'Risk Alerts',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    variants: [
      '3 buyers have been flagged as Critical risk this week: Rajesh Kumar (inactive 47 days), Priya Logistics (EMD expired), and Delta Auto (3 consecutive payment delays). 8 additional accounts are in High risk state. Immediate follow-up recommended for all Critical accounts. Risk score trend shows a slight increase — 18.7% of portfolio in High or Critical state vs 15.2% last week.',
      'Risk concentration remains elevated. The Critical cohort has grown by 1 account this period. Root causes are split: 42% inactive engagement, 31% payment delays, 18% EMD/approval issues, 9% low bid activity. Buyers in the Pune region show 2.3x higher risk rate than the national average — a regional pattern that may warrant dedicated account management.',
      'Current risk landscape: 3 Critical, 5 High, 12 Medium, 12 Low. Week-over-week change shows 1 buyer escalated from High to Critical, 2 buyers recovered from Medium to Low. Payment-related risks are the fastest-growing category (+2 this week). Recommend automated EMD expiry alerts to prevent preventable escalations.',
    ],
  },
  {
    id: 'payment',
    title: 'Payment Status',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    variants: [
      'Payment compliance rate is 87% this period, above the 85% threshold target. 4 buyers have outstanding payment delays: 2 are 7–14 days overdue (moderate), 1 is 15–29 days overdue (high priority), and 1 is 30+ days overdue (escalation recommended). Total overdue value exposure is estimated at ₹18.4L. EMD balances are healthy across 94% of active accounts.',
      'Payment health is stable with 28 of 32 buyers current on all obligations. ₹18.4L in outstanding balances requires active follow-up. The 30+ day overdue account (Sunder Enterprises) has been unresponsive to 3 contact attempts — recommend legal/compliance escalation. Two payment chase follow-up tasks are already in progress per the Kanban board.',
      'This period saw 4 successful payment recoveries, improving the on-time rate to 87%. Two buyers are on payment plans that expire within 10 days — confirm renewals proactively. EMD auto-debit for 3 accounts is scheduled for next week. Recommend sending pre-debit notices at least 48 hours in advance to reduce disputes.',
    ],
  },
  {
    id: 'actions',
    title: 'Recommended Actions',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    variants: [
      '1. Schedule reactivation calls for all 3 Critical risk buyers this week. 2. Send EMD renewal notice to 2 accounts expiring within 7 days (Priya Logistics, Metro Dealers). 3. Escalate Sunder Enterprises payment dispute to collections team. 4. Review bid support needs for 4 buyers with <2 bids in the last 30 days. 5. Update health scores for 6 buyers awaiting manual review since last quarter.',
      '1. Prioritize same-day outreach to Rajesh Kumar — 47-day inactivity is a churn signal. 2. Assign Anika Singh as dedicated contact for the Pune high-risk cluster. 3. Close 5 overdue follow-up tasks on the Kanban board before end of week. 4. Initiate EMD top-up requests for 2 low-balance accounts. 5. Share auction calendar for next month with all High+ risk buyers to re-engage bidding.',
      '1. Run a re-engagement campaign for 6 inactive buyers — personalized auction recommendations. 2. Complete the 3 pending credit checks in the follow-up queue. 3. Confirm payment arrangement with Sunder Enterprises or begin escalation. 4. Schedule a team review of the Pune region account strategy. 5. Update CRM notes for 9 buyers contacted this week to keep records current.',
    ],
  },
];

let aiHasGenerated = false;
let aiIsRunning   = false;
let aiVariantSeed = 0;

function aiDelay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeAIText(el, text) {
  el.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'ai-cursor';
  el.appendChild(cursor);

  for (let i = 0; i < text.length; i++) {
    cursor.insertAdjacentText('beforebegin', text[i]);
    /* Natural rhythm: longer pause at sentence boundaries */
    const ch = text[i];
    const pause = (ch === '.' || ch === '!' || ch === '?') ? 55
                : (ch === ',' || ch === ':') ? 28
                : 11 + Math.random() * 8;
    await aiDelay(pause);
  }
  cursor.remove();
}

function buildAICard(card, summaryText, expanded) {
  return `
    <div class="ai-card ${expanded ? 'ai-card-expanded' : ''}" data-ai-card="${card.id}">
      <div class="ai-card-header" data-ai-toggle="${card.id}">
        <div class="ai-card-title-row">
          <span class="ai-card-icon">${card.icon}</span>
          <span class="ai-card-title">${card.title}</span>
          <span class="ai-generated-badge">AI Generated</span>
        </div>
        <div class="ai-card-actions">
          <span class="ai-confidence">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            High confidence
          </span>
          <button class="ai-card-chevron" aria-label="Toggle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>
      <div class="ai-card-body">
        <p class="ai-summary-text" data-ai-text="${card.id}">${summaryText ? summaryText : ''}</p>
      </div>
    </div>`;
}

async function generateAISummaries() {
  if (aiIsRunning) return;
  aiIsRunning = true;

  const overlay  = document.getElementById('aiThinkingOverlay');
  const grid     = document.getElementById('aiCardsGrid');
  const metaBar  = document.getElementById('aiMetaBar');
  const btn      = document.getElementById('aiGenerateBtn');

  /* Pick a variant set (cycles 0→1→2→0…) */
  const v = aiVariantSeed % 3;
  aiVariantSeed++;

  btn.disabled = true;
  btn.classList.add('btn-ai-loading');

  /* Show thinking overlay */
  overlay.classList.add('active');
  grid.innerHTML = '';
  metaBar.innerHTML = '';

  await aiDelay(1800);

  overlay.classList.remove('active');

  /* Render cards one by one with typing animation */
  for (let i = 0; i < AI_CARDS.length; i++) {
    const card = AI_CARDS[i];
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildAICard(card, '', true);
    const cardEl = wrapper.firstElementChild;
    cardEl.style.opacity = '0';
    cardEl.style.transform = 'translateY(16px)';
    grid.appendChild(cardEl);

    /* Slide in */
    await aiDelay(30);
    cardEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    cardEl.style.opacity = '1';
    cardEl.style.transform = 'translateY(0)';

    /* Type the summary text */
    const textEl = cardEl.querySelector(`[data-ai-text="${card.id}"]`);
    await aiDelay(100);
    await typeAIText(textEl, card.variants[v]);

    await aiDelay(160);
  }

  /* Show meta bar */
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  metaBar.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    Last generated: ${dateStr} at ${timeStr}
    <span class="ai-meta-dot"></span>
    Based on ${MOCK_BUYERS.length} buyer accounts`;

  aiHasGenerated = true;
  aiIsRunning    = false;
  btn.disabled   = false;
  btn.classList.remove('btn-ai-loading');
}

function initAIPage() {
  /* Generate button */
  document.getElementById('aiGenerateBtn')?.addEventListener('click', () => {
    aiHasGenerated = false;
    generateAISummaries();
  });

  /* Expand/collapse delegation */
  document.getElementById('aiCardsGrid')?.addEventListener('click', e => {
    const header = e.target.closest('[data-ai-toggle]');
    if (!header) return;
    const cardEl = header.closest('.ai-card');
    if (cardEl) cardEl.classList.toggle('ai-card-expanded');
  });
}

/* ══════════════════════════════════════════════
   MICRO-INTERACTIONS
══════════════════════════════════════════════ */

function initRipple() {
  document.addEventListener('pointerdown', e => {
    const btn = e.target.closest('button, .nav-item, .risk-pill, .hf-btn, .an-date-btn, .page-btn, .qa-btn');
    if (!btn || btn.disabled) return;

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-fx';
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px; left:${x}px; top:${y}px;
      background:rgba(255,255,255,0.12);
      animation: ripplePop 0.45s ease forwards;
    `;

    const prevPos = getComputedStyle(btn).position;
    if (prevPos === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 480);
  });
}

/* ══════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════ */

function init() {
  renderWelcomeDate();
  renderStats();
  initNav();
  initSidebar();
  initSearch();
  initQuickActions();
  initBuyersPage();
  initDrawer();
  initHealthPage();
  initRiskPage();
  initFollowUps();
  initNotifications();
  initAnalytics();
  initAIPage();
  initRipple();
}

document.addEventListener('DOMContentLoaded', init);
