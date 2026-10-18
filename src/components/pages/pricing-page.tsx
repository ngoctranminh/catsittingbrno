import { Check, Info } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { PageHeader } from "@/components/sections/page-header"
import { buttonVariants } from "@/components/ui/button"
import { getDictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function PricingPage({ locale }: { locale: Locale }) {
  const { pricing, common } = getDictionary(locale)

  return (
    <>
      <PageHeader locale={locale} {...pricing.header} />

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pricing.packages.map((pkg, index) => (
              <Reveal as="li" key={pkg.id} delay={index * 0.08} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(51,51,51,0.45)]",
                    pkg.featured ? "border-charcoal bg-charcoal text-cream" : "border-border/70 bg-white",
                  )}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-pink px-3 py-1 text-xs font-semibold text-charcoal">
                      {pricing.featuredLabel}
                    </span>
                  )}
                  <h2 className="font-heading text-2xl font-normal">{pkg.name}</h2>
                  <p className={cn("mt-2 text-sm leading-relaxed", pkg.featured ? "text-cream/75" : "text-muted-foreground")}>
                    {pkg.description}
                  </p>
                  <p
                    className={cn(
                      "mt-6 border-y py-4 font-heading text-xl",
                      pkg.featured ? "border-cream/15 text-pink" : "border-border/70 text-pink-deep",
                    )}
                  >
                    {common.priceOnRequest}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className={cn("mt-0.5 size-4 shrink-0", pkg.featured ? "text-pink" : "text-pink-deep")}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href("contact", locale)}
                    className={cn(
                      buttonVariants({ variant: pkg.featured ? "secondary" : "outline" }),
                      "mt-7 w-full",
                    )}
                  >
                    {pricing.requestButton}
                    <span className="sr-only">: {pkg.name}</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal className="rounded-3xl bg-white p-7 sm:p-9">
              <h2 className="font-heading text-2xl font-normal text-charcoal">{pricing.factorsTitle}</h2>
              <ul className="mt-5 space-y-3 text-charcoal/85">
                {pricing.factors.map((factor) => (
                  <li key={factor} className="flex items-start gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pink-deep" aria-hidden="true" />
                    {factor}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col justify-between gap-6 rounded-3xl bg-pink-soft p-7 sm:p-9">
              <p className="flex items-start gap-3 leading-relaxed text-charcoal/85">
                <Info className="mt-1 size-5 shrink-0 text-pink-deep" aria-hidden="true" />
                {pricing.note}
              </p>
              <Link href={href("contact", locale)} className={cn(buttonVariants({ size: "lg" }), "self-start")}>
                {common.sendInquiry}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
