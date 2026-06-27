import { terminalAgentLines } from './data.js';

let lenis = null;
let motionEnabled = true;
const splitInstances = [];

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01▸◆░▒▓';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function canUsePointerEffects() {
  return !window.matchMedia('(pointer: coarse)').matches && window.innerWidth > 900;
}

function hasGsap() {
  return typeof window.gsap !== 'undefined';
}

export function getLenis() {
  return lenis;
}

export function scrollToElement(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) {
    return;
  }

  if (lenis) {
    lenis.scrollTo(el, {
      offset: options.offset ?? -72,
      duration: options.duration ?? 1.15,
    });
    return;
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createSplit(el, options) {
  if (!el) {
    return null;
  }

  if (typeof window.SplitText !== 'undefined' && window.SplitText.create) {
    const split = window.SplitText.create(el, options);
    splitInstances.push(split);
    return split;
  }

  return manualSplit(el, options);
}

function manualSplit(el, options) {
  const type = options?.type || 'chars';
  const text = el.textContent;
  el.textContent = '';

  if (type.includes('chars')) {
    const chars = [];
    [...text].forEach((char) => {
      const mask = document.createElement('span');
      mask.style.display = 'inline-block';
      mask.style.overflow = 'hidden';
      mask.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = char === ' ' ? '\u00a0' : char;
      mask.appendChild(inner);
      el.appendChild(mask);
      chars.push(inner);
    });
    return { chars, revert: () => { el.textContent = text; } };
  }

  const words = [];
  text.split(/(\s+)/).forEach((part) => {
    if (!part.trim()) {
      el.appendChild(document.createTextNode(part));
      return;
    }

    const mask = document.createElement('span');
    mask.style.display = 'inline-block';
    mask.style.overflow = 'hidden';
    mask.style.verticalAlign = 'top';

    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.textContent = part;
    mask.appendChild(inner);
    el.appendChild(mask);
    words.push(inner);
  });

  return { words, revert: () => { el.textContent = text; } };
}

function initLenis() {
  if (typeof window.Lenis === 'undefined') {
    return;
  }

  lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  lenis.on('scroll', window.ScrollTrigger.update);

  window.gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  window.gsap.ticker.lagSmoothing(0);

  window.ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
  });

  window.ScrollTrigger.defaults({ scroller: document.documentElement });
  window.ScrollTrigger.addEventListener('refresh', () => lenis.resize());
  window.ScrollTrigger.refresh();

  document.documentElement.classList.add('lenis', 'lenis-smooth');
}

function scrollReveal(target, vars, trigger = {}) {
  return window.gsap.from(target, {
    ...vars,
    immediateRender: false,
    scrollTrigger: {
      toggleActions: 'play none none none',
      once: true,
      ...trigger,
    },
  });
}

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) {
    return;
  }
  preloader.style.display = 'none';
  preloader.style.pointerEvents = 'none';
  if (typeof window.gsap !== 'undefined') {
    window.gsap.set(preloader, { clearProps: 'all' });
  }
  preloader.remove();
}

function runPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  if (!preloader) {
    onComplete();
    return;
  }

  const tl = window.gsap.timeline({
    onComplete: () => {
      hidePreloader();
      onComplete();
    },
  });

  tl.from('#preloader-logo', {
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    ease: 'back.out(1.7)',
  })
    .to('#preloader-bar', {
      width: '100%',
      duration: 0.45,
      ease: 'power2.inOut',
    })
    .to('#preloader', {
      yPercent: -100,
      duration: 0.45,
      ease: 'power3.inOut',
      delay: 0.05,
    });
}

function animateHeroStatsCounter() {
  document.querySelectorAll('.hero-stats .stat-n[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const counter = { val: 0 };

    window.gsap.to(counter, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      delay: 0.15,
      onUpdate: () => {
        el.textContent = `${Math.round(counter.val)}${suffix}`;
      },
    });
  });
}

export function revealHeroContent() {
  window.gsap.set(
    ['.hero-role', '.hero-typing', '.hero-desc', '.hero-ctas > *', '.hero-stats .stat', '.hud-float', '.ticker-wrap', '.hero-eyebrow'],
    { opacity: 1, y: 0, scale: 1, clearProps: 'transform' }
  );
}

