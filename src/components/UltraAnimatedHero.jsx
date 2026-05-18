"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import CustomCursor from "../components/CustomCursor";
import Button from "./Button";

export default function UltraAnimatedHero({
  heading = "Grow Your Business with Powerful SEO",
  paragraph = "We help brands dominate search rankings, drive traffic, and convert visitors into customers.",
  primaryBtn = { label: "Get Started", link: "/contact-us" },
  secondaryBtn = { label: "About Us", link: "/about" },
  images = [
    { src: "dallas.jpg" },
    { src: "houston.jpg" },
    { src: "jacksonville.jpg" },
    { src: "chicago.jpg" },
    { src: "boston2.jpg" },
    { src: "miami.jpg" },
    { src: "philadelphia.jpg" },
    { src: "phoenix.jpg" },
    { src: "san antanio.jpg" },
    { src: "seattle.jpg" },
    { src: "indianapolis.jpg" },
  ],
}) {
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  // duplicate images (IMPORTANT)
  const duplicated = [...images, ...images, ...images];

  useEffect(() => {
    let controls;

    const startAnimation = () => {
      const width = containerRef.current?.scrollWidth / 2;

      controls = animate(x, [0, -width], {
        ease: "linear",
        duration: 40, // 🔥 speed control
        repeat: Infinity,
      });
    };

    startAnimation();

    return () => controls?.stop();
  }, [x]);

  return (
    <>
      <CustomCursor />

      <section className="relative min-h-screen pt-30 flex items-center justify-center overflow-hidden bg-(--bg-main) px-6">

        {/* ─── SLIDER ───────────────── */}
<div className="absolute inset-0 pt-30 flex items-center z-0 overflow-hidden">
          <motion.div
            ref={containerRef}
            style={{ x }}
            className="absolute left-0 flex gap-8 w-max"
            onMouseEnter={() => x.stop()} // 🛑 pause
            onMouseLeave={() => {
              const width = containerRef.current?.scrollWidth / 2;
              animate(x, [x.get(), -width], {
                ease: "linear",
                duration: 40,
                repeat: Infinity,
              });
            }}
          >
            {duplicated.map((item, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{
                  transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`,
                }}
              >
                <div className="w-44 h-64 sm:w-52 sm:h-72 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md">
                  <img
                    src={
                      item?.src ||
                      "https://placehold.co/400x600/003863/FFFFFF?text=Image"
                    }
                    className="w-full h-full object-cover transition duration-500 hover:scale-110"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── OVERLAY ───────────────── */}
        <div className="absolute inset-0 bg-linear-to-b from-(--bg-main)/30 via-(--bg-main)/50 to-(--bg-main)/80 z-10 pointer-events-none" />

        {/* ─── CONTENT ───────────────── */}
        <div className="relative z-20 text-center max-w-5xl">

          {/* Heading */}
          <motion.h1
            className=" text-white leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {heading}
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="mt-6 text-white text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {paragraph}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 justify-center mt-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a href={primaryBtn.link}>
              <Button>{primaryBtn.label}</Button>
            </a>

            <a href={secondaryBtn.link}>
              <Button variant="outline">{secondaryBtn.label}</Button>
            </a>
          </motion.div>

        </div>
      </section>
    </>
  );
}