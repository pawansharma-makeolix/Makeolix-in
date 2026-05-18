import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
const CheckIcon = ({ delay = 0 }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.4, rotate: -18 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{
      delay,
      duration: 0.4,
      type: "spring",
      stiffness: 260,
      damping: 16,
    }}
    whileHover={{
      scale: 1.12,
      rotate: 6,
      transition: { duration: 0.18 },
    }}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#118ab2",
      flexShrink: 0,
    }}
  >
    <FiCheckCircle size={16} />
  </motion.span>
);

const Usp = ({ heading, subheading, statsData = [] }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "#051923",
        padding: "5rem 1.5rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={headingVariants}
        style={{ textAlign: "center", marginBottom: "3rem", maxWidth: 900, margin: "0 auto 3.5rem" }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#118ab2",
            marginBottom: "1rem",
            padding: "4px 14px",
            border: "1px solid rgba(17,138,178,0.3)",
            borderRadius: 99,
          }}
        >
          Why Makeolix
        </span>
        <h2
          style={{
            color: "#ffffff",
            margin: "0 0 0.9rem",
            letterSpacing: "-0.02em",
          }}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            style={{
              fontSize: "1rem",
              color: "#6a96b0",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            {subheading}
          </p>
        )}
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.25rem",
          maxWidth: 1200,
          margin: "0 auto",
          perspective: 1000,
        }}
      >
        {statsData.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.025,
              boxShadow:
                "0 20px 48px rgba(17,138,178,0.18), 0 0 0 1px rgba(17,138,178,0.55)",
              borderColor: "rgba(17,138,178,0.55)",
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{
              background: "#0a2433",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 18,
              padding: "2rem 1.75rem",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            {/* Subtle inner glow top-left */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 180,
                height: 180,
                background:
                  "radial-gradient(ellipse at top left, rgba(17,138,178,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Icon + Tag row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "1.25rem",
              }}
            >
              <CheckIcon />
              {item.tag && (
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#118ab2",
                  }}
                >
                  {item.tag}
                </span>
              )}
            </div>

            {/* Accent bar */}
            <motion.div
              whileHover={{ width: 52 }}
              style={{
                width: 32,
                height: 3,
                borderRadius: 99,
                background: "linear-gradient(90deg, #118ab2, #06d6a0)",
                marginBottom: "1rem",
                transition: "width 0.4s cubic-bezier(.22,1,.36,1)",
              }}
            />

            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#e8f4fa",
                margin: "0 0 0.6rem",
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#5a889e",
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              {item.desc}
            </p>
            {Array.isArray(item.points) && item.points.length > 0 && (
  <motion.ul
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
        },
      },
    }}
    style={{
      listStyle: "none",
      padding: 0,
      margin: "1rem 0 0",
      display: "flex",
      flexDirection: "column",
      gap: "0.65rem",
    }}
  >
    {item.points.map((point, idx) => (
      <motion.li
        key={idx}
        variants={{
          hidden: { opacity: 0, x: -16 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.35,
              ease: "easeOut",
            },
          },
        }}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.55rem",
          fontSize: "0.88rem",
          color: "#b8d7e6",
          lineHeight: 1.6,
        }}
      >
        <span style={{ marginTop: 2 }}>
          <CheckIcon />
        </span>
        {point}
      </motion.li>
    ))}
  </motion.ul>
)}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Usp;



