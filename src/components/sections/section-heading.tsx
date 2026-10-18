import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  lead?: string
  align?: "left" | "center"
  className?: string
  /** Use "h1" only for the page's main heading. */
  as?: "h1" | "h2"
}

export function SectionHeading({ eyebrow, title, lead, align = "left", className, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">
        <span className="h-px w-6 bg-sage-deep/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <Heading
        className={cn(
          "mt-4 font-heading font-normal text-charcoal",
          Heading === "h1" ? "text-4xl leading-[1.08] sm:text-5xl lg:text-6xl" : "text-3xl leading-tight sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {lead && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>}
    </Reveal>
  )
}
