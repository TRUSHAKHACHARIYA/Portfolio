let lenis = null;

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
      offset: options.offset ?? -80,
      duration: options.duration ?? 1.1,
    });
    return;
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (typeof window.Lenis === 'undefined') {
    return;
  }

  lenis = new window.Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  document.documentElement.classList.add('lenis', 'lenis-smooth');
}

export function initStaggeredReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('section').forEach((s) => {
      s.classList.add('section-visible');
      s.querySelectorAll('.stagger-item').forEach((item) => item.classList.add('vis'));
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const el = entry.target;
        el.classList.add('section-visible');

        const items = el.querySelectorAll(
          '.section-eyebrow, .section-heading, .section-subtext, .body-text, .stagger-item, .terminal, .hero-status, .hero-name, .hero-role, .hero-bio, .hero-cta-group, .hero-divider, .hero-meta, .resume-card, .contact-line, .cert-card, .published-course-card, .education-card, .event-desc'
        );

        items.forEach((item, i) => {
          if (!item.classList.contains('stagger-item')) {
            item.classList.add('stagger-item');
          }
          item.style.transitionDelay = `${Math.min(i * 50, 300)}ms`;
          item.classList.add('vis');
        });

        observer.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('section').forEach((s) => {
    observer.observe(s);
  });
}
