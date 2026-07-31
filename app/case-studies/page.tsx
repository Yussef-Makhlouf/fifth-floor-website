'use client'

import { useState, useEffect } from 'react'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import CaseStudiesHero from '@/components/sections/case-studies-hero'
import CaseStudiesFilter from '@/components/sections/case-studies-filter'
import CaseStudiesProjects, { projects } from '@/components/sections/case-studies-projects'
import CaseStudiesCTA from '@/components/sections/case-studies-cta'

export default function CaseStudiesPage() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [scrollProgress, setScrollProgress] = useState(0)

    // Project counts for filter — uses categoryFilter which matches filter tabs
    const projectCounts: Record<string, number> = {}
    projects.forEach((p) => {
        projectCounts[p.categoryFilter] = (projectCounts[p.categoryFilter] || 0) + 1
    })

    // Scroll progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setScrollProgress(progress)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="bg-background text-foreground case-studies-page">
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-[2px] bg-[#3E3E3E] z-[60] transition-none"
                style={{ width: `${scrollProgress}%` }}
            />

            <NavBar />
            <main>
                <CaseStudiesHero />
                <CaseStudiesFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    projectCounts={projectCounts}
                />
                <CaseStudiesProjects activeFilter={activeFilter} />
                <CaseStudiesCTA />
            </main>
            <Footer />
        </div>
    )
}

