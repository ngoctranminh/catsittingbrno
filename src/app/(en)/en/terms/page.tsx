import { TermsPage } from "@/components/pages/terms-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("en", "terms", { noIndex: true })

export default function Page() {
  return <TermsPage locale="en" />
}
