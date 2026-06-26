(function initHeroScenes() {
  if (typeof THREE === 'undefined') {
    return;
  }

  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    initParticles();
    initRobot();
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

    const count = 2200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const t = Math.random();
      if (t < 0.65) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 1;
      } else if (t < 0.85) {
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
        opacity: 0.7,
        sizeAttenuation: true,
      })
    );
    scene.add(points);

    const lineVerts = [];
    for (let i = 0; i < 80; i++) {
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
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    });

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener('resize', resize);

    function animate() {
      requestAnimationFrame(animate);
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
    if (!canvas || !container) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

    scene.add(new THREE.AmbientLight(0x0d1e33, 0.4));

    const cyanKey = new THREE.DirectionalLight(0x00d4ff, 1.2);
    cyanKey.position.set(-3, 2, 4);
    scene.add(cyanKey);

    const purpleFill = new THREE.DirectionalLight(0x7b5ea7, 0.6);
    purpleFill.position.set(4, 1, 2);
    scene.add(purpleFill);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    function chromeMat(intensity = 0.12) {
      return new THREE.MeshStandardMaterial({
        color: 0x0d1e33,
        emissive: 0x00d4ff,
        emissiveIntensity: intensity,
        metalness: 0.85,
        roughness: 0.18,
      });
    }

    const robotGroup = new THREE.Group();
    const bodyMat = chromeMat(0.1);
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 1.2,
      metalness: 0.2,
      roughness: 0.1,
    });
    const greenGlow = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 1.5,
      metalness: 0.1,
      roughness: 0.2,
    });

    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1, 0.12, 6), chromeMat(0.25));
    pedestal.position.y = -1.35;
    robotGroup.add(pedestal);

    const pedestalGlow = new THREE.Mesh(
      new THREE.RingGeometry(0.7, 1.1, 6),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
    );
    pedestalGlow.rotation.x = -Math.PI / 2;
    pedestalGlow.position.y = -1.28;
    robotGroup.add(pedestalGlow);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.65), bodyMat);
    torso.position.y = -0.35;
    robotGroup.add(torso);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.75), bodyMat);
    head.position.y = 0.55;
    robotGroup.add(head);

    const eyeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeo, glowMat);
    leftEye.position.set(-0.2, 0.58, 0.36);
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, glowMat);
    rightEye.position.set(0.2, 0.58, 0.36);
    robotGroup.add(rightEye);

    const leftEyeLight = new THREE.PointLight(0x00d4ff, 1.5, 2);
    leftEyeLight.position.copy(leftEye.position);
    robotGroup.add(leftEyeLight);

    const rightEyeLight = new THREE.PointLight(0x00d4ff, 1.5, 2);
    rightEyeLight.position.copy(rightEye.position);
    robotGroup.add(rightEyeLight);

    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45, 8), bodyMat);
    antenna.position.set(0, 1.05, 0);
    robotGroup.add(antenna);

    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), greenGlow);
    antennaTip.position.set(0, 1.3, 0);
    robotGroup.add(antennaTip);

    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), bodyMat);
    leftArm.position.set(-0.75, -0.2, 0);
    leftArm.rotation.z = 0.35;
    robotGroup.add(leftArm);

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.22), bodyMat);
    rightArm.position.set(0.75, -0.15, 0.1);
    rightArm.rotation.z = -0.55;
    rightArm.rotation.x = -0.2;
    robotGroup.add(rightArm);

    const haloRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.75, 0.015, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.55 })
    );
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.y = -0.55;
    robotGroup.add(haloRing);

    scene.add(robotGroup);

    const mouse = { x: 0, y: 0 };
    let hovered = false;

    container.addEventListener('mousemove', (e) => {
      const r = container.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width - 0.5;
      mouse.y = (e.clientY - r.top) / r.height - 0.5;
    });

    container.addEventListener('mouseenter', () => {
      hovered = true;
    });
    container.addEventListener('mouseleave', () => {
      hovered = false;
      mouse.x = 0;
      mouse.y = 0;
    });

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const bob = Math.sin(t * 2.1) * 0.03;
      const eyePulse = 0.8 + Math.sin(t * 3.5) * 0.2;

      robotGroup.position.y = bob;
      head.position.y = 0.55 + Math.sin(t * 2.1) * 0.015;

      leftEye.scale.setScalar(eyePulse);
      rightEye.scale.setScalar(eyePulse);
      leftEyeLight.intensity = hovered ? 2.5 * eyePulse : 1.5 * eyePulse;
      rightEyeLight.intensity = leftEyeLight.intensity;

      haloRing.rotation.z += 0.008;

      const targetRotY = mouse.x * 0.24;
      const targetRotX = -mouse.y * 0.18;
      robotGroup.rotation.y += (targetRotY - robotGroup.rotation.y) * 0.06;
      robotGroup.rotation.x += (targetRotX - robotGroup.rotation.x) * 0.06;

      if (hovered) {
        bodyMat.emissiveIntensity = 0.18;
      } else {
        bodyMat.emissiveIntensity += (0.1 - bodyMat.emissiveIntensity) * 0.05;
      }

      renderer.render(scene, camera);
    }

    animate();
  }
})();
