"use client";

import { TypeAnimation } from "react-type-animation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

const Hero = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: "#051923" },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        push: { quantity: 4 },
        grab: {
          distance: 140,
          links: { opacity: 0.4 },
        },
      },
    },
    particles: {
      number: {
        value: 80,
        density: { enable: true, area: 800 },
      },
      color: { value: ["#ef476f", "#fff", "#118ab2"] },
      links: {
        enable: true,
        distance: 110,
        color: "#ffffff",
        opacity: 0.7,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        outModes: { default: "bounce" },
      },
      size: { value: { min: 4, max: 6 } },
      opacity: { value: 0.7 },
      shape: { type: "circle" },
    },
    detectRetina: true,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">

      {/* ✨ PARTICLES */}
      {init && (
        <Particles
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}
{/* 🤖 AI HAND */}
<motion.img
  src="/aihand-removebg-preview.png"
  alt="AI Hand"
  className="hidden lg:block absolute -right-60 top-1/2 w-75 md:w-100 z-10 pointer-events-none"
  animate={{
    x: -200,
    opacity: 1,
    y: [-100, -80, -100],
  }}
  transition={{
    x: { duration: 3, ease: "easeOut" },
    opacity: { duration: 3 },
    y: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
/>

{/* 🧑 HUMAN HAND */}
<motion.img
  src="/humanhand-removebg-preview.png"
  alt="Human Hand"
  className="hidden lg:block absolute -left-60 top-1/2 w-95 md:w-100 z-10 pointer-events-none"
  initial={{ x: -300, opacity: 0, y: -100 }}
  animate={{
    x: 200,
    opacity: 1,
    y: [-100, -80, -100],
  }}
  transition={{
    x: { duration: 3, ease: "easeOut" },
    opacity: { duration: 3 },
    y: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
/>

      

      {/* ⚡ BLUE SPARK */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 1],
          opacity: [0, 1, 0.8],
        }}
        transition={{
          delay: 2,
          duration: 0.8,
        }}
      >
        <div className="w-16 h-16 bg-blue-400 rounded-full blur-xl opacity-80" />
      </motion.div>

      {/* 🔥 CONTENT */}
      <motion.div
        className="relative z-30 max-w-3xl px-6 text-white"
        animate={{
          y: [0, -10, 0], // 👈 up-down floating
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <h1 className=" leading-tight mb-6">
          We are MAKEOLIX
          <br />
          We are{" "}
          <span className="bg-linear-to-r from-white to-[#118ab2] bg-clip-text text-transparent">
            <TypeAnimation
              sequence={[
                "building brands across the GLOBE",
                2000,
                 "building brands across the GLOBE",
                2000,
                 "building brands across the GLOBE",
                2000,
                 "building brands across the GLOBE",
                2000,
                
              ]}
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h1>

        <p className="text-amber-50 text-lg mb-8">
          We help brands dominate digital with AI-powered strategies.
        </p>

        <div className="flex justify-center gap-4">
          <Button href={"/contact-us"}>Get In Touch</Button>
          <Button variant="outline" href={"/about"}>
            Know More
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;