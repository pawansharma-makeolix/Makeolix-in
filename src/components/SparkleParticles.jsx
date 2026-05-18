"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function SparkleParticles({
  className,
  particleColor = ["#118ab2", "#ffffff"], // 🔥 multi color
}) {
  const [isReady, setIsReady] = useState(false);
  const id = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    fpsLimit: 120,

    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false,
        },
      },
    },

    particles: {
      color: {
        value: particleColor,
      },

      number: {
        value: 80, // ✅ controlled density
      },

      size: {
        value: { min: 1, max: 4 },
      },

      opacity: {
        value: { min: 0.05, max: 0.3 }, // ✅ subtle
        animation: {
          enable: true,
          speed: 1.5,
        },
      },

      move: {
        enable: true,
        speed: 0.6, // ✅ slow = premium
        direction: "none",
        outModes: {
          default: "out",
        },
      },

      shape: {
        type: "circle",
      },
    },

    detectRetina: true,
  };

  return (
    isReady && <Particles id={id} options={options} className={className} />
  );
}
