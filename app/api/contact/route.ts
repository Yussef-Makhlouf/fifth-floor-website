import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/contact-schema'
import { contactNotificationEmail, contactConfirmationEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'
const FROM = `${process.env.FROM_NAME ?? 'Fifth Floor Agency'} <${FROM_EMAIL}>`
const TEAM_EMAIL = process.env.TEAM_EMAIL ?? 'info@fifth-floor.agency'

// In Resend test mode (no verified domain), we can only send to the account owner's email.
const IS_TEST_MODE = FROM_EMAIL === 'onboarding@resend.dev'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = contactFormSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const refId = `FF-PRJ-${Math.floor(100000 + Math.random() * 900000)}`
    const receivedAt = new Date().toISOString()
    const d = validation.data

    const emailJobs = [
      resend.emails.send({
        from: FROM,
        to: [TEAM_EMAIL],
        subject: `[Project Inquiry] ${d.name}${d.company ? ` — ${d.company}` : ''} — Ref: ${refId}`,
        html: contactNotificationEmail(d, refId, receivedAt),
      }),
    ]

    if (!IS_TEST_MODE) {
      emailJobs.push(
        resend.emails.send({
          from: FROM,
          to: [d.email],
          subject: `We received your inquiry — Ref: ${refId}`,
          html: contactConfirmationEmail(d.name, refId),
        })
      )
    } else {
      console.log(`[TEST_MODE] Skipping client confirmation email to: ${d.email}`)
    }

    const results = await Promise.allSettled(emailJobs)

    results.forEach((result, i) => {
      const label = i === 0 ? 'TEAM' : 'CLIENT'
      if (result.status === 'rejected') {
        console.error(`[EMAIL_${label}_CONTACT_FAILED]`, result.reason)
      } else if (result.value.error) {
        console.error(`[EMAIL_${label}_CONTACT_ERROR] Ref: ${refId}`, result.value.error)
      } else {
        console.log(`[EMAIL_${label}_CONTACT_SENT] Ref: ${refId} → ID: ${result.value.data?.id}`)
      }
    })

    return NextResponse.json({
      success: true,
      refId,
      message: 'Project request received successfully.',
      receivedAt,
    })
  } catch (error) {
    console.error('[API_CONTACT_ERROR]', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error processing form' },
      { status: 500 }
    )
  }
}
