"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Mail, MessageCircle } from "lucide-react"
import Stepper, { Step } from "@/components/ui/stepper"

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const MODAL_BG = "#ffffff"
const MODAL_BG_TOP = "#fcfcfc"
const ACCENT = "hsl(200, 75%, 45%)"
const ACCENT_SOFT = "hsl(200, 60%, 55%)"

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "16195550123"
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ""

const inputBase =
  "w-full px-4 py-3.5 border border-black/10 bg-black/[0.02] text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[hsl(200,75%,45%)]/20 focus:border-[hsl(200,75%,45%)] transition-all duration-200 text-sm rounded-xl"

export function InquiryInlineForm() {
  const [stepperStep, setStepperStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredSchedule: "",
    preferredContact: null as "email" | "whatsapp" | null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastSentVia, setLastSentVia] = useState<"email" | "whatsapp" | null>(null)

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, "")
    return cleaned.length >= 10 && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
  }

  const validateStep1 = (): boolean => {
    if (!formData.preferredContact) return false
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Full name is required"
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"
    if (formData.preferredContact === "email") {
      if (!formData.email.trim()) newErrors.email = "Email address is required"
      else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      else if (!validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.message.trim()) newErrors.message = "Message is required"
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"
    else if (formData.message.trim().length > 1000) newErrors.message = "Message must be less than 1000 characters"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 0) {
      if (value.length <= 3) value = `(${value}`
      else if (value.length <= 6) value = `(${value.slice(0, 3)}) ${value.slice(3)}`
      else value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
    }
    setFormData((prev) => ({ ...prev, phone: value }))
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  const handleStepChange = (newStep: number): boolean => {
    setSubmitError(null)
    if (newStep > stepperStep) {
      if (newStep === 3 && stepperStep === 2) {
        if (!validateStep1()) return false
      }
      if (newStep === 4 && stepperStep === 3 && !validateStep2()) return false
    }
    setStepperStep(newStep)
    return true
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    if (!validateStep1() || !validateStep2()) return

    if (formData.preferredContact === "whatsapp") {
      const lines = [
        `Hi! I'm ${formData.name}.`,
        "",
        formData.message,
        formData.preferredSchedule ? `Preferred: ${formData.preferredSchedule}` : "",
      ].filter(Boolean)
      const text = encodeURIComponent(lines.join("\n"))
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer")
      setLastSentVia("whatsapp")
      setFormData({ name: "", email: "", phone: "", message: "", preferredSchedule: "", preferredContact: null })
      setErrors({})
      setShowSuccess(true)
      return
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setLastSentVia("email")
      setFormData({ name: "", email: "", phone: "", message: "", preferredSchedule: "", preferredContact: null })
      setErrors({})
      setShowSuccess(true)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Inquiry from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          preferred_schedule: formData.preferredSchedule,
          botcheck: "",
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send")
      }
      setLastSentVia("email")
      setFormData({ name: "", email: "", phone: "", message: "", preferredSchedule: "", preferredContact: null })
      setErrors({})
      setShowSuccess(true)
    } catch {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setShowSuccess(false)
    setLastSentVia(null)
    setStepperStep(1)
  }

  return (
    <div
      className="inquiry-modal-panel w-full max-w-xl overflow-hidden flex flex-col rounded-2xl border border-white/[0.08]"
      style={{
        fontFamily: "var(--font-figtree), sans-serif",
        background: `linear-gradient(180deg, ${MODAL_BG_TOP} 0%, ${MODAL_BG} 35%, ${MODAL_BG} 100%)`,
        boxShadow: "0 32px 64px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      {!showSuccess && (
        <div className="flex-shrink-0 flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-black/5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] tracking-[0.32em] uppercase text-black/35 font-medium">Get in touch</span>
              <div className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: ACCENT, fontFamily: "var(--font-playfair), serif" }}>
              You&apos;re one step away.
            </h2>
            <p className="text-sm text-black/50 mt-1.5">Choose how you&apos;d like us to reply—<strong className="text-black/70 font-semibold">email</strong> or <strong className="text-black/70 font-semibold">WhatsApp</strong>. We answer within 24 hours.</p>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-6 sm:px-8 py-5 sm:py-6 inquiry-modal-scroll">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8" style={{ backgroundColor: `${ACCENT}20` }}>
              <CheckCircle2 className="h-12 w-12" style={{ color: ACCENT }} />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
              Message sent!
            </h3>
            <p className="text-base text-white/70 mb-8 max-w-sm leading-relaxed">
              We&apos;ll get back to you by {lastSentVia === "whatsapp" ? "WhatsApp" : "email"} within 24 hours.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl px-8 py-4 text-base font-semibold transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: ACCENT, color: MODAL_BG }}
            >
              Send another
            </button>
          </div>
        ) : (
          <Stepper
            initialStep={1}
            step={stepperStep}
            onStepChange={handleStepChange}
            onFinalStepCompleted={handleSubmit}
            backButtonText="Previous"
            nextButtonText="Next"
            stepCircleContainerClassName="max-w-full bg-transparent border-0 shadow-none rounded-none inquiry-modal-stepper"
            hideFooterOnSteps={[1]}
            hideIndicatorRowOnSteps={[1]}
          >
            <Step>
              <div className="space-y-5 py-2">
                <p className="text-sm font-medium tracking-wide text-white/90 mb-4">How would you like us to get back to you?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((p) => ({ ...p, preferredContact: "email" }))
                      setStepperStep(2)
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] text-black/60 hover:border-black/20 hover:bg-black/[0.04] py-4 px-5 transition-all duration-200 text-sm font-medium"
                  >
                    <Mail className="h-5 w-5" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((p) => ({ ...p, preferredContact: "whatsapp" }))
                      setStepperStep(2)
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] text-black/60 hover:border-black/20 hover:bg-black/[0.04] py-4 px-5 transition-all duration-200 text-sm font-medium"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </Step>
            <Step>
              <div className="space-y-5 py-2">
                <div className="mb-6 pl-4 border-l-2 border-white/20" style={{ borderLeftColor: ACCENT_SOFT }}>
                  <h3 className="text-base font-semibold tracking-tight text-white">Your Information</h3>
                  <p className="text-xs text-white/55 mt-1">
                    {formData.preferredContact === "email" ? "We'll reply to your email." : "We'll reach you on WhatsApp."}
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="inquiry-inline-name" className="block text-xs font-medium mb-2 tracking-wide text-black/60">
                      Full Name <span style={{ color: ACCENT }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="inquiry-inline-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${inputBase} ${errors.name ? "border-red-400 focus:ring-red-400 focus:border-red-400" : ""}`}
                      placeholder="John Doe"
                      required
                      minLength={2}
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.name}
                      </p>
                    )}
                  </div>
                  {formData.preferredContact === "email" && (
                    <>
                      <div>
                        <label htmlFor="inquiry-inline-email" className="block text-xs font-medium mb-2 tracking-wide text-white/80">
                          Email Address <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <input
                          type="email"
                          id="inquiry-inline-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`${inputBase} ${errors.email ? "border-red-400 focus:ring-red-400 focus:border-red-400" : ""}`}
                          placeholder="john@example.com"
                          required
                          maxLength={255}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1.5">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="inquiry-inline-phone" className="block text-xs font-medium mb-2 tracking-wide text-black/60">
                          Phone Number <span style={{ color: ACCENT }}>*</span>
                        </label>
                        <input
                          type="tel"
                          id="inquiry-inline-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className={`${inputBase} ${errors.phone ? "border-red-400 focus:ring-red-400 focus:border-red-400" : ""}`}
                          placeholder="(619) 555-0123"
                          required
                          maxLength={20}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1.5">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Step>
            <Step>
              <div className="space-y-5 py-2">
                <div className="mb-6 pl-4 border-l-2 border-white/20" style={{ borderLeftColor: ACCENT_SOFT }}>
                  <h3 className="text-base font-semibold tracking-tight text-white">Service Details</h3>
                  <p className="text-xs text-white/55 mt-1">Tell us about your cleaning needs</p>
                </div>
                <div>
                  <label htmlFor="inquiry-inline-message" className="block text-xs font-medium mb-2 tracking-wide text-black/60">
                    Message <span style={{ color: ACCENT }}>*</span>
                    <span className="text-black/30 ml-2 font-normal">({formData.message.length}/1000)</span>
                  </label>
                  <textarea
                    id="inquiry-inline-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`${inputBase} resize-none ${errors.message ? "border-red-400 focus:ring-red-400 focus:border-red-400" : ""}`}
                    placeholder="Tell us about your cleaning needs, property size, and any specific requirements..."
                    required
                    minLength={10}
                    maxLength={1000}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="inquiry-inline-schedule" className="block text-xs font-medium mb-2 tracking-wide text-white/70">
                    Preferred date or frequency <span className="text-white/45 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="inquiry-inline-schedule"
                    name="preferredSchedule"
                    value={formData.preferredSchedule}
                    onChange={handleInputChange}
                    className={inputBase}
                    placeholder="e.g. Weekly, March 15, One-time deep clean..."
                    maxLength={120}
                  />
                </div>
              </div>
            </Step>
            <Step>
              <div className="space-y-5 py-2">
                <div className="mb-6 pl-4 border-l-2 border-white/20" style={{ borderLeftColor: ACCENT_SOFT }}>
                  <h3 className="text-base font-semibold tracking-tight text-white">Review &amp; Submit</h3>
                  <p className="text-xs text-white/55 mt-1">Please review your information before submitting</p>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Full Name", value: formData.name },
                    ...(formData.preferredContact === "email"
                      ? [
                        { label: "Email", value: formData.email },
                        { label: "Phone", value: formData.phone },
                      ]
                      : []),
                    { label: "Reply via", value: formData.preferredContact === "whatsapp" ? "WhatsApp" : "Email" },
                    { label: "Message", value: formData.message },
                    { label: "Preferred date or frequency", value: formData.preferredSchedule },
                  ].map((field) => (
                    <div key={field.label} className="rounded-xl border border-black/5 bg-black/[0.01] px-4 py-3">
                      <div className="text-[11px] tracking-[0.2em] uppercase text-black/35 mb-2 font-medium">{field.label}</div>
                      <div className="text-base text-black/80 font-medium whitespace-pre-wrap leading-relaxed">{field.value || "—"}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-black/40 pt-1">We&apos;ll reply by {formData.preferredContact === "whatsapp" ? "WhatsApp" : "email"} within 24 hours.</p>
                {isSubmitting && (
                  <div className="flex items-center gap-2 py-3 rounded-xl bg-white/[0.06] px-4" style={{ color: ACCENT }}>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span className="text-sm font-medium tracking-wide">Sending...</span>
                  </div>
                )}
                {submitError && (
                  <p className="text-sm text-red-300 flex items-center gap-2 py-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {submitError}
                  </p>
                )}
              </div>
            </Step>
          </Stepper>
        )}
      </div>
    </div>
  )
}
