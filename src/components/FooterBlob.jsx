"use client";

import { useEffect, useRef, useState } from "react";

export default function FooterBlob({variant}) {
  const imageSrc = variant === "second" ? "/blob2.png" : "/blob.png";
  const blobRef = useRef(null);
  const containerRef = useRef(null);

  const [visible, setVisible] = useState(false);

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  useEffect(() => {
    const move = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      // check if mouse is inside footer
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inside) {
        setVisible(true);

        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      } else {
        setVisible(false);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <img
        ref={blobRef}
        src={imageSrc} 
        className={`absolute w-25 md:w-37.5 lg:w-50 transition-opacity duration-300 ${
          visible ? "opacity-80" : "opacity-0"
        }`}
        
      />
    </div>
  );
}