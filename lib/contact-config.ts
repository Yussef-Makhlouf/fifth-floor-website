// Centralized contact configuration for Fifth Floor website
// This file ensures consistent contact information across all components

export const COMPANY_INFO = {
    name: 'Fifth Floor',
    tagline: 'Where Big Ideas Take Shape',
    website: 'https://fifthfloor.agency',
    mainEmail: 'info.fifthfloorcc@gmail.com',
    responseTime: 'within 2 business days',
} as const

export const OFFICE_LOCATIONS = [
    {
        region: 'Kuwait',
        country: '🇰🇼',
        countryCode: 'KW',
        office: 'Fifth Floor Office - Kuwait City',
        email: 'info.fifthfloorcc@gmail.com',
        phone: '+965 554 004 30',
        hours: 'Sunday - Thursday, 9 AM - 6 PM',
    },
    {
        region: 'UAE',
        country: '🇦🇪',
        countryCode: 'AE',
        office: 'Fifth Floor Creative Club - Abu Dhabi',
        email: 'info.fifthfloorcc@gmail.com',
        phone: '+971 XXXX XXXX',
        hours: 'Sunday - Thursday, 9 AM - 6 PM',
    },
] as const

export const SERVICES = [
    {
        id: 'brand-strategy',
        title: 'Brand Strategy',
        description: 'Strategic planning and positioning for your brand',
    },
    {
        id: 'branding',
        title: 'Branding & Identity',
        description: 'Complete visual identity system design',
    },
    {
        id: 'marketing',
        title: 'Marketing & Campaigns',
        description: 'Comprehensive marketing strategy and execution',
    },
    {
        id: 'events',
        title: 'Event Design & Planning',
        description: 'Creative event concepts and experiential design',
    },
    {
        id: 'booths',
        title: 'Exhibition Booths',
        description: 'Custom booth design and fabrication',
    },
    {
        id: 'creative-concepts',
        title: 'Creative Concepts',
        description: 'Bold ideas and innovative creative direction',
    },
    {
        id: 'other',
        title: 'Other',
        description: 'Custom projects and consultations',
    },
] as const

export const SERVICE_TITLES = SERVICES.map(s => s.title)
export const SERVICE_IDS = SERVICES.map(s => s.id)

export type ServiceId = typeof SERVICES[number]['id']
export type ServiceTitle = typeof SERVICES[number]['title']
