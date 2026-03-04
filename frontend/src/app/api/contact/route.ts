import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name:    string
  email:   string
  message: string
}

const rateMap = new Map<string, { count: number; ts: number }>()
function limited(ip: string): boolean {
  const now = Date.now()
  const e   = rateMap.get(ip)
  if (!e || now - e.ts > 60_000) { rateMap.set(ip, { count: 1, ts: now }); return false }
  if (e.count >= 3) return true
  e.count++
  return false
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    if (limited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 })
    }

    const body: ContactPayload = await req.json()
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
    }

    // Send notification to Swarna
    const res1 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:    'Portfolio <onboarding@resend.dev>',
        to:      ['swarnakamali12@gmail.com'],
        subject: `💼 Portfolio Message from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
            <div style="background:linear-gradient(135deg,#0EA5E9,#0369A1);padding:32px;border-radius:16px 16px 0 0">
              <h1 style="color:white;margin:0;font-size:24px">New Portfolio Message ✉️</h1>
            </div>
            <div style="background:white;padding:32px;border:1px solid #E0F2FE;border-radius:0 0 16px 16px">
              <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
                <tr><td style="padding:8px 0;color:#94A3B8;font-size:12px;width:80px">NAME</td>
                    <td style="padding:8px 0;font-weight:700;color:#0C1A2E">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#94A3B8;font-size:12px">EMAIL</td>
                    <td style="padding:8px 0;font-weight:700;color:#0EA5E9">
                      <a href="mailto:${email}" style="color:#0EA5E9">${email}</a></td></tr>
              </table>
              <div style="background:#F0F9FF;border-left:4px solid #0EA5E9;padding:20px;border-radius:0 12px 12px 0;margin-bottom:24px">
                <p style="margin:0;color:#334155;line-height:1.8;white-space:pre-wrap">${message}</p>
              </div>
              <a href="mailto:${email}?subject=Re: Your message on Swarna.T Portfolio"
                 style="display:inline-block;background:#0EA5E9;color:white;padding:12px 28px;border-radius:10px;font-weight:700;text-decoration:none">
                Reply to ${name} →
              </a>
            </div>
          </div>
        `,
      }),
    })

    if (!res1.ok) {
      const err = await res1.json()
      console.error('[Resend Error]', err)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    // Send auto-reply to sender
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:    'Swarna T. <onboarding@resend.dev>',
        to:      [email],
        subject: `Got your message, ${name}! — Swarna.T`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px">
            <div style="background:linear-gradient(135deg,#0EA5E9,#0369A1);padding:36px;border-radius:16px 16px 0 0;text-align:center">
              <h1 style="color:white;margin:0;font-size:36px;font-family:Georgia,serif">Swarna<em style="color:#7DD3FC">.</em>T</h1>
              <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase">AI Engineer · Full-Stack Developer</p>
            </div>
            <div style="background:white;padding:36px;border:1px solid #E0F2FE;border-radius:0 0 16px 16px">
              <h2 style="color:#0C1A2E;font-family:Georgia,serif">Hi ${name}, thanks for reaching out! 👋</h2>
              <p style="color:#64748B;line-height:1.8">
                I've received your message and will get back to you within
                <strong style="color:#0284C7">24–48 hours</strong>.
              </p>
              <div style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:12px;padding:20px;margin-top:24px">
                <p style="margin:0;font-size:13px;color:#334155;line-height:1.9">
                  🎓 B.Tech AI &amp; Data Science · CGPA 8.2<br>
                  🤖 3 ML Internships · Thedal Cloud, Cognifyz, Saiket<br>
                  💼 Open to Full-Time Jobs &amp; Internships<br>
                  📍 Thoothukudi, Tamil Nadu
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    })

    // Also save to Railway backend (non-blocking)
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:5000'
    fetch(`${backendUrl}/api/contact`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
    }).catch(() => {})

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('[Contact Error]', err)
    return NextResponse.json({ error: 'Could not send message. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}