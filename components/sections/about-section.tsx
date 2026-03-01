"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { Award, Users, Clock, Heart } from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: Award, value: "15+", label: "Years of Excellence" },
  { icon: Users, value: "500+", label: "Satisfied Clients" },
  { icon: Clock, value: "24/7", label: "Support Available" },
  { icon: Heart, value: "100%", label: "Satisfaction Rate" },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      const statItems = statsRef.current?.children
      if (statItems) {
        gsap.from(statItems, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About J & J Cleaning Services
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                For over 15 years, J & J Cleaning Services has been the trusted
                choice for San Diego&apos;s most discerning homeowners. We
                understand that your home is more than just a space—it&apos;s a
                sanctuary that reflects your values and lifestyle.
              </p>
              <p>
                Our team of highly trained professionals brings an unwavering
                commitment to excellence, using only the finest eco-friendly
                products and state-of-the-art equipment. Every detail matters,
                and we take pride in delivering results that exceed
                expectations.
              </p>
              <p>
                From luxury estates to modern penthouses, we provide
                personalized service that adapts to your unique needs, ensuring
                your home always looks its absolute best.
              </p>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
                alt="Professional cleaning service team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card/50 border border-border/50"
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

