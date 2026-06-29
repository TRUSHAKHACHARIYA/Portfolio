window.initMascotRobot = function initMascotRobot(canvas, container) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.set(0, 0.4, 6.8);

  scene.add(new THREE.AmbientLight(0x050d1a, 1.0));

  const cyanKey = new THREE.DirectionalLight(0x00d4ff, 3.0);
  cyanKey.position.set(-2, 3, 4);
  scene.add(cyanKey);

  const purpleFill = new THREE.DirectionalLight(0x7b5ea7, 1.5);
  purpleFill.position.set(3, 1, 2);
  scene.add(purpleFill);

  const rimLight = new THREE.DirectionalLight(0xaaccff, 1.0);
  rimLight.position.set(0, 5, -3);
  scene.add(rimLight);

  const chestGlow = new THREE.PointLight(0x00d4ff, 4.0, 6);
  const groundGlow = new THREE.PointLight(0x00ff88, 2.0, 4);
  groundGlow.position.set(0, -2.5, 0);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0a1628,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0x001122,
    emissiveIntensity: 0.3,
  });

  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x060e18,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0x001122,
    emissiveIntensity: 0.15,
  });

  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    emissive: 0x00d4ff,
    emissiveIntensity: 1.2,
    roughness: 0.0,
    metalness: 0.0,
  });

  const haloMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    emissive: 0x00d4ff,
    emissiveIntensity: 2.0,
    transparent: true,
    opacity: 0.85,
  });

  const platformMat = new THREE.MeshStandardMaterial({
    color: 0x030a14,
    emissive: 0x00d4ff,
    emissiveIntensity: 0.4,
    metalness: 0.8,
    roughness: 0.3,
  });

  const edgeMat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.6 });

  function box(w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    return mesh;
  }

  function cyl(rt, rb, h, seg, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
    mesh.position.set(x, y, z);
    return mesh;
  }

  function addEdges(mesh) {
    const lines = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMat);
    mesh.add(lines);
  }

  const robot = new THREE.Group();
  const headGroup = new THREE.Group();
  headGroup.position.y = 1.35;
  robot.add(headGroup);

  const helmet = box(1.1, 1.1, 1.1, bodyMat, 0, 0, 0);
  headGroup.add(helmet);
  addEdges(helmet);

  const visor = box(0.7, 0.3, 0.15, visorMat, 0, 0.05, 0.58);
  headGroup.add(visor);

  const neck = cyl(0.15, 0.2, 0.3, 12, panelMat, 0, -0.72, 0);
  headGroup.add(neck);

  const torso = box(1.4, 1.6, 0.9, bodyMat, 0, -0.15, 0);
  robot.add(torso);
  addEdges(torso);

  const chestPlate = box(0.95, 1.1, 0.12, panelMat, 0, -0.1, 0.48);
  robot.add(chestPlate);

  chestGlow.position.set(0, 0.5, 0.8);
  robot.add(chestGlow);

  function createLimb(side) {
    const sign = side === 'left' ? -1 : 1;
    const group = new THREE.Group();

    const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), bodyMat);
    shoulder.position.set(sign * 0.95, 0.45, 0);
    group.add(shoulder);

    const upperArm = cyl(0.18, 0.18, 1.1, 12, bodyMat, sign * 1.05, -0.15, 0);
    upperArm.rotation.z = sign * 0.35;
    group.add(upperArm);

    const handMat = bodyMat.clone();
    handMat.emissiveIntensity = 0.45;
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), handMat);
    hand.position.set(sign * 1.22, -0.78, 0.08);
    group.add(hand);

    return group;
  }

  robot.add(createLimb('left'), createLimb('right'));

  const hip = box(1.2, 0.4, 0.8, bodyMat, 0, -1.05, 0);
  robot.add(hip);

  function createLeg(side) {
    const sign = side === 'left' ? -1 : 1;
    const group = new THREE.Group();

    const leg = cyl(0.22, 0.22, 1.1, 12, bodyMat, sign * 0.35, -1.75, 0);
    group.add(leg);

    const foot = box(0.35, 0.2, 0.5, bodyMat, sign * 0.35, -2.35, 0.12);
    group.add(foot);

    return group;
  }

  robot.add(createLeg('left'), createLeg('right'));

  const haloRing = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.03, 8, 60), haloMat);
  haloRing.rotation.x = 0.3;
  haloRing.position.y = -0.35;
  robot.add(haloRing);

  const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 0.12, 6), platformMat);
  platform.position.y = -2.55;
  robot.add(platform);
  addEdges(platform);

  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 256;
  glowCanvas.height = 256;
  const ctx = glowCanvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(0,212,255,0.35)');
  grad.addColorStop(0.45, 'rgba(0,212,255,0.08)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const glowTex = new THREE.CanvasTexture(glowCanvas);
  const glowDisc = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  glowDisc.rotation.x = -Math.PI / 2;
  glowDisc.position.y = -2.48;
  robot.add(glowDisc);

  const orbitGeo = new THREE.BufferGeometry();
  const orbitCount = 80;
  const orbitPos = new Float32Array(orbitCount * 3);
  for (let i = 0; i < orbitCount; i++) {
    const a = (i / orbitCount) * Math.PI * 2;
    const r = 1.35 + Math.random() * 0.25;
    orbitPos[i * 3] = Math.cos(a) * r;
    orbitPos[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
    orbitPos[i * 3 + 2] = Math.sin(a) * r * 0.35;
  }
  orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
  const orbitPoints = new THREE.Points(
    orbitGeo,
    new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.04,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  robot.add(orbitPoints);

  robot.position.y = -0.15;
  robot.scale.setScalar(0.52);
  scene.add(robot);
  scene.add(groundGlow);

  const mouse = { x: 0, y: 0 };
  container.addEventListener('mousemove', (e) => {
    const r = container.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width - 0.5;
    mouse.y = (e.clientY - r.top) / r.height - 0.5;
  });

  function resize() {
    const w = canvas.clientWidth || container.clientWidth || 480;
    const h = canvas.clientHeight || container.clientHeight || 520;
    if (w < 1 || h < 1) {
      return;
    }
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize);

  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => resize())
    : null;
  if (resizeObserver) {
    resizeObserver.observe(container);
  }

  const clock = new THREE.Clock();
  let projectHover = false;
  let animationId = null;

  function animate() {
    animationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    robot.position.y = -0.15 + Math.sin(t * 0.8) * 0.08;

    headGroup.rotation.y = Math.sin(t * 0.5) * 0.06;
    headGroup.rotation.x = Math.sin(t * 0.3) * 0.03;

    const targetRotY = Math.max(-0.3, Math.min(0.3, mouse.x * 0.12));
    const targetRotX = Math.max(-0.3, Math.min(0.3, -mouse.y * 0.08));
    robot.rotation.y += (targetRotY - robot.rotation.y) * 0.05;
    robot.rotation.x += (targetRotX - robot.rotation.x) * 0.05;

    haloRing.rotation.z += 0.006;
    orbitPoints.rotation.y += 0.004;

    const visorPulse = projectHover ? 3 : 0.8 + Math.sin(t * 2.2) * 0.4;
    visorMat.emissiveIntensity = visorPulse;
    chestGlow.intensity = projectHover ? 6 : 3.0 + Math.sin(t * 1.5) * 1.5;
    groundGlow.intensity = 1.8 + Math.sin(t * 3.0) * 0.4;

    renderer.render(scene, camera);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else if (!animationId) {
      animate();
    }
  });

  return {
    setProjectHover(active) {
      projectHover = active;
    },
    destroy() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      resizeObserver?.disconnect();
      renderer.dispose();
    },
  };
};
