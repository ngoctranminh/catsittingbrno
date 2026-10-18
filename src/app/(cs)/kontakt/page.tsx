import { ContactPage } from "@/components/pages/contact-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("cs", "contact")

export default function Page() {
  return <ContactPage locale="cs" />
}
