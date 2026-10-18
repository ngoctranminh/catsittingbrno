import { z } from "zod"

import type { Dictionary } from "@/content"

export const inquiryFields = ["name", "email", "phone", "location", "dateFrom", "dateTo", "catCount", "message"] as const
export type InquiryField = (typeof inquiryFields)[number]
export type InquiryValues = Record<InquiryField, string>
export type InquiryErrorCode = keyof Dictionary["contact"]["errors"]
export type InquiryErrors = Partial<Record<InquiryField, InquiryErrorCode>>

/** "6" stands for "6 or more". */
export const catCountOptions = ["1", "2", "3", "4", "5", "6"] as const

/** Minimum time a human needs to fill in the form; faster submissions are treated as bots. */
export const MIN_FILL_TIME_MS = 3000

/** The honeypot input name — hidden from people, tempting for bots. */
export const HONEYPOT_FIELD = "website"

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[\d\s().-]{9,20}$/

const isRealDate = (value: string) => {
  if (!ISO_DATE.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)
}

/** Today's date in Brno as YYYY-MM-DD, so client and server agree on "the past". */
export const todayInPrague = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Prague" }).format(new Date())

const requiredText = (max: number) =>
  z.string().trim().min(1, { error: "required" }).min(2, { error: "tooShort" }).max(max, { error: "tooLong" })

const dateField = (today: string) =>
  z
    .string()
    .trim()
    .min(1, { error: "required" })
    .refine(isRealDate, { error: "date", abort: true })
    .refine((value) => value >= today, { error: "datePast" })

function inquirySchema(today: string) {
  return z
    .object({
      name: requiredText(100),
      email: z
        .string()
        .trim()
        .min(1, { error: "required" })
        .max(254, { error: "tooLong", abort: true })
        .refine((value) => EMAIL.test(value), { error: "email" }),
      phone: z
        .string()
        .trim()
        .refine((value) => value === "" || PHONE.test(value), { error: "phone" }),
      location: requiredText(120),
      dateFrom: dateField(today),
      dateTo: dateField(today),
      catCount: z.enum(catCountOptions, { error: "catCount" }),
      message: z.string().trim().max(2000, { error: "tooLong" }),
    })
    .superRefine((data, ctx) => {
      if (data.dateFrom && data.dateTo && data.dateTo < data.dateFrom) {
        ctx.addIssue({ code: "custom", path: ["dateTo"], message: "dateOrder" })
      }
    })
}

export type Inquiry = z.infer<ReturnType<typeof inquirySchema>>

export function readInquiryValues(formData: FormData): InquiryValues {
  return Object.fromEntries(
    inquiryFields.map((field) => {
      const value = formData.get(field)
      return [field, typeof value === "string" ? value : ""]
    }),
  ) as InquiryValues
}

/** Validates the form; returns either the cleaned data or one error code per field. */
export function validateInquiry(
  values: InquiryValues,
  today = todayInPrague(),
): { success: true; data: Inquiry } | { success: false; errors: InquiryErrors } {
  const result = inquirySchema(today).safeParse(values)
  if (result.success) return { success: true, data: result.data }

  const errors: InquiryErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as InquiryField
    if (!errors[field]) errors[field] = issue.message as InquiryErrorCode
  }
  return { success: false, errors }
}
