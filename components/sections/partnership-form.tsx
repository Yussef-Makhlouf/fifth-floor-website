'use client'

import React, { useState, useCallback, useMemo } from 'react'
import {
  Crown,
  Sparkles,
  Megaphone,
  Users,
  Target,
  Rocket,
  HeartHandshake,
  DollarSign,
  Gift,
  Utensils,
  Ticket,
  Tv,
  Briefcase,
  GraduationCap,
  Instagram,
  Package,
  Star,
  Compass,
  Check,
  ChevronRight,
  ChevronLeft,
  Copy,
  CheckCircle2,
  Sliders,
  Layers,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { CurveDecoration } from '@/components/ui/architectural-shapes'
import {
  brandPartnershipSchema,
  creatorPartnershipSchema,
  validateForm,
  validateSingleField,
  type BrandPartnershipData,
  type CreatorPartnershipData,
} from '@/lib/contact-schema'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'brand' | 'creator'
type ViewMode = 'wizard' | 'express'

interface BrandForm {
  brandName: string
  contactPerson: string
  industry: string
  website: string
  participationType: string[]
  projectGoals: string[]
  participationMethods: string[]
  otherParticipationMethod: string
  eventCategories: string[]
}

interface CreatorForm {
  name: string
  phone: string
  email: string
  socialHandle: string
  lookingFor: string[]
  interests: string[]
  paidCampaigns: string[]
  nonPaidEvents: string[]
  nonPaidRestaurant: string[]
  nonPaidPR: string[]
  nonPaidCommunity: string[]
}

interface SuccessReceipt {
  refId: string
  type: Tab
  name: string
  receivedAt: string
}

// ─── Options with Icons ───────────────────────────────────────────────────────

const BRAND_STEPS = [
  { id: 1, title: 'Brand Identity', desc: 'Who you are & contact details' },
  { id: 2, title: 'Sponsorship Level', desc: 'Title, Main, or Activation' },
  { id: 3, title: 'Strategic Goals', desc: 'Awareness, Launch, or Sales' },
  { id: 4, title: 'Format & Categories', desc: 'Methods & target sectors' },
]

const CREATOR_STEPS = [
  { id: 1, title: 'Creator Profile', desc: 'Personal details & handle' },
  { id: 2, title: 'Collaboration Scope', desc: 'Paid, PR, or Events' },
  { id: 3, title: 'Niche & Interests', desc: 'Content focus areas' },
  { id: 4, title: 'Deliverables', desc: 'Reels, Stories, & Posts' },
]

const PARTICIPATION_TYPES = [
  { id: 'title', label: 'Title Sponsor', desc: 'Exclusive header branding', icon: Crown },
  { id: 'main', label: 'Main Sponsor', desc: 'Prime placement across event', icon: Sparkles },
  { id: 'activation', label: 'Activation Partner', desc: 'Interactive on-ground experience', icon: Layers },
  { id: 'marketing', label: 'Marketing Collab', desc: 'Cross-promotional media', icon: Megaphone },
  { id: 'community', label: 'Community Partner', desc: 'Local engagement focus', icon: Users },
]

const PROJECT_GOALS = [
  { id: 'awareness', label: 'Brand Awareness', icon: Target },
  { id: 'launch', label: 'Product Launch', icon: Rocket },
  { id: 'engagement', label: 'Community Engagement', icon: Users },
  { id: 'acquisition', label: 'Customer Acquisition', icon: Star },
  { id: 'sales', label: 'Sales Promotion', icon: DollarSign },
  { id: 'csr', label: 'CSR Initiative', icon: HeartHandshake },
]

const PARTICIPATION_METHODS = [
  { id: 'financial', label: 'Financial Sponsorship', icon: DollarSign },
  { id: 'products', label: 'Products / Gifts', icon: Gift },
  { id: 'vouchers', label: 'Discount Vouchers', icon: Ticket },
  { id: 'fnb', label: 'Food & Beverage', icon: Utensils },
  { id: 'booth', label: 'Interactive Booth', icon: Sliders },
  { id: 'entertainment', label: 'Entertainment / Activity', icon: Tv },
  { id: 'workshop', label: 'Workshop / Experience', icon: Compass },
  { id: 'other', label: 'Other Special Request', icon: Sparkles },
]

const EVENT_CATEGORIES = [
  { id: 'family', label: 'Family', icon: Users },
  { id: 'kids', label: 'Kids', icon: Star },
  { id: 'sports', label: 'Sports', icon: Compass },
  { id: 'entertainment', label: 'Entertainment', icon: Tv },
  { id: 'fashion', label: 'Fashion', icon: Crown },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'wellness', label: 'Wellness', icon: HeartHandshake },
  { id: 'education', label: 'Education', icon: GraduationCap },
]

