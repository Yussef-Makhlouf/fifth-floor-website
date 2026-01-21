export default function Differentiation() {
  const differentiators = [
    {
      title: "Cultural Authority",
      description: "We work exclusively with discerning clients. Our portfolio spans government entities, cultural institutions, and premium brands across the GCC.",
      icon: "✦"
    },
    {
      title: "Strategic Discretion",
      description: "Confidentiality and restraint define our approach. We never oversell. Our work speaks for itself with understated excellence.",
      icon: "✦"
    },
    {
      title: "Editorial Excellence",
      description: "Every detail is considered. From typography to spacing, our work demonstrates the precision and sophistication of editorial design.",
      icon: "✦"
    },
    {
      title: "Cultural Intelligence",
      description: "Deep understanding of regional aesthetics, heritage, and contemporary values. We create brands that resonate authentically.",
      icon: "✦"
    },
    {
      title: "Long-term Partnerships",
      description: "We're invested in your success beyond initial delivery. Our relationships often span years, supporting growth and evolution.",
      icon: "✦"
    },
    {
      title: "Experiential Mastery",
      description: "From concept through execution, we orchestrate immersive experiences that create lasting emotional connections with audiences.",
      icon: "✦"
    }
  ]

  return (
    <section className="py-32 px-8 md:px-16 lg:px-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section intro */}
        <div className="mb-20 animate-slide-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-accent"></div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Why Choose Us</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight max-w-3xl">
            Authority & Experience
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl">
            We're not a typical creative agency. We operate with the precision of a luxury house, the rigor of a cultural institution, and the vision of an editorial publication.
          </p>
        </div>

        {/* Differentiators grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {differentiators.map((item, idx) => (
            <article 
              key={idx}
              className="group animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="mb-6">
                <span className="text-3xl text-accent">{item.icon}</span>
              </div>
              
              <h3 className="text-xl font-light text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line on hover */}
              <div className="mt-4 h-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8"></div>
            </article>
          ))}
        </div>

        {/* Brand philosophy quote */}
        <div className="mt-24 pt-20 border-t border-border">
          <blockquote className="max-w-3xl">
            <p className="text-2xl font-light leading-relaxed text-foreground mb-6">
              "We believe that luxury is not about noise—it's about precision. Excellence is communicated through restraint, authenticity through discretion."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-accent"></div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Studio Philosophy</p>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
