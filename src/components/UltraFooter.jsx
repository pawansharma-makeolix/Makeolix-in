import React from "react";
import { motion } from "framer-motion";
import { CardSpotlight } from "./card-spotlight";
import FooterBlob from "../components/FooterBlob";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function UltraFooter() {
  const cities = [
    { name: "Austin", path: "/austin" },
    { name: "Charlotte", path: "/charlotte" },
    { name: "Columbus", path: "/columbus" },
    { name: "Denver", path: "/denver" },
    { name: "Indianapolis", path: "/indianapolis" },
    { name: "Los Angeles", path: "/los-angeles" },
    { name: "New York", path: "/new-york" },
    { name: "Phoenix", path: "/phoenix" },
    { name: "San Diego", path: "/san-diego" },
    { name: "Seattle", path: "/seattle" },
    { name: "Boston", path: "/boston" },
    { name: "Chicago", path: "/chicago" },
    { name: "Dallas", path: "/dallas" },
    { name: "Houston", path: "/houston" },
    { name: "Jacksonville", path: "/jacksonville" },
    { name: "Miami", path: "/miami" },
    { name: "Philadelphia", path: "/philadelphia" },
    { name: "San Antonio", path: "/san-antonio" },
    { name: "San Francisco", path: "/san-francisco" },
    { name: "Toronto", path: "/toronto" },
  ];
  return (
    <footer className="relative bg-(--bg-main) text-white pt-20 overflow-hidden">
      <FooterBlob />

      {/* CTA + FORM */}

      {/* SERVICE AREAS */}
      <div className="border-t border-gray-700 pt-6 pb-10 overflow-hidden">
        <h4 className="text-center text-(--blue-3) mb-4">Service Areas</h4>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap text-sm text-(--text-muted)"
        >
          {Array(2)
            .fill(cities)
            .flat()
            .map((city, i) => (
              <motion.div key={i} whileHover={{ scale: 1.15 }}>
                <Link to={city.path} className="transition hover:text-white">
                  {city.name}
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-10 mb-16">
        <div>
          <h3 className=" mb-4 text-(--blue-3)">About MakeOlix</h3>
          <p className="text-sm text-(--text-muted)">
            At MakeOlix, we are passionate about propelling your brand to new
            heights through innovative digital marketing strategies. With a
            dedicated team of experts, we craft compelling campaigns tailored to
            your unique needs.
          </p>

          <div className="flex gap-4 mt-6">
            {[
              {
                Icon: FaFacebookF,
                url: "https://www.facebook.com/makeolixconsulting",
              },
              {
                Icon: FaInstagram,
                url: "https://www.instagram.com/makeolix_consulting",
              },
              {
                Icon: FaLinkedinIn,
                url: "https://www.linkedin.com/company/makeolix-consulting-inc/",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 8 }}
                className="p-3 bg-(--bg-soft) rounded-full hover:bg-(--blue-2)"
              >
                <social.Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-(--blue-2)">Our Company</h4>
          <ul className="space-y-2 text-sm text-(--text-muted)">
            {[
              "Home",
              "About Us",
              "Testimonials",
              "Case Studies",
              "Blog",
              "Contact Us",
            ].map((item, i) => {
              // Create the proper links based on the page name
              const linkPaths = {
                Home: "/",
                "About Us": "/about",
                "Contact Us": "/contact-us",
                Testimonials: "/testimonials",
                "Case Studies": "/case-studies",
                Blog: "/blog",
              };
              return (
                <motion.li key={i} whileHover={{ x: 6 }}>
                  <Link to={linkPaths[item]} className="hover:text-white">
                    {item}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-(--blue-2)">Our Services</h4>
          <ul className="space-y-2 text-sm text-(--text-muted)">
            {[
              "SEO",
              "Performance Marketing",
              "Website Design & Development",
              "Local SEO Services",
              "Ecommerce Development",
              "Social Media Marketing",
            ].map((item, i) => {
              // Create the proper links based on the page name
              const linkPaths = {
                SEO: "/services/seo",
                "Performance Marketing": "/services/performance-marketing",
                "Website Design & Development":
                  "/services/website-design-development",
                "Local SEO Services": "/services/local-seo",
                "Ecommerce Development": "/services/ecommerce-develop",
                "Social Media Marketing": "/services/social-media-marketing",
              };
              return (
                <motion.li key={i} whileHover={{ x: 6 }}>
                  <Link to={linkPaths[item]} className="hover:text-white">
                    {item}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-(--blue-2)">Contact Us</h4>

          <div className="flex gap-2 items-center mb-2">
            <FaEnvelope />
            <a
              href="mailto:contactus@makeolix.com"
              className="hover:text-white"
            >
              contactus@makeolix.com
            </a>
          </div>

          <div className="flex gap-2 items-center">
            <FaPhoneAlt />
            <a href="tel:+911204537874" className="hover:text-white">
              +91 1204537874
            </a>
          </div>
        </div>
      </div>

      {/* OFFICES */}
      <div className="border-t border-gray-700 py-10 overflow-hidden">
        <h4 className="text-center text-(--blue-3) mb-6">Our Offices</h4>

        <div className="flex flex-wrap justify-center gap-8">
          {Array(1)
            .fill([
              {
                img: "/Usflag.webp",
                address: "8 The Green, STE B Dover, DE 19901",
                mail: "contactus@makeolix.com",
                phone: "+91 1204537874",
              },
              {
                img: "/indianflag.png",
                address: "Suite G-02, H-143, Sector 63, Noida",
                mail: "contactus@makeolix.com",
                phone: "+91 1204537874",
              },

              {
                img: "/uaeflag.webp",
                address: "Arriving soon",
                mail: "contactus@makeolix.com",
              },
            ])
            .flat()
            .map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-(--bg-soft) p-4 rounded-xl min-w-70 border border-gray-700 hover:shadow-2xl"
              >
                <img
                  src={item.img}
                  className="mb-3 rounded w-8 h-7 object-cover"
                />

                <div className="flex gap-2 items-center text-sm mb-1">
                  <FaMapMarkerAlt />
                  {item.address}
                </div>

                <div className="flex gap-2 items-center text-sm mb-1">
                  <FaEnvelope />
                  <a href={`mailto:${item.mail}`} className="hover:text-white">
                    {item.mail}
                  </a>
                </div>

                {item.phone && (
                  <div className="flex gap-2 items-center text-sm">
                    <FaPhoneAlt />
                    <a href={`tel:${item.phone}`} className="hover:text-white">
                      {item.phone}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
        </div>
      </div>

      <div className="text-center text-sm text-(--text-muted) py-6 border-t border-gray-700">
        © 2026 MakeOlix Consulting Pvt Ltd. All Rights Reserved
      </div>
    </footer>
  );
}
