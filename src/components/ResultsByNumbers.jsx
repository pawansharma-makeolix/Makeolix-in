import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";

// ----------------------------------------------------------------------
// 1. Animated Counter (reusable logic for each number)
// ----------------------------------------------------------------------
const AnimatedCounter = ({ target, suffix = "", prefix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  // Format large numbers (1,000,000 → 1M)
  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(0) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K"; // optional decimal
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

// ----------------------------------------------------------------------
// 2. Single stat card
// ----------------------------------------------------------------------
const StatCard = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group relative rounded-2xl bg-[var(--bg-soft)] border border-[var(--blue-2)]/20 p-8 shadow-lg shadow-black/20 
                 hover:shadow-xl hover:shadow-[var(--blue-3)]/20 transition-shadow duration-300"
    >
      {/* subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--blue-3)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-3">
        <span className="text-5xl sm:text-6xl font-bold tracking-tight text-[var(--blue-3)] drop-shadow-md">
          <AnimatedCounter
            target={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            duration={2}
          />
        </span>
        <span className="text-sm md:text-base text-[var(--text-muted)] max-w-[200px] leading-relaxed">
          {stat.label}
        </span>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 3. Main Component (reusable via props)
// ----------------------------------------------------------------------
const ResultsByNumbers = ({
  heading = "Impressive SEO Reseller Results – By the Numbers",
  subheading = "Our results-driven approach speaks volumes:",
  stats = [
    { label: "Sites Audited", value: 5000, suffix: "+" },
    { label: "of Keywords Rank on Google Page 1", value: 87, suffix: "%" },
    { label: "Average ROI Growth", value: 6700, suffix: "%" },
    { label: "Increase in Organic Traffic", value: 1200, suffix: "%" },
    { label: "Websites Delivered", value: 350, suffix: "+" },
    { label: "Monthly Page Views", value: 1000000, suffix: "+" },
  ],
}) => {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--blue-1)]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--accent-pink)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading & subtext with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-[var(--blue-3)] leading-tight drop-shadow-lg">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            {subheading}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsByNumbers;