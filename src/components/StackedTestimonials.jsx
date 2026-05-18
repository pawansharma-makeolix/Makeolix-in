"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Patrick Doran",
    role: "Shop with Shiva",
    text: "I worked with the fine folks at MakeOlix , for almost a year and felt fully confident in expressing my thoughts. There is not a finer, more dedicated group of people offering digital marketing and website designing and development services.",
  },
  {
    id: 2,
    name: "Mike Strasser",
    role: "Wind River Outpost",
    text: "Company is helping us to Manage our Digital Staffing remotely. It’s been a couple of months and I really like their professionalism and the fact that they respect deadlines.",
  },
  {
    id: 3,
    name: "Don Miller",
    role: "Ruby Reef Inc.",
    text: "I really liked the work ethics and transparency while working with the Makeolix team, deadlines were met. After working with so many digital marketing agencies; finally saw some results coming in terms of revenue and traffic.",
  },
  {
    id: 4,
    name: "Jennet Jackson",
    role: "Weathered Not Worn",
    text: " I was stressed after working with SEO agencies because I was not getting results but after working with MakeOlix I built trust again on SEO strategy. I got more traffic and sales within the given timeline.",
  },
  {
    id: 5,
    name: "Kojo White",
    role: "Handypeg",
    text: "It feels great to work with a team who puts themselves  in your shoes while working on your project and MakeOlix  is one of them. I really enjoyed working with them and it feels awesome to see some amazing results on the website.",
  },
];

// ─── Card Stack ───────────────────────────────────────────────────────────────
function CardStack({ current, direction }) {
  return (
    <div className="relative w-[320px] md:w-100 h-80 md:h-87.5">
      {/* Fanned background cards */}
      {[
        { rotate: -8, ty: -14, opacity: 0.3 },
        { rotate: 5, ty: -7, opacity: 0.55 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-white rounded-2xl"
          style={{
            transform: `rotate(${s.rotate}deg) translateY(${s.ty}px)`,
            zIndex: i + 1,
            opacity: s.opacity,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        />
      ))}

      {/* Active card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={(d) => ({
            y: d === 1 ? 160 : -160,
            x: d === 1 ? 60 : -60,
            opacity: 0,
            rotate: d === 1 ? 12 : -12,
            scale: 0.78,
            filter: "blur(6px)",
          })}
          animate={{
            y: 0,
            x: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={(d) => ({
            y: d === 1 ? -180 : 180,
            x: d === 1 ? -50 : 50,
            opacity: 0,
            rotate: d === 1 ? -14 : 14,
            scale: 0.75,
            filter: "blur(8px)",
          })}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 bg-white rounded-2xl p-7 md:p-9 flex flex-col justify-between"
          style={{ zIndex: 10, boxShadow: "0 24px 60px rgba(0,0,0,0.28)" }}
        >
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-[52px] leading-none text-[#118ab2]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            &ldquo;
          </motion.div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.32,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-gray-500 text-sm md:text-[15px] leading-relaxed flex-1 mt-2"
          >
            {testimonials[current].text}
          </motion.p>

          {/* Divider + name */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-t border-gray-100 pt-5 mt-4"
          >
            <h4 className="text-[15px] font-semibold text-[#00509d]">
              {testimonials[current].name}
            </h4>
            <p className="text-sm text-gray-400 mt-0.5">
              {testimonials[current].role}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function StackedTestimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5, once: false });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const cooldown = useRef(false);
  const touchStartY = useRef(0);
  const total = testimonials.length;

  const go = useCallback(
    (dir) => {
      if (cooldown.current) return;
      const next = current + dir;
      if (next < 0 || next >= total) return;
      cooldown.current = true;
      setTimeout(() => {
        cooldown.current = false;
      }, 700);
      setDirection(dir);
      setCurrent(next);
    },
    [current, total],
  );

  const sectionInView = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= 80 && rect.bottom >= window.innerHeight - 80;
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!sectionInView()) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = current + dir;
      if (next < 0 || next >= total) return;
      e.preventDefault();
      go(dir);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [sectionInView, go, current, total]);

  useEffect(() => {
    const onStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onEnd = (e) => {
      if (!sectionInView()) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) go(dy > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [sectionInView, go]);

  // Section entry animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subVariants = {
    hidden: { opacity: 0, y: -20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stackVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.88,
      rotate: -4,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const dotsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#00171f] min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(17,138,178,0.09), transparent)",
        }}
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center"
      >
        {/* Heading */}
        <motion.div variants={headingVariants} className="text-center mb-2">
          <h2
            className=" text-white"
   
          >
            Customer Testimonials
          </h2>
        </motion.div>

        {/* Subheading */}
        <motion.div variants={subVariants} className="text-center mb-14">
          <p className="text-sm text-white mt-3 tracking-wide">
            What our clients say about us
          </p>
        </motion.div>

        {/* Card stack */}
        <motion.div variants={stackVariants}>
          <CardStack current={current} direction={direction} />
        </motion.div>

        {/* Dots */}
        <motion.div
          variants={dotsVariants}
          className="flex items-center gap-2.5 mt-10"
        >
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                if (i === current) return;
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              animate={{
                width: i === current ? 26 : 8,
                backgroundColor: i === current ? "#118ab2" : "#1e3a4a",
              }}
              transition={{ duration: 0.35 }}
              className="h-1.5 rounded-full border-0 p-0 cursor-pointer"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
