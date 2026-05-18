"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// ─── PLACEHOLDER ICON SLOTS ────────────────────────────────────────────────
// Replace each `label` with your own <img> or icon component later.
// orbit 1 → innermost ring (fastest)
// orbit 2 → middle ring
// orbit 3 → outermost ring (slowest)

const orbitConfig = [
  {
    id: 1,
    radius: 160, // px from center
    duration: 14, // seconds per full rotation
    icons: [
      { id: "i1", label: "A" },
      { id: "i2", label: "B" },
      { id: "i3", label: "C" },
      { id: "i4", label: "D" },
    ],
  },
  {
    id: 2,
    radius: 260,
    duration: 22,
    icons: [
      { id: "i5", label: "E" },
      { id: "i6", label: "F" },
      { id: "i7", label: "G" },
      { id: "i8", label: "H" },
      { id: "i9", label: "I" },
      { id: "i10", label: "J" },
    ],
  },
  {
    id: 3,
    radius: 370,
    duration: 32,
    icons: [
      { id: "i11", label: "K" },
      { id: "i12", label: "L" },
      { id: "i13", label: "M" },
      { id: "i14", label: "N" },
      { id: "i15", label: "O" },
      { id: "i16", label: "P" },
      { id: "i17", label: "Q" },
    ],
  },
];

// ─── SINGLE ORBIT RING ─────────────────────────────────────────────────────
function OrbitRing({ radius, duration, icons, delay = 0 }) {
  const angleStep = (2 * Math.PI) / icons.length;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: radius * 2,
        height: radius * 2,
        border: "1px dashed rgba(0,80,157,0.35)",
        top: "50%",
        left: "50%",
        marginTop: -radius,
        marginLeft: -radius,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 360,
        transition: {
          opacity: { duration: 0.8, delay },
          scale: { duration: 0.8, delay },
          rotate: { duration, repeat: Infinity, ease: "linear", delay: 0 },
        },
      }}
    >
      {icons.map((icon, idx) => {
        const angle = angleStep * idx;
        const x = radius + radius * Math.cos(angle) - 20; // 20 = half icon size
        const y = radius + radius * Math.sin(angle) - 20;

        return (
          <motion.div
            key={icon.id}
            className="absolute flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              left: x,
              top: y,
              /* Counter-rotate so icons stay upright */
              animation: `counter-spin-${duration} ${duration}s linear infinite`,
            }}
            /* Framer counter-rotation */
            animate={{ rotate: -360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
          >
            {/* ── PLACEHOLDER ── replace this div with your icon/img ── */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold select-none"
              style={{
                background: "rgba(0,56,99,0.55)",
                border: "1px solid rgba(0,80,157,0.5)",
                color: "#a0aec0",
                backdropFilter: "blur(6px)",
                boxShadow:
                  "0 0 12px rgba(0,80,157,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {icon.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── GLOWING CENTER DOT ───────────────────────────────────────────────────
function CenterPulse() {
  return (
    <div
      className="absolute"
      style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
    >
      {/* outer ring pulse */}
      <motion.div
        className="rounded-full absolute"
        style={{
          width: 80,
          height: 80,
          top: "50%",
          left: "50%",
          marginTop: -40,
          marginLeft: -40,
          border: "1px solid rgba(17,138,178,0.4)",
        }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* inner glow */}
      <motion.div
        className="rounded-full absolute"
        style={{
          width: 48,
          height: 48,
          top: "50%",
          left: "50%",
          marginTop: -24,
          marginLeft: -24,
          background:
            "radial-gradient(circle, rgba(17,138,178,0.6) 0%, rgba(0,80,157,0.3) 60%, transparent 100%)",
          boxShadow: "0 0 30px rgba(17,138,178,0.5)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* core dot */}
      <div
        className="rounded-full absolute"
        style={{
          width: 16,
          height: 16,
          top: "50%",
          left: "50%",
          marginTop: -8,
          marginLeft: -8,
          background: "#118ab2",
          boxShadow: "0 0 16px #118ab2, 0 0 40px rgba(17,138,178,0.4)",
        }}
      />
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────
export default function HeroOrbit() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-main, #00171f)" }}
    >
      {/* ── subtle noise/grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,80,157,0.12) 0%, transparent 70%),
            linear-gradient(rgba(0,56,99,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,56,99,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* ── ORBITS (behind everything) ── */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {orbitConfig.map((orbit, i) => (
          <OrbitRing
            key={orbit.id}
            radius={orbit.radius}
            duration={orbit.duration}
            icons={orbit.icons}
            delay={0.4 + i * 0.15}
          />
        ))}
        <CenterPulse />
      </div>

      {/* ── CONTENT (above orbits) ── */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate={controls}
      >
        {/* eyebrow badge */}
        <motion.div variants={fadeUp}>
          <span
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,80,157,0.18)",
              border: "1px solid rgba(0,80,157,0.4)",
              color: "#118ab2",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#118ab2" }}
            />
            Your Tagline Here
          </span>
        </motion.div>

        {/* heading */}
        <motion.h1
          variants={fadeUp}
          className="leading-[1.08] mb-6"
          style={{ color: "#e2eaf4" }}
        >
          Your{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #118ab2 0%, #00509d 50%, #ff8fab 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Headline
          </span>{" "}
          Goes Here
        </motion.h1>

        {/* paragraph */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          style={{ color: "var(--text-muted, #a0aec0)" }}
        >
          Apna description yahan daal do — chhota aur impactful rakho. Ek do
          line kaafi hoti hai hero section ke liye.
        </motion.p>

        {/* CTA button */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          <motion.button
            className="relative px-8 py-3.5 rounded-full text-sm font-semibold overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #003863 0%, #00509d 100%)",
              color: "#e2eaf4",
              border: "1px solid rgba(17,138,178,0.4)",
              boxShadow:
                "0 0 24px rgba(0,80,157,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 0 36px rgba(17,138,178,0.55), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* shimmer sweep */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10">Get Started →</span>
          </motion.button>

          <motion.button
            className="px-8 py-3.5 rounded-full text-sm font-semibold"
            style={{
              background: "transparent",
              color: "#a0aec0",
              border: "1px solid rgba(0,80,157,0.3)",
            }}
            whileHover={{
              color: "#e2eaf4",
              borderColor: "rgba(17,138,178,0.6)",
              background: "rgba(0,56,99,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── bottom fade vignette ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-30"
        style={{
          background:
            "linear-gradient(to top, var(--bg-main, #00171f) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
