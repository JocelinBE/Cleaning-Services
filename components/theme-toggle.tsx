"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { gsap } from "@/lib/gsap-utils"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const sunRef = React.useRef<SVGSVGElement>(null)
  const moonRef = React.useRef<SVGSVGElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted || !sunRef.current || !moonRef.current) return

    if (theme === "dark") {
      // Animate to moon
      gsap.to(sunRef.current, {
        rotation: 90,
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      gsap.fromTo(
        moonRef.current,
        {
          rotation: -90,
          scale: 0,
          opacity: 0,
        },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        }
      )
    } else {
      // Animate to sun
      gsap.to(moonRef.current, {
        rotation: -90,
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      gsap.fromTo(
        sunRef.current,
        {
          rotation: 90,
          scale: 0,
          opacity: 0,
        },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        }
      )
    }
  }, [theme, mounted])

  const handleClick = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 relative">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="w-9 h-9 relative overflow-hidden transition-colors duration-200 hover:bg-accent"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Sun
          ref={sunRef}
          className="h-4 w-4 absolute"
          style={{
            opacity: theme === "dark" ? 0 : 1,
            transform: `rotate(${theme === "dark" ? 90 : 0}deg) scale(${theme === "dark" ? 0 : 1})`,
          }}
        />
        <Moon
          ref={moonRef}
          className="h-4 w-4 absolute"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            transform: `rotate(${theme === "dark" ? 0 : -90}deg) scale(${theme === "dark" ? 1 : 0})`,
          }}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
