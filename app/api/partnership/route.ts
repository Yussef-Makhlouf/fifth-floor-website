import { NextRequest, NextResponse } from 'next/server'
import { brandPartnershipSchema, creatorPartnershipSchema, validateForm } from '@/lib/contact-schema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (type === 'brand') {
      const validation = validateForm(brandPartnershipSchema, data)
      if (!validation.success) {
        return NextResponse.json(
          {
            success: false,
            message: 'Please review and fix highlighted fields',
            errors: validation.errors,
          },
          { status: 400 }
        )
      }

      const refId = `FF-BR-${Math.floor(100000 + Math.random() * 900000)}`
      console.log(`[PARTNERSHIP_BRAND_SUBMISSION] [Ref: ${refId}]`, validation.data)

      return NextResponse.json({
        success: true,
        refId,
        message: 'Brand partnership inquiry received successfully.',
        receivedAt: new Date().toISOString(),
      })
    } else if (type === 'creator') {
      const validation = validateForm(creatorPartnershipSchema, data)
      if (!validation.success) {
        return NextResponse.json(
          {
            success: false,
            message: 'Please review and fix highlighted fields',
            errors: validation.errors,
          },
          { status: 400 }
        )
      }

      const refId = `FF-CR-${Math.floor(100000 + Math.random() * 900000)}`
      console.log(`[PARTNERSHIP_CREATOR_SUBMISSION] [Ref: ${refId}]`, validation.data)

      return NextResponse.json({
        success: true,
        refId,
        message: 'Creator profile application received successfully.',
        receivedAt: new Date().toISOString(),
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
