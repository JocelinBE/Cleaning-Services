"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-utils"

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.matchMedia("(pointer: fine)").matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let visible = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(dot, { x: mouseX - 2.5, y: mouseY - 2.5 })

      if (!visible) {
        visible = true
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 })
      }
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX - 15, y: ringY - 15 })
    }

    gsap.ticker.add(tick)

    const onHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [role='button'], input, textarea")) {
        gsap.to(ring, { scale: 1.9, duration: 0.35, ease: "power2.out" })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      }
    }

    const onHoverOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [role='button'], input, textarea")) {
        gsap.to(ring, { scale: 1, duration: 0.35, ease: "power2.out" })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onHoverIn)
    document.addEventListener("mouseout", onHoverOut)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onHoverIn)
      document.removeEventListener("mouseout", onHoverOut)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 hidden md:block"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "1px solid currentColor",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
      {/* Exact-follow dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 hidden md:block"
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: "currentColor",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
    </>
  )
}
