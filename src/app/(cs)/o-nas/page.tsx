import { AboutPage } from "@/components/pages/about-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("cs", "about")

export default function Page() {
  return <AboutPage locale="cs" />
}
