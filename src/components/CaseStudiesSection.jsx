"use client";

import { motion } from "framer-motion";
import Button from "./Button"; // adjust the import path as needed

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function CaseStudiesSection({
  heading = "Our Case Studies",
  subtext = "Discover how we've helped businesses achieve their goals.",
  cases = [],
  columns = 3,
}) {
  // Map the `columns` prop to a tailwind grid class
  const gridColsClass = (() => {
    switch (columns) {
      case 1:
        return "lg:grid-cols-1";
      case 2:
        return "lg:grid-cols-2";
      case 4:
        return "lg:grid-cols-4";
      case 3:
      default:
        return "lg:grid-cols-3";
    }
  })();

  return (
    <section
      className="py-20 px-4 md:px-8 lg:px-16 xl:px-24"
      style={{ background: "var(--bg-soft)" }}
    >
      {/* ---------- HEADING + SUBTEXT ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2
          className="mb-4 "
          style={{
            background: "linear-gradient(135deg, var(--blue-1), var(--blue-3))",
            WebkitBackgroundClip: "text",
            color: "#fff",
            WebkitTextFillColor: "transparent",
          }}
        >
          {heading}
        </h2>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          {subtext}
        </p>
      </motion.div>

      {/* ---------- CARDS GRID ---------- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-8`}
      >
        {cases.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative rounded-2xl overflow-hidden transition-shadow duration-500"
            style={{
              background: "var(--bg-soft)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 30px rgba(0, 80, 157, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Image with zoom on hover */}
            <div className="relative overflow-hidden h-48 md:h-56">
              <motion.img
                src={item.image}
                alt={item.description?.slice(0, 50)}
                className="w-full h-full object-cover transition-transform duration-700"
                whileHover={{ scale: 1.1 }}
              />
              {/* Gradient overlay that appears on card hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-soft)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Description + Button */}
            <div className="p-5">
              <p
                className="text-sm md:text-base mb-5 line-clamp-3"
                style={{ color: "var(--text-muted)" }}
              >
                {item.description}
              </p>
              <Button
                href={item.buttonHref}
                onClick={item.buttonOnClick}
                variant={item.buttonVariant || "primary"}
              >
                {item.buttonText || "View Case Study"}
              </Button>
            </div>

            {/* Glowing border that appears on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--blue-3)] transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
