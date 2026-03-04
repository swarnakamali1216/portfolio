import { Request, Response } from 'express'
import { validationResult }  from 'express-validator'
import { sendContactEmail }  from '../services/email.service'

export async function sendContact(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ error: errors.array()[0].msg })
    return
  }

  const { name, email, message } = req.body as {
    name: string; email: string; message: string
  }

  try {
    await sendContactEmail({ name, email, message })
    console.log('[Contact] Email sent from: ' + name)
    res.status(200).json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[Contact] Error:', msg)
    res.status(500).json({ error: msg })
  }
}

export async function checkConfig(req: Request, res: Response): Promise<void> {
  res.json({
    GMAIL_USER:     process.env.GMAIL_USER     ? 'set: ' + process.env.GMAIL_USER : 'MISSING',
    GMAIL_PASS:     process.env.GMAIL_PASS     ? 'set (' + process.env.GMAIL_PASS.length + ' chars)' : 'MISSING',
    RECEIVER_EMAIL: process.env.RECEIVER_EMAIL ? 'set: ' + process.env.RECEIVER_EMAIL : 'MISSING',
    MONGO_URI:      process.env.MONGO_URI      ? 'set' : 'not set',
  })
}

export async function getMessages(req: Request, res: Response): Promise<void> {
  res.json({ message: 'ok' })
}