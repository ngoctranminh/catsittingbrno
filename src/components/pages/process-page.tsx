import { CtaBand } from "@/components/sections/cta-band"
import { Faq } from "@/components/sections/faq"
import { PageHeader } from "@/components/sections/page-header"
import { ProcessSteps } from "@/components/sections/process-steps"
import { getDictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import { images } from "@/lib/images"

export function ProcessPage({ locale }: { locale: Locale }) {
  const { process, services } = getDictionary(locale)

  return (
    <>
      <PageHeader locale={locale} image={images.lookingUp} {...process.header} />
      <section className="pb-8">
        <div className="container-page max-w-4xl">
          <ProcessSteps steps={process.steps} stepLabel={process.stepLabel} />
        </div>
      </section>
      <Faq title={process.faqTitle} items={process.faq} />
      <CtaBand {...services.cta} href={href("contact", locale)} />
    </>
  )
}
