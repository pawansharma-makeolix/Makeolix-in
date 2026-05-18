import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    position: "relative",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    position: "absolute", // exit hote waqt absolute — layout space nahi leti
  }),
};

const transition = {
  x: {
    type: "spring",
    stiffness: 60,
    damping: 18,
    mass: 1.1,
  },
  opacity: { duration: 0.35, ease: "easeInOut" },
};

export default function HorizontalScrollSection({ children }) {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const total = children.length;
  const containerRef = useRef(null);
  const isAnimating = useRef(false);
  const touchStartY = useRef(null);
  const touchStartX = useRef(null);

  const goTo = (index) => {
    if (isAnimating.current) return;
    if (index < 0 || index >= total) return;
    const dir = index > current ? 1 : -1;
    setCurrent([index, dir]);
    isAnimating.current = true;
    setTimeout(() => {
      isAnimating.current = false;
    }, 750);
  };

  useEffect(() => {
    const el = containerRef.current;

    const handleWheel = (e) => {
      const atStart = current === 0 && e.deltaY < 0;
      const atEnd = current === total - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;

      e.preventDefault();
      if (isAnimating.current) return;
      goTo(e.deltaY > 0 ? current + 1 : current - 1);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (touchStartY.current === null) return;
      const diffY = touchStartY.current - e.touches[0].clientY;
      const diffX = Math.abs(touchStartX.current - e.touches[0].clientX);
      if (diffX > Math.abs(diffY)) return;
      const atStart = current === 0 && diffY < 0;
      const atEnd = current === total - 1 && diffY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const diffY = touchStartY.current - e.changedTouches[0].clientY;
      const diffX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);

      if (diffX > Math.abs(diffY) || Math.abs(diffY) < 40) {
        touchStartY.current = null;
        touchStartX.current = null;
        return;
      }

      const atStart = current === 0 && diffY < 0;
      const atEnd = current === total - 1 && diffY > 0;
      if (!atStart && !atEnd) goTo(diffY > 0 ? current + 1 : current - 1);

      touchStartY.current = null;
      touchStartX.current = null;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [current, total]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full top-0 left-0"
        >
          {children[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}