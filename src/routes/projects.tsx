import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'

export const Route = createFileRoute('/projects')({
  component: Projects,
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    el.querySelectorAll('.reveal').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

// Derive all unique tags across projects for filtering
function getCategories(projects: typeof allProjects) {
  const all = projects.flatMap((p) => p.tags)
  return ['All', ...Array.from(new Set(all))]
}

function Projects() {
  const [activeTag, setActiveTag] = useState('All')
  const ref = useReveal()

  const categories = getCategories(allProjects)
  const filtered =
    activeTag === 'All'
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(activeTag))

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Creative Work
          </p>
          <h1
            className="reveal font-display font-semibold leading-none mb-10"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', transitionDelay: '100ms' }}
          >
            Projects
          </h1>

          {/* Filters */}
          <div className="reveal flex flex-wrap gap-3" style={{ transitionDelay: '200ms' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTag(cat)}
                className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                  activeTag === cat
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'border-border text-muted-foreground hover:border-accent/50 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project._meta.path}
              className="reveal overlay-card img-zoom rounded-sm overflow-hidden bg-card aspect-[4/5] flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative flex-1 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${project._meta.path}/600/700`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="overlay flex-col justify-end p-6" style={{ opacity: undefined }}>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-white/70 hover:text-accent transition-colors"
                      >
                        <Github size={12} />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-accent hover:text-white transition-colors"
                      >
                        <ExternalLink size={12} />
                        View
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Title strip */}
              <div className="p-5 bg-card border-t border-border">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-widest uppercase text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-semibold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-center py-24">
            No projects found for this category.
          </p>
        )}
      </div>
    </main>
  )
}
