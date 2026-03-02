"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import Image from "next/image"

const benefits = [
  { index: "01", title: "Uncompromising Quality", description: "Every surface, every corner, every detail — meticulous attention without exception.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=90" },
  { index: "02", title: "Trusted Professionals", description: "Rigorous background checks and continuous training. Your home, your peace of mind.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=90" },
  { index: "03", title: "Premium Products", description: "Eco-friendly, non-toxic and pet-safe — effective without compromise.", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=90" },
  { index: "04", title: "Personalized Service", description: "Every home is unique. We adapt our approach to your needs, preferences and schedule.", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=90" },
  { index: "05", title: "Discretion & Privacy", description: "Complete discretion and deep respect for your home and lifestyle.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=90" },
  { index: "06", title: "Reliability Guaranteed", description: "When we commit to a schedule, we deliver — impeccably, every time.", image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7c1?w=1200&q=90" },
]

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const panelWidth = () => window.innerWidth
    const totalWidth = panelWidth() * benefits.length

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
      },
    })

    tl.to(track, { x: -(totalWidth - panelWidth()), ease: "none" })

    const panels = track.querySelectorAll<HTMLElement>(".why-panel")
    panels.forEach((panel, idx) => {
      const num = panel.querySelector(".why-num")
      const title = panel.querySelector(".why-title")
      const desc = panel.querySelector(".why-desc")
      const els = [num, title, desc].filter(Boolean) as HTMLElement[]
      if (num) gsap.set(num, { opacity: 0, y: 20 })
      if (title) gsap.set(title, { opacity: 0, y: 16 })
      if (desc) gsap.set(desc, { opacity: 0, y: 12 })

      const animateIn = () => {
        gsap.to(els, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" })
      }

      if (idx === 0) animateIn()

      ScrollTrigger.create({
        trigger: panel,
        containerAnimation: tl,
        start: "left 75%",
        onEnter: animateIn,
      })
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <section id="why-us" ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: "hsl(200, 50%, 8%)" }}>
      {/* Título fijo */}
      <div className="absolute top-0 left-0 right-0 z-20 px-10 md:px-20 pt-12 md:pt-16 pointer-events-none">
        <p className="text-[10px] tracking-[0.38em] uppercase font-medium mb-4" style={{ color: "hsl(200, 70%, 65%)" }}>
          Why J&amp;J
        </p>
        <h2
          className="max-w-2xl"
          style={{
            color: "hsl(200, 80%, 92%)",
            fontSize: "clamp(1.75rem, 3.2vw, 2.8rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          The difference that{" "}
          <em style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>
            true excellence
          </em>{" "}
          makes.
        </h2>
      </div>

      <div ref={trackRef} className="flex" style={{ width: "max-content" }}>
        {benefits.map((b, i) => (
          <div
            key={i}
            className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center px-10 md:px-16 lg:px-20 pt-28 pb-20"
            style={{
              width: "100vw",
              height: "100vh",
              minHeight: "560px",
            }}
          >
            <div className="flex flex-col justify-center why-panel">
              <span
                className="why-num font-medium tracking-tighter mb-4 block"
                style={{ color: "hsl(200, 70%, 50%)", fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.9 }}
              >
                {b.index}
              </span>
              <h3
                className="why-title font-medium tracking-tight mb-5"
                style={{ color: "hsl(200, 80%, 92%)", fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)", letterSpacing: "-0.02em" }}
              >
                {b.title}
              </h3>
              <p
                className="why-desc leading-relaxed font-light max-w-md"
                style={{ color: "hsl(200, 72%, 78%)", fontSize: "clamp(14px, 1vw, 16px)" }}
              >
                {b.description}
              </p>
            </div>
            <div className="relative w-full h-[300px] lg:h-full lg:min-h-[420px] overflow-hidden order-first lg:order-last">
              <Image
                src={b.image}
                alt=""
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(200,50%,8%)] via-transparent to-transparent lg:from-[hsl(200,50%,8%)] lg:via-[hsl(200,50%,8%)]/60 lg:to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase pointer-events-none" style={{ color: "hsl(200, 70%, 55%)" }}>
        <span>Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-90">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
