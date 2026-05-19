"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon = true,
  type = "button",
  className = "",
}) {
  const base =
    "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group overflow-hidden transition-all duration-500 cursor-pointer flex items-center";

  const variants = {
    primary:
      "text-white border border-[var(--variable-3)] shadow-[0_10px_30px_rgba(0,80,157,0.18)]",

    outline:
      "bg-white text-[var(--text-main)] border border-[var(--text-secondary)]",
  };

  const content = (
    <motion.div
      className={`${base} ${variants[variant]} ${className}`}
      style={
        variant === "primary"
          ? {
              background:
                "linear-gradient(135deg, var(--variable-1), var(--variable-2))",
            }
          : {}
      }
      whileHover={{
        scale: 1.03,
        boxShadow:
          variant === "primary"
            ? "0 12px 35px rgba(17,138,178,0.28)"
            : "0 8px 24px rgba(0,80,157,0.15)",
      }}
      whileTap={{ scale: 0.96 }}
    >
      {/* TEXT */}
      <span className="relative z-10 transition-all duration-500 group-hover:translate-x-7">
        {children}
      </span>

      {/* ICON SLIDER */}
      {icon && (
        <div
          className="
            absolute
            right-1
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition-all
            duration-500
            group-hover:right-[calc(100%-44px)]
            group-hover:rotate-45
          "
          style={{
            background:
              variant === "outline"
                ? "var(--variable-1)"
                : "var(--bg-main)",

            color:
              variant === "outline"
                ? "var(--bg-soft)"
                : "var(--variable-2)",

            boxShadow: "0 4px 14px rgba(0,80,157,0.18)",
          }}
        >
          <ArrowUpRight size={16} />
        </div>
      )}

      {/* SHINE EFFECT */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
        }}
        animate={{ x: ["-120%", "200%"] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
      }}
    >
      {content}
    </button>
  );
}