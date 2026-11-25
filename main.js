// GAMEWISE — landing

// Dirección de la app. Cuando la app tenga su dominio propio, se cambia acá
// (y en los href de index.html, que quedan como respaldo si el JS no carga).
const APP_URL = 'https://gamewise-frontend.vercel.app';

document.querySelectorAll('[data-app]').forEach((link) => {
  const url = new URL(link.getAttribute('href'));
  link.href = APP_URL + url.pathname;
});

// Clics en los botones: se cuentan como eventos si Vercel Web Analytics está activo
document.querySelectorAll('[data-cta]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof window.va === 'function') window.va('event', { name: 'cta_click', data: { lugar: link.dataset.cta } });
  });
});

// Borde de la barra superior al bajar
const topbar = document.getElementById('topbar');
const onScroll = () => topbar.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Aparición al entrar en pantalla
const targets = document.querySelectorAll('.reveal, #loop');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();
