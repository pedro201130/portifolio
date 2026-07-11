/* ===================================================================
   Wlady Prates — Portfólio · JavaScript
=================================================================== */

// Fallback de imagem: se .png não existir, tenta .jpg, .jpeg, .webp
window.imgFallback = function (img) {
  const exts = ["png", "jpg", "jpeg", "webp"];
  const next = Number(img.dataset.extIndex || 0) + 1;
  const base = img.src.replace(/\.(png|jpg|jpeg|webp)(\?.*)?$/i, "");
  if (next < exts.length) {
    img.dataset.extIndex = String(next);
    img.src = base + "." + exts[next];
  } else {
    img.classList.add("is-broken");
  }
};

// Ano atual no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Header ganha borda ao rolar
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Menu mobile
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
// Fecha o menu ao clicar em um link
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Reveal on scroll (aparecer suavemente ao rolar)
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Contador animado nas estatísticas e nos resultados
const counters = document.querySelectorAll("[data-count]");
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if ("IntersectionObserver" in window && counters.length) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => countObserver.observe(el));
}
