'use client'
import { useReveal } from '@/lib/useReveal'
import { personal, education } from '@/data/portfolio'

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="section-base bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8" ref={ref}>

        {/* Header */}
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <div className="eyebrow justify-center">About Me</div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-bold text-ink">
            Who I <em className="italic text-sky-500">Am</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — Bio */}
          <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
            {/* Profile card */}
            <div className="flex items-center gap-5 mb-8 p-5 rounded-2xl bg-sky-50 border border-sky-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-sky flex items-center justify-center
                font-display text-2xl font-bold text-white shadow-sky-md flex-shrink-0">
                ST
              </div>
              <div>
                <div className="font-display text-xl font-bold text-ink">{personal.name}</div>
                <div className="text-sm text-ink-soft font-medium mt-0.5">{personal.tagline}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[11px] font-mono text-green-600">{personal.status}</span>
                </div>
              </div>
            </div>

            <p className="text-[15px] text-ink-soft leading-[1.85] mb-6">{personal.summary}</p>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: '✉', label: 'Email',    value: personal.email,    href: `mailto:${personal.email}` },
                { icon: '📞', label: 'Phone',    value: personal.phone,    href: `tel:${personal.phone}` },
                { icon: '📍', label: 'Location', value: personal.location, href: '#' },
                { icon: '💼', label: 'LinkedIn', value: 'View Profile',    href: `https://${personal.linkedin}` },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-sky-100 bg-white
                    hover:border-sky-300 hover:shadow-sky-sm transition-all group"
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">{item.label}</div>
                    <div className="text-[12px] font-semibold text-ink-mid truncate group-hover:text-sky-700 transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-5 flex items-center gap-3">
              <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">Languages:</span>
              {personal.languages.map(lang => (
                <span key={lang} className="skill-pill text-[11px]">{lang}</span>
              ))}
            </div>
          </div>

          {/* Right — Education */}
          <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
            <div className="font-mono text-[11px] font-bold text-ink-muted uppercase tracking-[3px] mb-6">
              Education
            </div>
            <div className="flex flex-col gap-5">
              {education.map((edu, i) => (
                <div key={i} className="card p-6 relative overflow-hidden group">
                  {/* Sky accent left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-sky-600 rounded-l-xl" />

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-lg flex-shrink-0">
                      🎓
                    </div>
                    <span className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider
                      ${edu.badge === 'Current' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-sky-50 text-sky-600 border border-sky-200'}`}>
                      {edu.badge}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[14px] text-ink leading-tight mb-1">{edu.degree}</h3>
                  <p className="font-medium text-sky-600 text-[13px] mb-1">{edu.school}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-sky-50">
                    <span className="font-mono text-[11px] text-ink-muted">{edu.period}</span>
                    <span className="font-display text-lg font-bold text-sky-600">{edu.gpa}</span>
                  </div>
                </div>
              ))}

              {/* Fun fact card */}
              <div className="rounded-2xl p-5 bg-gradient-to-br from-sky-500 to-sky-700 text-white">
                <div className="font-mono text-[10px] uppercase tracking-[3px] opacity-70 mb-3">Quick Facts</div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { v: '3', l: 'Internships' },
                    { v: '4+', l: 'Certs' },
                    { v: '2+', l: 'Projects' },
                  ].map((f, i) => (
                    <div key={i}>
                      <div className="font-display text-2xl font-bold">{f.v}</div>
                      <div className="text-[10px] opacity-70 font-mono">{f.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
