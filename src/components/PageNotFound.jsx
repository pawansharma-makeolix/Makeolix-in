import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BOT_MESSAGES = [
  "Hmm, I can't find this page...",
  "Scanning all routes...",
  "This page is under construction!",
  "Our team is building it now.",
];

const BotSVG = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="12" y="18" width="40" height="30" rx="10" fill="var(--blue-1)" />
    <rect x="29" y="8" width="6" height="10" rx="3" fill="var(--blue-1)" />
    <motion.circle
      cx="32" cy="7" r="4" fill="var(--blue-3)"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <rect x="18" y="27" width="10" height="8" rx="4" fill="var(--blue-3)" />
    <rect x="36" y="27" width="10" height="8" rx="4" fill="var(--blue-3)" />
    <motion.circle
      cx="22" cy="31" r="2.5" fill="white" opacity="0.9"
      animate={{ x: [0, 1.5, -1.5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="40" cy="31" r="2.5" fill="white" opacity="0.9"
      animate={{ x: [0, 1.5, -1.5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.rect
      x="22" y="38" width="20" height="4" rx="2" fill="var(--blue-2)" opacity="0.8"
      animate={{ scaleX: [1, 0.7, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <rect x="6" y="24" width="6" height="10" rx="3" fill="var(--blue-1)" />
    <rect x="52" y="24" width="6" height="10" rx="3" fill="var(--blue-1)" />
    <rect x="20" y="48" width="8" height="10" rx="4" fill="var(--blue-1)" />
    <rect x="36" y="48" width="8" height="10" rx="4" fill="var(--blue-1)" />
  </svg>
);

const TERMINAL_ROWS = [
  {
    cmd: "resolve_route(slug)",
    badge: "404",
    badgeClass: "text-red-400 bg-red-500/10 border border-red-500/20",
  },
  {
    cmd: "status",
    badge: "building",
    badgeClass: "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
  },
  {
    cmd: "eta",
    badge: "coming soon",
    badgeClass: "text-green-400 bg-green-500/10 border border-green-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PageNotFound = () => {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let charIndex = 0;
    const current = BOT_MESSAGES[msgIndex];
    setDisplayed("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayed(current.slice(0, charIndex));
      if (charIndex >= current.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % BOT_MESSAGES.length);
        }, 1800);
      }
    }, 48);

    return () => clearInterval(typeInterval);
  }, [msgIndex]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,80,157,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,157,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Orb 1 */}
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "rgba(0,56,99,0.4)",
          filter: "blur(80px)",
          top: "-80px",
          left: "-80px",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Orb 2 */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "rgba(17,138,178,0.18)",
          filter: "blur(70px)",
          bottom: "40px",
          right: "-60px",
        }}
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Orb 3 — pink accent, very subtle */}
      <motion.div
        className="absolute w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "rgba(255,143,171,0.07)",
          filter: "blur(60px)",
          bottom: "160px",
          left: "20%",
        }}
        animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main card */}
      <motion.div
        className="relative z-10 w-full max-w-md rounded-3xl px-8 py-10 text-center"
        style={{
          background: "rgba(5,25,35,0.88)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(0,80,157,0.25)",
          boxShadow: "0 8px 48px rgba(0,56,99,0.28)",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bot section */}
        <motion.div
          className="relative inline-flex items-center justify-center mb-6"
          variants={itemVariants}
        >
          {/* Pulse rings */}
          {[0, 0.65].map((delay, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 90,
                height: 90,
                border: "1.5px solid rgba(17,138,178,0.45)",
              }}
              animate={{ scale: [1, 1.85], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay }}
            />
          ))}

          {/* Bot body */}
          <motion.div
            className="relative z-10 flex items-center justify-center rounded-full"
            style={{
              width: 84,
              height: 84,
              background: "var(--bg-soft)",
              border: "1.5px solid rgba(0,80,157,0.3)",
              overflow: "hidden",
            }}
            animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <BotSVG />

            {/* Scan line */}
            <motion.div
              className="absolute left-3 right-3 rounded-full pointer-events-none z-20"
              style={{
                height: 1.5,
                background: "linear-gradient(90deg, transparent, var(--blue-3), transparent)",
              }}
              animate={{ top: ["12%", "88%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Chat bubble */}
        <motion.div
          className="rounded-2xl p-4 mb-6 text-left"
          style={{
            background: "var(--bg-main)",
            border: "1px solid rgba(0,80,157,0.2)",
            minHeight: 68,
          }}
          variants={itemVariants}
        >
          <div className="flex gap-1.5 mb-2.5">
            <span className="block w-2 h-2 rounded-full bg-green-400" />
            <span className="block w-2 h-2 rounded-full bg-yellow-400" />
            <span className="block w-2 h-2 rounded-full bg-red-400" />
          </div>
          <p
            className="text-sm min-h-5 font-mono"
            style={{ color: "var(--blue-3)" }}
          >
            {displayed}
            {isTyping && (
              <motion.span
                style={{ color: "var(--accent-pink)" }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.75, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className=" mb-3 tracking-tight"
          style={{ color: "var(--blue-3)" }}
          variants={itemVariants}
        >
          Page Not Found
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "var(--text-muted)" }}
          variants={itemVariants}
        >
          This page is under construction or doesn't exist yet.
          <br />
          Our team is working hard to bring it to life.
        </motion.p>

        {/* Terminal */}
        <motion.div
          className="rounded-xl p-4 mb-6 text-left space-y-2.5"
          style={{
            background: "var(--bg-main)",
            border: "1px solid rgba(0,80,157,0.2)",
          }}
          variants={itemVariants}
        >
          {TERMINAL_ROWS.map(({ cmd, badge, badgeClass }, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.15 }}
            >
              <span
                className="font-mono text-xs font-medium"
                style={{ color: "var(--accent-pink)" }}
              >
                $
              </span>
              <span
                className="flex-1 font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {cmd}
              </span>
              <span className={`font-mono text-xs px-2 py-0.5 rounded-md ${badgeClass}`}>
                {badge}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="w-full py-3 rounded-xl text-sm font-medium tracking-wide"
          style={{
            background: "transparent",
            border: "1.5px solid rgba(0,80,157,0.4)",
            color: "var(--blue-3)",
          }}
          variants={itemVariants}
          whileHover={{
            backgroundColor: "var(--blue-2)",
            color: "#ffffff",
            borderColor: "var(--blue-2)",
            scale: 1.02,
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
