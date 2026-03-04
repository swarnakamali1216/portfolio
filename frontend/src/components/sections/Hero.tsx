'use client'
import { useEffect, useState } from 'react'
import { personal, stats } from '@/data/portfolio'

const roles = [
  'AI Engineer',
  'ML Developer',
  'Full-Stack Builder',
  'NLP Specialist',
  'Data Scientist',
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [charIdx, setCharIdx]     = useState(0)

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIdx]
    const speed   = deleting ? 50 : 90

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setRoleIdx(i => (i + 1) % roles.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, roleIdx])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    window.scrollTo({ top: (el as HTMLElement).offsetTop - 76, behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-soft via-white to-sky-50" />

      {/* Dot grid texture */}
      <div className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite' }} />
      <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.06) 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite reverse' }} />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-20">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2.5 bg-white border border-sky-200 rounded-full px-4 py-2 mb-8 shadow-sky-sm
          animate-[fadeDown_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-[pulseGlow_2s_ease-in-out_infinite]"
            style={{ boxShadow: '0 0 0 0 rgba(74,222,128,0.3)' }} />
          <span className="font-mono text-[11px] font-700 text-sky-700 tracking-wide">
            Open to Full-Time Jobs &amp; Internships · Thoothukudi, TN
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-[clamp(40px,7.5vw,82px)] font-bold leading-[1.06] text-ink mb-4
          animate-[fadeUp_0.8s_0.1s_cubic-bezier(0.16,1,0.3,1)_both]">
          Building
          <br />
          <span className="italic text-sky-500">Intelligent</span>
          <br />
          Systems
        </h1>

        {/* Typewriter role */}
        <div className="flex items-center justify-center gap-3 mb-6
          animate-[fadeUp_0.8s_0.2s_cubic-bezier(0.16,1,0.3,1)_both]">
          <span className="font-mono text-xs font-semibold tracking-[4px] uppercase text-ink-muted">I am a</span>
          <span className="font-mono text-base font-bold text-sky-600 min-w-[180px] text-left">
            {displayed}
            <span className="inline-block w-0.5 h-5 bg-sky-500 ml-0.5 animate-[fadeIn_0.8s_ease_infinite_alternate]" />
          </span>
        </div>

        {/* Sub text */}
        <p className="text-[15px] text-ink-soft leading-[1.8] max-w-[560px] mx-auto mb-10 font-light
          animate-[fadeUp_0.8s_0.3s_cubic-bezier(0.16,1,0.3,1)_both]">
          B.Tech in AI & Data Science · CGPA 8.2 · 3 ML Internships at
          <span className="text-sky-600 font-medium"> Thedal Cloud</span>,{' '}
          <span className="text-sky-600 font-medium">Cognifyz</span> &{' '}
          <span className="text-sky-600 font-medium">Saiket Systems</span>.
          Crafting AI‑driven web experiences that impress.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14
          animate-[fadeUp_0.8s_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
          <button onClick={() => scrollTo('#projects')} className="btn-primary text-[14px]">
            View Projects <span>→</span>
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-secondary text-[14px]">
            Get In Touch
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[13px] font-semibold text-sky-600 hover:text-sky-800 transition-colors group"
          >
            <span className="text-base">↓</span>
            <span className="group-hover:underline underline-offset-2">Resume</span>
          </a>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4
          animate-[fadeUp_0.8s_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
          {stats.map((s, i) => (
            <div key={i} className="glass border border-white/80 rounded-2xl p-4 text-center
              shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="font-display text-3xl font-bold text-ink leading-none mb-1">
                {s.value}
                <span className="text-sky-500 text-xl">{s.suffix}</span>
              </div>
              <div className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Skill chips marquee */}
        <div className="mt-10 overflow-hidden -mx-6 animate-[fadeIn_1s_0.7s_both]">
          <div className="flex items-center gap-3 marquee-track select-none">
            {[
              'Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Next.js 15',
              'TypeScript', 'MongoDB', 'Scikit-learn', 'React', 'Express.js',
              'Data Science', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'Feature Engineering',
              'Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Next.js 15',
              'TypeScript', 'MongoDB', 'Scikit-learn', 'React', 'Express.js',
              'Data Science', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'Feature Engineering',
            ].map((chip, i) => (
              <span key={i} className="skill-pill whitespace-nowrap text-[11px]">{chip}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
        animate-[fadeIn_1s_1.2s_both]">
        <span className="font-mono text-[9px] tracking-[3px] uppercase text-ink-muted">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-sky-200 flex items-start justify-center p-1">
          <span className="w-1 h-2 bg-sky-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}