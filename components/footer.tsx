"use client"

import { useEffect, useRef } from "react"
import NextImage from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { useInquiryModal } from "@/contexts/inquiry-modal-context"

const FOOTER_BG = "hsl(200, 35%, 12%)"
const ACCENT = "hsl(200, 75%, 72%)"

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about-us" },
  { label: "Why Us", href: "#why-us" },
]

export function Footer() {
  const { openInquiryModal } = useInquiryModal()
  const footerRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const brand = brandRef.current
    if (!brand) return

    gsap.set(brand, { scale: 6, opacity: 0.9 })

    ScrollTrigger.create({
      trigger: brand,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(brand, {
          scale: 3,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        })
      },
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <>
    <footer id="footer" ref={footerRef} className="flex flex-col md:flex-row min-h-[520px] md:min-h-[480px]">
      {/* Imagen izquierda */}
      <div className="relative w-full md:w-[38%] min-h-[280px] md:min-h-[480px] flex-shrink-0">
        <NextImage
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=1200&auto=format&fit=crop"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 38vw"
        />
      </div>

      {/* Panel derecho */}
      <div
        className="flex-1 flex flex-col px-8 md:px-12 lg:px-16 py-10 md:py-12"
        style={{ backgroundColor: FOOTER_BG }}
      >
        {/* CTA + botón */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/10">
          <h2
            className="font-medium leading-tight max-w-md"
            style={{
              color: ACCENT,
              fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s keep{" "}
            <em style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}>
              your home
            </em>{" "}
            impeccable.
          </h2>
          <button
            type="button"
            onClick={openInquiryModal}
            className="flex items-center gap-2 self-start md:self-auto px-6 py-3.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase border-2 transition-opacity hover:opacity-90"
            style={{ color: FOOTER_BG, backgroundColor: ACCENT, borderColor: ACCENT }}
          >
            Book a cleaning
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Contacto + navegación */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 py-10 border-b border-white/10">
          <div className="space-y-1">
            <a href="mailto:info@jjcleaningservices.com" className="block text-white font-medium hover:opacity-85 transition-opacity" style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}>
              info@jjcleaningservices.com
            </a>
            <a href="tel:+16195550123" className="block text-white font-medium hover:opacity-85 transition-opacity" style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}>
              (619) 555-0123
            </a>
            <p className="text-white/80 text-sm mt-2">
              San Diego, CA
              <br />
              & Surrounding Areas
            </p>
          </div>
          <nav>
            <ul className="flex flex-col gap-3 text-right">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleScroll(e, href)}
                    className="text-white/90 hover:text-white text-sm font-medium transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright + crédito */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-auto pt-8">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} J&J Cleaning Services
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors self-start sm:self-auto"
          >
            Instagram
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>

    {/* Marca abajo del footer — zoom exagerado, texto recortado */}
    <div
      className="py-16 md:py-20 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <span
        ref={brandRef}
        className="font-medium tracking-tight text-white/50 inline-block origin-center"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
      >
        J&J Cleaning Services
      </span>
    </div>
    </>
  )
}
