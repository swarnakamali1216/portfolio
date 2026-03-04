'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',       href: '#home',       icon: '⌂' },
  { label: 'About',      href: '#about',      icon: '◎' },
  { label: 'Skills',     href: '#skills',     icon: '◈' },
  { label: 'Experience', href: '#experience', icon: '◆' },
  { label: 'Projects',   href: '#projects',   icon: '⬡' },
  { label: 'Contact',    href: '#contact',    icon: '✉' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState('home')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll('section[id]')
      let cur = 'home'
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100) cur = s.id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    const el = document.querySelector(href)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 76
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_32px_rgba(14,165,233,0.10)] border-b border-sky-100'
            : 'bg-white/80 backdrop-blur-lg border-b border-transparent'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        {/* Animated shimmer top-line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #e0f2fe, #0ea5e9, #0284c7, #0ea5e9, #e0f2fe)',
            backgroundSize: '300% 100%',
            animation: 'shimmer 4s linear infinite',
          }}
        />

        <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); scrollTo('#home') }}
            className="flex items-center gap-3 group"
          >
            <span className="font-display text-[22px] font-bold text-ink tracking-tight">
              Swarna<span className="italic text-sky-500">.</span>T
            </span>
            <span className="hidden sm:inline-flex items-center bg-sky-50 border border-sky-200 text-sky-700 text-[10px] font-mono font-bold tracking-widest px-2 py-1 rounded-full">
              AI ENG
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(link => {
              const id = link.href.replace('#', '')
              const isContact = id === 'contact'
              const isActive  = active === id
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`
                      relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-[12.5px] font-medium
                      transition-all duration-200
                      ${isContact
                        ? 'bg-sky-500 text-white shadow-sky-md hover:bg-sky-600 hover:shadow-sky-lg px-5'
                        : isActive
                          ? 'bg-sky-50 text-sky-700 font-semibold'
                          : 'text-ink-soft hover:bg-sky-50 hover:text-sky-700'
                      }
                    `}
                  >
                    <span className={`text-[13px] ${isContact ? 'opacity-100' : isActive ? 'opacity-100' : 'opacity-50'}`}>
                      {link.icon}
                    </span>
                    {link.label}
                    {isActive && !isContact && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-xl border border-sky-100 bg-sky-50 hover:bg-sky-100 transition-colors"
            aria-label="Menu"
          >
            <span className={`block w-[18px] h-[2px] bg-ink-mid rounded-full transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-[18px] h-[2px] bg-ink-mid rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-[18px] h-[2px] bg-ink-mid rounded-full transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed inset-x-0 z-40 md:hidden transition-all duration-400 ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ top: 'var(--nav-h)' }}
      >
        <div className="bg-white/97 backdrop-blur-2xl border-b border-sky-100 px-5 py-4 shadow-xl">
          <ul className="flex flex-col gap-2">
            {links.map(link => {
              const isContact = link.href === '#contact'
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-mono text-[13px] font-medium transition-all
                      ${isContact
                        ? 'bg-sky-500 text-white shadow-sky-md'
                        : 'text-ink-mid hover:bg-sky-50 hover:text-sky-700'
                      }
                    `}
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-base
                      ${isContact ? 'bg-white/20' : 'bg-sky-50'}`}>
                      {link.icon}
                    </span>
                    {link.label}
                    <span className="ml-auto text-sky-300">›</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/10 md:hidden backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}
    </>
  )
}
