import { siteConfig, marqueeItems, hexSkills, projects } from './data.js';
import { initLenis, initStaggeredReveal, scrollToElement } from './animations.js';
import { initLoader } from './loader.js';
import { initCustomCursor, bindProjectCursor } from './cursor.js';
import { initRobot, bindRobotProjectEyes } from './robot.js';
import {
  initHeroTextReveal,
  revealHeroWords,
  initHorizontalProjects,
  initProjectPreviews,
} from './effects.js';

function renderMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) {
    return;
  }

  const itemHtml = (label) =>
    `<span class="marquee-item">${label}</span><span class="marquee-sep">✦</span>`;

  const doubled = [...marqueeItems, ...marqueeItems];
  track.innerHTML = doubled.map(itemHtml).join('');
}

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) {
    return;
  }

  const rows = [];
  for (let i = 0; i < hexSkills.length; i += 4) {
    rows.push(hexSkills.slice(i, i + 4));
  }

  grid.innerHTML = rows
    .map(
      (row, rowIdx) => `
    <div class="hex-row${rowIdx % 2 === 1 ? ' hex-row-offset' : ''}">
      ${row
        .map(
          (skill) => `
        <div class="hex stagger-item">
          <span class="hex-icon">${skill.icon}</span>
          <span class="hex-name">${skill.name}</span>
        </div>
      `
        )
        .join('')}
    </div>
  `
    )
    .join('');
}

function renderProjects() {
  const track = document.getElementById('projectsGrid');
  if (!track) {
    return;
  }

  track.innerHTML = projects
    .map((p) => {
      const tagsHtml = (p.shortTags || [])
        .map((t) => `<span class="tag">${t}</span>`)
        .join('');

      const href = p.links.github || '';
      const previewAttr = p.preview ? ` data-preview="${p.preview}"` : '';
      const linkLabel = href ? 'GitHub →' : p.status === 'in-dev' ? 'In Dev' : 'Private';

      return `
      <article class="project-card stagger-item"${previewAttr} data-title="${p.title}">
        <div class="project-card-num">${p.num}</div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.desc}</p>
        <div class="project-card-tags">${tagsHtml}</div>
        ${
          href
            ? `<a href="${href}" class="project-card-link text-link" target="_blank" rel="noopener noreferrer">${linkLabel}</a>`
            : `<span class="project-card-link muted">${linkLabel}</span>`
        }
        <span class="project-card-cursor-label">View →</span>
      </article>`;
    })
    .join('');

  initProjectPreviews();
  initHorizontalProjects();
  bindProjectCursor();
  bindRobotProjectEyes();
}

function initStatCounters() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) {
        return;
      }

      statsEl.querySelectorAll('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 30));

        function tick() {
          current = Math.min(current + step, target);
          el.textContent = `${current}${suffix}`;
          if (current < target) {
            requestAnimationFrame(tick);
          }
        }

        tick();
      });

      observer.disconnect();
    },
    { threshold: 0.5 }
  );

  observer.observe(statsEl);
}

function initMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('burgerBtn');
  const close = document.getElementById('mobileCloseBtn');

  function openMenu() {
    menu.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.hidden = true;
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && !menu.hidden) {
      closeMenu();
    }
  });
}

function initNavScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }
      const target = document.querySelector(href);
      if (!target) {
        return;
      }
      e.preventDefault();
      scrollToElement(target);
    });
  });
}

function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          document
            .querySelectorAll(`.nav-links a[href="#${entry.target.id}"]`)
            .forEach((l) => l.classList.add('active'));
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((s) => observer.observe(s));
}

function applySiteConfig() {
  const origin =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? siteConfig.siteUrl
      : window.location.origin;

  document.querySelector('meta[property="og:url"]')?.setAttribute('content', origin);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', `${origin}/assets/og-preview.jpg`);
  document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', `${origin}/assets/og-preview.jpg`);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', origin);

  document.querySelectorAll('[data-email-link]').forEach((el) => {
    el.href = `mailto:${siteConfig.email}`;
    if (el.classList.contains('contact-email')) {
      el.textContent = `${siteConfig.email} ↗`;
    }
  });

  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.href = siteConfig.resumePath;
  }
}

function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) {
    el.textContent = String(new Date().getFullYear());
  }
}

function bootstrapApp() {
  applySiteConfig();
  initFooterYear();
  renderMarquee();
  renderSkills();
  renderProjects();
  initHeroTextReveal();
  initCustomCursor();
  initRobot();
  initLenis();
  initStaggeredReveal();
  initStatCounters();
  initMobileMenu();
  initNavScroll();
  initNavActive();
  revealHeroWords(400);
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader(bootstrapApp);
});
