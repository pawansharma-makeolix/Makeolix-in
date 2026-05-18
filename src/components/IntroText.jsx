"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function IntroText({
  heading,
  paragraph = "Your paragraph content goes here. Explain your product, service, or idea in a clear and engaging way.",
  align = "center", // left | center
  maxWidth = "1024px",

  // NEW PROPS
  paragraphLink, // { text: "", href: "" }
  topImage, // { src: "", alt: "", href: "", width?: "", className?: "" }
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = heading ? heading.split(" ") : [];

  return (
    <section className="relative py-10 sm:py-20 px-5 bg-(--bg-main)">
      <div
        ref={ref}
        className={`mx-auto ${
          align === "center" ? "text-center" : "text-left"
        } ${heading ? "space-y-5" : "space-y-0"}`}
        style={{ maxWidth }}
      >
        {/* 🔹 Top Image (optional) */}
        {topImage?.src && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className={align === "center" ? "flex justify-center" : ""}
          >
            <a
              href={topImage.href || topImage.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={topImage.src}
                alt={topImage.alt || "Intro image"}
                className={topImage.className || "h-auto"}
                style={{ width: topImage.width || "120px" }}
              />
            </a>
          </motion.div>
        )}

        {/* 🔹 Heading Animation */}
        {heading && (
          <h2
            className="font-black leading-tight"
            style={{  color: "white" }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        )}

        {/* 🔹 Paragraph Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="space-y-3"
        >
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {paragraph}
          </p>

          {/* 🔹 Paragraph Link (optional) */}
          {paragraphLink?.text && paragraphLink?.href && (
            <a
              href={paragraphLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-medium underline underline-offset-4"
              style={{ color: "var(--blue-3)" }}
            >
              {paragraphLink.text}
            </a>
          )}
        </motion.div>

        {/* 🔹 Underline Accent Animation */}
        <motion.div
          className={`h-0.5 mt-6 ${align === "center" ? "mx-auto" : ""}`}
          style={{
            width: 120,
            background:
              "linear-gradient(to right, var(--blue-3), var(--accent-pink))",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
      </div>
    </section>
  );
}