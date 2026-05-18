"use client";

import { motion } from "framer-motion";

export default function AnimatedFeatureCard({
  icon,
  title,
  description,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover="hover"
      className={`group relative w-full overflow-hidden rounded-[28px] border border-white/8 bg-[var(--bg-soft)] p-6 sm:p-7 md:p-8 ${className}`}
      style={{
        boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* animated glow */}
      <motion.div
        variants={{ hover: { scale: 1.15, rotate: 12, opacity: 0.95 } }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(17,138,178,0.45) 0%, transparent 70%)",
        }}
      />

      {/* secondary animated orb */}
      <motion.div
        animate={{ x: [0, 10, -8, 0], y: [0, -8, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,143,171,0.18) 0%, transparent 70%)",
        }}
      />

      {/* animated border overlay */}
      <motion.div
        className="absolute inset-0 rounded-[28px]"
        style={{
          background:
            "linear-gradient(130deg, transparent 0%, rgba(17,138,178,0.18) 35%, transparent 70%, rgba(255,143,171,0.16) 100%)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      />

      <div className="relative z-10">
        {/* icon wrapper */}
        <motion.div
          variants={{ hover: { y: -4, rotate: [0, -4, 4, 0] } }}
          transition={{ duration: 0.55 }}
          className="relative mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl"
          style={{
            background: "linear-gradient(135deg, var(--blue-2), var(--blue-3))",
            boxShadow: "0 12px 28px rgba(17,138,178,0.28)",
          }}
        >
          {/* pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.28, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-3xl border"
            style={{ borderColor: "rgba(17,138,178,0.45)" }}
          />

          {/* floating icon */}
          <motion.img
            src={icon}
            alt={title}
            animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 h-8 w-8 sm:h-10 sm:w-10 object-contain"
          />
        </motion.div>

        {/* title */}
        <motion.h3
          variants={{ hover: { x: 4 } }}
          transition={{ duration: 0.35 }}
          className="mb-3  leading-tight text-white"
        >
          {title}
        </motion.h3>

        {/* description */}
        <p
          className="text-sm sm:text-base leading-7"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>

        {/* animated bottom line */}
        <motion.div
          variants={{ hover: { width: "100%" } }}
          initial={{ width: "48px" }}
          transition={{ duration: 0.45 }}
          className="mt-6 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--blue-3), var(--accent-pink))",
          }}
        />
      </div>
    </motion.div>
  );
}