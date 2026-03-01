"use client"

import Link from "next/link"

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">J & J Cleaning Services</h3>
            <p className="text-sm text-muted-foreground">
              Elite residential cleaning services for San Diego&apos;s most
              discerning homeowners.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleScroll(e, "#home")}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScroll(e, "#services")}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about-us"
                  onClick={(e) => handleScroll(e, "#about-us")}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleScroll(e, "#why-us")}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Why Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>(619) 555-0123</li>
              <li>info@jjcleaningservices.com</li>
              <li>San Diego, CA</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
            <p className="text-sm text-muted-foreground">
              Connect with us on social media for cleaning tips and updates.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} J & J Cleaning Services. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

