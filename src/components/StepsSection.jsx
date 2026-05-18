import { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// ─── Particle burst on open ───────────────────────────────────────────────────

function Burst({ active }) {
  const DOTS = Array.from({ length: 10 }, (_, i) => ({
    angle: (i / 10) * 360,
    dist: 42 + Math.random() * 28,
    size: 3 + Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {DOTS.map((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        return (
          <AnimatePresence key={i}>
            {active && (
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: d.size, height: d.size,
                  top: "50%", left: "50%",
                  background: i % 2 === 0 ? "var(--blue-3)" : "var(--accent-pink)",
                  marginLeft: -d.size / 2, marginTop: -d.size / 2,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(rad) * d.dist,
                  y: Math.sin(rad) * d.dist,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.02 }}
              />
            )}
          </AnimatePresence>
        );
      })}
    </div>
  );
}

// ─── SVG liquid fill arc ──────────────────────────────────────────────────────

function LiquidArc({ progress }) {
  const R = 22, CX = 26, CY = 26, STROKE = 4;
  const circ = 2 * Math.PI * R;
  return (
    <svg width={52} height={52} viewBox="0 0 52 52" style={{ position: "absolute", inset: 0 }}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(17,138,178,0.12)" strokeWidth={STROKE} />
      <motion.circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - progress) }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--blue-3)" />
          <stop offset="100%" stopColor="var(--accent-pink)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Counter that counts up ───────────────────────────────────────────────────

function Counter({ value, run }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!run) { setDisplay(0); return; }
    let start = 0;
    const total = 600;
    const step = 16;
    const inc = value / (total / step);
    const id = setInterval(() => {
      start += inc;
      if (start >= value) { setDisplay(value); clearInterval(id); }
      else setDisplay(Math.round(start));
    }, step);
    return () => clearInterval(id);
  }, [run, value]);
  return <span>{String(display).padStart(2, "0")}</span>;
}

// ─── Single Step Card ─────────────────────────────────────────────────────────

function StepCard({ step, index, total, globalActive, onActivate, animatedIcons = [] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isActive = globalActive === index;
  const [burst, setBurst] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spx = useSpring(mx, { stiffness: 180, damping: 22 });
  const spy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotX = useTransform(spy, [0, 1], [8, -8]);
  const rotY = useTransform(spx, [0, 1], [-8, 8]);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onMouseLeave = () => { mx.set(0.5); my.set(0.5); };

  const handleClick = () => {
    onActivate(index);
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  };

  const glowX = useTransform(spx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(spy, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          background: isActive ? "var(--bg-soft)" : "rgba(5,25,35,0.7)",
          border: isActive
            ? "1px solid rgba(17,138,178,0.55)"
            : "1px solid rgba(17,138,178,0.13)",
          boxShadow: isActive
            ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(17,138,178,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 4px 20px rgba(0,0,0,0.3)",
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.3s, background 0.3s, border-color 0.3s",
        }}
        onClick={handleClick}
        onMouseMove={onMouseMove}
        onMouseEnter={() => onActivate(index)}
        onMouseLeave={onMouseLeave}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Cursor-tracked inner glow */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: 220, height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(17,138,178,0.18) 0%, transparent 70%)",
            left: glowX,
            top: glowY,
            transform: "translate(-50%,-50%)",
            opacity: isActive ? 1 : 0.4,
          }}
        />

        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, var(--blue-3), var(--accent-pink), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <Burst active={burst} />

        <div className="relative p-6" style={{ zIndex: 1 }}>
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            {/* Arc + number */}
            <div className="relative" style={{ width: 52, height: 52, flexShrink: 0 }}>
              <LiquidArc progress={isActive ? 1 : (index + 1) / total * 0.3} />
              <div
                className="absolute inset-0 flex items-center justify-center font-black"
                style={{ fontSize: 15, color: isActive ? "var(--blue-3)" : "rgba(160,174,192,0.5)" }}
              >
                <Counter value={step.number} run={inView} />
              </div>
            </div>

            {/* Tag pill */}
            <motion.span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: isActive ? "rgba(17,138,178,0.15)" : "rgba(17,138,178,0.06)",
                color: isActive ? "var(--blue-3)" : "rgba(160,174,192,0.4)",
                border: `1px solid ${isActive ? "rgba(17,138,178,0.35)" : "rgba(17,138,178,0.1)"}`,
                letterSpacing: "0.14em",
                transition: "all 0.3s",
              }}
            >
              {step.tag}
            </motion.span>
          </div>

          {/* Icon */}
          <motion.div
            className="mb-4"
            style={{ color: isActive ? "var(--blue-3)" : "rgba(160,174,192,0.35)" }}
            animate={isActive ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              viewBox="0 0 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width={28}
              height={28}
            >
              <rect x="3" y="3" width="9" height="9" rx="2" />
              <rect x="16" y="3" width="9" height="9" rx="2" />
              <rect x="3" y="16" width="9" height="9" rx="2" />
              <rect x="16" y="16" width="9" height="9" rx="2" />
            </svg>
          </motion.div>

          {/* Title */}
          <h3
            className="font-bold leading-snug mb-2"
            style={{
              color: isActive ? "white" : "rgba(255,255,255,0.45)",
              transition: "color 0.3s",
            }}
          >
            {step.title}
          </h3>

          {/* Body — slides open when active */}
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.body}
                </motion.p>

                {Array.isArray(step.animatedIcons) && step.animatedIcons.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.08, duration: 0.28 }}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {step.animatedIcons.map((item, ai) => (
                      <motion.div
                        key={ai}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: ai * 0.06,
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ y: -2, scale: 1.03 }}
                        style={{
                          background: "rgba(17,138,178,0.08)",
                          border: "1px solid rgba(17,138,178,0.18)",
                          color: "var(--text-muted)",
                        }}
                      >
                        <motion.span
                          animate={{
                            scale: [0.7, 1.15, 1],
                            rotate: [-8, 8, 0],
                            opacity: [0, 1],
                          }}
                          transition={{
                            duration: 0.45,
                            delay: ai * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            color: "var(--blue-3)",
                            display: "inline-flex",
                            lineHeight: 0,
                          }}
                        >
                          <Check size={14} strokeWidth={3} />
                        </motion.span>

                        <span className="text-xs sm:text-sm leading-none">
                          {typeof item === "string" ? item : item.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom strip */}
          <div className="mt-5 flex items-center justify-between">
            {/* Mini progress dots */}
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, di) => (
                <motion.div
                  key={di}
                  className="rounded-full"
                  style={{ height: 3 }}
                  animate={{
                    width: di === index ? 20 : 6,
                    background: di <= index
                      ? (di === index ? "var(--blue-3)" : "rgba(17,138,178,0.4)")
                      : "rgba(160,174,192,0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>

            {/* Expand hint */}
            <motion.div
              style={{ color: "rgba(160,174,192,0.3)", fontSize: 10, letterSpacing: "0.08em" }}
              animate={{ opacity: isActive ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              hover to expand
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Background: drifting grid + scanline ─────────────────────────────────────

function Background() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { left: "-5%", top: "10%", color: "rgba(0,80,157,0.12)" },
        { right: "-5%", top: "40%", color: "rgba(17,138,178,0.09)" },
        { left: "20%", bottom: "5%", color: "rgba(255,143,171,0.06)" },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 380, height: 380,
            background: `radial-gradient(circle, ${s.color} 0%, transparent 70%)`,
            filter: "blur(50px)",
            ...s,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i }}
        />
      ))}
    </div>
  );
}

