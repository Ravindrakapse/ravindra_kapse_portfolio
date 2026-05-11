import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import FaceParticles from './FaceParticles'
import { profile } from '../data/content'

export default function Hero() {
  const scrollProgress = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const hoverAssemble = useRef(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight
      // 0 at top, 1 at end-of-hero. Triggers face assembly.
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / (h * 0.8)))
    }
    const onMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -((e.clientY / window.innerHeight) * 2 - 1)
      mouse.current.x = nx
      mouse.current.y = ny
      // proximity to center → assemble face. Hover near middle = full assembly.
      const dist = Math.sqrt(nx * nx + ny * ny)
      hoverAssemble.current = Math.max(0, Math.min(1, 1 - dist * 0.9))
    }
    const onLeave = () => { hoverAssemble.current = 0 }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <FaceParticles scrollProgress={scrollProgress} mouse={mouse} hoverAssemble={hoverAssemble} />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5,6,10,0.4) 60%, rgba(5,6,10,0.95) 100%)' }} />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-4 font-mono text-xs tracking-[0.4em] text-accent uppercase"
        >
          Hello, I am
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-extrabold tracking-tight"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-lg md:text-2xl text-white/80 font-light"
        >
          {profile.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-3 text-sm md:text-base text-muted font-mono"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted text-xs"
        >
          <span className="font-mono tracking-widest uppercase mb-2">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
