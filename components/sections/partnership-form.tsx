'use client'

import React, { useState, useCallback } from 'react'
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
  Coins,
  Heart,
  Dumbbell,
  Shirt,
  BookOpen,
  Baby,
} from 'lucide-react'
import { CurveDecoration } from '@/components/ui/architectural-shapes'
import {
  brandPartnershipSchema,
  creatorPartnershipSchema,
  validateForm,
  validateSingleField,
} from '@/lib/contact-schema'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'brand' | 'creator'
type ViewMode = 'wizard' | 'express'

interface BrandForm {
  brandName: string
  contactPerson: string
  industry: string
  website: string
  instagramLink: string
  email: string
  phone: string
  targetAudience: string[]
  projectGoals: string[]
  goalOther: string
  participationType: string[]
  participationOther: string
  eventCategories: string[]
  notes: string
}

interface CreatorForm {
  fullName: string
  instagram: string
  otherSocials: string
  followers: string
  email: string
  phone: string
  categories: string[]
  collabType: string[]
  paidDeliverables: string[]
  paidNotes: string
  freeCollabTypes: string[]
  freeDeliverables: string[]
  notes: string
}

interface SuccessReceipt {
  refId: string
  type: Tab
  name: string
  receivedAt: string
}

// ─── Options with Icons ───────────────────────────────────────────────────────

const BRAND_STEPS = [
  { id: 1, title: 'Company Identity', desc: 'Company details & contact info' },
  { id: 2, title: 'Participation Type', desc: 'How you want to participate' },
  { id: 3, title: 'Target Audience', desc: 'Demographics & target segments' },
  { id: 4, title: 'Project Goals', desc: 'Objectives & campaign goals' },
  { id: 5, title: 'Additional Notes', desc: 'Event preferences & details' },
]

const CREATOR_STEPS = [
  { id: 1, title: 'Creator Profile', desc: 'Contact details & handles' },
  { id: 2, title: 'Content Categories', desc: 'Niche & focus topics' },
  { id: 3, title: 'Collaboration Scope', desc: 'Paid & free preferences' },
  { id: 4, title: 'Additional Details', desc: 'Past work & preferences' },
]

const PARTICIPATION_TYPES = [
  { id: 'Sponsorship', label: 'Sponsorship', desc: 'Financial support & brand visibility', icon: Coins },
  { id: 'Booth', label: 'Booth', desc: 'On-ground presence & activations', icon: Sliders },
  { id: 'Collaboration', label: 'Collaboration', desc: 'Joint campaigns & co-created content', icon: HeartHandshake },
  { id: 'Strategic Partner', label: 'Strategic Partner', desc: 'Long-term alliance & shared goals', icon: Target },
  { id: 'Not sure yet', label: 'Not sure yet — walk us through it', desc: 'Our team will guide you to the best fit', icon: Compass },
]

const EVENT_CATEGORIES = [
  { id: 'Family', label: 'Family', icon: Users },
  { id: 'Kids', label: 'Kids', icon: Baby },
  { id: 'Sports', label: 'Sports', icon: Dumbbell },
  { id: 'Entertainment', label: 'Entertainment', icon: Tv },
  { id: 'Fashion', label: 'Fashion', icon: Shirt },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Wellness', label: 'Wellness', icon: Heart },
  { id: 'Education', label: 'Education', icon: BookOpen },
]

const TARGET_AUDIENCE_OPTIONS = [
  { id: 'Families & Kids', label: 'Families & Kids', desc: 'Families, children & parents', icon: Users },
  { id: 'Youth & Athletes', label: 'Youth & Athletes', desc: 'Young adults, athletes & fitness enthusiasts', icon: Compass },
  { id: 'Students & Educational', label: 'Students & Educational', desc: 'School & university students', icon: GraduationCap },
  { id: 'Corporate & B2B', label: 'Corporate & B2B', desc: 'Business executives & corporate clients', icon: Briefcase },
  { id: 'General Audience', label: 'General Audience', desc: 'All segments & general public audience', icon: Star },
]

