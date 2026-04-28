import AboutSection from "@/components/about/AboutSection";
import Hero from "@/components/hero/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import TrustedBy from "@/components/social-proof/TrustedBy";

export default function Home() {
  return <div className="bg-background">
    <Hero />
    <TrustedBy />
    <ServicesSection />
    <AboutSection />
  </div>
}