'use client'
import { useReveal } from '@/lib/useReveal'
import { projects } from '@/data/portfolio'

export default function Projects() {
  const { ref, visible } = useReveal()

  return (
    <section id="projects" className="section-base bg-sky-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8" ref={ref}>

        {/* Header */}
        <div className={`text-center mb-16 reveal ${visible ? 'visible' : ''}`}>
          <div className="eyebrow justify-center">Projects</div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-bold text-ink">
            What I <em className="italic text-sky-500">Built</em>
          </h2>
          <p className="mt-3 text-ink-soft max-w-md mx-auto text-[15px]">
            AI-driven applications and machine learning solutions that solve real problems.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`card flex flex-col overflow-hidden reveal ${visible ? 'visible' : ''} group`}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              {/* Top colourful band */}
              <div
                className="h-[5px] w-full transition-all duration-300 group-hover:h-[8px]"
                style={{ background: `linear-gradient(90deg, ${project.color}88, ${project.color})` }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon + number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${project.color}12`, border: `1px solid ${project.color}28` }}
                  >
                    {project.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-ink-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-[16px] text-ink mb-2 group-hover:text-sky-700 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-ink-soft leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="flex flex-col gap-1.5 mb-5">
                  {project.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2 text-[12px] text-ink-soft">
                      <span className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: project.color }} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-sky-50">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                      style={{
                        background: `${project.color}0d`,
                        border: `1px solid ${project.color}22`,
                        color: project.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More projects CTA */}
        <div className={`text-center mt-12 reveal ${visible ? 'visible' : ''} reveal-delay-4`}>
          <a
            href={`https://github.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <span>View More on GitHub</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
