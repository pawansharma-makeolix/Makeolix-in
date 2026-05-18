import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pricingData = {
  title: "PRICING",
  price: "$1000",
  sections: [
    {
      id: "initial",
      label: null,
      rows: [
        {
          activity: "Prompts Finalization",
          description:
            "Curate and optimize 25 AI prompts aligned with app features, user intent, and conversational AI tone for better engagement and discoverability.",
          quantity: "25 Prompts",
          duration: "One Time",
        },
        {
          activity: "Keywords Research",
          description:
            "Identify relevant keywords to support search visibility and content optimization.",
          quantity: "25 Keywords",
          duration: "One Time",
        },
      ],
    },
    {
      id: "onpage",
      label: "On Page Optimization",
      rows: [
        {
          activity: "Meta Tag Optimization",
          description:
            "Optimize meta titles and descriptions across website and app landing pages to improve click-through rates and strengthen keyword visibility.",
          quantity: "5 Pages",
          duration: "One Time",
        },
        {
          activity: "Header Tag Optimization",
          description:
            "Structure H1–H6 hierarchy for semantic relevance and improved keyword coverage on web-integrated pages.",
          quantity: "5 Pages",
          duration: "One Time",
        },
        {
          activity: "URL Structuring & Hygiene",
          description:
            "Ensure SEO-friendly URLs, proper slugs, and hierarchy for easy crawling and indexing.",
          quantity: "5 Pages",
          duration: "One Time",
        },
        {
          activity: "Internal Linking Strategy",
          description:
            "Add contextual linking flow to distribute authority across pages and enhance user navigation.",
          quantity: "5 Pages",
          duration: "One Time",
        },
        {
          activity: "Alt Text for Images",
          description:
            "Add keyword-rich descriptive alt text for all app-related and blog images to improve image search visibility.",
          quantity: "5 Pages",
          duration: "One Time",
        },
        {
          activity: "Breadcrumb Optimization",
          description:
            "Implement breadcrumbs for better navigation and improved SERP display.",
          quantity: "✓",
          duration: "One Time",
        },
        {
          activity: "Keyword Mapping to Pages/SKUs",
          description:
            "Assign targeted keywords to specific web pages for focused optimization.",
          quantity: "✓",
          duration: "One Time",
        },
        {
          activity: "Schema Markup (FAQ, Product, Blog)",
          description: "Ensure structured data for AI relevance.",
          quantity: "5 Pages",
          duration: "One Time",
        },
      ],
    },
    {
      id: "content",
      label: "Content Optimization",
      rows: [
        {
          activity: "Internal Pages Optimization for AI",
          description: "Optimize internal content for AI queries.",
          quantity: "5 Pages",
          duration: "One Time",
        },
        {
          activity: "Blogs",
          description:
            "AI-optimized blogs focusing on topical questions or insights.",
          quantity: "2 Blogs",
          duration: "Month on Month",
        },
        {
          activity: "Local Focused Blog",
          description: "Locally relevant blog content.",
          quantity: "2",
          duration: "Month on Month",
        },
      ],
    },



    {
      id: "content",
      label: "GMB Optimization",
      rows: [
        {
          activity: "Setup & Optimise Google My Business (GMB)",
          description: "Setup and optimization.",
          quantity: "Up to 5",
          duration: "One Time",
        },
        {
          activity: "Ensure NAP Consistency",
          description:
            "Consistent Name, Address, Phone across listings.",
          quantity: "1",
          duration: "One Time",
        },
        {
          activity: "Local Keyword Research",
          description: "Identify high-intent localized keywords.",
          quantity: "10",
          duration: "One Time",
        },
        {
          activity: "Directory Listings/Optimization",
          description: "Verified and optimized directory submissions.",
          quantity: "5",
          duration: "Month On Month",
        },
        {
          activity: "Review Management & Addition",
          description: "Collect and publish customer reviews.",
          quantity: "10",
          duration: "Month On Month",
        },
      ],
    },




    {
      id: "competitor",
      label: "Competitor Analysis Report",
      rows: [
        {
          activity: "Competitor Analysis Report",
          description: "Consolidated insights covering 4 competitors.",
          quantity: "3 Competitors",
          duration: "Quarterly",
        },
        {
          activity: "Competitor Backlink Analysis",
          description:
            "Identify and replicate strong competitor links.",
          quantity: "3 Competitors",
          duration: "Quarterly",
        },
        {
          activity: "Monthly Performance Report",
          description: "Monthly SEO performance summary.",
          quantity: "1",
          duration: "Monthly",
        },
       
      ],
    },


    {
      id: "offpage",
      label: "Off Page Optimization",
      rows: [
        {
          activity: "Social Bookmarking Links",
          description: "Promote key pages for faster indexing and visibility.",
          quantity: "20",
          duration: "Month on Month",
        },
        {
          activity: "Profile Creation Links",
          description: "Build branded profiles for trust and authority.",
          quantity: "10",
          duration: "Month on Month",
        },
        {
          activity: "Classified Submissions",
          description: "Share app or service listings for referral traffic.",
          quantity: "10",
          duration: "Month on Month",
        },
        {
          activity: "Content Syndication",
          description: "Republish blogs on high DA platforms for reach.",
          quantity: "2",
          duration: "Month on Month",
        },
        {
          activity: "Listing in Online Communities",
          description: "Create optimized listings on relevant platforms.",
          quantity: "6",
          duration: "Month on Month",
        },
        {
          activity: "Encourage Reviews on Online Communities",
          description: "Acquire user reviews through campaigns.",
          quantity: "5 reviews",
          duration: "Month on Month",
        },
        {
          activity: "Answers on Reddit/Quora",
          description: "High-intent answers with backlinks to website.",
          quantity: "5 answers each",
          duration: "Month on Month",
        },
      
        {
          activity: "Industry Specific Backlink",
          description: "High-authority links from AI and tech-specific platforms for niche relevance and authority.",
          quantity: "8",
          duration: "Month on Month",
        },
      
        {
          activity: "Competitor BAcklink",
          description: "Inclusion in category-specific lists.",
          quantity: "5",
          duration: "Month on Month",
        },
      
        {
          activity: "Reviews Backlink",
          description: "Blogger/review collaborations.",
          quantity: "3",
          duration: "Month on Month",
        },
        {
          activity: "Comparisons Backlink",
          description: "Comparative content with competitors.",
          quantity: "3",
          duration: "Month on Month",
        },
        {
          activity: "Local Focused Backlink",
          description: "Locally relevant backlinks.",
          quantity: "4",
          duration: "Month on Month",
        },
      
       
      ],
    },
  ],
};