const PROJECT_GOALS = [
  { id: 'Brand Awareness', label: 'Brand Awareness', icon: Target },
  { id: 'Product Launch', label: 'Product Launch', icon: Rocket },
  { id: 'Community Engagement', label: 'Community Engagement', icon: Users },
  { id: 'Customer Acquisition', label: 'Customer Acquisition', icon: Star },
  { id: 'Sales Promotion', label: 'Sales Promotion', icon: DollarSign },
  { id: 'CSR Initiative', label: 'CSR Initiative', icon: HeartHandshake },
]

// ─── Creator Config ──────────────────────────────────────────────────────────

const CREATOR_CATEGORIES = [
  { id: 'Food & Restaurants', label: 'Food & Restaurants', desc: 'Dining, cafes & culinary reviews', icon: Utensils },
  { id: 'Fashion & Style', label: 'Fashion & Style', desc: 'Apparel, outfits & styling', icon: Crown },
  { id: 'Beauty & Skincare', label: 'Beauty & Skincare', desc: 'Cosmetics, skincare & hair', icon: Sparkles },
  { id: 'Fitness & Wellness', label: 'Fitness & Wellness', desc: 'Gyms, health & nutrition', icon: Compass },
  { id: 'Family & Parenting', label: 'Family & Parenting', desc: 'Kids, parenting & home life', icon: Users },
  { id: 'Travel', label: 'Travel', desc: 'Destinations, hotels & adventure', icon: Compass },
  { id: 'Lifestyle & Vlogging', label: 'Lifestyle & Vlogging', desc: 'Daily routines & personal vlogs', icon: Star },
  { id: 'Tech & Gaming', label: 'Tech & Gaming', desc: 'Gadgets, gaming & tech reviews', icon: Tv },
  { id: 'Home & Interior', label: 'Home & Interior', desc: 'Decor, design & living spaces', icon: Sliders },
  { id: 'Finance & Business', label: 'Finance & Business', desc: 'Investing, career & business', icon: Briefcase },
  { id: 'Comedy & Entertainment', label: 'Comedy & Entertainment', desc: 'Humor, skits & pop culture', icon: Megaphone },
]

const CREATOR_COLLAB_TYPES = [
  { id: 'Paid Ad', label: 'Paid Ad — Sponsored Content', desc: 'Commercial deliverables with set fee/compensation', icon: DollarSign },
  { id: 'Free Collab', label: 'Free Collab — Invitations & Gifting', desc: 'VIP invitations, gifting, product & service testing', icon: Gift },
]

const PAID_DELIVERABLES = [
  { id: 'Instagram Story', label: 'Instagram Story' },
  { id: 'Instagram Reel', label: 'Instagram Reel' },
  { id: 'Instagram Post', label: 'Instagram Post' },
  { id: 'TikTok Video', label: 'TikTok Video' },
  { id: 'Snapchat Story', label: 'Snapchat Story' },
  { id: 'YouTube Mention/Video', label: 'YouTube Mention / Video' },
  { id: 'UGC Content (unposted)', label: 'UGC Content (unposted)', desc: 'Raw or edited content without posting' },
  { id: 'Event Appearance', label: 'Event Appearance', desc: 'On-ground presence & coverage' },
]

const FREE_COLLAB_TYPES = [
  { id: 'Restaurant/Café Testing', label: 'Restaurant / Café Testing', desc: 'Tastings & venue launches', icon: Utensils },
  { id: 'Event Invitation', label: 'Event Invitation', desc: 'VIP events & launches', icon: Ticket },
  { id: 'Product Gifting', label: 'Product Gifting', desc: 'PR packages & unboxing', icon: Package },
  { id: 'Store/Location Visit', label: 'Store or Location Visit', desc: 'In-store visits & tours', icon: Compass },
  { id: 'Service Trial', label: 'Service Trial', desc: 'Spa, gym, courses & trials', icon: Star },
]

