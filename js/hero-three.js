(function initHeroScenes() {
  function boot() {
    if (typeof THREE === 'undefined') {
      showRobotFallback();
      return;
    }

    if (window.innerWidth > 900) {
      requestAnimationFrame(() => {
        initParticles();
        initRobot();
      });
    } else {
      showRobotFallback();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    const count = 2800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const roll = Math.random();
      if (roll < 0.65) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 1;
      } else if (roll < 0.85) {
        colors[i * 3] = 0.4 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.3;
      } else {
        colors[i * 3] = 0.8;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.028,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      })
    );
    scene.add(points);

    const lineVerts = [];
    for (let i = 0; i < 140; i++) {
      const a = Math.floor(Math.random() * count);
      const b = Math.floor(Math.random() * count);
      lineVerts.push(positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2]);
      lineVerts.push(positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
    scene.add(
      new THREE.LineSegments(
        lineGeo,
        new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.06 })
      )
    );

    const mouse = { x: 0, y: 0 };
    let heroInView = true;

    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    });

    const heroSection = document.getElementById('hero');
    if (heroSection && typeof IntersectionObserver !== 'undefined') {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          heroInView = entry.isIntersecting;
        },
        { root: null, threshold: 0, rootMargin: '0px' }
      );
      heroObserver.observe(heroSection);
    }

    function resize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (w < 1 || h < 1) {
        return;
      }
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener('resize', resize);

    function animate() {
      requestAnimationFrame(animate);
      if (!heroInView) {
        return;
      }
      points.rotation.y += 0.0003;
      points.rotation.x += 0.0001;
      camera.position.x += (mouse.x - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    animate();
  }

  function initRobot() {
    const canvas = document.getElementById('robot-canvas');
    const container = document.getElementById('heroVis');
    if (!canvas || !container || typeof window.initMascotRobot !== 'function') {
      showRobotFallback();
      return;
    }

    try {
      window.initMascotRobot(canvas, container);
    } catch (err) {
      console.error('Robot scene failed:', err);
      showRobotFallback();
    }
  }

  function showRobotFallback() {
    const container = document.getElementById('heroVis');
    if (!container) {
      return;
    }
    const canvas = document.getElementById('robot-canvas');
    if (canvas) {
      canvas.style.display = 'none';
    }
    if (!container.querySelector('.robot-fallback')) {
      const fallback = document.createElement('div');
      fallback.className = 'robot-fallback';
      fallback.setAttribute('aria-hidden', 'true');
      fallback.innerHTML = `
        <div class="robot-fallback-ring"></div>
        <div class="robot-fallback-core">AI</div>
      `;
      container.appendChild(fallback);
    }
  }
})();
