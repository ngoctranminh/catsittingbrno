import { Camera, Check, Droplets, HeartHandshake, House, PawPrint, Sparkles, type LucideIcon } from "lucide-react"
import Image from "next/image"

import { Reveal } from "@/components/motion/reveal"
import type { Dictionary } from "@/content"
import type { Locale } from "@/lib/i18n"
import { images, type ImageKey } from "@/lib/images"
import { cn } from "@/lib/utils"

type Service = Dictionary["services"]["items"][number]

/** Icon and photo per service id — add an entry here when you add a service. */
const SERVICE_VISUALS: Record<string, { icon: LucideIcon; image: ImageKey }> = {
  "home-sitting": { icon: House, image: "homeLounge" },
  feeding: { icon: Droplets, image: "kitchen" },
  litter: { icon: Sparkles, image: "stairs" },
  play: { icon: PawPrint, image: "petting" },
  updates: { icon: Camera, image: "happy" },
  custom: { icon: HeartHandshake, image: "maine" },
}
const FALLBACK_VISUAL = { icon: PawPrint, image: "sofa" as ImageKey }

type ServiceCardProps = {
  service: Service
  locale: Locale
  /** Full card shows the description and what is included. */
  detailed?: boolean
  includesLabel?: string
  index?: number
}

export function ServiceCard({ service, locale, detailed = false, includesLabel, index = 0 }: ServiceCardProps) {
  const visual = SERVICE_VISUALS[service.id] ?? FALLBACK_VISUAL
  const Icon = visual.icon
  const image = images[visual.image]

  return (
    <Reveal as="article" delay={(index % 3) * 0.08} className="h-full">
      <div
        id={service.id}
        className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-border/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(51,51,51,0.45)]"
      >
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt[locale]}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-2xl bg-cream/95 shadow-sm backdrop-blur">
            <Icon className="size-5 text-sage-deep" aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-xl font-normal text-charcoal sm:text-[1.4rem]">{service.title}</h3>
          <p className={cn("mt-2 leading-relaxed text-muted-foreground", detailed ? "text-[0.95rem]" : "text-sm")}>
            {detailed ? service.description : service.short}
          </p>
          {detailed && (
            <div className="mt-6 border-t border-border/70 pt-5">
              {includesLabel && (
                <p className="text-xs font-semibold tracking-[0.16em] text-sage-deep uppercase">{includesLabel}</p>
              )}
              <ul className="mt-3 space-y-2 text-sm text-charcoal/85">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-sage-deep" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}
