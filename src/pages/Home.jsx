import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Trusted from "../components/Trusted";
import KnowPoints from "../components/KnowPoints";
import ServicesSlider from "../components/ServicesSlider";
import MakeolixNumbers from "../components/MakeolixNumbers";
import WhyChooseUs from "../components/WhyChooseUs";
import VideoTestimonials from "../components/VideoTestimonials";
import FAQSection from "../components/FAQSection";
import Achievements from "../components/Achievements";
import BlogSection from "../components/BlogSection";
import { TestimonialData } from "../components/data/TestimonialData";
import StaggerTestimonials from "../components/StaggerTestimonials";
import UltraFooter from "../components/UltraFooter";
import CTAMarquee from "../components/CTAMarquee";
import HorizontalScrollSection from "../components/HorizontalScrollSection";
import WovenLightHero from "../components/WovenLightHero";
const Home = () => {
  const stats = [
    {
      number: "10+",
      title: "Years of Experience",
      desc: "Expertise honed through a decade of diverse industry challenges.",
    },
    {
      number: "150+",
      title: "Specialist",
      desc: "A dedicated team of skilled professionals driving excellence.",
    },
    {
      number: "5,000+",
      title: "Marketing Consultations",
      desc: "Proven insights from a wealth of strategic consultations conducted.",
    },
    {
      number: "2",
      title: "Continents",
      desc: "Expanding global reach with successful endeavors on multiple continents.",
    },
    {
      number: "3,000+",
      title: "Executed Campaigns",
      desc: "A track record of executing effective and impactful marketing campaigns.",
    },
    {
      number: "100",
      title: "Established Partners Globally",
      desc: "Trusted partnerships fostering global connections and mutual success.",
    },
  ];

  return (
    <>
      <Navbar />
      <WovenLightHero></WovenLightHero>
      <Trusted></Trusted>
      <About></About>

      <KnowPoints></KnowPoints>
      <ServicesSlider />
      <MakeolixNumbers
        heading="The Makeolix in Numbers"
        statsData={stats}
        variant={"dark"}
      ></MakeolixNumbers>
      <WhyChooseUs></WhyChooseUs>
      <VideoTestimonials></VideoTestimonials>
      <StaggerTestimonials data={TestimonialData}></StaggerTestimonials>

      <FAQSection></FAQSection>
      <Achievements></Achievements>
      <BlogSection></BlogSection>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </>
  );
};

export default Home;
