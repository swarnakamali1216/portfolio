// src/app/api/contact/route.ts
// Lightweight proxy → forwards contact form to Express backend
// Zero external packages = zero build errors

import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name:    string
  email:   string
  message: string
}

// Simple in-memory rate limit (per IP, 3 req/min)
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
    // Rate limit
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    if (limited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      )
    }

    // Validate body
    const body: ContactPayload = await req.json()
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Forward to Express backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000'

    const backendRes = await fetch(`${backendUrl}/api/contact`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        name:    name.trim(),
        email:   email.trim(),
        message: message.trim(),
      }),
    })

    const data = await backendRes.json()

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data.error ?? 'Failed to send message.' },
        { status: backendRes.status }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('[Contact Proxy Error]', err)
    return NextResponse.json(
      { error: 'Could not reach the server. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
