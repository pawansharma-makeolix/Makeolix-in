"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const faqs = [
  {
    question:
      "What is digital marketing and why is it important for my business?",
    answer:
      "Digital marketing is the promotion of products or services using online channels such as search engines, social media, email, and websites. It is important because it allows your business to reach a larger audience, generate leads, improve brand visibility, and achieve measurable growth in a cost-effective way.",
  },
  {
    question: "What are the advantages of digital marketing services?",
    answer:
      "Effective digital marketing offers a number of benefits including increased reach and visibility through online marketing channels. You are also able to target new audiences with solutions that are way more cost effective than traditional marketing methods.",
  },
  {
    question: "What services that MakeOlix Consulting provide?",
    answer:
      "MakeOlix Consulting offers an entire array of digital marketing services, including SEO, performance marketing, social media marketing, and website development.",
  },
  {
    question:
      "What is the difference between MakeOlix Consulting and other agencies?",
    answer:
      "MakeOlix focuses on ROI-driven growth with transparent reporting, personalized strategies, and fast execution.",
  },
  {
    question: "Do you offer customized digital marketing packages?",
    answer:
      "Yes, we provide customized digital marketing solutions tailored to your business goals, budget, and industry.",
  },
];

const FAQSection = () => {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      className="w-full py-20 px-4"
      style={{
        background: "var(--bg-soft)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className=" mb-4"
            style={{ color: "#fff" }}
          >
            Company FAQs
          </h2>

          <h3
            className="mb-2"
            style={{ color: "#fff" }}
          >
            Have questions about Makeolix? We've got answers !
          </h3>

          <p className="text-white max-w-5xl mx-auto">
            Explore our FAQs to gain insights into digital marketing, our
            approach, and how we can tailor solutions for your business. From
            understanding the basics to getting started, find comprehensive
            answers to commonly asked questions about our services and the
            industries we serve.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <motion.div
                key={index}
                /* 🔥 Alternating animation */
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -100 : 100,
                  rotate: index % 2 === 0 ? -3 : 3,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "#f2f2f2",
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="text-var(-bg--main) font-medium text-base md:text-lg">
                    {faq.question}
                  </span>

                  {/* Animated Icon */}
                  <motion.span
  animate={{
    rotate: isOpen ? 45 : 0,
    scale: isOpen ? 1.08 : 1,
  }}
  transition={{
    duration: 0.28,
    ease: "easeInOut",
  }}
  className="text-[#118ab2] text-xl flex items-center justify-center"
>
  <FiPlus />
</motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-sm text-var(-text--main)"
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow line */}
                <motion.div
                  className="h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, #118ab2, #6366f1, #a855f7)",
                  }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
