import ContactSection from "../components/ContactSection"
import CTAMarquee from "../components/CTAMarquee"
import HeroOrbit from "../components/HeroOrbit"
import Navbar from "../components/Navbar"
import UltraFooter from "../components/UltraFooter"

const ContactUs = () => {
  return (
    <>
    <Navbar></Navbar>
    <HeroOrbit
    title ={"Contact Us"}
    description= {"We are here for the helping and growing your business. Let's connect with us to growing your business in your way."}
    showButtons={false}
    ></HeroOrbit>
    <ContactSection></ContactSection>
    <CTAMarquee></CTAMarquee>
    <UltraFooter></UltraFooter>
    </>
  )
}

export default ContactUs
