let robotApi = null;

export function initRobot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (window.innerWidth <= 768 || typeof THREE === 'undefined') {
    return;
  }

  const canvas = document.getElementById('robot-canvas');
  const container = document.querySelector('.hero-visual');
  if (!canvas || !container || typeof window.initMascotRobot !== 'function') {
    return;
  }

  robotApi = window.initMascotRobot(canvas, container);
}

export function bindRobotProjectEyes() {
  if (!robotApi?.setProjectHover) {
    return;
  }

  document.querySelectorAll('.project-row:not([data-eyes-bound])').forEach((card) => {
    card.dataset.eyesBound = 'true';
    card.addEventListener('mouseenter', () => robotApi.setProjectHover(true));
    card.addEventListener('mouseleave', () => robotApi.setProjectHover(false));
  });
}
