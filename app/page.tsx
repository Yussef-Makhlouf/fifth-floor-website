'use client'

import NavBar from '@/components/navbar'
import Hero from '@/components/sections/hero'
import Services from '@/components/sections/services'
import SelectedWork from '@/components/sections/selected-work'
import Philosophy from '@/components/sections/philosophy'
import Clients from '@/components/sections/clients'
import Contact from '@/components/sections/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="text-[#3E3E3E]">
      <NavBar />
      <main>
        <Hero />
        <Services />
        <SelectedWork />
        <Philosophy />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
