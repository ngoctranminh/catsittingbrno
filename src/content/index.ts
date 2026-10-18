import type { Locale } from "@/lib/i18n"

import { cs, type Dictionary } from "./cs"
import { en } from "./en"

const dictionaries: Record<Locale, Dictionary> = { cs, en }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]

export type { Dictionary }
