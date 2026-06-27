import { siteConfig } from './config.js';
import {
  phrases,
  skillCategories,
  tickerItems,
  projects,
  statusLabels,
  currentlyBuilding,
  terminalAgentLines,
} from './data.js';
import {
  bootstrapAnimations,
  initScrollAnimations,
  refreshScrollAnimations,
  scrollToElement,
  revealHeroContent,
} from './animations.js';

let useGsapMotion = true;

function showVisibleReveals() {
  document.querySelectorAll('.reveal').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('vis');
    }
  });
}

function markAppReady() {
  document.documentElement.classList.add('js-ready', 'app-ready');
  showVisibleReveals();
}

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

function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid || !skillCategories?.length) {
    return;
  }

  grid.innerHTML = skillCategories
    .map(
      (cat) => `
    <div class="skill-cat-card">
      <div class="skill-cat-head">
        <span class="skill-cat-icon">${cat.icon}</span>
        <span class="skill-cat-title">${cat.title}</span>
      </div>
      <ul class="skill-cat-list">
        ${cat.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('');

  grid.classList.add('vis');
}

function ensureSectionContentVisible() {
  document.querySelectorAll('#skillsGrid .skill-cat-card, #projectsGrid .proj-card').forEach((el) => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
  });

  if (typeof window.gsap !== 'undefined') {
    window.gsap.set('#skillsGrid .skill-cat-card, #projectsGrid .proj-card', {
      autoAlpha: 1,
      clearProps: 'opacity,visibility',
    });
  }
}

function initSkills() {
  renderSkills();
  ensureSectionContentVisible();
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) {
    return;
  }

  try {
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
      <article class="proj-card${featuredClass}">
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
  } catch (err) {
    console.error('Failed to render projects:', err);
    grid.innerHTML = '<p class="s-desc">Unable to load projects. Please refresh the page.</p>';
  }

  grid.closest('#projects')?.querySelectorAll('.reveal').forEach((el) => el.classList.add('vis'));
  grid.classList.add('vis');

  if (useGsapMotion) {
    refreshScrollAnimations();
  }

  ensureSectionContentVisible();
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
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  );

  function observeRevealElements(root = document) {
    root.querySelectorAll('.reveal:not([data-reveal-observed])').forEach((el) => {
      el.dataset.revealObserved = 'true';
      observer.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add('vis');
      }
    });
  }

  observeRevealElements();
  return observeRevealElements;
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

    try {
      if (siteConfig.formspreeEndpoint) {
        const res = await fetch(siteConfig.formspreeEndpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) {
          throw new Error('Form submission failed');
        }
      } else {
        btn.textContent = 'Use email link instead ↑';
        btn.style.background = '#ff9f43';
        btn.style.color = 'var(--bg)';
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
        }, 3500);
        return;
      }

      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--green)';
      btn.style.color = 'var(--bg)';
      form.reset();
    } catch {
      btn.textContent = 'Failed — try email directly';
      btn.style.background = '#ff4444';
      btn.style.color = '#fff';
    }

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
    }, 4000);
  });
}

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) {
    return;
  }

  function toggleScrollTop() {
    if (window.scrollY > 400) {
      btn.hidden = false;
    } else {
      btn.hidden = true;
    }
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleScrollTop, { passive: true });
  toggleScrollTop();
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
        setTimeout(() => scrollToElement(target), 150);
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
  const block = document.querySelector('.building-block');
  if (!el || !block) {
    return;
  }

  let started = false;

  function typeBuildingLines() {
    if (started) {
      return;
    }
    if (el.children.length > 0) {
      return;
    }
    started = true;
    el.innerHTML = '';

    let lineIdx = 0;
    let charIdx = 0;

    function typeChar() {
      if (lineIdx >= currentlyBuilding.length) {
        return;
      }

      const item = currentlyBuilding[lineIdx];
      const fullLine = `→ ${item.name}   (${item.detail})`;

      if (!el.children[lineIdx]) {
        const div = document.createElement('div');
        div.className = 'building-item';
        el.appendChild(div);
      }

      const lineEl = el.children[lineIdx];
      const typed = fullLine.slice(0, charIdx);
      lineEl.innerHTML = `<span class="building-text">${typed}</span>`;

      if (charIdx < fullLine.length) {
        charIdx++;
        setTimeout(typeChar, 28);
        return;
      }

      lineEl.innerHTML = `
        <span class="building-arrow">→</span>
        <span class="building-name">${item.name}</span>
        <span class="building-detail">(${item.detail})</span>
      `;

      lineIdx++;
      charIdx = 0;
      setTimeout(typeChar, 400);
    }

    typeChar();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        typeBuildingLines();
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(block);
}

function initTerminal() {
  const output = document.getElementById('terminalAgentOutput');
  const terminal = document.querySelector('.terminal');
  if (!output || !terminal) {
    return;
  }

  let started = false;
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

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        setTimeout(typeLine, 1200);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(terminal);
}

function initGlitchHover() {
  const title = document.querySelector('.hero-title');
  if (!title) {
    return;
  }

  title.addEventListener('mouseenter', () => {
    title.style.animation = 'none';
    requestAnimationFrame(() => {
      title.style.animation = 'glitch 0.4s ease';
    });
  });
}

function initTokenCounter() {
  const el = document.getElementById('hudTokens');
  if (!el) {
    return;
  }

  let val = 42;
  setInterval(() => {
    val = 40 + Math.floor(Math.random() * 18);
    el.textContent = String(val);
  }, 2200);
}

function initVercelAnalytics() {
  const { hostname } = window.location;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  if (isLocal) {
    return;
  }

  fetch('/_vercel/insights/script.js', { method: 'HEAD' })
    .then((res) => {
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.includes('javascript')) {
        return;
      }

      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
      const script = document.createElement('script');
      script.src = '/_vercel/insights/script.js';
      script.defer = true;
      document.head.appendChild(script);
    })
    .catch(() => {});
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

  const form = document.getElementById('contactForm');
  if (form && siteConfig.formspreeEndpoint) {
    form.action = siteConfig.formspreeEndpoint;
    form.method = 'POST';
  }
}

function initNavAnchorScroll() {
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
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

document.addEventListener('DOMContentLoaded', async () => {
  try {
    applySiteConfig();
    initTicker();
    initSkills();
    renderProjects();

    useGsapMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      && typeof window.gsap !== 'undefined';

    await bootstrapAnimations({
      onHeroComplete: () => {
        initTyping();
      },
    });

    if (!useGsapMotion) {
      restoreStaticStats();
      restoreStaticTerminal();
    }

    initBuildingBlock();
    if (!useGsapMotion) {
      initTerminal();
      initScrollReveal();
    }
    initNavActive();
    initNavAnchorScroll();
    initContactForm();
    initScrollTop();
    initVercelAnalytics();
    initMobileMenu();
    if (!useGsapMotion) {
      initGlitchHover();
    }
    initTokenCounter();

    if (useGsapMotion) {
      initScrollAnimations();
    }

    markAppReady();
    ensureSectionContentVisible();
    window.addEventListener('load', ensureSectionContentVisible, { once: true });
    if (!useGsapMotion) {
      window.addEventListener('scroll', showVisibleReveals, { passive: true });
    }
  } catch (err) {
    console.error('Portfolio init failed:', err);
    initSkills();
    renderProjects();
    ensureSectionContentVisible();
    document.documentElement.classList.add('app-ready');
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('vis'));
    revealHeroContent();
    hidePreloaderFallback();
  }
});

function restoreStaticStats() {
  document.querySelectorAll('.stat-n[data-count]').forEach((el) => {
    el.textContent = `${el.dataset.count}${el.dataset.suffix || ''}`;
  });
}

function restoreStaticTerminal() {
  const cmd1 = document.getElementById('terminal-cmd-1');
  const cmd2 = document.getElementById('terminal-cmd-2');
  const output1 = document.getElementById('terminal-output-1');
  if (cmd1) {
    cmd1.textContent = 'cat profile.json';
  }
  if (cmd2) {
    const cmdLine = terminalAgentLines.find((line) => line.type === 'cmd');
    cmd2.textContent = cmdLine?.text || '';
  }
  if (output1) {
    output1.style.opacity = '1';
  }
}

function hidePreloaderFallback() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
}
