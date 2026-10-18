import type { Metadata } from "next"
import Link from "next/link"

import { body, display } from "@/app/fonts"
import { Logo } from "@/components/site/logo"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cs } from "@/content/cs"
import { en } from "@/content/en"
import { routes } from "@/lib/i18n"

import "./globals.css"

export const metadata: Metadata = {
  title: `404 – ${cs.notFound.title} | ${siteConfig.name}`,
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <html
      lang="cs"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col items-center justify-center px-4 py-16 text-center">
        <Link href={routes.home.cs} aria-label={cs.nav.homeLink}>
          <Logo />
        </Link>
        <p className="mt-14 font-heading text-8xl text-pink-deep/70">404</p>
        <h1 className="mt-4 font-heading text-4xl font-normal text-charcoal">{cs.notFound.title}</h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{cs.notFound.text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={routes.home.cs} className={buttonVariants({ size: "lg" })}>
            {cs.notFound.back}
          </Link>
          <Link href={routes.home.en} hrefLang="en" lang="en" className={buttonVariants({ size: "lg", variant: "outline" })}>
            {en.notFound.back}
          </Link>
        </div>
      </body>
    </html>
  )
}
