import React from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";

const blogs = [
  {
    id: 1,
    slug: "how-do-i-choose-the-best-seo",
    desc: "How Do I Choose the Best SEO Reseller Service Provider in India: Complete Guide for Growing Agencies 2026",
    date: "March 10, 2026",
    service: "SEO Reseller Service",
    img: "/growtika-dQkAdUGCntA-unsplash.jpg",
  },
  {
    id: 2,
    slug: "top-seo-agencies-in-india",

    desc: "5 Top SEO Agencies in India to Boost Your Productivity in 2025",
    date: "October 12, 2025",
    service: "SEO",
    img: "/myriam-jessier-VCtI-0qlVgA-unsplash.jpg",
  },
  {
    id: 3,
    slug: "want-more-traffic-sales",

    desc: "Want More Traffic & Sales? Partner with a Top E-commerce SEO Agency in India",
    date: "September 10, 2025",
    service: "E-commerce",
    img: "/shoper-slLo94wES2M-unsplash (2).jpg",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

export default function BlogSection() {
  return (
    <section className="min-h-screen px-6 py-20 bg-(--bg-soft) text-white overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className=" mb-4 text-white">
          Latest Blogs
        </h2>
        <p className="text-amber-50">Insights, ideas & creativity</p>
      </motion.div>

      {/* Blog Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative rounded-2xl overflow-hidden bg-(--bg-soft) shadow-xl group"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <motion.img
                src={blog.img}
                alt={blog.desc}
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-amber-50 mb-4">{blog.desc}</p>

              <div className="text-xs text-gray-400 mb-2">{blog.date}</div>
              <div className="text-xs text-(--blue-3) mb-4">{blog.service}</div>

              {/* Button */}
              <Button variant="outline" href={`/blog/${blog.slug}`}>
                Read More
              </Button>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none bg-linear-to-tr from-(--accent-pink) to-transparent opacity-0 group-hover:opacity-20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.2 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-16 flex justify-center"
      >
        <Button className="w-50 " href="/blog">
          View More
        </Button>
      </motion.div>

      {/* Floating animation background */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 w-32 h-32 bg-(--blue-2) opacity-10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-(--accent-pink) opacity-10 rounded-full blur-3xl"
      />
    </section>
  );
}
