import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import HeroOrbit from "../components/HeroOrbit";
import IntroText from "../components/IntroText";
import TextMedia from "../components/TextMedia";
import Usp from "../components/Usp";
import StepsSection from "../components/StepsSection";
import CaseStudiesSection from "../components/CaseStudiesSection";
import { BlogData } from "../components/data/BlogData";
import FeaturesSection from "../components/FeaturesSection";
import OtherPageHero from "../components/OtherPageHero";
import BlogContent from "../components/BlogContent";
import FaqVariant from "../components/FaqVariant";

const BlogDetail = () => {
  const { slug } = useParams();

  const pageData = BlogData[slug];

  if (!pageData) {
    return (
      <div
        style={{
          background: "#00171f",
          minHeight: "100vh",
          color: "white",
          padding: "100px 20px",
        }}
      >
        Blog Not Found{" "}
      </div>
    );
  }

  const relatedBlogs = pageData.relatedblogs || [];
  return (
    <>
      <Navbar />

      {pageData.sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return <OtherPageHero key={index} {...section.data} />;

          case "blogcontent":
            return <BlogContent key={index} {...section.data} />;
          case "faq":
            return <FaqVariant key={index} faqs={section.data.faqdata} />;
          default:
            return null;
        }
      })}

      {relatedBlogs.length > 0 && (
        <CaseStudiesSection
          heading="Related Blogs"
          subtext="Explore more articles"
          cases={relatedBlogs.map((item) => ({
            ...item,
            buttonText: "Read More",
            buttonHref: `/blog/${item.slug}`,
            buttonVariant: "",
          }))}
          columns={3}
        />
      )}

      <CTAMarquee />
      <UltraFooter />
    </>
  );
};

export default BlogDetail;
