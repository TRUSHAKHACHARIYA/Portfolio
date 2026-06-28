export function initRobot() {
  const robotHead = document.getElementById('robot-head');
  const robotEyes = document.getElementById('robot-eyes');
  const robotWrap = document.getElementById('robot-wrap');
  const armL = document.getElementById('arm-l');

  if (!robotHead || !robotWrap) {
    return;
  }

  if (armL && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    armL.style.transformOrigin = '18px 122px';
    armL.style.animation = 'robot-wave 1.2s ease-in-out 2.2s 1';
  }

  document.addEventListener('mousemove', (e) => {
    const rect = robotWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    const rotY = dx * 12;
    const rotX = -dy * 8;

    if (!robotHead.dataset.lookDown) {
      robotHead.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    }

    if (robotEyes) {
      robotEyes.style.transform = `translateX(${dx * 5}px) translateY(${dy * 3}px)`;
    }
  });

  function onScroll() {
    const scrolled = window.scrollY > window.innerHeight * 0.55;
    if (scrolled) {
      robotHead.dataset.lookDown = 'true';
      robotHead.style.transform = 'rotateX(20deg)';
    } else {
      delete robotHead.dataset.lookDown;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('#eye-l, #eye-r').forEach((eye) => {
        eye.setAttribute('fill', '#ffffff');
        eye.setAttribute('opacity', '1');
      });
    });
    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('#eye-l, #eye-r').forEach((eye) => {
        eye.setAttribute('fill', '#00d4ff');
        eye.setAttribute('opacity', '0.9');
      });
    });
  });
}

export function bindRobotProjectEyes() {
  document.querySelectorAll('.project-card').forEach((card) => {
    if (card.dataset.eyesBound) {
      return;
    }
    card.dataset.eyesBound = 'true';
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('#eye-l, #eye-r').forEach((eye) => {
        eye.setAttribute('fill', '#ffffff');
        eye.setAttribute('opacity', '1');
      });
    });
    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('#eye-l, #eye-r').forEach((eye) => {
        eye.setAttribute('fill', '#00d4ff');
        eye.setAttribute('opacity', '0.9');
      });
    });
  });
}
