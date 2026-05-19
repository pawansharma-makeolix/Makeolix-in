"use client";

import React from "react";
import { motion } from "framer-motion";

import Button from "./Button";

// ─────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],

    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────

export default function TextMediaVariant({
  heading,
  highlight,
  paragraph,
  buttons = [],
  stats = [],
  images = [],
}) {
  return (
    <section
      className="
        relative
        w-full
        overflow-x-hidden
        bg-[var(--bg-main)]
        py-16
        sm:py-24
      "
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -top-40
            left-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-[var(--variable-2)]/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-[300px]
            w-[300px]
            rounded-full
            bg-[var(--variable-4)]/10
            blur-[120px]
          "
        />
      </div>

      <div
        className="
          container
          relative
          z-10
          mx-auto
          grid
          grid-cols-1
          items-center
          gap-16
          px-6
          lg:grid-cols-2
          lg:gap-10
        "
      >
        {/* ───────────────── LEFT CONTENT ───────────────── */}

        <motion.div
          className="
            flex
            flex-col
            items-center
            text-center
            lg:items-start
            lg:text-left
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading */}

          <motion.h1
            className="
              max-w-[700px]
              text-4xl
              font-bold
              leading-[1.05]
              tracking-[-0.04em]
              text-[var(--text-main)]
              sm:text-6xl
            "
            variants={itemVariants}
          >
            {heading}{" "}
            <span className="text-[var(--variable-2)]">{highlight}</span>
          </motion.h1>

          {/* Paragraph */}

          <motion.p
            className="
              mt-6
              max-w-[620px]
              text-base
              leading-[1.8]
              text-[var(--text-muted)]
              sm:text-lg
            "
            variants={itemVariants}
          >
            {paragraph}
          </motion.p>

          {/* Buttons */}

          <motion.div
            className="
              mt-10
              flex
              flex-wrap
              justify-center
              gap-4
              lg:justify-start
            "
            variants={itemVariants}
          >
            {buttons.map((btn, index) => (
              <Button
                key={index}
                href={btn.href}
                onClick={btn.onClick}
                variant={btn.variant}
              >
                {btn.text}
              </Button>
            ))}
          </motion.div>

          {/* Stats */}


<motion.div
  className="
     mt-14
    grid w-full
    grid-cols-1
    gap-8
    sm:grid-cols-2
    lg:grid-cols-3
  "
  variants={itemVariants}
>
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      whileHover={{ y: -4 }}
      className="
        group
        relative
        min-w-[140px]
        transition-all duration-500
      "
    >
      {/* TOP ROW */}

      <div className="flex items-center gap-3">
        {/* ICON */}

        <div
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-gradient-to-br
            from-[var(--variable-1)]
            to-[var(--variable-2)]
            text-white
            shadow-[0_6px_24px_rgba(0,80,157,0.25)]
          "
        >
          {stat.icon}
        </div>

        {/* NUMBER + TITLE */}

        <div>
          <h3
            className="
              text-2xl font-bold
              leading-none
              text-[var(--bg-main)]
            "
          >
            {stat.number}
          </h3>

          <p
            className="
              mt-1 text-sm font-medium
              text-gray-400
            "
          >
            {stat.title}
          </p>
        </div>
      </div>

      {/* HOVER DESCRIPTION */}

      <div
        className="
          overflow-hidden
          max-h-0
          opacity-0
          transition-all duration-500
          group-hover:max-h-32
          group-hover:opacity-100
        "
      >
        <p
          className="
            mt-4 max-w-[220px]
            text-sm leading-[1.7]
            text-gray-500
          "
        >
          {stat.subtext}
        </p>
      </div>
    </motion.div>
  ))}
</motion.div>
        </motion.div>

        {/* ───────────────── RIGHT IMAGES ───────────────── */}

        <motion.div
          className="
            relative
            h-[500px]
            w-full
            sm:h-[650px]
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Floating Shape 1 */}

          <motion.div
            className="
              absolute
              left-[20%]
              top-0
              h-24
              w-24
              rounded-full
              bg-[var(--variable-3)]/20
              blur-2xl
            "
            variants={floatingVariants}
            animate="animate"
          />

          {/* Floating Shape 2 */}

          <motion.div
            className="
              absolute
              bottom-10
              right-10
              h-20
              w-20
              rounded-full
              bg-[var(--variable-4)]/30
              blur-xl
            "
            variants={floatingVariants}
            animate="animate"
            style={{
              transitionDelay: "0.6s",
            }}
          />

          {/* Image 1 */}

          <motion.div
            className="
              absolute
              left-1/2
              top-0
              h-52
              w-52
              -translate-x-1/2
              rounded-[28px]
              border
              border-white/20
              bg-white/70
              p-2
              shadow-2xl
              backdrop-blur-[14px]
              sm:h-72
              sm:w-72
            "
            style={{
              transformOrigin: "bottom center",
            }}
            variants={imageVariants}
          >
            <img
              src={images[0]}
              alt=""
              className="
                h-full
                w-full
                rounded-[24px]
                object-cover
              "
            />
          </motion.div>

          {/* Image 2 */}

          <motion.div
            className="
              absolute
              right-0
              top-1/3
              h-44
              w-44
              rounded-[28px]
              border
              border-white/20
              bg-white/70
              p-2
              shadow-2xl
              backdrop-blur-[14px]
              sm:h-60
              sm:w-60
            "
            style={{
              transformOrigin: "left center",
            }}
            variants={imageVariants}
          >
            <img
              src={images[1]}
              alt=""
              className="
                h-full
                w-full
                rounded-[24px]
                object-cover
              "
            />
          </motion.div>

          {/* Image 3 */}

          <motion.div
            className="
              absolute
              bottom-0
              left-0
              h-40
              w-40
              rounded-[28px]
              border
              border-white/20
              bg-white/70
              p-2
              shadow-2xl
              backdrop-blur-[14px]
              sm:h-56
              sm:w-56
            "
            style={{
              transformOrigin: "top right",
            }}
            variants={imageVariants}
          >
            <img
              src={images[2]}
              alt=""
              className="
                h-full
                w-full
                rounded-[24px]
                object-cover
              "
            />
          </motion.div>

          {/* Image 4 */}

          <motion.div
            className="
              absolute
              bottom-[15%]
              left-[20%]
              h-28
              w-28
              rounded-[24px]
              border
              border-white/20
              bg-white/70
              p-2
              shadow-2xl
              backdrop-blur-[14px]
              sm:h-40
              sm:w-40
            "
            variants={imageVariants}
          >
            <img
              src={images[3]}
              alt=""
              className="
                h-full
                w-full
                rounded-[20px]
                object-cover
              "
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
