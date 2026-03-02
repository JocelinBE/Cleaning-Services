"use client"

import { motion } from "framer-motion"

interface MarqueeProps {
  text?: string
  items?: string[]
  duration?: number
  reverse?: boolean
}

const defaultItems = [
  "Premium Residential Cleaning",
  "San Diego",
  "Eco-Friendly",
  "White Glove Service",
  "Insured & Bonded",
  "Est. 2009",
  "500+ Satisfied Clients",
  "100% Satisfaction",
]

export function Marquee({
  items = defaultItems,
  duration = 40,
  reverse = false,
}: MarqueeProps) {
  const allItems = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-border/20 py-4 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-6 text-[10px] tracking-[0.38em] uppercase text-muted-foreground"
          >
            {item}
            <span className="text-primary text-[8px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
