import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WordsPullUp from './WordsPullUp'

const SKILLS: Record<string, string[]> = {
  'ML / Deep Learning': ['Transformers', 'CNNs (ResNet, VGG)', 'YOLOv8', 'GNNs', 'MAML', 'PINNs', 'Transfer Learning'],
  'Frameworks': ['PyTorch', 'TensorFlow', 'PyTorch Geometric', 'DeepXDE', 'HuggingFace', 'vLLM', 'Ollama'],
  'Causal / Reasoning': ['DoWhy', 'SCM', 'Counterfactual Analysis', 'Game Theory', 'Multi-agent Systems'],
  'Data & Viz': ['NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'Matplotlib', 'Streamlit'],
  'Systems & Ops': ['Git', 'Linux', 'HPC', 'Phoenix Observability', 'Model Deployment'],
  'Geo / Climate': ['GRACE', 'ERA5', 'Spatio-temporal Modeling', 'Hydrological Modeling'],
}

function SkillGroup({ cat, items, index }: { cat: string; items: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-[#101010] rounded-xl p-5 sm:p-6"
    >
      <p className="text-primary text-[10px] tracking-widest uppercase mb-3">{cat}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <motion.span
            whileHover={{ scale: 1.05, y: -1 }}
            key={s}
            className="text-xs text-gray-400 bg-black/50 border border-gray-800 hover:border-primary/40 hover:text-primary rounded-full px-3 py-1 transition-colors cursor-default"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="bg-black py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-4">Tech stack</p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.9]"
            style={{ color: '#E1E0CC' }}
          >
            <WordsPullUp text="Skills" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <SkillGroup key={cat} cat={cat} items={items} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
