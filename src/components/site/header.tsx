"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Logo } from "@/components/site/logo"
import { buttonVariants } from "@/components/ui/button"
import type { Dictionary } from "@/content"
import { alternatePath, href, type Locale, type RouteKey } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const NAV_ITEMS = ["services", "pricing", "process", "about", "gallery", "contact"] as const satisfies RouteKey[]

export function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const otherLocale: Locale = locale === "cs" ? "en" : "cs"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false)
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const isActive = (key: RouteKey) => pathname === href(key, locale)

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open
          ? // Opaque on phones: a backdrop blur on a sticky header re-blurs every scroll frame.
            "border-b border-border/70 bg-cream shadow-[0_1px_12px_rgba(51,51,51,0.04)] md:bg-cream/90 md:backdrop-blur-md"
          : "border-b border-transparent bg-cream/0",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href={href("home", locale)} aria-label={nav.homeLink} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label={nav.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((key) => (
              <li key={key}>
                <Link
                  href={href(key, locale)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm text-charcoal/75 transition-colors hover:text-charcoal",
                    "after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-pink-deep after:transition-transform after:duration-300 hover:after:scale-x-100",
                    isActive(key) && "text-charcoal after:scale-x-100",
                  )}
                >
                  {nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={alternatePath(pathname, otherLocale)}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={nav.switchLanguage}
            title={nav.switchLanguage}
            className="rounded-full px-3 py-2 text-xs font-semibold tracking-widest text-charcoal/70 transition-colors hover:bg-white hover:text-charcoal"
          >
            {nav.otherLanguageShort}
          </a>
          <Link href={href("contact", locale)} className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            {nav.cta}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={nav.mainNav}
            className="overflow-y-auto border-t border-border/70 bg-cream lg:hidden"
            style={{ maxHeight: "calc(100dvh - 4rem)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-page flex flex-col py-4">
              {(["home", ...NAV_ITEMS] as RouteKey[]).map((key) => (
                <li key={key}>
                  <Link
                    href={href(key, locale)}
                    aria-current={isActive(key) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block border-b border-border/60 py-3.5 font-heading text-xl text-charcoal/80 transition-colors hover:text-charcoal",
                      isActive(key) && "text-charcoal",
                    )}
                  >
                    {nav[key as keyof typeof nav]}
                  </Link>
                </li>
              ))}
              <li className="pt-5 pb-2">
                <Link
                  href={href("contact", locale)}
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  {nav.cta}
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
