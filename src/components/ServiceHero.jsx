import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useMemo } from "react";

// ─── Geometric Grid Pattern ──────────────────────────────────────────────────
function GeometricPaths() {
  const gridSize = 40;
  const paths = [];
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 12; y++) {
      if (Math.random() > 0.7) {
        paths.push({
          id: `grid-${x}-${y}`,
          d: `M${x * gridSize},${y * gridSize} L${(x + 1) * gridSize},${y * gridSize} L${(x + 1) * gridSize},${(y + 1) * gridSize} L${x * gridSize},${(y + 1) * gridSize} Z`,
          delay: Math.random() * 5,
        });
      }
    }
  }
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 800 480"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// ─── Flow Paths Pattern ───────────────────────────────────────────────────────
function FlowPaths() {
  const flowPaths = Array.from({ length: 12 }, (_, i) => {
    const amplitude = 50 + i * 10;
    const offset = i * 60;
    return {
      id: `flow-${i}`,
      d: `M-100,${200 + offset} Q200,${200 + offset - amplitude} 500,${200 + offset} T900,${200 + offset}`,
      strokeWidth: 1 + i * 0.3,
      opacity: 0.1 + i * 0.05,
      delay: i * 0.8,
    };
  });
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30"
      viewBox="0 0 800 800"
    >
      {flowPaths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={path.strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 0.8, 0],
            opacity: [0, path.opacity, path.opacity * 0.7, 0],
          }}
          transition={{
            duration: 15,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// ─── Neural Network Pattern ───────────────────────────────────────────────────
function NeuralPaths() {
  const nodes = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 800,
    y: Math.random() * 600,
    id: `node-${i}`,
  }));
  const connections = [];
  nodes.forEach((node, i) => {
    const nearbyNodes = nodes.filter((other, j) => {
      if (i === j) return false;
      const dist = Math.sqrt(
        Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2),
      );
      return dist < 120 && Math.random() > 0.6;
    });
    nearbyNodes.forEach((target) => {
      connections.push({
        id: `conn-${i}-${target.id}`,
        d: `M${node.x},${node.y} L${target.x},${target.y}`,
        delay: Math.random() * 10,
      });
    });
  });
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-15"
      viewBox="0 0 800 600"
    >
      {connections.map((conn) => (
        <motion.path
          key={conn.id}
          d={conn.d}
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 6,
            delay: conn.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1.2, 1], opacity: [0, 0.6, 0.8, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

// ─── Spiral Pattern ───────────────────────────────────────────────────────────
function SpiralPaths() {
  const spirals = Array.from({ length: 8 }, (_, i) => {
    const centerX = 400 + ((i % 4) - 1.5) * 200;
    const centerY = 300 + Math.floor(i / 4 - 0.5) * 200;
    const radius = 80 + i * 15;
    const turns = 3 + i * 0.5;
    let path = `M${centerX + radius},${centerY}`;
    for (let angle = 0; angle <= turns * 360; angle += 5) {
      const radian = (angle * Math.PI) / 180;
      const currentRadius = radius * (1 - angle / (turns * 360));
      path += ` L${centerX + currentRadius * Math.cos(radian)},${centerY + currentRadius * Math.sin(radian)}`;
    }
    return { id: `spiral-${i}`, d: path, delay: i * 1.2 };
  });
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-25"
      viewBox="0 0 800 600"
    >
      {spirals.map((spiral) => (
        <motion.path
          key={spiral.id}
          d={spiral.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0], rotate: [0, 360] }}
          transition={{
            pathLength: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            delay: spiral.delay,
          }}
        />
      ))}
    </svg>
  );
}

// ─── Main ServiceHero Component ───────────────────────────────────────────────
export default function ServiceHero({
  title,
  subtitle,
  primaryCTA = {
    text: "About Us",
    link: "/about",
  },
  secondaryCTA = {
    text: "Contact Us",
    link: "/contact-us",
  },
  pattern = "auto", 
  height = "min-h-[85vh] md:min-h-screen",
}) {
  const patterns = ["spiral", "neural", "flow", "geometric"];

  const [currentPattern, setCurrentPattern] = useState(
    pattern === "auto" ? 0 : patterns.indexOf(pattern),
  );
  const words = title.split(" ");

  useEffect(() => {
    if (pattern !== "auto") return;

    const interval = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [pattern]);

  const renderPattern = () => {
    switch (currentPattern) {
      case 0:
        return <SpiralPaths />;
      case 1:
        return <NeuralPaths />;
      case 2:
        return <FlowPaths />;
      case 3:
        return <GeometricPaths />;
      default:
        return <SpiralPaths />;
    }
  };

  return (
    <div className="relative min-h-[80vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-[#00171f] via-[#051923] to-[#002a3a]">
      {/* ── Animated Background Pattern ── */}
      <div className="absolute inset-0" style={{ color: "var(--blue-3)" }}>
        <motion.div
          key={currentPattern}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {renderPattern()}
        </motion.div>
      </div>

      {/* ── Dark Gradient Overlay ── */}
      <div className="absolute inset-0 bg-linear-to-t from-[#00171f]/75 via-transparent to-[#00171f]/75" />

      {/* ── Glowing orbs ── */}
      <motion.div
        className="absolute w-105 h-105 top-[10%] -left-[8%] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,80,157,0.22) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[320px] h-80 bottom-[5%] -right-[5%] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(17,138,178,0.18) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* ── H1 Heading ── */}
          <h1 className=" font-black mb-4 mt-8 tracking-tighter leading-none">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: wordIndex * 0.15 + letterIndex * 0.05,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.8,
                    }}
                    className="inline-block text-transparent bg-clip-text 
           bg-gradient-to-r from-white via-white to-[rgba(17,138,178,0.65)]
           hover:from-white hover:to-[var(--blue-3)]
           transition-all duration-700 cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* ── Divider line ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
            className="mx-auto mb-6 h-px w-2/5"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--blue-3), transparent)",
            }}
          />

          {/* ── Subtitle Paragraph ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="text-base md:text-xl font-light tracking-wide leading-relaxed max-w-5xl mx-auto mb-10 text-white"
          >
            {subtitle}
          </motion.p>

          {/* ── Two Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.4,
              duration: 0.8,
              type: "spring",
              stiffness: 80,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href={primaryCTA.link} variant="primary">
              {primaryCTA.text}
            </Button>

            <Button href={secondaryCTA.link} variant="outline">
              {secondaryCTA.text}
            </Button>
          </motion.div>

          {/* ── Pattern Label ── */}
        </motion.div>
      </div>

      {/* ── Floating Accent Dots ── */}
      <motion.div
        className="absolute w-3.5 h-3.5 top-[28%] left-[22%] rounded-full blur-sm pointer-events-none bg-[rgba(17,138,178,0.35)]"
        animate={{
          y: [0, -18, 0],
          x: [0, 10, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-5 h-5 top-[72%] right-[30%] rounded-full blur-sm pointer-events-none bg-[rgba(255,143,171,0.2)]"
        animate={{
          y: [0, 14, 0],
          x: [0, -12, 0],
          scale: [1, 0.8, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 top-[55%] left-[8%] rounded-full blur-sm pointer-events-none bg-[rgba(0,80,157,0.5)]"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
