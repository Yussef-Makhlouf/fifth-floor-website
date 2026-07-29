/**
 * Fifth Floor Agency — Branded Email Templates
 * All emails use inline CSS for maximum email client compatibility (Gmail, Outlook, Apple Mail).
 */

// ─── Shared Palette & Layout ──────────────────────────────────────────────────

const COLORS = {
  bg: '#FAF9F6',
  card: '#FFFFFF',
  primary: '#3E3E3E',
  secondary: '#6A6A6A',
  muted: '#919191',
  border: '#E8E5E0',
  tag: '#F3F0EB',
  tagText: '#3E3E3E',
}

function htmlWrapper(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${COLORS.primary};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;">
          <tr>
            <td style="background-color:${COLORS.primary};padding:28px 40px;text-align:center;">
              <p style="margin:0;color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.35em;text-transform:uppercase;">FIFTH FLOOR</p>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.55);font-size:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:400;">Creative Agency — Kuwait</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:${COLORS.card};padding:40px 40px 32px;border:1px solid ${COLORS.border};border-top:none;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;text-align:center;background-color:${COLORS.bg};border:1px solid ${COLORS.border};border-top:none;">
              <p style="margin:0;color:${COLORS.muted};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">Fifth Floor Agency · Kuwait</p>
              <p style="margin:6px 0 0;color:${COLORS.muted};font-size:10px;">This is an automated notification. Do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function badge(text: string): string {
  return `<span style="display:inline-block;background-color:${COLORS.tag};color:${COLORS.tagText};font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:3px 10px;border-radius:2px;margin:2px 3px 2px 0;">${text}</span>`
}

