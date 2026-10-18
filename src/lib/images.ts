import type { StaticImageData } from "next/image"

import bengal from "../../public/images/cats/bengal.jpg"
import blackWhite from "../../public/images/cats/black-white.jpg"
import britishGrey from "../../public/images/cats/british-grey.jpg"
import happy from "../../public/images/cats/happy.jpg"
import hero from "../../public/images/cats/hero.jpg"
import kittenBasket from "../../public/images/cats/kitten-basket.jpg"
import lookingUp from "../../public/images/cats/looking-up.jpg"
import petting from "../../public/images/cats/petting.jpg"
import playfulOrange from "../../public/images/cats/playful-orange.jpg"
import siamese from "../../public/images/cats/siamese.jpg"
import sleepyOrange from "../../public/images/cats/sleepy-orange.jpg"
import stairs from "../../public/images/cats/stairs.jpg"
import tabbyKitten from "../../public/images/cats/tabby-kitten.jpg"
import tabbyLying from "../../public/images/cats/tabby-lying.jpg"
import whiteMaine from "../../public/images/cats/white-maine.jpg"

import type { Locale } from "@/lib/i18n"

/**
 * Illustrative photos from Unsplash (Unsplash License — free for commercial use).
 * They are NOT photos of our clients; the gallery labels them as illustrative.
 * Replace them with your own photos (with owners' consent) once available.
 */
export type CatImage = {
  src: StaticImageData
  alt: Record<Locale, string>
}

export const images = {
  sofa: {
    src: tabbyLying,
    alt: { cs: "Mourovatá kočka odpočívá na pohovce", en: "Tabby cat resting on a sofa" },
  },
  homeLounge: {
    src: hero,
    alt: { cs: "Zrzavá kočka leží v útulném obývacím pokoji", en: "Ginger cat lying in a cosy living room" },
  },
  kitchen: {
    src: bengal,
    alt: { cs: "Kočka sedí na stole ve světlé kuchyni", en: "Cat sitting on a table in a bright kitchen" },
  },
  stairs: {
    src: stairs,
    alt: { cs: "Kočka sedí na schodech v klidném domově", en: "Cat sitting on the stairs in a calm home" },
  },
  petting: {
    src: petting,
    alt: { cs: "Ruka jemně hladí spokojenou kočku", en: "A hand gently stroking a contented cat" },
  },
  sleepy: {
    src: sleepyOrange,
    alt: { cs: "Zrzavá kočka spokojeně dřímá na podlaze", en: "Ginger cat dozing peacefully on the floor" },
  },
  playful: {
    src: playfulOrange,
    alt: { cs: "Hravá zrzavá kočka se válí na zádech", en: "Playful ginger cat rolling on its back" },
  },
  happy: {
    src: happy,
    alt: { cs: "Veselá kočka s šátkem kolem krku", en: "Cheerful cat wearing a neckerchief" },
  },
  siamese: {
    src: siamese,
    alt: { cs: "Světlá kočka s modrýma očima se dívá vzhůru", en: "Pale cat with blue eyes looking upwards" },
  },
  british: {
    src: britishGrey,
    alt: { cs: "Šedá britská kočka sedí na dece", en: "Grey British cat sitting on a blanket" },
  },
  maine: {
    src: whiteMaine,
    alt: { cs: "Bílá dlouhosrstá kočka v klidu odpočívá", en: "White long-haired cat relaxing" },
  },
  kitten: {
    src: tabbyKitten,
    alt: { cs: "Mourovaté kotě sedí na podlaze", en: "Tabby kitten sitting on the floor" },
  },
  lookingUp: {
    src: lookingUp,
    alt: { cs: "Zvědavá mourovatá kočka hledí vzhůru", en: "Curious tabby cat looking up" },
  },
  basket: {
    src: kittenBasket,
    alt: { cs: "Několik koťat v proutěném košíku", en: "Several kittens in a wicker basket" },
  },
  window: {
    src: blackWhite,
    alt: { cs: "Černobílá kočka opřená tlapkami o okraj", en: "Black-and-white cat resting its paws on a ledge" },
  },
} satisfies Record<string, CatImage>

export type ImageKey = keyof typeof images
