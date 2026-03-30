import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/about')({
  component: About,
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

const TIMELINE = [
  {
    year: '2018',
    title: 'The Beginning',
    body: 'Picked up a secondhand film camera at a Berlin flea market. Shot an entire roll without knowing how to load it properly. The resulting double exposures changed everything.',
  },
  {
    year: '2019',
    title: 'First Exhibition',
    body: 'Showed a series of 12 cyanotype prints at Galerie Aufzug, Berlin. Sold out in two hours. Realised this was the only path forward.',
  },
  {
    year: '2020',
    title: 'Going Digital',
    body: 'Lockdown pushed me into digital tools. Discovered that Procreate and Photoshop could feel as tactile as darkroom chemistry if you let go of perfection.',
  },
  {
    year: '2021',
    title: 'Residency & Travel',
    body: 'Three-month residency in Lisbon. Made work about displacement, warmth, and the specific color of late afternoon Atlantic light.',
  },
  {
    year: '2023',
    title: 'Today',
    body: 'Working on a long-term project about urban ecology. Collaborating with composers, writers, and other visual artists on multi-disciplinary shows.',
  },
]

const MEDIUMS = [
  'Film Photography',
  'Digital Illustration',
  'Cyanotype',
  'Mixed Media',
  'Screen Printing',
  'Digital Collage',
  'Video',
  'Installation',
]

function About() {
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()
  const s4 = useReveal()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-24 px-6 overflow-hidden">
        {/* Background portrait */}
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/aboutbg/1600/900"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full pt-28">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6">
            About
          </p>
          <h1
            className="font-display font-semibold leading-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 11rem)' }}
          >
            Aria
            <br />
            <em className="font-light">Voss</em>
          </h1>
        </div>
      </section>

      {/* Bio */}
      <section ref={s1} className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="reveal-left">
            <div className="img-zoom rounded-sm overflow-hidden aspect-[3/4]">
              <img
                src="https://picsum.photos/seed/artistportrait/800/1000"
                alt="Aria Voss"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal-right pt-4">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6">
              Berlin, Germany
            </p>
            <p className="font-display text-3xl font-light leading-relaxed mb-8 italic text-muted-foreground">
              "I make work about the moments we can almost remember."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm a visual artist and digital creator based in Berlin, working across photography,
              illustration, and mixed media. My practice centres on the emotional residue left
              by places, relationships, and time — the feeling you get looking at a photo of
              somewhere you've never been but somehow know.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My work has been shown in independent spaces across Berlin, Lisbon, and Vienna.
              I've collaborated with record labels, independent publishers, and artists working
              across disciplines, creating visual language for projects that resist easy category.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not making art I'm usually reading about mushrooms, watching old Tarkovsky
              films, or over-steeping my tea.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={s2} className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
              Journey
            </p>
            <h2
              className="font-display font-semibold leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              The Story
            </h2>
          </div>

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`reveal grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-8 py-10 border-b border-border`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-display text-4xl font-semibold text-muted-foreground/30 pt-1">
                  {item.year}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mediums */}
      <section ref={s3} className="py-24 px-6 border-t border-border grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
              Practice
            </p>
            <h2
              className="font-display font-semibold leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              Mediums
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {MEDIUMS.map((m, i) => (
              <span
                key={m}
                className="reveal border border-border px-5 py-3 text-sm tracking-wide hover:border-accent hover:text-accent transition-colors cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={s4} className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '6+', label: 'Years of Practice' },
            { num: '12', label: 'Exhibitions' },
            { num: '40+', label: 'Collaborations' },
            { num: '3', label: 'Countries' },
          ].map(({ num, label }, i) => (
            <div
              key={label}
              className="reveal text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="font-display font-bold gradient-text leading-none mb-2"
                style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
              >
                {num}
              </div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
