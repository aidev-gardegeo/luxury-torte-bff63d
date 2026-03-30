import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    // Observe the container and all reveal children
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    targets.forEach((t) => observer.observe(t))
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}

export function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
