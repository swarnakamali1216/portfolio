'use client'
import { useEffect, useState } from 'react'

interface Message {
  _id: string; name: string; email: string
  message: string; read: boolean; createdAt: string
}

interface VisitorStats {
  total: number; today: number; week: number
  mobile: number; desktop: number
  byPage:    { _id: string; count: number }[]
  byBrowser: { _id: string; count: number }[]
  recent:    { device: string; browser: string; createdAt: string }[]
}

interface ContactStats { count: number; messages: Message[] }

const BACKEND = 'http://localhost:5000'

export default function AdminPage() {
  const [contacts,  setContacts]  = useState<ContactStats | null>(null)
  const [visitors,  setVisitors]  = useState<VisitorStats | null>(null)
  const [selected,  setSelected]  = useState<Message | null>(null)
  const [tab,       setTab]       = useState<'messages' | 'visitors'>('messages')
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${BACKEND}/api/contact/messages`).then(r => r.json()),
      fetch(`${BACKEND}/api/visitors/stats`).then(r => r.json()),
    ]).then(([c, v]) => {
      setContacts(c)
      setVisitors(v)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#0C1A2E] flex items-center justify-center">
      <div className="text-sky-400 font-mono text-sm animate-pulse">Loading dashboard...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0C1A2E] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bold text-2xl text-white">
              Swarna<span className="italic text-sky-400">.</span>T — Admin
            </h1>
            <p className="text-white/40 text-xs font-mono mt-1">Portfolio Dashboard</p>
          </div>
          <a href="/" className="text-xs font-mono text-white/30 hover:text-sky-400 transition-colors">
            ← Portfolio
          </a>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Visitors',  value: visitors?.total    ?? 0, color: 'sky' },
            { label: 'Today',           value: visitors?.today    ?? 0, color: 'green' },
            { label: 'This Week',       value: visitors?.week     ?? 0, color: 'purple' },
            { label: 'Total Messages',  value: contacts?.count    ?? 0, color: 'orange' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs font-mono text-white/40 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Device Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-4">Device Split</div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-400">{visitors?.mobile ?? 0}</div>
                <div className="text-xs text-white/40 mt-1">📱 Mobile</div>
              </div>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all"
                  style={{ width: visitors?.total ? `${(visitors.mobile / visitors.total) * 100}%` : '0%' }}
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{visitors?.desktop ?? 0}</div>
                <div className="text-xs text-white/40 mt-1">🖥️ Desktop</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-4">Top Browsers</div>
            <div className="space-y-2">
              {visitors?.byBrowser.slice(0, 3).map((b, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-white/60">{b._id}</span>
                  <span className="text-sm font-mono text-sky-400">{b.count}</span>
                </div>
              ))}
              {(!visitors?.byBrowser?.length) && (
                <div className="text-sm text-white/25 font-mono">No data yet</div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['messages', 'visitors'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all
                ${tab === t ? 'bg-sky-500 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10">
                <h2 className="font-mono text-xs font-bold tracking-[3px] uppercase text-white/50">
                  All Messages ({contacts?.count ?? 0})
                </h2>
              </div>
              <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
                {contacts?.messages.length === 0 && (
                  <div className="p-8 text-center text-white/30 text-sm font-mono">No messages yet</div>
                )}
                {contacts?.messages.map(msg => (
                  <button key={msg._id} onClick={() => setSelected(msg)}
                    className={`w-full text-left px-5 py-4 hover:bg-white/5 transition-colors
                      ${selected?._id === msg._id ? 'bg-sky-500/10 border-l-2 border-sky-400' : ''}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">{msg.name}</span>
                      <span className="text-[10px] font-mono text-white/30">
                        {new Date(msg.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div className="text-xs text-white/40 mb-1">{msg.email}</div>
                    <div className="text-xs text-white/30 truncate">{msg.message}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10">
                <h2 className="font-mono text-xs font-bold tracking-[3px] uppercase text-white/50">Detail</h2>
              </div>
              {!selected ? (
                <div className="p-8 text-center text-white/20 text-sm font-mono">Click a message to view</div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/30
                      flex items-center justify-center text-sky-400 font-bold text-sm">
                      {selected.name[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{selected.name}</div>
                      <div className="text-xs text-white/40">{selected.email}</div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 mb-5">
                    <p className="text-sm text-white/70 leading-relaxed">{selected.message}</p>
                  </div>
                  <div className="text-xs font-mono text-white/25 mb-5">
                    {new Date(selected.createdAt).toLocaleString('en-IN')}
                  </div>
                  <a href={`mailto:${selected.email}?subject=Re: Your message on my portfolio`}
                    className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600
                      text-white font-semibold text-sm rounded-xl py-3 transition-colors">
                    ✉ Reply to {selected.name}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Visitors Tab */}
        {tab === 'visitors' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10">
              <h2 className="font-mono text-xs font-bold tracking-[3px] uppercase text-white/50">
                Recent Visitors
              </h2>
            </div>
            <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
              {visitors?.recent.length === 0 && (
                <div className="p-8 text-center text-white/30 text-sm font-mono">No visitors yet</div>
              )}
              {visitors?.recent.map((v, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{v.device === 'mobile' ? '📱' : '🖥️'}</span>
                    <div>
                      <div className="text-sm text-white/60">{v.browser}</div>
                      <div className="text-xs text-white/30">{v.device}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-white/30">
                    {new Date(v.createdAt).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
