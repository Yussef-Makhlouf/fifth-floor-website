'use client'

import { useState } from 'react'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import ServicesHero from '@/components/sections/services-hero'
import ServicesOverview from '@/components/sections/services-overview'
import ServiceBreakdown from '@/components/sections/service-breakdown'
import ProcessSection from '@/components/sections/process-section'
import VisualEvidence from '@/components/sections/visual-evidence'
import Differentiation from '@/components/sections/differentiation'
import ServiceCTA from '@/components/sections/service-cta'

export default function ServicesPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="bg-background text-foreground">
      <NavBar isScrolled={isScrolled} />
      <main>
        <ServicesHero />
        <ServicesOverview />
        <ServiceBreakdown />
        <ProcessSection />
        <VisualEvidence />
        <Differentiation />
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  )
}
