import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import type { Dictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import { images } from "@/lib/images"

export function Intro({ locale, intro }: { locale: Locale; intro: Dictionary["home"]["intro"] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-last md:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-muted">
            <Image
              src={images.petting.src}
              alt={images.petting.alt[locale]}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-3 -z-10 size-full rounded-[2rem] bg-charcoal sm:-right-5 sm:-bottom-5" aria-hidden="true" />
        </Reveal>

        <div>
          <SectionHeading eyebrow={intro.eyebrow} title={intro.title} />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link
              href={href("about", locale)}
              className="group inline-flex items-center gap-2 pt-2 text-base font-medium text-charcoal underline decoration-pink decoration-2 underline-offset-8 transition-colors hover:decoration-pink-deep"
            >
              {intro.link}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
