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
import { caseStudiesData } from "../components/data/caseStudiesData";
import FeaturesSection from "../components/FeaturesSection";
import OtherPageHero from "../components/OtherPageHero";

function CaseStudyDetail() {
  const { slug } = useParams();

  const pageData = caseStudiesData[slug];

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
        Case Study Not Found
      </div>
    );
  }

  const relatedCases = pageData.relatedCases || [];

  return (
    <>
      <Navbar />

      {pageData.sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return <OtherPageHero key={index} {...section.data} />;

          case "intro":
            return <IntroText key={index} {...section.data} />;

          case "textmedia":
            return <TextMedia key={index} {...section.data} />;

          case "usp":
            return <Usp key={index} {...section.data} />;
          case "features":
            return <FeaturesSection key={index} {...section.data} />;
          case "steps":
            return <StepsSection key={index} {...section.data} />;

          default:
            return null;
        }
      })}

      {relatedCases.length > 0 && (
        <CaseStudiesSection
          heading="Related Case Studies"
          subtext="Explore more success stories"
          cases={relatedCases.map((item) => ({
            ...item,
            buttonText: "Read More",
            buttonHref: `/case-studies/${item.slug}`,
            buttonVariant: "outline",
          }))}
          columns={3}
        />
      )}

      <CTAMarquee />
      <UltraFooter />
    </>
  );
}

export default CaseStudyDetail;
