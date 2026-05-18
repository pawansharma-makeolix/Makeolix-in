"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import Button from "../components/Button";
import { Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
export default function TextMedia({
  title,
  subtitle,
  description,
  image,
  list,
  paymentLink,

  listTitle,
  paragraph2,
  ctaText,
  ctaHref = "/contact-us",
  reverse = false, // 🔥 layout switch
  bgClass = "bg-(--bg-main)", // 🎨 custom background
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImg = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
      website: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await emailjs.send(
        "service_8oqd2qb",
        "template_q7m3znu", // business wali
        {
          formType: "Matrix Maximizer - Get Started",
              website: formData.website || "",

          nameOrCompany: formData.name,
          companyName: formData.name,
          businessEmail: formData.email,
          phone: formData.phone,
        },
        "daTfRauE6dCIypmMo",
      );
      setShowForm(false);

      if (paymentLink) {
        window.open(paymentLink, "_blank", "noopener,noreferrer");
      }

      setFormData({
          website: "",

        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const words = title.split(" ");

  return (
    <section ref={ref} className={`relative py-20 overflow-hidden ${bgClass}`}>
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-(--bg-soft) p-6 md:p-8 overflow-hidden shadow-2xl"
            >
              <motion.div
                animate={{
                  x: [0, 20, -20, 0],
                  y: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-(--blue-2) opacity-20 blur-3xl"
              />

              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
              >
                ×
              </button>

              <div className="relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className=" text-white  mb-2"
                >
                  Get Started
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-(--text-muted) text-sm mb-6"
                >
                  Fill in your details to continue.
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-4">
                 {["website", "name", "email", "phone"].map((field, i) => (
  <motion.div
    key={field}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.12 + i * 0.05 }}
  >
    {field === "phone" ? (
      <PhoneInput
        international
        defaultCountry="IN"
        value={formData.phone}
        onChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            phone: value || "",
          }))
        }
        className="w-full rounded-2xl bg-(--bg-main) border border-white/10 px-4 py-3 text-white outline-none focus:border-(--blue-3)"
        placeholder="Phone Number"
      />
    ) : (
      <motion.input
        type={
          field === "email"
            ? "email"
            : field === "website"
              ? "url"
              : "text"
        }
        name={field}
        required={field !== "website"}
        placeholder={
          field === "website"
            ? "Company Website (https://)"
            : field === "name"
              ? "Your Name"
              : "Email Address"
        }
        value={formData[field]}
        onChange={handleChange}
        className="w-full rounded-2xl bg-(--bg-main) border border-white/10 px-4 py-3 text-white outline-none focus:border-(--blue-3)"
      />
    )}
  </motion.div>
))}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34 }}
                  >
                    <Button type="submit" className="w-full" icon={!loading}>
                      {loading ? "Submitting..." : "Let’s Do This"}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 🌌 ambient glow */}
      <motion.div
        className="absolute w-150 h-150 bg-(--blue-2) opacity-20 blur-[160px] -top-32 -left-32"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* 🎯 spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,138,178,0.15),transparent_70%)]" />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* TEXT */}
        <div className="flex flex-col gap-4">
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.25em] text-(--accent-pink) text-xs"
            >
              {subtitle}
            </motion.p>
          )}

          {/* TITLE */}
          <h2
            className="text-white leading-tight flex flex-wrap"
           
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                }}
                className="mr-2 whitespace-nowrap" // 🔥 important
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {description && (
            <motion.p
              style={{ opacity }}
              className="text-white max-w-LG leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          {listTitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-(--blue-3) text-xs uppercase tracking-[0.18em] font-semibold"
            >
              {listTitle}
            </motion.p>
          )}
          {/* ✅ LIST SUPPORT */}
          {Array.isArray(list) && list.length > 0 && (
            <ul className="max-w-md space-y-3">
              {list.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 text-white"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: i * 0.08 + 0.12,
                      type: "spring",
                      stiffness: 260,
                    }}
                    className="mt-1 shrink-0 w-5 h-5 rounded-full bg-(--blue-2) flex items-center justify-center"
                  >
                    <Check size={12} />
                  </motion.span>

                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* ✅ SECOND PARAGRAPH */}
          {paragraph2 && (
            <p className="text-white max-w-md leading-relaxed">{paragraph2}</p>
          )}

          {/* CTA */}
          {ctaText && (
            <Button className="w-40" onClick={() => setShowForm(true)}>
              {ctaText}
            </Button>
          )}
        </div>

        {/* IMAGE */}
        <motion.div
          style={{ y: yImg }}
          className="relative flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full max-w-105"
          >
            <div className="absolute inset-0 bg-(--blue-3) opacity-20 blur-3xl rounded-2xl" />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <img
                src={image}
                alt="media"
                className="w-full h-105 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#00171f]/70 via-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
