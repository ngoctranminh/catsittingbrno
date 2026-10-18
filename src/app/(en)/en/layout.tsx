import { RootLayout, rootMetadata, rootViewport } from "@/components/site/root-layout"

export const metadata = rootMetadata("en")
export const viewport = rootViewport

export default function EnglishLayout({ children }: LayoutProps<"/en">) {
  return <RootLayout locale="en">{children}</RootLayout>
}
