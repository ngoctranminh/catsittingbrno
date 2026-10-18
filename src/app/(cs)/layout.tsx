import { RootLayout, rootMetadata, rootViewport } from "@/components/site/root-layout"

export const metadata = rootMetadata("cs")
export const viewport = rootViewport

export default function CzechLayout({ children }: LayoutProps<"/">) {
  return <RootLayout locale="cs">{children}</RootLayout>
}
