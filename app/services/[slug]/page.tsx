import { notFound } from "next/navigation"
import { allServices, getServiceBySlug } from "@/lib/data/services"
import NavBar from "@/components/navbar"
import Footer from "@/components/footer"
import ServiceDetailHero from "@/components/services/service-detail-hero"
import ServiceContent from "@/components/services/service-content"
import ServiceCTA from "@/components/sections/service-cta"

export function generateStaticParams() {
  return allServices.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <NavBar isScrolled={true} />
      <main>
        <ServiceDetailHero service={service} />
        <ServiceContent service={service} />
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  )
}
