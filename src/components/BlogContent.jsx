import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Scroll-triggered wrapper ─────────────────────────────────────────
const ScrollReveal = ({
  children,
  variants = fadeUp,
  custom = 0,
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={custom}
    >
      {children}
    </motion.div>
  );
};

// ── Block Components ─────────────────────────────────────────────────

const H2Block = ({ text, index }) => (
  <ScrollReveal custom={index} className="relative mt-14 mb-5">
    <motion.div
      className="absolute -left-5 top-0 h-full w-1 rounded-full"
      style={{ background: "var(--blue-3)" }}
      initial={{ scaleY: 0, originY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
    <h2
      className=" leading-tight pl-4"
      style={{ color: "#ffffff" }}
    >
      {text}
    </h2>
  </ScrollReveal>
);

const H3Block = ({ text, index }) => (
  <ScrollReveal custom={index} className="mt-10 mb-4">
    <h3
      className="tracking-wide"
      style={{ color: "var(--blue-3)" }}
    >
      {text}
    </h3>
  </ScrollReveal>
);

const ParaBlock = ({ text, index }) => (
  <ScrollReveal custom={index} className="mb-5">
    <p
      className="text-base leading-relaxed"
      style={{ color: "var(--text-muted)" }}
    >
      {text}
    </p>
  </ScrollReveal>
);

const BoldParaBlock = ({ boldText, normalText, index }) => (
  <ScrollReveal custom={index} className="mb-5">
    <p
      className="text-base leading-relaxed"
      style={{ color: "var(--text-muted)" }}
    >
      <strong style={{ color: "#ffffff", fontWeight: 600 }}>{boldText} </strong>
      {normalText}
    </p>
  </ScrollReveal>
);

const ImageBlock = ({ src, alt, caption, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.figure
      ref={ref}
      className="my-10 overflow-hidden rounded-2xl"
      style={{ border: "1px solid rgba(17,138,178,0.18)" }}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          className="w-full object-cover"
          style={{ maxHeight: "480px" }}
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : { scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {caption && (
        <motion.figcaption
          className="text-center text-xs py-3 px-4 italic"
          style={{
            color: "var(--text-muted)",
            background: "rgba(0,23,31,0.7)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {caption}
        </motion.figcaption>
      )}
    </motion.figure>
  );
};

const ListBlock = ({ items, heading, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="my-6">
      {heading && (
        <motion.p
          className="text-base font-semibold mb-3"
          style={{ color: "var(--blue-3)" }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
        >
          {heading}
        </motion.p>
      )}
      <motion.ul
        className="space-y-3 pl-1"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
            variants={slideLeft}
            custom={i}
          >
            <motion.span
              className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
              style={{ background: "var(--blue-3)" }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{
                delay: i * 0.07 + 0.1,
                type: "spring",
                stiffness: 300,
              }}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

const NumberedListBlock = ({ items }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.ol
      ref={ref}
      className="my-6 space-y-3 pl-1"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          className="flex items-start gap-4 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
          variants={slideLeft}
          custom={i}
        >
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
            style={{
              background: "rgba(17,138,178,0.15)",
              color: "var(--blue-3)",
              border: "1px solid rgba(17,138,178,0.3)",
            }}
          >
            {i + 1}
          </span>
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
};

const StepsBlock = ({ items }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="my-8 space-y-4">
      {items.map((step, i) => (
        <motion.div
          key={i}
          className="relative flex gap-5 rounded-xl p-5 group"
          style={{
            background: "rgba(5,25,35,0.7)",
            border: "1px solid rgba(17,138,178,0.12)",
          }}
          variants={fadeUp}
          custom={i}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          whileHover={{
            borderColor: "rgba(17,138,178,0.4)",
            background: "rgba(5,25,35,0.95)",
            transition: { duration: 0.2 },
          }}
        >
          {/* Number badge */}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--blue-2), var(--blue-3))",
              color: "#ffffff",
            }}
          >
            {i + 1}
          </div>

          <div className="flex-1 min-w-0">
            <h4
              className="font-semibold text-base mb-1"
              style={{ color: "#ffffff" }}
            >
              {step.title}
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {step.description}
            </p>
          </div>

          {/* Animated left glow line on hover */}
          <motion.div
            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
            style={{ background: "var(--blue-3)" }}
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1 }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const DividerBlock = () => (
  <ScrollReveal className="my-10">
    <motion.div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent, var(--blue-3), transparent)",
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  </ScrollReveal>
);

const QuoteBlock = ({ text, index }) => (
  <ScrollReveal custom={index} className="my-8">
    <blockquote
      className="relative pl-6 pr-4 py-4 rounded-r-xl italic text-base leading-relaxed"
      style={{
        borderLeft: "3px solid var(--blue-3)",
        background: "rgba(17,138,178,0.07)",
        color: "var(--text-muted)",
      }}
    >
      {text}
    </blockquote>
  </ScrollReveal>
);

// ── Main BlogContent Component ────────────────────────────────────────
const BlogContent = ({ blocks = [] }) => {
  return (
    <section
      className="w-full py-12 px-4"
      style={{ background: "var(--bg-main)" }}
    >
      <div className="max-w-3xl mx-auto">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "h2":
              return <H2Block key={i} text={block.text} index={i} />;

            case "h3":
              return <H3Block key={i} text={block.text} index={i} />;

            case "para":
              return <ParaBlock key={i} text={block.text} index={i} />;

            case "boldpara":
              return (
                <BoldParaBlock
                  key={i}
                  boldText={block.boldText}
                  normalText={block.normalText}
                  index={i}
                />
              );

            case "image":
              return (
                <ImageBlock
                  key={i}
                  src={block.src}
                  alt={block.alt}
                  caption={block.caption}
                  index={i}
                />
              );

            case "list":
              return (
                <ListBlock
                  key={i}
                  items={block.items}
                  heading={block.heading}
                  index={i}
                />
              );

            case "numberedlist":
              return <NumberedListBlock key={i} items={block.items} />;

            case "steps":
              return <StepsBlock key={i} items={block.items} />;

            case "divider":
              return <DividerBlock key={i} />;

            case "quote":
              return <QuoteBlock key={i} text={block.text} index={i} />;

            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default BlogContent;
