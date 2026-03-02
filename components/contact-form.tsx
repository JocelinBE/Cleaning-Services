"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import Stepper, { Step } from "@/components/ui/stepper"
import { useToast } from "@/components/ui/use-toast"

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

export interface ContactFormProps {
  idPrefix?: string
  onSuccess?: () => void
  stepCircleContainerClassName?: string
}

export function ContactForm({
  idPrefix = "",
  onSuccess,
  stepCircleContainerClassName = "max-w-full bg-card border border-border/50 shadow-none rounded-none",
}: ContactFormProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredSchedule: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, "")
    return cleaned.length >= 10 && phoneRegex.test(phone)
  }

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Full name is required"
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"
    if (!formData.email.trim()) newErrors.email = "Email address is required"
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!validatePhone(formData.phone)) newErrors.phone = "Please enter a valid phone number (e.g., (619) 555-0123)"
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
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof FormErrors]
        return next
      })
    }
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

  const handleStepChange = (step: number): boolean => {
    if (step > currentStep) {
      if (step === 2 && currentStep === 1 && !validateStep1()) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please fix the errors before continuing.", duration: 3000 })
        return false
      }
      if (step === 3 && currentStep === 2 && !validateStep2()) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please fix the errors before continuing.", duration: 3000 })
        return false
      }
    }
    setCurrentStep(step)
    return true
  }

  const handleSubmit = async () => {
    if (!validateStep1() || !validateStep2()) {
      toast({ variant: "destructive", title: "Validation Error", description: "Please fix all errors before submitting.", duration: 3000 })
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        variant: "success",
        title: "Message Sent Successfully!",
        description: "We've received your message and will get back to you within 24 hours.",
        duration: 5000,
      })
      setFormData({ name: "", email: "", phone: "", message: "", preferredSchedule: "" })
      setErrors({})
      setCurrentStep(1)
      onSuccess?.()
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Something went wrong. Please try again later.", duration: 5000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase =
    "w-full px-4 py-3 border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all text-sm rounded-none"

  return (
    <Stepper
      initialStep={1}
      onStepChange={handleStepChange}
      onFinalStepCompleted={handleSubmit}
      backButtonText="Previous"
      nextButtonText="Next"
      stepCircleContainerClassName={stepCircleContainerClassName}
    >
      <Step>
        <div className="space-y-5 py-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold tracking-tight mb-1">Your Information</h3>
            <p className="text-xs text-muted-foreground tracking-wide">Let&apos;s start with your contact details</p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor={id("name")} className="block text-xs font-medium mb-2 tracking-wide text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id={id("name")}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${inputBase} ${errors.name ? "border-destructive focus:ring-destructive focus:border-destructive" : "border-border"}`}
                placeholder="John Doe"
                required
                minLength={2}
                maxLength={100}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor={id("email")} className="block text-xs font-medium mb-2 tracking-wide text-foreground">
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                id={id("email")}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${inputBase} ${errors.email ? "border-destructive focus:ring-destructive focus:border-destructive" : "border-border"}`}
                placeholder="john@example.com"
                required
                maxLength={255}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor={id("phone")} className="block text-xs font-medium mb-2 tracking-wide text-foreground">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                id={id("phone")}
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={`${inputBase} ${errors.phone ? "border-destructive focus:ring-destructive focus:border-destructive" : "border-border"}`}
                placeholder="(619) 555-0123"
                required
                maxLength={20}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </Step>
      <Step>
        <div className="space-y-5 py-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold tracking-tight mb-1">Service Details</h3>
            <p className="text-xs text-muted-foreground tracking-wide">Tell us about your cleaning needs</p>
          </div>
          <div>
            <label htmlFor={id("message")} className="block text-xs font-medium mb-2 tracking-wide text-foreground">
              Message <span className="text-destructive">*</span>
              <span className="text-muted-foreground ml-2 font-normal">({formData.message.length}/1000)</span>
            </label>
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className={`${inputBase} resize-none ${errors.message ? "border-destructive focus:ring-destructive focus:border-destructive" : "border-border"}`}
              placeholder="Tell us about your cleaning needs, property size, and any specific requirements..."
              required
              minLength={10}
              maxLength={1000}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-destructive flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {errors.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={id("preferredSchedule")} className="block text-xs font-medium mb-2 tracking-wide text-muted-foreground">
              Preferred date or frequency <span className="text-muted-foreground/70">(optional)</span>
            </label>
            <input
              type="text"
              id={id("preferredSchedule")}
              name="preferredSchedule"
              value={formData.preferredSchedule}
              onChange={handleInputChange}
              className={`${inputBase} border-border`}
              placeholder="e.g. Weekly, March 15, One-time deep clean..."
              maxLength={120}
            />
          </div>
        </div>
      </Step>
      <Step>
        <div className="space-y-5 py-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold tracking-tight mb-1">Review &amp; Submit</h3>
            <p className="text-xs text-muted-foreground tracking-wide">Please review your information before submitting</p>
          </div>
          <div className="space-y-0 border-t border-border/40">
            {[
              { label: "Full Name", value: formData.name },
              { label: "Email", value: formData.email },
              { label: "Phone", value: formData.phone },
              { label: "Message", value: formData.message },
              { label: "Preferred date or frequency", value: formData.preferredSchedule },
            ].map((field) => (
              <div key={field.label} className="py-4 border-b border-border/30">
                <div className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-1.5">{field.label}</div>
                <div className="text-sm text-foreground font-medium whitespace-pre-wrap leading-relaxed">{field.value || "—"}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground pt-2">Click &quot;Complete&quot; to send. We&apos;ll respond within 24 hours.</p>
          {isSubmitting && (
            <div className="flex items-center gap-2 text-primary py-2">
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-xs font-medium tracking-wide">Sending...</span>
            </div>
          )}
        </div>
      </Step>
    </Stepper>
  )
}
