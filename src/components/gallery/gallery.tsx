"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

import type { Dictionary } from "@/content"
import type { GalleryAlbum, GalleryItem } from "@/content/gallery"
import type { Locale } from "@/lib/i18n"
import { images } from "@/lib/images"
import { cn } from "@/lib/utils"

type Filter = GalleryAlbum | "all"
const FILTERS: Filter[] = ["all", "home", "play", "rest"]

type GalleryProps = {
  items: GalleryItem[]
  locale: Locale
  text: Dictionary["gallery"]
}

export function Gallery({ items, locale, text }: GalleryProps) {
  const [filter, setFilter] = useState<Filter>("all")
  const [index, setIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(1)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchStartX = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()

  const visible = filter === "all" ? items : items.filter((item) => item.album === filter)
  const current = index !== null ? visible[index] : null

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = useCallback(
    (delta: number) => {
      setDirection(delta)
      setIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length))
    },
    [visible.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
    }
    const onClose = () => setIndex(null)
    dialog.addEventListener("keydown", onKey)
    dialog.addEventListener("close", onClose)
    return () => {
      dialog.removeEventListener("keydown", onKey)
      dialog.removeEventListener("close", onClose)
    }
  }, [step])

  return (
    <>
      <div role="group" aria-label={text.albumsLabel} className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all duration-300",
              filter === key
                ? "border-charcoal bg-charcoal text-cream"
                : "border-border bg-white text-charcoal/80 hover:border-pink hover:text-charcoal",
            )}
          >
            {text.albums[key]}
          </button>
        ))}
      </div>

      <motion.ul layout={!reduceMotion} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => {
            const image = images[item.image]
            return (
              <motion.li
                key={item.image}
                layout={!reduceMotion}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="group relative block w-full overflow-hidden rounded-3xl bg-muted focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  <span className="sr-only">
                    {text.openImage}: {image.alt[locale]}
                  </span>
                  <Image
                    src={image.src}
                    alt=""
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-charcoal/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="text-left text-sm text-white">{image.alt[locale]}</span>
                    <Expand className="size-5 shrink-0 text-white" aria-hidden="true" />
                  </span>
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>

      <dialog
        ref={dialogRef}
        aria-label={text.lightbox.label}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-charcoal/90 backdrop:backdrop-blur-sm"
        onClick={(event) => event.target === event.currentTarget && close()}
        onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return
          const delta = event.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1)
          touchStartX.current = null
        }}
      >
        {current && index !== null && (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10"
            onClick={(event) => event.target === event.currentTarget && close()}
          >
            <div className="absolute top-4 right-4 left-4 flex items-center justify-between text-sm text-white/80">
              <span aria-live="polite">
                {index + 1} / {visible.length}
              </span>
              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label={text.lightbox.close}
                className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.figure
                key={current.image}
                custom={direction}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full flex-col items-center"
              >
                <Image
                  src={images[current.image].src}
                  alt={images[current.image].alt[locale]}
                  placeholder="blur"
                  sizes="90vw"
                  className="max-h-[78dvh] w-auto rounded-2xl object-contain"
                />
                <figcaption className="mt-4 max-w-xl text-center text-sm text-white/85">
                  {images[current.image].alt[locale]}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={text.lightbox.previous}
                  className="absolute top-1/2 left-3 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={text.lightbox.next}
                  className="absolute top-1/2 right-3 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
