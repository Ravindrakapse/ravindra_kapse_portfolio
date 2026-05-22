import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import BrainCloud from './BrainCloud'
import { profile } from '../data/content'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [zoomMode, setZoomMode] = useState(false)

  // click-on-brain (no drag) toggles zoom mode
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const down = { x: 0, y: 0, t: 0 }
    const onDown = (e: PointerEvent) => {
      down.x = e.clientX; down.y = e.clientY; down.t = Date.now()
    }
    const onUp = (e: PointerEvent) => {
      const dx = e.clientX - down.x
      const dy = e.clientY - down.y
      if (Math.hypot(dx, dy) < 5 && Date.now() - down.t < 300) {
        // ignore clicks on overlay UI (buttons, links)
        const target = e.target as HTMLElement
        if (target.closest('[data-ui]')) return
        setZoomMode((z) => !z)
      }
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomMode(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const goNext = () => {
    setZoomMode(false)
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 11], fov: 50 }} dpr={[1, 2]}>
          <color attach="background" args={['#05060a']} />
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <BrainCloud />
          </Suspense>
          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enableZoom={zoomMode}
            enablePan={false}
            minDistance={3}
            maxDistance={20}
            zoomSpeed={0.8}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 60%, rgba(5,6,10,0.6) 100%)',
        }}
      />

      {/* Zoom-mode indicator + continue button */}
      <AnimatePresence>
        {zoomMode && (
          <motion.div
            data-ui
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-20 font-mono text-xs tracking-widest uppercase text-accent2 bg-bg/70 backdrop-blur px-4 py-2 rounded-full border border-accent2/40"
          >
            Zoom mode · scroll to zoom · click brain to exit
          </motion.div>
        )}
      </AnimatePresence>

      <button
        data-ui
        onClick={goNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center gap-1 text-muted hover:text-accent2 transition"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">
          {zoomMode ? 'Continue' : 'Scroll · Click brain to zoom'}
        </span>
        <motion.svg
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-4 h-4"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </button>

      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-28 px-6 text-center pointer-events-none">
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
      </div>
    </section>
  )
}
