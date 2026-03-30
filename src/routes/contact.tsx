import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Send, CheckCircle, Instagram, Twitter, Linkedin } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

// Behance SVG icon (lucide doesn't include it)
function BehanceIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.803 5.731c.589 0 1.119.051 1.605.155.483.103.895.273 1.243.508.343.235.611.547.804.939.187.392.282.868.282 1.43 0 .614-.139 1.128-.414 1.541-.276.414-.68.756-1.207 1.021.73.21 1.275.576 1.637 1.095.36.519.54 1.146.54 1.883 0 .627-.12 1.163-.36 1.606-.237.442-.566.804-.979 1.083-.413.28-.889.484-1.428.614-.535.13-1.092.195-1.67.195H1V5.731h6.803zm-.351 4.972c.48 0 .878-.114 1.192-.344.312-.229.469-.597.469-1.101 0-.267-.049-.493-.145-.675a1.09 1.09 0 00-.396-.434 1.73 1.73 0 00-.58-.235 3.165 3.165 0 00-.7-.073H3.709v2.862h3.743zm.157 5.239c.271 0 .526-.026.765-.08.238-.053.447-.14.624-.264.177-.122.317-.286.42-.49.103-.204.154-.464.154-.778 0-.619-.176-1.059-.528-1.318-.35-.261-.814-.39-1.393-.39H3.709v3.32h3.9zm9.663-1.245c.388.379.947.567 1.676.567.523 0 .972-.131 1.349-.394.376-.264.607-.547.694-.849h2.406c-.385 1.197-1.016 2.054-1.893 2.574-.877.52-1.937.779-3.178.779-.862 0-1.635-.138-2.322-.412-.688-.275-1.27-.663-1.748-1.165-.479-.502-.846-1.1-1.105-1.794-.258-.693-.388-1.453-.388-2.277 0-.8.135-1.551.401-2.25.268-.698.646-1.302 1.136-1.809.489-.508 1.07-.907 1.741-1.198.671-.29 1.411-.436 2.219-.436.906 0 1.7.172 2.385.514.686.343 1.254.808 1.705 1.397.45.59.775 1.269.977 2.04.2.77.275 1.59.219 2.456h-7.181c.042.89.322 1.537.707 1.857zm2.934-5.048c-.31-.345-.808-.517-1.496-.517-.43 0-.787.072-1.073.216-.284.145-.515.322-.69.532-.175.21-.299.432-.373.666a3.245 3.245 0 00-.122.648h4.525c-.1-.731-.37-1.201-.771-1.545zM15.552 7.5h5.286v1.313h-5.286z" />
    </svg>
  )
}

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/sketchesbymelina',
    Icon: Instagram,
    handle: '@sketchesbymelina',
  },
  {
    label: 'Behance',
    href: 'https://behance.net',
    Icon: BehanceIcon,
    handle: 'melina-gardelinou',
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com',
    Icon: Twitter,
    handle: '@melinagardelinou',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    Icon: Linkedin,
    handle: 'melina-gardelinou',
  },
]

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-md">
          <CheckCircle
            size={48}
            className="mx-auto mb-6"
            style={{ color: 'var(--accent)' }}
          />
          <h2 className="font-display text-4xl font-semibold mb-4">
            Message Sent
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Thanks for reaching out. I read every message and will get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-outline text-sm"
          >
            Send Another
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Left: Copy + Socials */}
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6">
            Get In Touch
          </p>
          <h1
            className="font-display font-semibold leading-none mb-10"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
          >
            Let's
            <br />
            <em className="font-light gradient-text">talk.</em>
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-sm">
            Open for commissions, exhibition proposals, editorial work, and creative collaborations.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-14 max-w-sm">
            Response time is usually within 48 hours.
          </p>

          {/* Social links */}
          <div className="space-y-4">
            {SOCIALS.map(({ label, href, Icon, handle }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-accent group-hover:text-accent transition-all duration-300">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-accent transition-colors">
                    {label}
                  </p>
                  <p className="text-sm text-foreground">{handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:pt-20">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const formData = new FormData(form)
              fetch('/contact.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(
                  formData as unknown as Record<string, string>,
                ).toString(),
              }).then(() => setSubmitted(true))
            }}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
                >
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  required
                  placeholder={placeholder}
                  className="w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border-b border-border px-0 py-3 text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-accent inline-flex items-center gap-2 text-sm"
            >
              <Send size={14} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
