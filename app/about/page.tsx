'use client'

import NavBar from '@/components/navbar'
import AboutHero from '@/components/sections/about-hero'
import AboutStory from '@/components/sections/about-story'
import AboutValues from '@/components/sections/about-values'
import AboutVision from '@/components/sections/about-vision'
import AboutApproach from '@/components/sections/about-approach'
import AboutCTA from '@/components/sections/about-cta'
import Footer from '@/components/footer'

export default function AboutPage() {
    return (
        <div className="text-[#3E3E3E]">
            <NavBar />
            <main>
                <AboutHero />
                <AboutStory />
                 <AboutApproach />
                <AboutValues />
                <AboutVision />
               
                <AboutCTA />
            </main>
            <Footer />
        </div>
    )
}
