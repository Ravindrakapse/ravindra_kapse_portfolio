import { motion } from 'framer-motion'
import { experience } from '../data/content'
import AgentDAG from './viz/AgentDAG'
import WaveSim from './viz/WaveSim'

const vizFor = (company: string) => {
  if (company.includes('Mobius')) return <AgentDAG />
  if (company.includes('Tropical') || company.includes('ETH')) return <WaveSim />
  return null
}

const captionFor = (company: string) => {
  if (company.includes('Mobius')) return 'Live ReAct loop · hover a node'
  if (company.includes('Tropical')) return 'Wave PDE sim · click to drop ripples (PINN-style)'
  if (company.includes('ETH')) return 'Water balance dynamics · click to perturb'
  return ''
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">02 — Where</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-12">Experience.</h2>
      </motion.div>

      <div className="space-y-16">
        {experience.map((exp, i) => {
          const viz = vizFor(exp.company)
          const caption = captionFor(exp.company)
          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="grid md:grid-cols-2 gap-6 items-stretch"
            >
              <div className="glass rounded-2xl p-6 md:p-8 order-2 md:order-none">
                <div className="font-mono text-xs text-accent2 mb-2">{exp.period} · {exp.location}</div>
                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                <div className="text-accent text-sm mb-4">{exp.company}</div>
                <ul className="space-y-2 text-sm text-white/75">
                  {exp.bullets.map((b, j) => <li key={j}>· {b}</li>)}
                </ul>
              </div>
              <div className="glass rounded-2xl overflow-hidden relative min-h-[280px] md:min-h-[360px]">
                {viz ? (
                  <>
                    {viz}
                    <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-white/60 tracking-widest uppercase pointer-events-none">
                      {caption}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted text-sm font-mono">—</div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
