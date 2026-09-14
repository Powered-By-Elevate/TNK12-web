/* True North K-12 — shared behaviour: nav, scroll progress, back-to-top. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- always land at the top of a newly opened page ----
     Following a link while scrolled deep into a long page could leave the browser's
     restored scroll position applied to the new document, dropping the reader at the
     bottom of it. A back/forward move should still restore where the reader was, so
     only a fresh navigation is forced to the top. */
  (function () {
    var entry = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || null;
    var isBackForward = entry ? entry.type === "back_forward"
                              : (performance.navigation && performance.navigation.type === 2);
    if (isBackForward) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) return;            // an in-page anchor is a deliberate destination
    var toTop = function () { window.scrollTo(0, 0); };
    toTop();
    window.addEventListener("load", toTop, { once: true });
  })();

  /* ---- mobile navigation ---- */
  var toggle = document.querySelector(".nav__toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    }, { passive: true });
  }

  /* ---- scroll progress + back to top ---- */
  var bar = document.getElementById("progress");
  var top = document.getElementById("toTop");
  var mark = document.querySelector(".hero, .pagehead");
  var queued = false;

  function update() {
    var se = document.scrollingElement || document.documentElement;
    var max = se.scrollHeight - se.clientHeight;
    var y = window.scrollY || window.pageYOffset || se.scrollTop || 0;
    var past = mark ? y > mark.offsetHeight * 0.55 : y > 400;
    if (bar) {
      bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
      bar.classList.toggle("is-on", past);
    }
    if (top) top.classList.toggle("is-on", past);
    queued = false;
  }
  window.addEventListener("scroll", function () {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  if (top) top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ---- hero scroll cue (home only) ---- */
  var cue = document.getElementById("scrollCue");
  if (cue) cue.addEventListener("click", function () {
    var next = document.querySelector(".figures");
    if (next) next.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  });

  /* ---- reveal on scroll ---- */
  if (!reduce && "IntersectionObserver" in window) {
    var items = document.querySelectorAll("[data-reveal]");
    if (items.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      items.forEach(function (el) { el.classList.add("will-reveal"); io.observe(el); });
    }
  }
})();
