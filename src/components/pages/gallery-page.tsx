import { Info } from "lucide-react"

import { Gallery } from "@/components/gallery/gallery"
import { PageHeader } from "@/components/sections/page-header"
import { getDictionary } from "@/content"
import { galleryItems } from "@/content/gallery"
import type { Locale } from "@/lib/i18n"

export function GalleryPage({ locale }: { locale: Locale }) {
  const { gallery } = getDictionary(locale)

  return (
    <>
      <PageHeader locale={locale} {...gallery.header} />
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <Gallery items={galleryItems} locale={locale} text={gallery} />
          <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-sage-deep" aria-hidden="true" />
            {gallery.disclaimer}
          </p>
        </div>
      </section>
    </>
  )
}
