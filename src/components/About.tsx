import { motion } from 'framer-motion'
import { profile, education, awards } from '../data/content'

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">01 — About</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-10">Who am I.</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10">
        <motion.div
          className="md:col-span-2 text-lg md:text-xl text-white/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {profile.bio}
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm font-mono text-muted">
            <Stat label="Years in AI Research" value="3+" />
            <Stat label="Kaggle Top Finishes" value="2nd · 8th" />
            <Stat label="Domains" value="ML · PINNs · Causal" />
            <Stat label="Based in" value="India" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass rounded-xl p-6">
            <h3 className="font-mono text-xs tracking-widest text-accent2 uppercase mb-4">Education</h3>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.school}>
                  <div className="font-medium text-white">{e.degree}</div>
                  <div className="text-sm text-white/70">{e.school}</div>
                  <div className="text-xs text-muted font-mono mt-1">{e.period} · {e.extra}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="font-mono text-xs tracking-widest text-accent2 uppercase mb-4">Awards</h3>
            <ul className="space-y-3">
              {awards.map((a) => (
                <li key={a.title}>
                  <div className="font-medium text-white text-sm">{a.title}</div>
                  <div className="text-xs text-muted font-mono">{a.year} — {a.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl text-white font-bold">{value}</div>
      <div className="text-xs uppercase tracking-widest mt-1">{label}</div>
    </div>
  )
}
