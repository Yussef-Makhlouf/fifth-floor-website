import { Resend } from 'resend'

/**
 * Lazy initialization helper for Resend client.
 * Avoids throwing "Missing API key" error during Next.js build-time module evaluation
 * when environment variables are not yet present in the build environment.
 */
export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY || 're_placeholder_for_build'
  return new Resend(apiKey)
}
