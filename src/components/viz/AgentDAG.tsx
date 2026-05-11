import { useEffect, useRef } from 'react'

// Animated agentic DAG: nodes = tools (Plan → Simulate → Discover → Verify → Output)
// Tokens flow along edges (ReAct loop). Hover a node to highlight its outgoing path.
export default function AgentDAG({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current!
    const ctx = cvs.getContext('2d')!
    let raf = 0
    let w = 0, h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const labels = ['Plan', 'PDE Sim', 'SINDy', 'Causal DAG', 'CTGAN', 'Verify', 'Output']
    type Node = { x: number; y: number; r: number; label: string; pulse: number; hovered: boolean }
    type Edge = { a: number; b: number }
    const nodes: Node[] = []
    const edges: Edge[] = [
      { a: 0, b: 1 }, { a: 0, b: 2 }, { a: 1, b: 3 }, { a: 2, b: 3 },
      { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 1, b: 5 }, { a: 5, b: 6 },
      { a: 5, b: 0 }, // feedback loop (ReAct)
    ]
    let tokens: { e: Edge; t: number; speed: number }[] = []
    const mouse = { x: -9999, y: -9999 }

    const layout = () => {
      const rect = cvs.getBoundingClientRect()
      w = rect.width; h = rect.height
      cvs.width = w * dpr; cvs.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes.length = 0
      // hand-placed for nice DAG layout
      const pos = [
        [0.08, 0.5], [0.28, 0.25], [0.28, 0.75], [0.5, 0.5],
        [0.68, 0.5], [0.82, 0.5], [0.95, 0.5],
      ]
      pos.forEach((p, i) => {
        nodes.push({ x: p[0] * w, y: p[1] * h, r: 14, label: labels[i], pulse: 0, hovered: false })
      })
    }

    const onMove = (e: MouseEvent) => {
      const r = cvs.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    let lastSpawn = 0
    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)

      // update hover
      for (const n of nodes) {
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y)
        n.hovered = d < n.r + 8
        n.pulse *= 0.94
      }

      // edges
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b]
        const hot = a.hovered || b.hovered
        ctx.strokeStyle = hot ? 'rgba(34, 211, 238, 0.9)' : 'rgba(124, 92, 255, 0.35)'
        ctx.lineWidth = hot ? 1.6 : 0.8
        ctx.beginPath()
        // curve for feedback edge
        if (e.a === 5 && e.b === 0) {
          ctx.moveTo(a.x, a.y)
          ctx.bezierCurveTo(a.x, h * 1.1, b.x, h * 1.1, b.x, b.y)
        } else {
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
        }
        ctx.stroke()
        // arrow head
        const ang = Math.atan2(b.y - a.y, b.x - a.x)
        const ax = b.x - Math.cos(ang) * (b.r + 4)
        const ay = b.y - Math.sin(ang) * (b.r + 4)
        ctx.fillStyle = hot ? '#22d3ee' : 'rgba(124, 92, 255, 0.5)'
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(ax - Math.cos(ang - 0.4) * 7, ay - Math.sin(ang - 0.4) * 7)
        ctx.lineTo(ax - Math.cos(ang + 0.4) * 7, ay - Math.sin(ang + 0.4) * 7)
        ctx.fill()
      }

      // spawn tokens
      if (now - lastSpawn > 350) {
        lastSpawn = now
        const e = edges[Math.floor(Math.random() * (edges.length - 1))] // skip feedback
        tokens.push({ e, t: 0, speed: 0.012 + Math.random() * 0.01 })
      }

      // tokens
      tokens = tokens.filter((tk) => {
        tk.t += tk.speed
        const a = nodes[tk.e.a], b = nodes[tk.e.b]
        let x: number, y: number
        if (tk.e.a === 5 && tk.e.b === 0) {
          const t = tk.t
          const cx1 = a.x, cy1 = h * 1.1, cx2 = b.x, cy2 = h * 1.1
          const mt = 1 - t
          x = mt ** 3 * a.x + 3 * mt ** 2 * t * cx1 + 3 * mt * t ** 2 * cx2 + t ** 3 * b.x
          y = mt ** 3 * a.y + 3 * mt ** 2 * t * cy1 + 3 * mt * t ** 2 * cy2 + t ** 3 * b.y
        } else {
          x = a.x + (b.x - a.x) * tk.t
          y = a.y + (b.y - a.y) * tk.t
        }
        ctx.fillStyle = '#22d3ee'
        ctx.shadowColor = '#22d3ee'; ctx.shadowBlur = 10
        ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0
        if (tk.t >= 1) { nodes[tk.e.b].pulse = 1; return false }
        return true
      })

      // nodes
      for (const n of nodes) {
        const r = n.r + n.pulse * 4
        ctx.fillStyle = n.hovered ? '#22d3ee' : '#0b0d14'
        ctx.strokeStyle = n.hovered || n.pulse > 0.2 ? '#22d3ee' : '#7c5cff'
        ctx.lineWidth = 1.5
        ctx.shadowColor = ctx.strokeStyle
        ctx.shadowBlur = n.hovered ? 16 : 6
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
        ctx.shadowBlur = 0
        ctx.fillStyle = n.hovered ? '#05060a' : '#fff'
        ctx.font = '10px JetBrains Mono, monospace'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(n.label, n.x, n.y + r + 12)
      }

      raf = requestAnimationFrame(draw)
    }

    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(cvs)
    cvs.addEventListener('mousemove', onMove)
    cvs.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      cvs.removeEventListener('mousemove', onMove)
      cvs.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className={`block w-full h-full ${className}`} />
}
