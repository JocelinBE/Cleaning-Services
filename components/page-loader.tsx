"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, CustomEase } from "@/lib/gsap-utils"
import NextImage from "next/image"

const customEase = CustomEase.create("loaderReveal", ".87,0,.13,1")

export function PageLoader({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const onLoad = () => setIsReady(true)
    if (document.readyState === "complete") {
      onLoad()
    } else {
      window.addEventListener("load", onLoad)
    }
    const fallback = setTimeout(onLoad, 2500)
    return () => {
      window.removeEventListener("load", onLoad)
      clearTimeout(fallback)
    }
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    const counter = counterRef.current
    if (!overlay || !isReady) return

    gsap.set(".loader-text-line", { yPercent: 100, opacity: 0 })
    gsap.set(".loader-brand-logo", { yPercent: 100, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: customEase } })

    tl.to(".loader-text-line", {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    }, 0.3)
      .to(".loader-brand-logo", {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }, 0.7)

    tl.to(".h-progress-bar", {
      width: "100%",
      duration: 2.2,
      ease: "power2.inOut",
      onStart: () => {
        if (counter) {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: 100,
            duration: 2.2,
            ease: "power2.inOut",
            snap: { val: 1 },
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(obj.val))
            },
          })
        }
      },
    })

    tl.to(overlay, {
      yPercent: -100,
      duration: 1.4,
      ease: "power3.inOut",
      onComplete: () => {
        overlay.style.pointerEvents = "none"
        document.body.dataset.loaderComplete = "true"
        window.dispatchEvent(new CustomEvent("pageloader:complete"))
      },
    }, "+=0.1")

    return () => { tl.kill() }
  }, [isReady])

  return (
    <>
      {children}

      <div
        ref={overlayRef}
        className="page-loader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto"
        style={{ backgroundColor: "hsl(200, 50%, 8%)" }}
      >
        <div className="flex flex-col items-center -mt-8 space-y-1">
          <div className="overflow-hidden">
            <p
              className="loader-text-line text-[clamp(1.6rem,4vw,3.2rem)] font-medium text-center leading-[1.15]"
              style={{ color: "hsl(200, 80%, 92%)", letterSpacing: "-0.01em", opacity: 0 }}
            >
              Where{" "}
              <span className="italic-span" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "hsl(200, 70%, 65%)", fontWeight: 400 }}>
                perfection meets elegance
              </span>
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              className="loader-text-line text-[clamp(1.6rem,4vw,3.2rem)] font-medium text-center leading-[1.15]"
              style={{ color: "hsl(200, 80%, 92%)", letterSpacing: "-0.01em", opacity: 0 }}
            >
              in residential cleaning
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="relative w-8 h-8 md:w-10 md:h-10 loader-brand-logo" style={{ opacity: 0 }}>
            <NextImage
              src="/Recurso 1.png"
              alt="J&J Logo"
              fill
              className="object-contain"
              style={{ filter: "invert(1)" }}
              priority
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
          <div className="h-progress-bar h-full bg-[hsl(200,85%,45%)] w-0" />
        </div>

        <span ref={counterRef} className="hidden">0</span>
      </div>
    </>
  )
}
