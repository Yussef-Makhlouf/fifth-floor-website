export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Insight",
      description: "Deep understanding of your brand, market, and audience through strategic research and discovery."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Clear positioning and strategic direction that guides all subsequent creative decisions."
    },
    {
      number: "03",
      title: "Design",
      description: "Conceptual development and design execution across all brand touchpoints and applications."
    },
    {
      number: "04",
      title: "Execution",
      description: "Meticulous implementation and production across platforms, ensuring highest quality standards."
    },
    {
      number: "05",
      title: "Refinement",
      description: "Continuous optimization and evolution based on performance and cultural feedback."
    }
  ]

  return (
    <section className="py-32 px-8 md:px-16 lg:px-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="mb-20 animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-accent"></div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Our Methodology</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight max-w-3xl">
            A Structured Approach to Excellence
          </h2>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="flex flex-col group animate-slide-up"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {/* Step number */}
              <div className="mb-8">
                <p className="text-5xl md:text-4xl font-light text-muted-foreground group-hover:text-accent transition-colors duration-300">
                  {step.number}
                </p>
              </div>

              {/* Step title */}
              <h3 className="text-xl font-light mb-4 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {step.description}
              </p>

              {/* Visual indicator */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block mt-12 pt-8 border-t border-border">
                  <svg className="w-8 h-8 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="mt-16 pt-16 border-t border-border">
          <p className="text-sm text-muted-foreground italic">
            Each phase is informed by cultural intelligence and market research, ensuring your brand resonates authentically with your audience.
          </p>
        </div>
      </div>
    </section>
  )
}
