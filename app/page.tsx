import { InquiryModalProvider } from "@/contexts/inquiry-modal-context"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { WhyUsSection } from "@/components/sections/why-us-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <InquiryModalProvider>
    <main className="min-h-screen">
      <TopBar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </main>
    </InquiryModalProvider>
  )
}
