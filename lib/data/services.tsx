import { Monitor, Palette, Globe, Server, Search, Lightbulb, Layers, Sparkles, Film } from 'lucide-react'
import React from 'react'

export interface ServiceItem {
  title: string
  description: string
  keywords: string[]
  icon: React.ReactNode
  slug: string
  image: string
}

export const creativeServices: ServiceItem[] = [
  {
    title: "Branding & Identity Systems",
    description: "Strategic brand development and comprehensive visual identity systems that communicate your core values and position you for lasting market leadership.",
    keywords: ["Strategy", "Design", "Systems", "Impact"],
    icon: <Layers className="w-5 h-5" />,
    slug: "branding",
    image: "/images/services/branding.png"
  },
  {
    title: "Experiential Design",
    description: "Immersive brand experiences and events that create lasting connections with your audience and forge genuine emotional bonds.",
    keywords: ["Concept", "Execution", "Experience", "Culture"],
    icon: <Sparkles className="w-5 h-5" />,
    slug: "experiential-design",
    image: "/images/services/events.png"
  },
  {
    title: "Creative Direction",
    description: "Visionary guidance across all creative disciplines to ensure cohesive brand expression with market-leading execution.",
    keywords: ["Vision", "Strategy", "Excellence", "Refinement"],
    icon: <Palette className="w-5 h-5" />,
    slug: "creative-direction",
    image: "/images/services/creative.png"
  },
  {
    title: "Production & Visual Storytelling",
    description: "Cinematic content creation and visual narratives that captivate, inspire, and amplify your brand story across platforms.",
    keywords: ["Production", "Visual", "Narrative", "Quality"],
    icon: <Film className="w-5 h-5" />,
    slug: "production",
    image: "/images/services/marketing.png"
  },
]

export const digitalServices: ServiceItem[] = [
  {
    title: "Custom Web Development",
    description: "Corporate websites, web applications, and e-commerce platforms built with cutting-edge technology — fast, secure, and scalable.",
    keywords: ["MERN Stack", "E-Commerce", "Dashboards", "APIs"],
    icon: <Monitor className="w-5 h-5" />,
    slug: "web-development",
    image: "/images/services/web-development.png"
  },
  {
    title: "UI/UX Design",
    description: "Non-template, bespoke interfaces designed to reinforce brand value, ensure accessibility, and deliver seamless experiences across all devices.",
    keywords: ["Interface", "User Experience", "Responsive", "Accessibility"],
    icon: <Palette className="w-5 h-5" />,
    slug: "ui-ux-design",
    image: "/images/services/ui-ux-design.png"
  },
  {
    title: "WordPress to Modern Stack",
    description: "Migrate from WordPress to Next.js & Node.js for blazing speed, enhanced security, complete flexibility, and enterprise scalability.",
    keywords: ["Migration", "Performance", "Security", "Flexibility"],
    icon: <Globe className="w-5 h-5" />,
    slug: "wordpress-migration",
    image: "/images/services/wp-migration.png"
  },
  {
    title: "Managed Hosting & Infrastructure",
    description: "Complete VPS setup, server security, SSL, automated backups, DNS management, and professional email configuration.",
    keywords: ["VPS", "Security", "DNS", "Email"],
    icon: <Server className="w-5 h-5" />,
    slug: "managed-hosting",
    image: "/images/services/managed-hosting.png"
  },
  {
    title: "SEO & Performance Analytics",
    description: "Technical SEO, performance optimization, sitemap configuration, and conversion tracking with Google Analytics, Meta Pixel, and TikTok Pixel.",
    keywords: ["SEO", "Analytics", "Performance", "Conversion"],
    icon: <Search className="w-5 h-5" />,
    slug: "seo-analytics",
    image: "/images/services/seo-analytics.png"
  },
  {
    title: "Tech Consulting & Product Management",
    description: "Transform ideas into successful digital products with MVP definition, product roadmaps, and workflow automation.",
    keywords: ["MVP", "Roadmap", "Automation", "Strategy"],
    icon: <Lightbulb className="w-5 h-5" />,
    slug: "tech-consulting",
    image: "/images/services/tech-consulting.png"
  },
]

export const allServices = [...creativeServices, ...digitalServices]

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return allServices.find((s) => s.slug === slug)
}
