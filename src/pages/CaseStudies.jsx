import React from "react";
import Navbar from "../components/Navbar";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import HeroOrbit from "../components/HeroOrbit";
import CaseStudiesGrid from "../components/CaseStudiesGrid";
import CaseStudiesSection from "../components/CaseStudiesSection";
function CaseStudies() {
  const caseData = [
    {
      slug: "africa-direct",
      image: "/About-the-Client-600x400-1.webp",
      description:
        "How MakeOlix Consulting Drove a 22% Visibility Surge & 17% More Clicks for Africa Direct in 3 Months",
      buttonText: "Read More",
      buttonHref: "/case-studies/africa-direct",
      buttonVariant: "outline",
    },
    {
      slug: "crowberry-wood",

      image: "/image-Case-Studies-Crowberry-Wood-600x400-1.webp",
      description:
        "How Crowberry Wood Achieved a 512% Increase in Organic Traffic and 9X Growth in Clicks in 12 Months",
      buttonText: "Read More",
      buttonHref: "/case-studies/crowberry-wood",
      buttonVariant: "outline",
    },
    {
      slug: "heartland-bunkies",
      image: "/About-the-Brand-2-600x400-1.webp",
      description:
        "How Heartland Bunkies Achieved 1,300% Growth in Organic Users , 12X Increase in Organic Traffic with SEO",
      buttonText: "Read More",
      buttonHref: "/case-studies/heartland-bunkies",
      buttonVariant: "outline",
    },
    {
      slug: "west-coast-belts",
      image: "/About-the-Brand-1-600x400-1.webp",
      description:
        "How West Coast Belts Scaled Organic Revenue by 130% and Improved Search Visibility in 6 Months",
      buttonText: "Read More",
      buttonHref: "/case-studies/west-coast-belts",
      buttonVariant: "outline",
    },
    {
      slug: "weathered",
      image: "/MSEO-Case-Study-–-Weathered-Not-Worn.webp",
      description: "SEO Case Study – Weathered Not Worn",

      buttonText: "Read More",
      buttonHref: "/case-studies/weathered",
      buttonVariant: "outline",
    },
    {
      slug: "aitkens-pewter",
      image: "/MSEO-Case-Study-–-Aitkens-Pewter-1.webp",
      description: "SEO Case Study – Aitkens Pewter",
      buttonText: "Read More",
      buttonHref: "/case-studies/aitkens-pewter",
      buttonVariant: "outline",
    },
    {
      slug: "grell-watson",
      image: "/MSEO-Case-Study-–-Greel-Watson-Patent-Attorneys-1.webp",
      description: "SEO Case Study – Grell & Watson Patent Attorneys",
      buttonText: "Read More",
      buttonHref: "/case-studies/grell-watson",
      buttonVariant: "outline",
    },
  ];
  return (
    <>
      <Navbar></Navbar>
      <HeroOrbit
        title={"Our Case Studies"}
        primaryBtnText={"Know More"}
        primaryLink={"/about"}
        secondaryBtnText={"Get In Touch"}
        secondaryLink={"/contact-us"}
      ></HeroOrbit>

      <CaseStudiesSection
        heading="Our Recent Work"
        subtext="Real results for real businesses – crafted with strategy and precision."
        cases={caseData}
        columns={3} // you can change to 2 or 4
      />
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
}

export default CaseStudies;
