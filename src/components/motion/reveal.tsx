import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Small stagger for grids (0–0.3); shifts when the element starts animating. */
  delay?: number
  as?: "div" | "li" | "article"
}

/**
 * Gentle fade-and-rise as the element scrolls into view.
 * Pure CSS (scroll-driven animation, see `.reveal` in globals.css): content is
 * always in the HTML and visible without JavaScript; browsers without support
 * or with reduced motion simply show it without animation.
 */
export function Reveal({ children, className, delay = 0, as: Component = "div" }: RevealProps) {
  return (
    <Component
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${Math.round(delay * 100)}%` } as CSSProperties) : undefined}
    >
      {children}
    </Component>
  )
}
