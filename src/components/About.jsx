import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import aboutVideo from "../assets/MakeOlix-Home-Page-Intro-Video.mp4";
import { SparkleParticles } from "./SparkleParticles";

const About = () => {
  return (
    <section className="relative py-20 bg-(--bg-main) text-white overflow-hidden">

      <SparkleParticles className="absolute inset-0 z-0 blur-[1px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-(--blue-3) mb-3 font-semibold">
            What makes us the best?
          </p>

          <h2 className=" mb-6 leading-snug">
            About Us
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            MakeOlix is not just a performance marketing agency; we are your
            dedicated partner in success. We thrive on our clients’ success
            stories, and our goal is to see your brand soar to new heights in
            the digital realm. Our mission is to propel your brand to new
            heights in the digital space.
          </p>

          <Button className="w-40" href={"/about"}>
            Know More
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 120, rotate: 6, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,80,157,0.4)] group"
          >
            
            <video
              src={aboutVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
