// GAMEWISE — landing

// Dirección de la app. Cuando la app tenga su dominio propio, se cambia acá
// (y en los href de src/template.html, que quedan como respaldo si el JS no carga).
const APP_URL = 'https://gamewise-frontend.vercel.app';

document.querySelectorAll('[data-app]').forEach((link) => {
  const url = new URL(link.getAttribute('href'));
  link.href = APP_URL + url.pathname;
});

// Selector de idioma: se recuerda la elección para la próxima visita (la lee middleware.js)
document.querySelectorAll('[data-lang]').forEach((link) => {
  link.addEventListener('click', () => {
    document.cookie = `gw_lang=${link.dataset.lang}; path=/; max-age=31536000; SameSite=Lax; Secure`;
  });
});

// Clics en los botones: se cuentan como eventos si Vercel Web Analytics está activo
document.querySelectorAll('[data-cta]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof window.va === 'function') {
      window.va('event', { name: 'cta_click', data: { lugar: link.dataset.cta, idioma: document.documentElement.lang } });
    }
  });
});

// Borde de la barra superior al bajar
const topbar = document.getElementById('topbar');
const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();
