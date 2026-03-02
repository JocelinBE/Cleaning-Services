"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { InquiryModal } from "@/components/inquiry-modal"

type InquiryModalContextValue = {
  openInquiryModal: () => void
  closeInquiryModal: () => void
}

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null)

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext)
  if (!ctx) throw new Error("useInquiryModal must be used within InquiryModalProvider")
  return ctx
}

export function InquiryModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openInquiryModal = useCallback(() => setIsOpen(true), [])
  const closeInquiryModal = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.dispatchEvent(new CustomEvent("inquiry-modal-open"))
    } else {
      document.body.style.overflow = ""
      window.dispatchEvent(new CustomEvent("inquiry-modal-close"))
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && closeInquiryModal()
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, closeInquiryModal])

  return (
    <InquiryModalContext.Provider value={{ openInquiryModal, closeInquiryModal }}>
      {children}
      <InquiryModal isOpen={isOpen} onClose={closeInquiryModal} />
    </InquiryModalContext.Provider>
  )
}
