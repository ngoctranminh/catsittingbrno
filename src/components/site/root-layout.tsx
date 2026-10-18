import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

import { body, display } from "@/app/fonts"
import { SiteShell } from "@/components/site/site-shell"
import { siteConfig } from "@/config/site"
import { getDictionary } from "@/content"
import { htmlLang, type Locale } from "@/lib/i18n"

import "@/app/globals.css"

export function rootMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale)
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: `${meta.home.title} | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` },
    description: meta.home.description,
    applicationName: siteConfig.name,
    formatDetection: { telephone: false, email: false, address: false },
  }
}

export const rootViewport: Viewport = {
  themeColor: "#faf7f2",
  colorScheme: "light",
}

/** Shared <html> shell for both language root layouts. */
export function RootLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html
      lang={htmlLang[locale]}
      className={`${display.variable} ${body.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      // Browser extensions (e.g. Chrome Remote Desktop) inject attributes on <html>.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <SiteShell locale={locale}>{children}</SiteShell>
      </body>
    </html>
  )
}
