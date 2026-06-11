import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Segment {
  text: string
  className?: string
}

interface Props {
  segments: Segment[]
  containerClassName?: string
  delay?: number
}

export default function WordsPullUpMultiStyle({ segments, containerClassName = '', delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  // Flatten all segments into words, preserving per-word className
  const words: { word: string; className: string }[] = []
  for (const seg of segments) {
    const ws = seg.text.split(' ')
    for (const w of ws) {
      if (w) words.push({ word: w, className: seg.className || '' })
    }
  }

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${w.className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w.word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
