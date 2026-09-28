/* ============================================================
   HyMotion marketing preview — interactions
   nav drawer · EN/AR + RTL · reveal · tabs · workflow · countup
   No dependencies. Progressive enhancement only.
   ============================================================ */
(function (global) {
  "use strict";

  /* ── i18n: data-en / data-ar attributes drive all copy ── */
  var lang = "en";
  try {
    var urlLang = new URLSearchParams(location.search).get("lang");
    lang = urlLang === "ar" || urlLang === "en" ? urlLang : (localStorage.getItem("hm_lang") || "en");
  } catch (e) {}

  function applyLang(next) {
    lang = next;
    try { localStorage.setItem("hm_lang", lang); } catch (e) {}
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var v = el.getAttribute("data-" + lang);
      if (v != null && !el.querySelector("[data-en]")) el.textContent = v;
    });
    document.querySelectorAll("[data-en-aria]").forEach(function (el) {
      var v = el.getAttribute("data-" + lang + "-aria");
      if (v != null) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-lang-chip]").forEach(function (el) {
      el.textContent = lang === "en" ? "عربي" : "EN";
    });
    updateWaFloat();
    document.dispatchEvent(new CustomEvent("hm:lang", { detail: { lang: lang } }));
  }

  /* floating WhatsApp: prefilled message follows the site language */
  function updateWaFloat() {
    var wa = document.querySelector(".WhatsAppFloat");
    if (!wa) return;
    var msg = lang === "ar"
      ? "السلام عليكم، عايز أعرف تفاصيل عن HyMotion"
      : "Hi, I'd like to know more about HyMotion";
    wa.href = "https://wa.me/201070386575?text=" + encodeURIComponent(msg);
  }

  /* ── Nav drawer ───────────────────────────────────────── */
  function initNav() {
    var btn = document.getElementById("menuBtn");
    var drawer = document.getElementById("navDrawer");
    if (!btn || !drawer) return;
    btn.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (!drawer.contains(e.target) && !btn.contains(e.target) && drawer.classList.contains("is-open")) {
        drawer.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
    document.querySelectorAll("[data-lang-chip]").forEach(function (el) {
      el.addEventListener("click", function () {
        applyLang(lang === "en" ? "ar" : "en");
      });
    });

    /* aria-current for nav — exactly one active item, including hash links */
    var here = (location.pathname.replace(/\/+$/, "") || "/").toLowerCase();
    var currentHash = location.hash.toLowerCase();
    var navLinks = document.querySelectorAll(".Navbar-links a, .NavDrawer a");
    var pageLink = null;
    var hashLink = null;

    navLinks.forEach(function (a) {
      a.removeAttribute("aria-current");
      var rawHref = a.getAttribute("href") || "";
      var parts = rawHref.split("#");
      var href = parts[0].replace(/\/+$/, "").toLowerCase() || "/";
      var hash = parts.length > 1 ? "#" + parts[1].toLowerCase() : "";

      if (href === here) {
        if (hash && hash === currentHash) {
          hashLink = a;
        } else if (!hash && !pageLink) {
          pageLink = a;
        }
      }
    });

    /* Features is a section link on Product. When #modules is open, it is
       the active item; otherwise Product remains the single page-level item. */
    (hashLink || pageLink)?.setAttribute("aria-current", "page");
  }

  /* ── Reveal on scroll ─────────────────────────────────── */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in global)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Tabs ─────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (widget) {
      var btns = widget.querySelectorAll(".tab-btn");
      if (!btns.length && widget.previousElementSibling && widget.previousElementSibling.classList.contains("tabs")) {
        btns = widget.previousElementSibling.querySelectorAll(".tab-btn");
      }
      var panels = widget.querySelectorAll(".tab-panel");
      if (!btns.length || !panels.length) return;
      function select(i) {
        btns.forEach(function (b, j) {
          b.setAttribute("aria-selected", i === j ? "true" : "false");
          b.tabIndex = i === j ? 0 : -1;
        });
        panels.forEach(function (p, j) { p.classList.toggle("is-active", i === j); });
      }
      btns.forEach(function (b, i) {
        b.addEventListener("click", function () { select(i); });
        b.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            var d = e.key === "ArrowRight" ? 1 : -1;
            var n = (i + d + btns.length) % btns.length;
            select(n); btns[n].focus();
          }
        });
      });
      select(0);
    });
  }

  /* ── Workflow stepper ─────────────────────────────────── */
  var WF_STEPS = [
    { frame: "shift",      who: { en: "Reception", ar: "الاستقبال" },
      t: { en: "Open shift", ar: "فتح الوردية" },
      d: { en: "The day starts with a counted cash float. Every payment that follows is tied to this shift — nothing floats unaccounted.", ar: "يبدأ اليوم بعدّ نقطة بداية نقدية. كل دفعة بعدها مرتبطة بهذه الوردية — لا مباليد غير محسوبة." } },
    { frame: "addMember",  who: { en: "Reception", ar: "الاستقبال" },
      t: { en: "Add member", ar: "إضافة عضو" },
      d: { en: "Name and phone is enough to start. The profile lives in the system from minute one — not in a notebook by the door.", ar: "الاسم والرقم يكفيان للبدء. الملف يعيش في النظام من أول لحظة — مش في دفتر عند الباب." } },
    { frame: "membership", who: { en: "Reception", ar: "الاستقبال" },
      t: { en: "Create membership", ar: "إنشاء اشتراك" },
      d: { en: "Pick a plan from the gym's own catalog. Prices, durations, and what's included are defined by the gym.", ar: "اختر خطة من كتالوج الصالة نفسها. الأسعار والمدد والمحتوى تحددها الصالة." } },
    { frame: "payment",    who: { en: "Reception", ar: "الاستقبال" },
      t: { en: "Collect payment", ar: "تحصيل الدفعة" },
      d: { en: "Cash or card — the invoice is numbered automatically and lands on the open shift's cash summary.", ar: "كاش أو بطاقة — الفاتورة تأخذ رقمها تلقائياً وتُسجَّل على ملخص وردية الصندوق المفتوحة." } },
    { frame: "card",       who: { en: "Reception", ar: "الاستقبال" },
      t: { en: "Issue member card", ar: "إصدار كارت العضو" },
      d: { en: "Print a gym-branded PVC card with its barcode. From now on, check-in is one scan away.", ar: "اطبع كارت PVC بهوية الصالة ومعه باركود. من هنا، حضور العضو مسح واحدة." } },
    { frame: "attendance", who: { en: "Front desk", ar: "مكتب الاستقبال" },
      t: { en: "Check-in", ar: "تسجيل حضور" },
      d: { en: "Card, QR, barcode, manual, or biometric — every method feeds the same attendance record.", ar: "كارت أو QR أو باركود أو يدوي أو بصمة — كل طريقة تغذي نفس سجل الحضور." } },
    { frame: "sales",      who: { en: "Reception", ar: "الاستقبال" },
      t: { en: "Track the sale", ar: "تتبع البيع" },
      d: { en: "Memberships, products, and invoices in one sale record — stock included, receipt printed.", ar: "اشتراكات ومنتجات وفواتير في سجل بيع واحد — مع تحديث المخزون وطبع الإيصال." } },
    { frame: "owner",      who: { en: "Owner", ar: "المالك" },
      t: { en: "Owner sees activity", ar: "المالك يرى النشاط" },
      d: { en: "At any moment, the owner dashboard shows today's sales, members, check-ins, and shift state — from any device on the gym network.", ar: "في أي لحظة، تعرض لوحة المالك مبيعات اليوم والأعضاء والحضور وحالة الوردية — من أي جهاز على شبكة الصالة." } }
  ];

  function initWorkflow() {
    var root = document.querySelector("[data-workflow]");
    if (!root || !global.HmFrames) return;
    var list = root.querySelector(".wf-steps");
    var stage = root.querySelector("[data-wf-frame]");
    var whoEl = root.querySelector("[data-wf-who]");
    var descEl = root.querySelector("[data-wf-desc]");
    var countEl = root.querySelector("[data-wf-count]");
    var prev = root.querySelector("[data-wf-prev]");
    var next = root.querySelector("[data-wf-next]");
    if (!list || !stage) return;
    var idx = 0, timer = null;

    function render() {
      var s = WF_STEPS[idx];
      list.querySelectorAll(".wf-step").forEach(function (b, i) {
        b.setAttribute("aria-selected", i === idx ? "true" : "false");
      });
      stage.innerHTML = global.HmFrames.frames[s.frame]();
      if (whoEl) whoEl.textContent = (lang === "ar" ? s.who.ar : s.who.en) + " · Fitness Hub";
      if (descEl) descEl.innerHTML = "<b>" + (lang === "ar" ? s.t.ar : s.t.en) + ".</b> " + (lang === "ar" ? s.d.ar : s.d.en);
      if (countEl) countEl.textContent = (idx + 1) + " / " + WF_STEPS.length;
    }
    function go(i) { idx = (i + WF_STEPS.length) % WF_STEPS.length; render(); restart(); }
    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 6000);
    }

    WF_STEPS.forEach(function (s, i) {
      var b = document.createElement("button");
      b.className = "wf-step";
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.innerHTML = '<span class="idx">' + (i + 1) + '</span><span class="txt"><b>' + s.t.en + "</b><small>" + s.who.en + "</small></span>";
      b.addEventListener("click", function () { go(i); });
      list.appendChild(b);
    });
    if (prev) prev.addEventListener("click", function () { go(idx - 1); });
    if (next) next.addEventListener("click", function () { go(idx + 1); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); }
    });
    /* pause auto-advance while the user is engaged */
    root.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    root.addEventListener("mouseleave", restart);
    root.addEventListener("focusin", function () { if (timer) clearInterval(timer); });
    root.addEventListener("focusout", restart);
    document.addEventListener("hm:lang", function () {
      list.querySelectorAll(".wf-step").forEach(function (b, i) {
        var s = WF_STEPS[i];
        b.querySelector(".txt b").textContent = lang === "ar" ? s.t.ar : s.t.en;
        b.querySelector(".txt small").textContent = lang === "ar" ? s.who.ar : s.who.en;
      });
      render();
    });
    render();
    /* only auto-advance when on screen */
    if ("IntersectionObserver" in global) {
      var io = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) restart();
        else if (timer) clearInterval(timer);
      }, { threshold: 0.25 });
      io.observe(root);
    }
  }

  /* ── Count-up (only where meaningful) ─────────────────── */
  function initCountup() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length || !("IntersectionObserver" in global)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var t0 = null;
        function tick(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 900, 1);
          el.textContent = Math.round(target * (0.2 + 0.8 * p)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  onReady(function () {
    applyLang(lang);
    initNav();
    initReveal();
    initTabs();
    initWorkflow();
    initCountup();
  });
})(window);
