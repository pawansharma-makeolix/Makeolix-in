"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation, useSpring } from "framer-motion";
import * as THREE from "three";

import Button from "./Button";

import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaReact,
  FaShopify,
  FaWordpress,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

// ─────────────────────────────────────────────────────────────
// Brand Icons Data
// ─────────────────────────────────────────────────────────────

const LEFT_ICONS = [
  {
    Icon: FaFacebook,
    color: "#1877F2",
    top: "13%",
    left: "4%",
    delay: 0.2,
  },
  {
    Icon: FaInstagram,
    color: "#E1306C",
    top: "32%",
    left: "9%",
    delay: 0.4,
  },
  {
    Icon: FaReact,
    color: "#61DAFB",
    top: "52%",
    left: "4%",
    delay: 0.6,
  },
  {
    Icon: FaWordpress,
    color: "#21759B",
    top: "70%",
    left: "10%",
    delay: 0.8,
  },
  {
    Icon: FaDribbble,
    color: "#EA4C89",
    top: "85%",
    left: "5%",
    delay: 1.0,
  },
];

const RIGHT_ICONS = [
  {
    Icon: FaYoutube,
    color: "#FF0000",
    top: "13%",
    right: "5%",
    delay: 0.3,
  },
  {
    Icon: FaLinkedin,
    color: "#0A66C2",
    top: "32%",
    right: "10%",
    delay: 0.5,
  },
  {
    Icon: FaShopify,
    color: "#5C8D3F",
    top: "52%",
    right: "4%",
    delay: 0.7,
  },
  {
    Icon: FaTwitter,
    color: "#1DA1F2",
    top: "70%",
    right: "11%",
    delay: 0.9,
  },
  {
    Icon: FaGithub,
    color: "#24292E",
    top: "85%",
    right: "6%",
    delay: 1.1,
  },
];

// ─────────────────────────────────────────────────────────────
// Magnetic Icon
// ─────────────────────────────────────────────────────────────

