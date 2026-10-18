import { Quote } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import type { Dictionary } from "@/content"
import { testimonials } from "@/content/testimonials"
import type { Locale } from "@/lib/i18n"

/** Shows real testimonials once there are some; until then, what we stand for. */
export function TrustSection({ locale, home }: { locale: Locale; home: Dictionary["home"] }) {
  if (testimonials.length > 0) {
    return (
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={home.testimonials.eyebrow} title={home.testimonials.title} align="center" />
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal as="li" key={item.author} delay={index * 0.08}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-8">
                  <Quote className="size-7 text-sage" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 font-heading text-lg leading-relaxed text-charcoal">
                    {item.quote[locale]}
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground">
                    <span className="font-semibold text-charcoal">{item.author}</span>
                    {item.cats && <> · {item.cats}</>}
                    {item.location && <> · {item.location}</>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  const { promise } = home
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="rounded-[2.5rem] bg-beige-soft px-6 py-14 sm:px-12 md:py-20">
          <SectionHeading eyebrow={promise.eyebrow} title={promise.title} lead={promise.lead} align="center" />
          <ul className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-10">
            {promise.items.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.08} className="text-center">
                <span className="font-heading text-5xl text-sage-deep/70" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-normal text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
