import AboutSection from "@/components/about/AboutSection";
import ContactForm from "@/components/contact/Contact";
import FaqSection from "@/components/faq/FaqSection";
import Hero from "@/components/hero/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import Stats from "@/components/social-proof/Stats";
import { MeetTheTeam } from "@/components/social-proof/Team";
import TrustedBy from "@/components/social-proof/TrustedBy";
import TrustSection from "@/components/social-proof/TrustPoints";

export default function Home() {
  return <div className="bg-background">
    <Hero />
    <TrustedBy />
    <ServicesSection />
    <AboutSection />
    <TrustSection />
    <Stats />
    <MeetTheTeam />
    <FaqSection />
    <ContactForm />
  </div>
}