function runHeroAnimation(onComplete) {
  const firstName = document.querySelector('.hero-title .name');
  const lastName = document.querySelector('.hero-title .surname');

  if (!firstName || !lastName) {
    onComplete();
    return;
  }

  let splitFirst;
  let splitLast;

  try {
    splitFirst = createSplit(firstName, { type: 'chars', mask: 'chars' });
    splitLast = createSplit(lastName, { type: 'chars', mask: 'chars' });
  } catch (err) {
    console.warn('Hero split failed, using simple fade:', err);
    revealHeroContent();
    onComplete();
    return;
  }

  const firstChars = splitFirst?.chars?.length ? splitFirst.chars : [firstName];
  const lastChars = splitLast?.chars?.length ? splitLast.chars : [lastName];

  const heroTl = window.gsap.timeline({
    defaults: { ease: 'power2.out' },
    onComplete: () => {
      revealHeroContent();
      animateHeroStatsCounter();
      onComplete();
    },
  });

  heroTl
    .from('.hero-eyebrow', {
      opacity: 0,
      y: 12,
      duration: 0.5,
    })
    .from(firstChars, {
      y: '100%',
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.04,
    }, '-=0.1')
    .from(lastChars, {
      y: '100%',
      opacity: 0,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.035,
    }, '-=0.45')
    .from('.hero-role', {
      opacity: 0,
      y: 10,
      duration: 0.4,
    }, '-=0.2')
    .from('.hero-typing', {
      opacity: 0,
      y: 12,
      duration: 0.35,
    }, '-=0.15')
    .from('.hero-desc', {
      opacity: 0,
      y: 16,
      duration: 0.5,
    }, '-=0.1')
    .from('.hero-ctas > *', {
      opacity: 0,
      y: 14,
      duration: 0.4,
      stagger: 0.1,
    }, '-=0.2')
    .from('.hero-stats .stat', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.08,
      ease: 'back.out(1.4)',
    }, '-=0.1')
    .from('.hud-float', {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    }, '-=0.35')
    .from('.ticker-wrap', {
      opacity: 0,
      y: 10,
      duration: 0.4,
    }, '-=0.15');
}

function scrambleText(el, finalText) {
  let frame = 0;
  const totalFrames = 18;

  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((char, i) => {
        if (i < Math.floor((frame / totalFrames) * finalText.length)) {
          return char;
        }
        if (char === ' ') {
          return ' ';
        }
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join('');

    frame += 1;
    if (frame > totalFrames) {
      clearInterval(interval);
      el.textContent = finalText;
    }
  }, 30);
}

function animateNavScramble() {
  if (!canUsePointerEffects()) {
    return;
  }

  document.querySelectorAll('.nav-links a, .mobile-menu a, .s-label').forEach((link) => {
    const original = link.textContent.trim();
    link.addEventListener('mouseenter', () => scrambleText(link, original));
  });
}

