"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { href, Link } from "react-router-dom";
import Button from "../components/Button";

// ─── NAV DATA ────────────────────────────────────────────────────────────────
const navItems = [
  {
    name: "Services",
    href: "#",
    mega: true,
    // grouped mega menu — each group has a heading + sublinks
    groups: [
      {
        heading: "SEO",
        href: "/services/seo",
        items: [
          { label: "Ecommerce SEO Service", href: "/services/ecommerce-seo" },
          { label: "Local SEO Service", href: "/services/local-seo" },
          {
            label: "AEO+GEO SEO/AISEO",
            href: "/services/aeo-geo-seo",
            isActive: false,
          },
          { label: "Technical SEO Service", href: "/services/technical-seo" },
          {
            label: "Link Building SEO Service",
            href: "/services/link-building",
            isActive: false,
          },
          {
            label: "App Store SEO Optimization",
            href: "/services/app-store-seo",
            isActive: false,
          },
          { label: "SEO Reseller Service", href: "/services/seo-reseller" },
          {
            label: "White Label SEO Service",
            href: "/services/white-label-seo",
          },
        ],
      },
      {
        heading: "Performance Marketing",
        href: "/services/performance-marketing",

        items: [
          { label: "PPC Ads", href: "/services/ppc-ads" },
          { label: "Meta Ads", href: "/services/meta-ads" },
        ],
      },
      {
        heading: "Website Design & Development",
        href: "/services/website-design-development",

        items: [
          { label: "WordPress Development", href: "/services/wordpress-dev" },
          {
            label: "React Development",
            href: "/services/react-dev",
            isActive: false,
          },
          {
            label: "Custom Website Design",
            href: "/services/custom-design",
            isActive: false,
          },
          {
            label: "Website Redesign Services",
            href: "/services/redesign",
            isActive: false,
          },
          {
            label: "PHP Development",
            href: "/services/php-dev",
            isActive: false,
          },
        ],
      },
      {
        heading: "Local SEO Services",
        href: "/services/local-seo",

        items: [
          { label: "Small Business SEO", href: "/services/small-business-seo" },
          {
            label: "Google My Business Optimization",
            href: "/services/gmb-optimization",
            isActive: false,
          },
        ],
      },

      {
        heading: "Ecommerce Development",
        href: "/services/ecommerce-develop",

        items: [
          { label: "Shopify Development", href: "/services/shopify" },
          {
            label: "WooCommerce Development",
            href: "/services/woocommerce",
            isActive: false,
          },
        ],
      },
      {
        heading: "Social Media Marketing",
        href: "/services/social-media-marketing",

        items: [
          { label: "Social Media Optimization", href: "/services/social-media-optimization" },
          { label: "Social Media Advertising", href: "/services/sma" },
        ],
      },
    ],
  },
  { name: "MM79", href: "/mm79" },
  // {
  //   name: "Industry",
  //   href: "#",
  //   mega: true,
  //   groups: [
  //     {
  //       heading: "Popular Markets",
  //       href: "/industry/popular-markets",
  //       items: [
  //         { label: "Automotive SEO", href: "/industry/automotive-seo" },
  //         { label: "Construction SEO", href: "/industry/construction-seo" },
  //         { label: "Dental SEO", href: "/industry/dental-seo" },
  //         { label: "HVAC SEO", href: "/industry/hvac-seo" },
  //         { label: "Healthcare SEO", href: "/industry/healthcare-seo" },
  //         { label: "Insurance SEO", href: "/industry/insurance-seo" },
  //         { label: "Law Firm SEO", href: "/industry/law-seo" },
  //         { label: "Real Estate SEO", href: "/industry/real-estate-seo" },
  //         { label: "Plumber SEO", href: "/industry/plumber-seo" },
  //       ],
  //     },
  //     {
  //       heading: "Automobile & Home",
  //       href: "/industry/automobile-home",
  //       items: [
  //         { label: "Aviation SEO", href: "/industry/aviation-seo" },
  //         {
  //           label: "Home Remodeling SEO",
  //           href: "/industry/home-remodeling-seo",
  //         },
  //         { label: "Cleaning SEO", href: "/industry/cleaning-seo" },
  //         { label: "Entertainment SEO", href: "/industry/entertainment-seo" },
  //       ],
  //     },
  //     {
  //       heading: "Food & Health",
  //       href: "/industry/food-health",
  //       items: [
  //         { label: "Restaurant SEO", href: "/industry/restaurant-seo" },
  //         { label: "Agriculture SEO", href: "/industry/agriculture-seo" },
  //         { label: "Fitness SEO", href: "/industry/fitness-seo" },
  //         { label: "Kitchen Remodeler SEO", href: "/industry/kitchen-seo" },
  //         { label: "Therapist SEO", href: "/industry/therapist-seo" },
  //         { label: "Catering SEO", href: "/industry/catering-seo" },
  //         { label: "Yoga SEO", href: "/industry/yoga-seo" },
  //         { label: "Pharma SEO", href: "/industry/pharma-seo" },
  //       ],
  //     },
  //     {
  //       heading: "Service Sector",
  //       href: "/industry/service-sector",
  //       items: [
  //         { label: "Daycare SEO", href: "/industry/daycare-seo" },
  //         { label: "Contractors SEO", href: "/industry/contractors-seo" },
  //         { label: "Fire Protection SEO", href: "/industry/fire-seo" },
  //         { label: "Financial SEO", href: "/industry/financial-seo" },
  //         { label: "Pest Control SEO", href: "/industry/pest-seo" },
  //         { label: "Salons SEO", href: "/industry/salon-seo" },
  //         { label: "Veterinary SEO", href: "/industry/veterinary-seo" },
  //       ],
  //     },
  //     {
  //       heading: "Others",
  //       href: "/industry/others",
  //       items: [
  //         { label: "Education SEO", href: "/industry/education-seo" },
  //         { label: "Jewelry SEO", href: "/industry/jewelry-seo" },
  //         { label: "Retail SEO", href: "/industry/retail-seo" },
  //         { label: "Hospitality SEO", href: "/industry/hospitality-seo" },
  //         { label: "Tree Service SEO", href: "/industry/tree-seo" },
  //         { label: "Photography SEO", href: "/industry/photo-seo" },
  //         { label: "Movers SEO", href: "/industry/movers-seo" },
  //         { label: "Cannabis SEO", href: "/industry/cannabis-seo" },
  //         { label: "Travel SEO", href: "/industry/travel-seo" },
  //       ],
  //     },
  //   ],
  // },
  {
    name: "Pricing",
    href: "#",
    mega: true,
    submenu: [
      // { label: "SEO + AI Visibility", href: "/pricing/seo+ai_visibility" },
      { label: "AI-POWERED SEO ", href: "/pricing/seo-powere-by-ai" },
      { label: "SMO ", href: "/pricing/smo" },
      { label: "WEB DEV", href: "/pricing/web" },

      { label: "AEO + GEO", href: "/pricing/aeo+geo" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact-us" },
];

const MenuIcon = ({ size = 20 }) => (
  <img
    src="/logo1.png"
    alt=""
    width={size}
    height={size}
    style={{ objectFit: "contain" }}
  />
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isBall, setIsBall] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const lastScrollY = useRef(0);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const prevSy = lastScrollY.current;
      const scrollingDown = sy > prevSy;
      lastScrollY.current = sy;
      setScrolled(sy > 60);

      if (activeMenu !== null) {
        setIsBall(false);
        return;
      }

      if (scrollingDown && sy > 80) {
        setIsBall(true);
      } else if (!scrollingDown) {
        setIsBall(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeMenu]);

  const handleMouseEnter = (i) => {
    if (isBall) return;
    clearTimeout(leaveTimerRef.current);
    setActiveMenu(i);
  };
  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => setActiveMenu(null), 130);
  };

  const activeMegaItem = activeMenu !== null ? navItems[activeMenu] : null;

  return (
    <>
      <style>
        {`
      
      .mega-scroll::-webkit-scrollbar {
  width: 6px;
}

.mega-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.mega-scroll::-webkit-scrollbar-thumb {
  background: radial-gradient(circle, #118ab2 40%, transparent 40%);
  background-size: 6px 10px;
  border-radius: 10px;
}

/* Firefox */
.mega-scroll {
  scrollbar-width: thin;
  scrollbar-color: #118ab2 transparent;
}
        .nav-font { font-family: 'Lato', sans-serif; }
        .cta-shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.55s ease;
        }
        .cta-shine:hover::after { transform: translateX(100%); }

        #main-navbar {
          position: fixed;
          z-index: 9999;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 64px;
          border-radius: 24px;
          background: rgba(255,255,255,0.97);
          border: 1px solid rgba(0,80,157,0.08);
          box-shadow: 0 4px 24px -4px rgba(0,56,99,0.10);
          backdrop-filter: blur(20px);
          overflow: visible;
          transition:
            top 0.55s cubic-bezier(0.22,1,0.36,1),
            left 0.55s cubic-bezier(0.22,1,0.36,1),
            width 0.55s cubic-bezier(0.22,1,0.36,1),
            height 0.55s cubic-bezier(0.22,1,0.36,1),
            border-radius 0.55s cubic-bezier(0.22,1,0.36,1),
            background 0.45s ease,
            box-shadow 0.45s ease,
            transform 0.55s cubic-bezier(0.22,1,0.36,1),
            border 0.45s ease;
        }
        #main-navbar.is-scrolled {
          top: 8px; width: 95%; height: 56px; border-radius: 16px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(0,80,157,0.14);
          box-shadow: 0 8px 32px -4px rgba(0,56,99,0.14), 0 2px 8px -2px rgba(0,56,99,0.08);
        }
        #main-navbar.is-ball {
          top: 20px; left: 24px; transform: translateX(0);
          width: 62px; height: 62px; border-radius: 50%;
          background: linear-gradient(135deg,#003863 0%,#00509d 50%,#118ab2 100%);
          border: none; box-shadow: 0 8px 32px rgba(0,56,99,0.40);
          backdrop-filter: none; overflow: hidden; cursor: default;
          animation: float-ball 3s ease-in-out infinite;
        }
        @keyframes float-ball {
          0%,100% { box-shadow: 0 8px 32px rgba(0,56,99,0.40); margin-top: 0px; }
          50%      { box-shadow: 0 16px 40px rgba(0,56,99,0.30); margin-top: -5px; }
        }
        #main-navbar.is-ball::before {
          content: ''; position: absolute; inset: -8px; border-radius: 50%;
          border: 2.5px solid rgba(17,138,178,0.55);
          animation: pulse-ring 2s ease-out infinite; pointer-events: none;
        }
        #main-navbar.is-ball::after {
          content: ''; position: absolute; inset: -16px; border-radius: 50%;
          border: 1.5px solid rgba(17,138,178,0.25);
          animation: pulse-ring 2s ease-out infinite 0.4s; pointer-events: none;
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.85); opacity: 0.9; }
          70%  { transform: scale(1.40); opacity: 0; }
          100% { transform: scale(1.40); opacity: 0; }
        }
        .nav-full-content {
          display: flex; justify-content: space-between; align-items: center;
          height: 100%; padding: 0 28px;
          transition: opacity 0.22s ease, transform 0.30s cubic-bezier(0.22,1,0.36,1);
        }
        #main-navbar.is-ball .nav-full-content {
          opacity: 0; transform: scale(0.65); pointer-events: none;
        }
        .ball-logo-wrap {
          position: absolute; inset: 0; display: flex;
          align-items: center; justify-content: center;
          pointer-events: none; opacity: 0;
          transform: scale(0.3) rotate(-30deg);
          transition: opacity 0.35s ease 0.15s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.10s;
        }
        #main-navbar.is-ball .ball-logo-wrap { opacity: 1; transform: scale(1) rotate(0deg); }
        .ball-logo-wrap img { width: 34px; height: 34px; object-fit: contain; filter: brightness(100) saturate(0); }

        /* Mega menu sub-link hover */
        .mega-sublink {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 0;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          font-family: 'Lato', sans-serif;
          transition: color 0.15s ease, padding-left 0.15s ease;
          line-height: 1.4;
        }
        .mega-sublink:hover {
          color: #00509d;
          padding-left: 4px;
        }
        .mega-sublink::before {
          content: '▶';
          font-size: 7px;
          color: #00509d;
          opacity: 0.5;
          flex-shrink: 0;
          transition: opacity 0.15s;
        }
        .mega-sublink:hover::before { opacity: 1; }

        .mobile-overlay {
          position: fixed; inset: 0; z-index: 9997;
          background: rgba(0,23,31,0.40); backdrop-filter: blur(4px);
        }
        .mobile-drawer {
          position: fixed; top: 0; right: 0; width: 320px; height: 100%;
          z-index: 9998; background: #fff;
          box-shadow: -8px 0 48px rgba(0,56,99,0.18); display: flex; flex-direction: column;
        }
      `}
      </style>

      <nav
        id="main-navbar"
        className={`${scrolled && !isBall ? "is-scrolled" : ""} ${isBall ? "is-ball" : ""}`}
      >
        {/* Ball logo */}
        <div className="ball-logo-wrap">
          <img src="/logo1.png" alt="logo" />
        </div>

        {/* Full navbar content */}
        <div className="nav-full-content">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2"
            style={{ textDecoration: "none" }}
          >
            <img
              src="/logo1.png"
              style={{
                height: scrolled ? "24px" : "36px",
                transition: "height 0.5s ease",
              }}
              alt="logo"
            />
            <img
              src="/logo2.png"
              style={{
                height: scrolled ? "24px" : "36px",
                transition: "height 0.5s ease",
              }}
              alt="logo"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-0.5 items-center">
            {navItems
              .filter((item) => item.isActive !== false)
              .map((item, i) => (
                <div
                  key={i}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className="nav-font"
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 16px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: activeMenu === i ? "#00509d" : "#003863",
                      textDecoration: "none",
                      background:
                        activeMenu === i
                          ? "rgba(0,80,157,0.06)"
                          : "transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    {item.name}
                    {item.mega && (
                      <span
                        style={{
                          color: "#00509d",
                          opacity: 0.65,
                          display: "flex",
                          alignItems: "center",
                          transition: "transform 0.25s ease",
                          transform:
                            activeMenu === i
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        <FaChevronDown size={10} />
                      </span>
                    )}
                    {activeMenu === i && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "4px",
                          left: "16px",
                          right: "16px",
                          height: "2px",
                          borderRadius: "999px",
                          background:
                            "linear-gradient(90deg,#003863,#00509d,#118ab2)",
                        }}
                      />
                    )}
                  </Link>
                </div>
              ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Button href="/contact-us">Get Started</Button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="lg:hidden"
            style={{
              padding: "8px",
              borderRadius: "12px",
              color: "#003863",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen(!mobileOpen);
            }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <FaTimes size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="b"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <FaBars size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* ── MEGA MENU — direct child of nav ── */}
        <AnimatePresence>
          {activeMegaItem?.mega && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 99999,
              }}
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className="mega-scroll"
                key={activeMenu}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  // Services = wide grouped, Pricing = narrow simple
                  width: activeMegaItem.groups ? "1200px" : "380px",
                  maxHeight: "80vh", // 👈 IMPORTANT (screen ke hisaab se)
                  overflowY: "auto",

                  borderRadius: "24px",
                  padding: "28px",
                  background: "rgba(255,255,255,0.99)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,80,157,0.10)",
                  boxShadow:
                    "0 24px 64px -8px rgba(0,56,99,0.16), 0 8px 24px -4px rgba(0,80,157,0.10)",
                  position: "relative",
                }}
              >
                {/* top gradient line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                      "linear-gradient(90deg,#003863,#00509d,#118ab2)",
                  }}
                />
                {/* glow blob */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "220px",
                    height: "220px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(17,138,178,0.05) 0%,transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <p
                    className="nav-font"
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#00509d",
                      opacity: 0.55,
                    }}
                  >
                    {activeMegaItem.groups ? "Our Services" : "Our Packages"}
                  </p>
                </div>

                {/* ── SERVICES: grouped layout ── */}
                {activeMegaItem.groups && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      alignItems: "stretch",
                      gap: "28px",
                    }}
                  >
                    {activeMegaItem.groups.map((group, gi) => (
                      <motion.div
                        key={gi}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: gi * 0.04,
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          minHeight: "220px",
                          paddingRight: "16px",
                          borderRight:
                            (gi + 1) % 6 !== 0
                              ? "1px solid rgba(0,80,157,0.07)"
                              : "none",
                        }}
                      >
                        {/* Group heading */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                        >
                          <Link
                            to={group.href || "#"}
                            className="nav-font"
                            style={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#003863",
                              borderBottom: "2px solid rgba(0,80,157,0.15)",
                              paddingBottom: "2px",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            {group.heading}
                          </Link>
                        </div>
                        {/* Sub links */}
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {group.items
                            .filter((item) => item.isActive !== false)
                            .map((item, ii) => (
                              <Link
                                key={ii}
                                to={item.href}
                                className="mega-sublink"
                              >
                                {item.label}
                              </Link>
                            ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── PRICING: simple list ── */}
                {!activeMegaItem.groups && activeMegaItem.submenu && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {activeMegaItem.submenu.map((service, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: j * 0.05,
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          to={service.href}
                          className="nav-font"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 16px",
                            borderRadius: "14px",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#003863",
                            textDecoration: "none",
                            border: "1px solid rgba(0,80,157,0.07)",
                            transition: "all 0.18s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(0,80,157,0.04)";
                            e.currentTarget.style.color = "#00509d";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#003863";
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <span>{service.label}</span>
                          </div>

                          <span style={{ color: "#00509d", fontSize: "14px" }}>
                            →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(0,80,157,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    className="nav-font"
                    style={{ fontSize: "12px", color: "#a0aec0" }}
                  >
                    {activeMegaItem.groups
                      ? "Need a custom solution?"
                      : "Need a custom quote?"}
                  </p>
                  <Link
                    to="/contact-us"
                    className="nav-font"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "6px 14px",
                      borderRadius: "10px",
                      background: "rgba(0,80,157,0.08)",
                      color: "#00509d",
                      textDecoration: "none",
                    }}
                  >
                    Talk to us →
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  height: "4px",
                  background: "linear-gradient(90deg,#003863,#00509d,#118ab2)",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "24px",
                  borderBottom: "1px solid rgba(0,80,157,0.08)",
                }}
              >
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img src="/logo1.png" style={{ height: "28px" }} alt="logo" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#003863",
                    padding: "4px",
                  }}
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                {navItems
                  .filter((item) => item.isActive !== false)
                  .map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.055,
                        duration: 0.32,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {item.submenu || item.groups ? (
                        <div style={{ marginBottom: "4px" }}>
                          <button
                            onClick={() =>
                              setMobileExpanded(mobileExpanded === i ? null : i)
                            }
                            className="nav-font"
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "12px 16px",
                              borderRadius: "16px",
                              fontWeight: 700,
                              color: "#003863",
                              background:
                                mobileExpanded === i
                                  ? "rgba(0,80,157,0.06)"
                                  : "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <span>{item.name}</span>
                            <motion.span
                              animate={{
                                rotate: mobileExpanded === i ? 180 : 0,
                              }}
                              transition={{ duration: 0.22 }}
                              style={{ color: "#00509d", opacity: 0.7 }}
                            >
                              <FaChevronDown size={12} />
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {mobileExpanded === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.28,
                                  ease: "easeInOut",
                                }}
                                style={{ overflow: "hidden" }}
                              >
                                {/* Services grouped */}
                                {item.groups && (
                                  <div
                                    style={{
                                      marginLeft: "12px",
                                      marginTop: "4px",
                                      paddingBottom: "8px",
                                    }}
                                  >
                                    {item.groups.map((group, gi) => (
                                      <div
                                        key={gi}
                                        style={{ marginBottom: "12px" }}
                                      >
                                        <p
                                          className="nav-font"
                                          style={{
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: "#00509d",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            padding: "4px 16px 6px",
                                            opacity: 0.7,
                                          }}
                                        >
                                          {group.icon} {group.heading}
                                        </p>
                                        {group.items
                                          .filter(
                                            (item) => item.isActive !== false,
                                          )
                                          .map((item, ii) => (
                                            <Link
                                              key={si}
                                              to={sub.href}
                                              onClick={() =>
                                                setMobileOpen(false)
                                              }
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "8px 16px",
                                                textDecoration: "none",
                                                borderRadius: "10px",
                                              }}
                                            >
                                              <span
                                                style={{
                                                  fontSize: "7px",
                                                  color: "#00509d",
                                                }}
                                              >
                                                ▶
                                              </span>
                                              <span
                                                className="nav-font"
                                                style={{
                                                  fontSize: "13px",
                                                  fontWeight: 500,
                                                  color: "#374151",
                                                }}
                                              >
                                                {sub.label}
                                              </span>
                                            </Link>
                                          ))}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {/* Pricing simple */}
                                {item.submenu && (
                                  <div
                                    style={{
                                      marginLeft: "12px",
                                      marginTop: "4px",
                                      paddingBottom: "8px",
                                    }}
                                  >
                                    {item.submenu.map((sub, j) => (
                                      <Link
                                        key={j}
                                        to={sub.href}
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          padding: "10px 16px",
                                          textDecoration: "none",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "8px",
                                            flexShrink: 0,
                                            background: "rgba(0,80,157,0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <MenuIcon size={16} />
                                        </div>
                                        <p
                                          className="nav-font"
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 700,
                                            color: "#003863",
                                          }}
                                        >
                                          {sub.label}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div
                          style={{ borderRadius: "16px", marginBottom: "4px" }}
                        >
                          <Link
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="nav-font"
                            style={{
                              display: "flex",
                              padding: "12px 16px",
                              fontWeight: 700,
                              color: "#003863",
                              textDecoration: "none",
                            }}
                          >
                            {item.name}
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>

              <div
                style={{
                  padding: "16px",
                  borderTop: "1px solid rgba(0,80,157,0.08)",
                }}
              >
                <Button href={"/contact-us"}>Get Started</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
