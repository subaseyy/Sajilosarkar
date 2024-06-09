import ContactForm from "./ContactInformation/ContactForm/ContactForm"
import ContactInformation from "./ContactInformation/ContactInformation"
import FAQSection from "./FAQSection/FAQsections"
import Hero from "./HeroSection/Hero"
import LiveChat from "./LiveChat/LiveChat"
import SocialMediaLinks from "./SocialMediaLinks/SocialMediaLinks"

const ContactPage = () => {
  return (
    <div>
      < Hero />
      <ContactInformation />
      <SocialMediaLinks />
      < ContactForm />
      <FAQSection />
      <LiveChat />
    </div>
  )
}

export default ContactPage
