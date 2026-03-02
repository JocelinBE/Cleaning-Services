"use client"

import { useRef, useEffect } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import Image from "next/image"

const services = [
  {
    title: "Residential\nCleaning",
    tag: "Core Service",
    description: "Deep cleaning & maintenance for luxury homes. Every surface treated with white-glove precision and absolute care.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=90",
    imageSecondary: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80",
  },
  {
    title: "Premium\nSurfaces",
    tag: "Specialized",
    description: "Marble, hardwood, and high-end material care. Tailored chemistry for every finish — zero risk, total perfection.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=90",
    imageSecondary: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
  },
  {
    title: "Custom\nSchedules",
    tag: "Flexible",
    description: "Weekly, bi-weekly or one-time visits — fully tailored to your lifestyle and the specific needs of your household.",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=90",
    imageSecondary: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
  },
  {
    title: "Insured\n& Bonded",
    tag: "Trust",
    description: "Fully licensed, background-checked professionals. Total peace of mind, every single visit, guaranteed.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=90",
    imageSecondary: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
  },
  {
    title: "Eco-Friendly\nProducts",
    tag: "Sustainable",
    description: "Non-toxic, pet-safe solutions that deliver immaculate results. No compromise between clean and green.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=90",
    imageSecondary: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
  {
    title: "White Glove\nService",
    tag: "Elite",
    description: "The highest tier of residential service. Absolute attention to every last detail — because your home deserves it.",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7c1?w=1200&q=90",
    imageSecondary: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards   = gsap.utils.toArray<HTMLElement>(".svc-card")
    const overlays = gsap.utils.toArray<HTMLElement>(".svc-overlay")

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      const next = cards[i + 1]

      // Scale down card as next one enters
      gsap.to(card, {
        scale: 0.94,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      })

      // Darken overlay on card as next one covers it — solo al final, cuando ya casi se va
      gsap.to(overlays[i], {
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: next,
          start: "top 12%",
          end: "top top",
          scrub: 1,
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <section id="services" ref={sectionRef}>

      {/* ── Intro block */}
      <div className="bg-white px-10 md:px-16 lg:px-20 pt-24 pb-16">
        <p className="text-[10px] tracking-[0.38em] uppercase text-black/35 font-medium mb-6">
          Tailored to Meet Your Needs
        </p>
        <div className="w-full h-[1px] bg-black/10 mb-10" />
        <p
          className="text-black leading-[1.2] font-medium max-w-5xl"
          style={{ fontSize: "clamp(1.6rem, 3.2vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          From first contact to final inspection, we provide a complete range
          of residential cleaning services to{" "}
          <em style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}>
            transform your home into an immaculate,
          </em>{" "}
          and welcoming space.
        </p>
      </div>
      {services.map((service, i) => (
        <div
          key={i}
          className="svc-card relative sticky top-0 grid overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            zIndex: i + 2,
            height: "clamp(300px, 52vh, 480px)",
            gridTemplateColumns: "36% 1fr 30%",
            padding: "clamp(16px, 2.5vw, 32px)",
            gap: "clamp(16px, 2.5vw, 32px)",
          }}
        >
          {/* Shadow overlay */}
          <div className="svc-overlay absolute inset-0 bg-black pointer-events-none z-10" style={{ opacity: 0 }} />

          {/* ── Col 1: main image — contained, fills column */}
          <div className="relative overflow-hidden h-full">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="36vw"
              priority={i === 0}
            />
          </div>

          {/* ── Col 2: title + CTA */}
          <div className="flex flex-col justify-between py-2">
            <h2
              className="font-medium text-[#1a1a1a] whitespace-pre-line leading-[1.05]"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 3.2rem)", letterSpacing: "-0.02em" }}
            >
              {service.title}
            </h2>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="self-start flex items-center gap-2.5 px-5 py-2.5 rounded-full text-black/70 hover:bg-black hover:text-white transition-all duration-300 text-[11px] tracking-[0.18em] uppercase font-medium border border-black/15"
            >
              More
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── Col 3: description + secondary image */}
          <div className="flex flex-col justify-between py-2">
            <p
              className="text-black leading-relaxed"
              style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}
            >
              {service.description}
            </p>

            <div className="relative overflow-hidden w-full" style={{ height: "38%" }}>
              <Image
                src={service.imageSecondary}
                alt={service.title}
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
