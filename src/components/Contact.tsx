import { motion } from 'framer-motion'
import { profile } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="section flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-accent uppercase mb-3">05 — Reach out</p>
        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Let's <span className="gradient-text">build</span>.
        </h2>
        <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
          Open to research collaborations, agentic-AI roles, and interesting problems at the physics × ML × causality intersection.
        </p>

        <motion.a
          href={`mailto:${profile.email}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block text-lg md:text-2xl font-mono px-8 py-4 rounded-full border-2 border-accent text-white hover:bg-accent/10 transition glow"
        >
          {profile.email} →
        </motion.a>

        <div className="mt-12 flex justify-center gap-6 font-mono text-sm">
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-muted hover:text-accent2 transition">GitHub</a>
          <span className="text-muted/30">·</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-accent2 transition">LinkedIn</a>
          <span className="text-muted/30">·</span>
          <a href={`tel:${profile.phone}`} className="text-muted hover:text-accent2 transition">{profile.phone}</a>
        </div>
      </motion.div>

      <footer className="absolute bottom-6 text-xs text-muted/60 font-mono">
        © {new Date().getFullYear()} Ravindra Kapse · Built with React · Three.js · GSAP
      </footer>
    </section>
  )
}
