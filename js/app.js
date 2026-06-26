import { phrases, skills, tickerItems } from './data.js';

function initHoloCard() {
  const holoCard = document.getElementById('holoCard');
  if (!holoCard) {
    return;
  }

  holoCard.addEventListener('mousemove', (e) => {
    const r = holoCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    holoCard.style.transform = `perspective(600px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });

  holoCard.addEventListener('mouseleave', () => {
    holoCard.style.transform = 'perspective(600px) rotateY(0) rotateX(0)';
  });
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
      <div class="skill-pct">${s.pct}% proficiency</div>
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

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) {
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'var(--green)';
      btn.style.color = 'var(--bg)';

      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    }, 1500);
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
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
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

document.addEventListener('DOMContentLoaded', () => {
  initTicker();
  initHoloCard();
  initTyping();
  initSkills();
  initScrollReveal();
  initContactForm();
  initMobileMenu();
});
