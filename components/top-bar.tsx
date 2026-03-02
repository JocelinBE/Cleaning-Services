"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap-utils"
import { useInquiryModal } from "@/contexts/inquiry-modal-context"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about-us" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
]

const PRIMARY = "hsl(200, 85%, 45%)"

export function TopBar() {
  const { openInquiryModal } = useInquiryModal()
  const barRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const activeRef = useRef("home")           // source of truth for pill — no re-render
  const inFooterRef = useRef(false)
  const entranceDoneRef = useRef(false)
  const scrollLocked = useRef(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [active, setActive] = useState("home")     // only for text-color re-render
  const [inFooter, setInFooter] = useState(false)
  const [barVisible, setBarVisible] = useState(false)
  const isHero = active === "home"
  const isDarkSection = active === "home" || active === "why-us"
  const isWhyUs = active === "why-us"
  const isContact = active === "contact"


  // ── Direct pill animation — never goes through React render cycle
  const animatePillTo = (idx: number) => {
    const el = navRefs.current[idx]
    const pill = pillRef.current
    if (!el || !pill) return
    gsap.to(pill, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.42,
      ease: "power2.inOut",
      overwrite: true,
    })
  }

  // ── Activate a section: animate pill + sync text color
  const activate = (id: string, animate = true) => {
    if (id === activeRef.current && animate) return
    activeRef.current = id
    setActive(id)
    const idx = navItems.findIndex(n => n.href === `#${id}`)
    if (idx !== -1) animatePillTo(idx)
  }

  // ── Entrance: cuando el page loader termina. Solo se ejecuta una vez (evita doble ejecución por Strict Mode / doble evento).
  useEffect(() => {
    const runEntrance = () => {
      if (entranceDoneRef.current) return
      entranceDoneRef.current = true

      gsap.fromTo(
        barRef.current,
        { y: 80 },
        {
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          onStart: () => {
            if (barRef.current) barRef.current.style.pointerEvents = "auto"
            setBarVisible(true)
          },
        },
      )
      gsap.from(".bar-left, .bar-center, .bar-right", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        delay: 0.15,
        stagger: 0.08,
        ease: "power3.out",
      })
      setTimeout(() => activate("home", false), 400)
    }

    if (document.body.dataset.loaderComplete === "true") {
      runEntrance()
    } else {
      const onComplete = () => runEntrance()
      window.addEventListener("pageloader:complete", onComplete)
      return () => window.removeEventListener("pageloader:complete", onComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Cada frame: detecta qué sección está detrás del header (abajo) — y si estamos en el footer (ocultar barra)
  useEffect(() => {
    const checkSectionAtHeader = () => {
      if (scrollLocked.current) return
      const bar = barRef.current
      const headerTop = bar ? window.innerHeight - bar.getBoundingClientRect().height : window.innerHeight - 100

      const footerEl = document.getElementById("footer")
      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect()
        if (footerRect.top <= headerTop) {
          if (!inFooterRef.current) {
            inFooterRef.current = true
            setInFooter(true)
          }
          return
        }
      }
      if (inFooterRef.current) {
        inFooterRef.current = false
        setInFooter(false)
      }

      for (let i = navItems.length - 1; i >= 0; i--) {
        const id = navItems[i].href.replace("#", "")
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= headerTop && rect.bottom >= headerTop) {
          activate(id)
          return
        }
      }
      for (let i = navItems.length - 1; i >= 0; i--) {
        const id = navItems[i].href.replace("#", "")
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= headerTop) {
          activate(id)
          return
        }
      }
    }

    checkSectionAtHeader()
    gsap.ticker.add(checkSectionAtHeader)
    return () => gsap.ticker.remove(checkSectionAtHeader)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Click handler
  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const id = href.replace("#", "")
    // Pill moves NOW — zero React involvement
    const idx = navItems.findIndex(n => n.href === href)
    animatePillTo(idx)
    activeRef.current = id
    setActive(id)
    // Lock scroll listener for duration of smooth scroll
    scrollLocked.current = true
    if (lockTimer.current) clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => { scrollLocked.current = false }, 1000)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const showBar = barVisible && !inFooter

  return (
    <nav
      ref={barRef}
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 ${inFooter ? "translate-y-full" : ""}`}
      style={{
        opacity: showBar ? 1 : 0,
        pointerEvents: showBar ? "auto" : "none",
      }}
    >
      {/* ── Left: CTA (en Contact queda transparente para no mover layout) */}
      <div className="bar-left">
        <button
          type="button"
          onClick={isContact ? undefined : openInquiryModal}
          className={`flex items-center gap-3 px-7 py-3.5 rounded-full text-white text-[12.5px] font-semibold tracking-[0.12em] uppercase transition-opacity ${
            isContact ? "opacity-0 pointer-events-none" : "hover:opacity-85"
          }`}
          style={{ backgroundColor: PRIMARY }}
        >
          Book a Cleaning
          <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
            <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Center: nav pill */}
      <div
        className="bar-center hidden md:flex items-center rounded-full backdrop-blur-md transition-colors duration-300"
        style={{ backgroundColor: isWhyUs ? "rgba(0,0,0,0.2)" : isDarkSection ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.04)" }}
      >
        <div ref={navContainerRef} className="relative flex items-center">
          <div
            ref={pillRef}
            className="absolute top-0 bottom-0 rounded-full pointer-events-none"
            style={{ backgroundColor: PRIMARY, left: 0, width: 0 }}
          />
          {navItems.map(({ label, href }, i) => {
            const id = href.replace("#", "")
            return (
              <a
                key={id}
                ref={el => { navRefs.current[i] = el }}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="relative z-10 px-6 py-3.5 rounded-full text-[12.5px] font-medium tracking-[0.08em] uppercase"
                style={{
                  color: active === id
                    ? "#fff"
                    : (isDarkSection ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)"),
                  transition: "color 0.3s",
                }}
              >
                {label}
              </a>
            )
          })}
        </div>
      </div>

      {/* ── Right */}
      <div className="bar-right flex items-center gap-4">
        <span className={`hidden lg:block text-[12px] tracking-wide transition-colors duration-300 ${isDarkSection ? "text-white/35" : "text-black/60"}`}>
          San Diego&apos;s Premier — Since 2009
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300 ${isDarkSection ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black"}`}
          style={{ backgroundColor: isWhyUs ? "rgba(0,0,0,0.2)" : isDarkSection ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)" }}
          aria-label="Back to top"
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
