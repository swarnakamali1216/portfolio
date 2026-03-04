'use client'
import { useEffect } from 'react'

export function useVisitorTracking() {
  useEffect(() => {
    // Only track once per session
    if (sessionStorage.getItem('tracked')) return

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5000'

    fetch(`${backendUrl}/api/visitors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page:     'home',
        referrer: document.referrer || 'direct',
      }),
    }).then(() => {
      sessionStorage.setItem('tracked', 'true')
    }).catch(() => {
      // Silent fail — don't affect user experience
    })
  }, [])
}
