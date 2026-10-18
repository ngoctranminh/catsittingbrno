"use client"

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react"
import Link from "next/link"
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"

import { sendInquiry, type InquiryState, type InquiryStatus } from "@/app/actions/send-inquiry"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Dictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import {
  catCountOptions,
  HONEYPOT_FIELD,
  readInquiryValues,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
} from "@/lib/inquiry"
import { cn } from "@/lib/utils"

const initialState: InquiryState = { status: "idle" }

const STATUS_KEY: Record<Exclude<InquiryStatus, "idle">, keyof Dictionary["contact"]["status"]> = {
  success: "success",
  invalid: "invalid",
  notConfigured: "notConfigured",
  rateLimited: "rateLimited",
  spam: "spam",
  error: "error",
}

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")"

const fieldClass = "h-11 rounded-xl border-input bg-cream/60 px-3.5 text-base md:text-[0.95rem]"

export function InquiryForm({ locale, contact }: { locale: Locale; contact: Dictionary["contact"] }) {
  const { form, errors: errorText, status: statusText } = contact
  const [state, formAction, pending] = useActionState(sendInquiry, initialState)
  const [clientErrors, setClientErrors] = useState<InquiryErrors>({})
  const [attempted, setAttempted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  // When the visitor started filling in the form — used by the anti-spam check.
  const startedAtRef = useRef(0)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAtRef.current = Date.now()
  }, [])

  // After each server response: reset on success and bring the message into view.
  useEffect(() => {
    if (state.status === "idle") return
    if (state.status === "success") {
      formRef.current?.reset()
      startedAtRef.current = Date.now()
    }
    statusRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    statusRef.current?.focus({ preventScroll: true })
  }, [state])

  const errors: InquiryErrors =
    Object.keys(clientErrors).length > 0 ? clientErrors : state.status === "invalid" ? (state.errors ?? {}) : {}

  function revalidate() {
    if (!attempted || !formRef.current) return
    const result = validateInquiry(readInquiryValues(new FormData(formRef.current)))
    setClientErrors(result.success ? {} : result.errors)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const result = validateInquiry(readInquiryValues(formData))
    setAttempted(true)

    if (!result.success) {
      setClientErrors(result.errors)
      const firstInvalid = Object.keys(result.errors)[0]
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setClientErrors({})
    formData.set("startedAt", String(startedAtRef.current))
    startTransition(() => formAction(formData))
  }

  const describedBy = (field: InquiryField) => (errors[field] ? `${field}-error` : undefined)

  const banner = state.status !== "idle" && !(state.status === "invalid" && Object.keys(clientErrors).length > 0)
  const bannerText = state.status !== "idle" ? statusText[STATUS_KEY[state.status]] : null

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onChange={revalidate}
      noValidate
      className="space-y-5"
      aria-describedby="inquiry-gdpr"
    >
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot: invisible to people and screen readers, filled in by spam bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>{form.honeypot}</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role={state.status === "success" ? "status" : "alert"}
        aria-live="polite"
        className="outline-none"
      >
        {banner && bannerText && (
          <div
            key={state.submittedAt}
            className={cn(
              "flex gap-3 rounded-2xl border p-4 text-sm animate-in fade-in slide-in-from-top-1",
              state.status === "success"
                ? "border-pink bg-pink-soft text-charcoal"
                : "border-destructive/30 bg-destructive/5 text-charcoal",
            )}
          >
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-pink-deep" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
            )}
            <div>
              <p className="font-semibold">{bannerText.title}</p>
              <p className="mt-0.5 text-charcoal/80">{bannerText.text}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={form.name} required requiredText={form.required} error={errors.name && errorText[errors.name]}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label={form.email} required requiredText={form.required} error={errors.email && errorText[errors.email]}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClass}
          />
        </Field>
        <Field id="phone" label={form.phone} optionalText={form.optional} error={errors.phone && errorText[errors.phone]}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            placeholder="+420"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={fieldClass}
          />
        </Field>
        <Field
          id="location"
          label={form.location}
          required
          requiredText={form.required}
          error={errors.location && errorText[errors.location]}
        >
          <Input
            id="location"
            name="location"
            autoComplete="address-level2"
            maxLength={120}
            placeholder={form.locationPlaceholder}
            required
            aria-invalid={Boolean(errors.location)}
            aria-describedby={describedBy("location")}
            className={fieldClass}
          />
        </Field>
        <Field
          id="dateFrom"
          label={form.dateFrom}
          required
          requiredText={form.required}
          error={errors.dateFrom && errorText[errors.dateFrom]}
        >
          <Input
            id="dateFrom"
            name="dateFrom"
            type="date"
            required
            aria-invalid={Boolean(errors.dateFrom)}
            aria-describedby={describedBy("dateFrom")}
            className={fieldClass}
          />
        </Field>
        <Field id="dateTo" label={form.dateTo} required requiredText={form.required} error={errors.dateTo && errorText[errors.dateTo]}>
          <Input
            id="dateTo"
            name="dateTo"
            type="date"
            required
            aria-invalid={Boolean(errors.dateTo)}
            aria-describedby={describedBy("dateTo")}
            className={fieldClass}
          />
        </Field>
        <Field
          id="catCount"
          label={form.catCount}
          required
          requiredText={form.required}
          error={errors.catCount && errorText[errors.catCount]}
        >
          <select
            id="catCount"
            name="catCount"
            defaultValue="1"
            required
            aria-invalid={Boolean(errors.catCount)}
            aria-describedby={describedBy("catCount")}
            style={{ backgroundImage: SELECT_CHEVRON }}
            className={cn(
              fieldClass,
              "w-full appearance-none border bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive",
            )}
          >
            {catCountOptions.map((count) => (
              <option key={count} value={count}>
                {count === "6" ? form.catCountMore : count}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label={form.message} optionalText={form.optional} error={errors.message && errorText[errors.message]}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          maxLength={2000}
          placeholder={form.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className="min-h-32 rounded-xl border-input bg-cream/60 px-3.5 py-3 text-base md:text-[0.95rem]"
        />
      </Field>

      <p id="inquiry-gdpr" className="text-xs leading-relaxed text-muted-foreground">
        {form.gdpr}{" "}
        <Link href={href("privacy", locale)} className="font-medium text-charcoal underline underline-offset-4 hover:text-pink-deep">
          {form.gdprLink}
        </Link>
        .
      </p>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            {form.submitting}
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            {form.submit}
          </>
        )}
      </Button>
    </form>
  )
}

type FieldProps = {
  id: InquiryField
  label: string
  children: ReactNode
  error?: string
  required?: boolean
  requiredText?: string
  optionalText?: string
}

function Field({ id, label, children, error, required, requiredText, optionalText }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true" title={requiredText}>
            *
          </span>
        ) : (
          optionalText && <span className="text-xs font-normal text-muted-foreground">({optionalText})</span>
        )}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
