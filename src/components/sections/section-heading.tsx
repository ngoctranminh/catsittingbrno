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
  /** "dark" for headings placed on a black background. */
  tone?: "light" | "dark"
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  as: Heading = "h2",
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark"
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", dark && "text-pink")}>
        <span className={cn("h-px w-6", dark ? "bg-pink/60" : "bg-pink-deep/60")} aria-hidden="true" />
        {eyebrow}
      </p>
      <Heading
        className={cn(
          "mt-4 font-heading font-normal",
          dark ? "text-white" : "text-charcoal",
          Heading === "h1" ? "text-4xl leading-[1.08] sm:text-5xl lg:text-6xl" : "text-3xl leading-tight sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {lead && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted-foreground")}>
          {lead}
        </p>
      )}
    </Reveal>
  )
}
