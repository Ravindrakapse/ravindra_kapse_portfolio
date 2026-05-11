import { useEffect, useRef } from 'react'

// 2D wave/heat equation sim. Click/drag to drop perturbations.
// Visual nod to PINNs solving PDEs (Burgers/heat/Navier-Stokes).
export default function WaveSim({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current!
    const ctx = cvs.getContext('2d')!
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    // Coarse grid; render to ImageData
    const COLS = 120, ROWS = 70
    let u = new Float32Array(COLS * ROWS)
    let uPrev = new Float32Array(COLS * ROWS)
    let uNext = new Float32Array(COLS * ROWS)
    const c = 0.45 // wave speed (CFL safe)
    const damping = 0.992

    let img: ImageData
    let cssW = 0, cssH = 0

    const layout = () => {
      const rect = cvs.getBoundingClientRect()
      cssW = rect.width; cssH = rect.height
      cvs.width = COLS; cvs.height = ROWS // render at grid res, CSS scales up (looks pixel-art)
      cvs.style.imageRendering = 'pixelated'
      img = ctx.createImageData(COLS, ROWS)
    }

    const drop = (gx: number, gy: number, amp = 1.5) => {
      const radius = 3
      for (let j = -radius; j <= radius; j++) for (let i = -radius; i <= radius; i++) {
        const x = gx + i, y = gy + j
        if (x < 0 || x >= COLS || y < 0 || y >= ROWS) continue
        const d = Math.sqrt(i * i + j * j)
        if (d > radius) continue
        u[y * COLS + x] += amp * (1 - d / radius)
      }
    }

    // seed gentle waves
    for (let k = 0; k < 4; k++) drop(Math.random() * COLS, Math.random() * ROWS, 0.8)

    const onMove = (e: MouseEvent) => {
      if (!(e.buttons & 1) && e.type !== 'click') return
      const r = cvs.getBoundingClientRect()
      const gx = ((e.clientX - r.left) / r.width) * COLS
      const gy = ((e.clientY - r.top) / r.height) * ROWS
      drop(gx, gy, 2.0)
    }
    const onClick = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect()
      drop(((e.clientX - r.left) / r.width) * COLS, ((e.clientY - r.top) / r.height) * ROWS, 2.5)
    }

    const step = () => {
      // wave equation: u_tt = c^2 * laplacian(u)
      for (let y = 1; y < ROWS - 1; y++) {
        for (let x = 1; x < COLS - 1; x++) {
          const i = y * COLS + x
          const lap = u[i - 1] + u[i + 1] + u[i - COLS] + u[i + COLS] - 4 * u[i]
          uNext[i] = (2 * u[i] - uPrev[i] + c * c * lap) * damping
        }
      }
      // swap
      const tmp = uPrev; uPrev = u; u = uNext; uNext = tmp
    }

    const render = () => {
      const data = img.data
      for (let i = 0; i < COLS * ROWS; i++) {
        const v = u[i]
        // map -1..1 → accent ↔ accent2 gradient over dark bg
        const t = Math.max(-1, Math.min(1, v))
        const r = 11 + Math.max(0, t) * 113   // toward 124
        const g = 13 + Math.abs(t) * 130       // glow
        const b = 20 + (1 - Math.abs(t)) * 60 + Math.max(0, -t) * 200
        const j = i * 4
        data[j] = r; data[j + 1] = g; data[j + 2] = b; data[j + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
    }

    const loop = () => {
      step(); render()
      raf = requestAnimationFrame(loop)
    }

    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(cvs)
    cvs.addEventListener('mousemove', onMove)
    cvs.addEventListener('click', onClick)
    loop()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      cvs.removeEventListener('mousemove', onMove)
      cvs.removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={ref} className={`block w-full h-full cursor-crosshair ${className}`} />
}
