import { useEffect, useRef } from 'react'

// 2D wave/heat PDE sim. Click/drag drops perturbations (PINN nod).
export default function WaveSim({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return
    let raf = 0

    const COLS = 140, ROWS = 80
    let u = new Float32Array(COLS * ROWS)
    let uPrev = new Float32Array(COLS * ROWS)
    let uNext = new Float32Array(COLS * ROWS)
    const c = 0.5
    const damping = 0.995

    cvs.width = COLS
    cvs.height = ROWS
    cvs.style.imageRendering = 'pixelated'
    const img = ctx.createImageData(COLS, ROWS)

    const drop = (gx: number, gy: number, amp = 3.0, radius = 4) => {
      for (let j = -radius; j <= radius; j++) for (let i = -radius; i <= radius; i++) {
        const x = Math.floor(gx + i), y = Math.floor(gy + j)
        if (x < 1 || x >= COLS - 1 || y < 1 || y >= ROWS - 1) continue
        const d = Math.sqrt(i * i + j * j)
        if (d > radius) continue
        u[y * COLS + x] += amp * (1 - d / radius)
      }
    }

    // Seed
    for (let k = 0; k < 5; k++) drop(Math.random() * COLS, Math.random() * ROWS, 2.5)

    let lastAuto = 0
    const onMove = (e: MouseEvent) => {
      if (!(e.buttons & 1)) return
      const r = cvs.getBoundingClientRect()
      const gx = ((e.clientX - r.left) / r.width) * COLS
      const gy = ((e.clientY - r.top) / r.height) * ROWS
      drop(gx, gy, 4.0)
    }
    const onDown = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect()
      const gx = ((e.clientX - r.left) / r.width) * COLS
      const gy = ((e.clientY - r.top) / r.height) * ROWS
      drop(gx, gy, 5.0, 5)
    }

    const step = () => {
      for (let y = 1; y < ROWS - 1; y++) {
        for (let x = 1; x < COLS - 1; x++) {
          const i = y * COLS + x
          const lap = u[i - 1] + u[i + 1] + u[i - COLS] + u[i + COLS] - 4 * u[i]
          uNext[i] = (2 * u[i] - uPrev[i] + c * c * lap) * damping
        }
      }
      const tmp = uPrev; uPrev = u; u = uNext; uNext = tmp
    }

    const render = () => {
      const data = img.data
      for (let i = 0; i < COLS * ROWS; i++) {
        // amplify so small waves visible; tanh-like compression
        const v = Math.max(-1, Math.min(1, u[i] * 1.5))
        const pos = Math.max(0, v)
        const neg = Math.max(0, -v)
        // base dark blue background; positive crest = purple→pink, negative trough = cyan
        const r = Math.min(255, 10 + pos * 240 + neg * 30)
        const g = Math.min(255, 14 + pos * 100 + neg * 200)
        const b = Math.min(255, 30 + pos * 220 + neg * 255)
        const j = i * 4
        data[j] = r; data[j + 1] = g; data[j + 2] = b; data[j + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }

    const loop = (now: number) => {
      step(); render()
      if (now - lastAuto > 2200) {
        lastAuto = now
        drop(Math.random() * COLS, Math.random() * ROWS, 1.8)
      }
      raf = requestAnimationFrame(loop)
    }

    cvs.addEventListener('mousemove', onMove)
    cvs.addEventListener('mousedown', onDown)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      cvs.removeEventListener('mousemove', onMove)
      cvs.removeEventListener('mousedown', onDown)
    }
  }, [])

  return <canvas ref={ref} className={`block w-full h-full cursor-crosshair ${className}`} />
}
