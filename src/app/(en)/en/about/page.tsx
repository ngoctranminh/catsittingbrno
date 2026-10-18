import { AboutPage } from "@/components/pages/about-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("en", "about")

export default function Page() {
  return <AboutPage locale="en" />
}
