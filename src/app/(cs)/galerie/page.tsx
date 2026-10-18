import { GalleryPage } from "@/components/pages/gallery-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("cs", "gallery")

export default function Page() {
  return <GalleryPage locale="cs" />
}
