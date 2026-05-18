import React from "react";
import Navbar from "../components/Navbar";
import UltraFooter from "../components/UltraFooter";
import HeroOrbit from "../components/HeroOrbit";
import StaggerTestimonials from "../components/StaggerTestimonials";
import CTAMarquee from "../components/CTAMarquee";
import UltraAnimatedHero from "../components/UltraAnimatedHero";
import VideoTestimonials from "../components/VideoTestimonials";
import { TestimonialData } from "../components/data/TestimonialData";
const Testimonials = () => {
  const servicesData = [
    {
      id: "seo",
      tag: "Growth",
      title: "Search Engine Optimization",
      description:
        "Boost your website rankings with data-driven SEO strategies, on-page optimization, and technical improvements that bring consistent organic traffic.",
      nodes: 9,
    },
    {
      id: "smm",
      tag: "Engagement",
      title: "Social Media Marketing",
      description:
        "Build a strong brand presence across platforms with high-performing content, targeted campaigns, and audience-focused growth strategies.",
      nodes: 7,
    },
    {
      id: "ads",
      tag: "Performance",
      title: "Paid Advertising",
      description:
        "Maximize ROI with highly optimized Google Ads and social media campaigns designed to generate leads, conversions, and measurable growth.",
      nodes: 8,
    },
    {
      id: "web",
      tag: "Experience",
      title: "Website Design & Development",
      description:
        "Create fast, modern, and conversion-focused websites that deliver seamless user experiences and turn visitors into customers.",
      nodes: 10,
    },
    {
      id: "branding",
      tag: "Identity",
      title: "Branding & Creative Design",
      description:
        "Craft a unique brand identity with stunning visuals, strategic messaging, and creative assets that leave a lasting impression.",
      nodes: 6,
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <HeroOrbit
        title={"Our Testimonials"}
        primaryBtnText={"Know More"}
        primaryLink={"/contact-us"}
        secondaryBtnText={"Get In Touch"}
        secondaryLink={"/contact-us"}
      ></HeroOrbit>
     
      <StaggerTestimonials data={TestimonialData}></StaggerTestimonials>
      <VideoTestimonials></VideoTestimonials>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default Testimonials;


