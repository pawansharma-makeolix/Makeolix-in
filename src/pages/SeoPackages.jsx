import { SEO_PLANS } from "../components/data/SEO_PLANS";
import Navbar from "../components/Navbar";
import PriceSection from "../components/PriceSection";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import HeroOrbit from "../components/HeroOrbit";
const SeoPackages = () => {
  return (
    <>
      <Navbar></Navbar>
      <HeroOrbit
        title={"SEO POWERED BY AI"}
        primaryBtnText={"Discuss With Us"}
        primaryLink={"/contact-us"}
        secondaryBtnText={"Know More"}
        secondaryLink={"/about"}
      ></HeroOrbit>
      <PriceSection
        plans={SEO_PLANS}
        subtitle="Best for ranking"
        alwaysExpanded={true}
      ></PriceSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default SeoPackages;
