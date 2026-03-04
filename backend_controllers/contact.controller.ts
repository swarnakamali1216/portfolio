import { Request, Response } from 'express'
import { validationResult }  from 'express-validator'
import { sendContactEmail }  from '../services/email.service'
import { Contact }           from '../models/Contact'

export async function sendContact(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ error: errors.array()[0].msg })
    return
  }

  const { name, email, message } = req.body as {
    name: string; email: string; message: string
  }

  // Save to MongoDB (non-blocking)
  try {
    await Contact.create({ name, email, message, ip: req.ip })
    console.log('[DB] Message saved from: ' + name)
  } catch (dbErr) {
    console.warn('[DB] Save skipped (DB offline):', dbErr)
  }

  // Send email
  try {
    await sendContactEmail({ name, email, message })
    console.log('[Email] Sent from: ' + name)
    res.status(200).json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Email] Error:', msg)
    res.status(500).json({ error: 'Failed to send message. Please email me directly at swarnakamali12@gmail.com' })
  }
}

export async function checkConfig(req: Request, res: Response): Promise<void> {
  const mongoose = await import('mongoose')
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
  res.json({
    gmail:    process.env.GMAIL_USER ? '✅ ' + process.env.GMAIL_USER : '❌ MISSING',
    password: process.env.GMAIL_PASS ? '✅ set (' + process.env.GMAIL_PASS.length + ' chars)' : '❌ MISSING',
    receiver: process.env.RECEIVER_EMAIL ?? '❌ MISSING',
    mongodb:  states[mongoose.default.connection.readyState] ?? 'unknown',
    mongo_uri: process.env.MONGO_URI ? '✅ set' : '❌ MISSING',
  })
}

export async function getMessages(req: Request, res: Response): Promise<void> {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(50)
    res.json({ count: messages.length, messages })
  } catch {
    res.status(500).json({ error: 'Database not connected' })
  }
}
