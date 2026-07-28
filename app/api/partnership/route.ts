import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { brandPartnershipSchema, creatorPartnershipSchema, validateForm } from '@/lib/contact-schema'
import {
  brandNotificationEmail,
  brandConfirmationEmail,
  creatorNotificationEmail,
  creatorConfirmationEmail,
} from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'
const FROM = `${process.env.FROM_NAME ?? 'Fifth Floor Agency'} <${FROM_EMAIL}>`
const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@fifth-floor.agency'

// In Resend test mode (no verified domain), we can only send to the account owner's email.
// Client auto-replies are skipped until a domain is verified at resend.com/domains.
const IS_TEST_MODE = FROM_EMAIL === 'onboarding@resend.dev'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    // ─── Brand Partnership ────────────────────────────────────────────────────
    if (type === 'brand') {
      const validation = validateForm(brandPartnershipSchema, data)
      if (!validation.success) {
        return NextResponse.json(
          { success: false, message: 'Please review and fix highlighted fields', errors: validation.errors },
          { status: 400 }
        )
      }

      const refId = `FF-BR-${Math.floor(100000 + Math.random() * 900000)}`
      const receivedAt = new Date().toISOString()
      const d = validation.data

      // Build email queue — in test mode, skip client confirmation (can't send to external addresses)
      const emailJobs = [
        resend.emails.send({
          from: FROM,
          to: [TEAM_EMAIL],
          subject: `[Brand Inquiry] ${d.brandName} — Ref: ${refId}`,
          html: brandNotificationEmail(d, refId, receivedAt),
        }),
      ]

      if (!IS_TEST_MODE) {
        emailJobs.push(
          resend.emails.send({
            from: FROM,
            to: [d.email],
            subject: `Your partnership inquiry is confirmed — Ref: ${refId}`,
            html: brandConfirmationEmail(d.contactPerson, refId),
          })
        )
      } else {
        console.log(`[TEST_MODE] Skipping client confirmation email to: ${d.email}`)
      }

      const results = await Promise.allSettled(emailJobs)

      results.forEach((result, i) => {
        const label = i === 0 ? 'TEAM' : 'CLIENT'
        if (result.status === 'rejected') {
          console.error(`[EMAIL_${label}_BRAND_FAILED]`, result.reason)
        } else if (result.value.error) {
          console.error(`[EMAIL_${label}_BRAND_ERROR] Ref: ${refId}`, result.value.error)
        } else {
          console.log(`[EMAIL_${label}_BRAND_SENT] Ref: ${refId} → ID: ${result.value.data?.id}`)
        }
      })

      return NextResponse.json({
        success: true,
        refId,
        message: 'Brand partnership inquiry received successfully.',
        receivedAt,
      })
    }

    // ─── Creator Partnership ──────────────────────────────────────────────────
    if (type === 'creator') {
      const validation = validateForm(creatorPartnershipSchema, data)
      if (!validation.success) {
        return NextResponse.json(
          { success: false, message: 'Please review and fix highlighted fields', errors: validation.errors },
          { status: 400 }
        )
      }

      const refId = `FF-CR-${Math.floor(100000 + Math.random() * 900000)}`
      const receivedAt = new Date().toISOString()
      const d = validation.data

      const emailJobs = [
        resend.emails.send({
          from: FROM,
          to: [TEAM_EMAIL],
          subject: `[Creator Application] ${d.fullName} (${d.instagram}) — Ref: ${refId}`,
          html: creatorNotificationEmail(d, refId, receivedAt),
        }),
      ]

      if (!IS_TEST_MODE) {
        emailJobs.push(
          resend.emails.send({
            from: FROM,
            to: [d.email],
            subject: `Your creator application is confirmed — Ref: ${refId}`,
            html: creatorConfirmationEmail(d.fullName, refId),
          })
        )
      } else {
        console.log(`[TEST_MODE] Skipping client confirmation email to: ${d.email}`)
      }

      const results = await Promise.allSettled(emailJobs)

      results.forEach((result, i) => {
        const label = i === 0 ? 'TEAM' : 'CLIENT'
        if (result.status === 'rejected') {
          console.error(`[EMAIL_${label}_CREATOR_FAILED]`, result.reason)
        } else if (result.value.error) {
          console.error(`[EMAIL_${label}_CREATOR_ERROR] Ref: ${refId}`, result.value.error)
        } else {
          console.log(`[EMAIL_${label}_CREATOR_SENT] Ref: ${refId} → ID: ${result.value.data?.id}`)
        }
      })

      return NextResponse.json({
        success: true,
        refId,
        message: 'Creator profile application received successfully.',
        receivedAt,
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid inquiry type specified' },
      { status: 400 }
    )
  } catch (error) {
    console.error('[API_PARTNERSHIP_ERROR]', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error processing form' },
      { status: 500 }
    )
  }
}
