import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`
      }
    }
    const loop = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    loop()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div
        ref={dot}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[200]"
        style={{ marginLeft: -4, marginTop: -4 }}
      />
      <div
        ref={ring}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full border border-accent/50 pointer-events-none z-[200]"
        style={{ marginLeft: -20, marginTop: -20 }}
      />
    </>
  )
}
