import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/** Cat-head mark used until a real logo is provided via `siteConfig.logo`. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9", className)}>
      <circle cx="20" cy="20" r="20" fill="var(--sage)" />
      <path
        d="M11.5 27.5c0-6 3.6-10.2 8.5-10.2s8.5 4.2 8.5 10.2c0 1.6-1.4 2.5-3 2.5h-11c-1.6 0-3-.9-3-2.5Z"
        fill="var(--cream)"
      />
      <path d="M12.3 20.6 11.6 11l6 5.1M27.7 20.6l.7-9.6-6 5.1" fill="var(--cream)" />
      <circle cx="17" cy="23.2" r="1.15" fill="var(--charcoal)" />
      <circle cx="23" cy="23.2" r="1.15" fill="var(--charcoal)" />
      <path d="M19 25.6h2l-1 1.1Z" fill="var(--charcoal)" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {siteConfig.logo ? (
        <Image
          src={siteConfig.logo}
          alt=""
          width={88}
          height={88}
          className="size-11 rounded-lg object-cover"
          priority
        />
      ) : (
        <LogoMark />
      )}
      <span className="font-heading text-lg leading-none font-medium tracking-tight">{siteConfig.name}</span>
    </span>
  )
}