const LOOKING_FOR = [
  { id: 'paid', label: 'Paid Campaigns', desc: 'Commercial deliverables', icon: DollarSign },
  { id: 'event_invite', label: 'Non-Paid Event Invitations', desc: 'VIP access & red carpets', icon: Ticket },
  { id: 'restaurant', label: 'Non-Paid Restaurant Invitations', desc: 'Tastings & openings', icon: Utensils },
  { id: 'pr_packages', label: 'Non-Paid PR Packages', desc: 'Product reviews & unboxing', icon: Package },
  { id: 'community', label: 'Non-Paid Community Events', desc: 'Local meetups & talks', icon: Users },
  { id: 'longterm', label: 'Long-term Brand Partnerships', desc: 'Ambassador relationships', icon: Crown },
]

const CREATOR_INTERESTS = [
  { id: 'fnb', label: 'Food & Beverage', icon: Utensils },
  { id: 'family', label: 'Family & Kids', icon: Users },
  { id: 'entertainment', label: 'Entertainment', icon: Tv },
  { id: 'fashion', label: 'Fashion', icon: Crown },
  { id: 'beauty', label: 'Beauty', icon: Sparkles },
  { id: 'sports', label: 'Sports & Fitness', icon: Compass },
  { id: 'travel', label: 'Travel', icon: Compass },
  { id: 'business', label: 'Business & Finance', icon: Briefcase },
]

const COLLAB_FORMATS = [
  { id: 'reel', label: 'Reel' },
  { id: 'post', label: 'Post' },
  { id: 'stories', label: 'Stories' },
  { id: 'reel_stories', label: 'Reel + Stories' },
  { id: 'post_stories', label: 'Post + Stories' },
  { id: 'custom', label: 'Custom' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggleArrayItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]
}

// ─── Rich Option Card Component ──────────────────────────────────────────────

