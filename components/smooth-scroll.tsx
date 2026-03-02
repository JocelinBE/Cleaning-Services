"use client"

import { useEffect } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return

    let rafId: number
    let lenisInstance: import("lenis").default | null = null

    const init = async () => {
      const [{ default: Lenis }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap-utils"),
      ])

      lenisInstance = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      })

      lenisInstance.on("scroll", ScrollTrigger.update)

      const onModalOpen = () => lenisInstance?.stop()
      const onModalClose = () => lenisInstance?.start()
      window.addEventListener("inquiry-modal-open", onModalOpen)
      window.addEventListener("inquiry-modal-close", onModalClose)

      function raf(time: number) {
        lenisInstance?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      return () => {
        window.removeEventListener("inquiry-modal-open", onModalOpen)
        window.removeEventListener("inquiry-modal-close", onModalClose)
      }
    }

    let teardown: (() => void) | void
    init().then((fn) => { teardown = fn })

    return () => {
      cancelAnimationFrame(rafId)
      teardown?.()
      lenisInstance?.destroy()
    }
  }, [])

  return <>{children}</>
}
