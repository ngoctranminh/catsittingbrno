import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { JsonLd } from "@/components/json-ld"
import { Benefits } from "@/components/sections/benefits"
import { ContactSection } from "@/components/sections/contact-section"
import { Hero } from "@/components/sections/hero"
import { Intro } from "@/components/sections/intro"
import { ProcessSteps } from "@/components/sections/process-steps"
import { TrustSection } from "@/components/sections/promise"
import { SectionHeading } from "@/components/sections/section-heading"
import { ServiceCard } from "@/components/sections/services"
import { buttonVariants } from "@/components/ui/button"
import { getDictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import { localBusinessJsonLd } from "@/lib/structured-data"
import { cn } from "@/lib/utils"

const FEATURED_SERVICES = ["home-sitting", "feeding", "updates"]

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { home, services, process, common } = dict
  const featured = services.items.filter((service) => FEATURED_SERVICES.includes(service.id))

  return (
    <>
      <JsonLd data={localBusinessJsonLd(locale)} />
      <Hero locale={locale} hero={dict.hero} />
      <Intro locale={locale} intro={home.intro} />
      <Benefits benefits={home.benefits} />

      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={home.featured.eyebrow} title={home.featured.title} lead={home.featured.lead} />
            <Link href={href("services", locale)} className={cn(buttonVariants({ variant: "outline" }), "group self-start md:self-auto")}>
              {common.allServices}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, index) => (
              <ServiceCard key={service.id} service={service} locale={locale} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pink-soft py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={home.process.eyebrow} title={home.process.title} lead={home.process.lead} />
            <Link href={href("process", locale)} className={cn(buttonVariants({ variant: "outline" }), "group self-start md:self-auto")}>
              {common.howItWorks}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12">
            <ProcessSteps steps={process.steps} stepLabel={process.stepLabel} compact />
          </div>
        </div>
      </section>

      <TrustSection locale={locale} home={home} />
      <ContactSection locale={locale} dict={dict} heading={home.contact} />
    </>
  )
}
