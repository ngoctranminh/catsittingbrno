import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

// lucide-react no longer ships brand icons, so these are inlined (Simple Icons paths).
const ICONS = {
  instagram: {
    label: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  facebook: {
    label: "Facebook",
    path: "M9.1 23.69v-7.98H6.63V12h2.47v-1.58c0-4.09 1.85-5.99 5.86-5.99.76 0 2.07.15 2.61.3v3.32c-.28-.03-.78-.05-1.39-.05-1.97 0-2.73.75-2.73 2.68V12h3.92l-.67 3.71h-3.25v8.32A12 12 0 1 0 9.1 23.69Z",
  },
} as const

/** Instagram / Facebook links from `siteConfig.social`; renders nothing if none are set. */
export function SocialLinks({ className, linkClassName }: { className?: string; linkClassName?: string }) {
  const links = (Object.keys(ICONS) as (keyof typeof ICONS)[]).flatMap((key) => {
    const url = siteConfig.social[key]
    return url ? [{ key, url, ...ICONS[key] }] : []
  })
  if (links.length === 0) return null

  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {links.map(({ key, url, label, path }) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "flex size-10 items-center justify-center rounded-full bg-cream/10 text-cream/80 transition-colors hover:bg-pink hover:text-charcoal",
              linkClassName,
            )}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d={path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
