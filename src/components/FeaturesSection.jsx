import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Check } from "lucide-react";

// ─── Floating Particle ────────────────────────────────────────────────────────
function Particle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        // radial-gradient has no Tailwind equivalent — inline zaroori
        background:
          "radial-gradient(circle, rgba(17,138,178,0.6) 0%, transparent 70%)",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 12, -8, 0],
        opacity: [0, 0.7, 0.4, 0],
        scale: [0.8, 1.2, 0.9, 0.8],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
function FeatureIconList({ title, items = [] }) {
  if (!items.length) return null;

  return (
    <div className="rounded-2xl p-5 md:p-6 border border-[rgba(17,138,178,0.16)] bg-[linear-gradient(135deg,rgba(0,23,31,0.88)_0%,rgba(0,56,99,0.28)_100%)] backdrop-blur-[12px]">
      {title && (
        <h4 className="text-white  text-base mb-4 tracking-[-0.02em]">
          {title}
        </h4>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.06,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.span
              animate={{
                scale: [1, 1.18, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.12,
              }}
              className="mt-[2px] text-[var(--blue-3)] shrink-0"
            >
              <Check size={16} strokeWidth={3} />
            </motion.span>

            <span className="text-sm leading-relaxed text-[var(--text-muted,#a0aec0)]">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Magnetic Feature Card ────────────────────────────────────────────────────
function FeatureCard({ card, index, side }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / 12);
    mouseY.set((e.clientY - cy) / 12);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const enterX = side === "left" ? -60 : 60;
  const delay = index * 0.13;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springY, rotateY: springX, perspective: 800 }}
      initial={{ opacity: 0, x: enterX, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025 }}
      className="relative group cursor-default lg:h-full"
    >
      {/* Glow border on hover */}
      <motion.div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,rgba(17,138,178,0.5),rgba(255,143,171,0.2),transparent)]" />

      {/* Card body */}
      <div className="relative rounded-2xl p-6 md:p-7 overflow-hidden bg-[linear-gradient(135deg,rgba(0,23,31,0.9)_0%,rgba(0,56,99,0.35)_100%)] border border-[rgba(17,138,178,0.18)] backdrop-blur-[16px] lg:h-full">
        
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-[linear-gradient(110deg,transparent_30%,rgba(17,138,178,0.07)_50%,transparent_70%)]"
          animate={{ x: ["-120%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />

        {/* Top row: number + icon */}
        <div className="flex items-start justify-between mb-4">
          <motion.span
            className="font-black tracking-tighter leading-none select-none text-[clamp(2rem,3vw,2.8rem)] text-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.2 } : {}}
            transition={{ delay: delay + 0.3, duration: 0.6 }}
          >
            {card.number}
          </motion.span>

          <motion.span
            className="text-xl select-none text-[var(--blue-3)]"
            animate={{ rotate: [0, 10, -6, 0], scale: [1, 1.18, 0.95, 1] }}
            transition={{
              duration: 5 + index * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {card.icon}
          </motion.span>
        </div>

        {/* Title */}
        <motion.h3
          className="leading-tight mb-3 text-white  tracking-[-0.02em]"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: delay + 0.2,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {card.title}
        </motion.h3>

        {/* Body */}
        <motion.p
          className="text-sm leading-relaxed text-[var(--text-muted,#a0aec0)]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay + 0.32, duration: 0.55 }}
        >
          {card.body}
        </motion.p>

        {/* Card icon lists */}
        {card.iconLists?.map((group, i) => (
          <div key={i} className="mt-5">
            <FeatureIconList title={group.title} items={group.items} />
          </div>
        ))}

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[linear-gradient(90deg,var(--blue-3),rgba(255,143,171,0.5),transparent)]"
          initial={{ width: 0 }}
          animate={isInView ? { width: "60%" } : {}}
          transition={{
            delay: delay + 0.5,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Animated Heading ─────────────────────────────────────────────────────────
function AnimatedHeading({ text, highlight = [], className = "", style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const isHighlight = highlight.includes(i);
        return (
          <motion.span
            key={i}
            className={
              isHighlight
                ? "inline-block mr-[0.22em] bg-[linear-gradient(135deg,var(--blue-3)_0%,var(--accent-pink,#ff8fab)_100%)] bg-clip-text text-transparent"
                : "inline-block mr-[0.22em] text-white"
            }
            initial={{ opacity: 0, y: 40, filter: "blur(10px)", rotateX: -30 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }
                : {}
            }
            transition={{
              delay: i * 0.07,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </h2>
  );
}

// ─── Orbiting Ring ────────────────────────────────────────────────────────────
function OrbitRing({ size, duration, reverse = false, opacity = 0.15 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        // dynamic opacity value — inline zaroori (can't build rgba string in Tailwind dynamically)
        border: `1px solid rgba(17,138,178,${opacity})`,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeaturesSection({
  leftCards = [],
  rightCards = [],

  heading = "Everything You Need To Dominate",
  highlight = [5, 6],
  subtext,
  bgcolor,
}) {
  const finalLeft = leftCards.length ? leftCards : LEFT_CARDS;
  const finalRight = rightCards.length ? rightCards : RIGHT_CARDS;
  const [maxCardHeight, setMaxCardHeight] = useState(0);

useEffect(() => {
  const updateHeights = () => {
    const cards = Array.from(document.querySelectorAll(".feature-card"));

    if (!cards.length) return;

    // pehle reset
    cards.forEach((card) => {
      card.style.minHeight = "auto";
    });

    const tallest = Math.max(...cards.map((card) => card.offsetHeight));
    setMaxCardHeight(tallest);
  };

  updateHeights();

  window.addEventListener("resize", updateHeights);

  return () => {
    window.removeEventListener("resize", updateHeights);
  };
}, [finalLeft, finalRight]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const decoY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const decoRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const subtextRef = useRef(null);
  const subtextInView = useInView(subtextRef, { once: true, margin: "-40px" });

  const particles = [
    { x: 5, y: 20, size: 6, delay: 0, duration: 7 },
    { x: 15, y: 70, size: 4, delay: 1.2, duration: 9 },
    { x: 82, y: 15, size: 8, delay: 0.5, duration: 8 },
    { x: 90, y: 65, size: 5, delay: 2, duration: 6 },
    { x: 50, y: 5, size: 5, delay: 1.5, duration: 10 },
    { x: 72, y: 88, size: 4, delay: 0.8, duration: 7 },
    { x: 28, y: 92, size: 6, delay: 2.5, duration: 9 },
    { x: 60, y: 50, size: 3, delay: 3, duration: 11 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-14 md:py-20  bg-[linear-gradient(180deg,var(--bg-main,#00171f)_0%,var(--bg-soft,#051923)_50%,var(--bg-main,#00171f)_100%)]"
    >
      {/* ── Ambient Background Glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left glow */}
        <motion.div
          className="absolute rounded-full w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] -left-[15%] top-[10%] blur-[80px] bg-[radial-gradient(circle,rgba(0,56,99,0.22)_0%,transparent_65%)]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right glow */}
        <motion.div
          className="absolute rounded-full w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] -right-[10%] bottom-[5%] blur-[80px] bg-[radial-gradient(circle,rgba(17,138,178,0.12)_0%,transparent_65%)]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Pink center-top glow */}
        <motion.div
          className="absolute rounded-full w-[300px] h-[300px] top-0 left-1/2 -translate-x-1/2 blur-[60px] bg-[radial-gradient(circle,rgba(255,143,171,0.06)_0%,transparent_70%)]"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Orbiting rings wrapper — parallax scroll */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2"
          style={{ y: decoY }}
        >
          <OrbitRing size={320} duration={28} opacity={0.08} />
          <OrbitRing size={500} duration={42} reverse opacity={0.05} />
          <OrbitRing size={700} duration={60} opacity={0.03} />

          {/* Center dot */}
          <motion.div
            className="absolute rounded-full w-[6px] h-[6px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--blue-3)] shadow-[0_0_20px_rgba(17,138,178,0.8)]"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Diagonal accent line — scroll-driven rotate */}
        <motion.div
          className="absolute pointer-events-none w-px h-[60%] left-1/2 top-[20%] bg-[linear-gradient(180deg,transparent,rgba(17,138,178,0.25),rgba(255,143,171,0.15),transparent)] origin-top"
          style={{ rotate: decoRotate }}
        />
      </div>

      {/* ── Section Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        {/* ── Header Block ── */}
        <div className="text-center mb-16 md:mb-24">
          {/* Main heading */}
          <AnimatedHeading
            text={heading}
            highlight={highlight}
            className="font-regular tracking-tighter leading-[1.05] mb-6 mx-auto text-[clamp(2rem,3.5vw,3.5rem)] max-w-[800px]"
          />

          {/* Animated underline */}
          <motion.div
            className="mx-auto mb-8 h-[2px] max-w-[120px]"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full h-full rounded-[2px] bg-[linear-gradient(90deg,var(--blue-3),var(--accent-pink,#ff8fab))]" />
          </motion.div>

          {/* Subtext paragraph */}
          {subtext && (
            <motion.p
              ref={subtextRef}
              className="text-base md:text-lg leading-relaxed mx-auto text-white max-w-[820px]"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={
                subtextInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {subtext}
            </motion.p>
          )}
        </div>

        {/* ── Two Column Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            {/* Column label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-1"
            >
              <motion.div
                className="h-px flex-1 bg-[linear-gradient(90deg,var(--blue-3),transparent)]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {finalLeft.map((card, i) => (
              <div key={card.id} className="lg:flex-1">
                <FeatureCard card={card} index={i} side="left" />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Column label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-1"
            >
              <motion.div
                className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--blue-3))]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {finalRight.map((card, i) => (
              <div key={card.id} className="lg:flex-1">
                <FeatureCard card={card} index={i} side="right" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}