function section(title: string, rows: [string, string | undefined][]): string {
  const validRows = rows.filter(([, val]) => val && String(val).trim() !== '')
  if (validRows.length === 0) return ''
  const tableRows = validRows.map(([label, value]) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid ${COLORS.border};width:38%;vertical-align:top;">
        <span style="font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.muted};">${label}</span>
      </td>
      <td style="padding:10px 16px;border-bottom:1px solid ${COLORS.border};vertical-align:top;">
        <span style="font-size:13px;color:${COLORS.primary};line-height:1.5;">${value}</span>
      </td>
    </tr>`).join('')
  return `
    <p style="margin:28px 0 10px;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:${COLORS.muted};">${title}</p>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLORS.border};border-radius:2px;">
      ${tableRows}
    </table>`
}

function refIdBlock(refId: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.tag};border:1px solid ${COLORS.border};padding:16px 20px;margin:24px 0 0;border-radius:2px;">
      <tr>
        <td>
          <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:${COLORS.muted};">Reference Code</p>
          <p style="margin:4px 0 0;font-size:20px;font-weight:700;font-family:'Courier New',Courier,monospace;color:${COLORS.primary};">${refId}</p>
        </td>
        <td align="right" style="vertical-align:middle;">
          <span style="font-size:10px;color:${COLORS.muted};font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">Auto-Generated</span>
        </td>
      </tr>
    </table>`
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface BrandData {
  brandName: string
  contactPerson: string
  industry: string
  website?: string
  instagramLink?: string
  email: string
  phone: string
  targetAudience: string[]
  projectGoals: string[]
  goalOther?: string
  participationType: string[]
  participationOther?: string
  eventCategories?: string[]
  notes?: string
}

interface CreatorData {
  fullName: string
  instagram: string
  otherSocials?: string
  followers?: string
  email: string
  phone: string
  categories: string[]
  collabType: string[]
  paidDeliverables?: string[]
  paidNotes?: string
  freeCollabTypes?: string[]
  freeDeliverables?: string[]
  notes?: string
}

interface ContactData {
  name: string
  email: string
  company?: string
  serviceType?: string
  message: string
}

// ─── Brand Partnership — Team Notification ────────────────────────────────────

export function brandNotificationEmail(data: BrandData, refId: string, receivedAt: string): string {
  const dateStr = new Date(receivedAt).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const body = `
    <div style="background-color:#F0FDF4;border:1px solid #bbf7d0;padding:12px 16px;border-radius:2px;margin-bottom:24px;">
      <p style="margin:0;font-size:12px;font-weight:700;color:#15803d;letter-spacing:0.1em;text-transform:uppercase;">New Brand Partnership Inquiry</p>
    </div>
    <h1 style="margin:0 0 4px;font-size:26px;font-weight:300;color:${COLORS.primary};letter-spacing:-0.5px;"><strong style="font-weight:700;">${data.brandName}</strong></h1>
    <p style="margin:0 0 6px;font-size:13px;color:${COLORS.secondary};">${data.industry} · ${dateStr}</p>
    ${refIdBlock(refId)}
    ${section('Contact Details', [
      ['Contact Person', data.contactPerson],
      ['Email', `<a href="mailto:${data.email}" style="color:${COLORS.primary};text-decoration:underline;">${data.email}</a>`],
      ['Phone', `<a href="tel:${data.phone}" style="color:${COLORS.primary};text-decoration:underline;">${data.phone}</a>`],
      ['Website', data.website ? `<a href="${data.website}" style="color:${COLORS.primary};text-decoration:underline;">${data.website}</a>` : undefined],
      ['Instagram', data.instagramLink ? `<a href="${data.instagramLink}" style="color:${COLORS.primary};text-decoration:underline;">${data.instagramLink}</a>` : undefined],
    ])}
    ${section('Campaign Details', [
      ['Target Audience', data.targetAudience.map(badge).join('')],
      ['Project Goals', [...data.projectGoals, ...(data.goalOther ? [data.goalOther] : [])].map(badge).join('')],
      ['Participation Method', data.participationType.map(badge).join('')],
      ['Other / Custom Request', data.participationOther ? data.participationOther : undefined],
      ['Event Categories', data.eventCategories && data.eventCategories.length > 0 ? data.eventCategories.map(badge).join('') : undefined],
    ])}
    ${data.notes ? section('Additional Notes', [['Notes', data.notes]]) : ''}
    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:${data.email}?subject=Re: Your Partnership Inquiry [${refId}]"
        style="display:inline-block;background-color:${COLORS.primary};color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:14px 28px;text-decoration:none;border-radius:2px;">
        Reply to ${data.contactPerson}
      </a>
    </div>`
  return htmlWrapper(`Brand Inquiry — ${data.brandName} [${refId}]`, body)
}

// ─── Brand — Client Auto-Confirmation ─────────────────────────────────────────

export function brandConfirmationEmail(name: string, refId: string): string {
  const body = `
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:300;color:${COLORS.primary};">Thank you, <strong style="font-weight:700;">${name}</strong></h2>
    <p style="margin:0 0 24px;font-size:14px;color:${COLORS.secondary};line-height:1.7;">
      We've received your brand partnership inquiry and our team will review your details shortly.
      Expect to hear from us within <strong>1–2 business days</strong>.
    </p>
    ${refIdBlock(refId)}
    <p style="margin:28px 0 0;font-size:13px;color:${COLORS.secondary};line-height:1.7;">
      Please save your reference code above — you can use it when following up with our team.
    </p>
    <div style="margin-top:32px;padding-top:24px;border-top:1px solid ${COLORS.border};">
      <p style="margin:0;font-size:12px;color:${COLORS.muted};">The Fifth Floor Team<br/><a href="mailto:info@fifth-floor.agency" style="color:${COLORS.muted};">info@fifth-floor.agency</a></p>
    </div>`
  return htmlWrapper(`Partnership Inquiry Confirmed [${refId}]`, body)
}

// ─── Creator Partnership — Team Notification ──────────────────────────────────

export function creatorNotificationEmail(data: CreatorData, refId: string, receivedAt: string): string {
  const dateStr = new Date(receivedAt).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const hasPaid = (data.paidDeliverables && data.paidDeliverables.length > 0) || !!data.paidNotes
  const hasFree = (data.freeCollabTypes && data.freeCollabTypes.length > 0) || (data.freeDeliverables && data.freeDeliverables.length > 0)
  const body = `
    <div style="background-color:#EFF6FF;border:1px solid #bfdbfe;padding:12px 16px;border-radius:2px;margin-bottom:24px;">
      <p style="margin:0;font-size:12px;font-weight:700;color:#1d4ed8;letter-spacing:0.1em;text-transform:uppercase;">New Creator / Influencer Application</p>
    </div>
    <h1 style="margin:0 0 4px;font-size:26px;font-weight:300;color:${COLORS.primary};letter-spacing:-0.5px;"><strong style="font-weight:700;">${data.fullName}</strong></h1>
    <p style="margin:0 0 6px;font-size:13px;color:${COLORS.secondary};">${data.instagram} · ${data.followers ? data.followers + ' followers' : 'Followers N/A'} · ${dateStr}</p>
    ${refIdBlock(refId)}
    ${section('Contact Details', [
      ['Email', `<a href="mailto:${data.email}" style="color:${COLORS.primary};text-decoration:underline;">${data.email}</a>`],
      ['Phone', `<a href="tel:${data.phone}" style="color:${COLORS.primary};text-decoration:underline;">${data.phone}</a>`],
      ['Instagram', data.instagram],
      ['Other Socials', data.otherSocials],
      ['Followers', data.followers],
    ])}
    ${section('Creator Profile', [
      ['Content Categories', data.categories.map(badge).join('')],
      ['Collaboration Types', data.collabType.map(badge).join('')],
    ])}
    ${hasPaid ? section('Paid Collaboration', [
      ['Deliverables', data.paidDeliverables && data.paidDeliverables.length > 0 ? data.paidDeliverables.map(badge).join('') : undefined],
      ['Notes', data.paidNotes],
    ]) : ''}
    ${hasFree ? section('Free Collaboration', [
      ['Collab Types', data.freeCollabTypes && data.freeCollabTypes.length > 0 ? data.freeCollabTypes.map(badge).join('') : undefined],
      ['Deliverables', data.freeDeliverables && data.freeDeliverables.length > 0 ? data.freeDeliverables.map(badge).join('') : undefined],
    ]) : ''}
    ${data.notes ? section('Additional Notes', [['Notes', data.notes]]) : ''}
    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:${data.email}?subject=Re: Your Creator Application [${refId}]"
        style="display:inline-block;background-color:${COLORS.primary};color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:14px 28px;text-decoration:none;border-radius:2px;">
        Reply to ${data.fullName}
      </a>
    </div>`
  return htmlWrapper(`Creator Application — ${data.fullName} [${refId}]`, body)
}

// ─── Creator — Client Auto-Confirmation ───────────────────────────────────────

export function creatorConfirmationEmail(name: string, refId: string): string {
  const body = `
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:300;color:${COLORS.primary};">Your application is in, <strong style="font-weight:700;">${name}</strong></h2>
    <p style="margin:0 0 24px;font-size:14px;color:${COLORS.secondary};line-height:1.7;">
      Thank you for applying to our creator network. We've logged your profile and will be in touch as soon as we find a collaboration that fits your content.
      This usually takes <strong>2–3 business days</strong>.
    </p>
    ${refIdBlock(refId)}
    <p style="margin:28px 0 0;font-size:13px;color:${COLORS.secondary};line-height:1.7;">Keep your reference code handy for any follow-ups. We look forward to creating great things together.</p>
    <div style="margin-top:32px;padding-top:24px;border-top:1px solid ${COLORS.border};">
      <p style="margin:0;font-size:12px;color:${COLORS.muted};">The Fifth Floor Team<br/><a href="mailto:info@fifth-floor.agency" style="color:${COLORS.muted};">info@fifth-floor.agency</a></p>
    </div>`
  return htmlWrapper(`Creator Application Received [${refId}]`, body)
}

// ─── Contact Form — Team Notification ────────────────────────────────────────

export function contactNotificationEmail(data: ContactData, refId: string, receivedAt: string): string {
  const dateStr = new Date(receivedAt).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const body = `
    <div style="background-color:#FFFBEB;border:1px solid #fde68a;padding:12px 16px;border-radius:2px;margin-bottom:24px;">
      <p style="margin:0;font-size:12px;font-weight:700;color:#92400e;letter-spacing:0.1em;text-transform:uppercase;">New Project Inquiry</p>
    </div>
    <h1 style="margin:0 0 4px;font-size:26px;font-weight:300;color:${COLORS.primary};letter-spacing:-0.5px;"><strong style="font-weight:700;">${data.name}</strong></h1>
    <p style="margin:0 0 6px;font-size:13px;color:${COLORS.secondary};">${data.company || 'No company'} · ${dateStr}</p>
    ${refIdBlock(refId)}
    ${section('Contact Details', [
      ['Full Name', data.name],
      ['Email', `<a href="mailto:${data.email}" style="color:${COLORS.primary};text-decoration:underline;">${data.email}</a>`],
      ['Company', data.company],
      ['Service Interested', data.serviceType ? badge(data.serviceType) : undefined],
    ])}
    ${section('Their Message', [
      ['Message', data.message],
    ])}
    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:${data.email}?subject=Re: Your Project Inquiry [${refId}]"
        style="display:inline-block;background-color:${COLORS.primary};color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:14px 28px;text-decoration:none;border-radius:2px;">
        Reply to ${data.name}
      </a>
    </div>`
  return htmlWrapper(`Project Inquiry — ${data.name} [${refId}]`, body)
}

// ─── Contact — Client Auto-Confirmation ──────────────────────────────────────

export function contactConfirmationEmail(name: string, refId: string): string {
  const body = `
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:300;color:${COLORS.primary};">We got your message, <strong style="font-weight:700;">${name}</strong></h2>
    <p style="margin:0 0 24px;font-size:14px;color:${COLORS.secondary};line-height:1.7;">
      Thank you for reaching out to Fifth Floor. Our creative team has received your project inquiry and will review it carefully.
      Expect a response within <strong>1–2 business days</strong>.
    </p>
    ${refIdBlock(refId)}
    <p style="margin:28px 0 0;font-size:13px;color:${COLORS.secondary};line-height:1.7;">
      If your project is time-sensitive, reach us directly at
      <a href="mailto:info@fifth-floor.agency" style="color:${COLORS.primary};font-weight:600;">info@fifth-floor.agency</a>.
    </p>
    <div style="margin-top:32px;padding-top:24px;border-top:1px solid ${COLORS.border};">
      <p style="margin:0;font-size:12px;color:${COLORS.muted};">The Fifth Floor Team<br/><a href="mailto:info@fifth-floor.agency" style="color:${COLORS.muted};">info@fifth-floor.agency</a></p>
    </div>`
  return htmlWrapper(`We received your inquiry [${refId}]`, body)
}
