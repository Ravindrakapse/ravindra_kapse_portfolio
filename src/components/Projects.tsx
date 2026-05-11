import { motion } from 'framer-motion'
import { useRef, MouseEvent } from 'react'
import { projects } from '../data/content'

function TiltCard({ p, i }: { p: typeof projects[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current!
    el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: i * 0.05 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="tilt-card glass rounded-2xl p-6 h-full relative overflow-hidden group cursor-pointer"
        style={{
          // @ts-ignore
          '--accent': p.accent,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${p.accent}22, transparent 40%)`,
          }}
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
              style={{ background: `${p.accent}22`, color: p.accent }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <svg className="w-5 h-5 text-muted group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 7l-10 10M7 7h10v10" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
          <p className="text-sm text-white/70 mb-4 leading-relaxed">{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-white/60 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">03 — Work</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-12">Projects.</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => <TiltCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  )
}
