import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export const Route = createFileRoute('/gallery')({
  component: Gallery,
})

type GalleryItem = {
  id: number
  seed: string
  title: string
  category: string
  width: number
  height: number
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, seed: 'g-photo1', title: 'Urban Fragment I', category: 'Photography', width: 800, height: 1000 },
  { id: 2, seed: 'g-illus1', title: 'Chromatic Dream', category: 'Illustration', width: 800, height: 600 },
  { id: 3, seed: 'g-digital1', title: 'Void Space No. 3', category: 'Digital', width: 800, height: 800 },
  { id: 4, seed: 'g-photo2', title: 'Soft Architecture', category: 'Photography', width: 800, height: 1100 },
  { id: 5, seed: 'g-mixed1', title: 'Between Hours', category: 'Mixed Media', width: 800, height: 700 },
  { id: 6, seed: 'g-illus2', title: 'Pattern Language II', category: 'Illustration', width: 800, height: 900 },
  { id: 7, seed: 'g-photo3', title: 'Neon Wilderness', category: 'Photography', width: 800, height: 600 },
  { id: 8, seed: 'g-digital2', title: 'Recursive Form', category: 'Digital', width: 800, height: 1000 },
  { id: 9, seed: 'g-mixed2', title: 'Palimpsest IV', category: 'Mixed Media', width: 800, height: 800 },
  { id: 10, seed: 'g-photo4', title: 'Shadow Studies', category: 'Photography', width: 800, height: 1200 },
  { id: 11, seed: 'g-illus3', title: 'Signal & Noise', category: 'Illustration', width: 800, height: 600 },
  { id: 12, seed: 'g-digital3', title: 'Entropy Garden', category: 'Digital', width: 800, height: 900 },
  { id: 13, seed: 'g-photo5', title: 'Quiet Violence', category: 'Photography', width: 800, height: 700 },
  { id: 14, seed: 'g-mixed3', title: 'Tidal Memory', category: 'Mixed Media', width: 800, height: 1000 },
  { id: 15, seed: 'g-illus4', title: 'The Cartography of Longing', category: 'Illustration', width: 800, height: 800 },
]

const CATEGORIES = ['All', 'Photography', 'Illustration', 'Digital', 'Mixed Media']

function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem
  items: GalleryItem[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const currentIndex = items.findIndex((i) => i.id === item.id)

  return (
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 bg-black/30 p-3 rounded-full"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 bg-black/30 p-3 rounded-full"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Image */}
      <div
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`https://picsum.photos/seed/${item.seed}/1200/900`}
          alt={item.title}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
        />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-sm">
          <p className="text-[10px] tracking-widest uppercase text-accent mb-1">
            {item.category}
          </p>
          <h3 className="font-display text-xl text-white">{item.title}</h3>
          <p className="text-xs text-white/50 mt-1">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>
  )
}

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const filtered =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory)

  const openLightbox = useCallback((item: GalleryItem) => {
    setLightboxItem(item)
  }, [])

  const closeLightbox = useCallback(() => setLightboxItem(null), [])

  const prevImage = useCallback(() => {
    if (!lightboxItem) return
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id)
    setLightboxItem(filtered[(idx - 1 + filtered.length) % filtered.length])
  }, [lightboxItem, filtered])

  const nextImage = useCallback(() => {
    if (!lightboxItem) return
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id)
    setLightboxItem(filtered[(idx + 1) % filtered.length])
  }, [lightboxItem, filtered])

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          items={filtered}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Visual Work
          </p>
          <h1
            className="font-display font-semibold leading-none mb-10"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Gallery
          </h1>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'border-border text-muted-foreground hover:border-accent/50 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="masonry">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="masonry-item overlay-card img-zoom rounded-sm overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(item)}
            >
              <img
                src={`https://picsum.photos/seed/${item.seed}/${item.width}/${item.height}`}
                alt={item.title}
                className="w-full block"
                loading="lazy"
                width={item.width}
                height={item.height}
              />
              <div className="overlay">
                <div className="flex items-end justify-between w-full">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-accent mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-display text-lg text-white">{item.title}</h3>
                  </div>
                  <ZoomIn size={18} className="text-white/60 group-hover:text-white transition-colors shrink-0 ml-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
