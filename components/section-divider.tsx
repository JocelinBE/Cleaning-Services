"use client"

export function SectionDivider() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Linear-style divider */}
      <div className="relative h-px w-full">
        {/* Dark mode: subtle gray line */}
        <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-transparent dark:via-border/30 dark:to-transparent" />
        {/* Light mode: subtle border */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent dark:hidden" />
      </div>
    </div>
  )
}
