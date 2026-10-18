import type { ReactNode } from "react"

import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { getDictionary } from "@/content"
import type { Locale } from "@/lib/i18n"

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale)

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-charcoal px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {dict.nav.skipToContent}
      </a>
      <Header locale={locale} nav={dict.nav} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  )
}
