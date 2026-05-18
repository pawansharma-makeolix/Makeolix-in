"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparkleParticles } from "./SparkleParticles";

const features = [
  {
    title: "Expertise that Delivers Results",
    desc: "Backed by a team of seasoned professionals, MakeOlix brings a wealth of expertise to the table. Our digital marketing specialists are adept at navigating the dynamic online landscape, ensuring your brand remains ahead of the curve.",
  },
  {
    title: "Innovative Strategies for Maximum Impact",
    desc: "Innovation is the cornerstone of our approach. From cutting-edge SEO tactics to engaging content strategies, we employ innovative methods to maximize the impact of your digital presence. We go beyond conventional approaches, ensuring your brand stands out in today’s dynamic market, leaving a lasting impression on your audience.",
  },
  {
    title: "Putting Clients First: Our Client-Centric Approach",
    desc: "At MakeOlix, clients are at the heart of everything we do. We take the time to understand your business, goals, and challenges, tailoring our strategies to align with your unique requirements. Your success is our success.",
  },
  {
    title: "Transparent Communication",
    desc: "Transparency is the bedrock of our client relationships. From project timelines to performance metrics, we keep you informed every step of the way. Our commitment to transparent communication ensures you have full visibility into the progress and success of your digital marketing campaigns.",
  },
];

const gradients = [
  "from-[#003863] via-[#00509d] to-[#118ab2]",
  "from-[#00509d] via-[#118ab2] to-[#003863]",
  "from-[#118ab2] via-[#00509d] to-[#003863]",
  "from-[#003863] via-[#118ab2] to-[#00509d]",
];

const WhyChooseUs = () => {
  return (
    <div className="relative w-full py-20 px-4 overflow-hidden bg-[#051923]">
      {/* ✨ Particles */}
      <SparkleParticles
        className="absolute inset-0 w-full h-full"
        particleColor={["#118ab2", "#ffffff"]}
      />

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className=" text-white">
            Why Choose Makeolix ?
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-[#00509d]" />

          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotate: i % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`mb-10 flex flex-col md:flex-row items-center ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="w-full md:w-1/2" />

              {/* Dot */}
              <div className="relative z-10">
                <div className="w-4 h-4 rounded-full bg-[#118ab2] shadow-[0_0_10px_#118ab2]" />
              </div>

              {/* Gradient Border */}
              <motion.div
                whileHover={{ y: -14, scale: 1.03 }}
                className={`group relative w-full md:w-1/2 p-px rounded-xl bg-linear-to-r ${gradients[i]}`}
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-linear-to-r from-[#118ab2] via-[#00509d] to-[#003863]" />

                {/* Glass Card */}
                <div className="relative p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-300 group-hover:shadow-2xl overflow-hidden">
                  {/* Shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute -left-1/2 top-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/30 to-transparent rotate-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    className="mb-3"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-[#82c3d9] to-[#6a95bc] text-white shadow-md">
                      <span>★</span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className=" leading-snug min-h-12 text-white">
                    {item.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-sm leading-relaxed text-gray-300">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
