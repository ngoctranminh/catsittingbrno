import { PrivacyPage } from "@/components/pages/privacy-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("cs", "privacy")

export default function Page() {
  return <PrivacyPage locale="cs" />
}
