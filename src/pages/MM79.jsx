import React from "react";
import Navbar from "../components/Navbar";
import HeroOrbit from "../components/HeroOrbit";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import IntroText from "../components/IntroText";
import Usp from "../components/Usp";
import TextMedia from "../components/TextMedia";
import BenefitsSection from "../components/BenefitsSection";
const MM79 = () => {
  const statsData = [
    {
      tag: "Optimization",
      title: "ONSITE OPTIMIZATION",
      desc: "Enhancing the technical elements of your website to improve search engine visibility, performance, user experience, and overall site functionality, ensuring seamless navigation and better rankings in search engine results.",
      points: [
        "Schema Code Implementation",
        "ALT Tag Optimization",
        "404 Error Pages",
        "Canonical Tag Issues",
      ],
    },
    {
      tag: "Optimization",
      title: "CONTENT OPTIMIZATION",
      desc: "Enhancing the quality, relevance, and value of your website content by aligning it with user intent and adhering to SEO best practices, ensuring improved engagement, higher search engine rankings, increased traffic, and a better overall user experience.",
      points: ["Content Relevance & Clarity", "Duplicate Content Check"],
    },
    {
      tag: "Optimization",
      title: "UI/UX OPTIMIZATION",
      desc: "Optimize your website’s design and functionality to boost user experience, engagement, and satisfaction, ensuring seamless navigation, faster load times, and intuitive features that drive conversions and enhance overall performance",
      points: ["Header Optimization", "Footer Optimization"],
    },
    {
      tag: "Report",
      title: "AUDIT REPORT",
      desc: "Conduct a thorough analysis of your website’s technical and performance aspects, identifying issues, optimizing speed, ensuring functionality, and enhancing overall efficiency to deliver a seamless user experience and improved results.",
      points: ["Technical SEO Errors", "Schema Markup Review"],
    },
    {
      tag: "Report",
      title: "STRATEGY REPORT",
      desc: "Develop a strategic roadmap for continuous optimization and sustainable growth, focusing on performance  enhancements, user experience improvements, and datadriven decision-making. This plan ensures consistent progress, aligns with your business goals, adapts to market trends, and fosters long-term success by addressing emerging opportunities and challenges effectively over time.",
      points: [
        "Keyword Strategy",
        "Content Recommendations",
        "Actionable Roadmap",
        "Backlink Opportunities",
      ],
    },

    {
      tag: "Delverables",
      title: "DELIVERABLES",
      desc: "The deliverables include comprehensive website analysis, design and functionality enhancements, performance optimization, ongoing growth strategy, and regular reports to track progress, ensuring continuous improvement and alignment with business",
      points: [
        "Optimized 5 Pages",
        "Comprehensive Audit Report",
        "Customized Strategy Plan",
      ],
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <HeroOrbit
        title={"MATRIX MAXIMIZER $79"}
        description={"A KICK START TO YOUR DIGITAL JOURNEY"}
      
      ></HeroOrbit>
      <IntroText
        heading="WE DRIVE SUCCESS, YOU REAP REWARDS"
        paragraph="In the vast landscape of the digital realm, MakeOlix stands out as a beacon of innovation and expertise. As a leading Digital Marketing Company in the USA, we redefine how brands connect with their audiences, always going beyond the lead. Dynamic Marketing Strategy Definition MakeOlix Consulting Inc drives business transformation with innovative solutions in strategy, operations, and digital marketing. Their expert team ensures tailored, customer-focused approaches for growth, efficiency, and sustainable success."
      ></IntroText>
      <TextMedia
        subtitle="MATRIX MAXIMIZER 79.00 USD "
        title="SERVICE OVERVIEW"
        description="Our $79 SEO service is designed to optimize 5 pages of
        your website by addressing key technical, content, and
        user experience issues. This service lays the foundation
        for improved search engine rankings and user
        satisfaction."
        listTitle="Inclusions"
        list={[
          "Onsite Optimization",
          "Content Optimization",
          "UI/UX Optimization",
          "Audit Report",
          "Strategy Report ",
        ]}
        image="/White-and-Blue-Modern-Dynamic-Marketing-Strategy-Presentation-11-1-1536x864.webp"
        ctaText="Start Now"
          ctaHref="/about"
           paymentLink="https://buy.stripe.com/14k4h3fmDba4clWdR8"
      />
      <Usp statsData={statsData} />
      <BenefitsSection></BenefitsSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
          </>
  );
};

export default MM79;
