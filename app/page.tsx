import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { SectionDivider } from "@/components/section-divider"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { WhyUsSection } from "@/components/sections/why-us-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <HeroSection />
      <SectionDivider />
      <ServicesSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <WhyUsSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </main>
  )
}
