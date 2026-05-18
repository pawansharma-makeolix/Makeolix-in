import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

// ─── Utility: parse number + suffix from string like "5,000+" or "87%" ───────
function parseStatValue(raw) {
  const cleaned = raw.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  if (!match) return { start: 0, end: 0, suffix: raw };
  return {
    start: 0,
    end: parseFloat(match[1]),
    suffix: match[2] || "",
    original: raw,
  };
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix, duration = 2.2, delay = 0 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const startTime = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTime.current) startTime.current = timestamp;
        const elapsed = timestamp - startTime.current;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.floor(eased * value));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(value);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value, duration, delay]);

  const formatted = display.toLocaleString("en-US");

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

// ─── Floating Orb Background ─────────────────────────────────────────────────
function FloatingOrb({ style, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{
        y: [-18, 18, -18],
        x: [-8, 8, -8],
        scale: [1, 1.08, 1],
        opacity: [0.18, 0.32, 0.18],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Glowing Border Card ─────────────────────────────────────────────────────
function StatCard({ stat, index, delay }) {
  const { end, suffix } = parseStatValue(stat.value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 48, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.035,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className="relative group cursor-default"
    >
      {/* Glow layer */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, var(--blue-3) 0%, var(--accent-pink) 100%)",
          filter: "blur(1px)",
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl p-6 h-full flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #051923 0%, #00171f 100%)",
          border: "1px solid rgba(17,138,178,0.25)",
          boxShadow:
            "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at top right, var(--blue-3), transparent 70%)",
          }}
        />

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
          style={{
            background: "rgba(17,138,178,0.12)",
            border: "1px solid rgba(17,138,178,0.2)",
          }}
        >
          {stat.icon}
        </div>

        {/* Number */}
        <div
          className="text-4xl font-bold mb-1 leading-none"
          style={{
            background:
              "linear-gradient(135deg, #e0f4ff 0%, var(--blue-3) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <AnimatedCounter
            value={end}
            suffix={suffix}
            duration={2.0}
            delay={delay + 0.1}
          />
        </div>

        {/* Label */}
        <p
          className="text-sm font-medium leading-snug mt-2"
          style={{ color: "var(--text-muted)" }}
        >
          {stat.label}
        </p>

        {/* Bottom shimmer bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--blue-3), var(--accent-pink))",
          }}
          initial={{ width: "0%" }}
          animate={inView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.1, delay: delay + 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const DEFAULT_HEADING = "Impressive SEO Reseller Results – By the Numbers";
const DEFAULT_SUBTEXT = "Our results-driven approach speaks volumes:";
const DEFAULT_STATS = [
  { value: "5,000+", label: "Sites Audited", icon: "🔍" },
  { value: "87%",    label: "of Keywords Rank on Google Page 1", icon: "📈" },
  { value: "6,700%", label: "Average ROI Growth", icon: "💰" },
  { value: "1,200%", label: "Increase in Organic Traffic", icon: "🚀" },
  { value: "350+",   label: "Websites Delivered", icon: "🌐" },
  { value: "1,000,000+", label: "Monthly Page Views", icon: "👁️" },
];

export default function SEOStatsSection({
  heading = DEFAULT_HEADING,
  subtext = DEFAULT_SUBTEXT,
  stats = DEFAULT_STATS,
}) {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  // Split heading for word-by-word animation
  const words = heading.split(" ");

  return (
    <section
      className="relative w-full overflow-hidden py-20 px-4 sm:px-8"
      style={{ background: "var(--bg-main)" }}
    >
      {/* ── Background Orbs ── */}
      <FloatingOrb
        delay={0}
        style={{
          width: 480,
          height: 480,
          top: "-120px",
          left: "-80px",
          background:
            "radial-gradient(circle, rgba(0,80,157,0.35) 0%, transparent 70%)",
        }}
      />
      <FloatingOrb
        delay={3}
        style={{
          width: 360,
          height: 360,
          bottom: "-80px",
          right: "-60px",
          background:
            "radial-gradient(circle, rgba(17,138,178,0.25) 0%, transparent 70%)",
        }}
      />
      <FloatingOrb
        delay={1.5}
        style={{
          width: 240,
          height: 240,
          top: "40%",
          left: "50%",
          background:
            "radial-gradient(circle, rgba(255,143,171,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Grid noise texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17,138,178,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,138,178,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(17,138,178,0.12)",
              border: "1px solid rgba(17,138,178,0.25)",
              color: "var(--blue-3)",
              letterSpacing: "0.14em",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--blue-3)" }}
            />
            Proven Results
          </span>
        </motion.div>

        {/* Heading — word-by-word reveal */}
        <div ref={headingRef} className="text-center mb-4 px-2">
          <h2
            className=" leading-tight "
            style={{ color: "#e8f4ff" }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                animate={
                  headingInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.55, ease: "easeOut" }}
          className="text-center text-base sm:text-lg mb-14"
          style={{ color: "var(--text-muted)" }}
        >
          {subtext}
        </motion.p>

        {/* Divider line with glow */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="mx-auto mb-14 h-px w-32 rounded-full origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--blue-3), var(--accent-pink), transparent)",
          }}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              index={i}
              delay={0.08 * i}
            />
          ))}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.0 }}
          className="flex justify-center mt-14"
        >
          <span
            className="text-xs tracking-wide"
            style={{ color: "rgba(160,174,192,0.5)" }}
          >
            Data updated monthly · Trusted by 350+ partners worldwide
          </span>
        </motion.div>
      </div>
    </section>
  );
}