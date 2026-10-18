import { ServicesPage } from "@/components/pages/services-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("cs", "services")

export default function Page() {
  return <ServicesPage locale="cs" />
}
