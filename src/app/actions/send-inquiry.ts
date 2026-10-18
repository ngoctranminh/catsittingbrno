"use server"

import { headers } from "next/headers"

import { locales, type Locale } from "@/lib/i18n"
import {
  HONEYPOT_FIELD,
  MIN_FILL_TIME_MS,
  readInquiryValues,
  validateInquiry,
  type InquiryErrors,
} from "@/lib/inquiry"
import { isMailConfigured, sendInquiryEmail } from "@/lib/mailer"
import { isRateLimited } from "@/lib/rate-limit"

export type InquiryStatus = "idle" | "success" | "invalid" | "notConfigured" | "rateLimited" | "spam" | "error"

export type InquiryState = {
  status: InquiryStatus
  errors?: InquiryErrors
  /** Changes on every submission so the UI can re-announce repeated statuses. */
  submittedAt?: number
}

export async function sendInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const submittedAt = Date.now()

  // Bots fill every field; people never see this one. Pretend success so bots move on.
  if (String(formData.get(HONEYPOT_FIELD) ?? "") !== "") return { status: "success", submittedAt }

  const startedAt = Number(formData.get("startedAt"))
  if (!Number.isFinite(startedAt) || startedAt <= 0 || submittedAt - startedAt < MIN_FILL_TIME_MS) {
    return { status: "spam", submittedAt }
  }

  const result = validateInquiry(readInquiryValues(formData))
  if (!result.success) return { status: "invalid", errors: result.errors, submittedAt }

  if (!isMailConfigured()) return { status: "notConfigured", submittedAt }

  const requestHeaders = await headers()
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown"
  if (isRateLimited(ip)) return { status: "rateLimited", submittedAt }

  const rawLocale = String(formData.get("locale") ?? "")
  const locale: Locale = (locales as readonly string[]).includes(rawLocale) ? (rawLocale as Locale) : "cs"

  const sent = await sendInquiryEmail({ ...result.data, locale })
  return { status: sent ? "success" : "error", submittedAt }
}
