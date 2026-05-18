import React from "react";
import UltraAnimatedHero from "../components/UltraAnimatedHero";
import CTAMarquee from "../components/CTAMarquee";
import UltraFooter from "../components/UltraFooter";
import TextMedia from "../components/TextMedia";
import { useParams } from "react-router-dom";
import IntroText from "../components/IntroText";
import StepsSection from "../components/StepsSection";
import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServicesSection";
import { PhoenixServiceData } from "../components/data/PhoenixServiceData";
import ParallaxHero from "../components/ParallaxHero";
import FaqVariant from "../components/FaqVariant";
import { ServiceAreaPagesData } from "../components/data/ServiceAreaPagesData";

const CountryPage = () => {
  const { city } = useParams();
  const pageData = ServiceAreaPagesData[city];
  if (!pageData) {
    return <div>Page Not Found</div>;
  }
  const Phoenix = [
    {
      number: 1,

      title: "Analysis & Audit",
      body: "We evaluate your website, competitors, and keyword opportunities.",
      icon: (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          width={28}
          height={28}
        >
          <rect x="3" y="3" width="9" height="9" rx="2" />
          <rect x="16" y="3" width="9" height="9" rx="2" />
          <rect x="3" y="16" width="9" height="9" rx="2" />
          <rect x="16" y="16" width="9" height="9" rx="2" />
        </svg>
      ),
    },
    {
      number: 2,

      title: " Strategy & Planning",
      body: "We build a customized SEO roadmap aligned with your goals.",
      icon: (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          width={28}
          height={28}
        >
          <rect x="3" y="3" width="9" height="9" rx="2" />
          <rect x="16" y="3" width="9" height="9" rx="2" />
          <rect x="3" y="16" width="9" height="9" rx="2" />
          <rect x="16" y="16" width="9" height="9" rx="2" />
        </svg>
      ),
    },
    {
      number: 3,

      title: "Implementation",
      body: "From technical fixes to content optimization, we execute every step with precision.",
      icon: (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          width={28}
          height={28}
        >
          <rect x="3" y="3" width="9" height="9" rx="2" />
          <rect x="16" y="3" width="9" height="9" rx="2" />
          <rect x="3" y="16" width="9" height="9" rx="2" />
          <rect x="16" y="16" width="9" height="9" rx="2" />
        </svg>
      ),
    },
    {
      number: 4,

      title: "Link Building",
      body: "We strengthen your online authority with high-quality backlinks.",
      icon: (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          width={28}
          height={28}
        >
          <rect x="3" y="3" width="9" height="9" rx="2" />
          <rect x="16" y="3" width="9" height="9" rx="2" />
          <rect x="3" y="16" width="9" height="9" rx="2" />
          <rect x="16" y="16" width="9" height="9" rx="2" />
        </svg>
      ),
    },
    {
      number: 5,

      title: "Monitoring & Reporting",
      body: "We track performance and continuously optimize for better results.",
      icon: (
        <svg
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          width={28}
          height={28}
        >
          <rect x="3" y="3" width="9" height="9" rx="2" />
          <rect x="16" y="3" width="9" height="9" rx="2" />
          <rect x="3" y="16" width="9" height="9" rx="2" />
          <rect x="16" y="16" width="9" height="9" rx="2" />
        </svg>
      ),
    },
  ];
  const features = [
    "Data-driven SEO campaigns tailored to your business",
    "Transparent reporting and real-time performance tracking",
    "Proven success across multiple competitive markets",
    "A dedicated team that acts as your growth partner",
  ];
  const FAQS = [
    {
      id: 1,
      question: "What SEO services does MakeOlix Consulting offer?",
      answer:
        "We provide a full range of SEO services, including on-site optimization, local SEO, mobile SEO, site speed optimization, content creation, link building, voice search optimization, and conversion rate optimization (CRO).",
    },
    {
      id: 2,
      question: "How do you measure SEO success?",
      answer:
        "We track key performance indicators such as keyword rankings, organic traffic, bounce rates, conversions, and overall ROI to ensure your campaign delivers measurable results.",
    },
    {
      id: 3,
      question: "How long does it take to see SEO results?",
      answer:
        "SEO is a long-term strategy. Most businesses start seeing noticeable improvements within 3-6 months, depending on competition and industry.",
    },
    {
      id: 4,
      question: "Can you help small businesses in Indianapolis?",
      answer:
        "Absolutely. We specialize in helping small and medium-sized businesses grow online through targeted local SEO strategies.",
    },
    {
      id: 5,
      question: "Do you offer customized SEO plans?",
      answer:
        "Yes, every business is unique. We create tailored SEO strategies based on your goals, industry, and target audience.",
    },
  ];
  return (
    <>
      <Navbar></Navbar>
      <UltraAnimatedHero
        heading={pageData.hero.heading}
        paragraph={pageData.hero.paragraph}
        primaryBtn={{ label: "Start Now", link: "/contact-us" }}
        secondaryBtn={{ label: "See Plans", link: "/seo" }}
      />
      <IntroText
        heading={pageData.intro.heading}
        paragraph={pageData.intro.paragraph}
      />
      {pageData.textmedia?.map((item, index) => (
  <TextMedia
    key={index}
    title={item.heading}
    description={item.paragraph}
    list={item.list}
    paragraph2={item.paragraph2}
    image={item.image}
    ctaText="Get Started"
    reverse={index % 2 !== 0}
  />
))}
      <StepsSection
        eyebrow="Process"
        heading="Our Proven 5-Step SEO Strategy"
        subtitle="As a Phoenix Top SEO Company, we follow a structured process to ensure consistent success:"
        steps={Phoenix}
      ></StepsSection>
      <ServicesSection
        services={PhoenixServiceData}
        heading="Our Phoenix SEO Marketing Services That Deliver Results"
        subheading="Our Phoenix SEO Marketing Services are designed to give your business a competitive edge. We focus on strategies that not only improve rankings but also drive real business outcomes."
      ></ServicesSection>
      <ParallaxHero
        align={"left"}
        bgImage={"Heroimage.jpg"}
        description={
          "What sets MakeOlix Consulting apart isn’t just experience, it’s results. Businesses trust us as the Best SEO Services Company in Phoenix because we focus on ROI-driven strategies."
        }
        title={"Why MakeOlix is the Best SEO Services Company in Phoenix"}
        subtext={"Here’s what makes us different: "}
        lastpara={"We don’t just aim for higher rankings, "}
        highlight={"we aim for measurable business growth."}
        features={features}
      ></ParallaxHero>
      <FaqVariant faqs={FAQS}></FaqVariant>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default CountryPage;
