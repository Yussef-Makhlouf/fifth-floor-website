import { z } from 'zod'
import { SERVICE_TITLES } from './contact-config'

// Name Regex supporting English, Arabic, spaces, hyphens and apostrophes
const NAME_REGEX = /^[a-zA-Z\s\u0600-\u06FF\u0750-\u077F'-]+$/
// Phone Regex supporting GCC and international formats
const PHONE_REGEX = /^\+?[0-9\s\-()]{7,20}$/
// Handle Regex for Instagram/TikTok (@username or URL)
const SOCIAL_HANDLE_REGEX = /^@?[a-zA-Z0-9._]{2,30}$|^https?:\/\/(www\.)?(instagram|tiktok)\.com\/[a-zA-Z0-9._]+\/?$/

// ============================================================================
// CONTACT FORM SCHEMA - General Project Inquiries
// ============================================================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(NAME_REGEX, 'Name can only contain letters, spaces, and hyphens'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters'),

  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  serviceType: z
    .string()
    .optional()
    .refine(
      (val) => !val || SERVICE_TITLES.includes(val as typeof SERVICE_TITLES[number]),
      'Please select a valid service'
    ),

  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// ============================================================================
// EMAIL-ONLY SCHEMA - For simple newsletter/CTA forms
// ============================================================================

export const emailOnlySchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters'),
})

export type EmailOnlyData = z.infer<typeof emailOnlySchema>

// ============================================================================
// BRAND PARTNERSHIP SCHEMA - Strict Super Validation
// ============================================================================

export const brandPartnershipSchema = z.object({
  brandName: z
    .string()
    .min(1, 'Company Name is required')
    .min(2, 'Company Name must be at least 2 characters')
    .max(100, 'Company Name cannot exceed 100 characters'),

  contactPerson: z
    .string()
    .min(1, 'Contact Person is required')
    .min(2, 'Contact Person must be at least 2 characters')
    .max(100, 'Contact Person cannot exceed 100 characters')
    .regex(NAME_REGEX, 'Contact Person can only contain letters, spaces, and hyphens'),

  industry: z
    .string()
    .min(1, 'Industry / Activity is required')
    .max(100, 'Industry cannot exceed 100 characters'),

  website: z
    .string()
    .max(250, 'Website link cannot exceed 250 characters')
    .optional()
    .or(z.literal('')),

  instagramLink: z
    .string()
    .max(250, 'Instagram link cannot exceed 250 characters')
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email cannot exceed 254 characters'),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(PHONE_REGEX, 'Please enter a valid phone number (e.g. +965 9999 8888)'),

  targetAudience: z
    .array(z.string())
    .min(1, 'Please select at least one target audience category'),

  projectGoals: z
    .array(z.string())
    .min(1, 'Please select at least one project goal'),

  goalOther: z
    .string()
    .max(500, 'Additional goal details cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),

  participationType: z
    .array(z.string())
    .min(1, 'Please select at least one participation method'),

  participationOther: z
    .string()
    .max(500, 'Other participation description cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),

  eventCategories: z
    .array(z.string())
    .optional(),

  notes: z
    .string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
})

export type BrandPartnershipData = z.infer<typeof brandPartnershipSchema>

// ============================================================================
// CREATOR PARTNERSHIP SCHEMA - Strict Super Validation
// ============================================================================

export const creatorPartnershipSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name cannot exceed 100 characters')
    .regex(NAME_REGEX, 'Name can only contain letters, spaces, and hyphens'),

  instagram: z
    .string()
    .min(1, 'Instagram handle is required')
    .regex(SOCIAL_HANDLE_REGEX, 'Please enter a valid handle (e.g. @username) or profile link'),

  otherSocials: z
    .string()
    .max(200, 'Other social platforms detail cannot exceed 200 characters')
    .optional()
    .or(z.literal('')),

  followers: z
    .string()
    .max(50, 'Followers count cannot exceed 50 characters')
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email cannot exceed 254 characters'),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(PHONE_REGEX, 'Please enter a valid phone number (e.g. +965 9999 8888)'),

  categories: z
    .array(z.string())
    .min(1, 'Please select at least one content category'),

  collabType: z
    .array(z.string())
    .min(1, 'Please select at least one collaboration type'),

  paidDeliverables: z.array(z.string()).optional(),

  paidNotes: z
    .string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),

  freeCollabTypes: z.array(z.string()).optional(),

  freeDeliverables: z.array(z.string()).optional(),

  notes: z
    .string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional()
    .or(z.literal('')),
})

export type CreatorPartnershipData = z.infer<typeof creatorPartnershipSchema>

// ============================================================================
// HELPER VALIDATION FUNCTIONS
// ============================================================================

export type FormErrors<T> = Partial<Record<keyof T, string>>

export function validateForm<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: FormErrors<z.infer<T>> } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: Record<string, string> = {}
  result.error.errors.forEach((err) => {
    const field = (err.path[0] as string) || 'general'
    if (!errors[field]) {
      errors[field] = err.message
    }
  })

  return { success: false, errors: errors as FormErrors<z.infer<T>> }
}

export function validateSingleField<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  field: keyof z.infer<T>,
  value: unknown
): string | null {
  const fieldSchema = schema.shape[field as string]
  if (!fieldSchema) return null

  const result = fieldSchema.safeParse(value)
  if (result.success) return null

  return result.error.errors[0]?.message || 'Invalid value'
}

export const validateField = validateSingleField
