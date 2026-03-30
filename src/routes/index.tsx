import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { allProjects } from 'content-collections'
import { ArrowDown, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((t) =>
      observer.observe(t),
    )
    return () => observer.disconnect()
  }, [])
  return ref
}

const MARQUEE_WORDS = [
  'Photography',
  '·',
  'Illustration',
  '·',
  'Digital Art',
  '·',
  'Mixed Media',
  '·',
  'Conceptual',
  '·',
  'Fine Art',
  '·',
]

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg">
      {/* Accent glow blob */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, oklch(0.72 0.28 328 / 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <p
          className={`text-xs tracking-[0.35em] uppercase text-muted-foreground mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Visual Artist &amp; Digital Creator
        </p>

        {/* Main heading */}
        <h1
          className={`font-display font-bold leading-none transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontSize: 'clamp(4rem, 14vw, 14rem)' }}
        >
          <span className="block">ARIA</span>
          <span className="block gradient-text">VOSS</span>
        </h1>

        {/* Tagline */}
        <p
          className={`mt-8 text-muted-foreground max-w-lg mx-auto leading-relaxed text-lg transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Exploring the poetry of light, shadow, and human connection through visual storytelling.
        </p>

        {/* CTAs */}
        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Link to="/gallery">
            <button className="btn-accent text-sm">View Gallery</button>
          </Link>
          <Link to="/about">
            <button className="btn-outline text-sm">About Me</button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-all duration-700 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  )
}

function MarqueeSection() {
  const repeated = [...MARQUEE_WORDS, ...MARQUEE_WORDS]
  return (
    <div className="py-6 border-y border-border overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-track">
          {repeated.map((word, i) => (
            <span
              key={i}
              className={`font-display text-2xl mx-6 ${word === '·' ? 'accent-text' : 'text-muted-foreground/40'}`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeaturedWork() {
  const ref = useReveal()
  const featured = allProjects.slice(0, 3)

  return (
    <section ref={ref} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="reveal flex items-end justify-between mb-16 flex-wrap gap-4">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">
            Selected Work
          </p>
          <h2
            className="font-display font-semibold leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
          >
            Featured
            <br />
            Projects
          </h2>
        </div>
        <Link
          to="/projects"
          className="flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <div
            key={project._meta.path}
            className={`reveal overlay-card img-zoom rounded-sm overflow-hidden bg-card aspect-[3/4]`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <img
              src={`https://picsum.photos/seed/${project._meta.path}/600/800`}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="overlay">
              <div>
                <p className="text-xs tracking-widest uppercase text-accent mb-1">
                  {project.tags[0]}
                </p>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70 mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function AboutTeaser() {
  const ref = useReveal()
  return (
    <section
      ref={ref}
      className="py-32 px-6 border-t border-border"
      style={{
        background:
          'linear-gradient(180deg, var(--background) 0%, oklch(0.11 0.01 285) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="reveal-left img-zoom rounded-sm overflow-hidden aspect-[4/5]">
          <img
            src="https://picsum.photos/seed/artistportrait/800/1000"
            alt="Aria Voss"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="reveal-right">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6">
            The Artist
          </p>
          <h2
            className="font-display font-semibold leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
          >
            Creating worlds
            <br />
            <em className="font-light">between pixels</em>
            <br />
            and emotion.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Based in Berlin, I'm a multidisciplinary visual artist working at the intersection of
            photography, digital illustration, and conceptual design. My work investigates themes
            of memory, belonging, and the beauty found in overlooked spaces.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Over the past six years I've collaborated with independent labels, gallery curators,
            and creative studios across Europe, always driven by the same question: what does
            it feel like to exist in a specific moment?
          </p>
          <Link to="/about">
            <button className="btn-outline text-sm flex items-center gap-2">
              My Story <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function GalleryTeaser() {
  const ref = useReveal()
  const images = [
    { seed: 'gallery1', span: 'row-span-2' },
    { seed: 'gallery2', span: '' },
    { seed: 'gallery3', span: '' },
    { seed: 'gallery4', span: '' },
    { seed: 'gallery5', span: '' },
  ]

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2
            className="font-display font-semibold leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
          >
            Gallery
          </h2>
          <Link
            to="/gallery"
            className="flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
          >
            Browse All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="reveal grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
          {images.map(({ seed, span }, i) => (
            <div
              key={seed}
              className={`img-zoom rounded-sm overflow-hidden ${span} ${i === 0 ? 'md:row-span-2' : ''}`}
            >
              <img
                src={`https://picsum.photos/seed/${seed}/600/400`}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCTA() {
  const ref = useReveal()
  return (
    <section
      ref={ref}
      className="py-40 px-6 border-t border-border text-center grid-bg"
    >
      <div className="max-w-3xl mx-auto reveal">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6">
          Get In Touch
        </p>
        <h2
          className="font-display font-semibold leading-tight mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
        >
          Let's create
          <br />
          <em className="font-light gradient-text">something</em>
          <br />
          together.
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">
          Available for commissions, collaborations, and exhibitions.
        </p>
        <Link to="/contact">
          <button className="btn-accent text-sm">Start a Conversation</button>
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm tracking-widest uppercase text-muted-foreground">
          Aria Voss
        </span>
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <FeaturedWork />
      <AboutTeaser />
      <GalleryTeaser />
      <ContactCTA />
      <Footer />
    </main>
  )
}
