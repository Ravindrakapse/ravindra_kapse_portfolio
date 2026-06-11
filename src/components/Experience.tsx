import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WordsPullUp from './WordsPullUp'

const ROLES = [
  {
    company: 'Mobius by Gaian Solutions',
    role: 'AI Research Scientist',
    period: 'Jun 2025 — Present',
    location: 'Hyderabad, Telangana',
    bullets: [
      'Architected autonomous AI agent for AI Twinning + Synthetic Data Generation via PDE/SPDE simulation, SINDy/WSINDy, causal DAG learning — ReAct agentic loop.',
      'Designed hybrid digital twin pipelines: FEM, PINNs, neural operators × CTGAN, TimeGAN, diffusion × do-calculus, counterfactual reasoning.',
      'Built DAG-scheduled tool orchestration with episodic memory + human-in-the-loop governance gates.',
      'Researched symbolic AI: causal analysis, counterfactual simulation, semantic graph rewriting.',
      'Implemented MAML on GNNs for rapid adaptation across structured tasks.',
    ],
  },
  {
    company: 'Indian Institute of Tropical Meteorology',
    role: 'Research Intern',
    period: 'May 2024 — Jul 2024',
    location: 'Pune, Maharashtra',
    bullets: [
      'Solved PDEs using Physics-Informed Neural Networks (PINNs).',
      'Hands-on with High-Performance Computing (HPC) systems.',
    ],
  },
  {
    company: 'ETH Zurich',
    role: 'Research Project',
    period: 'Aug 2024',
    location: 'Switzerland',
    bullets: [
      'PINNs to predict daily terrestrial water storage anomalies — water balance equations + GRACE satellite data.',
    ],
  },
]

function RoleCard({ role, index }: { role: typeof ROLES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-[#101010] rounded-2xl p-6 md:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-primary text-lg sm:text-xl font-bold">{role.role}</h3>
          <p className="text-primary/70 text-sm">{role.company}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs sm:text-sm">{role.period}</p>
          <p className="text-gray-500 text-xs">{role.location}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {role.bullets.map((b, i) => (
          <li key={i} className="text-gray-400 text-xs sm:text-sm flex gap-2">
            <span className="text-primary/50 mt-0.5">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="bg-black py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">Where I've worked</p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.9]"
            style={{ color: '#E1E0CC' }}
          >
            <WordsPullUp text="Experience" />
          </h2>
        </div>

        <div className="space-y-4">
          {ROLES.map((role, i) => (
            <RoleCard key={role.company} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
