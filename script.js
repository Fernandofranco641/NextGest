const intro = document.getElementById('intro');
const header = document.getElementById('header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

window.addEventListener('load', () => {
  setTimeout(() => intro?.classList.add('hide'), 1900);
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav?.classList.remove('mobile-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

menuButton?.addEventListener('click', () => {
  const opened = nav?.classList.toggle('mobile-open');
  menuButton.setAttribute('aria-expanded', String(!!opened));
});

document.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.hero-grid');
  if (!glow || window.innerWidth < 900) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  glow.style.transform = `translate(${x}px, ${y}px)`;
});
