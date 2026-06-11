import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const BIO_TEXT =
  'I build autonomous agents for digital twinning and synthetic data generation. My work spans PDE and SPDE numerical simulation, sparse equation discovery, causal DAG learning, and physics-informed neural networks. I turn differential equations into trainable models and data into decisions.'

function AnimatedLetter({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string
  index: number
  total: number
  scrollYProgress: any
}) {
  const charProgress = index / total
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), charProgress + 0.05],
    [0.2, 1]
  )
  return (
    <motion.span style={{ opacity }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = BIO_TEXT.split('')

  return (
    <section ref={sectionRef} id="about" className="bg-black py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-3xl px-6 py-16 md:px-16 md:py-24 text-center">
          {/* Label */}
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8">
            About me
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-12">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Ravindra Kapse,', className: 'font-normal' },
                { text: 'an AI Research Scientist.', className: 'italic font-serif' },
                { text: 'M.Tech from IISc Bangalore. Working at the intersection of physics, causality, and intelligence.', className: 'font-normal' },
              ]}
            />
          </h2>

          {/* Scroll-reveal bio */}
          <p
            className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#DEDBC8' }}
          >
            {chars.map((char, i) => (
              <AnimatedLetter
                key={i}
                char={char}
                index={i}
                total={chars.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>

          {/* Education + Awards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            <div className="bg-black/40 rounded-xl p-6">
              <p className="text-primary text-[10px] tracking-widest uppercase mb-4">Education</p>
              <div className="space-y-4">
                <div>
                  <p className="text-primary text-sm font-bold">M.Tech — IISc Bangalore</p>
                  <p className="text-gray-400 text-xs">2023 — Jun 2025 · GPA 8.3</p>
                </div>
                <div>
                  <p className="text-primary text-sm font-bold">B.Tech — UIT Bhopal</p>
                  <p className="text-gray-400 text-xs">2017 — Jun 2021 · GPA 7.36</p>
                </div>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-6">
              <p className="text-primary text-[10px] tracking-widest uppercase mb-4">Awards</p>
              <div className="space-y-4">
                <div>
                  <p className="text-primary text-sm font-bold">OLA Thought Paper Contest — Winner</p>
                  <p className="text-gray-400 text-xs">2024 · Innovative ideas for India's economic growth</p>
                </div>
                <div>
                  <p className="text-primary text-sm font-bold">Mukhyamantri Medhavi Student Award</p>
                  <p className="text-gray-400 text-xs">2017 · Academic excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
