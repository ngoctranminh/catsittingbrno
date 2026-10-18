import { ProcessPage } from "@/components/pages/process-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("cs", "process")

export default function Page() {
  return <ProcessPage locale="cs" />
}
