"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const VIDEO_SRC = "/MakeOlix-Home-Page-Intro-Video.mp4";

const BG = "#f6f7fb";
const TEXT = "#0f172a";
const MUTED = "#5b6475";
const BLUE = "#2563eb";
const BORDER = "rgba(37,99,235,0.14)";

const DIRS = [
  { x: -300, y: -120, r: -15 },
  { x: 260, y: -150, r: 12 },
  { x: -280, y: 80, r: -10 },
  { x: 300, y: 100, r: 14 },
  { x: -220, y: 180, r: -8 },
];

// ─────────────────────────────────────────
// THREE.JS PARTICLE CANVAS (from WovenLightHero)
// ─────────────────────────────────────────

const WovenCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    // Light mode ke liye bright colors
    const isDarkMode =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = new THREE.Color();
      // ImmersiveHero ke blue theme se match karne ke liye hue range tweak ki
      color.setHSL(0.55 + Math.random() * 0.15, 0.85, isDarkMode ? 0.5 : 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.55,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animFrameId;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
        const originalPos = new THREE.Vector3(
          originalPositions[ix],
          originalPositions[iy],
          originalPositions[iz]
        );
        const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          const direction = new THREE.Vector3()
            .subVectors(currentPos, mouseWorld)
            .normalize();
          velocity.add(direction.multiplyScalar(force));
        }

        const returnForce = new THREE.Vector3()
          .subVectors(originalPos, currentPos)
          .multiplyScalar(0.001);
        velocity.add(returnForce);

        velocity.multiplyScalar(0.95);

        positions[ix] += velocity.x;
        positions[iy] += velocity.y;
        positions[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// ─────────────────────────────────────────
// WORD ANIMATION
// ─────────────────────────────────────────

function Word({ text, index, delay, accent }) {
  const d = DIRS[index % DIRS.length];

  return (
    <motion.span
      initial={{ opacity: 0, x: d.x, y: d.y, rotate: d.r }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: "clamp(40px,6vw,115px)",
        lineHeight: 0.9,
        letterSpacing: "0.04em",
        color: accent ? BLUE : TEXT,
      }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}

// ─────────────────────────────────────────
// USP ITEM
// ─────────────────────────────────────────

function UspItem({ title, desc }) {
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(!active)}
      className="cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: BLUE,
            boxShadow: "0 0 18px rgba(37,99,235,0.4)",
          }}
        />
        <h3
          style={{
            color: TEXT,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h3>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: active ? "auto" : 0,
          opacity: active ? 1 : 0,
          marginTop: active ? 12 : 0,
        }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
        <p
          style={{
            color: MUTED,
            lineHeight: 1.8,
            fontSize: 14,
            maxWidth: 220,
          }}
        >
          {desc}
        </p>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────

export default function ImmersiveHero() {
  const wrapperRef = useRef(null);
  const chipRef = useRef(null);
  const floatRef = useRef(null);
  const slotRef = useRef(null);

  useEffect(() => {
    const floatEl = floatRef.current;
    if (!floatEl) return;

    let pending = false;

    const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
    const lerp = (a, b, t) => a + (b - a) * t;
    const lerpRect = (a, b, t) => ({
      left: lerp(a.left, b.left, t),
      top: lerp(a.top, b.top, t),
      width: lerp(a.width, b.width, t),
      height: lerp(a.height, b.height, t),
    });

    const setRect = (r, br) => {
      floatEl.style.left = r.left + "px";
      floatEl.style.top = r.top + "px";
      floatEl.style.width = r.width + "px";
      floatEl.style.height = r.height + "px";
      floatEl.style.borderRadius = br + "px";
    };

    const update = () => {
      pending = false;
      const chipEl = chipRef.current;
      const slotEl = slotRef.current;
      const wrapEl = wrapperRef.current;
      if (!chipEl || !slotEl || !wrapEl) return;

      const wrapRect = wrapEl.getBoundingClientRect();
      const scrolled = -wrapRect.top;
      const maxScroll = wrapEl.scrollHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, scrolled / maxScroll));

      const c = chipEl.getBoundingClientRect();
      const s = slotEl.getBoundingClientRect();

      const chipR = { left: c.left, top: c.top, width: c.width, height: c.height };
      const fullR = {
        left: window.innerWidth * 0.04,
        top: window.innerHeight * 0.08,
        width: window.innerWidth * 0.92,
        height:
          window.innerWidth < 768
            ? window.innerHeight * 0.32
            : window.innerWidth * 0.5,
      };
      const slotR = { left: s.left, top: s.top, width: s.width, height: s.height };

      if (scrolled <= 0) {
        setRect(chipR, 14);
        floatEl.style.opacity = "0";
        return;
      }

      floatEl.style.opacity = "1";

      const P1 = 0.35;
      const P2 = 0.58;

      if (prog < P1) {
        const t = ease(prog / P1);
        setRect(lerpRect(chipR, fullR, t), 28 - t * 28);
      } else if (prog < P2) {
        setRect(fullR, 0);
      } else {
        const t = ease((prog - P2) / (1 - P2));
        setRect(lerpRect(fullR, slotR, t), 24);
      }
    };

    const onScroll = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    setTimeout(update, 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        html, body, #root {
          background: ${BG};
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>

      {/* HERO */}
      <div ref={wrapperRef} style={{ height: "180vh", background: BG }}>
        <section
          className="sticky top-0 overflow-hidden"
          style={{ height: "100svh", background: BG }}
        >
          {/* ── WOVEN PARTICLE BACKGROUND ── */}
          <WovenCanvas />

          {/* Subtle radial overlay on top of particles */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              background:
                "radial-gradient(circle at center, rgba(246,247,251,0.45) 0%, rgba(246,247,251,0.75) 100%)",
            }}
          />

          {/* CONTENT — above canvas */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-5 pb-16 pt-24 md:pt-20">

            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5 md:mb-7"
            >
              <div
                className="px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: `1px solid ${BORDER}`,
                  backdropFilter: "blur(10px)",
                }}
              />
            </motion.div>

            {/* HEADING */}
            <div className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4 gap-y-1 text-center max-w-[1500px]">
              <Word text="WE" index={0} delay={0.2} />
              <Word text="CRAFT" index={1} delay={0.36} accent />

              {/* VIDEO CHIP */}
              <div
                ref={chipRef}
                className="overflow-hidden shrink-0"
                style={{
                  width: "clamp(80px,8vw,128px)",
                  aspectRatio: "16/9",
                  borderRadius: 14,
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 10px 40px rgba(37,99,235,0.14)",
                }}
              >
                <video
                  src={VIDEO_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <Word text="BRANDS" index={2} delay={0.52} />
              <Word text="THAT" index={3} delay={0.68} />
              <Word text="MOVE" index={4} delay={0.84} accent />
            </div>

            {/* PARA */}
            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="mx-auto text-center px-2"
              style={{
                color: MUTED,
                maxWidth: 700,
                lineHeight: 1.9,
                fontSize: "clamp(14px,1.4vw,17px)",
                marginTop: 22,
              }}
            >
              We build immersive digital experiences for ambitious brands through
              cinematic motion, strategic storytelling, and premium web design.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.35 }}
              className="flex flex-wrap justify-center gap-4"
              style={{ marginTop: 28, paddingBottom: 20 }}
            >
              <button
                className="transition-all duration-300 hover:scale-105"
                style={{
                  padding: "15px 34px",
                  borderRadius: 999,
                  background: BLUE,
                  color: "#fff",
                  fontWeight: 700,
                  border: "none",
                  boxShadow: "0 18px 45px rgba(37,99,235,0.22)",
                }}
              >
                View Projects
              </button>

              <button
                className="transition-all duration-300 hover:scale-105"
                style={{
                  padding: "15px 34px",
                  borderRadius: 999,
                  border: `1px solid ${BORDER}`,
                  background: "rgba(255,255,255,0.7)",
                  color: TEXT,
                  fontWeight: 600,
                  backdropFilter: "blur(10px)",
                }}
              >
                Start a Project
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* USP SECTION */}
      <section style={{ background: BG, paddingTop: 0, paddingBottom: 90 }}>
        <div className="max-w-4xl mx-auto px-5">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
            style={{
              color: TEXT,
              fontSize: "clamp(34px,5vw,72px)",
              lineHeight: 1,
              fontWeight: 500,
              letterSpacing: "-0.05em",
              marginBottom: 50,
            }}
          >
            Built for modern brands
          </motion.h2>

          <div className="grid lg:grid-cols-[220px_minmax(0,760px)_220px] gap-10 lg:gap-8 items-center">

            {/* LEFT */}
            <div className="flex flex-col gap-10 order-2 lg:order-1 items-start lg:items-end text-left lg:text-right">
              <UspItem
                title="Strategy"
                desc="Every decision is guided through brand positioning and audience psychology."
              />
              <UspItem
                title="Motion"
                desc="Fluid interactions that feel cinematic and emotionally engaging."
              />
              <UspItem
                title="Experience"
                desc="Interfaces designed to feel intuitive, immersive, and memorable."
              />
            </div>

            {/* CENTER VIDEO */}
            <motion.div
              ref={slotRef}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative order-1 lg:order-2 mx-auto"
              style={{ width: "100%", maxWidth: 300 }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: -55,
                  borderRadius: "50%",
                  border: "1px dashed rgba(37,99,235,0.10)",
                }}
              />

              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 30px 100px rgba(37,99,235,0.12)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <video
                  src={VIDEO_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* RIGHT */}
            <div className="flex flex-col gap-10 order-3 items-start">
              <UspItem
                title="Systems"
                desc="Scalable foundations built for future growth and consistency."
              />
              <UspItem
                title="Identity"
                desc="Distinct visuals and interactions that strengthen perception."
              />
              <UspItem
                title="Performance"
                desc="Fast-loading experiences optimized across every device."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING VIDEO */}
      <div
        ref={floatRef}
        style={{
          position: "fixed",
          zIndex: 9999,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          border: `1px solid ${BORDER}`,
          boxShadow: "0 30px 120px rgba(37,99,235,0.16)",
          willChange: "left,top,width,height,border-radius",
        }}
      >
        <video
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </>
  );
}