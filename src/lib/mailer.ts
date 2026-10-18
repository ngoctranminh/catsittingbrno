import "server-only"

import type { Inquiry } from "@/lib/inquiry"

/**
 * Enquiries are delivered by email through Resend (https://resend.com).
 * All three variables must be set, otherwise the form honestly reports that
 * it is not active yet instead of pretending the message was sent.
 */
function mailConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.INQUIRY_TO_EMAIL
  const from = process.env.INQUIRY_FROM_EMAIL
  if (!apiKey || !to || !from) return null
  return { apiKey, to: to.split(",").map((address) => address.trim()), from }
}

export const isMailConfigured = () => mailConfig() !== null

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim()

export async function sendInquiryEmail(inquiry: Inquiry & { locale: string }): Promise<boolean> {
  const config = mailConfig()
  if (!config) return false

  const catCount = inquiry.catCount === "6" ? "6+" : inquiry.catCount
  const text = [
    "Nová poptávka z webu",
    "",
    `Jméno a příjmení: ${inquiry.name}`,
    `E-mail: ${inquiry.email}`,
    `Telefon: ${inquiry.phone || "—"}`,
    `Lokalita: ${inquiry.location}`,
    `Termín: ${inquiry.dateFrom} – ${inquiry.dateTo}`,
    `Počet koček: ${catCount}`,
    `Jazyk webu: ${inquiry.locale}`,
    "",
    "Zpráva:",
    inquiry.message || "—",
  ].join("\n")

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: inquiry.email,
        subject: oneLine(`Poptávka hlídání: ${inquiry.name} (${inquiry.dateFrom} – ${inquiry.dateTo})`),
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      console.error("Inquiry email failed with status", response.status)
      return false
    }
    return true
  } catch (error) {
    console.error("Inquiry email failed", error instanceof Error ? error.name : "unknown error")
    return false
  }
}
