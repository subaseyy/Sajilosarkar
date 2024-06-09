import AboutSajiloSarkar from "./AboutSajiloSarkar/AboutSajiloSarkar"
import ContactUs from "./ContactUs/ContactUs"
import GetInvolved from "./GetInvolved/GetInvolved"
import HeroSection from "./HeroSection/HeroSection"
import OurApproach from "./OurApproach/OurApproach"
import OurImpact from "./OurImpact/OurImpact"
import Partnerships from "./Partnership/Partnerships"
import TeamMember from "./TeamMember/TeamMember"

const AboutPage = () => {
  return (
    <div>
        < HeroSection />
        < AboutSajiloSarkar />
        <TeamMember />
        <OurApproach />
        <OurImpact />
        < Partnerships />
        <GetInvolved />
        <ContactUs />
    </div>
  )
}

export default AboutPage
