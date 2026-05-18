import React from "react";
import { SeoAiVisibilityData } from "../components/data/SeoAiVisibilityData";
import PriceSection from "../components/PriceSection";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import Navbar from "../components/Navbar";
import HeroOrbit from "../components/HeroOrbit";
const SeoAiVisibility = () => {
  return (
    <>
      <Navbar></Navbar>
      <HeroOrbit
        title={"SEO + AI Visibility"}
        primaryBtnText={"Discuss With Us"}
        primaryLink={"/contact-us"}
        secondaryBtnText={"Know More"}
        secondaryLink={"/about"}
      ></HeroOrbit>
      <PriceSection
        plans={SeoAiVisibilityData}
        title="SMO Packages"
        subtitle="Best for ranking"
        alwaysExpanded={true}
        buttonWidth="220px"
      ></PriceSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default SeoAiVisibility;
