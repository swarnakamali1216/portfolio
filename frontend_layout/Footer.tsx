import { personal } from '@/data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-ink overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #0EA5E9, #0284C7, #0EA5E9, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-display text-2xl font-bold text-white mb-1">
              Swarna<span className="italic text-sky-400">.</span>T
            </div>
            <p className="text-xs text-white/35 font-mono">
              AI Engineer · Full-Stack Developer · Thoothukudi, TN
            </p>
          </div>

          {/* Status */}
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-full px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-[11px] font-mono font-semibold text-green-300 tracking-wider">
              Open to Jobs &amp; Internships
            </span>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2.5">
            <a href={`mailto:${personal.email}`} title="Email"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                hover:bg-sky-500/20 hover:border-sky-400/40 transition-all text-white/50 hover:text-sky-300 text-sm">
              ✉
            </a>
            <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" title="LinkedIn"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                hover:bg-sky-500/20 hover:border-sky-400/40 transition-all text-white/50 hover:text-sky-300 text-sm">
              💼
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" title="Download Resume"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                hover:bg-sky-500/20 hover:border-sky-400/40 transition-all text-white/50 hover:text-sky-300 text-sm">
              ↓
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-white/20 font-mono">
            © {year} Swarna T. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
