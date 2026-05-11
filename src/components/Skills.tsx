import { motion } from 'framer-motion'
import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">04 — Stack</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-12">Skills.</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(skills).map(([cat, list], i) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-mono text-xs tracking-widest text-accent2 uppercase mb-4">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {list.map((s) => (
                <motion.span
                  whileHover={{ scale: 1.06, y: -2 }}
                  key={s}
                  className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-white/85 border border-white/10 hover:border-accent hover:bg-accent/10 transition cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
