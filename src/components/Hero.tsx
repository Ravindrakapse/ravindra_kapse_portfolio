import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import BrainCloud from './BrainCloud'
import { profile } from '../data/content'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
          <color attach="background" args={['#05060a']} />
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <BrainCloud />
          </Suspense>
          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enableZoom
            enablePan={false}
            minDistance={2}
            maxDistance={12}
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

      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 px-6 text-center pointer-events-none">
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 text-[10px] text-muted/70 font-mono tracking-widest uppercase"
        >
          Drag · Scroll to zoom
        </motion.p>
      </div>
    </section>
  )
}
