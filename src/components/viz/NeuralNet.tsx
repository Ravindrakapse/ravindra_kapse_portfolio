import { useEffect, useRef } from 'react'

// Interactive neural network: 4 layers, nodes pulse, edges flow signal.
// Mouse repels nodes; hovering a node "fires" a forward pass.
export default function NeuralNet({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current!
    const ctx = cvs.getContext('2d')!
    let raf = 0
    let w = 0, h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const layers = [5, 8, 8, 4]
    type N = { x: number; y: number; ox: number; oy: number; vx: number; vy: number; pulse: number; layer: number; idx: number }
    const nodes: N[] = []
    const mouse = { x: -9999, y: -9999, down: false }
    let signals: { from: N; to: N; t: number }[] = []
    let lastFire = 0

    const layout = () => {
      const rect = cvs.getBoundingClientRect()
      w = rect.width; h = rect.height
      cvs.width = w * dpr; cvs.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes.length = 0
      layers.forEach((cnt, li) => {
        const lx = ((li + 1) / (layers.length + 1)) * w
        for (let i = 0; i < cnt; i++) {
          const ly = ((i + 1) / (cnt + 1)) * h
          nodes.push({ x: lx, y: ly, ox: lx, oy: ly, vx: 0, vy: 0, pulse: Math.random(), layer: li, idx: i })
        }
      })
    }

    const onMove = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onClick = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect()
      const cx = e.clientX - r.left, cy = e.clientY - r.top
      // fire from nearest input-layer node
      let nearest = nodes[0], dmin = Infinity
      for (const n of nodes) {
        if (n.layer !== 0) continue
        const d = (n.x - cx) ** 2 + (n.y - cy) ** 2
        if (d < dmin) { dmin = d; nearest = n }
      }
      fireFrom(nearest)
    }

    const fireFrom = (n: N) => {
      n.pulse = 1
      for (const t of nodes) if (t.layer === n.layer + 1) signals.push({ from: n, to: t, t: 0 })
    }
    const autoFire = (now: number) => {
      if (now - lastFire > 1800) {
        lastFire = now
        const inputs = nodes.filter((n) => n.layer === 0)
        fireFrom(inputs[Math.floor(Math.random() * inputs.length)])
      }
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)

      // Forces: spring back + mouse repel
      for (const n of nodes) {
        const dx = mouse.x - n.x, dy = mouse.y - n.y
        const d2 = dx * dx + dy * dy
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) + 0.001
          const f = (120 - d) / 120
          n.vx -= (dx / d) * f * 0.8
          n.vy -= (dy / d) * f * 0.8
        }
        n.vx += (n.ox - n.x) * 0.04
        n.vy += (n.oy - n.y) * 0.04
        n.vx *= 0.85; n.vy *= 0.85
        n.x += n.vx; n.y += n.vy
        n.pulse *= 0.96
      }

      // Edges
      for (let li = 0; li < layers.length - 1; li++) {
        const a = nodes.filter((n) => n.layer === li)
        const b = nodes.filter((n) => n.layer === li + 1)
        for (const na of a) for (const nb of b) {
          const alpha = 0.05 + 0.15 * Math.max(na.pulse, nb.pulse)
          ctx.strokeStyle = `rgba(124, 92, 255, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y)
          ctx.stroke()
        }
      }

      // Signals
      signals = signals.filter((s) => {
        s.t += 0.025
        const x = s.from.x + (s.to.x - s.from.x) * s.t
        const y = s.from.y + (s.to.y - s.from.y) * s.t
        ctx.fillStyle = '#22d3ee'
        ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 12
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0
        if (s.t >= 1) {
          s.to.pulse = 1
          // propagate to next layer
          if (s.to.layer < layers.length - 1) {
            for (const t of nodes) if (t.layer === s.to.layer + 1) signals.push({ from: s.to, to: t, t: 0 })
          }
          return false
        }
        return true
      })

      // Nodes
      for (const n of nodes) {
        const r = 3 + n.pulse * 4
        ctx.fillStyle = n.pulse > 0.5 ? '#22d3ee' : '#7c5cff'
        ctx.shadowColor = ctx.fillStyle as string
        ctx.shadowBlur = 4 + n.pulse * 12
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0
      }

      autoFire(now)
      raf = requestAnimationFrame(draw)
    }

    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(cvs)
    cvs.addEventListener('mousemove', onMove)
    cvs.addEventListener('mouseleave', onLeave)
    cvs.addEventListener('click', onClick)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      cvs.removeEventListener('mousemove', onMove)
      cvs.removeEventListener('mouseleave', onLeave)
      cvs.removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={ref} className={`block w-full h-full ${className}`} />
}
