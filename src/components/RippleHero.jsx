"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "./Button";

// ─── Ripple Canvas Background ───────────────────────────────────────────────
function RippleBackground({
  rippleColor = "rgba(17,138,178,0.25)",
  rippleCount = 18,
  rippleSpeed = 0.4,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ripples = [];
    let animId;
    let W, H;

    class Ripple {
      reset() {
        W = canvas.width;
        H = canvas.height;
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.radius = 0;
        this.maxRadius = Math.random() * 180 + 60;
        this.speed = Math.random() * rippleSpeed + 0.15;
      }
      constructor() {
        this.reset();
      }
      update() {
        this.radius += this.speed;
        if (this.radius > this.maxRadius) this.reset();
      }
      draw() {
        const alpha = (1 - this.radius / this.maxRadius) * 0.35;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rippleColor.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    const setup = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      ripples = Array.from({ length: rippleCount }, () => new Ripple());
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      ripples.forEach((r) => {
        r.update();
        r.draw();
      });
      animId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(animId);
    };
  }, [rippleColor, rippleCount, rippleSpeed]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
  );
}

// ─── Floating Orb Decorations ────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 520,
          height: 520,
          top: "-160px",
          left: "-180px",
          background:
            "radial-gradient(circle, rgba(17,138,178,0.13) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          bottom: "-120px",
          right: "-100px",
          background:
            "radial-gradient(circle, rgba(0,80,157,0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          top: "38%",
          right: "12%",
          background:
            "radial-gradient(circle, rgba(17,138,178,0.10) 0%, transparent 70%)",
        }}
        animate={{ y: [0, -18, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}

// ─── Heading with word-by-word animation ─────────────────────────────────────
function AnimatedHeading({ text }) {
  const words = text.split(" ");
  return (
    <h1
      className=" leading-tight tracking-tight"
      style={{
        color: "#e2eaf4",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.22em]"
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: 0.3 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              i % 3 === 0
                ? "linear-gradient(135deg, #e2eaf4 30%, var(--blue-1))"
                : i % 3 === 1
                  ? "#e2eaf4"
                  : "linear-gradient(135deg, var(--blue-1), var(--blue-2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
export default function RippleHero({
  heading = "Build Something That Actually Matters",
  paragraph = "We craft digital experiences that push boundaries and redefine what's possible — from concept to launch, with precision and passion at every step.",
  primaryLabel = "Get Started",
  primaryHref = "/start",
  secondaryLabel = "Learn More",
  secondaryHref = "/about",
}) {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden px-5 "
      style={{
        background: "var(--bg-dark, #04101c)",
        minHeight: "clamp(43rem, 70svh, 100svh)",
        paddingTop: "clamp(3.5rem, 10vw, 7rem)",
        paddingBottom: "clamp(3rem, 8vw, 5rem)",
      }}
    >
      {/* Layered backgrounds */}
      <FloatingOrbs />
      <RippleBackground
        rippleColor="rgba(17,138,178,0.3)"
        rippleCount={20}
        rippleSpeed={0.45}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full text-center flex flex-col items-center">
        {/* Heading */}
        <AnimatedHeading text={heading} />

        {/* Paragraph */}
        <motion.p
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
          style={{ color: "rgba(226,234,244,0.58)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7, ease: "easeOut" }}
        >
          {paragraph}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-7 sm:mt-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <Button href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline">
            {secondaryLabel}
          </Button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(4,16,28,0.85))",
        }}
      />
    </section>
  );
}
