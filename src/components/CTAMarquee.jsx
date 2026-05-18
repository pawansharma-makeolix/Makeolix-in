"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useState } from "react";
import Button from "../components/Button";
import FooterBlob from "../components/FooterBlob";

const items = [
  "Web Design",
  "Web Development",
  "E-Commerce SEO",
  "Local SEO Service",
  "Social Media Marketing",
  "Small Business Plan",
  "SEO Resellar Service",
];

/* ── Soft aurora blobs (kept subtle) ─────────────────────── */
const BLOBS = [
  {
    className: "w-[500px] h-[500px]",
    style: {
      background: "radial-gradient(circle, #003863 0%, transparent 70%)",
      top: "-10%",
      left: "-10%",
      opacity: 0.25,
    },
    animate: { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
    duration: 30,
  },
  {
    className: "w-[400px] h-[400px]",
    style: {
      background: "radial-gradient(circle, #00509d 0%, transparent 70%)",
      bottom: "-15%",
      right: "-5%",
      opacity: 0.2,
    },
    animate: { x: [0, -30, 20, 0], y: [0, 20, -15, 0] },
    duration: 35,
  },
];

/* ── Marquee item ───────────────────────────────────────── */
function MarqueeItem({ children }) {
  return (
    <motion.div
      className="text-white/70 font-regular tracking-tight py-5 cursor-default select-none"
      style={{
        fontSize: "clamp(1.7rem, 2vw, 3rem)",
        lineHeight: 1.2,
      }}
      whileHover={{ color: "#ff8fab", scale: 1.06 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function CTAMarquee() {
  const y = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    let next = y.get() - delta * 0.01;
    if (next < -50) next = 0;
    y.set(next);
  });

  const allItems = [...items, ...items];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section className="relative min-h-screen bg-[#051923] flex items-center justify-center px-6 md:px-12 overflow-hidden">
      <FooterBlob variant={"second"} />

      {/* ── SOFT BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[120px] ${b.className}`}
            style={b.style}
            animate={b.animate}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 grid md:grid-cols-2 gap-12 max-w-5xl w-full items-center">
        {/* LEFT: Marquee */}
        <div
          className="relative h-137.5 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, #00171f 20%, transparent)",
            }}
          />

          <motion.div style={{ y }} className="flex flex-col pl-4">
            {allItems.map((item, i) => (
              <MarqueeItem key={i}>{item}</MarqueeItem>
            ))}
          </motion.div>

          <div
            className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #00171f 20%, transparent)",
            }}
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          <motion.h2
            {...fadeUp(0.1)}
            className="text-white  leading-tight"
           
          >
            Get Started <br />
            <span className="text-[#118ab2]">in Minutes</span>
          </motion.h2>

          <motion.p {...fadeUp(0.2)} className="text-[#ff8fab] ">
            Do you have a project in mind?
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="text-white max-w-md leading-relaxed"
          >
            Touch base with us.{" "}
            <strong className="text-white">Let's discover</strong> how we can
            add more value to your business.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex gap-4">
            <Button href={"tel:+911204537874"}>Call Now</Button>

            <Button href={"/contact-us"} variant="outline">
              Contact Us
            </Button>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="h-px w-full bg-white/10" />
        </div>
      </div>
    </section>
  );
}

//
