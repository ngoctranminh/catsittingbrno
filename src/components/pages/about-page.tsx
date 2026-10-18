import { Eye, Heart, House, MessageCircle, ShieldCheck } from "lucide-react"
import Image from "next/image"

import { Reveal } from "@/components/motion/reveal"
import { CtaBand } from "@/components/sections/cta-band"
import { PageHeader } from "@/components/sections/page-header"
import { SectionHeading } from "@/components/sections/section-heading"
import { getDictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import { images } from "@/lib/images"

const VALUE_ICONS = [Heart, ShieldCheck, House, MessageCircle, Eye]

export function AboutPage({ locale }: { locale: Locale }) {
  const { about } = getDictionary(locale)

  return (
    <>
      <PageHeader locale={locale} image={images.homeLounge} {...about.header} />

      <section className="py-16 md:py-24">
        <div className="container-page grid items-start gap-12 md:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[10rem] rounded-b-[2rem]">
              <Image
                src={images.stairs.src}
                alt={images.stairs.alt[locale]}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="md:pt-10">
            <Reveal>
              <h2 className="font-heading text-3xl font-normal text-charcoal sm:text-4xl">{about.story.title}</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={about.values.eyebrow} title={about.values.title} align="center" />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {about.values.items.map((value, index) => {
              const Icon = VALUE_ICONS[index % VALUE_ICONS.length]
              return (
                <Reveal
                  as="li"
                  key={value.title}
                  delay={(index % 3) * 0.08}
                  className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
                >
                  <div className="h-full rounded-3xl bg-cream p-7 transition-transform duration-300 hover:-translate-y-1">
                    <Icon className="size-6 text-sage-deep" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-normal text-charcoal">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <CtaBand {...about.cta} href={href("contact", locale)} />
    </>
  )
}
