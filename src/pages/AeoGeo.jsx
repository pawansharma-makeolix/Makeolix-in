import React from 'react'
import Navbar from '../components/Navbar';
import HeroOrbit from '../components/HeroOrbit';
import SEOPricingTable from '../components/SEOPricingTable';
import CTAMarquee from '../components/CTAMarquee';
import UltraFooter from '../components/UltraFooter';
function AeoGeo() {
  return (
    
<>

<>
<Navbar></Navbar>
<HeroOrbit 
title={"AEO + GEO"}
primaryBtnText={"Discuss With Us"}
primaryLink={"/contact-us"}
secondaryBtnText={"Know More"}
secondaryLink={"/about"}
></HeroOrbit>
<SEOPricingTable></SEOPricingTable>
      <CTAMarquee></CTAMarquee>
      <UltraFooter></UltraFooter>
</>
</>

)
}

export default AeoGeo;
