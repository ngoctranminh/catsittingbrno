import { Reveal } from "@/components/motion/reveal"
import type { Dictionary } from "@/content"
import { cn } from "@/lib/utils"

type ProcessStepsProps = {
  steps: Dictionary["process"]["steps"]
  stepLabel: string
  /** Compact variant for the home page. */
  compact?: boolean
}

export function ProcessSteps({ steps, stepLabel, compact = false }: ProcessStepsProps) {
  return (
    <ol className={cn("relative grid gap-5", compact ? "md:grid-cols-5 md:gap-4" : "md:gap-6")}>
      {steps.map((step, index) => (
        <Reveal
          as="li"
          key={step.title}
          delay={index * 0.08}
          className={cn(
            "relative rounded-3xl border border-border/70 bg-white transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_rgba(51,51,51,0.45)]",
            compact ? "p-6" : "grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-sage-soft font-heading text-charcoal",
              compact ? "size-11 text-lg" : "size-14 text-2xl",
            )}
          >
            <span className="sr-only">{stepLabel} </span>
            {index + 1}
          </span>
          <div className={compact ? "mt-5" : undefined}>
            <h3 className={cn("font-normal text-charcoal", compact ? "text-lg leading-snug" : "text-xl sm:text-2xl")}>
              {step.title}
            </h3>
            <p className={cn("mt-2 leading-relaxed text-muted-foreground", compact ? "text-sm" : "text-base")}>{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
