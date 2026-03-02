"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { InquiryInlineForm } from "@/components/inquiry-inline-form"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      })
      gsap.from(infoRef.current, {
        opacity: 0,
        y: 28,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="bg-white">
      <div className="px-10 md:px-16 lg:px-20 pt-24 pb-32 md:pb-40">
        {/* ── Intro block (matching Services) */}
        <p className="text-[10px] tracking-[0.38em] uppercase text-black/35 font-medium mb-6">
          Inquiry Form
        </p>
        <div className="w-full h-[1px] bg-black/10 mb-10" />

        <h2
          className="text-black leading-[1.1] font-medium max-w-4xl mb-8"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", letterSpacing: "-0.03em" }}
        >
          Let&apos;s{" "}
          <em style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}>
            work together.
          </em>
        </h2>

        <p className="text-black/60 text-lg max-w-xl mb-24 leading-relaxed">
          Contact us to keep your home impeccable. Reach out by phone, email, or use the inquiry form below so we can tailor a cleaning plan for you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div ref={formRef}>
            <InquiryInlineForm />
          </div>

          <div ref={infoRef} className="lg:sticky lg:top-28 space-y-16">
            <div className="space-y-0 border-t border-black/10">
              {[
                { label: "Phone", value: "(619) 555-0123", href: "tel:+16195550123" as string | undefined },
                { label: "Email", value: "info@jjcleaningservices.com", href: "mailto:info@jjcleaningservices.com" },
                { label: "Service Area", value: "San Diego, CA & Surrounding Areas", href: undefined },
              ].map((item) => (
                <div key={item.label} className="py-7 border-b border-black/5">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-black/35 mb-3 font-medium">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-lg font-medium text-black hover:text-blue-600 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-lg font-medium text-black">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-black/35 mb-8 font-medium">Business Hours</div>
              <div className="space-y-6">
                {[
                  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
                  { day: "Sunday", hours: "By Appointment" },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center group">
                    <span className="text-sm text-black/45 group-hover:text-black/60 transition-colors">{row.day}</span>
                    <span className="text-sm font-medium text-black">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
