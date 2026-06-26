import { siteConfig } from './config.js';
import {
  phrases,
  skills,
  tickerItems,
  projects,
  statusLabels,
  currentlyBuilding,
  terminalAgentLines,
} from './data.js';

function initTyping() {
  const typEl = document.getElementById('typing-el');
  if (!typEl) {
    return;
  }

  let pIdx = 0;
  let cIdx = 0;
  let del = false;

  function type() {
    const ph = phrases[pIdx];
    if (!del) {
      typEl.textContent = ph.slice(0, ++cIdx);
      if (cIdx === ph.length) {
        del = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typEl.textContent = ph.slice(0, --cIdx);
      if (cIdx === 0) {
        del = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, del ? 38 : 65);
  }

  type();
}

function renderSkills(filter = 'all') {
  const grid = document.getElementById('skillsGrid');
  if (!grid) {
    return;
  }

  const list = filter === 'all' ? skills : skills.filter((s) => s.cat === filter);
  grid.innerHTML = list
    .map(
      (s) => `
    <div class="skill-card">
      <span class="skill-icon">${s.icon}</span>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar-track"><div class="skill-bar-fill" data-pct="${s.pct}"></div></div>
    </div>
  `
    )
    .join('');

  setTimeout(() => {
    document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
      bar.style.width = `${bar.dataset.pct}%`;
    });
  }, 120);
}

function initSkills() {
  renderSkills();

  document.querySelectorAll('.cat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkills(btn.dataset.filter);
    });
  });
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) {
    return;
  }

  grid.innerHTML = projects
    .map((p) => {
      const status = statusLabels[p.status];
      const tagsHtml = p.tags
        .map((t) => `<span class="proj-tag">${t.icon} ${t.label}</span>`)
        .join('');

      let linksHtml = '';
      if (p.links.github) {
        linksHtml = `<a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="proj-link">GitHub →</a>`;
      } else if (p.links.muted) {
        linksHtml = `<span class="proj-link-muted">${p.links.muted}</span>`;
      }

      const featuredClass = p.featured ? ' featured' : '';
      const featuredBadge = p.featured ? '<span class="proj-featured-badge">FEATURED</span>' : '';

      return `
      <article class="proj-card reveal${featuredClass}">
        ${featuredBadge}
        <div class="proj-num">Project ${p.num}</div>
        <div class="proj-card-body">
          <div class="proj-card-main">
            <div class="proj-header">
              <h3 class="proj-title">${p.title}</h3>
              <span class="proj-status ${status.className}">${status.text}</span>
            </div>
            <div class="proj-source">${p.source}</div>
            <p class="proj-desc">${p.desc}</p>
            <div class="proj-tags">${tagsHtml}</div>
            <div class="proj-links">${linksHtml}</div>
          </div>
          ${
            p.featured
              ? `<div class="proj-featured-vis">
                   <div class="proj-arch">
                     <div class="proj-arch-label">// architecture</div>
                     <div class="proj-arch-flow">
                       <span>Documents</span><span class="proj-arch-arrow">→</span>
                       <span>RAG Pipeline</span><span class="proj-arch-arrow">→</span>
                       <span>LangGraph</span><span class="proj-arch-arrow">→</span>
                       <span>Claude API</span>
                     </div>
                     <div class="proj-arch-meta">Citation-verified · Multi-agent · Production SaaS</div>
                   </div>
                 </div>`
              : ''
          }
        </div>
      </article>`;
    })
    .join('');
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('vis'), i * 80);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initNavActive() {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          document
            .querySelectorAll(`a[href="#${entry.target.id}"]`)
            .forEach((l) => l.classList.add('active'));
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((s) => observer.observe(s));
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) {
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      if (siteConfig.formspreeEndpoint) {
        const res = await fetch(siteConfig.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error('Form submission failed');
        }
      } else {
        await new Promise((r) => setTimeout(r, 1200));
      }

      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--green)';
      btn.style.color = 'var(--bg)';
      form.reset();
    } catch {
      btn.textContent = 'Failed — try email';
      btn.style.background = '#ff5f56';
      btn.style.color = '#fff';
    }

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}

function initMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');

  function openMenu() {
    menu.classList.add('open');
  }

  function closeMenu() {
    menu.classList.remove('open');
  }

  burgerBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      closeMenu();
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    });
  });
}

function initTicker() {
  const ticker = document.getElementById('ticker');
  if (!ticker) {
    return;
  }

  const itemHtml = (label) =>
    `<div class="ticker-item"><div class="ticker-dot"></div>${label}</div>`;

  const items = [...tickerItems, ...tickerItems];
  ticker.innerHTML = items.map(itemHtml).join('');
}

function initBuildingBlock() {
  const el = document.getElementById('buildingBlock');
  if (!el) {
    return;
  }

  el.innerHTML = currentlyBuilding
    .map(
      (item) => `
    <div class="building-item">
      <span class="building-arrow">→</span>
      <span class="building-name">${item.name}</span>
      <span class="building-detail">(${item.detail})</span>
    </div>`
    )
    .join('');
}

function initTerminal() {
  const output = document.getElementById('terminalAgentOutput');
  if (!output) {
    return;
  }

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= terminalAgentLines.length) {
      return;
    }

    const line = terminalAgentLines[lineIndex];
    const div = document.createElement('div');
    div.className = `t-line t-line-${line.type}`;

    if (line.type === 'cmd') {
      div.innerHTML = `<span class="t-prompt">❯</span> <span class="t-cmd">${line.text}</span>`;
      output.appendChild(div);
      lineIndex++;
      setTimeout(typeLine, 600);
      return;
    }

    div.textContent = line.text;
    output.appendChild(div);
    lineIndex++;
    setTimeout(typeLine, line.type === 'info' ? 450 : 700);
  }

  setTimeout(typeLine, 2200);
}

function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
    return;
  }

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.id = 'cursor';
  document.body.appendChild(cursor);
  document.body.classList.add('custom-cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

function applySiteConfig() {
  document.querySelectorAll('[data-email]').forEach((el) => {
    el.textContent = siteConfig.email;
  });

  document.querySelectorAll('[data-email-link]').forEach((el) => {
    el.href = `mailto:${siteConfig.email}`;
  });

  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.href = siteConfig.resumePath;
  }

  const calendlyBtn = document.getElementById('calendlyBtn');
  if (calendlyBtn && siteConfig.calendlyUrl) {
    calendlyBtn.href = siteConfig.calendlyUrl;
    calendlyBtn.hidden = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applySiteConfig();
  initTicker();
  initTyping();
  initSkills();
  renderProjects();
  initBuildingBlock();
  initTerminal();
  initScrollReveal();
  initNavActive();
  initContactForm();
  initMobileMenu();
  initCursor();
});
