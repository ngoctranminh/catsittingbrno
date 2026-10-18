import "server-only"

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

/**
 * Simple in-memory sliding-window limiter. It is per server instance, which is
 * enough to slow down basic abuse; use a shared store (e.g. Upstash Redis) if
 * you deploy to many instances.
 */
export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)

  if (hits.size > 5000) {
    for (const [ip, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(ip)
    }
  }
  return false
}
