import { GalleryPage } from "@/components/pages/gallery-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("en", "gallery")

export default function Page() {
  return <GalleryPage locale="en" />
}
