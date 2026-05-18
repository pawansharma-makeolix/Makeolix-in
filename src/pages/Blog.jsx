import React from "react";
import Navbar from "../components/Navbar";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import HeroOrbit from "../components/HeroOrbit";
import CaseStudiesSection from "../components/CaseStudiesSection";
import BlogContent from "../components/BlogContent";

const Blog = () => {
  const blogsData = [
    {
      slug: "how-do-i-choose-the-best-seo",
      image: "/SEO-Reseller-Service-Provide-In-India-MakeOlix-Consulting.webp",
      description:
        "How Do I Choose the Best SEO Reseller Service Provider in India: Complete Guide for Growing Agencies 2026",
      buttonText: "Read More",
      buttonHref: "/blog/how-do-i-choose-the-best-seo",
      buttonVariant: "",
    },
    {
      slug: "top-seo-agencies-in-india",

      image:
        "/5-Top-SEO-Agencies-in-India-to-Boost-Your-Productivity-in-2025-MakeOlix-Consulting.webp",
      description:
        "5 Top SEO Agencies in India to Boost Your Productivity in 2025",
      buttonText: "Read More",
      buttonHref: "/blog/top-seo-agencies-in-india",
      buttonVariant: "",
    },
    {
      slug: "want-more-traffic-sales",
      image: "/Top-E-commerce-SEO-Agency-in-India-MakeOlix-Consulting.webp",
      description:
        "Want More Traffic & Sales? Partner with a Top E-commerce SEO Agency in India",
      buttonText: "Read More",
      buttonHref: "/blog/want-more-traffic-sales",
      buttonVariant: "",
    },
    {
      slug: "how-much-do-seo-companies-charge",
      image: "/How-Much-Do-SEO-Companies-Charge_3.webp",
      description: "How Much Do SEO Companies Charge?",
      buttonText: "Read More",
      buttonHref: "/blog/how-much-do-seo-companies-charge",
      buttonVariant: "",
    },
    {
      slug: "the-role-of-an-seo-company",
      image: "/The-Role-of-an-SEO-Company_BLOG-3.webp",
      description:
        "The Role of an SEO Company in Boosting Your Online Presence",

      buttonText: "Read More",
      buttonHref: "/blog/the-role-of-an-seo-company",
      buttonVariant: "",
    },
  ];
  return (
    <>
      <Navbar></Navbar>
      <HeroOrbit
        title={"Our Blogs"}
        primaryBtnText={"Know More"}
        primaryLink={"/about"}
        secondaryBtnText={"Get In Touch"}
        secondaryLink={"/contact-us"}
      ></HeroOrbit>

      <CaseStudiesSection
        heading="Stories That Inspire Growth"
        subtext="From creative ideas to practical strategies, discover articles that help you understand trends, solve challenges, and build stronger digital experiences."
        cases={blogsData}
        columns={3} // you can change to 2 or 4
      />
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default Blog;
