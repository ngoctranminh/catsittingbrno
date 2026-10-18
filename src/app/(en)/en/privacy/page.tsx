import { PrivacyPage } from "@/components/pages/privacy-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("en", "privacy")

export default function Page() {
  return <PrivacyPage locale="en" />
}
