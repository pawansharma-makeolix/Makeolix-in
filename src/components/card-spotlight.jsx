"use client";
import React, { useState } from "react";

export const CardSpotlight = ({ children, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* 🔥 SPOTLIGHT */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(
            300px circle at ${position.x}px ${position.y}px,
            rgba(255,255,255,0.15),
            transparent 60%
          )`,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};
