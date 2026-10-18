import { PricingPage } from "@/components/pages/pricing-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("en", "pricing")

export default function Page() {
  return <PricingPage locale="en" />
}
