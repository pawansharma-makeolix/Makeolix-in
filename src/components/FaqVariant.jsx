import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Default FAQ Data ─────────────────────────────────────────────────────────
const defaultBg = "var(--bg-soft)";

// ─── Floating Particle ────────────────────────────────────────────────────────
function Particle({ x, y, size, duration, delay, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        filter: "blur(1px)",
      }}
      animate={{
        y: [0, -18, 0],
        opacity: [0.15, 0.45, 0.15],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Number Badge ─────────────────────────────────────────────────────────────
function NumberBadge({ num, isOpen }) {
  return (
    <motion.div
      className="relative shrink-0 flex items-center justify-center rounded-full font-bold text-sm select-none"
      style={{
        width: 40,
        height: 40,
        border: isOpen
          ? "1.5px solid var(--blue-3)"
          : "1.5px solid rgba(17,138,178,0.2)",
        background: isOpen
          ? "rgba(17,138,178,0.15)"
          : "rgba(17,138,178,0.04)",
        color: isOpen ? "var(--blue-3)" : "var(--text-muted)",
        transition: "all 0.35s ease",
        zIndex: 1,
      }}
      animate={{ scale: isOpen ? 1.08 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {String(num).padStart(2, "0")}
      {isOpen && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "1.5px solid var(--blue-3)", opacity: 0.4 }}
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

// ─── Plus / Minus Icon ────────────────────────────────────────────────────────
function ToggleIcon({ isOpen }) {
  return (
    <motion.div
      className="shrink-0 relative flex items-center justify-center rounded-full"
      style={{
        width: 34,
        height: 34,
        background: isOpen
          ? "var(--blue-3)"
          : "rgba(255,255,255,0.04)",
        border: isOpen
          ? "1px solid var(--blue-3)"
          : "1px solid rgba(255,255,255,0.1)",
        transition: "background 0.3s ease, border 0.3s ease",
      }}
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <span
        style={{
          fontSize: 18,
          lineHeight: 1,
          color: isOpen ? "#fff" : "var(--text-muted)",
          fontWeight: 300,
          userSelect: "none",
          transition: "color 0.3s ease",
        }}
      >
        +
      </span>
    </motion.div>
  );
}

// ─── Single FAQ Item ──────────────────────────────────────────────────────────
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden"
      style={{
        borderRadius: 16,
        border: isOpen
          ? "1px solid rgba(17,138,178,0.35)"
          : "1px solid rgba(255,255,255,0.06)",
        background: isOpen
          ? "linear-gradient(135deg, rgba(7,24,37,0.98), rgba(4,16,26,0.98))"
          : "rgba(5,25,35,0.6)",
        backdropFilter: "blur(12px)",
        transition: "border 0.35s ease, background 0.35s ease",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      {/* Glow bar left */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: 3,
          borderRadius: "16px 0 0 16px",
          background: "linear-gradient(to bottom, var(--blue-3), var(--accent-pink))",
          originY: 0,
        }}
        animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Shimmer on open */}
      {isOpen && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(17,138,178,0.04) 50%, transparent 60%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.6, delay: 0.1, ease: "easeInOut" }}
        />
      )}

      {/* Header row */}
      <div className="flex items-center gap-4 px-5 py-4">
        <NumberBadge num={index + 1} isOpen={isOpen} />

        <motion.p
          className="flex-1 text-sm sm:text-base font-medium leading-snug"
          style={{
            color: isOpen ? "#fff" : "rgba(255,255,255,0.78)",
            transition: "color 0.3s ease",
          }}
        >
          {faq.question}
        </motion.p>

        <ToggleIcon isOpen={isOpen} />
      </div>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              className="px-5 pb-5"
              style={{ paddingLeft: "calc(40px + 1rem + 20px)" }}
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div
                className="h-px mb-4"
                style={{
                  background:
                    "linear-gradient(to right, rgba(17,138,178,0.25), transparent)",
                }}
              />
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function FaqVariant({
  faqs = [],
  heading = "Frequently Asked Questions",
  subheading = "Everything you need to know — answered clearly.",
  tag = "FAQs",
  bgcolor,
}) {
 const [openId, setOpenId] = useState(faqs[0]?.id || null);

  const particles = [
    { x: 5,  y: 15, size: 4,  duration: 5,   delay: 0,    color: "rgba(17,138,178,0.5)"  },
    { x: 90, y: 10, size: 3,  duration: 6,   delay: 1,    color: "rgba(255,143,171,0.45)" },
    { x: 15, y: 75, size: 5,  duration: 7,   delay: 0.5,  color: "rgba(0,80,157,0.45)"   },
    { x: 80, y: 80, size: 3,  duration: 5.5, delay: 2,    color: "rgba(17,138,178,0.4)"  },
    { x: 50, y: 5,  size: 2,  duration: 8,   delay: 1.5,  color: "rgba(255,143,171,0.3)" },
    { x: 95, y: 50, size: 4,  duration: 6.5, delay: 0.8,  color: "rgba(0,56,99,0.6)"     },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: bgcolor || defaultBg,
        padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)",
      }}
    >
      

      {/* Ambient blobs */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          left: "-15%",
          top: "10%",
          background:
            "radial-gradient(circle, rgba(0,56,99,0.2) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 400,
          height: 400,
          right: "-10%",
          bottom: "5%",
          background:
            "radial-gradient(circle, rgba(255,143,171,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(17,138,178,0.2), transparent)",
        }}
        animate={{ top: ["-1%", "101%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span
              className="text-xs font-semibold uppercase px-4 py-1.5 rounded-full tracking-widest"
              style={{
                background: "rgba(17,138,178,0.1)",
                color: "var(--blue-3)",
                border: "1px solid rgba(17,138,178,0.25)",
              }}
            >
              ✦ {tag}
            </span>
          </motion.div>

          <motion.h2
            className=" leading-tight mb-3"
            style={{
              
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {heading.split(" ").map((w, i, arr) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.22em]"
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.15 + i * 0.045,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={
                  i >= arr.length - 1
                    ? {
                        background:
                          "linear-gradient(135deg, var(--blue-3), var(--accent-pink))",
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
            className="text-sm sm:text-base"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
          >
            {subheading}
          </motion.p>

          <motion.div
            className="mx-auto mt-5"
            style={{
              height: 1,
              maxWidth: 420,
              background:
                "linear-gradient(to right, transparent, rgba(17,138,178,0.4), rgba(255,143,171,0.2), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              index={i}
              isOpen={openId === faq.id}
              onToggle={() =>
                setOpenId(openId === faq.id ? null : faq.id)
              }
            />
          ))}
        </div>

        {/* Bottom counter */}
        
      </div>
    </section>
  );
}

// ─── Usage Example ────────────────────────────────────────────────────────────
// <FAQSection />                          ← uses default content
//
// <FAQSection
//   heading="Got Questions?"
//   subheading="We have answers for you."
//   tag="Help"
//   faqs={[
//     { id: 1, question: "...", answer: "..." },
//     { id: 2, question: "...", answer: "..." },
//   ]}
// />