/* floating ambient particles */
function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: i % 4 === 0 ? 4 : 2,
            height: i % 4 === 0 ? 4 : 2,
            borderRadius: "50%",
            left: `${5 + (i * 4.7) % 90}%`,
            top: `${10 + (i * 7.3) % 80}%`,
            backgroundColor: i % 3 === 0 ? "#118ab2" : i % 3 === 1 ? "#00509d" : "#ff8fab",
          }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{
            duration: 3.5 + (i % 4) * 0.8,
            repeat: Infinity,
            delay: (i % 6) * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* counting price animation */
function AnimatedPrice({ value }) {
  const target = parseInt(value.replace(/\D/g, ""));
  const [count, setCount] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = Math.ceil(target / 45);
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(cur);
    }, 28);
    return () => clearInterval(id);
  }, [target]);
  return <>${count}</>;
}

/* duration badge */
function DurationBadge({ text }) {
  const monthly = text?.toLowerCase().includes("month");
  return (
    <motion.span
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420 }}
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        cursor: "default",
        userSelect: "none",
        background: monthly
          ? "linear-gradient(135deg,#1a0a10,#2a0f1a)"
          : "linear-gradient(135deg,#051923,#003863)",
        color: monthly ? "#ff8fab" : "#118ab2",
        border: `1px solid ${monthly ? "#ff8fab44" : "#118ab244"}`,
      }}
    >
      {text}
    </motion.span>
  );
}

/* quantity chip */
function QuantityChip({ text }) {
  const isCheck = text === "✓";
  return (
    <motion.span
      whileHover={{ scale: 1.18, rotate: isCheck ? 8 : 0 }}
      transition={{ type: "spring", stiffness: 500 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        cursor: "default",
        userSelect: "none",
        ...(isCheck
          ? { fontSize: 20, color: "#118ab2", filter: "drop-shadow(0 0 8px #118ab277)" }
          : {
              fontSize: 12,
              padding: "3px 10px",
              borderRadius: 6,
              background: "#00171f",
              color: "#118ab2",
              border: "1px solid #118ab233",
              whiteSpace: "nowrap",
            }),
      }}
    >
      {text}
    </motion.span>
  );
}

/* section label row */
function SectionHeader({ label }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45 }}
    >
      <td colSpan={4} style={{ padding: "28px 16px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              height: 1,
              flex: 1,
              background: "linear-gradient(to right,#00509d99,transparent)",
              transformOrigin: "left",
            }}
          />
          <motion.span
            whileHover={{ letterSpacing: "0.22em", color: "#118ab2" }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: 10,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#00509d",
              padding: "5px 16px",
              borderRadius: 99,
              border: "1px solid #00509d44",
              background: "linear-gradient(135deg,#003863cc,#051923cc)",
              cursor: "default",
            }}
          >
            {label}
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
              height: 1,
              flex: 1,
              background: "linear-gradient(to left,#00509d99,transparent)",
              transformOrigin: "right",
            }}
          />
        </div>
      </td>
    </motion.tr>
  );
}

/* thin shimmer divider */
function RowDivider() {
  return (
    <tr>
      <td colSpan={4} style={{ padding: 0 }}>
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#00509d20 30%,#118ab218 70%,transparent)" }} />
      </td>
    </tr>
  );
}

