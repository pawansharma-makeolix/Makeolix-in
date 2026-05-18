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
      "bg-[linear-gradient(135deg,var(--blue-1),var(--blue-2))] text-[#e2eaf4] border border-[rgba(17,138,178,0.4)] shadow-[0_0_20px_rgba(0,80,157,0.35)]",
    outline: "bg-transparent text-white border border-[rgba(255,255,255,1)]",
  };

  const content = (
    <motion.div
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{
        scale: 1.03,
        boxShadow:
          variant === "primary"
            ? "0 0 40px rgba(17,138,178,0.6)"
            : "0 0 20px rgba(255,255,255,0.6)",
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
          className="absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45"
          style={{
            background: "#fff",
            color: "#000",
            boxShadow: "0 0 12px rgba(17,138,178,0.4)",
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
            "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
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

  return <button type={type} onClick={onClick} style={{ background: "none", border: "none", padding: 0 }}>{content}</button>;
}



