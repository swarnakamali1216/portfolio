'use client'
import { useEffect, useRef, useState } from 'react'

interface StatItem {
  value:  number
  suffix: string
  label:  string
}

interface StatsCounterProps {
  stats: StatItem[]
}

function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(parseFloat(start.toFixed(1)))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])

  return count
}

function StatCard({ value, suffix, label, active }: StatItem & { active: boolean }) {
  const count = useCountUp(value, 1400, active)
  return (
    <div className="glass border border-white/80 rounded-2xl p-4 text-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
      <div className="font-display text-3xl font-bold text-ink leading-none mb-1">
        {count}
        <span className="text-sky-500 text-xl">{suffix}</span>
      </div>
      <div className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <StatCard key={i} {...s} active={active} />
      ))}
    </div>
  )
}
