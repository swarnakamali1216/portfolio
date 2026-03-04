'use client'
import { useReveal } from '@/lib/useReveal'
import { certifications } from '@/data/portfolio'

export default function Certifications() {
  const { ref, visible } = useReveal()

  return (
    <section className="section-base bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8" ref={ref}>

        <div className={`text-center mb-14 reveal ${visible ? 'visible' : ''}`}>
          <div className="eyebrow justify-center">Certifications</div>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold text-ink">
            Credentials &amp; <em className="italic text-sky-500">Learning</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className={`card p-5 flex items-start gap-4 reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-2xl flex-shrink-0">
                {cert.icon}
              </div>
              <div>
                <div className="font-semibold text-[13px] text-ink leading-tight mb-1">{cert.title}</div>
                <div className="font-mono text-[11px] text-sky-600 font-medium">{cert.issuer}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Certified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
