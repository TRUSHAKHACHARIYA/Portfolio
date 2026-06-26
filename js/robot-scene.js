window.initMascotRobot = function initMascotRobot(canvas, container) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0.15, 0.35, 4.6);

  scene.add(new THREE.AmbientLight(0x0a1628, 0.55));

  const keyLight = new THREE.DirectionalLight(0x00d4ff, 1.35);
  keyLight.position.set(-4, 3, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x7b5ea7, 0.75);
  fillLight.position.set(5, 1, 3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xaeefff, 0.45);
  rimLight.position.set(0, 2, -4);
  scene.add(rimLight);

  const chestLight = new THREE.PointLight(0x00d4ff, 1.8, 4);
  const visorLight = new THREE.PointLight(0x00d4ff, 2.2, 3);

  function bodyMaterial(intensity) {
    return new THREE.MeshStandardMaterial({
      color: 0x091525,
      emissive: 0x00d4ff,
      emissiveIntensity: intensity,
      metalness: 0.92,
      roughness: 0.14,
    });
  }

  function glowMaterial(color, intensity) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: intensity,
      metalness: 0.15,
      roughness: 0.08,
      transparent: true,
      opacity: 0.95,
    });
  }

  function addEdgeGlow(mesh, opacity) {
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: opacity || 0.5 })
    );
    mesh.add(edges);
  }

  const mascot = new THREE.Group();
  mascot.rotation.y = 0.28;

  const bodyMat = bodyMaterial(0.08);
  const darkMat = bodyMaterial(0.04);

  const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.2, 0.14, 6), bodyMaterial(0.22));
  platform.position.y = -1.42;
  mascot.add(platform);
  addEdgeGlow(platform, 0.35);

  const platformRing = new THREE.Mesh(
    new THREE.RingGeometry(0.82, 1.28, 6),
    new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
  );
  platformRing.rotation.x = -Math.PI / 2;
  platformRing.position.y = -1.34;
  mascot.add(platformRing);

  const platformPulse = new THREE.Mesh(
    new THREE.RingGeometry(0.55, 0.95, 32),
    new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.08, side: THREE.DoubleSide })
  );
  platformPulse.rotation.x = -Math.PI / 2;
  platformPulse.position.y = -1.33;
  mascot.add(platformPulse);

  const hip = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), darkMat);
  hip.scale.set(1.35, 0.55, 1);
  hip.position.y = -1.05;
  mascot.add(hip);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.68, 1.05, 32), bodyMat);
  torso.position.y = -0.38;
  mascot.add(torso);
  addEdgeGlow(torso);

  const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.62, 0.38), darkMat);
  chestPlate.position.set(0, -0.22, 0.28);
  mascot.add(chestPlate);
  addEdgeGlow(chestPlate, 0.35);

  const chestCore = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 20), glowMaterial(0x00d4ff, 2));
  chestCore.position.set(0, -0.18, 0.48);
  mascot.add(chestCore);
  chestLight.position.copy(chestCore.position);
  mascot.add(chestLight);

  const haloRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.82, 0.018, 8, 80),
    new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.65 })
  );
  haloRing.rotation.x = Math.PI / 2;
  haloRing.position.y = -0.62;
  mascot.add(haloRing);

  const headGroup = new THREE.Group();
  headGroup.position.y = 0.52;
  mascot.add(headGroup);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.18, 16), darkMat);
  neck.position.y = -0.08;
  headGroup.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.46, 32, 32), bodyMat);
  head.scale.set(1.05, 1.08, 0.92);
  headGroup.add(head);
  addEdgeGlow(head);

  const facePlate = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.38, 0.12), darkMat);
  facePlate.position.set(0, -0.02, 0.38);
  headGroup.add(facePlate);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.14, 0.06), glowMaterial(0x00d4ff, 2.4));
  visor.position.set(0, 0.02, 0.46);
  headGroup.add(visor);

  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), glowMaterial(0x00ffff, 3));
  leftEye.position.set(-0.14, 0.02, 0.48);
  headGroup.add(leftEye);

  const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), glowMaterial(0x00ffff, 3));
  rightEye.position.set(0.14, 0.02, 0.48);
  headGroup.add(rightEye);

  visorLight.position.set(0, 0.52, 0.9);
  headGroup.add(visorLight);

  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 8), darkMat);
  antenna.position.set(0, 0.52, 0);
  headGroup.add(antenna);

  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), glowMaterial(0x00ff88, 2.2));
  antennaTip.position.set(0, 0.74, 0);
  headGroup.add(antennaTip);

  function createArm(side) {
    const arm = new THREE.Group();
    const sign = side === 'left' ? -1 : 1;

    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), bodyMat);
    shoulder.position.set(sign * 0.72, -0.05, 0);
    arm.add(shoulder);

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.48, 16), bodyMat);
    upper.position.set(sign * 0.82, -0.28, 0.05);
    upper.rotation.z = sign * 0.45;
    arm.add(upper);
    addEdgeGlow(upper, 0.4);

    const forearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.42, 16), darkMat);
    forearm.position.set(sign * 1.02, -0.62, 0.12);
    forearm.rotation.z = sign * 0.85;
    arm.add(forearm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), bodyMat);
    hand.position.set(sign * 1.08, -0.88, 0.18);
    arm.add(hand);

    return arm;
  }

  const leftArm = createArm('left');
  const rightArm = createArm('right');
  mascot.add(leftArm, rightArm);

  const orbitCount = 120;
  const orbitPositions = new Float32Array(orbitCount * 3);
  for (let i = 0; i < orbitCount; i++) {
    const angle = (i / orbitCount) * Math.PI * 2;
    const radius = 1.15 + Math.random() * 0.35;
    orbitPositions[i * 3] = Math.cos(angle) * radius;
    orbitPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.6;
    orbitPositions[i * 3 + 2] = Math.sin(angle) * radius * 0.45;
  }
  const orbitGeo = new THREE.BufferGeometry();
  orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
  const orbitPoints = new THREE.Points(
    orbitGeo,
    new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  mascot.add(orbitPoints);

  scene.add(mascot);

  const mouse = { x: 0, y: 0 };
  let hovered = false;
  let wake = 0;

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
    const bob = Math.sin(t * 1.8) * 0.045;
    const pulse = 0.75 + Math.sin(t * 3.2) * 0.25;
    const targetWake = hovered ? 1 : 0;
    wake += (targetWake - wake) * 0.06;

    mascot.position.y = bob;
    platformPulse.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08);
    platformPulse.material.opacity = 0.06 + wake * 0.12 + Math.sin(t * 3) * 0.03;

    haloRing.rotation.z += 0.012 + wake * 0.008;
    orbitPoints.rotation.y += 0.004;
    orbitPoints.rotation.x = Math.sin(t * 0.5) * 0.08;

    const lookY = mouse.x * 0.35;
    const lookX = -mouse.y * 0.22;
    headGroup.rotation.y += (lookY - headGroup.rotation.y) * 0.08;
    headGroup.rotation.x += (lookX - headGroup.rotation.x) * 0.08;

    mascot.rotation.y += ((0.28 + mouse.x * 0.18) - mascot.rotation.y) * 0.05;
    mascot.rotation.x += ((-mouse.y * 0.1) - mascot.rotation.x) * 0.05;

    const eyeScale = pulse + wake * 0.15;
    leftEye.scale.setScalar(eyeScale);
    rightEye.scale.setScalar(eyeScale);
    visor.material.emissiveIntensity = 2.2 + wake * 1.4 + pulse * 0.4;
    chestCore.material.emissiveIntensity = 1.6 + wake * 1.2 + pulse * 0.3;
    chestLight.intensity = 1.4 + wake * 1.6;
    visorLight.intensity = 1.8 + wake * 2;
    bodyMat.emissiveIntensity = 0.08 + wake * 0.14;

    rightArm.rotation.z = -0.08 + Math.sin(t * 1.6) * 0.06;
    leftArm.rotation.z = 0.06 + Math.sin(t * 1.6 + 1) * 0.04;

    renderer.render(scene, camera);
  }

  animate();
};
