"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap-utils"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles } from "lucide-react"
import CardSwap, { Card } from "@/components/ui/card-swap"
import Image from "next/image"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const accentRef = useRef<HTMLDivElement>(null)
  const bubblesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      })

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      })

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      })

      gsap.from(accentRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.9,
        ease: "back.out(1.7)",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Bubble animation on mouse move
  useEffect(() => {
    if (!heroRef.current || !bubblesContainerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create bubble
      const bubble = document.createElement("div")
      bubble.className = "absolute rounded-full pointer-events-none"
      
      const size = Math.random() * 40 + 20 // 20-60px
      const opacity = Math.random() * 0.5 + 0.3 // 0.3-0.8
      
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`
      bubble.style.left = `${x}px`
      bubble.style.top = `${y}px`
      bubble.style.background = "rgba(148, 163, 184, 0.2)"
      bubble.style.border = "1px solid rgba(148, 163, 184, 0.3)"
      bubble.style.opacity = "0"
      bubble.style.transform = "translate(-50%, -50%) scale(0)"

      bubblesContainerRef.current.appendChild(bubble)

      // Animate bubble
      gsap.to(bubble, {
        opacity: opacity,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(bubble, {
        y: y - 100 - Math.random() * 50,
        x: x + (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 1.5,
        duration: 1.5 + Math.random() * 0.5,
        ease: "power1.out",
        onComplete: () => {
          bubble.remove()
        },
      })
    }

    const heroElement = heroRef.current
    heroElement.addEventListener("mousemove", handleMouseMove)

    return () => {
      heroElement?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Bubbles Container */}
      <div
        ref={bubblesContainerRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Clean White Background */}
      <div className="absolute inset-0 bg-background z-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-left">
            <div
              ref={accentRef}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/40 border border-border/30 mb-8 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                San Diego&apos;s Premier
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
            >
              <span className="block text-foreground">Residential</span>
              <span className="block mt-2">
                <span className="text-foreground">Cleaning </span>
                <span className="text-primary">Services</span>
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 font-light leading-relaxed"
            >
              Exquisite attention to detail for San Diego&apos;s most discerning
              homeowners. Where perfection meets elegance.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Button
                size="lg"
                className="text-base px-8 py-6 rounded-full shadow-sm hover:shadow-md transition-all duration-300 font-medium"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 rounded-full border hover:bg-muted/30 transition-all duration-300 font-medium"
                onClick={() => {
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Explore Services
              </Button>
            </div>

            {/* Minimalist Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-1 text-foreground">15+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  Years
                </div>
              </div>
              <div className="border-l border-border/20 pl-6">
                <div className="text-3xl md:text-4xl font-bold mb-1 text-foreground">500+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  Clients
                </div>
              </div>
              <div className="border-l border-border/20 pl-6">
                <div className="text-3xl md:text-4xl font-bold mb-1 text-foreground">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Card Swap Animation */}
          <div className="relative hidden lg:block h-[600px]">
            <CardSwap
              width={550}
              height={500}
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card className="overflow-hidden p-0">
                <div className="relative w-full h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
                    alt="Premium Cleaning Service"
                    fill
                    className="object-cover"
                    sizes="550px"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Premium Service</h3>
                  <p className="text-muted-foreground">
                    Professional cleaning tailored to your needs
                  </p>
                </div>
              </Card>
              <Card className="overflow-hidden p-0">
                <div className="relative w-full h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop"
                    alt="Eco-Friendly Products"
                    fill
                    className="object-cover"
                    sizes="550px"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Eco-Friendly</h3>
                  <p className="text-muted-foreground">
                    Safe products for your family and environment
                  </p>
                </div>
              </Card>
              <Card className="overflow-hidden p-0">
                <div className="relative w-full h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
                    alt="Quality Guarantee"
                    fill
                    className="object-cover"
                    sizes="550px"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Guarantee</h3>
                  <p className="text-muted-foreground">
                    We guarantee the quality of our service or your money back
                  </p>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>

      {/* Minimalist Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-10">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 text-muted-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
