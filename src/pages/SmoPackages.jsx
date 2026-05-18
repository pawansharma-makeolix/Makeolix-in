import { SMO_PLANS } from "../components/data/SMO_PLANS";
import PriceSection from "../components/PriceSection";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import Navbar from "../components/Navbar";
import HeroOrbit from "../components/HeroOrbit";

const SmoPackages = () => {
  return (
    <div>
      <Navbar></Navbar>
      <HeroOrbit
        title={"SMO PRICING"}
        primaryBtnText={"Discuss With Us"}
        primaryLink={"/contact-us"}
        secondaryBtnText={"Know More"}
        secondaryLink={"/about"}
      ></HeroOrbit>
      <PriceSection
        plans={SMO_PLANS}
        title="SMO Packages"
        subtitle="Best for ranking"
        alwaysExpanded={true}
        
      ></PriceSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </div>
  );
};

export default SmoPackages;
