import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

const PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share";

const PRIMARY = new THREE.Color("#cafe38");
const SECONDARY = new THREE.Color("#9fe33b");

function EcosystemField({
  active,
  targetRef,
  targetHovered,
}: {
  active: boolean;
  targetRef: RefObject<HTMLElement>;
  targetHovered: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const driftRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(active);
  const hoverRef = useRef(targetHovered);
  const loopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
    if (activeRef.current && loopRef.current && !frameRef.current) {
      frameRef.current = requestAnimationFrame(loopRef.current);
    }
    if (!activeRef.current && frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  }, [active]);

  useEffect(() => {
    hoverRef.current = targetHovered;
  }, [targetHovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) {
      container.dataset.webgl = "failed";
      return;
    }

    const scene = new THREE.Scene();
    const frustumSize = 8.5;
    const camera = new THREE.OrthographicCamera(
      frustumSize / -2,
      frustumSize / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      100,
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const fieldGroup = new THREE.Group();
    scene.add(fieldGroup);

    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.random() * 2.4;
      const height = (Math.random() - 0.5) * 0.8;
      const idx = i * 3;
      positions[idx] = Math.cos(angle) * radius;
      positions[idx + 1] = Math.sin(angle) * radius * 0.6 + height;
      positions[idx + 2] = (Math.random() - 0.5) * 1.2;

      velocities[idx] = (Math.random() - 0.5) * 0.01;
      velocities[idx + 1] = (Math.random() - 0.5) * 0.01;
      velocities[idx + 2] = 0;

      const tint = PRIMARY.clone().lerp(SECONDARY, Math.random());
      colors[idx] = tint.r;
      colors[idx + 1] = tint.g;
      colors[idx + 2] = tint.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.07,
        transparent: true,
        opacity: 0.75,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    fieldGroup.add(points);

    const createRing = (radius: number, opacity: number, tilt: number) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.02, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: PRIMARY.clone().lerp(SECONDARY, 0.4),
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tilt;
      ring.rotation.y = tilt * 0.6;
      return ring;
    };

    const rings = [
      createRing(1.8, 0.15, 0.6),
      createRing(2.6, 0.1, -0.4),
      createRing(3.2, 0.08, 0.25),
    ];
    rings.forEach((ring) => fieldGroup.add(ring));

    const flowCount = 60;
    const flowPositions = new Float32Array(flowCount * 2 * 3);
    const flowColors = new Float32Array(flowCount * 2 * 3);
    const flowAnchors = Array.from({ length: flowCount }, (_, i) => ({
      angle: (i / flowCount) * Math.PI * 2,
      radius: 3.2 + Math.random() * 1.4,
      speed: 0.15 + Math.random() * 0.25,
    }));
    for (let i = 0; i < flowCount; i++) {
      const idx = i * 6;
      flowColors[idx] = PRIMARY.r;
      flowColors[idx + 1] = PRIMARY.g;
      flowColors[idx + 2] = PRIMARY.b;
      flowColors[idx + 3] = SECONDARY.r;
      flowColors[idx + 4] = SECONDARY.g;
      flowColors[idx + 5] = SECONDARY.b;
    }
    const flowGeometry = new THREE.BufferGeometry();
    flowGeometry.setAttribute("position", new THREE.BufferAttribute(flowPositions, 3));
    flowGeometry.setAttribute("color", new THREE.BufferAttribute(flowColors, 3));
    const flowLines = new THREE.LineSegments(
      flowGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    fieldGroup.add(flowLines);

    const targetHalo = new THREE.Group();
    const haloOuter = new THREE.Mesh(
      new THREE.RingGeometry(0.45, 0.5, 64),
      new THREE.MeshBasicMaterial({
        color: PRIMARY,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    );
    const haloInner = new THREE.Mesh(
      new THREE.RingGeometry(0.26, 0.3, 64),
      new THREE.MeshBasicMaterial({
        color: SECONDARY,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    );
    targetHalo.add(haloOuter, haloInner);
    ringGroup.add(targetHalo);

    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const aspect = width / height;
      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handlePointer = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const clampedX = Math.max(-0.6, Math.min(0.6, x));
      const clampedY = Math.max(-0.6, Math.min(0.6, y));
      pointerRef.current.x = clampedX * 0.8;
      pointerRef.current.y = clampedY * 0.6;
    };
    const resetPointer = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };
    window.addEventListener("pointermove", handlePointer);
    window.addEventListener("blur", resetPointer);

    const clock = new THREE.Clock();
    const targetWorld = new THREE.Vector3(0, 0, 0);
    const updateTarget = () => {
      const targetEl = targetRef.current;
      if (!targetEl) return;
      const targetRect = targetEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const cx = targetRect.left + targetRect.width / 2 - containerRect.left;
      const cy = targetRect.top + targetRect.height / 2 - containerRect.top;
      const ndc = new THREE.Vector3(
        (cx / containerRect.width) * 2 - 1,
        -(cy / containerRect.height) * 2 + 1,
        0,
      );
      ndc.unproject(camera);
      targetWorld.copy(ndc);
    };

    const animate = () => {
      const time = clock.getElapsedTime();
      const drift = driftRef.current;
      drift.x = THREE.MathUtils.lerp(drift.x, Math.sin(time * 0.25) * 0.2, 0.03);
      drift.y = THREE.MathUtils.lerp(drift.y, Math.cos(time * 0.22) * 0.2, 0.03);

      fieldGroup.rotation.z = time * 0.08;
      rings[0].rotation.z = time * 0.12;
      rings[1].rotation.z = -time * 0.1;
      rings[2].rotation.z = time * 0.06;

      fieldGroup.position.x = THREE.MathUtils.lerp(
        fieldGroup.position.x,
        pointerRef.current.x + drift.x,
        0.06,
      );
      fieldGroup.position.y = THREE.MathUtils.lerp(
        fieldGroup.position.y,
        -pointerRef.current.y + drift.y,
        0.06,
      );

      updateTarget();
      targetHalo.position.copy(targetWorld);

      const attractStrength = hoverRef.current ? 0.05 : 0.028;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const px = positions[idx];
        const py = positions[idx + 1];
        const dx = targetWorld.x - px;
        const dy = targetWorld.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const force = Math.min(attractStrength / dist, 0.08);

        velocities[idx] += (dx / dist) * force;
        velocities[idx + 1] += (dy / dist) * force;
        velocities[idx] += -dy * 0.002;
        velocities[idx + 1] += dx * 0.002;

        velocities[idx] *= 0.92;
        velocities[idx + 1] *= 0.92;

        positions[idx] += velocities[idx];
        positions[idx + 1] += velocities[idx + 1];

        if (dist < 0.25) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 3 + Math.random() * 1.8;
          positions[idx] = Math.cos(angle) * radius;
          positions[idx + 1] = Math.sin(angle) * radius * 0.6;
          velocities[idx] = (Math.random() - 0.5) * 0.02;
          velocities[idx + 1] = (Math.random() - 0.5) * 0.02;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      for (let i = 0; i < flowCount; i++) {
        const anchor = flowAnchors[i];
        const idx = i * 6;
        const orbitAngle = anchor.angle + time * anchor.speed;
        const sx = Math.cos(orbitAngle) * anchor.radius;
        const sy = Math.sin(orbitAngle) * anchor.radius * 0.55;
        flowPositions[idx] = sx;
        flowPositions[idx + 1] = sy;
        flowPositions[idx + 2] = -0.2;
        flowPositions[idx + 3] = targetWorld.x;
        flowPositions[idx + 4] = targetWorld.y;
        flowPositions[idx + 5] = 0.1;
      }
      flowGeometry.attributes.position.needsUpdate = true;

      const pulse = 1 + Math.sin(time * 3) * (hoverRef.current ? 0.2 : 0.08);
      targetHalo.scale.setScalar(pulse);
      (haloOuter.material as THREE.MeshBasicMaterial).opacity = hoverRef.current ? 0.7 : 0.5;
      (haloInner.material as THREE.MeshBasicMaterial).opacity = hoverRef.current ? 0.85 : 0.65;

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!activeRef.current || prefersReducedMotion) {
        frameRef.current = 0;
        renderer.render(scene, camera);
        return;
      }
      animate();
      frameRef.current = requestAnimationFrame(loop);
    };
    loopRef.current = loop;

    if (!activeRef.current || prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      frameRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("blur", resetPointer);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      points.material.dispose();
      flowGeometry.dispose();
      flowLines.material.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      haloOuter.geometry.dispose();
      haloInner.geometry.dispose();
      (haloOuter.material as THREE.Material).dispose();
      (haloInner.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [targetRef]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(202,254,56,0.18)_0%,_rgba(202,254,56,0.08)_25%,_rgba(0,0,0,0)_60%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.6)_0%,_rgba(0,0,0,0.8)_50%,_rgba(0,0,0,1)_85%)]" />
    </div>
  );
}

export function StickmanCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const isInViewOnce = useInView(ref, { once: true, margin: "-50px" });
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section id="download" ref={ref} className="py-20 md:py-28 bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[160px]"
          style={{
            background: "radial-gradient(circle, rgba(202,254,56,0.05) 0%, transparent 70%)",
            opacity: 0.7,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[0.95]" data-testid="text-download-heading">
            Enter the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] via-[#cafe38] to-[#cafe38]/60">
              Zatch&trade; Ecosystem
            </span>
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInViewOnce ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/30 text-sm md:text-base mt-4 font-display"
          >
            Where live commerce becomes a system.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInViewOnce ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="relative w-full max-w-[900px] h-[360px] md:h-[460px] lg:h-[520px] flex items-end justify-center">
            <EcosystemField active={isInView} targetRef={ctaRef} targetHovered={ctaHovered} />
            <div className="relative z-10 mb-6 flex flex-col items-center gap-3">
              <a
                ref={ctaRef}
                href={PLAYSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                onFocus={() => setCtaHovered(true)}
                onBlur={() => setCtaHovered(false)}
                className="inline-flex items-center justify-center rounded-full bg-[#cafe38] text-black font-bold px-10 h-12 text-sm shadow-[0_0_30px_rgba(202,254,56,0.25)] hover:shadow-[0_0_45px_rgba(202,254,56,0.55)] hover:scale-[1.03] transition-all"
                data-testid="button-download-app"
              >
                Download Zatch&trade;
              </a>
              <p className="text-white/30 text-xs">Available on Android.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInViewOnce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-white/20 text-sm max-w-md mx-auto leading-relaxed mb-6">
            Join India's first live bargain marketplace. Watch sellers go live, negotiate in real-time, and never overpay again.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/15">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cafe38]/30" />
              Free to download
            </span>
            <span className="w-px h-3 bg-white/[0.06]" />
            <span>12,000+ downloads</span>
            <span className="w-px h-3 bg-white/[0.06]" />
            <span>4.8 ★ on Play Store</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
