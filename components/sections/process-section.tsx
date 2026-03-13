import Image from 'next/image'

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Deep understanding of your brand, market, digital landscape, and audience through strategic research and technical audits."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Clear positioning, product roadmap, and technical architecture that guide all subsequent creative and development decisions."
    },
    {
      number: "03",
      title: "Design & Development",
      description: "Conceptual development, interface design, and full-stack engineering across all brand touchpoints and digital platforms."
    },
    {
      number: "04",
      title: "Launch & Execution",
      description: "Meticulous deployment, server configuration, SEO setup, and production to ensure highest quality at launch."
    },
    {
      number: "05",
      title: "Growth & Optimization",
      description: "Continuous performance monitoring, analytics-driven optimization, and strategic evolution based on real data and cultural feedback."
    }
  ]

  return (
    <section className="py-20 sm:py-28 md:py-32 px-6 sm:px-8 md:px-16 lg:px-24 bg-background border-t border-border relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/logos/fifth-decore-dark.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section intro */}
        <div className="mb-12 sm:mb-16 md:mb-20 animate-slide-up">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 sm:w-12 h-px bg-accent" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-muted-foreground">Our Methodology</p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-3xl">
            A Structured Approach to Excellence
          </h2>
        </div>

        {/* Process steps – responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col group animate-slide-up"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {/* Step number */}
              <div className="mb-6 sm:mb-8">
                <p className="text-4xl sm:text-5xl md:text-4xl font-light text-muted-foreground group-hover:text-accent transition-colors duration-300">
                  {step.number}
                </p>
              </div>

              {/* Step title */}
              <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">
                {step.description}
              </p>

              {/* Visual indicator */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground italic max-w-2xl">
            Each phase is informed by cultural intelligence, technical expertise, and market research — ensuring your brand resonates authentically with your audience while operating on a world-class digital foundation.
          </p>
        </div>
      </div>
    </section>
  )
}
