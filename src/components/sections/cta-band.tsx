import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { LogoMark } from "@/components/site/logo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CtaBandProps = {
  title: string
  text: string
  button: string
  href: string
}

export function CtaBand({ title, text, button, href }: CtaBandProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-pink px-6 py-14 text-center sm:px-12 md:py-16">
          <LogoMark className="absolute -top-10 -left-10 size-48 opacity-20" />
          <LogoMark className="absolute -right-12 -bottom-14 size-56 opacity-20" />
          <div className="relative mx-auto max-w-xl">
            <h2 className="font-heading text-3xl font-normal text-charcoal sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/80 sm:text-lg">{text}</p>
            <Link href={href} className={cn(buttonVariants({ size: "lg" }), "group mt-8 bg-charcoal text-cream hover:bg-charcoal/85")}>
              {button}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