function RichOptionCard({
  label,
  desc,
  icon: Icon,
  selected,
  onClick,
  error,
}: {
  label: string
  desc?: string
  icon?: React.ElementType
  selected: boolean
  onClick: () => void
  error?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col justify-between p-5 border text-left transition-all duration-300 rounded-sm cursor-pointer select-none
        ${selected
          ? 'border-[#3E3E3E] bg-[#3E3E3E] text-white shadow-lg shadow-black/10 translate-y-[-1px]'
          : error
          ? 'border-red-400 bg-red-50/20 text-[#3E3E3E]'
          : 'border-[#919191]/25 bg-white text-[#3E3E3E] hover:border-[#3E3E3E]/60 hover:bg-[#3E3E3E]/[0.02]'
        }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        {Icon && (
          <div className={`p-2.5 rounded-sm transition-colors ${selected ? 'bg-white/10 text-white' : 'bg-[#3E3E3E]/5 text-[#3E3E3E]'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selected ? 'border-white bg-white text-[#3E3E3E]' : 'border-[#919191]/40 group-hover:border-[#3E3E3E]'}`}>
          {selected && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold tracking-wide mb-1">{label}</h4>
        {desc && (
          <p className={`text-xs font-light leading-relaxed ${selected ? 'text-white/80' : 'text-[#6A6A6A]'}`}>
            {desc}
          </p>
        )}
      </div>
    </button>
  )
}

// ─── Format Pill Group Component ─────────────────────────────────────────────

function FormatPillGroup({
  title,
  selected,
  onToggle,
  allowedFormats,
}: {
  title: string
  selected: string[]
  onToggle: (formatId: string) => void
  allowedFormats?: string[]
}) {
  const formats = allowedFormats
    ? COLLAB_FORMATS.filter(f => allowedFormats.includes(f.id))
    : COLLAB_FORMATS

  return (
    <div className="p-4 border border-[#919191]/20 bg-[#fafafa]/50 rounded-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#3E3E3E]">
          {title}
        </span>
        <span className="text-[10px] text-[#919191] uppercase tracking-widest">
          {selected.length} selected
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {formats.map(fmt => {
          const isSelected = selected.includes(fmt.id)
          return (
            <button
              key={fmt.id}
              type="button"
              onClick={() => onToggle(fmt.id)}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-wide border transition-all duration-200 rounded-sm
                ${isSelected
                  ? 'border-[#3E3E3E] bg-[#3E3E3E] text-white'
                  : 'border-[#919191]/30 text-[#6A6A6A] hover:border-[#3E3E3E] hover:text-[#3E3E3E] bg-white'
                }`}
            >
              {fmt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PartnershipForm() {
  const [activeTab, setActiveTab] = useState<Tab>('brand')
  const [viewMode, setViewMode] = useState<ViewMode>('wizard')
  const [step, setStep] = useState(1)

  // Form State
  const [brandData, setBrandData] = useState<BrandForm>({
    brandName: '',
    contactPerson: '',
    industry: '',
    website: '',
    participationType: [],
    projectGoals: [],
    participationMethods: [],
    otherParticipationMethod: '',
    eventCategories: [],
  })

  const [creatorData, setCreatorData] = useState<CreatorForm>({
    name: '',
    phone: '',
    email: '',
    socialHandle: '',
    lookingFor: [],
    interests: [],
    paidCampaigns: [],
    nonPaidEvents: [],
    nonPaidRestaurant: [],
    nonPaidPR: [],
    nonPaidCommunity: [],
  })

  // Touch and Error tracking
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [receipt, setReceipt] = useState<SuccessReceipt | null>(null)
  const [copiedRef, setCopiedRef] = useState(false)

  const steps = activeTab === 'brand' ? BRAND_STEPS : CREATOR_STEPS
  const maxSteps = steps.length

  // Super Validation for current step
  const validateCurrentStep = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (activeTab === 'brand') {
      if (step === 1 || viewMode === 'express') {
        if (!brandData.brandName || brandData.brandName.trim().length < 2) {
          newErrors.brandName = 'Brand Name is required (min 2 characters)'
        }
        if (!brandData.contactPerson || brandData.contactPerson.trim().length < 2) {
          newErrors.contactPerson = 'Contact Person is required (min 2 characters)'
        }
      }

      if (step === 2 || viewMode === 'express') {
        if (brandData.participationType.length === 0) {
          newErrors.participationType = 'Please select at least one participation level'
        }
      }

      if (step === 3 || viewMode === 'express') {
        if (brandData.projectGoals.length === 0) {
          newErrors.projectGoals = 'Please select at least one project goal'
        }
      }

      if (step === 4 || viewMode === 'express') {
        if (brandData.participationMethods.length === 0) {
          newErrors.participationMethods = 'Please select at least one participation method'
        }
        if (brandData.participationMethods.includes('other') && (!brandData.otherParticipationMethod || brandData.otherParticipationMethod.trim().length < 3)) {
          newErrors.otherParticipationMethod = 'Please specify details for custom method (min 3 characters)'
        }
        if (brandData.eventCategories.length === 0) {
          newErrors.eventCategories = 'Please select at least one event category'
        }
      }
    } else {
      if (step === 1 || viewMode === 'express') {
        if (!creatorData.name || creatorData.name.trim().length < 2) {
          newErrors.name = 'Full Name is required (min 2 characters)'
        }
        if (!creatorData.phone || creatorData.phone.trim().length < 6) {
          newErrors.phone = 'Valid phone number is required (e.g. +965 9999 8888)'
        }
        if (!creatorData.email || !creatorData.email.includes('@')) {
          newErrors.email = 'Valid email address is required'
        }
        if (!creatorData.socialHandle || creatorData.socialHandle.trim().length < 2) {
          newErrors.socialHandle = 'Social handle or link is required (e.g. @yourhandle)'
        }
      }

      if (step === 2 || viewMode === 'express') {
        if (creatorData.lookingFor.length === 0) {
          newErrors.lookingFor = 'Please select at least one partnership type'
        }
      }

      if (step === 3 || viewMode === 'express') {
        if (creatorData.interests.length === 0) {
          newErrors.interests = 'Please select at least one interest category'
        }
      }
    }

    setFieldErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }, [activeTab, step, viewMode, brandData, creatorData])

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setStep(prev => Math.min(maxSteps, prev + 1))
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFieldErrors(prev => ({ ...prev, [name]: '' }))
    setTouched(prev => ({ ...prev, [name]: true }))

    if (activeTab === 'brand') {
      setBrandData(prev => ({ ...prev, [name]: value }))
      const err = validateSingleField(brandPartnershipSchema as any, name as any, value)
      if (err) setFieldErrors(prev => ({ ...prev, [name]: err }))
    } else {
      setCreatorData(prev => ({ ...prev, [name]: value }))
      const err = validateSingleField(creatorPartnershipSchema as any, name as any, value)
      if (err) setFieldErrors(prev => ({ ...prev, [name]: err }))
    }
  }

  const handleBrandToggle = (field: keyof BrandForm, id: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: '' }))
    setBrandData(prev => {
      const arr = prev[field] as string[]
      return { ...prev, [field]: toggleArrayItem(arr, id) }
    })
  }

  const handleCreatorToggle = (field: keyof CreatorForm, id: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: '' }))
    setCreatorData(prev => {
      const arr = prev[field] as string[]
      return { ...prev, [field]: toggleArrayItem(arr, id) }
    })
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)
    setFieldErrors({})

    // Full schema validation
    const schema = activeTab === 'brand' ? brandPartnershipSchema : creatorPartnershipSchema
    const data = activeTab === 'brand' ? brandData : creatorData
    const validation = validateForm(schema as any, data)

    if (!validation.success) {
      setFieldErrors(validation.errors as Record<string, string>)
      setIsSubmitting(false)

      // Jump to first step with error in wizard mode
      if (viewMode === 'wizard') {
        const errKeys = Object.keys(validation.errors)
        if (activeTab === 'brand') {
          if (errKeys.some(k => ['brandName', 'contactPerson'].includes(k))) setStep(1)
          else if (errKeys.includes('participationType')) setStep(2)
          else if (errKeys.includes('projectGoals')) setStep(3)
          else if (errKeys.some(k => ['participationMethods', 'otherParticipationMethod', 'eventCategories'].includes(k))) setStep(4)
        } else {
          if (errKeys.some(k => ['name', 'phone', 'email', 'socialHandle'].includes(k))) setStep(1)
          else if (errKeys.includes('lookingFor')) setStep(2)
          else if (errKeys.includes('interests')) setStep(3)
        }
      }
      return
    }

    try {
      const res = await fetch('/api/partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, data: validation.data }),
      })

      const responseData = await res.json()

      if (res.ok && responseData.success) {
        setReceipt({
          refId: responseData.refId,
          type: activeTab,
          name: activeTab === 'brand' ? brandData.brandName : creatorData.name,
          receivedAt: responseData.receivedAt,
        })
      } else if (responseData.errors) {
        setFieldErrors(responseData.errors)
      } else {
        setFieldErrors({ general: responseData.message || 'Submission failed' })
      }
    } catch {
      setFieldErrors({ general: 'Network connection failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyRef = () => {
    if (!receipt) return
    navigator.clipboard.writeText(receipt.refId)
    setCopiedRef(true)
    setTimeout(() => setCopiedRef(false), 3000)
  }

  const resetForm = () => {
    setReceipt(null)
    setStep(1)
    setFieldErrors({})
    setTouched({})
    setBrandData({
      brandName: '',
      contactPerson: '',
      industry: '',
      website: '',
      participationType: [],
      projectGoals: [],
      participationMethods: [],
      otherParticipationMethod: '',
      eventCategories: [],
    })
    setCreatorData({
      name: '',
      phone: '',
      email: '',
      socialHandle: '',
      lookingFor: [],
      interests: [],
      paidCampaigns: [],
      nonPaidEvents: [],
      nonPaidRestaurant: [],
      nonPaidPR: [],
      nonPaidCommunity: [],
    })
  }

  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#FAF9F6] text-[#3E3E3E] overflow-hidden" id="partnership">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3E3E3E]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#919191]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Architectural Curves */}
      <CurveDecoration className="absolute -top-24 -right-24 opacity-20 pointer-events-none" size="xl" />
      <CurveDecoration className="absolute -bottom-24 -left-24 rotate-180 opacity-20 pointer-events-none" size="xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ── Section Title Header ─────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#3E3E3E]/15 rounded-full text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6A6A6A] mb-4 bg-white/60 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3E3E3E]" />
            Partnership & Creator Portal
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#3E3E3E]">
            Shape the Future <span className="font-bold">Together</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#6A6A6A] font-light max-w-xl mx-auto leading-relaxed">
            Select your track below to access our custom interactive partnership configurator.
          </p>
        </div>

        {/* ── Mode & Tab Switcher Bar ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-2 border border-[#919191]/20 bg-white/80 backdrop-blur-md rounded-sm shadow-sm">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab('brand')
                setStep(1)
                setFieldErrors({})
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-sm
                ${activeTab === 'brand'
                  ? 'bg-[#3E3E3E] text-white shadow-md'
                  : 'text-[#6A6A6A] hover:text-[#3E3E3E] hover:bg-[#3E3E3E]/5'
                }`}
            >
              <Crown className="w-4 h-4" />
              Brand & Sponsor
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('creator')
                setStep(1)
                setFieldErrors({})
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-sm
                ${activeTab === 'creator'
                  ? 'bg-[#3E3E3E] text-white shadow-md'
                  : 'text-[#6A6A6A] hover:text-[#3E3E3E] hover:bg-[#3E3E3E]/5'
                }`}
            >
              <Instagram className="w-4 h-4" />
              Creator & Influencer
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 border border-[#919191]/30 p-1 rounded-sm bg-[#FAF9F6]">
            <button
              type="button"
              onClick={() => setViewMode('wizard')}
              className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 rounded-xs transition-colors
                ${viewMode === 'wizard' ? 'bg-[#3E3E3E] text-white' : 'text-[#6A6A6A] hover:text-[#3E3E3E]'}`}
            >
              <Sliders className="w-3 h-3" />
              Guided Wizard
            </button>
            <button
              type="button"
              onClick={() => setViewMode('express')}
              className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 rounded-xs transition-colors
                ${viewMode === 'express' ? 'bg-[#3E3E3E] text-white' : 'text-[#6A6A6A] hover:text-[#3E3E3E]'}`}
            >
              <Layers className="w-3 h-3" />
              Full Overview
            </button>
          </div>
        </div>

        {/* ── Success Receipt Modal/Overlay ───────────────────────────── */}
        {receipt ? (
          <div className="bg-white border border-[#3E3E3E]/20 p-8 md:p-12 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-[#3E3E3E] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#6A6A6A]">
                Submission Verified
              </span>
              <h3 className="text-3xl font-light tracking-tight mt-1 text-[#3E3E3E]">
                Thank You, <span className="font-bold">{receipt.name}</span>
              </h3>
              <p className="text-sm text-[#6A6A6A] mt-2 max-w-md mx-auto leading-relaxed">
                Your partnership brief has been logged and assigned to a Fifth Floor Director.
              </p>
            </div>

            <div className="max-w-md mx-auto border border-[#919191]/30 p-4 bg-[#fafafa] flex items-center justify-between text-left">
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#919191] tracking-wider">Reference Code</span>
                <span className="text-lg font-mono font-bold text-[#3E3E3E]">{receipt.refId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyRef}
                className="flex items-center gap-2 px-3 py-2 border border-[#3E3E3E] text-xs font-bold uppercase tracking-wider hover:bg-[#3E3E3E] hover:text-white transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedRef ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <p className="text-xs text-[#919191]">
              Submitted on {new Date(receipt.receivedAt).toLocaleDateString()} at {new Date(receipt.receivedAt).toLocaleTimeString()}
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="px-8 py-3.5 bg-[#3E3E3E] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#2a2a2a] transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          /* ── Main Form Canvas ────────────────────────────────────────── */
          <div className="bg-white border border-[#919191]/20 p-6 md:p-12 shadow-xl relative">
            {/* Step Progress Tracker (Wizard Mode) */}
            {viewMode === 'wizard' && (
              <div className="mb-10">
                <div className="flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-[#6A6A6A] mb-3">
                  <span>Step {step} of {maxSteps}: {steps[step - 1].title}</span>
                  <span>{Math.round((step / maxSteps) * 100)}% Complete</span>
                </div>
                {/* Progress bar line */}
                <div className="w-full h-1 bg-[#919191]/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3E3E3E] transition-all duration-500 ease-out"
                    style={{ width: `${(step / maxSteps) * 100}%` }}
                  />
                </div>

                {/* Step Indicators */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {steps.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStep(s.id)}
                      className={`text-left p-2.5 border transition-all text-xs ${
                        step === s.id
                          ? 'border-[#3E3E3E] bg-[#3E3E3E]/5 font-bold text-[#3E3E3E]'
                          : s.id < step
                          ? 'border-[#3E3E3E]/40 text-[#3E3E3E]'
                          : 'border-[#919191]/20 text-[#919191]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px]">0{s.id}</span>
                        {s.id < step && <Check className="w-3 h-3 text-[#3E3E3E]" />}
                      </div>
                      <span className="block truncate mt-1">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {fieldErrors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold tracking-wide flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                {fieldErrors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* ─────────────────────────────────────────────────────────────
                  BRAND & SPONSOR FORM CONTENT
                 ───────────────────────────────────────────────────────────── */}
              {activeTab === 'brand' && (
                <div className="space-y-10">
                  {/* Step 1: Basic Info */}
                  {(viewMode === 'express' || step === 1) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          1. <span className="font-bold">Brand Information</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Tell us about your organization and main point of contact.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Brand Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="brandName"
                            value={brandData.brandName}
                            onChange={handleTextChange}
                            placeholder="e.g. Acme Luxury Group"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.brandName ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.brandName && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.brandName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Contact Person <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="contactPerson"
                            value={brandData.contactPerson}
                            onChange={handleTextChange}
                            placeholder="Full Name & Title"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.contactPerson ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.contactPerson && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.contactPerson}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Industry / Sector
                          </label>
                          <input
                            type="text"
                            name="industry"
                            value={brandData.industry}
                            onChange={handleTextChange}
                            placeholder="e.g. Hospitality, Automotive, Tech"
                            className="w-full py-3 px-0 bg-transparent border-b border-[#919191]/40 text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] text-base transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Website / Social Link
                          </label>
                          <input
                            type="text"
                            name="website"
                            value={brandData.website}
                            onChange={handleTextChange}
                            placeholder="https://yourbrand.com"
                            className="w-full py-3 px-0 bg-transparent border-b border-[#919191]/40 text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] text-base transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Sponsorship Level */}
                  {(viewMode === 'express' || step === 2) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          2. <span className="font-bold">Participation Type</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Select the level of brand presence you are seeking.
                        </p>
                      </div>

                      {fieldErrors.participationType && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.participationType}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {PARTICIPATION_TYPES.map(item => (
                          <RichOptionCard
                            key={item.id}
                            label={item.label}
                            desc={item.desc}
                            icon={item.icon}
                            selected={brandData.participationType.includes(item.id)}
                            onClick={() => handleBrandToggle('participationType', item.id)}
                            error={!!fieldErrors.participationType}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Project Goals */}
                  {(viewMode === 'express' || step === 3) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          3. <span className="font-bold">Project Goal</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          What is your primary objective for this activation?
                        </p>
                      </div>

                      {fieldErrors.projectGoals && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.projectGoals}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {PROJECT_GOALS.map(item => (
                          <RichOptionCard
                            key={item.id}
                            label={item.label}
                            icon={item.icon}
                            selected={brandData.projectGoals.includes(item.id)}
                            onClick={() => handleBrandToggle('projectGoals', item.id)}
                            error={!!fieldErrors.projectGoals}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Methods & Categories */}
                  {(viewMode === 'express' || step === 4) && (
                    <div className="space-y-8">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          4. <span className="font-bold">Participation Format & Event Categories</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          How would you like to contribute and in which categories?
                        </p>
                      </div>

                      {/* Participation Methods */}
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-3">
                          Participation Method <span className="text-red-400">*</span>
                        </span>
                        {fieldErrors.participationMethods && (
                          <p className="text-xs text-red-500 flex items-center gap-1 font-medium mb-3">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {fieldErrors.participationMethods}
                          </p>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {PARTICIPATION_METHODS.map(item => (
                            <RichOptionCard
                              key={item.id}
                              label={item.label}
                              icon={item.icon}
                              selected={brandData.participationMethods.includes(item.id)}
                              onClick={() => handleBrandToggle('participationMethods', item.id)}
                              error={!!fieldErrors.participationMethods}
                            />
                          ))}
                        </div>

                        {brandData.participationMethods.includes('other') && (
                          <div className="mt-4">
                            <input
                              type="text"
                              name="otherParticipationMethod"
                              value={brandData.otherParticipationMethod}
                              onChange={handleTextChange}
                              placeholder="Please describe your custom participation method..."
                              className={`w-full py-2.5 px-0 bg-transparent border-b text-sm text-[#3E3E3E] placeholder-[#919191] focus:outline-none
                                ${fieldErrors.otherParticipationMethod ? 'border-red-500' : 'border-[#3E3E3E]'}`}
                            />
                            {fieldErrors.otherParticipationMethod && (
                              <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                                <AlertCircle className="w-3 h-3" />
                                {fieldErrors.otherParticipationMethod}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Preferred Categories */}
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-3">
                          Preferred Event Categories <span className="text-red-400">*</span>
                        </span>
                        {fieldErrors.eventCategories && (
                          <p className="text-xs text-red-500 flex items-center gap-1 font-medium mb-3">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {fieldErrors.eventCategories}
                          </p>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {EVENT_CATEGORIES.map(item => (
                            <RichOptionCard
                              key={item.id}
                              label={item.label}
                              icon={item.icon}
                              selected={brandData.eventCategories.includes(item.id)}
                              onClick={() => handleBrandToggle('eventCategories', item.id)}
                              error={!!fieldErrors.eventCategories}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  CREATOR & INFLUENCER FORM CONTENT
                 ───────────────────────────────────────────────────────────── */}
              {activeTab === 'creator' && (
                <div className="space-y-10">
                  {/* Step 1: Profile */}
                  {(viewMode === 'express' || step === 1) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          1. <span className="font-bold">Creator Profile</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Share your contact info and primary social channels.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={creatorData.name}
                            onChange={handleTextChange}
                            placeholder="Full Name"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.name ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.name && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Phone Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={creatorData.phone}
                            onChange={handleTextChange}
                            placeholder="+965 9999 8888"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.phone ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.phone && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={creatorData.email}
                            onChange={handleTextChange}
                            placeholder="creator@example.com"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.email ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.email && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Instagram / TikTok Handle <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="socialHandle"
                            value={creatorData.socialHandle}
                            onChange={handleTextChange}
                            placeholder="@yourhandle"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.socialHandle ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.socialHandle && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.socialHandle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: What you are looking for */}
                  {(viewMode === 'express' || step === 2) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          2. <span className="font-bold">I'm Looking For</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Select the types of collaborations you are open to.
                        </p>
                      </div>

                      {fieldErrors.lookingFor && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.lookingFor}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {LOOKING_FOR.map(item => (
                          <RichOptionCard
                            key={item.id}
                            label={item.label}
                            desc={item.desc}
                            icon={item.icon}
                            selected={creatorData.lookingFor.includes(item.id)}
                            onClick={() => handleCreatorToggle('lookingFor', item.id)}
                            error={!!fieldErrors.lookingFor}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Interests */}
                  {(viewMode === 'express' || step === 3) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          3. <span className="font-bold">My Content Interests</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Which categories best align with your audience?
                        </p>
                      </div>

                      {fieldErrors.interests && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.interests}
                        </p>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {CREATOR_INTERESTS.map(item => (
                          <RichOptionCard
                            key={item.id}
                            label={item.label}
                            icon={item.icon}
                            selected={creatorData.interests.includes(item.id)}
                            onClick={() => handleCreatorToggle('interests', item.id)}
                            error={!!fieldErrors.interests}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Deliverable Formats */}
                  {(viewMode === 'express' || step === 4) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          4. <span className="font-bold">Collaboration Deliverable Preferences</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Configure your preferred output formats for each collaboration type.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormatPillGroup
                          title="Paid Campaigns"
                          selected={creatorData.paidCampaigns}
                          onToggle={id => handleCreatorToggle('paidCampaigns', id)}
                        />
                        <FormatPillGroup
                          title="Non-Paid Event Invitations"
                          selected={creatorData.nonPaidEvents}
                          onToggle={id => handleCreatorToggle('nonPaidEvents', id)}
                          allowedFormats={['reel', 'post', 'stories', 'reel_stories', 'stories_only']}
                        />
                        <FormatPillGroup
                          title="Non-Paid Restaurant Invitations"
                          selected={creatorData.nonPaidRestaurant}
                          onToggle={id => handleCreatorToggle('nonPaidRestaurant', id)}
                          allowedFormats={['reel', 'post', 'stories', 'reel_stories', 'stories_only']}
                        />
                        <FormatPillGroup
                          title="Non-Paid PR Packages"
                          selected={creatorData.nonPaidPR}
                          onToggle={id => handleCreatorToggle('nonPaidPR', id)}
                          allowedFormats={['reel', 'post', 'stories', 'reel_stories']}
                        />
                        <FormatPillGroup
                          title="Non-Paid Community Events"
                          selected={creatorData.nonPaidCommunity}
                          onToggle={id => handleCreatorToggle('nonPaidCommunity', id)}
                          allowedFormats={['reel', 'post', 'stories', 'reel_stories']}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Action Controls Bar ──────────────────────────────────── */}
              <div className="mt-12 pt-6 border-t border-[#919191]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                {viewMode === 'wizard' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep(prev => Math.max(1, prev - 1))}
                      disabled={step === 1}
                      className={`px-6 py-3 border border-[#3E3E3E]/30 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all
                        ${step === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#3E3E3E]/5'}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous Step
                    </button>

                    {step < maxSteps ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-8 py-3.5 bg-[#3E3E3E] text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#2a2a2a] transition-all shadow-md"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 bg-[#3E3E3E] text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#2a2a2a] transition-all shadow-lg shadow-black/10"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Submit Partnership Brief
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="w-full flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-12 py-4 bg-[#3E3E3E] text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#2a2a2a] transition-all shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Inquiry
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
