import { CalendarHeart, House, MessageCircleHeart, Sparkles } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import type { Dictionary } from "@/content"

const ICONS = [House, CalendarHeart, MessageCircleHeart, Sparkles]

export function Benefits({ benefits }: { benefits: Dictionary["home"]["benefits"] }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={benefits.eyebrow} title={benefits.title} lead={benefits.lead} align="center" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <Reveal as="li" key={item.title} delay={index * 0.08}>
                <div className="group h-full rounded-3xl border border-border/70 bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pink hover:shadow-[0_20px_40px_-28px_rgba(51,51,51,0.45)]">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-pink-soft transition-colors duration-300 group-hover:bg-pink">
                    <Icon className="size-5 text-pink-deep group-hover:text-charcoal" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-normal text-charcoal">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