// ─── Animated header ──────────────────────────────────────────────────────────

function Header({ eyebrow, heading, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = heading.split(" ");

  return (
    <div ref={ref} className="text-center mb-6 sm:mb-20">
      <motion.div
        className="inline-flex items-center gap-2 mb-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(17,138,178,0.1)",
            color: "var(--blue-3)",
            border: "1px solid rgba(17,138,178,0.25)",
            letterSpacing: "0.14em",
          }}
        >
          ✦ {eyebrow}
        </span>
      </motion.div>

      <h2
        className="tracking-tight leading-tight mb-5"
        style={{ color: "white" }}
      >
        {words.map((w, wi) => (
          <motion.span
            key={wi}
            className="inline-block mr-[0.2em]"
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.1 + wi * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "white" }}
          >
            {w}
          </motion.span>
        ))}
      </h2>

      <motion.p
        className="text-base sm:text-lg max-w-6xl mx-auto leading-relaxed"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * @param {{ steps, eyebrow, heading, subtitle, className }} props
 */
export default function StepsSection({
  steps = [],
  eyebrow = "How it works",
  heading = "Five steps to remember everything",
  subtitle,
  animatedIcons = [],
  className = "",
  columns = "",
  perRow = null,
}) {
  const [active, setActive] = useState(0);

  // ─── RESPONSIVE FIX ───────────────────────────────────────────────────────
  // Mobile (< 640px)  → always 1 column
  // Tablet (640–1023) → 2 columns
  // Desktop (≥ 1024)  → perRow prop > columns prop > auto-fit
  const gridStyle = perRow
    ? {
        // Manual perRow: respect it on large screens, collapse on small
        gridTemplateColumns: `repeat(1, 1fr)`,
      }
    : columns
    ? { gridTemplateColumns: `repeat(1, 1fr)` }
    : { gridTemplateColumns: `repeat(1, 1fr)` };

  // We use CSS classes for breakpoints via inline style override at sm/md/lg
  // Because Tailwind JIT classes can't use dynamic values, we use a style tag trick
  const gridId = "steps-grid";

  return (
    <section
      className={`relative py-12 sm:py-16 overflow-hidden ${className}`}
      style={{ background: "var(--bg-main)" }}
    >
      {/* Inline responsive override */}
      <style>{`
        #${gridId} {
          grid-template-columns: repeat(1, 1fr);
        }
        @media (min-width: 640px) {
          #${gridId} {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          #${gridId} {
            grid-template-columns: ${
              perRow
                ? `repeat(${perRow}, 1fr)`
                : columns
                ? `repeat(${columns}, 1fr)`
                : "repeat(auto-fit, minmax(min(100%, 200px), 1fr))"
            };
          }
        }
      `}</style>

      <Background />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <Header eyebrow={eyebrow} heading={heading} subtitle={subtitle} />

        <div id={gridId} className="grid gap-4 sm:gap-5">
          {steps.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              index={i}
              total={steps.length}
              globalActive={active}
              onActivate={setActive}
              animatedIcons={animatedIcons}
            />
          ))}
        </div>
      </div>
    </section>
  );
}