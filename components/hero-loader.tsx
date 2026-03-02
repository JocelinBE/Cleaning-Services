import { forwardRef } from "react"
import NextImage from "next/image"

interface HeroLoaderProps {
    counterRef: React.RefObject<HTMLSpanElement>
}

export const HeroLoader = forwardRef<HTMLDivElement, HeroLoaderProps>(
    ({ counterRef }, ref) => {
        return (
            <div
                ref={ref}
                className="hero-loader-overlay absolute inset-0 z-[60] flex flex-col items-center justify-center"
                style={{ backgroundColor: "hsl(200, 50%, 8%)" }}
            >
                <div className="flex flex-col items-center -mt-8 space-y-1">
                    <div className="overflow-hidden">
                        <p
                            className="loader-text-line text-[clamp(1.6rem,4vw,3.2rem)] font-medium text-center leading-[1.15]"
                            style={{ color: "hsl(200, 80%, 92%)", letterSpacing: "-0.01em", opacity: 0 }}
                        >
                            Where <span className="italic-span" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "hsl(200, 70%, 65%)", fontWeight: 400 }}>perfection meets elegance</span>
                        </p>
                    </div>
                    <div className="overflow-hidden">
                        <p
                            className="loader-text-line text-[clamp(1.6rem,4vw,3.2rem)] font-medium text-center leading-[1.15]"
                            style={{ color: "hsl(200, 80%, 92%)", letterSpacing: "-0.01em", opacity: 0 }}
                        >
                            in residential cleaning
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center overflow-hidden">
                    <div className="relative w-8 h-8 md:w-10 md:h-10 loader-brand-logo" style={{ opacity: 0 }}>
                        <NextImage
                            src="/Recurso 1.png"
                            alt="J&J Logo"
                            fill
                            className="object-contain"
                            style={{ filter: "invert(1)" }}
                        />
                    </div>
                </div>

                {/* Progress bar at the very bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
                    <div className="h-progress-bar h-full bg-[hsl(200,85%,45%)] w-0" />
                </div>

                {/* Hidden counter so GSAP can still write to it */}
                <span ref={counterRef} className="hidden">0</span>
            </div>
        )
    }
)

HeroLoader.displayName = "HeroLoader"
