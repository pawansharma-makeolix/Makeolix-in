"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const awards = [
  "/Achievement1.png",
  "/Achievement2.jpg",
  "/Achievement3.png",
  "/Achievement4.png",
  "/Achievement5.png",
  "/Achievement6.png",
  "/Achievement7.webp",
];

const Achievements = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % awards.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getPosition = (index) => {
    if (index === active) return "scale-105 opacity-100 z-20 translate-x-0";

    if (index === (active + 1) % awards.length)
      return "translate-x-[110%] scale-90 opacity-70 z-10";

    if (index === (active - 1 + awards.length) % awards.length)
      return "translate-x-[-110%] scale-90 opacity-70 z-10";

    return "scale-75 opacity-0";
  };

  return (
    <section
      className="py-14 overflow-hidden relative"
      style={{
        background: "#00171f",
      }}
    >
      {/* 🔥 Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 px-4" // ✅ reduced gap
      >
        <h2
          className="mb-2"
          style={{ color: "#fff" }}
        >
          Our Achievements & Awards
        </h2>

        <p className="text-white max-w-xl mx-auto  md:text-base">
          Recognized for excellence, innovation, and impactful results across
          industries.
        </p>
      </motion.div>
      
      <div className="relative flex items-center justify-center h-32.5 md:h-50 -mt-3">
        {awards.map((img, index) => (
          <motion.div
            key={index}
            className={`absolute transition-all duration-700 
            w-35 sm:w-42.5 md:w-37.5 
            h-25 sm:h-30 md:h-27.5 
            rounded-xl backdrop-blur-md 
            flex items-center justify-center
            ${getPosition(index)}`}
            style={{
              background: "rgba(255, 225, 255, 0.85)",
              boxShadow:
                index === active
                  ? "0px 15px 30px rgba(17,138,178,0.25)"
                  : "0px 8px 15px rgba(0,0,0,0.2)",
            }}
            whileHover={{
              scale: 1.12,
              rotate: 2,
            }}
          >
            <img
              src={img}
              alt="award"
              className="h-14 sm:h-16 md:h-20 object-contain"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute top-6 left-6 w-28 h-28 bg-[#118ab2]/20 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-36 h-36 bg-[#00509d]/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
};

export default Achievements;
