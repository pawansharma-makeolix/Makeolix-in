"use client";

import { useEffect, useRef } from "react";

export default function BlobCursor() {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const speed = 0.08; // smoothness

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      blob.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      requestAnimationFrame(animate);
    };

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 z-999"
    >
      <div className="w-72 h-72 rounded-full blur-3xl opacity-40 bg-linear-to-r from-[#118ab2] via-[#00509d] to-[#003863]" />
    </div>
  );
}
