import Image from "next/image"

import { SectionHeading } from "@/components/sections/section-heading"
import type { CatImage } from "@/lib/images"
import type { Locale } from "@/lib/i18n"

type PageHeaderProps = {
  eyebrow: string
  title: string
  lead: string
  image?: CatImage
  locale: Locale
}

/** Top section of inner pages: the page's H1 with an optional photo. */
export function PageHeader({ eyebrow, title, lead, image, locale }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20">
      <div
        className="pointer-events-none absolute -top-40 -right-32 size-[30rem] opacity-70 bg-[radial-gradient(closest-side,var(--pink-soft),transparent)]"
        aria-hidden="true"
      />
      <div className="container-page relative grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lead={lead} />
        {image && (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-30px_rgba(51,51,51,0.45)] md:block">
            <Image
              src={image.src}
              alt={image.alt[locale]}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1152px) 440px, 40vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
