"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode, type Ref } from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Small stagger for grids (0–0.3 s); delays the element's entrance. */
  delay?: number
  as?: "div" | "li" | "article"
}

/** One observer shared by every <Reveal> on the page. */
let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.reveal = "shown"
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  )
  return observer
}

/**
 * Gentle fade-and-rise the first time the element scrolls into view.
 * Triggered once and then played as a time-based CSS transition (see `.reveal`
 * in globals.css), so it stays smooth on phones instead of being tied to the
 * scroll position. Content is server-rendered visible: elements already on
 * screen, browsers without JS and reduced-motion users never see it hidden.
 */
export function Reveal({ children, className, delay = 0, as: Component = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.dataset.reveal = "hidden"
    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  return (
    <Component
      ref={ref as Ref<never>}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Component>
  )
}
