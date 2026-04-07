const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('.reveal');
const sectionLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"], .footer-links a[href^="#"]'));
const sections = Array.from(document.querySelectorAll('main section[id]'));
const goTopBtn = document.getElementById('goTopBtn');
const homeSection = document.getElementById('home');

if (menuToggle && header && nav) {
  menuToggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

sectionLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const offset = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset + 2;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

const setActiveLink = () => {
  if (!sections.length || !navLinks.length) return;

  const offset = (header ? header.offsetHeight : 0) + 120;
  let currentId = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - offset) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    link.classList.toggle('active', href === `#${currentId}`);
  });
};

const toggleGoTopButton = () => {
  if (!goTopBtn) return;

  let triggerPoint = 320;

  if (homeSection) {
    triggerPoint = homeSection.offsetTop + homeSection.offsetHeight - (header ? header.offsetHeight : 0);
  }

  goTopBtn.classList.toggle('is-visible', window.scrollY > triggerPoint);
};

if (goTopBtn) {
  goTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', () => {
  setActiveLink();
  toggleGoTopButton();
});

window.addEventListener('load', () => {
  setActiveLink();
  toggleGoTopButton();
});

if ('IntersectionObserver' in window && revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}
