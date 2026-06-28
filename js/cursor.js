let enabled = false;
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;
let rafId = null;

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  const ring = document.getElementById('cursor-ring');
  if (ring) {
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
  }

  rafId = requestAnimationFrame(animateRing);
}

function setBodyCursorState(state) {
  document.body.classList.remove('cursor-hover', 'cursor-link', 'cursor-project');
  if (state) {
    document.body.classList.add(state);
  }
}

export function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) {
    document.documentElement.style.cursor = 'auto';
    return;
  }

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) {
    return;
  }

  enabled = true;
  document.body.classList.add('custom-cursor');

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .nav-cta').forEach((el) => {
    el.addEventListener('mouseenter', () => setBodyCursorState('cursor-link'));
    el.addEventListener('mouseleave', () => setBodyCursorState(null));
  });

  document.querySelectorAll('p, h1, h2, h3, li, .body-text').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (!document.body.classList.contains('cursor-link') && !document.body.classList.contains('cursor-project')) {
        setBodyCursorState('cursor-hover');
      }
    });
    el.addEventListener('mouseleave', () => {
      if (document.body.classList.contains('cursor-hover')) {
        setBodyCursorState(null);
      }
    });
  });

  animateRing();
}

export function bindProjectCursor() {
  if (!enabled) {
    return;
  }

  document.querySelectorAll('.project-card:not([data-cursor-bound])').forEach((card) => {
    card.dataset.cursorBound = 'true';
    card.addEventListener('mouseenter', () => setBodyCursorState('cursor-project'));
    card.addEventListener('mouseleave', () => setBodyCursorState(null));
  });
}
