"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote ,Star} from "lucide-react";

const SQRT_5000 = Math.sqrt(5000);

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function TestimonialCard({ testimonial, position, handleMove, cardSize }) {
  const [expanded, setExpanded] = useState(false);
  const isCenter = position === 0;
  const absPos = Math.abs(position);
  const isLong = testimonial.text.length > 120;

  const x = (cardSize / 1.5) * position;
  const y = isCenter ? 0 : position % 2 !== 0 ? 15 : -15;  // ✅ 0 — no upward shift
  const rotate = isCenter ? 0 : position % 2 !== 0 ? 2.5 : -2.5;
  const scale = isCenter ? 1 : Math.max(0.85 - absPos * 0.07, 0.62);
  const opacity = isCenter ? 1 : Math.max(0.95 - absPos * 0.18, 0.3);
  const zIndex = isCenter ? 20 : 10 - absPos;

  return (
    <motion.div
      layout
      key={testimonial.id}
      onClick={() => !isCenter && handleMove(position)}
      animate={{ x, y, rotate, scale, opacity, zIndex }}
      transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
      style={{
        position: "absolute",
        left: "30%",
        top: "30%",           // ✅ 50% — center
        translateX: "-50%",
        translateY: "-50%",
        width: cardSize,
        minHeight: cardSize * 0.85,
        willChange: "transform, opacity",
        background: isCenter
          ? "linear-gradient(145deg, var(--blue-1) 0%, #002a4d 100%)"
          : "var(--bg-soft)",
        boxShadow: isCenter
          ? "0 0 0 4px rgba(17,138,178,0.18), 0 24px 60px rgba(0,0,0,0.65)"
          : "0 4px 24px rgba(0,0,0,0.3)",
      }}
      className={`flex flex-col gap-3.5 p-7 rounded-[20px] overflow-hidden select-none
        ${
          isCenter
            ? "cursor-default border-2 border-(--blue-3)"
            : "cursor-pointer border-[1.5px] border-[rgba(0,80,157,0.30)]"
        }`}
    >
      <span
        className="absolute block rotate-45 origin-top-right"
        style={{
          top: 48,
          right: -2,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? "rgba(17,138,178,0.5)" : "rgba(0,80,157,0.3)",
        }}
      />

      {isCenter && (
        <span
          className="absolute pointer-events-none rounded-full w-40 h-40 -top-15 -right-15"
          style={{
            background:
              "radial-gradient(circle, rgba(17,138,178,0.25) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center ml-auto"
          style={{
            background: isCenter
              ? "rgba(255,143,171,0.2)"
              : "rgba(17,138,178,0.12)",
          }}
        >
          <Quote
            size={13}
            className={
              isCenter
                ? "text-(--accent-pink) fill-(--accent-pink)"
                : "text-(--blue-3) fill-(--blue-3)"
            }
          />
        </div>
      </div>
<div className="flex items-center gap-1">
  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
    <Star
      key={i}
      size={14}
      className={isCenter ? "text-(--accent-pink)" : "text-(--blue-3)"}
      fill="currentColor"
    />
  ))}
</div>
      <div
        className={`transition-all duration-350 ease-in-out text-[14.5px] leading-[1.7] overflow-hidden
          ${isCenter ? "text-[rgba(232,244,248,0.88)]" : "text-(--text-muted)"}`}
        style={{
          display: expanded ? "block" : "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : 4,
        }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </div>

      {isLong && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
          className={`self-start bg-transparent border-none cursor-pointer text-[10px] font-normal
            tracking-[0.06em] uppercase flex items-center gap-1 p-0
            ${isCenter ? "text-(--accent-pink)" : "text-(--blue-3)"}`}
        >
          {expanded ? "▲ View less" : "▼ View more"}
        </motion.button>
      )}

      <div
        className={`mt-auto pt-3 border-t
          ${isCenter ? "border-[rgba(255,255,255,0.1)]" : "border-[rgba(0,80,157,0.18)]"}`}
      >
        <p
          className={`text-[13px] font-semibold mb-0.5
            ${isCenter ? "text-white" : "text-(--blue-3)"}`}
        >
          {testimonial.by}
        </p>
        <p
          className={`text-[11.5px] tracking-[0.03em]
            ${isCenter ? "text-white" : "text-(--text-muted)"}`}
        >
          {testimonial.role}
        </p>
      </div>
    </motion.div>
  );
}

export function StaggerTestimonials({ data }) {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? 260 : 340;
  const [list, setList] = useState(data);
  const [direction, setDirection] = useState(0);

  const handleMove = (steps) => {
    setDirection(steps > 0 ? 1 : -1);
    setList((prev) => {
      const next = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = next.shift();
          if (item) next.push({ ...item, id: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = next.pop();
          if (item) next.unshift({ ...item, id: Math.random() });
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") handleMove(-1);
      if (e.key === "ArrowRight") handleMove(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center px-4 pt-12 pb-14 relative overflow-visible min-h-155 bg-(--bg-main)">
        <div
          className="absolute top-[10%] left-[15%] w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,80,157,0.14) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,143,171,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="ts-label text-center mb-10 z-10">
          <h2 className=" text-white">
            Testimonials
          </h2>
          <h2
            className={`ts-shimmer-text font-normal m-0 leading-tight ${
              isMobile ? "text-[26px]" : "text-[34px]"
            }`}
          >
            Loved by teams worldwide
          </h2>
          <div
            className="w-12 h-0.75 rounded-sm mx-auto mt-3.5"
            style={{
              background:
                "linear-gradient(90deg, var(--blue-3), var(--accent-pink))",
            }}
          />
        </div>

        {/* ✅ overflow-visible, no paddingTop, height fixed */}
        <div
          className="relative w-full z-10 overflow-visible"
          style={{ height: isMobile ? 380 : 460 }}
        >
          {list.map((t, index) => {
            const position =
              list.length % 2
                ? index - (list.length + 1) / 2
                : index - list.length / 2;
            return (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                position={position}
                handleMove={handleMove}
                cardSize={cardSize}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-8 z-10">
          <button
            className="ts-btn"
            onClick={() => handleMove(-1)}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-1.75 items-center">
            {Array.from({ length: Math.min(data.length, 10) }).map((_, i) => (
              <button
                key={i}
                className={`ts-dot${i === 0 ? " active" : ""}`}
                aria-label={`Go to ${i + 1}`}
                onClick={() => {
                  const diff =
                    i - (list.findIndex((_, idx) => idx === 0) % data.length);
                  if (diff !== 0) handleMove(diff);
                }}
              />
            ))}
          </div>

          <button
            className="ts-btn"
            onClick={() => handleMove(1)}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default StaggerTestimonials