const MagneticIcon = ({
  Icon,
  color,
  top,
  left,
  right,
  delay,
}) => {
  const elRef = useRef(null);

  const xSpring = useSpring(0, {
    stiffness: 200,
    damping: 18,
    mass: 0.5,
  });

  const ySpring = useSpring(0, {
    stiffness: 200,
    damping: 18,
    mass: 0.5,
  });

  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback(
    (e) => {
      if (!elRef.current) return;

      const rect = elRef.current.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const dist = Math.hypot(dx, dy);

      const RADIUS = 120;

      if (dist < RADIUS) {
        const pull = ((RADIUS - dist) / RADIUS) * 34;

        xSpring.set((dx / dist) * pull);
        ySpring.set((dy / dist) * pull);

        setHovered(true);
      } else {
        xSpring.set(0);
        ySpring.set(0);

        setHovered(false);
      }
    },
    [xSpring, ySpring]
  );

  const onLeave = useCallback(() => {
    xSpring.set(0);
    ySpring.set(0);

    setHovered(false);
  }, [xSpring, ySpring]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <motion.div
      ref={elRef}
      data-side-icon
      onMouseLeave={onLeave}
      initial={{ opacity: 0, scale: 0.15, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: delay + 1.8,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "absolute",
        top,
        left,
        right,
        zIndex: 1,
        x: xSpring,
        y: ySpring,
      }}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 2.6 + delay * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
      >
        <motion.div
          animate={{
            scale: hovered ? 1.45 : 1,
            rotate: hovered ? [0, -14, 14, -7, 0] : 0,
            boxShadow: hovered
              ? `0 0 28px 8px ${color}66, 0 4px 24px rgba(0,0,0,0.1)`
              : "0 2px 16px rgba(0,0,0,0.10)",
          }}
          transition={{
            duration: 0.38,
            ease: "easeOut",
          }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hovered
              ? `${color}15`
              : "rgba(255,255,255,0.90)",
            border: `2px solid ${
              hovered ? `${color}cc` : "rgba(0,0,0,0.06)"
            }`,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            cursor: "pointer",
            transition: "background 0.3s, border 0.3s",
          }}
        >
          <Icon
            size={26}
            color={hovered ? color : `${color}aa`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Sweep Headline
// ─────────────────────────────────────────────────────────────

const SweepHeadline = ({ text }) => {
  const blueWords = ["MAKEOLIX", "GLOBE"];

  return (
    <div
      style={{
        display: "flex",
        gap: "0.28em",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {text.split(" ").map((word, wi) => {
        const isBlue = blueWords.includes(word);

        return (
          <span
            key={wi}
            style={{
              overflow: "hidden",
              display: "inline-block",
              lineHeight: 1.15,
            }}
          >
            <motion.span
              initial={{
                y: "110%",
                opacity: 0,
                skewY: 8,
              }}
              animate={{
                y: "0%",
                opacity: 1,
                skewY: 0,
              }}
              transition={{
                delay: wi * 0.22 + 0.8,
                duration: 0.95,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                color: isBlue
                  ? "var(--text-fifth)"
                  : "var(--variable-2)",
              }}
              style={{
                display: "inline-block",
                cursor: "pointer",
                transition: "color 0.3s ease",
                color: isBlue
                  ? "var(--variable-2)"
                  : "var(--text-fifth)",
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────────────────────

export const WovenLightHero = () => {
  const buttonControls = useAnimation();
  const subControls = useAnimation();

  useEffect(() => {
    subControls.start({
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.1,
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    buttonControls.start({
      opacity: 1,
      transition: {
        delay: 2.7,
        duration: 0.85,
      },
    });
  }, [buttonControls, subControls]);

  return (
    <div
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-(--bg-main)"
      style={{ minHeight: "100vh" }}
    >
      {/* Background */}
      <WovenCanvas />

      {/* Left Icons */}
      {LEFT_ICONS.map((p, i) => (
        <MagneticIcon key={`l${i}`} {...p} />
      ))}

      {/* Right Icons */}
      {RIGHT_ICONS.map((p, i) => (
        <MagneticIcon key={`r${i}`} {...p} />
      ))}

      {/* Center Content */}
      <div className="relative z-10 px-4 text-center select-none">
    <h1
  className="hero-heading mx-auto max-w-6xl"
  style={{
    textShadow: "0 0 55px rgba(255,255,255,0.22)",
    lineHeight: 1.1,
  }}
>
          <SweepHeadline text="We are MAKEOLIX We are building brands across the GLOBE" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={subControls}
          className="hero-subheading mx-auto mt-6 max-w-xl text-(--text-muted)"
        >
          An interactive tapestry of light and motion,
          crafted with code and creativity.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={buttonControls}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/contact">
            Start Project
          </Button>

          <Button
            href="/portfolio"
            variant="outline"
          >
            View Work
          </Button>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 600px) {
          [data-side-icon] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Three.js Background
// ─────────────────────────────────────────────────────────────

const WovenCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);

    const clock = new THREE.Clock();

    const isDarkMode =
      window.matchMedia &&
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .matches;

    const particleCount = 50000;

    const positions = new Float32Array(
      particleCount * 3
    );

    const originalPositions = new Float32Array(
      particleCount * 3
    );

    const colors = new Float32Array(
      particleCount * 3
    );

    const velocities = new Float32Array(
      particleCount * 3
    );

    const geometry = new THREE.BufferGeometry();

    const torusKnot =
      new THREE.TorusKnotGeometry(
        1.5,
        0.5,
        200,
        32
      );

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex =
        i % torusKnot.attributes.position.count;

      const x =
        torusKnot.attributes.position.getX(
          vertexIndex
        );

      const y =
        torusKnot.attributes.position.getY(
          vertexIndex
        );

      const z =
        torusKnot.attributes.position.getZ(
          vertexIndex
        );

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = new THREE.Color();

      color.setHSL(
        Math.random(),
        0.8,
        isDarkMode ? 0.5 : 0.7
      );

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: isDarkMode
        ? THREE.NormalBlending
        : THREE.AdditiveBlending,
      transparent: true,
      opacity: isDarkMode ? 1.0 : 0.8,
    });

    const points = new THREE.Points(
      geometry,
      material
    );

    scene.add(points);

    const handleMouseMove = (event) => {
      mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    let animFrameId;

    const animate = () => {
      animFrameId =
        requestAnimationFrame(animate);

      const elapsedTime =
        clock.getElapsedTime();

      const mouseWorld = new THREE.Vector3(
        mouse.x * 3,
        mouse.y * 3,
        0
      );

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const currentPos = new THREE.Vector3(
          positions[ix],
          positions[iy],
          positions[iz]
        );

        const originalPos = new THREE.Vector3(
          originalPositions[ix],
          originalPositions[iy],
          originalPositions[iz]
        );

        const velocity = new THREE.Vector3(
          velocities[ix],
          velocities[iy],
          velocities[iz]
        );

        const dist =
          currentPos.distanceTo(mouseWorld);

        if (dist < 1.5) {
          const force =
            (1.5 - dist) * 0.01;

          const direction =
            new THREE.Vector3()
              .subVectors(currentPos, mouseWorld)
              .normalize();

          velocity.add(
            direction.multiplyScalar(force)
          );
        }

        const returnForce =
          new THREE.Vector3()
            .subVectors(originalPos, currentPos)
            .multiplyScalar(0.001);

        velocity.add(returnForce);

        velocity.multiplyScalar(0.95);

        positions[ix] += velocity.x;
        positions[iy] += velocity.y;
        positions[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }

      geometry.attributes.position.needsUpdate =
        true;

      points.rotation.y =
        elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      cancelAnimationFrame(animFrameId);

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      if (
        mountRef.current &&
        renderer.domElement.parentNode ===
          mountRef.current
      ) {
        mountRef.current.removeChild(
          renderer.domElement
        );
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
    />
  );
};

export default WovenLightHero;