import { Plus } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import type { Dictionary } from "@/content"

export function Faq({ title, items }: { title: string; items: Dictionary["process"]["faq"] }) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="faq-title">
      <div className="container-page grid gap-10 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <h2 id="faq-title" className="font-heading text-3xl font-normal text-charcoal sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <details key={item.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg text-charcoal">
                <span>{item.q}</span>
                <Plus
                  className="mt-1 size-5 shrink-0 text-pink-deep transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 pr-10 leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
