import React from "react";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const points = [
  {
    title: "Beyond Conventional Leads",
    desc: "Our approach goes beyond traditional methods to ensure your brand thrives in a competitive digital space.",
  },
  {
    title: "Personalized Website Audit",
    desc: "We begin with deep analysis of your website and craft strategies tailored to your business goals.",
  },
  {
    title: "Commitment to Clarity",
    desc: "We maintain transparency at every step, ensuring trust and long-term collaboration.",
  },
  {
    title: "Building Strong Connections",
    desc: "We create meaningful digital connections that help your brand grow and engage effectively.",
  },
];

const KnowPoints = () => {
  return (
    <section className="py-10 pb-20 bg-[var(--bg-soft)] text-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADING */}
        <div className="text-center mb-16">
          <ScrollReveal as="h2" variant="white" align="center"   textClassName="text-white"
 size="md">
            Know Our Points
          </ScrollReveal>

          <ScrollReveal as="h3" align="center"   textClassName="text-white"
 size="s">
            We go beyond strategies — we build systems that create real impact.
          </ScrollReveal>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              {/* GLOW EFFECT */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--blue-3)] to-white opacity-0 group-hover:opacity-10 transition"></div>

              {/* CONTENT */}
              <div className="relative z-10 space-y-4">
                {/* ICON */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--blue-3)]/10 text-[var(--blue-3)] font-bold">
                  {i + 1}
                </div>

                {/* TITLE */}
                <h3 >{item.title}</h3>

                {/* DESC */}
                <p className=" text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowPoints;
