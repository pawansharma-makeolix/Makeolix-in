"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function ParallaxHero({
  bgImage,
  title,
  description,
  features = [],
  subtext,
  lastpara,
  rightSubtext,
  align,
  rightTitle,
  rightFeatures = [],
  rightDescription,
  rightlastpara,
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const isInView = useInView(contentRef, {
    once: true,
    margin: "-80px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.65, 0.35]);

  const isRight = align === "right";
  const isBoth = align === "both";

  const cardVariants = {
  hidden: (dir) => ({
    opacity: 0,
    x: dir === "left" ? -420 : 420,
    y: 22,
    scale: 0.985,
    filter: "blur(6px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
  const featureVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.15 + i * 0.08,
        duration: 0.45,
      },
    }),
  };

  const renderCard = ({
    side = "left",
    heading,
    desc,
    list,
    smallText,
    finalText,
  }) => (
    <motion.div
    
      custom={side}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative group max-w-2xl w-full h-full overflow-hidden rounded-[28px]"
    >
      {/* Glow */}
      <div className="absolute -inset-[1px] rounded-[28px] bg-[linear-gradient(135deg,rgba(17,138,178,0.28),rgba(255,143,171,0.12),transparent)] opacity-80 blur-sm" />

      {/* Main card */}
      <div
        className="relative h-full flex flex-col p-7 md:p-10 rounded-[28px]
        border border-white/10
        bg-[linear-gradient(145deg,rgba(5,25,35,0.88),rgba(0,23,31,0.82))]
        backdrop-blur-xl
        shadow-[0_25px_60px_rgba(0,0,0,0.45)]
        transition-all duration-500
        group-hover:-translate-y-1.5
        group-hover:border-[rgba(17,138,178,0.35)]"
      >
        {/* Decorative glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[rgba(17,138,178,0.14)] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-14 -left-12 w-28 h-28 rounded-full bg-[rgba(255,143,171,0.08)] blur-3xl pointer-events-none" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative text-white  leading-[1.08]"
        >
          {heading}
        </motion.h2>

        {/* Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ delay: 0.28, duration: 0.7 }}
          className="h-[2px] max-w-[220px] bg-gradient-to-r from-[var(--blue-2)] via-[var(--blue-3)] to-transparent my-6 rounded-full"
        />
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="text-white/80 leading-[1.9] text-[15px] md:text-[16px]"
        >
          {desc}
        </motion.p>

        {/* Subtext */}
        {smallText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.32 }}
            className="mt-6 text-sm font-semibold tracking-[0.14em] 
            bg-gradient-to-r from-white via-[var(--accent-pink)] to-white
            bg-clip-text text-transparent"
          >
            {smallText}
          </motion.p>
        )}

        {/* Features */}
        <ul className="mt-6 space-y-3.5">
          {list?.map((item, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={featureVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex items-start gap-3"
            >
              <span className="mt-[3px] shrink-0 w-5 h-5 rounded-full bg-[rgba(17,138,178,0.16)] border border-[rgba(17,138,178,0.22)] flex items-center justify-center">
  <FiCheck className="text-[12px] text-[var(--accent-pink)]" />
</span>
              <span className="text-white/80 leading-[1.7]">{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Final note */}
        {finalText && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="mt-8 pl-4 border-l-[3px] border-[var(--accent-pink)]"
          >
            <p className="text-white font-medium leading-[1.7]">{finalText}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 w-full overflow-hidden min-h-[620px]"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-[1.12]"
        style={{
          backgroundImage: `url('${bgImage}')`,
          y: bgY,
        }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(135deg, rgba(0,8,15,0.88) 0%, rgba(0,15,28,0.68) 40%, rgba(0,23,31,0.35) 100%)",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-[8%] left-[8%] w-52 h-52 rounded-full bg-[rgba(17,138,178,0.10)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[6%] w-44 h-44 rounded-full bg-[rgba(255,143,171,0.06)] blur-3xl pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className={`relative z-10 grid gap-10 px-5 sm:px-7 md:px-14 lg:px-20 items-stretch
        ${isBoth ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}
        ${isRight ? "justify-items-end" : "justify-items-start"}`}
      >
        {!isRight &&
          renderCard({
            side: "left",
            heading: title,
            desc: description,
            list: features,
            smallText: subtext,
            finalText: lastpara,
          })}

        {(isBoth || isRight) &&
          renderCard({
            side: "right",
            heading: rightTitle,
            desc: rightDescription,
            list: rightFeatures,
            smallText: rightSubtext,
            finalText: rightlastpara,
          })}
      </div>
    </section>
  );
}