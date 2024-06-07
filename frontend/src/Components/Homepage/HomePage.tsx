import BenefitsSection from "./BenefitsSection/BenefitsSection"
import CalltoAction from "./Calltoaction/CalltoAction"
import Hero from "./HeroSection/Hero"
import HowItWorksSection from "./Howitswork/HowItWorksSection"
import TestimonialsSection from "./TestimonialsSection/TestimonialsSection"

const HomePage = () => {
  return (
    <div>
      <Hero />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      < CalltoAction aboutUsUrl="/about" faqsUrl="/faqs" />
    </div>
  )
}

export default HomePage
