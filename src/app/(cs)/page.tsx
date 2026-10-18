import { HomePage } from "@/components/pages/home-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("cs", "home")

export default function Page() {
  return <HomePage locale="cs" />
}
