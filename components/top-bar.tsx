"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export function TopBar() {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "border-b border-border/40",
        "bg-background/80 backdrop-blur-md",
        "supports-[backdrop-filter]:bg-background/60",
        "transition-colors duration-200"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo y Navigation Links - Alineados a la izquierda */}
          <div className="flex items-center space-x-8 flex-1">
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 44.58 45.59"
                className="h-6 w-auto"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="4"
              >
                <line x1="28.75" y1="43.59" x2="32.07" y2="43.59"/>
                <path d="M25.93,6.99l16.61,16.1c-.03,1.08.1,6.6,0,10.08-.22,7.52-5.71,10.19-10.93,10.41"/>
                <line x1="16.19" y1="35.78" x2="16.19" y2="27.74"/>
                <path d="M16.19,29.69v-6.62c0-3.43,1.59-6.81,4.62-9.82l7.14-7.09"/>
                <path d="M.44,43.26l13.73.08c-.76,0,.26,0,.93-.04,5.3-.22,10.86-2.86,11.09-10.28.1-3.44-.03-8.89,0-9.96"/>
                <path d="M2,45.26v-22.91L22.71,1.41"/>
              </svg>
              <span className="text-sm font-semibold uppercase">J & J Cleaning Services</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#home"
                onClick={(e) => handleScroll(e, "#home")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={(e) => handleScroll(e, "#services")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                Services
              </a>
              <a
                href="#about-us"
                onClick={(e) => handleScroll(e, "#about-us")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                About Us
              </a>
              <a
                href="#why-us"
                onClick={(e) => handleScroll(e, "#why-us")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                Why Us
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Theme Toggle - Alineado a la derecha */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

