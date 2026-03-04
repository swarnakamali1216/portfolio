'use client'
import { useReveal } from '@/lib/useReveal'
import { experience } from '@/data/portfolio'

export default function Experience() {
  const { ref, visible } = useReveal()

  return (
    <section id="experience" className="section-base bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8" ref={ref}>

        {/* Header */}
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <div className="eyebrow justify-center">Experience</div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-bold text-ink">
            Where I <em className="italic text-sky-500">Worked</em>
          </h2>
          <p className="mt-3 text-ink-soft max-w-md mx-auto text-[15px]">
            End-to-end machine learning workflows across three industry internships.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-sky-200 via-sky-400 to-sky-200 hidden sm:block" />

          <div className="flex flex-col gap-10">
            {experience.map((exp, i) => (
              <div
                key={i}
                className={`relative flex gap-6 reveal ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-mono font-bold text-sm shadow-sky-md flex-shrink-0 z-10"
                    style={{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}bb)` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Card */}
                <div className="card flex-1 p-6 group">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-[16px] text-ink mb-0.5">{exp.role}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[14px]" style={{ color: exp.color }}>{exp.company}</span>
                        <span className="text-ink-muted text-[12px]">· {exp.type}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-[11px] bg-sky-50 border border-sky-100 text-sky-700 px-3 py-1.5 rounded-xl whitespace-nowrap">
                        {exp.period}
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="flex flex-col gap-2 mb-5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13px] text-ink-soft leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                          style={{ background: exp.color }} />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-sky-50">
                    {exp.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-100 text-sky-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
