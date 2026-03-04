'use client'
import { useState } from 'react'
import { useReveal } from '@/lib/useReveal'
import { personal } from '@/data/portfolio'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { ref, visible } = useReveal()
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong.')
      }

      setStatus('success')
      setForm({ name: '', email: '', message: '' })

    } catch (err: unknown) {
      setStatus('error')
      setErrMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.')
    }
  }

  const reset = () => { setStatus('idle'); setErrMsg('') }

  return (
    <section
      id="contact"
      className="section-base"
      style={{ background: 'linear-gradient(135deg, #0c1a2e 0%, #0369a1 100%)' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8" ref={ref}>

        {/* ── Header ─────────────────────────────────────── */}
        <div className={`text-center mb-14 reveal ${visible ? 'visible' : ''}`}>
          <div className="eyebrow justify-center" style={{ color: '#7dd3fc' }}>
            Contact
          </div>
          <h2 className="font-display text-[clamp(32px,5vw,52px)] font-bold text-white">
            Let&apos;s <em className="italic text-sky-300">Connect</em>
          </h2>
          <p className="mt-3 text-sky-200/70 max-w-lg mx-auto text-[15px] leading-relaxed">
            Open to <span className="text-sky-300 font-semibold">full-time jobs</span> &amp;{' '}
            <span className="text-sky-300 font-semibold">internships</span> in AI, ML, and Full-Stack.
            Collaborations and exciting projects welcome too!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Left — Info ─────────────────────────────── */}
          <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-1`}>

            {/* Contact links */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: '✉', label: 'Email',    val: personal.email,    href: `mailto:${personal.email}` },
                { icon: '📞', label: 'Phone',    val: personal.phone,    href: `tel:${personal.phone}` },
                { icon: '📍', label: 'Location', val: personal.location, href: '#' },
                { icon: '💼', label: 'LinkedIn', val: personal.linkedin, href: `https://${personal.linkedin}` },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.07] border border-white/10
                    hover:bg-white/[0.12] hover:border-sky-400/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30
                    flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-sky-300/60 uppercase tracking-wider">{item.label}</div>
                    <div className="text-[13px] font-semibold text-white group-hover:text-sky-200 transition-colors">
                      {item.val}
                    </div>
                  </div>
                  <span className="ml-auto text-sky-400/50 group-hover:text-sky-300 transition-colors">›</span>
                </a>
              ))}
            </div>

            {/* Availability badge — UPDATED: jobs + intern */}
            <div className="p-5 rounded-2xl bg-sky-500/[0.12] border border-sky-400/25">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="font-mono text-[11px] text-green-300 font-bold uppercase tracking-widest">
                  Available Now
                </span>
              </div>
              <p className="text-sky-200/70 text-[13px] leading-relaxed mb-4">
                Actively seeking <strong className="text-sky-200">full-time job</strong> roles and{' '}
                <strong className="text-sky-200">internship</strong> opportunities in AI, Machine Learning,
                and Full-Stack Development. Ready to start immediately.
              </p>
              {/* Role chips */}
              <div className="flex flex-wrap gap-2">
                {['AI Engineer', 'ML Engineer', 'Full-Stack Dev', 'Data Scientist', 'NLP Engineer'].map(r => (
                  <span
                    key={r}
                    className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full
                      bg-sky-500/20 border border-sky-400/30 text-sky-200"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — Form ────────────────────────────── */}
          <div className={`reveal ${visible ? 'visible' : ''} reveal-delay-2`}>
            <div className="bg-white/[0.07] border border-white/[0.10] rounded-3xl p-7 backdrop-blur-xl">

              {/* ── SUCCESS STATE ── */}
              {status === 'success' ? (
                <div className="text-center py-10">
                  {/* Animated checkmark circle */}
                  <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400/50
                    flex items-center justify-center mx-auto mb-5"
                    style={{ animation: 'fadeUp 0.5s ease both' }}>
                    <span className="text-4xl">✓</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-sky-200/70 text-[14px] leading-relaxed mb-2">
                    Thanks for reaching out! I&apos;ve received your message and will reply within
                    <span className="text-sky-300 font-semibold"> 24–48 hours</span>.
                  </p>
                  <p className="text-sky-300/50 text-[12px] mb-8">
                    A confirmation email has been sent to your inbox.
                  </p>
                  <button
                    onClick={reset}
                    className="btn-secondary text-[13px] text-white border-white/20 hover:border-sky-300"
                  >
                    Send Another Message
                  </button>
                </div>

              ) : (
                /* ── FORM STATE ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="font-mono text-[11px] text-sky-300/60 uppercase tracking-[3px]">
                    Send a Message
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block font-mono text-[11px] text-sky-300/60 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      disabled={status === 'loading'}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-[14px]
                        placeholder-sky-300/25 focus:outline-none focus:border-sky-400 focus:bg-white/15
                        transition-all font-body disabled:opacity-50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-mono text-[11px] text-sky-300/60 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      disabled={status === 'loading'}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-[14px]
                        placeholder-sky-300/25 focus:outline-none focus:border-sky-400 focus:bg-white/15
                        transition-all font-body disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-mono text-[11px] text-sky-300/60 uppercase tracking-wider mb-1.5">
                      Message <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about the opportunity, project, or collaboration..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      disabled={status === 'loading'}
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-[14px]
                        placeholder-sky-300/25 focus:outline-none focus:border-sky-400 focus:bg-white/15
                        transition-all resize-none font-body disabled:opacity-50"
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/15 border border-red-400/30">
                      <span className="text-lg mt-0.5">⚠️</span>
                      <div>
                        <div className="text-[12px] font-semibold text-red-300 mb-0.5">Failed to send</div>
                        <div className="text-[12px] text-red-300/70">{errMsg}</div>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-primary justify-center py-3.5 text-[14px]
                      disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2.5">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending your message...
                      </span>
                    ) : (
                      <>Send Message <span>→</span></>
                    )}
                  </button>

                  <p className="text-[11px] text-sky-300/40 text-center">
                    You&apos;ll receive a confirmation email after sending.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