/* data row */
function PricingRow({ row, index, isEven }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.tr
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-8px" }}
      transition={{ duration: 0.42, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(90deg,#00509d1a 0%,#00509d0a 55%,transparent 100%)"
          : isEven ? "#051923" : "#040f16",
        transition: "background 0.22s ease",
        cursor: "default",
      }}
    >
      {/* left accent bar cell */}
      <td style={{ width: 3, padding: 0, position: "relative" }}>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute",
                inset: 0,
                width: 3,
                borderRadius: "0 2px 2px 0",
                background: "linear-gradient(180deg,#118ab2,#003863)",
                transformOrigin: "center",
              }}
            />
          )}
        </AnimatePresence>
      </td>

      {/* Activity name */}
      <td style={{ padding: "15px 16px 15px 10px", verticalAlign: "top" }}>
        <motion.div
          animate={{ color: hovered ? "#62c6e8" : "#a0b4c4" }}
          transition={{ duration: 0.18 }}
          style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.35 }}
        >
          {row.activity}
        </motion.div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                height: 2,
                marginTop: 5,
                borderRadius: 2,
                background: "linear-gradient(90deg,#118ab2,#003863)",
                transformOrigin: "left",
              }}
            />
          )}
        </AnimatePresence>
      </td>

      {/* Description */}
      <td style={{ padding: "15px 16px", verticalAlign: "top" }}>
        <motion.p
          animate={{ opacity: hovered ? 0.9 : 0.5 }}
          transition={{ duration: 0.18 }}
          style={{ fontSize: 14, lineHeight: 1.65, color: "#8a9eb0", margin: 0 }}
        >
          {row.description}
        </motion.p>
      </td>

      {/* Quantity */}
      <td style={{ padding: "15px 12px", verticalAlign: "middle", textAlign: "center" }}>
        {row.quantity && <QuantityChip text={row.quantity} />}
      </td>

      {/* Duration */}
      
    </motion.tr>
  );
}

/* ── MAIN COMPONENT ── */
export default function SEOPricingTable() {
  let idx = 0;
  const totalRows = pricingData.sections.reduce((a, s) => a + s.rows.length, 0);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-main, #00171f)", padding: "52px 20px" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 44, position: "relative" }}>
        <Particles />

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.32em" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ fontSize: 11, fontWeight: 700, color: "#00509d", textTransform: "uppercase", letterSpacing: "0.32em", margin: "0 0 6px" }}
        >
          Scope of Work
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -22, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{  color: "#fff", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}
        >
          {pricingData.title}
        </motion.h1>

        {/* animated line */}
        <div style={{ display: "flex", justifyContent: "center", margin: "14px 0 16px" }}>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
            style={{ height: 1, background: "linear-gradient(90deg,transparent,#118ab2,transparent)" }}
          />
        </div>

        {/* price pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55, type: "spring", stiffness: 220, damping: 16 }}
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 5,
            padding: "12px 32px",
            borderRadius: 16,
            background: "linear-gradient(135deg,#003863,#001c35)",
            border: "1px solid #00509d55",
            position: "relative",
          }}
        >
          {/* pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: 22,
              border: "1px solid #118ab244",
              pointerEvents: "none",
            }}
          />
          <span style={{ fontSize: 44, fontWeight: 900, color: "#118ab2", lineHeight: 1 }}>
            <AnimatedPrice value={pricingData.price} />
          </span>
          <span style={{ fontSize: 14, color: "#6a8090", fontWeight: 500 }}>/month</span>
        </motion.div>
      </div>

      {/* TABLE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #00509d2a",
          background: "#051923",
          boxShadow: "0 0 90px #00509d12, 0 4px 50px #00000055",
          borderRadius: 20,
  overflowX: "auto",
  overflowY: "hidden",
  WebkitOverflowScrolling: "touch",
  border: "1px solid #00509d2a",
  background: "#051923",
  boxShadow: "0 0 90px #00509d12, 0 4px 50px #00000055",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" , minWidth:760 }}>
          <colgroup>
  <col style={{ width: 3 }} />
  <col style={{ width: "24%" }} />
  <col />
  <col style={{ width: "14%" }} />
</colgroup>

          <thead>
            <tr style={{ background: "linear-gradient(135deg,#003863,#002040)" }}>
              <th style={{ padding: 0, width: 3 }} />
              {["Activity", "Scope of Work / Description", "Quantity"].map((col, i) => (
                <motion.th
                  key={col}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.07, duration: 0.38 }}
                  style={{
                    padding: "16px 16px",
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#7ec8e3",
                    textAlign: i >= 2 ? "center" : "left",
                    borderBottom: "1px solid #00509d44",
                  }}
                >
                  {col}
                </motion.th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pricingData.sections.map((section, si) => (
              <>
                {section.label && <SectionHeader key={`sh-${si}`} label={section.label} />}
                {section.rows.map((row, ri) => {
                  const rowIdx = idx++;
                  return (
                    <>
                      <PricingRow key={`${section.id}-${ri}`} row={row} index={rowIdx} isEven={rowIdx % 2 === 0} />
                      {rowIdx < totalRows - 1 && <RowDivider key={`div-${rowIdx}`} />}
                    </>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>

        {/* footer legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderTop: "1px solid #00509d22",
            background: "linear-gradient(135deg,#002244,#00171f)",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
         
          <span style={{ fontSize: 11, color: "#354a57" }}>All activities subject to scope confirmation</span>
        </motion.div>
      </motion.div>
    </div>
  );
}