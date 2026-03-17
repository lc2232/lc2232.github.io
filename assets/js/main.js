/**
 * main.js — Interactive behaviour for lc2232.github.io
 */

// ── Theme Toggle ──────────────────────────────────────────────────
const THEME_KEY = 'preferred-theme';

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    setTheme(stored);
  } else {
    // Respect OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Mobile Navigation ─────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('site-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Scroll Reveal ─────────────────────────────────────────────────
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section, .post-preview, .project-card, .project-card-full'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger each card slightly
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 50);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach(el => observer.observe(el));
}

// ── Header shadow on scroll ───────────────────────────────────────
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 32px rgba(0,0,0,0.3)'
      : 'none';
  }, { passive: true });
}

// ── Active nav link ───────────────────────────────────────────────
function initActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    } else if (href === '/' && path === '/') {
      link.classList.add('active');
    }
  });
}

// ── Bootstrap ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollReveal();
  initHeaderScroll();
  initActiveNav();

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
