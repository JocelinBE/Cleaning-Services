"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  {
    title: "Uncompromising Quality",
    description:
      "We set the highest standards and never compromise. Every surface, every corner, every detail receives meticulous attention.",
  },
  {
    title: "Trusted Professionals",
    description:
      "Our team undergoes rigorous background checks and continuous training to ensure the highest level of service and security.",
  },
  {
    title: "Premium Products",
    description:
      "We use only the finest eco-friendly products that are safe for your family, pets, and the environment, without sacrificing effectiveness.",
  },
  {
    title: "Personalized Service",
    description:
      "Every home is unique. We customize our approach to meet your specific needs, preferences, and schedule.",
  },
  {
    title: "Discretion & Privacy",
    description:
      "We understand the importance of privacy. Our team operates with complete discretion and respect for your home and lifestyle.",
  },
  {
    title: "Reliability Guaranteed",
    description:
      "When we commit to a schedule, we deliver. Our consistent, reliable service ensures your home is always impeccably maintained.",
  },
]

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.children
      if (items) {
        gsap.from(items, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference that true excellence makes
          </p>
        </div>

        <div
          ref={itemsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-border hover:bg-card/80 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

