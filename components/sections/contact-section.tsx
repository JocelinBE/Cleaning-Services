"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react"
import Stepper, { Step } from "@/components/ui/stepper"
import { useToast } from "@/components/ui/use-toast"

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      gsap.from(infoRef.current, {
        opacity: 0,
        x: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Validaciones
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

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (e.g., (619) 555-0123)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormErrors]
        return newErrors
      })
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
      }
    }
    
    setFormData((prev) => ({ ...prev, phone: value }))
    
    if (errors.phone) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.phone
        return newErrors
      })
    }
  }

  const handleStepChange = (step: number): boolean => {
    if (step > currentStep) {
      if (step === 2 && currentStep === 1) {
        if (!validateStep1()) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fix the errors before continuing.",
            duration: 3000,
          })
          return false
        }
      } else if (step === 3 && currentStep === 2) {
        if (!validateStep2()) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fix the errors before continuing.",
            duration: 3000,
          })
          return false
        }
      }
    }
    
    setCurrentStep(step)
    return true
  }

  const handleSubmit = async () => {
    if (!validateStep1() || !validateStep2()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix all errors before submitting.",
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log("Form submitted:", formData)
      
      toast({
        variant: "success",
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Message Sent Successfully!</span>
          </div>
        ),
        description: "We've received your message and will get back to you within 24 hours.",
        duration: 5000,
      })
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
      setErrors({})
      setCurrentStep(1)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let&apos;s discuss how we can elevate your home to perfection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Form Section */}
          <div ref={formRef} className="w-full">
            <Stepper
              initialStep={1}
              onStepChange={(step) => {
                return handleStepChange(step)
              }}
              onFinalStepCompleted={() => {
                handleSubmit()
              }}
              backButtonText="Previous"
              nextButtonText="Next"
              stepCircleContainerClassName="max-w-full bg-card border border-border shadow-sm"
            >
              <Step>
                <div className="space-y-5 py-2">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Your Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Let&apos;s start with your contact details
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          errors.name
                            ? "border-destructive focus:ring-destructive"
                            : "border-border"
                        }`}
                        placeholder="John Doe"
                        required
                        minLength={2}
                        maxLength={100}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          errors.email
                            ? "border-destructive focus:ring-destructive"
                            : "border-border"
                        }`}
                        placeholder="john@example.com"
                        required
                        maxLength={255}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          errors.phone
                            ? "border-destructive focus:ring-destructive"
                            : "border-border"
                        }`}
                        placeholder="(619) 555-0123"
                        required
                        maxLength={20}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Step>

              <Step>
                <div className="space-y-5 py-2">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Service Details</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell us about your cleaning needs
                    </p>
                  </div>
                  
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-foreground"
                    >
                      Message <span className="text-destructive">*</span>
                      <span className="text-xs text-muted-foreground ml-2 font-normal">
                        ({formData.message.length}/1000)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
                        errors.message
                          ? "border-destructive focus:ring-destructive"
                          : "border-border"
                      }`}
                      placeholder="Tell us about your cleaning needs, preferred schedule, property size, and any specific requirements..."
                      required
                      minLength={10}
                      maxLength={1000}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>
              </Step>

              <Step>
                <div className="space-y-5 py-2">
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Review & Submit</h3>
                    <p className="text-sm text-muted-foreground">
                      Please review your information before submitting
                    </p>
                  </div>
                  
                  <div className="space-y-4 p-6 rounded-lg bg-muted/30 border border-border">
                    <div className="pb-3 border-b border-border/50 last:border-b-0 last:pb-0">
                      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Full Name</div>
                      <div className="text-base text-foreground font-medium">{formData.name || "—"}</div>
                    </div>
                    <div className="pb-3 border-b border-border/50 last:border-b-0 last:pb-0">
                      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Email</div>
                      <div className="text-base text-foreground font-medium">{formData.email || "—"}</div>
                    </div>
                    <div className="pb-3 border-b border-border/50 last:border-b-0 last:pb-0">
                      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Phone</div>
                      <div className="text-base text-foreground font-medium">{formData.phone || "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Message</div>
                      <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{formData.message || "—"}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Click &quot;Complete&quot; to send your message. We&apos;ll get back to you within 24 hours.
                  </p>
                  
                  {isSubmitting && (
                    <div className="flex items-center justify-center gap-2 text-primary py-4">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <span className="text-sm font-medium">Sending message...</span>
                    </div>
                  )}
                </div>
              </Step>
            </Stepper>
          </div>

          {/* Contact Information Section */}
          <div ref={infoRef} className="space-y-8 lg:sticky lg:top-24">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-foreground">Phone</div>
                    <a
                      href="tel:+16195550123"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      (619) 555-0123
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-foreground">Email</div>
                    <a
                      href="mailto:info@jjcleaningservices.com"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                    >
                      info@jjcleaningservices.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-foreground">Service Area</div>
                    <div className="text-muted-foreground text-sm">
                      San Diego, CA & Surrounding Areas
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border/50">
              <h4 className="font-semibold mb-4 text-foreground">Business Hours</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-foreground font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-foreground font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-foreground font-medium">By Appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
