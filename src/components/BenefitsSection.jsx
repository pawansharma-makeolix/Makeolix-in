import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Long-Term Growth",
    text: "A solid foundation for long-term search engine performance and user engagement",
    image: "/yamu_jay-global-business-9062781_1920.jpg",
  },
  {
    title: "Immediate Impact",
    text: "Immediate improvements in technical, content, and user experience aspects",
    image: "/imediategrowth.jpg",
  },
  {
    title: "Cost-Effective Coverage",
    text: "Affordable yet comprehensive service targeting critical SEO elements",
    image: "/costeffective.jpg",
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-main)] py-24 px-6">
      <motion.div
        animate={{ x: [0, 80, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[var(--blue-2)] blur-3xl opacity-20"
      />

      <motion.div
        animate={{ x: [0, -60, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[var(--blue-3)] blur-3xl opacity-10"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 0.7 }}
            className="mb-3 text-xs uppercase text-[var(--blue-3)]"
          >
            Why It Matters
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mb-5 text-3xl font-semibold text-white md:text-4xl"
          >
KEY BENEFITS OF OUR SERVICE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="text-base leading-8 text-[var(--text-muted)] md:text-lg"
          >
            For just $79, our service provides expert website optimization, boosting performance and user experience. Expect faster load times, smoother navigation, and improved functionality, ultimately driving higher engagement, conversions, and a seamless overall website performance.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 80, rotateX: 10, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -14, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[var(--bg-soft)]"
            >
              <motion.div
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(17,138,178,0.22),transparent_45%)]"
              />

              <div className="relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 1 }}
                  transition={{ duration: 0.8 }}
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
                <motion.div
                  animate={{ opacity: [0.55, 0.75, 0.55] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent"
                />
              </div>

              <div className="relative p-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.22 + i * 0.08, duration: 0.55 }}
                  className="mb-4 h-[2px] rounded-full bg-[var(--blue-3)]"
                />

                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.08, duration: 0.45 }}
                  className="mb-3  text-white"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 + i * 0.08, duration: 0.5 }}
                  className="leading-7 text-[var(--text-muted)]"
                >
                  {item.text}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}