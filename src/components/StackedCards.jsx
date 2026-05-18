"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SparkleParticles } from "./SparkleParticles";

const cards = [
  {
    id: 0,
    num: "01",
    icon: "/icons/goal.png",
    title: "Your Business Goals Are Our Priority",
    desc: "As a business owner, you want to make sure that your goals are being met and that you are running your business in the most efficient way possible. We provide expert advice and guidance to help you achieve your business goals.",
  },
  {
    id: 1,
    num: "02",
    icon: "/icons/seo (2).png",
    title: "Content & Site Optimization for Better Search Results",
    desc: "The content and site optimization is a comprehensive package that helps you in getting better search results by creating and optimising your website, improving user experience, enhancing brand image and building backlinks.",
  },
  {
    id: 2,
    num: "03",
    icon: "/icons/bullhorn.png",
    title: "Marketing & Advertisement to Support Business Sales",
    desc: "Marketing is an essential part of any business. We create a marketing plan that is tailored to your specific needs and objectives, targeting the right audiences and at the right time.",
  },
  {
    id: 3,
    num: "04",
    icon: "/icons/illustration.png",
    title: "Graphics & Videos to Increase Your Brand Awareness",
    desc: "We believe that quality videos and picture-perfect graphics are the voice of your brand, so we work hard to create impactful visuals for your business.",
  },
];

// ─── Card ─────────────────────────────────────
function ServiceCard({ card, isActive, onClick, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: x * 15,
      y: -y * 12,
    });
  }, []);

  const isFocused = isActive || hovered;

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      initial={{ opacity: 0, y: 80 }}
      animate={{
        opacity: 1,
        y: isFocused ? -25 : 0,
        scale: isFocused ? 1.08 : 0.95,
        rotateX: tilt.y,
        rotateY: tilt.x,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="relative flex-1 min-w-0 rounded-2xl p-6 cursor-pointer border border-[#0b3b5a] bg-linear-to-br from-[#02131c] to-[#00171f] overflow-hidden"
    >
      {/* 🔢 WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[120px] font-bold text-white opacity-[0.06]">
          {card.num}
        </span>
      </div>

      {/* 🌟 glow */}
      {hovered && (
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(17,138,178,0.25),transparent)] opacity-40" />
      )}

      {/* 📦 ICON */}
      <motion.div
        style={{ transform: "translateZ(40px)" }}
        animate={{
          scale: isFocused ? 1.2 : 1,
          rotate: isFocused ? 6 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="w-14 h-14 rounded-xl bg-[#022c43] flex items-center justify-center mb-4 relative z-10"
      >
        <img src={card.icon} alt="icon" className="w-7 h-7 object-contain" />
      </motion.div>

      {/* 📝 CONTENT */}
      <motion.div
        style={{ transform: "translateZ(30px)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className="relative z-10"
      >
        <h3 className="text-white  text-[15px] leading-snug mb-3">
          {card.title}
        </h3>

        <p className="text-[#cbd5e1] text-[13px] leading-relaxed">
          {card.desc}
        </p>
      </motion.div>

      {/* bottom line */}
      <motion.div
        animate={{ width: isFocused ? "100%" : "0%" }}
        className="absolute bottom-0 left-0 h-0.5 bg-[#118ab2]"
      />
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────
export default function StackedCards() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#00171f] px-4 py-20 overflow-hidden">
      {/* particles */}
      <SparkleParticles className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[.3em] text-[#118ab2] block mb-2">
            OUR SERVICES
          </span>
          <h2 className=" text-white">
            What We Do <span className="text-[#118ab2]">For You</span>
          </h2>
        </motion.div>

        {/* cards */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 perspective-distant">
          {cards.map((c, i) => (
            <ServiceCard
              key={c.id}
              card={c}
              index={i}
              isActive={i === active}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
