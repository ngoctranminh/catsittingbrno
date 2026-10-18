import { ArrowRight, Check, HeartHandshake } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { CSSProperties } from "react"

import { buttonVariants } from "@/components/ui/button"
import type { Dictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import { images } from "@/lib/images"
import { cn } from "@/lib/utils"

export function Hero({ locale, hero }: { locale: Locale; hero: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="pointer-events-none absolute -top-48 -left-40 size-[36rem] rounded-full bg-beige/70 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-10rem] bottom-0 size-[28rem] rounded-full bg-sage-soft/80 blur-3xl" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="enter">
          <p className="eyebrow">
            <span className="h-px w-6 bg-sage-deep/60" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 font-heading text-[2.6rem] leading-[1.05] font-normal text-charcoal sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{hero.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={href("services", locale)} className={cn(buttonVariants({ size: "lg" }), "group")}>
              {hero.primaryCta}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href={href("contact", locale)} className={buttonVariants({ size: "lg", variant: "outline" })}>
              {hero.secondaryCta}
            </Link>
          </div>

          <ul className="mt-10 grid gap-3 text-sm text-charcoal/80 sm:grid-cols-3 sm:gap-4">
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage/50">
                  <Check className="size-3 text-charcoal" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="enter relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ "--enter-delay": "0.15s" } as CSSProperties}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-[2rem] shadow-[0_40px_80px_-40px_rgba(51,51,51,0.5)]">
            <Image
              src={images.sofa.src}
              alt={images.sofa.alt[locale]}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 448px, 92vw"
              className="object-cover object-[40%_center]"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex max-w-[17rem] items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-[0_18px_40px_-20px_rgba(51,51,51,0.4)] backdrop-blur sm:-left-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-soft">
              <HeartHandshake className="size-5 text-sage-deep" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-charcoal">{hero.badgeTitle}</span>
              <span className="block text-xs leading-snug text-muted-foreground">{hero.badgeText}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