const FREE_DELIVERABLES = [
  { id: 'Instagram Story', label: 'Instagram Story' },
  { id: 'Instagram Reel', label: 'Instagram Reel' },
  { id: 'Instagram Post', label: 'Instagram Post' },
  { id: 'Story Mention Only', label: 'Story Mention Only' },
  { id: 'Google/Platform Review', label: 'Google / Platform Review' },
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
      className={`group relative flex flex-col justify-between p-5 md:p-6 border text-left transition-all duration-200 rounded-sm cursor-pointer select-none min-h-[130px]
        ${selected
          ? 'border-[#3E3E3E] bg-white text-[#3E3E3E] shadow-md shadow-black/5 ring-1 ring-[#3E3E3E]'
          : error
          ? 'border-red-400 bg-red-50/20 text-[#3E3E3E]'
          : 'border-[#919191]/25 bg-white text-[#3E3E3E] hover:border-[#3E3E3E]/60 hover:shadow-sm'
        }`}
    >
      <div className="flex items-start justify-between gap-3 w-full mb-6">
        {Icon ? (
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center transition-colors ${
            selected ? 'bg-[#3E3E3E] text-white' : 'bg-[#F4F4F4] group-hover:bg-[#EAEAEA] text-[#3E3E3E]'
          }`}>
            <Icon className="w-4 h-4 stroke-[2]" />
          </div>
        ) : <div />}
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
          selected ? 'border-[#3E3E3E] bg-[#3E3E3E] text-white' : 'border-[#D1D1D1] group-hover:border-[#3E3E3E]'
        }`}>
          {selected && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold tracking-tight text-[#3E3E3E] leading-snug">{label}</h4>
        {desc && (
          <p className="text-xs font-light text-[#6A6A6A] leading-relaxed mt-1">
            {desc}
          </p>
        )}
      </div>
    </button>
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
    instagramLink: '',
    email: '',
    phone: '',
    targetAudience: [],
    projectGoals: [],
    goalOther: '',
    participationType: [],
    participationOther: '',
    eventCategories: [],
    notes: '',
  })

  const [creatorData, setCreatorData] = useState<CreatorForm>({
    fullName: '',
    instagram: '',
    otherSocials: '',
    followers: '',
    email: '',
    phone: '',
    categories: [],
    collabType: [],
    paidDeliverables: [],
    paidNotes: '',
    freeCollabTypes: [],
    freeDeliverables: [],
    notes: '',
  })

  // Touch and Error tracking
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'validating' | 'sending' | 'error'>('idle')
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
          newErrors.brandName = 'Company Name is required (min 2 characters)'
        }
        if (!brandData.industry || brandData.industry.trim().length < 1) {
          newErrors.industry = 'Industry / Activity is required'
        }
        if (!brandData.contactPerson || brandData.contactPerson.trim().length < 2) {
          newErrors.contactPerson = 'Contact Person is required (min 2 characters)'
        }
        if (!brandData.email || !brandData.email.includes('@')) {
          newErrors.email = 'Valid email address is required'
        }
        if (!brandData.phone || brandData.phone.trim().length < 6) {
          newErrors.phone = 'Valid phone number is required (e.g. +965 9999 8888)'
        }
      }

      if (step === 2 || viewMode === 'express') {
        if (brandData.participationType.length === 0) {
          newErrors.participationType = 'Please select at least one participation type'
        }
      }

      if (step === 3 || viewMode === 'express') {
        if (brandData.targetAudience.length === 0) {
          newErrors.targetAudience = 'Please select at least one target audience category'
        }
      }

      if (step === 4 || viewMode === 'express') {
        if (brandData.projectGoals.length === 0) {
          newErrors.projectGoals = 'Please select at least one project goal'
        }
      }
    } else {
      if (step === 1 || viewMode === 'express') {
        if (!creatorData.fullName || creatorData.fullName.trim().length < 2) {
          newErrors.fullName = 'Full Name is required (min 2 characters)'
        }
        if (!creatorData.instagram || creatorData.instagram.trim().length < 2) {
          newErrors.instagram = 'Instagram handle is required (e.g. @username)'
        }
        if (!creatorData.email || !creatorData.email.includes('@')) {
          newErrors.email = 'Valid email address is required'
        }
        if (!creatorData.phone || creatorData.phone.trim().length < 6) {
          newErrors.phone = 'Valid phone number is required (e.g. +965 9999 8888)'
        }
      }

      if (step === 2 || viewMode === 'express') {
        if (creatorData.categories.length === 0) {
          newErrors.categories = 'Please select at least one content category'
        }
      }

      if (step === 3 || viewMode === 'express') {
        if (creatorData.collabType.length === 0) {
          newErrors.collabType = 'Please select at least one collaboration type'
        }
      }
    }

    setFieldErrors(prev => ({ ...prev, ...newErrors }))
    return Object.keys(newErrors).length === 0
  }, [activeTab, step, viewMode, brandData, creatorData])

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      // Clear errors from the current step before advancing so they don't bleed visually
      const stepErrorKeys: Record<string, Record<number, string[]>> = {
        brand: {
          1: ['brandName', 'industry', 'contactPerson', 'email', 'phone', 'website', 'instagramLink'],
          2: ['participationType'],
          3: ['targetAudience'],
          4: ['projectGoals', 'goalOther'],
        },
        creator: {
          1: ['fullName', 'instagram', 'otherSocials', 'followers', 'email', 'phone'],
          2: ['categories'],
          3: ['collabType', 'paidDeliverables', 'paidNotes', 'freeCollabTypes', 'freeDeliverables'],
        },
      }
      const keysToRemove: string[] = stepErrorKeys[activeTab]?.[step] ?? []
      setFieldErrors(prev => {
        const next = { ...prev }
        keysToRemove.forEach((k: string) => delete next[k])
        return next
      })
      setStep(prev => Math.min(maxSteps, prev + 1))
    }
  }


  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    setSubmitStatus('validating')
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
          if (errKeys.some(k => ['brandName', 'contactPerson', 'industry', 'website', 'email', 'phone'].includes(k))) setStep(1)
          else if (errKeys.includes('participationType')) setStep(2)
          else if (errKeys.includes('targetAudience')) setStep(3)
          else if (errKeys.some(k => ['projectGoals', 'goalOther'].includes(k))) setStep(4)
          else if (errKeys.includes('notes')) setStep(5)
        } else {
          if (errKeys.some(k => ['fullName', 'instagram', 'otherSocials', 'followers', 'email', 'phone'].includes(k))) setStep(1)
          else if (errKeys.includes('categories')) setStep(2)
          else if (errKeys.some(k => ['collabType', 'paidDeliverables', 'paidNotes', 'freeCollabTypes', 'freeDeliverables'].includes(k))) setStep(3)
          else if (errKeys.includes('notes')) setStep(4)
        }
      }
      return
    }

    try {
      setSubmitStatus('sending')
      const res = await fetch('/api/partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, data: validation.data }),
      })

      const responseData = await res.json()

      if (res.ok && responseData.success) {
        setSubmitStatus('idle')
        setReceipt({
          refId: responseData.refId,
          type: activeTab,
          name: activeTab === 'brand' ? brandData.brandName : creatorData.fullName,
          receivedAt: responseData.receivedAt,
        })
      } else if (responseData.errors) {
        setSubmitStatus('error')
        setFieldErrors(responseData.errors)
      } else {
        setSubmitStatus('error')
        setFieldErrors({ general: responseData.message || 'Submission failed. Please try again.' })
      }
    } catch {
      setSubmitStatus('error')
      setFieldErrors({ general: 'Network connection failed. Please check your connection and try again.' })
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
      instagramLink: '',
      email: '',
      phone: '',
      targetAudience: [],
      projectGoals: [],
      goalOther: '',
      participationType: [],
      participationOther: '',
      eventCategories: [],
      notes: '',
    })
    setCreatorData({
      fullName: '',
      instagram: '',
      otherSocials: '',
      followers: '',
      email: '',
      phone: '',
      categories: [],
      collabType: [],
      paidDeliverables: [],
      paidNotes: '',
      freeCollabTypes: [],
      freeDeliverables: [],
      notes: '',
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
              Brand & Partner
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
                Your partnership submission has been logged. Our team will review your details and reach out soon to discuss potential collaboration opportunities.
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
                <div className={`grid gap-2 mt-4 ${maxSteps === 6 ? 'grid-cols-2 sm:grid-cols-6' : maxSteps === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
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
              <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 text-sm flex items-start gap-3 rounded-sm animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs uppercase tracking-wider text-red-600 mb-0.5">Submission Failed</p>
                  <p className="text-xs font-medium text-red-700 leading-relaxed">{fieldErrors.general}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFieldErrors(prev => ({ ...prev, general: '' }))}
                  className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 text-lg leading-none"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* ─────────────────────────────────────────────────────────────
                  BRAND & SPONSOR FORM CONTENT
                 ───────────────────────────────────────────────────────────── */}
              {activeTab === 'brand' && (
                <div className="space-y-10">
                  {/* Step 1: Company Identity */}
                  {(viewMode === 'express' || step === 1) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          1. <span className="font-bold">Company Information</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Tell us about your organization and main contact person.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Company Name <span className="text-red-400">*</span>
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
                            Industry / Activity <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="industry"
                            value={brandData.industry}
                            onChange={handleTextChange}
                            placeholder="e.g. Sportswear, Healthy Food, Banking..."
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.industry ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.industry && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.industry}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Website
                          </label>
                          <input
                            type="text"
                            name="website"
                            value={brandData.website}
                            onChange={handleTextChange}
                            placeholder="e.g. www.yourbrand.com"
                            className="w-full py-3 px-0 bg-transparent border-b border-[#919191]/40 text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] text-base transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Instagram Link
                          </label>
                          <input
                            type="text"
                            name="instagramLink"
                            value={brandData.instagramLink}
                            onChange={handleTextChange}
                            placeholder="instagram.com/yourbrand"
                            className="w-full py-3 px-0 bg-transparent border-b border-[#919191]/40 text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] text-base transition-colors"
                          />
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
                            placeholder="Full Name & Position"
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
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={brandData.email}
                            onChange={handleTextChange}
                            placeholder="partner@company.com"
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
                            Contact Phone <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={brandData.phone}
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
                      </div>
                    </div>
                  )}

                  {/* Step 2: Participation Format */}
                  {(viewMode === 'express' || step === 2) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          2. <span className="font-bold">Participation Type</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          How would you like to participate with us? Select all that apply.
                        </p>
                      </div>

                      {fieldErrors.participationType && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.participationType}
                        </p>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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

                      {/* Preferred Event Categories */}
                      <div className="pt-6 border-t border-[#3E3E3E]/10 space-y-4">
                        <div>
                          <h4 className="text-base font-semibold tracking-tight text-[#3E3E3E]">
                            Preferred Event Categories <span className="text-xs font-light text-[#919191] ml-1">(Optional)</span>
                          </h4>
                          <p className="text-xs text-[#6A6A6A] font-light mt-1">
                            Which event types are most relevant to your brand? Select all that apply.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {EVENT_CATEGORIES.map(item => (
                            <RichOptionCard
                              key={item.id}
                              label={item.label}
                              icon={item.icon}
                              selected={brandData.eventCategories.includes(item.id)}
                              onClick={() => handleBrandToggle('eventCategories', item.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}


                  {/* Step 3: Target Audience */}
                  {(viewMode === 'express' || step === 3) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          3. <span className="font-bold">Target Audience</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Who is your target audience? Select all segments that apply.
                        </p>
                      </div>

                      {fieldErrors.targetAudience && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.targetAudience}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {TARGET_AUDIENCE_OPTIONS.map(item => (
                          <RichOptionCard
                            key={item.id}
                            label={item.label}
                            desc={item.desc}
                            icon={item.icon}
                            selected={brandData.targetAudience.includes(item.id)}
                            onClick={() => handleBrandToggle('targetAudience', item.id)}
                            error={!!fieldErrors.targetAudience}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Project Goals */}
                  {(viewMode === 'express' || step === 4) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          4. <span className="font-bold">Project Goals</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          What are your primary goals for participating? Select all that apply.
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

                      <div className="mt-4">
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                          Anything else you want to add regarding goals? <span className="text-[#919191] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="goalOther"
                          value={brandData.goalOther}
                          onChange={handleTextChange}
                          placeholder="e.g. Specific KPI targets, product launch timeframe..."
                          className="w-full py-2.5 px-0 bg-transparent border-b border-[#919191]/40 text-sm text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Additional Notes */}
                  {(viewMode === 'express' || step === 5) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          5. <span className="font-bold">Additional Notes</span> <span className="text-[#919191] font-normal text-sm">(Optional)</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Do you have a specific event in mind or preferred timeframe? Let us know.
                        </p>
                      </div>

                      <div>
                        <textarea
                          name="notes"
                          value={brandData.notes}
                          onChange={handleTextChange}
                          rows={4}
                          placeholder="Write any details you'd like us to know before reaching out..."
                          className="w-full p-4 bg-transparent border border-[#919191]/40 text-sm text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] rounded-sm transition-colors"
                        />
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
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={creatorData.fullName}
                            onChange={handleTextChange}
                            placeholder="e.g. Sarah Al-Sabah"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.fullName ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.fullName && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Instagram Handle <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="instagram"
                            value={creatorData.instagram}
                            onChange={handleTextChange}
                            placeholder="@username"
                            className={`w-full py-3 px-0 bg-transparent border-b text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none text-base transition-colors
                              ${fieldErrors.instagram ? 'border-red-500' : 'border-[#919191]/40 focus:border-[#3E3E3E]'}`}
                          />
                          {fieldErrors.instagram && (
                            <p className="text-xs text-red-500 flex items-center gap-1 font-medium mt-1">
                              <AlertCircle className="w-3 h-3" />
                              {fieldErrors.instagram}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            TikTok / YouTube / Snapchat <span className="text-[#919191] font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            name="otherSocials"
                            value={creatorData.otherSocials}
                            onChange={handleTextChange}
                            placeholder="e.g. TikTok @handle, YouTube Channel"
                            className="w-full py-3 px-0 bg-transparent border-b border-[#919191]/40 text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] text-base transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                            Approximate Followers <span className="text-[#919191] font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            name="followers"
                            value={creatorData.followers}
                            onChange={handleTextChange}
                            placeholder="e.g. 45,000"
                            className="w-full py-3 px-0 bg-transparent border-b border-[#919191]/40 text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] text-base transition-colors"
                          />
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
                      </div>
                    </div>
                  )}

                  {/* Step 2: Categories */}
                  {(viewMode === 'express' || step === 2) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          2. <span className="font-bold">Content Categories</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Which topics do you focus on the most? Select all that apply.
                        </p>
                      </div>

                      {fieldErrors.categories && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.categories}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {CREATOR_CATEGORIES.map(item => (
                          <RichOptionCard
                            key={item.id}
                            label={item.label}
                            desc={item.desc}
                            icon={item.icon}
                            selected={creatorData.categories.includes(item.id)}
                            onClick={() => handleCreatorToggle('categories', item.id)}
                            error={!!fieldErrors.categories}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Collaboration Scope & Branch Panels */}
                  {(viewMode === 'express' || step === 3) && (
                    <div className="space-y-8">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          3. <span className="font-bold">Collaboration Type & Deliverables</span> <span className="text-red-400">*</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Select the types of collaborations you are open to.
                        </p>
                      </div>

                      {fieldErrors.collabType && (
                        <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.collabType}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {CREATOR_COLLAB_TYPES.map(item => (
                          <RichOptionCard
                            key={item.id}
                            label={item.label}
                            desc={item.desc}
                            icon={item.icon}
                            selected={creatorData.collabType.includes(item.id)}
                            onClick={() => handleCreatorToggle('collabType', item.id)}
                            error={!!fieldErrors.collabType}
                          />
                        ))}
                      </div>

                      {/* PAID AD BRANCH */}
                      {creatorData.collabType.includes('Paid Ad') && (
                        <div className="p-6 border border-[#9E8651]/30 bg-[#9E8651]/[0.03] rounded-sm space-y-6 animate-fade-in">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9E8651]/15 text-[#6E5930] text-[11px] font-mono font-semibold uppercase tracking-wider rounded-full border border-[#9E8651]/30">
                            <DollarSign className="w-3.5 h-3.5" />
                            Paid Ad Options & Deliverables
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/80 mb-3">
                              Select Deliverables You Provide:
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {PAID_DELIVERABLES.map(item => {
                                const isSel = creatorData.paidDeliverables.includes(item.id)
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleCreatorToggle('paidDeliverables', item.id)}
                                    className={`p-3 text-left border rounded-sm transition-all text-xs font-medium ${
                                      isSel
                                        ? 'border-[#3E3E3E] bg-[#3E3E3E] text-white shadow-sm'
                                        : 'border-[#919191]/30 bg-white text-[#3E3E3E] hover:border-[#3E3E3E]'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{item.label}</span>
                                      {isSel && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                    {item.desc && (
                                      <span className={`block text-[10px] mt-1 font-light ${isSel ? 'text-white/80' : 'text-[#6A6A6A]'}`}>
                                        {item.desc}
                                      </span>
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/80 mb-2">
                              Package Notes or Rates Info <span className="text-[#919191] font-normal">(Optional — rates discussed upon opportunity)</span>
                            </label>
                            <textarea
                              name="paidNotes"
                              value={creatorData.paidNotes}
                              onChange={handleTextChange}
                              rows={3}
                              placeholder="e.g. Package bundles like 1 Reel + 3 Stories, usage rights policies..."
                              className="w-full p-3 bg-white border border-[#919191]/30 text-xs text-[#3E3E3E] placeholder-[#919191]/60 focus:outline-none focus:border-[#3E3E3E] rounded-sm transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* FREE COLLAB BRANCH */}
                      {creatorData.collabType.includes('Free Collab') && (
                        <div className="p-6 border border-[#4A6B5A]/30 bg-[#4A6B5A]/[0.03] rounded-sm space-y-6 animate-fade-in">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A6B5A]/15 text-[#325242] text-[11px] font-mono font-semibold uppercase tracking-wider rounded-full border border-[#4A6B5A]/30">
                            <Gift className="w-3.5 h-3.5" />
                            Free Collab Preferences
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/80 mb-3">
                              What Types of Free Collabs Interest You?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {FREE_COLLAB_TYPES.map(item => (
                                <RichOptionCard
                                  key={item.id}
                                  label={item.label}
                                  desc={item.desc}
                                  icon={item.icon}
                                  selected={creatorData.freeCollabTypes.includes(item.id)}
                                  onClick={() => handleCreatorToggle('freeCollabTypes', item.id)}
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/80 mb-3">
                              Deliverables You Offer in Exchange for Free Collabs:
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                              {FREE_DELIVERABLES.map(item => {
                                const isSel = creatorData.freeDeliverables.includes(item.id)
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleCreatorToggle('freeDeliverables', item.id)}
                                    className={`p-3 text-left border rounded-sm transition-all text-xs font-medium ${
                                      isSel
                                        ? 'border-[#3E3E3E] bg-[#3E3E3E] text-white shadow-sm'
                                        : 'border-[#919191]/30 bg-white text-[#3E3E3E] hover:border-[#3E3E3E]'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{item.label}</span>
                                      {isSel && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Additional Notes — Enhanced */}
                  {(viewMode === 'express' || step === 4) && (
                    <div className="space-y-6">
                      <div className="border-b border-[#3E3E3E]/10 pb-3">
                        <h3 className="text-xl font-light tracking-tight text-[#3E3E3E]">
                          4. <span className="font-bold">Additional Information</span>
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#919191]/10 text-[#919191] rounded-full">Optional</span>
                        </h3>
                        <p className="text-xs text-[#6A6A6A] font-light mt-1">
                          Help us prepare — share any past work, preferences, or scheduling details before we reach out.
                        </p>
                      </div>

                      {/* Quick Prompt Chips */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#919191] mb-3">Quick prompts — click to add:</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'I have worked with brands like…',
                            'Best time to reach me is…',
                            'I prefer Kuwait-based collaborations',
                            'I am available for events',
                            'I produce content in Arabic & English',
                          ].map(prompt => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => {
                                const current = creatorData.notes ?? ''
                                const separator = current.trim() ? '\n' : ''
                                setCreatorData(prev => ({ ...prev, notes: current + separator + prompt + ' ' }))
                              }}
                              className="px-3 py-1.5 text-[11px] font-medium border border-[#919191]/30 text-[#6A6A6A] hover:border-[#3E3E3E] hover:text-[#3E3E3E] hover:bg-[#3E3E3E]/[0.03] rounded-sm transition-all"
                            >
                              + {prompt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Textarea with character counter */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#3E3E3E]/70 mb-2">
                          Notes, Past Brand Collaborations, or Specific Preferences
                        </label>
                        <div className="relative">
                          <textarea
                            name="notes"
                            value={creatorData.notes}
                            onChange={handleTextChange}
                            rows={5}
                            maxLength={1000}
                            placeholder="e.g. Brands you've previously collaborated with, location preferences, scheduling details, content style..."
                            className="w-full p-4 bg-[#FAFAF8] border border-[#919191]/40 text-sm text-[#3E3E3E] placeholder-[#919191]/50 focus:outline-none focus:border-[#3E3E3E] focus:bg-white rounded-sm transition-all resize-none leading-relaxed"
                          />
                          <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <span className={`text-[10px] font-mono tabular-nums ${
                              (creatorData.notes?.length ?? 0) > 900 ? 'text-red-400' :
                              (creatorData.notes?.length ?? 0) > 700 ? 'text-amber-400' :
                              'text-[#919191]/60'
                            }`}>
                              {creatorData.notes?.length ?? 0}/1000
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#919191] mt-2 font-light">
                          This is optional — feel free to skip and submit directly. We will follow up with questions.
                        </p>
                      </div>

                      {/* Pre-submit summary strip */}
                      {viewMode === 'wizard' && (
                        <div className="border border-[#3E3E3E]/10 bg-[#F3F0EB]/50 p-4 rounded-sm">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#919191] mb-3">Your Submission Summary</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                            {creatorData.fullName && (
                              <div className="flex gap-2">
                                <span className="text-[#919191] font-medium min-w-[80px]">Name:</span>
                                <span className="text-[#3E3E3E] font-semibold truncate">{creatorData.fullName}</span>
                              </div>
                            )}
                            {creatorData.instagram && (
                              <div className="flex gap-2">
                                <span className="text-[#919191] font-medium min-w-[80px]">Instagram:</span>
                                <span className="text-[#3E3E3E] font-semibold truncate">{creatorData.instagram}</span>
                              </div>
                            )}
                            {creatorData.email && (
                              <div className="flex gap-2">
                                <span className="text-[#919191] font-medium min-w-[80px]">Email:</span>
                                <span className="text-[#3E3E3E] truncate">{creatorData.email}</span>
                              </div>
                            )}
                            {creatorData.categories.length > 0 && (
                              <div className="flex gap-2">
                                <span className="text-[#919191] font-medium min-w-[80px]">Categories:</span>
                                <span className="text-[#3E3E3E]">{creatorData.categories.length} selected</span>
                              </div>
                            )}
                            {creatorData.collabType.length > 0 && (
                              <div className="flex gap-2">
                                <span className="text-[#919191] font-medium min-w-[80px]">Collab:</span>
                                <span className="text-[#3E3E3E]">{creatorData.collabType.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
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
                        className={`px-10 py-4 text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-lg shadow-black/10 ${
                          submitStatus === 'error'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-[#3E3E3E] hover:bg-[#2a2a2a]'
                        } disabled:opacity-70 disabled:cursor-not-allowed`}
                      >
                        {submitStatus === 'validating' ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Validating…</>
                        ) : submitStatus === 'sending' ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                        ) : submitStatus === 'error' ? (
                          <><AlertCircle className="w-4 h-4" /> Try Again</>
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
                      className={`w-full sm:w-auto px-12 py-4 text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg ${
                        submitStatus === 'error'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-[#3E3E3E] hover:bg-[#2a2a2a]'
                      } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {submitStatus === 'validating' ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Validating…</>
                      ) : submitStatus === 'sending' ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                      ) : submitStatus === 'error' ? (
                        <><AlertCircle className="w-4 h-4" /> Try Again</>
                      ) : (
                        <>
                          Submit Profile Application
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
