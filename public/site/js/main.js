/* ============================================================
   Spazio Perdizes — interações mínimas (vanilla)
   1. header ao rolar  2. menu mobile  3. reveal  4. preview serviços
   ============================================================ */
(function () {
  "use strict";

  /* 1. header ------------------------------------------------ */
  var header = document.getElementById("header");
  var onScroll = function () {
    header.classList.toggle("is-stuck", window.scrollY > window.innerHeight * 0.8);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 2. menu mobile ------------------------------------------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu-mobile");
  var toggle = function (open) {
    burger.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    header.classList.toggle("is-stuck", open ? false : window.scrollY > window.innerHeight * 0.8);
  };
  burger.addEventListener("click", function () {
    toggle(burger.getAttribute("aria-expanded") !== "true");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { toggle(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) toggle(false);
  });

  /* 3. reveal no scroll -------------------------------------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* 4. preview de imagem nos serviços (desktop) --------------- */
  var preview = document.getElementById("srvPreview");
  var previewImg = preview ? preview.querySelector("img") : null;
  var fine = window.matchMedia("(hover: hover) and (min-width: 901px)").matches;
  if (preview && fine) {
    var x = 0, y = 0, raf = null;
    var move = function () {
      preview.style.transform = "translate(" + x + "px," + y + "px) translate(-50%,-50%)" +
        (preview.classList.contains("is-on") ? " scale(1)" : " scale(.96)");
      raf = null;
    };
    document.querySelectorAll(".srv").forEach(function (li) {
      li.addEventListener("mouseenter", function () {
        previewImg.src = li.dataset.img;
        previewImg.alt = "";
        preview.classList.add("is-on");
      });
      li.addEventListener("mouseleave", function () { preview.classList.remove("is-on"); });
    });
    document.querySelector(".servicos").addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(move);
    });
  }
})();
