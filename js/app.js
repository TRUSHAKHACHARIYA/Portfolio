import { siteConfig, sectionMarquees, skillCapabilities, projects, projectFilters } from './data.js';
import { initLenis, initStaggeredReveal, scrollToElement } from './animations.js';
import { initLoader } from './loader.js';
import { initRobot, bindRobotProjectEyes } from './robot.js';
import { renderCourses } from './courses.js';
import {
  initHeroTextReveal,
  revealHeroWords,
  renderSectionMarquees,
} from './effects.js';

let activeProjectFilter = 'all';

function statusLabel(status) {
  const map = {
    live: 'LIVE',
    'in-dev': 'IN DEV',
    nda: 'NDA',
    archived: 'ARCHIVED',
  };
  return map[status] || status.toUpperCase();
}

function projectMatchesFilter(project) {
  if (activeProjectFilter === 'all') {
    return true;
  }
  if (activeProjectFilter === 'archived') {
    return project.status === 'archived';
  }
  return project.category === activeProjectFilter;
}

function renderProjectFilters() {
  const wrap = document.getElementById('projectFilters');
  if (!wrap) {
    return;
  }

  wrap.innerHTML = projectFilters
    .map(
      (f) =>
        `<button type="button" class="project-filter${f.id === activeProjectFilter ? ' active' : ''}" data-filter="${f.id}">${f.label}</button>`
    )
    .join('');

  wrap.querySelectorAll('.project-filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeProjectFilter = btn.dataset.filter;
      renderProjectFilters();
      renderProjects();
    });
  });
}

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = skillCapabilities
    .map(
      (group) => `
    <div class="skill-card glass-card stagger-item">
      <h3 class="skill-card-title">${group.title}</h3>
      <ul class="skill-list">
        ${group.items
          .map(
            (item) => `
          <li class="skill-item">
            <div class="skill-item-head">
              <span class="skill-name">${item.name}</span>
              <span class="skill-pct">${item.level}%</span>
            </div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: ${item.level}%" data-level="${item.level}"></div>
            </div>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>
  `
    )
    .join('');
}

function renderProjects() {
  const list = document.getElementById('projectsGrid');
  if (!list) {
    return;
  }

  const filtered = projects.filter(projectMatchesFilter);

  if (filtered.length === 0) {
    list.innerHTML = '<p class="projects-empty">No projects in this category.</p>';
    return;
  }

  list.innerHTML = `
    <div class="projects-list-head" aria-hidden="true">
      <span>Project</span>
      <span>Type · Status</span>
      <span>Stack</span>
      <span>Links</span>
    </div>
    ${filtered
      .map((p) => {
        const tagsHtml = (p.shortTags || []).map((t) => `<span class="tag">${t}</span>`).join('');
        const meta = `${p.type} · ${statusLabel(p.status)}`;

        let linksHtml = '';
        if (p.status === 'nda') {
          linksHtml = '<span class="project-nda">NDA</span>';
        } else {
          if (p.links.github) {
            linksHtml += `<a href="${p.links.github}" class="text-link project-link" target="_blank" rel="noopener noreferrer">GitHub</a>`;
          }
          if (p.links.live) {
            linksHtml += `<a href="${p.links.live}" class="text-link project-link" target="_blank" rel="noopener noreferrer">Live</a>`;
          }
          if (!p.links.github && !p.links.live) {
            linksHtml = `<span class="project-nda">${statusLabel(p.status)}</span>`;
          }
        }

        return `
        <article class="project-row stagger-item" data-category="${p.category}" data-status="${p.status}">
          <div class="project-row-name">
            <strong>${p.title}</strong>
            <span class="project-row-desc">${p.desc}</span>
          </div>
          <div class="project-row-meta">${meta}</div>
          <div class="project-row-stack">${tagsHtml}</div>
          <div class="project-row-links">${linksHtml}</div>
        </article>`;
      })
      .join('')}
  `;

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

function initSkillBarAnimation() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
      bar.style.width = `${bar.dataset.level}%`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const bar = entry.target;
        const level = bar.dataset.level;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          bar.style.width = `${level}%`;
        });
        observer.unobserve(bar);
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
    bar.style.width = '0';
    observer.observe(bar);
  });
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

  document.querySelectorAll('[data-resume-link]').forEach((el) => {
    el.href = siteConfig.resumePath;
  });
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
  renderSectionMarquees(sectionMarquees);
  renderProjectFilters();
  renderSkills();
  renderProjects();
  renderCourses();
  initHeroTextReveal();
  initRobot();
  initLenis();
  initStaggeredReveal();
  initSkillBarAnimation();
  initStatCounters();
  initMobileMenu();
  initNavScroll();
  initNavActive();
  revealHeroWords(400);
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader(bootstrapApp);
});