function animateSectionTitles() {
  document.querySelectorAll('.s-title').forEach((title) => {
    if (title.closest('#hero')) {
      return;
    }

    const split = createSplit(title, { type: 'chars', mask: 'chars' });

    window.gsap.from(split.chars, {
      y: '100%',
      opacity: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.025,
      immediateRender: false,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  });
}

function animateBodyText() {
  document.querySelectorAll('.s-desc, .about-para').forEach((el) => {
    const split = createSplit(el, { type: 'words', mask: 'words' });

    window.gsap.from(split.words, {
      y: '110%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.025,
      immediateRender: false,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  });

  document.querySelectorAll('.proj-desc').forEach((el) => {
    scrollReveal(el, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    }, { trigger: el, start: 'top 88%' });
  });

  document.querySelectorAll('.tl-bullets li').forEach((el) => {
    scrollReveal(el, {
      opacity: 0,
      x: -16,
      duration: 0.45,
      ease: 'power2.out',
    }, { trigger: el, start: 'top 90%' });
  });
}

function animateStatCounters() {
  document.querySelectorAll('.stat-n[data-count]').forEach((el) => {
    if (el.closest('.hero-stats')) {
      return;
    }

    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const counter = { val: 0 };

    window.gsap.to(counter, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(counter.val)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

function animateMagneticButtons() {
  if (!canUsePointerEffects()) {
    return;
  }

  document.querySelectorAll('.btn-primary, .hire-btn, .btn-outline, .form-submit, .resume-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      window.gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      window.gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}

function animateCards() {
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid && projectsGrid.children.length) {
    scrollReveal('.proj-card', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power2.out',
      stagger: { amount: 0.5, from: 'start' },
    }, { trigger: projectsGrid, start: 'top 75%' });
  }

  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid && skillsGrid.children.length) {
    scrollReveal('.skill-cat-card', {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.4,
      ease: 'back.out(1.4)',
      stagger: { amount: 0.8, grid: 'auto' },
    }, { trigger: skillsGrid, start: 'top 78%' });
  }

  const eduGrid = document.querySelector('.edu-grid');
  if (eduGrid) {
    scrollReveal('.edu-card', {
      opacity: 0,
      y: 28,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.15,
    }, { trigger: eduGrid, start: 'top 78%' });
  }

  const certList = document.querySelector('.cert-list');
  if (certList) {
    scrollReveal('.cert-card', {
      opacity: 0,
      y: 24,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.12,
    }, { trigger: certList, start: 'top 80%' });
  }
}

function animateTimelineItems() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) {
    return;
  }

  scrollReveal('.timeline-item', {
    opacity: 0,
    x: -30,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.2,
  }, { trigger: timeline, start: 'top 75%' });
}

function animateTerminal() {
  const terminal = document.querySelector('.terminal');
  const cmd1 = document.getElementById('terminal-cmd-1');
  const output1 = document.getElementById('terminal-output-1');
  const cmd2 = document.getElementById('terminal-cmd-2');
  const agentOutput = document.getElementById('terminalAgentOutput');

  if (!terminal || !cmd1 || !output1 || !cmd2 || !agentOutput) {
    return;
  }

  agentOutput.innerHTML = '';
  terminalAgentLines
    .filter((line) => line.type !== 'cmd')
    .forEach((line) => {
      const div = document.createElement('div');
      div.className = `agent-log-line t-line t-line-${line.type}`;
      div.textContent = line.text;
      agentOutput.appendChild(div);
    });

  const cmdLine = terminalAgentLines.find((line) => line.type === 'cmd');
  const cmdText = cmdLine?.text || 'python run_agent.py --task "ATO tax research Q4"';

  const terminalTl = window.gsap.timeline({
    scrollTrigger: {
      trigger: terminal,
      start: 'top 75%',
      once: true,
    },
  });

  terminalTl
    .to(cmd1, {
      duration: 0.8,
      text: 'cat profile.json',
      ease: 'none',
    })
    .from(output1, {
      opacity: 0,
      y: 5,
      duration: 0.3,
    })
    .to({}, { duration: 0.6 })
    .to(cmd2, {
      duration: 1.2,
      text: cmdText,
      ease: 'none',
    })
    .from('.agent-log-line', {
      opacity: 0,
      x: -10,
      duration: 0.25,
      stagger: 0.3,
      ease: 'power1.out',
    });
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) {
    return;
  }

  window.gsap.to(bar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: 'max',
      scrub: 0.3,
    },
  });
}

export function bootstrapAnimations({ onHeroComplete } = {}) {
  motionEnabled = !prefersReducedMotion() && hasGsap();

  if (!motionEnabled) {
    hidePreloader();
    revealHeroContent();
    onHeroComplete?.();
    return Promise.resolve();
  }

  window.gsap.registerPlugin(window.ScrollTrigger, window.SplitText, window.TextPlugin);
  document.documentElement.classList.add('gsap-motion');
  initLenis();

  return new Promise((resolve) => {
    runPreloader(() => {
      runHeroAnimation(() => {
        onHeroComplete?.();
        resolve();
      });
    });
  });
}

export function initScrollAnimations() {
  if (!motionEnabled || !hasGsap()) {
    return;
  }

  animateSectionTitles();
  animateBodyText();
  animateStatCounters();
  animateCards();
  animateTimelineItems();
  animateMagneticButtons();
  animateNavScramble();
  animateTerminal();
  initScrollProgress();

  window.requestAnimationFrame(() => window.ScrollTrigger.refresh());
  window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
}

export function refreshScrollAnimations() {
  if (!motionEnabled) {
    return;
  }
  window.ScrollTrigger.refresh();
}
