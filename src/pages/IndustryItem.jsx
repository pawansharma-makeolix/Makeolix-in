// import React from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import CTAMarquee from "../components/CTAMarquee";
// import UltraFooter from "../components/UltraFooter";
// import { IndustryPageData } from "../components/data/IndustryIndex";
// import ServiceHero from "../components/ServiceHero";
// import IntroText from "../components/IntroText";
// import FaqVariant from "../components/FaqVariant";
// import TextMedia from "../components/TextMedia";
// import ParallaxHero from "../components/ParallaxHero";
// import Usp from "../components/Usp";
// import ServicesSection from "../components/ServicesSection";
// import StepsSection from "../components/StepsSection";
// import FeaturesSection from "../components/FeaturesSection";
// import MakeolixNumbers from "../components/MakeolixNumbers";
// import PageNotFound from "../components/PageNotFound";
// import RippleHero from "../components/RippleHero";

// const IndustryItem = () => {
//   const { slug } = useParams();
//   const pageData = IndustryPageData[slug];
//   if (!pageData) return <PageNotFound></PageNotFound>;
//   return (
//     <>
//       <Navbar />

//       {pageData.sections.map((section, index) => {
//         switch (section.type) {
//           case "hero":
//             return <RippleHero key={index} {...section.data} />;

//           case "intro":
//             return <IntroText key={index} {...section.data} />;

//           case "faq":
//             return <FaqVariant key={index} {...section.data} />;
//           case "textmedia":
//             return <TextMedia key={index} {...section.data} />;
//           case "parallax":
//             return <ParallaxHero key={index} {...section.data} />;
//           case "usp":
//             return <Usp key={index} {...section.data} />;
//           case "services":
//             return <ServicesSection key={index} {...section.data} />;
//           case "steps":
//             return <StepsSection key={index} {...section.data} />;
//           case "features":
//             return <FeaturesSection key={index} {...section.data} />;
//           case "usptype":
//             return <MakeolixNumbers key={index} {...section.data} />;
//           default:
//             return null;
//         }
//       })}

//       <CTAMarquee />
//       <UltraFooter />
//     </>
//   );
// };

// export default IndustryItem;
