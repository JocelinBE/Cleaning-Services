"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import Image from "next/image"

const METRIC_BLUE = "hsl(200, 85%, 45%)"

const metrics = [
  {
    id: "01",
    value: "100%",
    label: "Satisfied Clients",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85",
  },
  {
    id: "02",
    value: "500+",
    label: "Homes Cleaned",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85",
  },
  {
    id: "03",
    value: "15+",
    label: "Years of Experience",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=85",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 72%" }

      gsap.from(".ab-label", {
        opacity: 0,
        y: 10,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: trigger,
      })

      gsap.from(".ab-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        delay: 0.1,
        ease: "expo.out",
        scrollTrigger: trigger,
      })

      gsap.from(".ab-word", {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.06,
        delay: 0.15,
        ease: "expo.out",
        scrollTrigger: trigger,
      })


      gsap.from(".ab-body", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: trigger,
      })

      gsap.from(".ab-image", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.2,
        delay: 0.3,
        ease: "expo.out",
        scrollTrigger: trigger,
      })

      gsap.from(".ab-metric", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.5,
        ease: "expo.out",
        scrollTrigger: trigger,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about-us" ref={sectionRef} className="bg-white overflow-hidden">
      {/* Intro centrada, misma energía que Services */}
      <div className="px-10 md:px-16 lg:px-20 pt-24 pb-20 border-b border-black/8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="ab-label text-[10px] tracking-[0.38em] uppercase text-black/35 font-medium mb-5">
            About J&amp;J
          </p>
          <div className="ab-line mx-auto w-16 h-[1px] bg-black/10 mb-8" />

          <p
            className="text-black font-medium"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            <span className="overflow-hidden inline-block">
              <span className="ab-word inline-block">From meticulous weekly care</span>
            </span>{" "}
            <span className="overflow-hidden inline-block">
              <span className="ab-word inline-block">to discreet deep cleans,</span>
            </span>{" "}
            <span className="overflow-hidden inline-block">
              <span className="ab-word inline-block">we look after every inch of your home</span>
            </span>{" "}
            <span className="overflow-hidden inline-block">
              <em
                className="ab-word inline-block not-italic"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                so it always feels immaculate and genuinely cared for.
              </em>
            </span>
          </p>
        </div>
      </div>

      {/* Bloque texto + imagen (columna izquierda + derecha) */}
      <div className="px-10 md:px-16 lg:px-20 pb-20 border-b border-black/8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="max-w-xl space-y-6">
            <p className="text-[10px] tracking-[0.32em] uppercase text-black/30 font-medium">
              Inside your home, on your terms
            </p>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                letterSpacing: "-0.02em",
              }}
              className="text-black"
            >
              Trusted access, quiet routines, no surprises.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p
                className="ab-body text-black/70"
                style={{ fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.7 }}
              >
                Our cleaners are fully vetted, background‑checked and insured. We work with
                keys, alarms and pets every day, moving through your home with quiet,
                predictable routines.
              </p>
              <p
                className="ab-body text-black/65"
                style={{ fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.7 }}
              >
                Non‑toxic, high‑performance products and a repeatable checklist mean each
                visit lands with the same calm precision — no rushed teams, no harsh scents,
                no chaos.
              </p>
            </div>
          </div>

          <div className="ab-image relative min-h-[320px] lg:min-h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=1400&auto=format&fit=crop"
              alt="Professional cleaning service"
              fill
              className="object-cover"
              sizes="45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Métricas: 3 columnas — indicador, label, número verde, imagen */}
      <div className="ab-metrics px-10 md:px-16 lg:px-20 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {metrics.map((m, i) => (
            <div
              key={m.id}
              className={`ab-metric flex flex-col min-h-[420px] md:min-h-[520px] py-12 px-8 md:px-14 ${i < metrics.length - 1 ? "md:border-r border-black/10" : ""
                }`}
            >
              <span className="text-[11px] tracking-[0.2em] text-black/30 font-medium mb-5">
                ({m.id})
              </span>
              <p
                className="text-black/70 font-medium mb-4"
                style={{ fontSize: "clamp(28px, 2.2vw, 37px)" }}
              >
                {m.label}
              </p>
              <p
                className="font-medium leading-none tracking-tight mb-10"
                style={{ fontSize: "clamp(4.5rem, 6.2vw, 7.5rem)", color: METRIC_BLUE }}
              >
                {m.value}
              </p>
              <div className="relative w-full flex-1 min-h-[180px] overflow-hidden mt-auto">
                <Image
                  src={m.image}
                  alt={m.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
