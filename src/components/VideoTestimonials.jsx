"use client";

import React, { useState, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const videos = [
  { id: 1, src: "/Videos/client1.mp4" },
  { id: 2, src: "/Videos/client2.mp4" },
  { id: 3, src: "/Videos/client3.mp4" },
  { id: 4, src: "/Videos/client4.mp4" },
  { id: 4, src: "/Videos/client5.mp4" },
  { id: 4, src: "/Videos/client6.mp4" },
];

const VideoTestimonials = () => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(null);
  const videoRefs = useRef([]);

  const next = () => {
    stopAll();
    setActive((prev) => (prev + 1) % videos.length);
  };

  const prev = () => {
    stopAll();
    setActive((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // 🔥 stop all videos
  const stopAll = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setPlaying(null);
  };

  // ▶ play selected video
  const handlePlay = (index, id) => {
    stopAll();
    setPlaying(id);

    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const getClass = (index) => {
    if (index === active) return "scale-100 opacity-100 z-20 translate-x-0";
    if (index === (active + 1) % videos.length)
      return "translate-x-[60%] scale-90 opacity-70 z-10";
    if (index === (active - 1 + videos.length) % videos.length)
      return "translate-x-[-60%] scale-90 opacity-70 z-10";
    return "scale-75 opacity-0";
  };

  return (
    <section
      className="w-full py-20 flex flex-col items-center"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-main) 0%, var(--bg-soft) 60%, var(--bg-main) 100%)",
      }}
    >
      {/* Heading */}
      <h2
        className=" mb-12 text-center"
        style={{ color: "#fff" }}
      >
        Client Testimonials
      </h2>

      {/* Slider */}
      <div className="relative w-full max-w-6xl h-75 sm:h-100 md:h-125 flex items-center justify-center overflow-hidden">
        {videos.map((video, i) => (
          <div
            key={video.id}
            className={`absolute transition-all duration-500 
            w-55 sm:w-70 md:w-85 h-full 
            rounded-xl overflow-hidden shadow-xl ${getClass(i)}`}
            style={{ backgroundColor: "#051923" }}
          >
            <div className="relative w-full h-full">
              {/* 🎥 Video */}
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={video.src}
                controls={playing === video.id} // ✅ controls only when playing
                className="w-full h-full object-cover"
                playsInline
              />

              {/* ▶ Play Button */}
              {playing !== video.id && (
                <button
                  onClick={() => handlePlay(i, video.id)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: "#118ab2" }}
                  >
                    ▶
                  </div>
                </button>
              )}
            </div>
          </div>
        ))}

        {/* ⬅ Left */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
          w-10 h-10 rounded-full flex items-center justify-center text-white z-30"
          style={{ backgroundColor: "#00509d" }}
        >
          <HiChevronLeft className="text-xl" />
        </button>

        {/* ➡ Right */}
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
          w-10 h-10 rounded-full flex items-center justify-center text-white z-30"
          style={{ backgroundColor: "#00509d" }}
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>
    </section>
  );
};

export default VideoTestimonials;
