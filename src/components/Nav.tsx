import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      let cur = ''
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) cur = l.id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? 'backdrop-blur-md bg-bg/70 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono font-bold text-lg gradient-text">RK.</a>
        <ul className="hidden md:flex gap-8 font-mono text-sm">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative transition ${
                  active === l.id ? 'text-white' : 'text-muted hover:text-white'
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="navdot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/RAVINDRA_KAPSE.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono px-4 py-2 rounded border border-accent/40 hover:bg-accent/10 hover:border-accent transition"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  )
}
