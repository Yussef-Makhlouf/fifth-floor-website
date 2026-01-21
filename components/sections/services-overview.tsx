'use client'

import GridBackground from '@/components/ui/grid-background'

export default function ServicesOverview() {
  const services = [
    {
      title: "Branding & Identity Systems",
      description: "Strategic brand development and comprehensive visual identity systems that communicate your core values.",
      keywords: ["Strategy", "Design", "Systems", "Impact"],
      id: 1
    },
    {
      title: "Experiential Design",
      description: "Immersive brand experiences and events that create lasting connections with your audience.",
      keywords: ["Concept", "Execution", "Experience", "Culture"],
      id: 2
    },
    {
      title: "Creative Direction",
      description: "Visionary guidance across all creative disciplines to ensure cohesive brand expression.",
      keywords: ["Vision", "Strategy", "Excellence", "Refinement"],
      id: 3
    },
    {
      title: "Production & Visual Storytelling",
      description: "Cinematic content creation and visual narratives that captivate and inspire.",
      keywords: ["Production", "Visual", "Narrative", "Quality"],
      id: 4
    },
  ]

  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24 bg-white border-t border-[#919191]/20 overflow-hidden">
      {/* Grid Background */}
      <GridBackground
        fadeFrom="bottom"
        gridColor="#919191"
        gridSizeX={30}
        gridSizeY={30}
        opacity={0.15}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="mb-20 animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[#3E3E3E]"></div>
            <p className="text-xs uppercase tracking-widest text-[#6A6A6A]">Service Excellence</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight max-w-3xl text-[#3E3E3E]">
            Editorial Clarity
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {services.map((service, idx) => (
            <article
              key={service.id}
              className="group animate-slide-up bg-white/50 backdrop-blur-sm p-6 -mx-6 rounded-lg transition-colors hover:bg-white"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="mb-6">
                <p className="text-2xl md:text-3xl font-light text-[#3E3E3E] mb-4 group-hover:text-[#6A6A6A] transition-colors duration-300">
                  {service.title}
                </p>
                <p className="text-[#6A6A6A] text-base leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-[#919191]/20">
                {service.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="text-xs uppercase tracking-widest text-[#919191]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
