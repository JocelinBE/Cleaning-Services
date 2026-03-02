import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Flip } from "gsap/Flip"
import CustomEase from "gsap/CustomEase"
import { Draggable } from "gsap/Draggable"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, CustomEase, Draggable)
}

export { gsap, ScrollTrigger, Flip, CustomEase, Draggable }

