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
import MakeolixNumbers from "../components/MakeolixNumbers";
import FeaturesSection from "../components/FeaturesSection";
const CountryPage = () => {
  const { city } = useParams();
  const pageData = ServiceAreaPagesData[city];
  if (!pageData) {
    return <div>Page Not Found</div>;
  }
  return (
    <>
      <Navbar></Navbar>
      {pageData.sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return (
              <UltraAnimatedHero
                key={index}
                heading={section.data.heading}
                paragraph={section.data.paragraph}
              />
            );

          case "intro":
            return (
              <IntroText
                key={index}
                heading={section.data.heading}
                paragraph={section.data.paragraph}
              />
            );

          case "parallax":
            return <ParallaxHero key={index} {...section.data} />;
          case "steps":
            return (
              <StepsSection
                key={index}
                eyebrow="Process"
                heading={section.data.heading}
                subtitle={section.data.subtitle}
                rightSubtext={section.data.rightsubtext}
                steps={section.data.steps}
              />
            );
          case "usptype":
            return (
              <MakeolixNumbers
                heading={section.data.heading}
                statsData={section.data.stats}
                subheading={section.data.subheading}
                variant="dark"
              />
            );
          case "parallax2":
            return <ParallaxHero key={index} {...section.data} />;
          case "features":
            return <FeaturesSection key ={index} {...section.data} />
          case "faq":
            return <FaqVariant key={index} faqs={section.data.faqdata} />;
          case "textmedia":
            return (
              <TextMedia
                key={index}
               {...section.data}
                
              />
            );
          default:
            return null;
        }
      })}

      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default CountryPage;
