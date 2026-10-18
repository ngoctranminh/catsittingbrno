import { ProcessPage } from "@/components/pages/process-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("en", "process")

export default function Page() {
  return <ProcessPage locale="en" />
}
