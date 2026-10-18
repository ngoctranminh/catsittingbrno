import type { Locale } from "@/lib/i18n"

export type Testimonial = {
  /** Client's name or initials — publish only with their consent. */
  author: string
  /** e.g. "Brno-Líšeň" */
  location?: string
  /** e.g. "Micka a Bob" */
  cats?: string
  quote: Record<Locale, string>
}

/**
 * Real client reviews only. While this list is empty, the home page shows
 * a "what we stand for" section instead of a testimonials slider.
 */
export const testimonials: Testimonial[] = []
