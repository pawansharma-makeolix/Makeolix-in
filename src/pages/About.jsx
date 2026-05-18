import Trusted from "../components/Trusted";
import CTAMarquee from "../components/CTAMarquee";
import TextMedia from "../components/TextMedia";
import Navbar from "../components/Navbar";
import StackedCards from "../components/StackedCards";
import MakeolixNumbers from "../components/MakeolixNumbers";
import Achievements from "../components/Achievements";
import StackedTestimonials from "../components/StackedTestimonials";
import OtherPageHero from "../components/OtherPageHero";
import UltraFooter from "../components/UltraFooter";
import HeroOrbit from "../components/HeroOrbit";
import Button from "../components/Button";

const aboutStats = [
  {
    number: "10+",
    title: "Years of Experience",
    desc: "We have spent over a decade mastering digital growth strategies.",
  },
  {
    number: "150+",
    title: "Specialist",
    desc: "Our team includes highly skilled and experienced professionals.",
  },
  {
    number: "5,000+",
    title: "Marketing Consultations",
    desc: "We have guided thousands of businesses toward success.",
  },
  {
    number: "2",
    title: "Continents",
    desc: "Our reach spans across multiple international markets.",
  },
  {
    number: "3,000+",
    title: "Executed Campaigns",
    desc: "We deliver campaigns that drive real measurable impact.",
  },
  {
    number: "100",
    title: "Established Partners Globally",
    desc: "We have built strong partnerships across the globe.",
  },
];

const AboutUs = () => {
  const data = {
    items: ["Design", "Development", "Branding", "Marketing", "Strategy"],
    speed: 50,
    card: {
      title: "We Build Digital Power",
      desc: "High-performance UI with immersive animations.",
    },
  };

  return (
    <div>
      <Navbar></Navbar>
      <HeroOrbit
        title={"About Us"}
        description={
          "We blend creativity and technology to build powerful digital solutions that drive growth and create lasting impact."
        }
        primaryBtnText={"Get Started "}
        secondaryBtnText={"Learn More"}
        primaryLink={"/contact-us"}
        secondaryLink={"/contact-us"}
      ></HeroOrbit>

      <Trusted></Trusted>
      <TextMedia
        title="What makes us the best?"
        subtitle="Why Choose Us"
        description="Choosing MakeOlix means choosing excellence, innovation, and reliability. With years of experience and a proven track record of delivering exceptional results, we pride ourselves on our unwavering commitment to client satisfaction. From start-ups to established enterprises, we tailor our services to meet your specific needs and exceed your expectations."
        image="/john-FlPc9_VocJ4-unsplash (1).jpg"
       
      />
      
      <StackedCards></StackedCards>
      <MakeolixNumbers
      variant="dark"
        heading="THE MAKEOLIX IN NUMBERS"
        subheading={`Know Our Points 
  At MakeOlix, we believe in a holistic approach to digital marketing. By understanding your unique brand identity, target audience, and business objectives, we develop comprehensive strategies that encompass SEO, PPC, content marketing, social media, and more. Our goal is to optimize every aspect of your online presence for maximum impact and visibility.`}
        statsData={aboutStats}
      ></MakeolixNumbers>
      <Achievements></Achievements>
      <StackedTestimonials></StackedTestimonials>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
    </div>
  );
};

export default AboutUs;
