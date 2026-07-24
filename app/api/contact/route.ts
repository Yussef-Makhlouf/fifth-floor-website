import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/contact-schema'

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

    console.log(`[CONTACT_PROJECT_SUBMISSION] [Ref: ${refId}]`, validation.data)

    return NextResponse.json({
      success: true,
      refId,
      message: 'Project request received successfully.',
      receivedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[API_CONTACT_ERROR]', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error processing form' },
      { status: 500 }
    )
  }
}
