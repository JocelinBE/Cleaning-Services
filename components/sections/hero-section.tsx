"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { gsap, CustomEase } from "@/lib/gsap-utils"
import NextImage from "next/image"

const customEase = CustomEase.create("heroReveal", ".87,0,.13,1")

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const videoContainer = hero.querySelector(".h-video-wrap")
    const hwEls = hero.querySelectorAll(".hw")

    gsap.set(videoContainer, { scale: 1.1 })
    gsap.set(hero.querySelector(".h-content"), { visibility: "hidden" })
    gsap.set(hero.querySelectorAll(".h-meta-left, .h-meta-right"), { opacity: 0 })
    gsap.set(hero.querySelector(".h-logo"), { opacity: 0 })
    gsap.set(hero.querySelector(".h-sub"), { opacity: 0 })
    gsap.set(hwEls, { yPercent: 100, opacity: 0 })
    gsap.set(hero.querySelector(".h-scroll"), { opacity: 0, y: 6 })
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const videoContainer = hero.querySelector(".h-video-wrap")
    const hContent = hero.querySelector(".h-content")
    const hwEls = hero.querySelectorAll(".hw")
    const hMeta = hero.querySelectorAll(".h-meta-left, .h-meta-right")
    const hLogo = hero.querySelector(".h-logo")
    const hSub = hero.querySelector(".h-sub")
    const hScroll = hero.querySelector(".h-scroll")

    const revealHero = () => {
      gsap.set(hContent, { visibility: "visible" })
      gsap.to(videoContainer, { scale: 1, duration: 1.6, ease: "power3.out" })
      gsap.to(hMeta, { opacity: 1, duration: 1, stagger: 0.125, ease: "power3.out" })
      gsap.to(hLogo, { opacity: 1, duration: 1, stagger: 0.125, ease: "power3.out" })
      gsap.to(hwEls, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: customEase, delay: 0.2 })
      gsap.to(hSub, { opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" })
      gsap.to(hScroll, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" })
    }

    const onLoaderComplete = () => revealHero()

    const fallbackReveal = () => {
      document.body.dataset.loaderComplete = "true"
      window.dispatchEvent(new CustomEvent("pageloader:complete"))
      revealHero()
    }

    if (document.body.dataset.loaderComplete === "true") {
      revealHero()
    } else {
      window.addEventListener("pageloader:complete", onLoaderComplete)
      const t = setTimeout(fallbackReveal, 10000)
      return () => {
        window.removeEventListener("pageloader:complete", onLoaderComplete)
        clearTimeout(t)
      }
    }
    return () => window.removeEventListener("pageloader:complete", onLoaderComplete)
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen flex flex-col overflow-hidden bg-[hsl(200,50%,8%)]"
    >
      {/* Video container */}
      <div className="h-video-wrap absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto min-w-full min-h-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/4205781-uhd_3840_2160_25fps.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="h-content relative z-[2] flex flex-col h-full" style={{ visibility: "hidden" }}>
        <header className="flex items-center justify-between px-8 md:px-12 pt-8">
          <span className="h-meta-left text-[10px] tracking-[0.35em] uppercase text-white font-medium">
            San Diego, CA
          </span>
          <div className="h-logo flex flex-col items-center">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <NextImage
                src="/Recurso 1.png"
                alt="J&J Cleaning Services"
                fill
                className="object-contain"
                style={{ filter: "invert(1)" }}
                priority
              />
            </div>
          </div>
          <span className="h-meta-right text-[10px] tracking-[0.35em] uppercase text-white font-medium text-right">
            Premium
            <br />
            Residential
          </span>
        </header>

        <div className="mt-auto pb-16 md:pb-20 px-8 md:px-12">
          <p className="h-sub text-[9px] tracking-[0.45em] uppercase text-white/80 mb-6">
            Where perfection meets elegance
          </p>
          <h1
            className="font-medium text-white leading-[0.9] tracking-[-0.04em] overflow-hidden"
            style={{ fontSize: "clamp(2.3rem, 0.5rem + 4.6vw, 5.2rem)" }}
          >
            <div className="overflow-hidden pb-[0.15em]">
              <div className="hw">Exquisite Residential</div>
            </div>
            <div className="overflow-hidden pb-[0.15em] -mt-[0.12em]">
              <div className="hw">Cleaning in San Diego</div>
            </div>
            <div className="overflow-hidden pb-[0.15em] -mt-[0.12em]">
              <div className="hw font-normal italic" style={{ fontFamily: "var(--font-playfair)" }}>
                for the finest homes
              </div>
            </div>
          </h1>
          <div className="h-scroll flex items-center gap-3 mt-10">
            <div className="w-6 h-[1px] bg-white/40" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/80">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}
