import { siteConfig, sectionMarquees, skillCapabilities, projects, aboutTags, socialLinks } from './data.js';
import { initLenis, initStaggeredReveal, scrollToElement } from './animations.js';
import { initLoader } from './loader.js';
import { renderCourses } from './courses.js';
import { renderCertifications } from './certifications.js';
import { renderWriting } from './writing.js';
import { renderSocialLinks } from './social.js';
import { renderSectionMarquees } from './effects.js';

function statusMeta(status) {
  const map = {
    live: { cls: 'project-status-live', label: 'LIVE' },
    'in-dev': { cls: 'project-status-progress', label: 'IN PROGRESS' },
    nda: { cls: 'project-status-nda', label: 'NDA' },
    archived: { cls: 'project-status-archived', label: 'ARCHIVED' },
  };
  return map[status] || map['in-dev'];
}

function renderAboutTags() {
  const wrap = document.getElementById('aboutTags');
  if (!wrap) {
    return;
  }
  wrap.innerHTML = aboutTags.map((t) => `<span class="tech-pill">${t}</span>`).join('');
}

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = skillCapabilities
    .map(
      (group) => `
    <div class="capability-card stagger-item">
      <div class="capability-card-header">
        <span class="capability-icon" aria-hidden="true">${group.icon}</span>
        <span>${group.title}</span>
      </div>
      <ul class="capability-list">
        ${group.items.map((item) => `<li class="skill-item">${item}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('');
}

function projectTypeBadge(type) {
  const badges = {
    personal: '<span class="project-badge-personal">PERSONAL</span>',
    '7span': '<span class="project-badge-work">7SPAN</span>',
  };
  return badges[type] || '';
}

function renderProjectCard(p) {
  const status = statusMeta(p.status);
  const tagsHtml = (p.shortTags || []).map((t) => `<span class="tech-pill">${t}</span>`).join('');
  const typeBadge = projectTypeBadge(p.type);
  const featuredBadge = p.featured ? '<span class="project-badge-featured">FEATURED</span>' : '';

  let linksHtml = '';
  if (p.status === 'nda') {
    linksHtml = '<span class="project-link-nda">Under NDA</span>';
  } else if (p.status === 'in-dev') {
    linksHtml = '<span class="project-link-nda">Coming soon</span>';
  } else {
    if (p.links.github) {
      linksHtml += `<a href="${p.links.github}" class="project-link" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`;
    }
    if (p.links.live) {
      linksHtml += `<a href="${p.links.live}" class="project-link project-link-primary" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`;
    }
  }

  return `
    <article class="project-card stagger-item" data-status="${p.status}" data-type="${p.type}">
      <div class="project-meta-row">
        <span class="${status.cls}">${status.label === 'LIVE' ? '● LIVE' : status.label === 'IN PROGRESS' ? '⟳ IN PROGRESS' : status.label}</span>
        <div class="project-badges">${typeBadge}${featuredBadge}</div>
      </div>
      <div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-context">${p.context}</p>
      </div>
      <p class="project-description">${p.desc}</p>
      <div class="project-tech">${tagsHtml}</div>
      <div class="project-links">${linksHtml}</div>
    </article>`;
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) {
    return;
  }

  const personal = projects.filter((p) => p.type === 'personal');
  const work = projects.filter((p) => p.type === '7span');

  grid.innerHTML = `
    <div class="project-group">
      <h3 class="project-group-label">Personal Projects</h3>
      <div class="projects-grid">${personal.map(renderProjectCard).join('')}</div>
    </div>
    <div class="project-group">
      <h3 class="project-group-label">7Span Work</h3>
      <p class="project-group-sub">Production systems built as part of my role at 7Span.</p>
      <div class="projects-grid">${work.map(renderProjectCard).join('')}</div>
    </div>
  `;
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
  const links = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          document
            .querySelectorAll(`.nav-link[href="#${entry.target.id}"]`)
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
  });

  document.querySelectorAll('[data-resume-link]').forEach((el) => {
    el.href = siteConfig.resumePath;
  });

  const mediumLink = document.getElementById('mediumProfileLink');
  if (mediumLink) {
    mediumLink.href = siteConfig.mediumUrl;
  }

  const resumeDate = document.getElementById('resumeUpdated');
  if (resumeDate) {
    resumeDate.textContent = siteConfig.resumeUpdated;
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
  renderSectionMarquees(sectionMarquees);
  renderAboutTags();
  renderSkills();
  renderProjects();
  renderCertifications();
  renderCourses();
  renderWriting();
  renderSocialLinks('contactSocials', socialLinks);
  initLenis();
  initStaggeredReveal();
  initMobileMenu();
  initNavScroll();
  initNavActive();
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader(bootstrapApp);
});
