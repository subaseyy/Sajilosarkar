import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import BenefitsInDepth from "./BenefitsInDepth/BenefitsInDepth"
import HeroSection from "./HeroSection/HeroSection"
import KeyFeatures from "./KeyFeatures/KeyFeatures"
import UserTestimonials from "./UserTestimonials/UserTestimonials"

const FeaturePage = () => {
  return (
    <div>
        < HeroSection />
        < KeyFeatures />
        < BenefitsInDepth />
        < UserTestimonials />
        < Footer />
    </div>
  )
}

export default FeaturePage
