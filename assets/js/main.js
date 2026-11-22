/* Domotel Aysén — interacciones de la landing */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var WHATSAPP = "56983630133";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Datos ---------------- */

  // Fotos propias de Domotel Aysén (cámara, celular y dron). Archivos en assets/img/fotos/
  var PHOTOS = [
    ["domo-noche-ventana", "noche", "Domo iluminado al anochecer, con su ventana triangular encendida"],
    ["domo-cerro-sol", "exterior", "Domo de madera con los cerros de Aysén y cielo azul"],
    ["dormitorio-cupula", "interior", "Cama matrimonial en el segundo piso, bajo la cúpula"],
    ["tinaja-terraza", "tinaja", "Tinaja caliente en la terraza techada, rodeada de bosque"],
    ["living-escalera", "interior", "Living con sofá, Smart TV y escalera de madera"],
    ["domo-entrada", "exterior", "Entrada del domo con su puerta de madera y el bosque detrás"],
    ["arcade-pacman", "interior", "Máquina arcade retro Pac-Man dentro del domo"],
    ["sendero-noche", "noche", "Sendero iluminado entre los árboles hacia la terraza de la tinaja"],
    ["cocina", "interior", "Cocina equipada con horno, encimera y ventana triangular"],
    ["vista-dron", "exterior", "Vista aérea de los domos junto a la Ruta 240 y el valle"],
    ["tinaja-vino", "tinaja", "Mesa sobre la tinaja con vino, copas y algo para picar"],
    ["domos-atardecer", "noche", "Los dos domos iluminados al atardecer"],
    ["comedor", "interior", "Comedor junto a la cocina con la escalera al fondo"],
    ["domo-cerros", "exterior", "Domo frente al bosque nativo y los cerros"],
    ["vista-altillo", "interior", "Vista del living desde el altillo"],
    ["bano", "interior", "Baño privado con ducha, lavamanos de madera y espejo redondo"],
    ["domo-lateral", "exterior", "Domo visto de lado, con su ventana triangular"],
    ["tinaja-quincho", "tinaja", "Terraza de la tinaja con cierre de caña"],
    ["sofa-living", "interior", "Sofá cama de cuero en el living"],
    ["letrero-domotel", "exterior", "Letrero de Domotel Aysén en la entrada"],
    ["dormitorio-escalera", "interior", "Dormitorio en el altillo visto desde la escalera"],
    ["tinaja-copas", "tinaja", "Copas de vino junto a la tinaja con el sol entre los árboles"],
    ["domo-tarde", "noche", "Domo iluminado al final del día, junto al camino de ripio"],
    ["tv-living", "interior", "Smart TV y sillón en el living"],
    ["domo-sol-cerro", "exterior", "Domo bajo el sol, con el cerro y el cielo despejado"],
    ["comedor-marmol", "interior", "Comedor con mesa blanca y la máquina arcade junto a la escalera"],
    ["tinaja-noche", "tinaja", "Tinaja con la mesa puesta y los reflejos del agua"],
    ["domo-ventana-noche", "noche", "Domo entre los árboles con la ventana encendida"],
    ["especiero", "interior", "Repisa de madera nativa con aceite, especias y té"],
    ["bosque-helecho", "exterior", "Helecho y musgo en el bosque que rodea los domos"],
    ["tinaja-vista", "tinaja", "Tinaja vista desde la entrada de la terraza"]
  ];
  var IMG = "assets/img/fotos/";

  // Extractos de reseñas reales de Booking.com y Airbnb (algunas abreviadas).
  var REVIEWS = [
    { n: "Luis", o: "Chile", p: "Booking", t: "El domo es muy cool y está muy bien equipado. Los anfitriones son muy amables y entregan información precisa de panoramas en el sector y lugares para comer. Las dependencias están impecables." },
    { n: "Lena", o: "Marzo 2026", p: "Airbnb", tr: true, t: "Realmente queríamos dormir en una casa domo como esta al menos una vez, ¡y nos encantó! ¡Un alojamiento muy agradable, equipado con todo lo que puedas necesitar! ¡También estaba muy bien decorado, lo que le daba encanto! ¡Todo estaba muy limpio, la cama era muy cómoda y dormimos muy bien! Sin duda, lo más destacado fue el juego de Donkey Kong ;) Un alojamiento muy agradable, donde Marlene nos recibió con calidez y nos mostró todo lo que necesitábamos saber." },
    { n: "Ariana", o: "Chile", p: "Booking", t: "Marlene es tan atenta que se tomó la molestia de hacer un listado de lugares para visitar y comer en el lugar. El domo súper lindo y acogedor" },
    { n: "Gordana y Boris", o: "Victoria, Canadá · Enero 2025", p: "Airbnb", tr: true, t: "Este es el mejor lugar donde nos hospedamos en Chile. El lugar era cómodo, limpio y tenía bonitos detalles de muebles. Tenía todo en la cocina para cocinar. Gerald nos trajo barbacoa y disfrutamos de una buena carne de res y cerdo patagónica en la parrilla. Siempre amigable y complaciente. Este lugar es muy recomendable." },
    { n: "Mariela Cristina", o: "Coyhaique, Chile · Marzo 2026", p: "Airbnb", t: "Un lugar muy acogedor y cómodo, organizado los anfitriones son muy amables y con toda la disposición de aclarar dudas u alguna necesidad definitivamente volveremos y totalmente recomendado un lugar tranquilo muchas gracias por la estadía" },
    { n: "Piso", o: "España", p: "Booking", t: "El alojamiento tenía un diseño muy peculiar. Era muy amplio por dentro y contaba con todos los elementos necesarios para una estancia agradable. El detalle de la máquina de juegos retro es un puntazo. Destacar que la cama era muy cómoda." },
    { n: "Sarah", o: "Abril 2024", p: "Airbnb", tr: true, t: "Disfrutamos mucho de la pernoctación en la cúpula. Fue nuestro alojamiento favorito en la Carretera Austral. Aparte de la forma, no te das cuenta de que es una cúpula y no una cabaña, ya que todas las comodidades están disponibles. La cocina está bien equipada, la ducha es agradable y el agua está caliente, y la cama es acogedora. La calefacción la proporciona el aire acondicionado, lo que hizo que estuviera agradable y cálido, especialmente en el dormitorio de arriba. ¡Definitivamente nos hospedaríamos aquí de nuevo y podemos recomendar la cúpula!" },
    { n: "Claudio Adrian", o: "Cochrane, Chile · Junio 2026", p: "Airbnb", t: "Lugar perfecto para quedarse y descansar, muy cálido y acogedor, había todo lo necesario, Marlene siempre pendiente, volvería sin dudarlo." },
    { n: "Luis", o: "Chile", p: "Booking", t: "Domo muy bien equipado y decorado, cómodo y en un entorno con una hermosa vista, todo verde y muy tranquilo. Consta de aire acondicionado ya sea para calor o frío." },
    { n: "Jaime", o: "Concepción, Chile · Diciembre 2025", p: "Airbnb", t: "Gran estadía, el domo es estupendo y fue muy novedoso para nosotros, tiene todo lo necesario para una estadía cómoda y está en el marco natural más espectacular, la calidez y preocupación de los anfitriones es maravillosa. Si me preguntan, volvería sin dudarlo." },
    { n: "Viviana", o: "Chile", p: "Booking", t: "El Domo está muy bien equipado y Marlene fue muy atenta en las necesidades que pudiesen surgir. El lugar es muy bonito y silencioso, cercano a distintos atractivos turísticos." },
    { n: "Poppy", o: "Chiguayante, Chile · Julio 2023", p: "Airbnb", tr: true, t: "Nos quedamos 2 noches para visitar Puerto Aysén y Bahía Acantilada durante el invierno. Marlene y su pareja fueron muy amables y acogedores. La cúpula estaba impecable y las instrucciones eran claras. ¡Si alguna vez vuelvo a Puerto Aysén, sin duda volveré a elegir los domos!" },
    { n: "Eduardo", o: "Enero 2024 · Con niños", p: "Airbnb", t: "100% recomendado, lugar muy limpio, tranquilo y cómodo, la verdad es que no esperaba tanto y me sorprendió el domo, los anfitriones muy proactivos y preocupados" },
    { n: "Maria", o: "España", p: "Booking", t: "El apartamento está completo y con mucho menaje y detalles. La dueña es muy agradable. El domo es muy original, espacioso y tranquilo" },
    { n: "Philipp", o: "Noviembre 2025", p: "Airbnb", tr: true, t: "Nos quedamos en casa de Gerald y Marlene por una noche y cumplió con todas nuestras expectativas. La casa fue fácil de encontrar con la ayuda de la información proactiva de Marlene a través de Google Maps y estaba súper limpia. El baño estaba reluciente y la cama era cómoda. Nos sentimos muy en casa y nos hubiera gustado quedarnos más tiempo." },
    { n: "Gonzalo", o: "Chile", p: "Booking", t: "Ubicación excelente, fuera de la ciudad pero cerca de todo. Excelentes anfitriones, Marlene y Gerald, trato cercano, cálido y afectuoso." }
  ];

  var LABELS = { exterior: "Exterior", interior: "Interior", tinaja: "Tinaja", noche: "De noche" };

  /* ---------------- Utilidades ---------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (html != null) node.innerHTML = html;
    return node;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------- Header y menú ---------------- */
  var header = $("#header");
  var waFloat = $(".wa-float");
  var hero = $("#inicio");
  function onScroll() {
    var limit = hero ? hero.offsetHeight * 0.55 : 400;
    var past = window.scrollY > limit;
    header.classList.toggle("is-fixed", past);
    if (waFloat) waFloat.classList.toggle("is-visible", past);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = $("#burger");
  var nav = $("#nav");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false); });

  // Marca el link de la sección visible
  var navLinks = $$(".nav__list a");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) { var s = $(a.getAttribute("href")); if (s) spy.observe(s); });
  }

  /* ---------------- Aparición al hacer scroll ---------------- */
  // Los hijos de .stagger aparecen uno tras otro
  $$(".stagger").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add("reveal");
      child.style.setProperty("--i", i);
    });
  });

  // Contadores animados (data-count)
  function countUp(node) {
    var target = parseFloat(node.dataset.count);
    var dec = Number(node.dataset.decimals || 0);
    var start = null, dur = 1400;
    function fmt(v) { return v.toFixed(dec).replace(".", ","); }
    function tick(t) {
      if (start === null) start = t;
      var k = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      node.textContent = fmt(target * e);
      if (k < 1) requestAnimationFrame(tick); else node.textContent = fmt(target);
    }
    requestAnimationFrame(tick);
  }

  var reveals = $$(".reveal");
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (r) { io.observe(r); });

    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { countUp(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    reveals.forEach(function (r) { r.classList.add("is-visible"); });
  }

  /* ---------------- Parallax suave y barra de progreso ---------------- */
  var progress = $("#progress");
  var parallax = reduceMotion ? [] : $$("[data-parallax]");
  var heroBg = reduceMotion ? null : $(".hero__bg");
  var ticking = false;
  function onFrame() {
    ticking = false;
    var vh = window.innerHeight;
    var doc = document.documentElement;
    var max = doc.scrollHeight - vh;
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    if (heroBg && window.scrollY < vh * 1.2) heroBg.style.transform = "translate3d(0," + (window.scrollY * 0.3) + "px,0)";
    if (window.innerWidth < 768) return;
    parallax.forEach(function (node) {
      var r = node.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var speed = parseFloat(node.dataset.parallax) || 0.1;
      var offset = (r.top + r.height / 2 - vh / 2) * -speed;
      node.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0) scale(" + (1 + speed * 3).toFixed(3) + ")";
    });
  }
  function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame);
  onFrame();

  /* ---------------- Tour virtual 360° (se carga al hacer clic) ---------------- */
  var tourBtn = $("#tour-play");
  if (tourBtn) {
    tourBtn.addEventListener("click", function () {
      var frame = $("#tour-frame");
      var iframe = el("iframe", {
        src: "https://kuula.co/share/collection/7dDZ6?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
        title: "Tour virtual 360° de Domotel Aysén",
        allow: "xr-spatial-tracking; gyroscope; accelerometer; fullscreen",
        scrolling: "no",
        frameborder: "0"
      });
      frame.classList.add("is-loading");
      iframe.addEventListener("load", function () { frame.classList.remove("is-loading"); frame.classList.add("is-live"); });
      frame.appendChild(iframe);
      iframe.focus();
    });
  }

  /* ---------------- Pestañas del equipamiento ---------------- */
  var tabs = $$('#equipamiento [role="tab"]');
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) { e.preventDefault(); selectTab(next); next.focus(); }
    });
  });

  /* ---------------- Tira de fotos infinita ---------------- */
  var track = $(".strip__track");
  if (track && !reduceMotion) {
    $$("img", track).forEach(function (img) {
      var clone = img.cloneNode(true);
      clone.alt = "";
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }

  /* ---------------- Galería ---------------- */
  var gallery = $("#gallery");
  var moreBtn = $("#gallery-more");
  var INITIAL = 12;
  var filter = "todas";
  var expanded = false;

  PHOTOS.forEach(function (p, i) {
    var btn = el("button", {
      class: "gallery__item",
      type: "button",
      "data-cat": p[1],
      "data-index": String(i),
      "data-label": LABELS[p[1]],
      "aria-label": "Ampliar foto: " + p[2]
    });
    var img = el("img", { src: IMG + p[0] + "-sm.webp", alt: p[2], loading: "lazy", decoding: "async" });
    btn.appendChild(img);
    gallery.appendChild(btn);
  });
  var items = $$(".gallery__item", gallery);

  function visibleItems() { return items.filter(function (it) { return !it.classList.contains("is-hidden"); }); }

  function renderGallery() {
    var shown = 0;
    items.forEach(function (it) {
      var match = filter === "todas" || it.dataset.cat === filter;
      var show = match && (filter !== "todas" || expanded || shown < INITIAL);
      it.classList.toggle("is-hidden", !show);
      if (show) {
        it.style.setProperty("--i", shown % 12);
        it.classList.remove("is-in");
        void it.offsetWidth;
        it.classList.add("is-in");
        shown++;
      }
    });
    moreBtn.parentElement.hidden = filter !== "todas" || expanded;
  }
  renderGallery();

  moreBtn.addEventListener("click", function () {
    expanded = true;
    renderGallery();
    var first = items[INITIAL];
    if (first) first.focus({ preventScroll: true });
  });

  $$("#gallery-filters .tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.dataset.filter;
      $$("#gallery-filters .tab").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      renderGallery();
    });
  });

  /* ---------------- Lightbox ---------------- */
  var lb = $("#lightbox");
  var lbImg = $("#lb-img");
  var lbCap = $("#lb-caption");
  var lbCount = $("#lb-count");
  var lbList = [];
  var lbPos = 0;
  var lastFocus = null;

  function showLb() {
    var p = PHOTOS[lbList[lbPos]];
    lbImg.src = IMG + p[0] + ".webp";
    lbImg.alt = p[2];
    lbCap.textContent = p[2];
    lbCount.textContent = (lbPos + 1) + " / " + lbList.length;
    // precarga la siguiente
    var nxt = PHOTOS[lbList[(lbPos + 1) % lbList.length]];
    if (nxt) { var pre = new Image(); pre.src = IMG + nxt[0] + ".webp"; }
  }
  function openLb(list, pos) {
    lastFocus = document.activeElement;
    lbList = list;
    lbPos = Math.max(0, pos);
    showLb();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    lbImg.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }
  function stepLb(d) { lbPos = (lbPos + d + lbList.length) % lbList.length; showLb(); }
  function photoIndex(key) {
    for (var i = 0; i < PHOTOS.length; i++) if (PHOTOS[i][0] === key) return i;
    return -1;
  }

  gallery.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery__item");
    if (!item) return;
    var vis = visibleItems();
    openLb(vis.map(function (it) { return Number(it.dataset.index); }), vis.indexOf(item));
  });

  var tinajaItems = $$("#tinaja-gallery [data-photo]");
  var tinajaList = tinajaItems.map(function (b) { return photoIndex(b.dataset.photo); });
  tinajaItems.forEach(function (b, i) {
    b.addEventListener("click", function () { openLb(tinajaList, i); });
  });
  $("#lb-close").addEventListener("click", closeLb);
  $("#lb-prev").addEventListener("click", function () { stepLb(-1); });
  $("#lb-next").addEventListener("click", function () { stepLb(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") stepLb(1);
    if (e.key === "ArrowLeft") stepLb(-1);
    if (e.key === "Tab") { // mantiene el foco dentro del lightbox
      var f = $$("button", lb);
      var idx = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) stepLb(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* ---------------- Preguntas frecuentes ---------------- */
  var accs = $$("#faq .acc");
  accs.forEach(function (acc) {
    var btn = $(".acc__btn", acc);
    btn.addEventListener("click", function () {
      var willOpen = !acc.classList.contains("is-open");
      accs.forEach(function (a) {
        var on = a === acc && willOpen;
        a.classList.toggle("is-open", on);
        $(".acc__btn", a).setAttribute("aria-expanded", String(on));
        $(".acc__panel", a).hidden = !on;
      });
    });
  });

  /* ---------------- Reseñas ---------------- */
  var revTrack = $("#reviews");
  REVIEWS.forEach(function (r) {
    var card = el("article", { class: "review" });
    card.innerHTML =
      '<div class="review__head">' +
        '<span class="review__avatar" aria-hidden="true">' + escapeHtml(r.n.charAt(0)) + "</span>" +
        "<div><span class=\"review__name\">" + escapeHtml(r.n) + "</span>" +
        '<span class="review__meta">' + escapeHtml(r.o) + "</span></div>" +
      "</div>" +
      '<div class="review__stars" role="img" aria-label="5 de 5 estrellas">★★★★★</div>' +
      '<p class="review__text">' + escapeHtml(r.t) + "</p>" +
      '<div class="review__foot"><span class="review__platform">' + escapeHtml(r.p) + "</span>" +
      (r.tr ? '<span class="review__tr">Traducida por la plataforma</span>' : "") + "</div>";
    revTrack.appendChild(card);
  });

  // "Leer más" solo donde el texto quedó cortado
  function addReadMore() {
    $$(".review", revTrack).forEach(function (card) {
      var text = $(".review__text", card);
      var btn = $(".review__more", card);
      var clipped = text.scrollHeight > text.clientHeight + 2;
      if (clipped && !btn && !card.classList.contains("is-expanded")) {
        btn = el("button", { class: "review__more", type: "button", "aria-expanded": "false" }, "Leer más");
        btn.addEventListener("click", function () {
          var open = card.classList.toggle("is-expanded");
          btn.textContent = open ? "Leer menos" : "Leer más";
          btn.setAttribute("aria-expanded", String(open));
        });
        text.insertAdjacentElement("afterend", btn);
        updateNav();
      }
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(addReadMore); else addReadMore();
  window.addEventListener("load", addReadMore);

  var prev = $("#rev-prev");
  var next = $("#rev-next");
  function cardStep() {
    var c = $(".review", revTrack);
    return c ? c.getBoundingClientRect().width + 16 : 300;
  }
  function updateNav() {
    var max = revTrack.scrollWidth - revTrack.clientWidth - 4;
    prev.disabled = revTrack.scrollLeft <= 4;
    next.disabled = revTrack.scrollLeft >= max;
  }
  prev.addEventListener("click", function () { revTrack.scrollBy({ left: -cardStep(), behavior: reduceMotion ? "auto" : "smooth" }); });
  next.addEventListener("click", function () { revTrack.scrollBy({ left: cardStep(), behavior: reduceMotion ? "auto" : "smooth" }); });
  revTrack.addEventListener("scroll", updateNav, { passive: true });
  window.addEventListener("resize", updateNav);
  updateNav();

  /* ---------------- Formulario → WhatsApp ---------------- */
  var form = $("#booking");
  var inDate = $("#llegada");
  var outDate = $("#salida");
  var errorBox = $("#booking-error");

  function iso(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function nice(value) {
    var parts = value.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
  }
  var today = new Date();
  inDate.min = iso(today);
  outDate.min = iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));

  inDate.addEventListener("change", function () {
    if (!inDate.value) return;
    var p = inDate.value.split("-");
    var minOut = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]) + 1);
    outDate.min = iso(minOut);
    if (!outDate.value || outDate.value <= inDate.value) outDate.value = iso(minOut);
    inDate.removeAttribute("aria-invalid");
  });
  outDate.addEventListener("change", function () { outDate.removeAttribute("aria-invalid"); });

  function fail(msg, field) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.hidden = true;
    if (!inDate.value) return fail("Elige tu fecha de llegada.", inDate);
    if (!outDate.value) return fail("Elige tu fecha de salida.", outDate);
    if (outDate.value <= inDate.value) return fail("La salida debe ser posterior a la llegada.", outDate);

    var a = inDate.value.split("-"), b = outDate.value.split("-");
    var nights = Math.round((new Date(b[0], b[1] - 1, b[2]) - new Date(a[0], a[1] - 1, a[2])) / 86400000);
    var guests = $("#huespedes").value;
    var name = $("#nombre").value.trim();

    var lines = [
      "¡Hola Domotel Aysén! 👋" + (name ? " Soy " + name + "." : ""),
      "Quisiera consultar disponibilidad para el domo:",
      "",
      "📅 Llegada: " + nice(inDate.value),
      "📅 Salida: " + nice(outDate.value) + " (" + nights + (nights === 1 ? " noche)" : " noches)"),
      "👥 Huéspedes: " + guests
    ];
    if ($("#tinaja").checked) lines.push("♨️ Me interesa agregar la tinaja");
    lines.push("", "¡Gracias!");

    var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });

  /* ---------------- Año del footer ---------------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
