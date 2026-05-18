"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

function CaseStudiesGrid({
  heading,
  subtext,
  items = [],
  columns = 3,
}) {
  const gridCols = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(17,138,178,0.12)" }}
          animate={{
            x: [0, 40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-24 right-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(0,80,157,0.12)" }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto w-[92%] max-w-7xl">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2
            className="leading-tight "
            style={{ color: "var(--blue-3)" }}
          >
            {heading}
          </h2>

          {subtext && (
            <p
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              {subtext}
            </p>
          )}
        </motion.div>

        {/* grid */}
        <div
          className={`grid grid-cols-1 gap-7 ${gridCols[columns] || "md:grid-cols-3"}`}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[28px] border"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,25,35,0.95), rgba(0,23,31,0.98))",
                borderColor: "rgba(17,138,178,0.18)",
                boxShadow: "0 0 40px rgba(0,80,157,0.08)",
              }}
            >
              {/* animated top line */}
              <motion.div
                className="absolute left-0 top-0 h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--blue-3), transparent)",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title || "case study"}
                  className="h-60 w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,23,31,0.8), rgba(0,23,31,0.05))",
                  }}
                />
              </div>

              {/* content */}
              <div className="relative p-6 md:p-7">
                {item.title && (
                  <h3
                    className="mb-3  leading-snug transition-all duration-500 group-hover:translate-x-1"
                    style={{ color: "#e2eaf4" }}
                  >
                    {item.title}
                  </h3>
                )}

                <p
                  className="mb-6 text-sm leading-7 md:text-[15px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.shortDescription}
                </p>

                <Button href={item.href || "#"} variant="primary">
                  Read More
                </Button>
              </div>

              {/* soft glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: "inset 0 0 80px rgba(17,138,178,0.08)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesGrid;