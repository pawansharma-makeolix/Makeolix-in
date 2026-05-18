"use client";

import { TypeAnimation } from "react-type-animation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";
import Button from "./Button";

const Hero = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },

    background: {
      color: "#051923",
    },

    fpsLimit: 120,

    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push", // 👉 click pe new dots
        },
        onHover: {
          enable: true,
          mode: "grab", // 👉 hover pe line connect feel
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 140,
          links: {
            opacity: 0.4,
          },
        },
      },
    },

    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },

      color: {
        value: ["#ef476f", "#fff", "#118ab2"], // 🔥 black + blue tones
      },

      links: {
        enable: true,
        distance: 110,
        color: "#ffffff",
        opacity: 0.7,
        width: 1,
      },

      move: {
        enable: true,
        speed: 1.2, // smooth movement
        direction: "none",
        outModes: {
          default: "bounce",
        },
      },

      size: {
        value: { min: 4, max: 6 },
      },

      opacity: {
        value: 0.7,
      },

      shape: {
        type: "circle",
      },
    },

    detectRetina: true,
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* ✨ PARTICLES BACKGROUND */}
      {init && (
        <Particles
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-3xl px-6 text-white">
        <h1 className=" leading-tight mb-6">
          We are Makeolix
          <br />
          We do{" "}
          <span className="bg-linear-to-r from-white to-[#118ab2] bg-clip-text text-transparent">
            <TypeAnimation
              sequence={[
                "SEO Reseller Service",
                2000,
                "Web Development",
                2000,
                "Web Design",
                2000,
                "Small Business Planning",
                2000,
                "Social Media Marketing",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h1>

        <p className="text-amber-50 text-lg mb-8">
          We help brands dominate digital with AI-powered strategies.
        </p>

        <div className="flex justify-center gap-4">
          <Button href={"/contact-us"}>Get In Touch</Button>
          <Button variant="outline" href={"/about"}>
            Know More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
