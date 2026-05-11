import { motion } from 'framer-motion'
import { experience } from '../data/content'

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

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent2 to-transparent" />

        {experience.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className={`relative mb-12 md:w-1/2 ${
              i % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-[50%]'
            } pl-12`}
          >
            <div className={`absolute top-2 ${i % 2 === 0 ? 'md:-right-2 left-2 md:left-auto' : '-left-2 md:-left-2'} w-4 h-4 rounded-full bg-accent glow`} />
            <div className="glass rounded-xl p-6 hover:translate-y-[-2px] transition">
              <div className="font-mono text-xs text-accent2 mb-2">{exp.period} · {exp.location}</div>
              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
              <div className="text-accent text-sm mb-3">{exp.company}</div>
              <ul className={`space-y-2 text-sm text-white/75 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                {exp.bullets.map((b, j) => <li key={j}>· {b}</li>)}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
