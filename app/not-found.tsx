import Link from 'next/link'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import ArchitecturalShapes from '@/components/ui/architectural-shapes'

export default function NotFound() {
  return (
    <div className="bg-[#0E0E10] text-[#F7F6F3] min-h-screen flex flex-col justify-between relative overflow-hidden hairline-grid-dark">
      <NavBar isScrolled={true} />

      {/* Ambient Radial Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-40 relative z-10 max-w-4xl mx-auto">
        <ArchitecturalShapes
          variant="circle"
          size="lg"
          className="absolute -top-10 -right-10 text-[#8E8D8A]"
          opacity={0.08}
        />

        <span className="text-xs font-mono font-numeric-tabular uppercase tracking-[0.35em] text-[#8E8D8A] mb-6 border border-white/10 px-4 py-1.5 rounded-full bg-white/[0.02]">
          // Error 404
        </span>

        <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold font-syne-display tracking-tighter text-[#F7F6F3] mb-6 leading-none">
          Page Not <br />
          <span className="font-serif-accent text-[#8E8D8A] font-normal italic">Found.</span>
        </h1>

        <p className="text-sm md:text-base text-[#8E8D8A] max-w-md mx-auto mb-10 leading-relaxed font-sans">
          The requested coordinate does not exist or has been relocated within our creative studio archive.
        </p>

        <Link
          href="/"
          className="px-8 py-4 bg-[#F7F6F3] text-[#0E0E10] text-xs font-semibold uppercase tracking-[0.25em] rounded-full hover:bg-white transition-all duration-300 active-press shadow-xl"
        >
          Return To Home
        </Link>
      </main>

      <Footer />
    </div>
  )
}
