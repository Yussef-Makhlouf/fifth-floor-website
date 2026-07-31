// ─────────────────────────────────────────────────────────────
//  Centralized Project Data — Fifth Floor Creative Agency
//  All asset paths map directly to /public/web-content/
// ─────────────────────────────────────────────────────────────

export interface GalleryItem {
  type: 'image' | 'video' | 'svg'
  src: string
  alt: string
  /** 'wide' spans 2 columns in the masonry grid */
  span?: 'normal' | 'wide'
}

export interface Reel {
  src: string
  title: string
  poster?: string
}

export interface Project {
  id: number
  slug: string
  number: string
  title: string
  client: string
  /** Full display category */
  category: string
  /** Short category used for filter tabs */
  categoryFilter: string
  year: string
  tagline: string
  description: string
  challenge: string
  solution: string
  metrics: { label: string; value: string }[]
  tags: string[]
  /** Hero / card cover — image src or video src */
  coverImage: string
  coverType: 'image' | 'video' | 'svg'
  gallery: GalleryItem[]
  reels: Reel[]
  services: string[]
}

// ─── PROJECT DATA ────────────────────────────────────────────

export const projects: Project[] = [
  // ── 01 · B GENIUS ──────────────────────────────────────────
  {
    id: 1,
    slug: 'b-genius',
    number: '01',
    title: 'B Genius — Brand Universe',
    client: 'B Genius',
    category: 'Branding & Identity',
    categoryFilter: 'Branding',
    year: '2024',
    tagline: 'A complete brand identity system from logo to lifestyle.',
    description:
      'A comprehensive brand identity system for B Genius — from logo design and brand guidelines to full print collateral, merchandise, and social media content. Every touchpoint thoughtfully crafted to communicate expertise and approachability.',
    challenge:
      'Building a brand identity that speaks coherently across corporate services and the health & nutrition space, while maintaining visual flexibility across multiple product lines and physical formats.',
    solution:
      'We developed a cohesive visual language centered around clarity and expertise — translating seamlessly across print, digital, and lifestyle merchandise touchpoints, anchored by a strong logomark system.',
    metrics: [
      { label: 'Collateral Pieces', value: '14+' },
      { label: 'Social Assets', value: '9' },
      { label: 'Brand Touchpoints', value: '40+' },
    ],
    tags: ['Brand Identity', 'Print Design', 'Social Media', 'Merchandise Design'],
    coverImage: '/web-content/branding/b_genius/b_genius_logo_mockup.jpg',
    coverType: 'image',
    gallery: [
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_logo_mockup.jpg', alt: 'B Genius Logo Mockup', span: 'wide' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_business_cards_mockup.png', alt: 'B Genius Business Cards' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_mouse_pad_mockup.png', alt: 'B Genius Mouse Pad' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_tote_bag_mockup.png', alt: 'B Genius Tote Bag' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_a5_notepad_mockup.png', alt: 'B Genius Notebook' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_a5_notepad_back_mockup.png', alt: 'B Genius Notebook Back' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_certificate_mockup.png', alt: 'B Genius Certificate' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_certificate_mug_mockup.png', alt: 'B Genius Mug' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_a4_envelope_mockup.png', alt: 'B Genius A4 Envelope' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_dl_envelope_mockup.png', alt: 'B Genius DL Envelope' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_letterhead_mockup.png', alt: 'B Genius Letterhead' },
      { type: 'image', src: '/web-content/branding/b_genius/b_genius_meal_planner_mockup.png', alt: 'B Genius Meal Planner' },
      { type: 'image', src: '/web-content/social_media/b_genius/posts/b_genius_summer_camp_post_01.jpg', alt: 'Summer Camp Post 01', span: 'wide' },
      { type: 'image', src: '/web-content/social_media/b_genius/posts/b_genius_summer_camp_post_02.jpg', alt: 'Summer Camp Post 02' },
      { type: 'image', src: '/web-content/social_media/b_genius/posts/b_genius_summer_camp_post_03.jpg', alt: 'Summer Camp Post 03' },
      { type: 'image', src: '/web-content/social_media/b_genius/posts/b_genius_summer_camp_post_04.jpg', alt: 'Summer Camp Post 04' },
      { type: 'image', src: '/web-content/social_media/b_genius/posts/b_genius_summer_camp_post_05.jpg', alt: 'Summer Camp Post 05' },
      { type: 'image', src: '/web-content/social_media/b_genius/posts/b_genius_summer_camp_post_06.jpg', alt: 'Summer Camp Post 06' },
      { type: 'image', src: '/web-content/social_media/b_genius/posts/b_genius_summer_camp_post_07.jpg', alt: 'Summer Camp Post 07' },
    ],
    reels: [
      {
        src: '/web-content/social_media/b_genius/reels/b_genius_open_doors_reel.mp4',
        title: 'B Genius — Open Doors Campaign Reel',
      },
    ],
    services: ['Brand Strategy', 'Visual Identity', 'Print Design', 'Social Media Content', 'Merchandise Design'],
  },

  // ── 02 · TECHNOVA ───────────────────────────────────────────
  {
    id: 2,
    slug: 'technova',
    number: '02',
    title: 'Technova — Brand System',
    client: 'Technova',
    category: 'Brand Identity & Motion',
    categoryFilter: 'Branding',
    year: '2024',
    tagline: 'Forging a tech-forward identity that commands attention.',
    description:
      'From brand guideline books to NFC smart cards and animated logo reveals — Technova\'s identity system is built for a company operating at the cutting edge of technology. Every element signals authority, precision, and forward momentum.',
    challenge:
      'Communicating technological authority and innovation while remaining approachable and trustworthy for both B2B and B2C audiences across Kuwait.',
    solution:
      'A systematic brand language with bold typographic choices, a refined palette, and signature motion design elements that reinforce the brand\'s tech-forward positioning at every touchpoint.',
    metrics: [
      { label: 'Brand Pages', value: '6' },
      { label: 'Social Assets', value: '10+' },
      { label: 'Motion Deliverables', value: '2' },
    ],
    tags: ['Brand Identity', 'Brand Guidelines', 'Motion Design', 'NFC Cards', 'Social Content'],
    coverImage: '/web-content/branding/technova/technova_nfc_cards_vertical_mockup.png',
    coverType: 'image',
    gallery: [
      { type: 'image', src: '/web-content/branding/technova/technova_nfc_cards_vertical_mockup.png', alt: 'Technova NFC Smart Cards', span: 'wide' },
      { type: 'svg', src: '/web-content/branding/technova/mockups/technova_brand_guideline_page_03.svg', alt: 'Technova Brand Guidelines — Color System', span: 'wide' },
      { type: 'svg', src: '/web-content/branding/technova/mockups/technova_brand_guideline_page_04.svg', alt: 'Technova Brand Guidelines — Typography' },
      { type: 'svg', src: '/web-content/branding/technova/mockups/technova_brand_guideline_page_05.svg', alt: 'Technova Brand Guidelines — Applications' },
      { type: 'svg', src: '/web-content/branding/technova/mockups/technova_brand_guideline_page_06.svg', alt: 'Technova Brand Guidelines — Brand Patterns' },
      { type: 'image', src: '/web-content/social_media/technova/social_media/technova_social_story_01.png', alt: 'Technova Stories 01' },
      { type: 'image', src: '/web-content/social_media/technova/social_media/technova_social_story_09.jpg', alt: 'Technova Stories 09' },
      { type: 'image', src: '/web-content/social_media/technova/social_media/technova_social_story_13.jpg', alt: 'Technova Stories 13', span: 'wide' },
      { type: 'image', src: '/web-content/social_media/technova/social_media/technova_event_invitation_01.jpg', alt: 'Technova Invitation 01' },
      { type: 'image', src: '/web-content/social_media/technova/social_media/technova_event_invitation_02.jpg', alt: 'Technova Invitation 02' },
      { type: 'image', src: '/web-content/social_media/technova/social_media/technova_thank_you_card.jpg', alt: 'Technova Thank You Card' },
    ],
    reels: [
      {
        src: '/web-content/animation/technova_logo_animation.mp4',
        title: 'Technova — Logo Animation Reveal',
      },
      {
        src: '/web-content/social_media/technova/social_media/technova_ai_foodai_story.mp4',
        title: 'Technova × FoodAI — Social Campaign Story',
      },
    ],
    services: ['Brand Identity', 'Brand Guidelines', 'Motion Graphics', 'Social Media Design', 'NFC Smart Cards'],
  },

  // ── 03 · BURGAN BANK ────────────────────────────────────────
  {
    id: 3,
    slug: 'burgan-bank',
    number: '03',
    title: 'Burgan Bank — Cinema Night',
    client: 'Burgan Bank',
    category: 'Event Production',
    categoryFilter: 'Production',
    year: '2024',
    tagline: 'Lights, action — banking reimagined as an experience.',
    description:
      'A high-impact event production for Burgan Bank\'s Cinema Night — featuring full creative direction, printed event materials, and cinematic social media reels that brought the premiere experience to life both on-ground and online.',
    challenge:
      'Translating the premium, exclusive atmosphere of a bank-sponsored cinema premiere into compelling digital and print materials that capture the excitement and reinforce brand prestige.',
    solution:
      'Immersive event branding with dramatic cinema-themed visual compositions and high-energy video reels produced specifically for social media, delivering maximum reach and engagement.',
    metrics: [
      { label: 'Event Visuals', value: '6+' },
      { label: 'Production Reels', value: '2' },
      { label: 'Event Scale', value: 'Premium' },
    ],
    tags: ['Event Branding', 'Print Production', 'Video Production', 'Creative Direction', 'Social Media'],
    coverImage: '/web-content/social_media/burgan_bank/reels/burgan_cinema_spiderman_reel_01.mp4',
    coverType: 'video',
    gallery: [
      { type: 'svg', src: '/web-content/production/burgan_cinema_event_production_01.svg', alt: 'Burgan Cinema Event Design 01', span: 'wide' },
      { type: 'svg', src: '/web-content/production/burgan_cinema_event_production_02.svg', alt: 'Burgan Cinema Event Design 02' },
      { type: 'svg', src: '/web-content/printing/burgan_cinema_event_flyer.svg', alt: 'Burgan Cinema Event Flyer' },
      { type: 'svg', src: '/web-content/production/burgan_cinema_event_production_03.svg', alt: 'Burgan Cinema Event Design 03', span: 'wide' },
      { type: 'svg', src: '/web-content/production/burgan_cinema_event_production_04.svg', alt: 'Burgan Cinema Event Design 04', span: 'wide' },
      { type: 'svg', src: '/web-content/burgan_cinema_event_poster.svg', alt: 'Burgan Cinema Event Poster' },
    ],
    reels: [
      {
        src: '/web-content/social_media/burgan_bank/reels/burgan_cinema_spiderman_reel_01.mp4',
        title: 'Burgan Bank — Cinema Night Reel 01',
      },
      {
        src: '/web-content/social_media/burgan_bank/reels/burgan_cinema_spiderman_reel_02.mp4',
        title: 'Burgan Bank — Cinema Night Reel 02',
      },
    ],
    services: ['Event Branding', 'Creative Direction', 'Print Production', 'Video Production', 'Social Media'],
  },

  // ── 04 · ANDALUS MALL ──────────────────────────────────────
  {
    id: 4,
    slug: 'andalus-mall',
    number: '04',
    title: 'Andalus Mall — Social Presence',
    client: 'Andalus Mall',
    category: 'Social Media & Motion',
    categoryFilter: 'Social Media',
    year: '2024',
    tagline: 'Bringing the mall experience to every scroll.',
    description:
      'Dynamic social media reels and branded content for Andalus Mall — capturing the energy of Kuwait\'s premier shopping destination through scroll-stopping video content and a refined brand identity system designed for digital-first audiences.',
    challenge:
      'Creating engaging social media content that authentically communicates the mall\'s diverse offerings and vibrant atmosphere while maintaining a consistent, premium brand voice across all platforms.',
    solution:
      'High-energy social media reels with strong visual storytelling and cinematic production quality, backed by a clean identity system that adapts naturally to the fast-paced scroll environment.',
    metrics: [
      { label: 'Campaign Reels', value: '2' },
      { label: 'Platform Focus', value: 'Instagram' },
      { label: 'Content Format', value: 'Motion' },
    ],
    tags: ['Social Media Strategy', 'Video Production', 'Brand Content', 'Brand Identity'],
    coverImage: '/web-content/social_media/andalus_mall/reels/andalus_mall_reel_01.mp4',
    coverType: 'video',
    gallery: [
      { type: 'svg', src: '/web-content/social_media/andalus_mall/andalus_mall_logo.svg', alt: 'Andalus Mall Brand Identity', span: 'wide' },
    ],
    reels: [
      {
        src: '/web-content/social_media/andalus_mall/reels/andalus_mall_reel_01.mp4',
        title: 'Andalus Mall — Social Campaign Reel 01',
      },
      {
        src: '/web-content/social_media/andalus_mall/reels/andalus_mall_reel_02.mp4',
        title: 'Andalus Mall — Social Campaign Reel 02',
      },
    ],
    services: ['Social Media Strategy', 'Video Production', 'Motion Design', 'Brand Content Creation'],
  },

  // ── 05 · DABDOOB ────────────────────────────────────────────
  {
    id: 5,
    slug: 'dabdoob',
    number: '05',
    title: 'Dabdoob — Print & Identity',
    client: 'Dabdoob',
    category: 'Print Design & Identity',
    categoryFilter: 'Printing',
    year: '2025',
    tagline: 'Crafting tactile brand experiences that leave an impression.',
    description:
      'A focused print and identity project for Dabdoob — delivering concept-driven print materials and a refined brand mark that captures the playful spirit of the brand while maintaining a professional, market-ready execution.',
    challenge:
      'Developing a print identity system that is both playful and professional — reflecting the unique, approachable character of the Dabdoob brand while ensuring clarity and memorability.',
    solution:
      'Concept-driven print materials with a distinctive, memorable logomark and a vibrant visual language that translates powerfully across all physical brand touchpoints.',
    metrics: [
      { label: 'Print Concepts', value: '2' },
      { label: 'Brand Mark', value: '1' },
      { label: 'Deliverables', value: '3' },
    ],
    tags: ['Print Design', 'Logo Design', 'Brand Identity', 'Concept Development'],
    coverImage: '/web-content/printing/Dabdoob/dabdoob_product_illustration_01.png',
    coverType: 'image',
    gallery: [
      { type: 'image', src: '/web-content/printing/Dabdoob/dabdoob_product_illustration_01.png', alt: 'Dabdoob Print Concept 01', span: 'wide' },
      { type: 'image', src: '/web-content/printing/Dabdoob/dabdoob_product_illustration_02.png', alt: 'Dabdoob Print Concept 02', span: 'wide' },
      { type: 'svg', src: '/web-content/printing/Dabdoob/dabdoob_logo.svg', alt: 'Dabdoob Logo Mark', span: 'wide' },
    ],
    reels: [],
    services: ['Logo Design', 'Print Design', 'Brand Identity', 'Concept Development'],
  },
]

// ─── HELPERS ─────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const index = projects.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

/** Unique filter categories derived from live data */
export function getFilterCategories(): string[] {
  const unique = Array.from(new Set(projects.map((p) => p.categoryFilter)))
  return ['All', ...unique]
}
