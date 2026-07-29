import {
  Layers,
  Share2,
  Monitor,
  PenTool,
  Printer,
  Package,
  TrendingUp,
  Megaphone,
  Camera,
  Mic,
  Users,
  Wand2,
  Bot,
  Target,
  Briefcase,
} from 'lucide-react'
import React from 'react'

export type ServiceCategory =
  | 'Identity'
  | 'Marketing'
  | 'Digital'
  | 'Creative'
  | 'Production'
  | 'Technology'

export interface ServiceItem {
  title: string
  shortDescription: string
  description: string
  keywords: string[]
  icon: React.ReactNode
  slug: string
  image: string
  category: ServiceCategory
  whatWeDo: string[]
  outcomes: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITY
// ─────────────────────────────────────────────────────────────────────────────
const identityServices: ServiceItem[] = [
  {
    title: 'Branding',
    shortDescription:
      'Full branding — strategy, visual identity, and persona — built to last.',
    description:
      'At FIFTH FLOOR, branding is the architecture of perception. We craft complete brand systems — from naming and personality to visual identity and strategic positioning — that communicate authority and authenticity at every touchpoint across the GCC and beyond.',
    keywords: ['Visual Identity', 'Strategy', 'Persona', 'Guidelines', 'Naming'],
    icon: <Layers className="w-5 h-5" />,
    slug: 'branding',
    image: '/images/services/branding.png',
    category: 'Identity',
    whatWeDo: [
      'Full brand strategy and market positioning',
      'Visual identity design — logo, palette, typography',
      'Brand persona and tone-of-voice development',
      'Comprehensive brand guidelines (print & digital)',
      'Naming architecture and messaging frameworks',
      'Cultural brand integration for GCC markets',
    ],
    outcomes: [
      'Distinctive and ownable market position',
      'Consistent brand experience across all channels',
      'Increased brand recognition and recall',
      'Stakeholder alignment around a unified identity',
      'Long-term brand equity and cultural authority',
    ],
  },
  {
    title: 'Brand Strategy',
    shortDescription:
      'Data-driven strategy that positions your brand for sustainable leadership.',
    description:
      'Strategy is the invisible force behind every iconic brand. We decode your market, define your competitive edge, and construct a strategic roadmap that turns ambition into a measurable, differentiated position — built to lead, not follow.',
    keywords: ['Positioning', 'Research', 'Competitive Analysis', 'Roadmap', 'Differentiation'],
    icon: <Target className="w-5 h-5" />,
    slug: 'brand-strategy',
    image: '/images/services/brand-strategy.png',
    category: 'Identity',
    whatWeDo: [
      'Market research and competitive landscape analysis',
      'Brand positioning and value proposition design',
      'Audience segmentation and persona mapping',
      'Brand architecture for multi-product organizations',
      'Long-term brand roadmap development',
      'Rebranding strategy and migration planning',
    ],
    outcomes: [
      'Clear, defensible market differentiation',
      'Strategic clarity for leadership and teams',
      'Increased brand value and investor confidence',
      'Stronger customer loyalty and advocacy',
      'Scalable brand architecture for growth',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MARKETING
// ─────────────────────────────────────────────────────────────────────────────
const marketingServices: ServiceItem[] = [
  {
    title: 'Social Media Management',
    shortDescription:
      'Strategic social presence that builds community and converts audiences into advocates.',
    description:
      'Social media is where brands either earn attention or lose it. FIFTH FLOOR manages your social ecosystem with editorial precision — crafting content strategies, producing assets, and running community management that transforms followers into a loyal, engaged tribe for your brand.',
    keywords: ['Content Strategy', 'Community', 'Reels', 'Analytics', 'Growth'],
    icon: <Share2 className="w-5 h-5" />,
    slug: 'social-media-management',
    image: '/images/services/marketing.png',
    category: 'Marketing',
    whatWeDo: [
      'Social media strategy and content calendar',
      'Creative content production (static, video, reels)',
      'Community management and audience engagement',
      'Influencer identification and partnership management',
      'Performance analytics and monthly reporting',
      'Paid social media strategy and ad management',
    ],
    outcomes: [
      'Consistent, on-brand social presence',
      'Measurable audience growth and engagement rates',
      'Stronger brand community and loyalty',
      'Increased organic reach and brand awareness',
      'Data-driven content optimization',
    ],
  },
  {
    title: 'Digital Marketing',
    shortDescription:
      'End-to-end digital marketing that drives qualified traffic and measurable ROI.',
    description:
      'Digital marketing without strategy is noise. FIFTH FLOOR builds integrated digital marketing systems — from SEO and paid media to email marketing and analytics — engineered to reach the right audience at the right moment and convert intent into action.',
    keywords: ['SEO', 'PPC', 'Email Marketing', 'Analytics', 'Conversion'],
    icon: <TrendingUp className="w-5 h-5" />,
    slug: 'digital-marketing',
    image: '/images/services/web-development.png',
    category: 'Marketing',
    whatWeDo: [
      'Search Engine Optimization (technical & on-page)',
      'Google Ads and Meta Ads campaign management',
      'Email marketing strategy and automation',
      'Conversion rate optimization (CRO)',
      'Analytics setup (GA4, Meta Pixel, TikTok Pixel)',
      'Monthly performance reporting and strategy reviews',
    ],
    outcomes: [
      'Higher organic search rankings',
      'Increased qualified traffic and leads',
      'Reduced cost-per-acquisition',
      'Accurate attribution and data-driven decisions',
      'Scalable growth through owned and paid channels',
    ],
  },
  {
    title: 'Marketing Campaigns',
    shortDescription:
      'Integrated campaign concepts that cut through noise and move markets.',
    description:
      'Great campaigns don\'t just communicate — they shift culture. FIFTH FLOOR conceives, produces, and deploys full-spectrum marketing campaigns that blend creative excellence with strategic precision, delivering messages that resonate, inspire action, and build lasting brand equity.',
    keywords: ['Campaign Concept', 'Creative Direction', 'Multi-Channel', 'Activation', 'Media'],
    icon: <Megaphone className="w-5 h-5" />,
    slug: 'marketing-campaigns',
    image: '/images/services/events.png',
    category: 'Marketing',
    whatWeDo: [
      'Campaign strategy, concept, and creative brief',
      'Creative direction and art direction',
      'Multi-channel content production (OOH, digital, social)',
      'Launch activation and phased rollout planning',
      'Media planning and buying support',
      'Campaign performance tracking and optimization',
    ],
    outcomes: [
      'Strong campaign differentiation and memorability',
      'Measurable awareness lift and reach',
      'Coordinated brand voice across all channels',
      'Increased conversions and campaign ROI',
      'Shareable creative that amplifies organic reach',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// DIGITAL
// ─────────────────────────────────────────────────────────────────────────────
const digitalServices: ServiceItem[] = [
  {
    title: 'UI + UX Mobile & Web',
    shortDescription:
      'Bespoke interfaces — designed with precision, built for humans.',
    description:
      'Great design is invisible when it works and unforgettable when it doesn\'t. FIFTH FLOOR designs non-template, brand-aligned digital interfaces for mobile and web — engineered for usability, accessibility, and the kind of visual refinement that elevates perception at every interaction.',
    keywords: ['Interface Design', 'User Research', 'Responsive', 'Prototyping', 'Accessibility'],
    icon: <Monitor className="w-5 h-5" />,
    slug: 'ui-ux-design',
    image: '/images/services/ui-ux-design.png',
    category: 'Digital',
    whatWeDo: [
      'User research, journey mapping, and wireframing',
      'Custom UI design — mobile apps and web platforms',
      'Design system and component library creation',
      'Interactive prototyping and usability testing',
      'Responsive layout design across all breakpoints',
      'WCAG accessibility compliance',
    ],
    outcomes: [
      'Intuitive interfaces that reflect premium brand value',
      'Higher user engagement and reduced bounce rates',
      'Faster development through structured design systems',
      'Consistent cross-platform experience',
      'Measurable improvements in task completion rates',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CREATIVE
// ─────────────────────────────────────────────────────────────────────────────
const creativeServices: ServiceItem[] = [
  {
    title: 'Offline Designs',
    shortDescription:
      'Print and physical design with the same craft we bring to every digital pixel.',
    description:
      'The physical world demands equal creative excellence. FIFTH FLOOR designs for the tangible — from annual reports and packaging to signage, collateral, and branded environments — ensuring your brand commands attention whether it lives on a screen or a surface.',
    keywords: ['Print Design', 'Packaging', 'Collateral', 'Signage', 'Art Direction'],
    icon: <PenTool className="w-5 h-5" />,
    slug: 'offline-designs',
    image: '/images/services/creative.png',
    category: 'Creative',
    whatWeDo: [
      'Corporate collateral design (reports, brochures, decks)',
      'Packaging design and structural ideation',
      'Environmental and wayfinding signage systems',
      'Menu design, stationery, and branded merchandise',
      'Exhibition and event print material design',
      'Print-ready file preparation and vendor liaison',
    ],
    outcomes: [
      'Elevated physical brand presence',
      'Print materials that reflect digital brand standards',
      'Reduction in production errors through precise file prep',
      'Cohesive brand expression across all physical touchpoints',
      'Premium perceived value at every customer interaction',
    ],
  },
  {
    title: 'All Printing Services',
    shortDescription:
      'Premium printing and production — from concept to finished product.',
    description:
      'Print is a statement. FIFTH FLOOR provides end-to-end printing services — from large-format outdoor executions to premium offset and digital print — with uncompromising quality control, material expertise, and delivery precision that meets the standards of the most demanding brands.',
    keywords: ['Large Format', 'Offset Print', 'Digital Print', 'Finishing', 'Quality Control'],
    icon: <Printer className="w-5 h-5" />,
    slug: 'printing-services',
    image: '/images/services/booths.png',
    category: 'Creative',
    whatWeDo: [
      'Large-format outdoor printing (banners, billboards, backdrops)',
      'Offset and digital printing for corporate collateral',
      'Premium finishing (embossing, foiling, die-cutting)',
      'Branded merchandise and promotional item printing',
      'Exhibition materials and event signage production',
      'Quality inspection and on-time delivery management',
    ],
    outcomes: [
      'Print quality that matches the ambition of the brand',
      'Consistent color accuracy across all printed assets',
      'Reduced production timelines through streamlined workflow',
      'Premium finishing that commands physical authority',
      'Single-vendor convenience from design to delivery',
    ],
  },
  {
    title: 'Offline Productions',
    shortDescription:
      'Physical brand activations, events, and environmental experiences — designed to be unforgettable.',
    description:
      'Offline is where brands become real. FIFTH FLOOR produces immersive physical experiences — from branded booths and exhibition stands to grand-scale event productions — that translate brand identity into spatial reality and create moments your audience will remember long after they leave.',
    keywords: ['Booth Design', 'Fabrication', 'Events', 'Spatial Branding', 'Activation'],
    icon: <Package className="w-5 h-5" />,
    slug: 'offline-productions',
    image: '/images/services/events.png',
    category: 'Creative',
    whatWeDo: [
      'Exhibition booth concept, design, and fabrication',
      'Event spatial design and branded environment creation',
      'Stage design, backdrop production, and set builds',
      'Pop-up activations and experiential installations',
      'End-to-end production management and on-site supervision',
      'Post-event breakdown and logistics coordination',
    ],
    outcomes: [
      'Physical brand environments that command attention',
      'Immersive attendee experiences that drive engagement',
      'Seamless on-time, on-budget production delivery',
      'Elevated brand perception through environmental excellence',
      'Quantifiable lead generation and audience interaction',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTION
// ─────────────────────────────────────────────────────────────────────────────
const productionServices: ServiceItem[] = [
  {
    title: 'Photo & Video Shooting',
    shortDescription:
      'Cinematic visuals — from product photography to brand films — that tell your story in the highest quality.',
    description:
      'Visuals are the currency of modern attention. FIFTH FLOOR produces professional photo and video content — product shoots, brand films, corporate documentaries, social content, and editorial campaigns — with cinematic quality that elevates perception and commands engagement at every touchpoint.',
    keywords: ['Photography', 'Videography', 'Brand Film', 'Product Shoot', 'Editorial'],
    icon: <Camera className="w-5 h-5" />,
    slug: 'photo-video-shooting',
    image: '/images/services/marketing.png',
    category: 'Production',
    whatWeDo: [
      'Brand and product photography (studio & on-location)',
      'Corporate and executive portrait photography',
      'Brand films, documentaries, and promotional videos',
      'Social media content production (reels, stories, shorts)',
      'Event coverage — photography and full video production',
      'Post-production: color grading, editing, and delivery',
    ],
    outcomes: [
      'Library of premium visual assets across all formats',
      'Consistent visual language that reinforces brand identity',
      'Ready-to-publish content for all digital and print channels',
      'Increased engagement through professional visual storytelling',
      'Cinematic quality that signals brand seriousness',
    ],
  },
  {
    title: 'Real Voice Over',
    shortDescription:
      'Professional human voice talent — Arabic and English — for every content format.',
    description:
      'A voice can make or break a brand moment. FIFTH FLOOR connects you with professional voice talent — in Arabic and English — for commercials, explainer videos, IVR systems, documentaries, and podcasts. Real voices. Real emotion. Zero AI substitutes.',
    keywords: ['Arabic Voiceover', 'English Voiceover', 'Commercial', 'IVR', 'Narration'],
    icon: <Mic className="w-5 h-5" />,
    slug: 'voice-over',
    image: '/images/services/creative.png',
    category: 'Production',
    whatWeDo: [
      'Professional voice talent sourcing and direction',
      'Arabic and English commercial voiceovers',
      'IVR and phone system voice recording',
      'Documentary and corporate narration',
      'Podcast intros, outros, and full episode production',
      'Script refinement and pronunciation coaching',
    ],
    outcomes: [
      'Professional vocal performance that enhances content credibility',
      'Consistent brand voice across all audio touchpoints',
      'Culturally appropriate delivery for GCC audiences',
      'High-quality studio recordings ready for broadcast',
      'Faster turnaround through streamlined production process',
    ],
  },
  {
    title: 'Real Modeling',
    shortDescription:
      'Professional talent and model coordination for campaigns, shoots, and activations.',
    description:
      'The right face changes everything. FIFTH FLOOR manages professional model casting, talent coordination, and on-set direction for brand campaigns, product shoots, fashion editorials, and event activations — ensuring your visual stories feature talent that authentically represents your brand world.',
    keywords: ['Model Casting', 'Talent Management', 'Campaign', 'Editorial', 'Activation'],
    icon: <Users className="w-5 h-5" />,
    slug: 'modeling',
    image: '/images/services/branding.png',
    category: 'Production',
    whatWeDo: [
      'Professional model and talent sourcing and casting',
      'On-set talent direction and performance coaching',
      'Wardrobe, styling, and makeup coordination',
      'Brand campaign and editorial shoot talent management',
      'Event ambassador and activation brand model management',
      'Full usage rights and contract management',
    ],
    outcomes: [
      'Brand imagery that authentically represents your audience',
      'Seamless shoot execution with professional talent',
      'Elevated campaign quality through expert casting',
      'Consistent brand aesthetic across all visual content',
      'Protected rights and compliant talent agreements',
    ],
  },
  {
    title: 'CGI + VFX + 3D + 2D',
    shortDescription:
      'Static and motion visual production — from hyper-realistic 3D to expressive 2D animation.',
    description:
      'When reality isn\'t enough, we build it. FIFTH FLOOR\'s production team creates cinematic CGI, hyper-realistic 3D visualizations, VFX-enhanced video, 2D motion graphics, and animated content — for product launches, architectural visualization, brand films, and digital campaigns that demand the extraordinary.',
    keywords: ['CGI', 'VFX', '3D Visualization', '2D Animation', 'Motion Graphics'],
    icon: <Wand2 className="w-5 h-5" />,
    slug: 'cgi-vfx-3d-2d',
    image: '/images/services/web-development.png',
    category: 'Production',
    whatWeDo: [
      'Hyper-realistic 3D product and architectural visualization',
      'CGI brand films and commercial production',
      'VFX compositing and live-action enhancement',
      '2D motion graphics and explainer animation',
      'Animated social content and loop assets',
      'Character design and brand mascot animation',
    ],
    outcomes: [
      'Visually spectacular content that breaks through noise',
      'Product visualization before physical production begins',
      'Elevated perceived value through premium animation quality',
      'Versatile assets deployable across all digital platforms',
      'Memorable brand moments engineered for virality',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TECHNOLOGY
// ─────────────────────────────────────────────────────────────────────────────
const technologyServices: ServiceItem[] = [
  {
    title: 'AI Solutions',
    shortDescription:
      'AI-powered solutions — image, video, voice, avatars, and big data dashboards — for the future-ready enterprise.',
    description:
      'The future of brand communication is intelligent. FIFTH FLOOR deploys practical AI solutions that amplify output and reduce friction — from AI-generated imagery and synthetic voiceover to digital twin avatars, AI video production, and custom big data dashboards that turn raw information into actionable intelligence.',
    keywords: ['AI Image', 'AI Video', 'Digital Twin', 'AI Voice', 'Data Dashboard'],
    icon: <Bot className="w-5 h-5" />,
    slug: 'ai-solutions',
    image: '/images/services/seo-analytics.png',
    category: 'Technology',
    whatWeDo: [
      'AI-generated image and visual content production',
      'AI video generation and enhancement for campaigns',
      'AI voiceover and synthetic voice production',
      'Digital twin and brand avatar development',
      'Big data analysis and custom dashboard design',
      'AI strategy consulting and workflow integration',
    ],
    outcomes: [
      'Dramatically accelerated content production cycles',
      'Scalable content generation without linear cost increase',
      'Innovative brand experiences that attract attention',
      'Real-time business intelligence through custom dashboards',
      'Competitive advantage through early AI adoption',
    ],
  },
  {
    title: 'Business Development',
    shortDescription:
      'Strategic growth consulting that opens doors, builds partnerships, and scales revenue.',
    description:
      'Growth is the ultimate product. FIFTH FLOOR brings structured business development expertise to ambitious organizations — identifying market opportunities, forging strategic partnerships, refining go-to-market strategies, and building the sales infrastructure needed to accelerate sustainable, profitable growth in the GCC and beyond.',
    keywords: ['Growth Strategy', 'Partnerships', 'Go-To-Market', 'Sales Infrastructure', 'Market Entry'],
    icon: <Briefcase className="w-5 h-5" />,
    slug: 'business-development',
    image: '/images/services/tech-consulting.png',
    category: 'Technology',
    whatWeDo: [
      'Market opportunity analysis and entry strategy',
      'Strategic partnership identification and negotiation',
      'Go-to-market strategy and sales framework design',
      'Revenue model optimization and pricing strategy',
      'Business proposal and pitch deck development',
      'GCC market expansion consulting',
    ],
    outcomes: [
      'Clearly defined growth trajectory and milestones',
      'New revenue streams and partner relationships',
      'Accelerated market entry with reduced risk',
      'Stronger competitive positioning in target markets',
      'Scalable sales and business development systems',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Unified exports
// ─────────────────────────────────────────────────────────────────────────────
export { identityServices, marketingServices, digitalServices, creativeServices, productionServices, technologyServices }

export const allServices: ServiceItem[] = [
  ...identityServices,
  ...marketingServices,
  ...digitalServices,
  ...creativeServices,
  ...productionServices,
  ...technologyServices,
]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return allServices.find((s) => s.slug === slug)
}

export function getServicesByCategory(category: ServiceCategory): ServiceItem[] {
  return allServices.filter((s) => s.category === category)
}

export const serviceCategories: ServiceCategory[] = [
  'Identity',
  'Marketing',
  'Digital',
  'Creative',
  'Production',
  'Technology',
]
