"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Home, Building2, Calendar, Shield, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import GlassSurface from "@/components/ui/glass-surface"

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description:
      "Comprehensive deep cleaning and maintenance for luxury homes, ensuring every surface reflects perfection.",
    features: ["Deep Cleaning", "Regular Maintenance", "Move-in/out", "Post-Construction"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
  },
  {
    icon: Building2,
    title: "Premium Services",
    description:
      "Specialized services including window cleaning, carpet care, and high-end surface treatment.",
    features: ["Window Cleaning", "Carpet Care", "Hardwood Care", "Marble & Stone"],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  },
  {
    icon: Calendar,
    title: "Custom Schedules",
    description:
      "Flexible scheduling tailored to your lifestyle, with weekly, bi-weekly, or monthly options.",
    features: ["Flexible Timing", "Recurring Service", "One-time Service", "Event Preparation"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
  },
  {
    icon: Shield,
    title: "Insured & Bonded",
    description:
      "Fully licensed, insured, and bonded for your complete peace of mind and protection.",
    features: ["Fully Insured", "Bonded", "Licensed", "Background Checked"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
  {
    icon: Star,
    title: "Eco-Friendly",
    description:
      "Premium eco-friendly products that are safe for your family, pets, and the environment.",
    features: ["Green Products", "Non-Toxic", "Pet-Safe", "Environmentally Conscious"],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    icon: Sparkles,
    title: "White Glove Service",
    description:
      "The highest standard of service with attention to every detail, ensuring absolute perfection.",
    features: ["Detail-Oriented", "Quality Guarantee", "Satisfaction Assured", "Elite Standards"],
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7c1?w=800&q=80",
  },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const updateScrollButtons = () => {
      if (!scrollContainerRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateScrollButtons)
      updateScrollButtons()
    }

    return () => {
      scrollContainer?.removeEventListener("scroll", updateScrollButtons)
    }
  }, [])

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 280
    const gap = 16
    const scrollAmount = cardWidth + gap

    const currentScroll = scrollContainerRef.current.scrollLeft
    const newScroll =
      direction === "right"
        ? currentScroll + scrollAmount
        : currentScroll - scrollAmount

    scrollContainerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    })
  }

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return
    const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 280
    const gap = 16
    const scrollPosition = index * (cardWidth + gap)

    scrollContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
    setCurrentIndex(index)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 280
      const gap = 16
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const index = Math.round(scrollLeft / (cardWidth + gap))
      setCurrentIndex(index)
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      id="services"
      className="relative bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cleaning solutions designed for San Diego&apos;s most
            prestigious residences
          </p>
        </div>
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="relative">
        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scrollTo("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-200 hover:scale-110 cursor-pointer"
            aria-label="Scroll left"
          >
            <GlassSurface
              width={40}
              height={40}
              borderRadius={20}
              className="flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </GlassSurface>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollTo("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-200 hover:scale-110 cursor-pointer"
            aria-label="Scroll right"
          >
            <GlassSurface
              width={40}
              height={40}
              borderRadius={20}
              className="flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </GlassSurface>
          </button>
        )}

        {/* Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-10"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            className="flex gap-6 md:gap-8 pb-6"
            style={{ scrollSnapAlign: "start" }}
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[240px] sm:w-[280px] group"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-[320px] overflow-hidden border border-border/50 bg-card/50 hover:border-border transition-all duration-300 shadow-lg hover:shadow-xl">
                    {/* Image - Full Height */}
                    <div className="relative h-full w-full overflow-hidden bg-muted">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 240px, 280px"
                        style={{ imageRendering: "crisp-edges" }}
                      />
                    </div>

                    {/* Content - Bottom Overlay - Apple Style */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent pt-8 pb-3 px-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-foreground leading-tight">{service.title}</h3>
                        
                        {/* Action Button - Bottom Right */}
                        <button className="group/btn inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 text-[10px] font-medium whitespace-nowrap">
                          Learn more
                          <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index
                  ? "bg-foreground w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
