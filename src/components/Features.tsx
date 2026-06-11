import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const PROJECTS = [
  {
    num: '01',
    title: 'Building Image Classification',
    desc: 'YOLOv8n + ResNet50 to detect/classify buildings from Google Street View. 77.6% accuracy. 2nd place — Kaggle.',
    tags: ['YOLOv8', 'ResNet50', 'Computer Vision'],
  },
  {
    num: '02',
    title: 'Meesho: Clothing Attributes',
    desc: '8th of 197 teams. YOLO + multi-head ResNet + XGBoost for attribute prediction.',
    tags: ['YOLO', 'XGBoost', 'Multi-head'],
  },
  {
    num: '03',
    title: 'Chatbot + Feedback Tool',
    desc: 'Grog API multi-turn chatbot with Phoenix observability. Streamlit annotation + analytics dashboard.',
    tags: ['LLM', 'Phoenix', 'Streamlit'],
  },
  {
    num: '04',
    title: 'Physics-Informed Neural Networks',
    desc: "PINNs for Burgers', heat, Navier-Stokes, SWE, advection equations. Enhanced computational modeling techniques.",
    tags: ['PINN', 'PDE', 'PyTorch'],
  },
  {
    num: '05',
    title: 'InstaBot AI',
    desc: 'DeepSeek-R1 prompts + Flux image gen + auto-post to Instagram. End-to-end content pipeline.',
    tags: ['DeepSeek', 'Flux', 'Automation'],
  },
  {
    num: '06',
    title: 'Meta-Learning for GNNs',
    desc: 'MAML on PyTorch Geometric for few-shot protein graph classification using Learn2Learn.',
    tags: ['MAML', 'GNN', 'PyG'],
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-[#212121] rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full group hover:bg-[#2a2a2a] transition-colors"
    >
      <div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-gray-500 text-xs font-mono">{project.num}</span>
          <h3 className="text-primary text-base sm:text-lg font-medium">{project.title}</h3>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] sm:text-xs text-primary/60 bg-black/40 rounded-full px-2.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <a
        href="#"
        className="inline-flex items-center gap-1 text-primary text-xs sm:text-sm hover:gap-2 transition-all opacity-0 group-hover:opacity-100"
      >
        View project
        <ArrowRight className="w-3.5 h-3.5 rotate-[-45deg]" />
      </a>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="projects" className="min-h-screen bg-black relative px-4 md:px-8 py-16 md:py-24">
      {/* Noise */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">What I've built</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Research-driven projects across ML and physics.', className: 'text-primary' },
              ]}
            />
            <br />
            <WordsPullUpMultiStyle
              delay={0.4}
              segments={[
                { text: 'From Kaggle competitions to autonomous agents.', className: 'text-gray-500' },
              ]}
            />
          </h2>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
