import { ServicesPage } from "@/components/pages/services-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("en", "services")

export default function Page() {
  return <ServicesPage locale="en" />
}
