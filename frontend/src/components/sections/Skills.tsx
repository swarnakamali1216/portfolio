'use client'
import { useState } from 'react'
import { useReveal } from '@/lib/useReveal'
import { skills } from '@/data/portfolio'

const categories = Object.keys(skills)

export default function Skills() {
  const [active, setActive] = useState(categories[0])
  const { ref, visible }    = useReveal()

  const currentSkills = skills[active as keyof typeof skills]

  return (
    <section id="skills" className="section-base bg-sky-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8" ref={ref}>

        {/* Header */}
        <div className={`text-center mb-14 reveal ${visible ? 'visible' : ''}`}>
          <div className="eyebrow justify-center">Skills</div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-bold text-ink">
            What I <em className="italic text-sky-500">Know</em>
          </h2>
          <p className="mt-3 text-ink-soft max-w-md mx-auto text-[15px]">
            Technical toolkit spanning AI, data science, and full-stack web development.
          </p>
        </div>

        {/* Category tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 reveal ${visible ? 'visible' : ''} reveal-delay-1`}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-xl font-mono text-[12px] font-semibold transition-all duration-200
                ${active === cat
                  ? 'bg-sky-500 text-white shadow-sky-md'
                  : 'bg-white border border-sky-100 text-ink-soft hover:border-sky-300 hover:text-sky-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
          {currentSkills.map((skill, i) => (
            <div
              key={`${active}-${skill.name}`}
              className="card p-5 group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-[13px] text-ink">{skill.name}</span>
                <span className="font-mono text-[12px] font-bold text-sky-600">{skill.level}%</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-sky-50 border border-sky-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? `${skill.level}%` : '0%',
                    background: 'linear-gradient(90deg, #38bdf8, #0ea5e9, #0284c7)',
                    transitionDelay: `${0.3 + i * 0.06}s`,
                    boxShadow: '0 0 8px rgba(14,165,233,0.4)',
                  }}
                />
              </div>

              {/* Level label */}
              <div className="mt-2 font-mono text-[9px] text-ink-muted uppercase tracking-wider">
                {skill.level >= 90 ? '★ Expert' : skill.level >= 80 ? '◆ Advanced' : '● Proficient'}
              </div>
            </div>
          ))}
        </div>

        {/* All skills pill cloud */}
        <div className={`mt-12 text-center reveal ${visible ? 'visible' : ''} reveal-delay-3`}>
          <div className="font-mono text-[10px] text-ink-muted uppercase tracking-[3px] mb-5">All Technologies</div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Scikit-learn',
              'Pandas', 'NumPy', 'Next.js', 'React', 'TypeScript', 'Node.js',
              'Express.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion',
              'Feature Engineering', 'Model Evaluation', 'Data Preprocessing',
              'Logistic Regression', 'TF-IDF', 'Classification', 'Regression',
            ].map(s => (
              <span key={s} className="skill-pill text-[11px]">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
