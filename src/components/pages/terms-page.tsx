import { FileText } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { getDictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"

/**
 * Placeholder until binding terms are written (ideally reviewed by a lawyer).
 * Replace the body with the real terms and drop `noIndex` in the route files.
 */
export function TermsPage({ locale }: { locale: Locale }) {
  const { terms } = getDictionary(locale)

  return (
    <article className="container-page max-w-3xl py-12 md:py-20">
      <h1 className="font-heading text-4xl font-normal text-charcoal sm:text-5xl">{terms.title}</h1>
      <div className="mt-10 rounded-3xl bg-white p-7 sm:p-10">
        <FileText className="size-7 text-sage-deep" aria-hidden="true" />
        <h2 className="mt-5 font-heading text-2xl font-normal text-charcoal">{terms.pendingTitle}</h2>
        <p className="mt-3 leading-relaxed text-charcoal/80">{terms.pendingText}</p>
        <Link href={href("contact", locale)} className={buttonVariants({ variant: "outline", className: "mt-7" })}>
          {terms.contactCta}
        </Link>
      </div>
    </article>
  )
}
