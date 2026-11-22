/* Domotel Aysén — ambiente: scroll suave, luciérnagas, efectos con el mouse y frases */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var small = window.innerWidth < 768;
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------- Scroll suave (Lenis) ---------------- */
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({
      duration: 1.35,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    var loop = function (t) { lenis.raf(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);

    // Enlaces internos con el mismo deslizamiento suave
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -76, duration: 1.6, force: true });
      if (history.replaceState) history.replaceState(null, "", id);
    });

    // Se detiene mientras está abierto el lightbox o el menú móvil
    var lb = document.getElementById("lightbox");
    var sync = function () {
      if ((lb && !lb.hidden) || document.body.classList.contains("menu-open")) lenis.stop();
      else lenis.start();
    };
    if (lb) new MutationObserver(sync).observe(lb, { attributes: true, attributeFilter: ["hidden"] });
    new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  /* ---------------- Luciérnagas ---------------- */
  function Fireflies(canvas) {
    var host = canvas.parentElement;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var n = Math.round((Number(canvas.dataset.count) || 30) * (small ? 0.5 : 1));
    var w = 0, h = 0, flies = [], running = false, mouse = { x: -999, y: -999 };

    function size() {
      var r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make(randomY) {
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : h + 10,
        r: 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.08 + Math.random() * 0.28),
        ph: Math.random() * Math.PI * 2,
        sp: 0.008 + Math.random() * 0.02,
        sway: 0.3 + Math.random() * 0.7
      };
    }
    function draw(f, a) {
      var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 6);
      g.addColorStop(0, "rgba(255, 214, 150," + (0.55 * a) + ")");
      g.addColorStop(1, "rgba(255, 170, 90, 0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255, 236, 200," + (0.9 * a) + ")";
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
    }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      flies.forEach(function (f, i) {
        f.ph += f.sp;
        f.x += f.vx + Math.sin(f.ph) * 0.25 * f.sway;
        f.y += f.vy;
        // se apartan suavemente del mouse
        var dx = f.x - mouse.x, dy = f.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 14400) { var d = Math.sqrt(d2) || 1, k = (120 - d) / 120 * 1.6; f.x += dx / d * k; f.y += dy / d * k; }
        if (f.y < -20 || f.x < -30 || f.x > w + 30) flies[i] = make(false);
        draw(f, 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(f.ph * 1.7)));
      });
      requestAnimationFrame(frame);
    }
    size();
    for (var i = 0; i < n; i++) flies.push(make(true));

    if (reduce) { flies.forEach(function (f) { draw(f, 0.7); }); return; }

    if ("ResizeObserver" in window) new ResizeObserver(size).observe(host);
    host.addEventListener("pointermove", function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    host.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
    // solo se anima cuando está en pantalla
    new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(frame); }
      if (!vis) running = false;
    }).observe(host);
  }
  $$("canvas.fireflies").forEach(function (c) { try { Fireflies(c); } catch (err) { /* sin canvas */ } });

  /* ---------------- Frases que rotan ---------------- */
  var quotes = $$("#quotes .quote");
  var dotsBox = document.getElementById("quotes-dots");
  if (quotes.length && dotsBox) {
    var qi = 0, timer = null;
    var dots = quotes.map(function (q, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Frase " + (i + 1));
      b.addEventListener("click", function () { show(i); restart(); });
      dotsBox.appendChild(b);
      return b;
    });
    var show = function (i) {
      qi = i;
      quotes.forEach(function (q, k) { q.classList.toggle("is-active", k === i); q.setAttribute("aria-hidden", String(k !== i)); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); });
    };
    var restart = function () { clearInterval(timer); timer = setInterval(function () { show((qi + 1) % quotes.length); }, 7000); };
    show(0); restart();
    var box = document.getElementById("quotes");
    box.addEventListener("mouseenter", function () { clearInterval(timer); });
    box.addEventListener("mouseleave", restart);
  }

  /* ---------------- Franja de palabras infinita ---------------- */
  $$(".marquee__track").forEach(function (track) { track.innerHTML += track.innerHTML; });

  if (!fine || reduce) return; // los efectos de mouse son solo para escritorio

  /* ---------------- Cursor suave ---------------- */
  var cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);
  var cx = -100, cy = -100, tx = -100, ty = -100;
  window.addEventListener("pointermove", function (e) {
    tx = e.clientX; ty = e.clientY;
    cursor.classList.add("is-on");
    var hot = e.target.closest && e.target.closest("a, button, [data-tilt], .gallery__item, input, select, label");
    cursor.classList.toggle("is-hover", !!hot);
  }, { passive: true });
  document.addEventListener("pointerleave", function () { cursor.classList.remove("is-on"); });
  window.addEventListener("blur", function () { cursor.classList.remove("is-on"); });

  /* ---------------- Profundidad con el mouse ---------------- */
  var depthEls = $$("[data-depth]");
  var mx = 0, my = 0, sx = 0, sy = 0;
  window.addEventListener("pointermove", function (e) {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  function tick() {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    cursor.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
    sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
    depthEls.forEach(function (el) {
      var d = Number(el.dataset.depth) || 10;
      el.style.translate = (sx * d * 2).toFixed(2) + "px " + (sy * d).toFixed(2) + "px";
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ---------------- Inclinación 3D en fotos y tarjetas ---------------- */
  $$("[data-tilt]").forEach(function (el) {
    el.addEventListener("pointerenter", function () {
      if (!el.classList.contains("reveal") || el.classList.contains("is-visible")) el.classList.add("tilt-ready");
    });
    el.addEventListener("pointermove", function (e) {
      if (!el.classList.contains("tilt-ready")) return;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg");
      el.style.setProperty("--ry", (px * 7).toFixed(2) + "deg");
      el.style.setProperty("--gx", ((px + 0.5) * 100).toFixed(1) + "%");
      el.style.setProperty("--gy", ((py + 0.5) * 100).toFixed(1) + "%");
      el.classList.add("is-tilting");
    });
    el.addEventListener("pointerleave", function () {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    });
  });

  /* ---------------- Botones magnéticos ---------------- */
  $$(".btn, .tour__ring").forEach(function (b) {
    b.addEventListener("pointermove", function (e) {
      var r = b.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.style.translate = (dx * 0.22).toFixed(1) + "px " + (dy * 0.3).toFixed(1) + "px";
    });
    b.addEventListener("pointerleave", function () { b.style.translate = ""; });
  });

  /* ---------------- Luz que sigue al mouse en secciones oscuras ---------------- */
  $$("[data-spotlight]").forEach(function (sec) {
    sec.addEventListener("pointermove", function (e) {
      var r = sec.getBoundingClientRect();
      sec.style.setProperty("--mx", (e.clientX - r.left) + "px");
      sec.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
})();
