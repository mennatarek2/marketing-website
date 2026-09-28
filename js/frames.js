/* ============================================================
   HyMotion product frames — high-fidelity HTML mockups that
   mirror the real staff console IA (nav.js categories) and
   visual language (charcoal sidebar · light content · Cairo).
   Frames render LTR everywhere; marketing copy handles AR.
   ============================================================ */
(function (global) {
  "use strict";

  /* Brand mark (exact asset geometry) */
  var MARK =
    '<svg viewBox="0 0 148 167" aria-hidden="true"><path fill="#7ACC00" d="M38 0H0V139L79 58H38Z"/><path fill="#7ACC00" d="M148 23L68 105H112V167H148Z"/></svg>';

  /* Minimal stroke icon set (Tabler-style, matches product) */
  function icon(d, extra) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (extra || "") + d + "</svg>"
    );
  }
  var I = {
    dash: icon('<path d="M4 4h6v8H4zM14 4h6v5h-6zM4 16h6v4H4zM14 13h6v7h-6z"/>'),
    cash: icon('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.4"/><path d="M6 9h.01M18 15h.01"/>'),
    users: icon('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M15.5 5.4a3.2 3.2 0 0 1 0 5.9M17.4 14.7c2 .5 3.3 1.9 3.8 4.1"/>'),
    door: icon('<path d="M13 4h6v16h-6M9 12h7M13 9l3 3-3 3M4 4v16"/>'),
    cart: icon('<circle cx="6" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/><path d="M3 4h2l2.4 11h10.2L20 8H6"/>'),
    call: icon('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
    card: icon('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>'),
    plan: icon('<path d="M7 4h10a2 2 0 0 1 2 2v14l-7-3-7 3V6a2 2 0 0 1 2-2Z"/>'),
    receipt: icon('<path d="M6 3h12v18l-2-1.4L14 21l-2-1.4L10 21l-2-1.4L6 21zM9 8h6M9 12h6"/>'),
    chart: icon('<path d="M4 20V10M10 20V4M16 20v-8M21 20H3"/>'),
    box: icon('<path d="M12 3 21 8v8l-9 5-9-5V8l9-5ZM3.5 8.2 12 13l8.5-4.8M12 13v8"/>'),
    db: icon('<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>'),
    search: icon('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>'),
    print: icon('<path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z"/>'),
    scan: icon('<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>'),
    finger: icon('<path d="M7 8a5 5 0 0 1 10 0v3c0 3-1 5.6-3 8M7 11v2c0 2 .4 3.6 1.2 5.2M12 11v4c0 1.4.3 2.7 1 3.8M17 11c0 4.4-1.2 7-3 9"/>'),
    qr: icon('<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/>'),
    wifi: icon('<path d="M12 18h.01M8.5 14.5a5 5 0 0 1 7 0M5 11a10 10 0 0 1 14 0M2 7.5a15 15 0 0 1 20 0"/>')
  };

  /* Real staff console IA — condensed to mockup size */
  var NAV = [
    ["Home", [["dashboard", "Dashboard", I.dash]]],
    ["Front Desk", [
      ["shift", "Current Shift", I.cash],
      ["members", "Members", I.users],
      ["attendance", "Member Attendance", I.door],
      ["sales", "Sales", I.cart],
      ["cards", "Access Cards", I.card]
    ]],
    ["Business & Finance", [
      ["plans", "Plans", I.plan],
      ["invoices", "Invoices", I.receipt],
      ["reports", "Reports", I.chart]
    ]],
    ["People & HR", [["hr", "Employees", I.users]]],
    ["Catalog & Inventory", [["products", "Products", I.box]]],
    ["System", [["backup", "Backup & Recovery", I.db]]]
  ];

  function nav(active) {
    return NAV.map(function (group) {
      return (
        '<div class="hm-group">' + group[0] + "</div>" +
        group[1].map(function (it) {
          return (
            '<div class="hm-item' + (it[0] === active ? " is-active" : "") + '">' +
            it[2] + "<span>" + it[1] + "</span></div>"
          );
        }).join("")
      );
    }).join("");
  }

  function shell(opts) {
    var chips = (opts.chips || []).map(function (c) {
      return '<span class="hm-chip ' + (c[1] || "") + '">' + c[0] + "</span>";
    }).join("");
    return (
      '<div class="hm-window" role="img" aria-label="' + (opts.label || "HyMotion product interface — sample gym data") + '">' +
      '<div class="hm-titlebar"><div class="dots"><i></i><i></i><i></i></div>' +
      '<span class="url"><span class="lock">' + I.db.replace("viewBox", 'style="width:.95em;height:.95em;display:inline" viewBox') + "</span>" + (opts.url || "hymotion.local/dashboard") + "</span></div>" +
      (opts.demo ? '<div class="hm-demo-banner"><span class="dot"></span>Demonstration environment — sample data only</div>' : "") +
      '<div class="hm-app">' +
      '<aside class="hm-sb">' +
      '<div class="hm-brand">' + MARK + "<span>HyMotion</span></div>" +
      '<div class="hm-nav">' + nav(opts.active) + "</div>" +
      '<div class="hm-sb-foot"><span class="hm-user">' + (opts.userInitials || "AS") + "</span><span><b>" +
      (opts.userName || "Ahmed S.") + "</b><small>" + (opts.userRole || "Reception") + "</small></span></div>" +
      "</aside>" +
      '<div class="hm-main">' +
      '<div class="hm-top"><span class="crumb">' + opts.crumb +
      (opts.sub ? " <small>· " + opts.sub + "</small>" : "") + "</span>" +
      '<span class="hm-search">' + I.search + "<span>Search members, invoices…</span></span>" + chips + "</div>" +
      '<div class="hm-body">' + opts.body + "</div>" +
      "</div></div></div>"
    );
  }

  function avatar(initials, hue) {
    var colors = ["#0D6B6B", "#5EAF00", "#D97706", "#148F8F", "#4A4A4A", "#0891B2", "#DC2626"];
    return '<span class="hm-av" style="background:' + (colors[hue % colors.length]) + '">' + initials + "</span>";
  }
  function row(whoHtml, midHtml, endHtml) {
    return '<div class="hm-row"><span class="who">' + whoHtml + '</span><span class="fill"></span>' + midHtml + endHtml + "</div>";
  }
  function kpi(label, value, delta, cls) {
    return '<div class="hm-kpi"><div class="l">' + label + '</div><div class="v">' + value +
      '</div><div class="d ' + (cls || "flat") + '">' + delta + "</div></div>";
  }
  function feedRow(av, name, meta, pill, pillCls) {
    return '<div class="hm-row"><span class="who">' + av + "<span><b>" + name + "</b><small>" + meta + "</small></span></span><span class='fill'></span><span class=\"hm-pill " + (pillCls || "ok") + '">' + pill + "</span></div>";
  }

  var frames = {};

  /* ── 1. Dashboard (hero) ─────────────────────────────── */
  frames.dashboard = function () {
    return shell({
      active: "dashboard", crumb: "Dashboard", sub: "Fitness Hub · Today",
      chips: [["Shift open", "live"], ["Egypt · Africa/Cairo", "teal"]],
      userInitials: "MO", userName: "Mostafa O.", userRole: "Owner",
      body:
        '<div class="hm-kpis">' +
        kpi("Active members", "248", "▲ 12 this month", "up") +
        kpi("Checked in today", "41", "QR 18 · Card 16 · Manual 7") +
        kpi("Sales today", "EGP 4,250", "19 invoices", "up") +
        kpi("Active memberships", "186", "8 ending soon") +
        "</div>" +
        '<div class="hm-cols">' +
        '<div class="hm-card"><h4>Today’s activity <span class="more">View all</span></h4><div class="hm-feed">' +
        feedRow(avatar("KH", 0), "Karim H.", "Gold · checked in 14:02", "In", "ok") +
        feedRow(avatar("NA", 1), "Nour A.", "Monthly · checked in 13:48", "In", "ok") +
        feedRow(avatar("MF", 2), "Mahmoud F.", "Protein bar · sale 13:40", "Paid", "lime") +
        feedRow(avatar("SL", 3), "Sara L.", "3-month membership · 12:55", "New", "info") +
        "</div></div>" +
        '<div class="hm-card"><h4>Live occupancy</h4><div class="hm-occ">' +
        '<div class="hm-ring"><i>42%</i></div>' +
        '<div><div class="hm-h" style="font-size:1.25em">38 <small>on floor now</small></div>' +
        '<div style="font-size:.78em;color:var(--ltt);font-weight:600">Capacity 90 · set by the gym</div></div>' +
        "</div></div></div>" +
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Revenue — last 6 months <span class="more">EGP</span></h4><div class="hm-bars">' +
        [38, 52, 46, 63, 58, 84].map(function (h, i) {
          return '<div class="bar' + (i === 5 ? " hi" : "") + '"><i style="height:' + h + '%"></i><span>' + ["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i] + "</span></div>";
        }).join("") + "</div></div>" +
        '<div class="hm-card"><h4>Needs attention</h4><div class="hm-feed">' +
        feedRow(avatar("YT", 4), "Yara T.", "Membership ends in 5 days", "Soon", "warn") +
        feedRow(avatar("OE", 5), "Omar E.", "Frozen · resume requested", "Frozen", "frz") +
        feedRow(avatar("HA", 6), "Hana A.", "Outstanding balance EGP 300", "Due", "dng") +
        "</div></div></div>"
    });
  };

  /* ── 2. Members ──────────────────────────────────────── */
  frames.members = function () {
    function mRow(ini, hue, name, plan, status, cls) {
      return row(
        avatar(ini, hue) + "<span><b>" + name + "</b><small>" + plan + "</small></span>",
        '<span class="amt muted" style="margin-inline-end:1em">EGP —</span>',
        '<span class="hm-pill ' + cls + '">' + status + "</span>"
      );
    }
    return shell({
      active: "members", crumb: "Members", sub: "482 profiles",
      chips: [["Add member", ""]],
      body:
        '<div class="hm-card"><h4>All members <span class="more">Search · Filter · Export</span></h4>' +
        mRow("SM", 0, "Sara Mostafa", "Gold · 12 months · ends 12 Mar", "Active", "ok") +
        mRow("AA", 1, "Ahmed Ali", "Monthly · auto-renew", "Active", "ok") +
        mRow("OF", 2, "Omar F.", "Quarterly · ends 08 Oct", "Expiring", "warn") +
        mRow("YK", 3, "Yara K.", "Trial · day 3 of 7", "Trial", "info") +
        mRow("MK", 4, "Mariam K.", "Frozen till 15 Oct", "Frozen", "frz") +
        mRow("HT", 5, "Hassan T.", "1 year · ended 02 Sep", "Ended", "mut") +
        "</div>" +
        '<div class="hm-card"><h4>Membership · Sara Mostafa</h4>' +
        '<div class="hm-cols-eq"><div class="hm-cash">' +
        '<div class="line"><span>Plan</span><b>Gold — 12 months</b></div>' +
        '<div class="line"><span>Status</span><b style="color:var(--suc600)">Active</b></div>' +
        '<div class="line"><span>Ends</span><b>12 Mar 2027</b></div>' +
        '<div class="line"><span>Check-ins</span><b>96 visits</b></div>' +
        '</div><div class="hm-cash">' +
        '<div class="line"><span>Paid</span><b>EGP 2,400</b></div>' +
        '<div class="line"><span>Method</span><b>Cash · INV-0142</b></div>' +
        '<div class="line"><span>Card</span><b>GYM-042 · PVC issued</b></div>' +
        '<div class="line total"><span>Visits this month</span><span>14</span></div>' +
        "</div></div></div>"
    });
  };

  /* ── 3. Attendance / check-in ────────────────────────── */
  frames.attendance = function () {
    return shell({
      active: "attendance", crumb: "Member Attendance", sub: "Front desk",
      chips: [["41 today", "live"], ["Scanner ready", ""]],
      userInitials: "RE", userName: "Rana E.", userRole: "Reception",
      body:
        '<div class="hm-scan"><span class="icon">' + I.scan + "</span><span><b>Ready to check in</b>" +
        "<small>Scan a member card, QR, or type a code — Enter confirms</small></span>" +
        '<span class="code">GYM-042</span></div>' +
        '<div class="hm-toast"><span class="ok">✓</span>Checked in — Ahmed Ali · Monthly · visit 34 <span style="margin-inline-start:auto">14:06</span></div>' +
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Live feed</h4><div class="hm-feed">' +
        feedRow(avatar("AA", 1), "Ahmed Ali", "QR · 14:06", "In", "ok") +
        feedRow(avatar("KH", 0), "Karim H.", "Card · 14:02", "In", "ok") +
        feedRow(avatar("NA", 3), "Nour A.", "Manual · 13:48", "In", "ok") +
        feedRow(avatar("SB", 2), "Sara B.", "Biometric · 13:31", "In", "ok") +
        "</div></div>" +
        '<div class="hm-card"><h4>Today by method</h4><div class="hm-feed">' +
        row("<b>QR code</b>", '<span class="amt">18</span>', '<span class="hm-pill mut">44%</span>') +
        row("<b>PVC / barcode card</b>", '<span class="amt">16</span>', '<span class="hm-pill mut">39%</span>') +
        row("<b>Manual</b>", '<span class="amt">7</span>', '<span class="hm-pill mut">17%</span>') +
        "</div></div></div>"
    });
  };

  /* ── 4. Current Shift ────────────────────────────────── */
  frames.shift = function () {
    return shell({
      active: "shift", crumb: "Current Shift", sub: "Reception · morning",
      chips: [["Open since 08:30", "live"]],
      userInitials: "RE", userName: "Rana E.", userRole: "Reception",
      body:
        '<div class="hm-kpis">' +
        kpi("Opening float", "EGP 500", "Counted at open") +
        kpi("Collected", "EGP 4,250", "19 invoices", "up") +
        kpi("Cash sales", "EGP 3,150", "15 invoices") +
        kpi("Products sold", "6 items", "EGP 1,100", "up") +
        "</div>" +
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Cash summary</h4><div class="hm-cash">' +
        '<div class="line"><span>Opening float</span><b>EGP 500</b></div>' +
        '<div class="line"><span>Cash in</span><b>EGP 3,150</b></div>' +
        '<div class="line"><span>Cash out (expenses)</span><b>EGP 0</b></div>' +
        '<div class="line total"><span>Expected in drawer</span><span>EGP 3,650</span></div>' +
        "</div></div>" +
        '<div class="hm-card"><h4>Latest receipts</h4><div class="hm-feed">' +
        feedRow(avatar("SM", 0), "Sara M.", "Gold 12 months · INV-0142", "EGP 2,400", "lime") +
        feedRow(avatar("MF", 2), "Walk-in", "Protein bar · INV-0141", "EGP 150", "lime") +
        feedRow(avatar("DK", 4), "Dina K.", "Monthly · INV-0140", "EGP 800", "lime") +
        "</div></div></div>"
    });
  };

  /* ── 5. Sales / POS ──────────────────────────────────── */
  frames.sales = function () {
    return shell({
      active: "sales", crumb: "Sales", sub: "Point of sale",
      chips: [["Shift open", "live"]],
      userInitials: "RE", userName: "Rana E.", userRole: "Reception",
      body:
        '<div class="hm-cols">' +
        '<div class="hm-card"><h4>Cart · Walk-in</h4>' +
        row("<span><b>Gold membership — 12 months</b><small>Membership · new sale</small></span>", "", '<span class="amt">EGP 2,400</span>') +
        row("<span><b>Whey protein 2kg</b><small>Product · stock −1</small></span>", "", '<span class="amt">EGP 950</span>') +
        row("<span><b>Shaker bottle</b><small>Product · stock −1</small></span>", "", '<span class="amt">EGP 180</span>') +
        '<div class="hm-cash" style="margin-top:.6em">' +
        '<div class="line"><span>Subtotal</span><b>EGP 3,530</b></div>' +
        '<div class="line total"><span>Total</span><span>EGP 3,530</span></div>' +
        "</div>" +
        '<div style="display:flex;gap:.6em;margin-top:.8em">' +
        '<span class="hm-btn">Cash — selected</span><span class="hm-btn ghost">Card</span><span class="hm-btn ghost">Wallet</span>' +
        "</div></div>" +
        '<div class="hm-card"><h4>Invoice INV-0143</h4>' +
        '<div class="hm-toast"><span class="ok">✓</span>Payment recorded on the open shift</div>' +
        '<div class="hm-cash" style="margin-top:.7em">' +
        '<div class="line"><span>Issued to</span><b>Sara Mostafa</b></div>' +
        '<div class="line"><span>Method</span><b>Cash</b></div>' +
        '<div class="line"><span>Collected by</span><b>Rana E. · Reception</b></div>' +
        '<div class="line"><span>Shift</span><b>Morning · 08:30 →</b></div>' +
        "</div>" +
        '<div style="display:flex;gap:.6em;margin-top:.8em">' +
        '<span class="hm-btn">' + I.print.replace("viewBox", 'style="width:1em;height:1em;display:inline;vertical-align:-.12em" viewBox') + " Print invoice</span>" +
        '<span class="hm-btn ghost">Record sale</span></div></div>' +
        "</div>"
    });
  };

  /* ── 6. Add member (workflow) ────────────────────────── */
  frames.addMember = function () {
    return shell({
      active: "members", crumb: "Members", sub: "Add member",
      chips: [["New profile", ""]],
      userInitials: "RE", userName: "Rana E.", userRole: "Reception",
      body:
        '<div class="hm-cols">' +
        '<div class="hm-card"><h4>New member</h4><div class="hm-form">' +
        "<label>Full name<div class='hm-field w-filled'>Ahmed Adel</div></label>" +
        "<label>Phone<div class='hm-field w-filled'>+20 100 234 5678</div></label>" +
        "<label>Gender<div class='hm-field'></div></label>" +
        "<label>Notes<div class='hm-field'></div></label>" +
        '<span class="hm-btn">Continue to membership</span>' +
        "</div></div>" +
        '<div class="hm-card"><h4>Before HyMotion</h4><div class="hm-feed">' +
        feedRow(avatar("NB", 5), "Notebook row", "Name + phone, no history", "✕", "dng") +
        feedRow(avatar("EX", 4), "Excel sheet", "Updated later, on one PC", "✕", "dng") +
        feedRow(avatar("WA", 3), "WhatsApp message", "Photo of a paper form", "✕", "dng") +
        "</div></div></div>"
    });
  };

  /* ── 7. Create membership (workflow) ─────────────────── */
  frames.membership = function () {
    return shell({
      active: "members", crumb: "Members", sub: "New membership · Ahmed Adel",
      chips: [["1 profile step done", "teal"]],
      userInitials: "RE", userName: "Rana E.", userRole: "Reception",
      body:
        '<div class="hm-h">Choose a plan from the gym catalog <small>Prices are set by your gym — sample data shown</small></div>' +
        '<div style="display:grid;gap:.7em;max-width:34em">' +
        '<div class="hm-plan sel"><span><b>Gold — 12 months</b><small>Gym access + 2 classes/week + sauna</small></span><span class="price">EGP 2,400</span></div>' +
        '<div class="hm-plan"><span><b>Monthly — 1 month</b><small>Gym access</small></span><span class="price">EGP 800</span></div>' +
        '<div class="hm-plan"><span><b>Quarterly — 3 months</b><small>Gym access + 1 class/week</small></span><span class="price">EGP 1,500</span></div>' +
        "</div>" +
        '<div style="display:flex;gap:.6em"><span class="hm-btn">Assign plan · EGP 2,400</span><span class="hm-btn ghost">Back</span></div>'
    });
  };

  /* ── 8. Collect payment (workflow) ───────────────────── */
  frames.payment = function () {
    return shell({
      active: "sales", crumb: "Collect payment", sub: "Ahmed Adel · Gold 12 months",
      chips: [["Shift: Morning", "live"]],
      userInitials: "RE", userName: "Rana E.", userRole: "Reception",
      body:
        '<div class="hm-kpis">' +
        kpi("Due now", "EGP 2,400", "Gold — 12 months") +
        kpi("Method", "Cash", "Tied to open shift") +
        kpi("Invoice", "INV-0144", "Auto-numbered") +
        kpi("Collected by", "Rana E.", "Reception") +
        "</div>" +
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Payment</h4>' +
        '<div style="display:flex;gap:.6em;margin-bottom:.9em">' +
        '<span class="hm-btn">Cash</span><span class="hm-btn ghost">Card</span><span class="hm-btn ghost">Wallet</span></div>' +
        '<div class="hm-cash">' +
        '<div class="line"><span>Plan price</span><b>EGP 2,400</b></div>' +
        '<div class="line"><span>Discount</span><b>EGP 0</b></div>' +
        '<div class="line total"><span>To collect</span><span>EGP 2,400</span></div>' +
        "</div></div>" +
        '<div class="hm-card"><h4>What happens next</h4><div class="hm-feed">' +
        feedRow(avatar("IN", 1), "Invoice INV-0144", "Printed or saved", "Auto", "lime") +
        feedRow(avatar("SH", 0), "Cash shift updated", "Morning shift · EGP 6,650", "Live", "ok") +
        feedRow(avatar("MB", 3), "Membership activates", "Starts today · ends in 12 months", "Ready", "info") +
        "</div></div></div>"
    });
  };

  /* ── 9. Issue card (workflow) ────────────────────────── */
  frames.card = function () {
    return shell({
      active: "cards", crumb: "Access Cards", sub: "Issue · Ahmed Adel",
      chips: [["Card printer ready", ""]],
      userInitials: "RE", userName: "Rana E.", userRole: "Reception",
      body:
        '<div class="hm-cols-eq">' +
        '<div class="hm-pvc-wrap"><div class="hm-pvc">' +
        '<div class="top"><span class="gym"><span class="sq">F</span>Fitness Hub</span><span style="font-size:.62em;color:var(--c400);font-weight:700">MEMBER</span></div>' +
        '<div><div class="name">Ahmed Adel</div><div style="font-size:.7em;color:var(--c300)">Member since Sep 2026</div></div>' +
        '<div class="meta"><span><small>Plan</small><b>Gold · 12 months</b></span><span class="barcode"></span><span><small>ID</small><b style="letter-spacing:.1em">GYM-048</b></span></div>' +
        "</div></div>" +
        '<div class="hm-card"><h4>Card details</h4><div class="hm-cash">' +
        '<div class="line"><span>Type</span><b>PVC · barcode</b></div>' +
        '<div class="line"><span>Linked member</span><b>Ahmed Adel</b></div>' +
        '<div class="line"><span>Barcode</span><b>GYM-048</b></div>' +
        '<div class="line"><span>Printed by</span><b>Rana E.</b></div>' +
        "</div>" +
        '<div class="hm-toast" style="margin-top:.8em"><span class="ok">✓</span>Card printed — ready to hand over</div>' +
        '<div style="display:flex;gap:.6em;margin-top:.8em"><span class="hm-btn">Print card</span><span class="hm-btn ghost">Reprint</span></div>' +
        "</div></div>"
    });
  };

  /* ── 10. Owner view (workflow end) ───────────────────── */
  frames.owner = function () {
    return shell({
      active: "dashboard", crumb: "Dashboard", sub: "Owner view · today",
      chips: [["Morning shift", "live"], ["Z-report 09-25 ✓", "teal"]],
      userInitials: "MO", userName: "Mostafa O.", userRole: "Owner",
      body:
        '<div class="hm-kpis">' +
        kpi("Sales today", "EGP 6,650", "▲ 22 invoices", "up") +
        kpi("New members", "6", "Gold ×2 · Monthly ×4", "up") +
        kpi("Check-ins", "96", "Peak 18:00–20:00") +
        kpi("On floor now", "38", "42% of capacity") +
        "</div>" +
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Every sale, tied to a shift</h4><div class="hm-feed">' +
        feedRow(avatar("RE", 0), "Rana E. · Reception", "Morning shift · EGP 4,250 · 19 invoices", "Open", "ok") +
        feedRow(avatar("TN", 1), "Tamer N. · Reception", "Evening shift · starts 15:00", "Next", "info") +
        feedRow(avatar("Z", 3), "Z-report 09-25", "Counted · variance EGP 0", "Closed", "lime") +
        "</div></div>" +
        '<div class="hm-card"><h4>What happened today</h4><div class="hm-feed">' +
        feedRow(avatar("AA", 2), "Ahmed Adel joined", "Gold 12 months · EGP 2,400 · INV-0144", "New", "lime") +
        feedRow(avatar("SM", 4), "Sara M. renewed", "Monthly · EGP 800 · INV-0140", "Renew", "ok") +
        feedRow(avatar("MF", 5), "3 products sold", "EGP 1,230 · stock updated", "POS", "mut") +
        "</div></div></div>"
    });
  };

  /* ── 11. HR / Employees ──────────────────────────────── */
  frames.hr = function () {
    return shell({
      active: "hr", crumb: "People & HR", sub: "Employees",
      chips: [["12 employees", ""]],
      userInitials: "MO", userName: "Mostafa O.", userRole: "Owner",
      body:
        '<div class="hm-card"><h4>Employees <span class="more">Roles · Permissions</span></h4>' +
        row(avatar("MO", 0) + "<span><b>Mostafa O.</b><small>Owner · full access</small></span>", "", '<span class="hm-pill lime">Owner</span>') +
        row(avatar("RE", 1) + "<span><b>Rana E.</b><small>Reception · members, sales, check-in</small></span>", "", '<span class="hm-pill ok">Reception</span>') +
        row(avatar("KH", 2) + "<span><b>Karim H.</b><small>Trainer · attendance, member activity</small></span>", "", '<span class="hm-pill info">Trainer</span>') +
        row(avatar("HA", 3) + "<span><b>Hana A.</b><small>HR · employees, attendance, payroll</small></span>", "", '<span class="hm-pill frz">HR</span>') +
        "</div>" +
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Employee attendance today</h4><div class="hm-feed">' +
        feedRow(avatar("RE", 1), "Rana E.", "Biometric · in 08:28", "In", "ok") +
        feedRow(avatar("KH", 2), "Karim H.", "Biometric · in 09:02", "In", "ok") +
        feedRow(avatar("TN", 4), "Tamer N.", "Scheduled 15:00", "Later", "mut") +
        "</div></div>" +
        '<div class="hm-card"><h4>Permissions · Reception</h4><div class="hm-feed">' +
        row("<b>Members · Sales · Check-in</b>", "", '<span class="hm-pill ok">Allowed</span>') +
        row("<b>Reports · Finance</b>", "", '<span class="hm-pill dng">Hidden</span>') +
        row("<b>Staff accounts · Settings</b>", "", '<span class="hm-pill dng">Hidden</span>') +
        "</div></div></div>"
    });
  };

  /* ── 12. Reports ─────────────────────────────────────── */
  frames.reports = function () {
    return shell({
      active: "reports", crumb: "Reports", sub: "This month",
      userInitials: "MO", userName: "Mostafa O.", userRole: "Owner",
      body:
        '<div class="hm-kpis">' +
        kpi("Net cash-in", "EGP 96,400", "▲ vs last month", "up") +
        kpi("Memberships", "64 sold", "41 new · 23 renewals", "up") +
        kpi("Products", "182 units", "EGP 21,300", "up") +
        kpi("Shifts", "58 closed", "Z-reports filed", "flat") +
        "</div>" +
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Revenue — last 6 months <span class="more">EGP</span></h4><div class="hm-bars">' +
        [38, 52, 46, 63, 58, 84].map(function (h, i) {
          return '<div class="bar' + (i === 5 ? " hi" : "") + '"><i style="height:' + h + '%"></i><span>' + ["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i] + "</span></div>";
        }).join("") + "</div></div>" +
        '<div class="hm-card"><h4>Reports center</h4><div class="hm-feed">' +
        row("<b>Sales report</b>", "", '<span class="hm-pill ok">Ready</span>') +
        row("<b>Membership report</b>", "", '<span class="hm-pill ok">Ready</span>') +
        row("<b>Attendance report</b>", "", '<span class="hm-pill ok">Ready</span>') +
        row("<b>Staff & shifts</b>", "", '<span class="hm-pill ok">Ready</span>') +
        "</div></div></div>"
    });
  };

  /* ── 13. Backup & recovery ───────────────────────────── */
  frames.backup = function () {
    return shell({
      active: "backup", crumb: "Backup & Recovery", sub: "System",
      chips: [["Local database", "teal"]],
      userInitials: "MO", userName: "Mostafa O.", userRole: "Owner",
      body:
        '<div class="hm-cols-eq">' +
        '<div class="hm-card"><h4>Backups</h4><div class="hm-cash">' +
        '<div class="line"><span>Last backup</span><b>Today · 02:00</b></div>' +
        '<div class="line"><span>Location</span><b>Local disk + USB drive</b></div>' +
        '<div class="line"><span>Automatic</span><b style="color:var(--suc600)">Daily · enabled</b></div>' +
        '<div class="line total"><span>Backups kept</span><span>14</span></div>' +
        "</div>" +
        '<div style="display:flex;gap:.6em;margin-top:.8em"><span class="hm-btn">Back up now</span><span class="hm-btn ghost">Restore…</span></div></div>' +
        '<div class="hm-card"><h4>Recent backups</h4><div class="hm-feed">' +
        feedRow(avatar("DB", 0), "hymotion-2026-09-26.bak", "Today 02:00 · 84 MB", "OK", "ok") +
        feedRow(avatar("DB", 1), "hymotion-2026-09-25.bak", "Fri 02:00 · 84 MB", "OK", "ok") +
        feedRow(avatar("DB", 2), "hymotion-2026-09-24.bak", "Thu 02:00 · 83 MB", "OK", "ok") +
        "</div></div></div>"
    });
  };

  /* Aliases */
  frames.checkin = frames.attendance;

  function inject() {
    var demoEnv = document.body.hasAttribute("data-demo-env");
    document.querySelectorAll("[data-frame]").forEach(function (el) {
      var key = el.getAttribute("data-frame");
      if (!frames[key]) return;
      el.innerHTML = frames[key]();
      if (demoEnv) {
        var bar = el.querySelector(".hm-titlebar");
        if (bar) bar.insertAdjacentHTML("afterend",
          '<div class="hm-demo-banner"><span class="dot"></span>Demonstration environment — sample data only, nothing is saved</div>');
      }
    });
  }

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  onReady(inject);

  global.HmFrames = { mark: MARK, frames: frames, inject: inject };
})(window);
