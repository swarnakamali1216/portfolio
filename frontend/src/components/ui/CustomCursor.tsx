'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    let rx = 0, ry = 0
    let tx = 0, ty = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY
      if (dot.current) {
        dot.current.style.left  = tx + 'px'
        dot.current.style.top   = ty + 'px'
      }
    }

    const lerp = () => {
      rx += (tx - rx) * 0.12
      ry += (ty - ry) * 0.12
      if (ring.current) {
        ring.current.style.left = rx + 'px'
        ring.current.style.top  = ry + 'px'
      }
      raf = requestAnimationFrame(lerp)
    }

    const onEnter = () => {
      if (ring.current) { ring.current.style.width = '48px'; ring.current.style.height = '48px'; }
    }
    const onLeave = () => {
      if (ring.current) { ring.current.style.width = '32px'; ring.current.style.height = '32px'; }
    }

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    raf = requestAnimationFrame(lerp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot  hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  )
}
