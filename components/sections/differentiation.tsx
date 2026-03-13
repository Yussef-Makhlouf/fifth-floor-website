export default function Differentiation() {
  const differentiators = [
    {
      title: "Cultural Authority",
      description: "We work exclusively with discerning clients. Our portfolio spans government entities, cultural institutions, and premium brands across the GCC.",
      icon: "✦"
    },
    {
      title: "Modern Tech Stack",
      description: "Deep expertise in MERN Stack (MongoDB, Express, React, Node.js) and Next.js ensures your digital assets are built on proven, scalable foundations.",
      icon: "✦"
    },
    {
      title: "Editorial Excellence",
      description: "Every detail is considered. From typography to code architecture, our work demonstrates the precision and sophistication of editorial design.",
      icon: "✦"
    },
    {
      title: "Regional Market Intelligence",
      description: "Deep understanding of GCC market dynamics — Saudi, UAE, Kuwait — ensuring digital solutions comply with local standards while meeting global benchmarks.",
      icon: "✦"
    },
    {
      title: "End-to-End Ownership",
      description: "From brand strategy to server deployment, we handle the full lifecycle. No handoffs, no gaps — a single partner for creative and digital excellence.",
      icon: "✦"
    },
    {
      title: "Long-term Partnerships",
      description: "We're invested in your success beyond initial delivery. Our relationships often span years, supporting growth, optimization, and continuous evolution.",
      icon: "✦"
    }
  ]

  return (
    <section className="py-20 sm:py-28 md:py-32 px-6 sm:px-8 md:px-16 lg:px-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section intro */}
        <div className="mb-12 sm:mb-16 md:mb-20 animate-slide-up">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 sm:w-12 h-px bg-accent" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest text-muted-foreground">Why Choose Us</p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight max-w-3xl">
            Authority & Experience
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground mt-4 sm:mt-6 max-w-2xl leading-relaxed">
            We're not a typical agency. We operate with the precision of a luxury house, the rigor of a cultural institution, and the engineering depth of a modern tech studio.
          </p>
        </div>

        {/* Differentiators grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {differentiators.map((item, idx) => (
            <article 
              key={idx}
              className="group animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl text-accent">{item.icon}</span>
              </div>
              
              <h3 className="text-lg sm:text-xl font-light text-foreground mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line on hover */}
              <div className="mt-3 sm:mt-4 h-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8" />
            </article>
          ))}
        </div>

        {/* Brand philosophy quote */}
        <div className="mt-16 sm:mt-20 md:mt-24 pt-12 sm:pt-16 md:pt-20 border-t border-border">
          <blockquote className="max-w-3xl">
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-foreground mb-4 sm:mb-6">
              "FIFTH FLOOR delivers technical services and expansion strategies for digital presence — serving all sectors and leading enterprises with confidence, high-quality support, and flexibility."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-6 sm:w-8 h-px bg-accent" />
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Studio Philosophy</p>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
