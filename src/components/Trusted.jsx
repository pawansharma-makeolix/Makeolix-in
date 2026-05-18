import React from "react";

const Trusted = () => {
  const clientLogos = [
    "/logos/client1.png",
    "/logos/client2.png",
    "/logos/client3.png",
    "/logos/client4.png",
    "/logos/client5.png",
    "/logos/client6.png",
    "/logos/client7.png",
    "/logos/client8.png",
    "/logos/client9.png",
  ];

  const partnerLogos = [
    "/logos/partner1.jpg",
    "/logos/partner2.jpg",
    "/logos/partner3.jpg",
    "/logos/partner4.jpg",
    "/logos/partner5.jpg",
    "/logos/partner6.jpg",
    "/logos/partner7.jpg",
    "/logos/partner8.jpg",
  ];

  return (
    <section className="py-20 bg-[var(--bg-soft)] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16">
        {/* 🔹 CLIENTS */}
        <div>
          <h2 className=" mb-8 text-center">
            Trusted by 1,000+ leading businesses
          </h2>

          <div className="overflow-hidden relative">
            {/* Fade Mask */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[var(--bg-soft)] to-transparent z-10" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[var(--bg-soft)] to-transparent z-10" />

            <div className="flex gap-10 animate-scroll-fast whitespace-nowrap hover:[animation-play-state:paused]">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="client logo"
                  className="h-14 object-contain opacity-70 hover:opacity-100 
                  transition-all duration-300 transform-gpu
                  hover:scale-105
                  bg-white rounded-xl p-2 shadow-md will-change-transform"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 PARTNERS */}
        <div>
          <h2 className=" mb-8 text-center">
            Trusted Partners
          </h2>

          <div className="overflow-hidden relative">
            {/* Fade Mask */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[var(--bg-soft)] to-transparent z-10" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[var(--bg-soft)] to-transparent z-10" />

            <div className="flex gap-10 animate-scroll-reverse-fast whitespace-nowrap hover:[animation-play-state:paused]">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="partner logo"
                  className="h-14 object-contain opacity-70 hover:opacity-100 
                  transition-all duration-300 transform-gpu
                  hover:scale-105
                  bg-white rounded-xl p-2 shadow-md will-change-transform"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
