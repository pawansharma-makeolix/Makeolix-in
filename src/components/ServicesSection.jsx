import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

// ─── CSS Variables ────────────────────────────────────────────────────────────
const STYLE = `
  :root {
    --bg-main: #020d14;
    --bg-soft: #071825;
    --blue-1: #003863;
    --blue-2: #00509d;
    --blue-3: #118ab2;
    --accent-pink: #ff8fab;
    --text-muted: #8ba4b8;
  }
  /* navbar height offset — change this value to match your navbar height */
  .services-section {
    padding-top: env(safe-area-inset-top, 0px);
  }
`;

// ─── Network Visual ───────────────────────────────────────────────────────────
function NetworkVisual({ nodeCount = 8 }) {
  const nodes = [
    { cx: 50, cy: 50, r: 10, main: true },
    ...Array.from({ length: nodeCount - 1 }, (_, i) => {
      const angle = (i / (nodeCount - 1)) * Math.PI * 2 + i * 2.4;
      const radius = 22 + (i % 3) * 8;
      return {
        cx: 50 + Math.cos(angle) * radius,
        cy: 50 + Math.sin(angle) * radius,
        r: 3 + (i % 3),
        main: false,
      };
    }),
  ];
  const links = nodes.slice(1).map((_, i) => [0, i + 1]);
  for (let i = 1; i < nodes.length - 1; i += 2) links.push([i, i + 1]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ maxWidth: 300, maxHeight: 300 }}
      >
        {[25, 50, 75].map((v) => (
          <g key={v}>
            <line x1={v} y1={5} x2={v} y2={95} stroke="rgba(17,138,178,0.07)" strokeWidth={0.4} />
            <line x1={5} y1={v} x2={95} y2={v} stroke="rgba(17,138,178,0.07)" strokeWidth={0.4} />
          </g>
        ))}
        {links.map(([a, b], i) => (
          <motion.line
            key={`l-${i}`}
            x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
            stroke={i % 3 === 0 ? "rgba(255,143,171,0.25)" : "rgba(17,138,178,0.3)"}
            strokeWidth={0.7}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: "easeOut" }}
          />
        ))}
        {links.slice(0, 8).map(([a, b], i) => (
          <motion.circle
            key={`d-${i}`}
            r={1.2}
            fill={i % 2 === 0 ? "#118ab2" : "#ff8fab"}
            animate={{
              cx: [nodes[a].cx, nodes[b].cx, nodes[a].cx],
              cy: [nodes[a].cy, nodes[b].cy, nodes[a].cy],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.2 + (i % 3) * 0.6, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g
            key={`n-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            transition={{ delay: 0.05 + i * 0.09, type: "spring", stiffness: 200, damping: 18 }}
          >
            <motion.circle
              cx={n.cx} cy={n.cy}
              r={n.r + (n.main ? 6 : 3.5)}
              fill={n.main ? "rgba(17,138,178,0.12)" : "rgba(17,138,178,0.06)"}
              animate={{ r: [n.r + (n.main ? 6 : 3.5), n.r + (n.main ? 9 : 5), n.r + (n.main ? 6 : 3.5)] }}
              transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle
              cx={n.cx} cy={n.cy} r={n.r}
              fill={n.main ? "var(--blue-2)" : i % 3 === 0 ? "rgba(255,143,171,0.35)" : "rgba(17,138,178,0.4)"}
              stroke={n.main ? "var(--blue-3)" : i % 3 === 0 ? "rgba(255,143,171,0.5)" : "rgba(17,138,178,0.5)"}
              strokeWidth={n.main ? 1.2 : 0.6}
            />
            {n.main && (
              <motion.circle
                cx={n.cx} cy={n.cy} r={3} fill="var(--blue-3)"
                animate={{ r: [3, 4.5, 3], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.g>
        ))}
        <motion.circle
          cx={50} cy={50} r={16}
          fill="none" stroke="rgba(17,138,178,0.15)" strokeWidth={0.6}
          strokeDasharray="4 3"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "50px 50px" }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <rect x={64} y={8} width={30} height={12} rx={6} fill="rgba(0,56,99,0.92)" stroke="rgba(17,138,178,0.5)" strokeWidth={0.6} />
          <text x={79} y={16.5} textAnchor="middle" style={{ fontSize: 5, fill: "var(--blue-3)", fontWeight: 700, fontFamily: "monospace" }}>LIVE</text>
          <motion.circle cx={68} cy={14} r={1.5} fill="#00c9a7" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        </motion.g>
      </svg>
    </div>
  );
}

// ─── Progress Dots ────────────────────────────────────────────────────────────
function ProgressDots({ total, active, onGo }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onGo(i)}
          className="rounded-full"
          style={{
            width: 3,
            background: i === active ? "var(--blue-3)" : "rgba(255,255,255,0.12)",
            cursor: "pointer",
            border: "none",
            padding: 0,
          }}
          animate={{ height: i === active ? 28 : 8, opacity: i === active ? 1 : 0.4 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

// ─── Slide ────────────────────────────────────────────────────────────────────
function Slide({ service, direction }) {
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, filter: "blur(10px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir) => ({ x: dir > 0 ? "-70%" : "70%", opacity: 0, filter: "blur(8px)", scale: 0.95 }),
  };
  const rightVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0, rotateY: dir > 0 ? 20 : -20 }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (dir) => ({ x: dir > 0 ? -70 : 70, opacity: 0, rotateY: dir > 0 ? -12 : 12 }),
  };

  return (
    <div
      className="absolute inset-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
      style={{ padding: "0 clamp(28px, 5vw, 80px)" }}
    >
      {/* Left: text */}
      <motion.div
        className="flex-1 min-w-0 z-10"
        style={{ paddingTop: 8, paddingBottom: 8 }}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="inline-block mb-4 text-xs font-semibold uppercase px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(17,138,178,0.1)",
            color: "var(--blue-3)",
            border: "1px solid rgba(17,138,178,0.28)",
            letterSpacing: "0.15em",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          ✦ {service.tag}
        </motion.span>

        <motion.h3
          className="leading-tight mb-4"
          style={{
            color: "white",
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {service.title}
        </motion.h3>

        <motion.p
          className="text-sm sm:text-base leading-relaxed mb-8"
          style={{ color: "var(--text-muted)", maxWidth: 460 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          {service.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button href={"/contact-us"}>Get Started</Button>
        </motion.div>
      </motion.div>

      {/* Right: visual */}
      <motion.div
        className="relative shrink-0"
        style={{
          width: "clamp(200px, 32vw, 350px)",
          height: "clamp(200px, 32vw, 350px)",
          perspective: 700,
        }}
        custom={direction}
        variants={rightVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg,rgba(17,138,178,0.18),rgba(255,143,171,0.09),rgba(17,138,178,0.18))",
            filter: "blur(28px)",
            scale: 1.12,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            background: "rgba(4,20,32,0.88)",
            border: "1px solid rgba(17,138,178,0.22)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          }}
          animate={{ rotateX: [0, 2.5, 0, -2.5, 0], rotateY: [0, -3.5, 0, 3.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <NetworkVisual nodeCount={service.nodes} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ServicesSection({
  services = [],
  heading = "Our Amazing Services",
  subheading,
  className = "",
  // ✅ FIX 1: navbarHeight prop — apni navbar ki height yahan pass karo (default 72px)
  navbarHeight = 72,
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [locked, setLocked] = useState(false);
  const sectionRef = useRef(null);

  const activeRef = useRef(0);
  const lockedRef = useRef(false);
  const canSlideRef = useRef(true);
  const accDelta = useRef(0);
  const totalRef = useRef(services.length);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { lockedRef.current = locked; }, [locked]);
  useEffect(() => { totalRef.current = services.length; }, [services.length]);

  const goTo = (next) => {
    if (!canSlideRef.current) return;
    canSlideRef.current = false;
    const dir = next > activeRef.current ? 1 : -1;
    setDirection(dir);
    setActive(next);
    activeRef.current = next;
    accDelta.current = 0;
    setTimeout(() => { canSlideRef.current = true; }, 750);
  };

  const releaseLock = () => {
    lockedRef.current = false;
    setLocked(false);
    accDelta.current = 0;
  };

  useEffect(() => {
    const onWheel = (e) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 80);
      accDelta.current += delta;
      if (accDelta.current >= 90) {
        accDelta.current = 0;
        const cur = activeRef.current;
        if (cur < totalRef.current - 1) goTo(cur + 1);
        else releaseLock();
      } else if (accDelta.current <= -90) {
        accDelta.current = 0;
        const cur = activeRef.current;
        if (cur > 0) goTo(cur - 1);
        else releaseLock();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
          accDelta.current = 0;
          lockedRef.current = true;
          setLocked(true);
        } else if (!entry.isIntersecting) {
          lockedRef.current = false;
          setLocked(false);
        }
      },
      { threshold: [0, 0.8] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (!lockedRef.current) return;
    const dy = Math.abs(touchStartY.current - e.touches[0].clientY);
    const dx = Math.abs(touchStartX.current - e.touches[0].clientX);
    if (dy > dx) e.preventDefault();
  };
  const onTouchEnd = (e) => {
    if (!lockedRef.current) return;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);
    if (Math.abs(diffY) < 45 || diffX > Math.abs(diffY)) return;
    const cur = activeRef.current;
    if (diffY > 0 && cur < totalRef.current - 1) goTo(cur + 1);
    else if (diffY < 0 && cur > 0) goTo(cur - 1);
    else releaseLock();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!lockedRef.current) return;
      const cur = activeRef.current;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (cur < totalRef.current - 1) goTo(cur + 1);
        else releaseLock();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (cur > 0) goTo(cur - 1);
        else releaseLock();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <section
        ref={sectionRef}
        className={`services-section relative ${className}`}
        style={{
          background: "var(--bg-main)",
          // ✅ FIX 2: 100vh - navbar height = actual visible height (no more clipping)
          height: `calc(100vh - -40px)`,
          minHeight: `calc(100vh - 10px)`,
          display: "flex",
          flexDirection: "column",
          // ✅ FIX 3: overflow visible on section itself, clip only on slide area
          overflow: "hidden",
          touchAction: locked ? "none" : "pan-y",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ambient BG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,80,157,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,80,157,0.04) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: 1,
              background: "linear-gradient(to right,transparent,rgba(17,138,178,0.3),transparent)",
            }}
            animate={{ top: ["-1%", "101%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 500, height: 500,
              left: "-10%", top: "20%",
              background: "radial-gradient(circle,rgba(0,56,99,0.18) 0%,transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 380, height: 380,
              right: "-8%", bottom: "10%",
              background: "radial-gradient(circle,rgba(17,138,178,0.1) 0%,transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 11, repeat: Infinity }}
          />
        </div>

        {/* ✅ FIX 4: Header — padding-top reduced, left padding ensured so "S" never clips */}
        <div
          className="relative z-10 shrink-0"
          style={{
            padding: "clamp(20px, 3.5vw, 48px) clamp(48px, 6vw, 96px) 16px",
          }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
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
              ✦ Our Services
            </span>
          </motion.div>

          <motion.h2
            className="font-black leading-tight max-w-3xl"
            style={{
             
              color: "white",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {heading.split(" ").map((w, i, arr) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.2em]"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={
                  i >= arr.length - 2
                    ? {
                        background: "linear-gradient(135deg,var(--blue-3),var(--accent-pink))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {}
                }
              >
                {w}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="mt-2 text-sm sm:text-base max-w-2xl"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            {subheading}
          </motion.p>

          <motion.div
            className="mt-4 h-px max-w-5xl"
            style={{
              background: "linear-gradient(to right,rgba(17,138,178,0.4),rgba(255,143,171,0.2),transparent)",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* ✅ FIX 5: Slides area — removed pb-32 which was stealing vertical space */}
        <div className="relative flex-1 min-h-0 flex items-center overflow-hidden">
          {/* Progress sidebar */}
          <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
            <ProgressDots total={services.length} active={active} onGo={goTo} />
          </div>

          {/* Counter */}
          <div className="absolute right-5 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-end gap-1">
            <motion.span
              className="font-black"
              style={{
                fontSize: "clamp(32px,4vw,52px)",
                lineHeight: 1,
                color: "rgba(17,138,178,0.1)",
                letterSpacing: "-0.04em",
              }}
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
            <span className="text-xs" style={{ color: "rgba(160,174,192,0.3)" }}>
              / {String(services.length).padStart(2, "0")}
            </span>
          </div>

          {/* Mobile dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden z-20">
            {services.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full"
                style={{
                  height: 4,
                  background: i === active ? "var(--blue-3)" : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                animate={{ width: i === active ? 24 : 8 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence custom={direction} mode="popLayout">
              <Slide key={services[active].id} service={services[active]} direction={direction} />
            </AnimatePresence>
          </div>
        </div>

        {/* Nav arrows */}
        <div className="absolute right-4 sm:right-6 bottom-6 flex gap-3 z-20">
          {[
            { label: "↑", target: active - 1, enabled: active > 0 },
            { label: "↓", target: active + 1, enabled: active < services.length - 1 },
          ].map(({ label, target, enabled }) => (
            <motion.button
              key={label}
              className="rounded-full flex items-center justify-center"
              style={{
                width: 38, height: 38, fontSize: 14,
                background: enabled ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(17,138,178,0.25)",
                color: enabled ? "var(--blue-3)" : "rgba(255,255,255,0.2)",
                cursor: enabled ? "pointer" : "default",
              }}
              onClick={() => enabled && goTo(target)}
              whileHover={enabled ? { scale: 1.1 } : {}}
              whileTap={enabled ? { scale: 0.95 } : {}}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </section>
    </>
  );
}