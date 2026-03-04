// src/services/email.service.ts
// All Nodemailer logic lives here — controller stays clean

import nodemailer from 'nodemailer'
import { Contact } from '../models/Contact'

// ── Transporter (created once, reused) ────────────────────
function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error('GMAIL_USER and GMAIL_PASS must be set in .env')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // 16-char App Password
    },
  })
}

// ── HTML: Email Swarna receives ───────────────────────────
function buildReceiverHtml(name: string, email: string, message: string): string {
  const time = new Date().toLocaleString('en-IN', {
    timeZone:  'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Portfolio Message</title></head>
<body style="margin:0;padding:0;background:#F0F9FF;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#F0F9FF">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(14,165,233,0.12)">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0EA5E9,#0369A1);padding:32px 40px">
          <div style="font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:8px">PORTFOLIO CONTACT</div>
          <div style="font-family:Georgia,serif;font-size:26px;font-weight:700;color:white">New message from your portfolio ✉️</div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:36px 40px">

          <!-- Sender details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:14px;padding:20px;margin-bottom:28px">
            <tr><td>
              <div style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#0284C7;margin-bottom:14px">SENDER DETAILS</div>
              <table cellpadding="0" cellspacing="0">
                <tr><td style="padding:5px 0">
                  <span style="font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:1px;display:inline-block;width:75px">Name</span>
                  <span style="font-size:14px;font-weight:700;color:#0C1A2E">${name}</span>
                </td></tr>
                <tr><td style="padding:5px 0">
                  <span style="font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:1px;display:inline-block;width:75px">Email</span>
                  <a href="mailto:${email}" style="font-size:14px;font-weight:700;color:#0EA5E9;text-decoration:none">${email}</a>
                </td></tr>
                <tr><td style="padding:5px 0">
                  <span style="font-size:11px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:1px;display:inline-block;width:75px">Time</span>
                  <span style="font-size:14px;font-weight:700;color:#0C1A2E">${time} IST</span>
                </td></tr>
              </table>
            </td></tr>
          </table>

          <!-- Message -->
          <div style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#94A3B8;margin-bottom:12px">MESSAGE</div>
          <div style="background:#F8FBFF;border-left:4px solid #0EA5E9;border-radius:0 12px 12px 0;padding:20px 24px;font-size:15px;color:#334155;line-height:1.8;white-space:pre-wrap">${message}</div>

          <!-- Reply CTA -->
          <div style="margin-top:28px;text-align:center">
            <a href="mailto:${email}?subject=Re: Your message on Swarna.T Portfolio"
               style="display:inline-block;background:linear-gradient(135deg,#0EA5E9,#0284C7);color:white;padding:14px 36px;border-radius:12px;font-weight:700;font-size:14px;text-decoration:none;box-shadow:0 4px 16px rgba(14,165,233,0.35)">
              Reply to ${name} →
            </a>
          </div>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:18px 40px 26px;border-top:1px solid #E0F2FE;text-align:center">
          <div style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#0C1A2E;margin-bottom:4px">Swarna<em style="color:#0EA5E9">.</em>T Portfolio</div>
          <div style="font-size:11px;color:#94A3B8">AI Engineer · Full-Stack Developer · Thoothukudi, TN</div>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

// ── HTML: Auto-reply to sender ─────────────────────────────
function buildAutoReplyHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Message Received</title></head>
<body style="margin:0;padding:0;background:#F0F9FF;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#F0F9FF">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:white;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(14,165,233,0.10)">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0EA5E9,#0369A1);padding:36px 40px;text-align:center">
          <div style="font-family:Georgia,serif;font-size:38px;font-weight:700;color:white;letter-spacing:-1px;margin-bottom:6px">Swarna<em style="font-style:normal;color:#7DD3FC">.</em>T</div>
          <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.6)">AI ENGINEER · FULL-STACK DEVELOPER</div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px">
          <div style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#0C1A2E;margin-bottom:14px">Hi ${name}, thanks for reaching out! 👋</div>
          <p style="font-size:15px;color:#64748B;line-height:1.8;margin:0 0 16px">
            I've received your message and will get back to you within
            <strong style="color:#0284C7">24–48 hours</strong>.
          </p>
          <p style="font-size:15px;color:#64748B;line-height:1.8;margin:0 0 28px">
            Feel free to connect with me on LinkedIn in the meantime!
          </p>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px">
            <tr>
              <td style="padding-right:12px">
                <a href="https://linkedin.com/in/swarna-t-"
                   style="display:inline-block;background:#0EA5E9;color:white;padding:11px 24px;border-radius:10px;font-weight:700;font-size:13px;text-decoration:none">
                  LinkedIn ↗
                </a>
              </td>
              <td>
                <a href="mailto:swarnakamali12@gmail.com"
                   style="display:inline-block;background:white;color:#0284C7;padding:10px 24px;border-radius:10px;font-weight:700;font-size:13px;text-decoration:none;border:1.5px solid #BAE6FD">
                  Direct Email
                </a>
              </td>
            </tr>
          </table>

          <!-- Quick facts -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:14px;padding:18px 22px">
            <tr><td>
              <div style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#0284C7;margin-bottom:10px">ABOUT ME</div>
              <div style="font-size:13px;color:#334155;line-height:1.9">
                🎓 B.Tech AI &amp; Data Science · CGPA 8.2<br>
                🤖 3 ML Internships · Thedal Cloud, Cognifyz, Saiket<br>
                💼 Open to Full-Time Jobs &amp; Internships<br>
                📍 Thoothukudi, Tamil Nadu
              </div>
            </td></tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:16px 40px 24px;border-top:1px solid #E0F2FE;text-align:center">
          <div style="font-size:11px;color:#94A3B8">This is an automated reply. Please do not reply to this email.</div>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

// ── Public function ────────────────────────────────────────
export interface EmailPayload {
  name:    string
  email:   string
  message: string
}

export async function sendContactEmail({ name, email, message }: EmailPayload): Promise<void> {
  const transporter = createTransporter()
  const receiver    = process.env.RECEIVER_EMAIL ?? process.env.GMAIL_USER!

  // 1. Send to Swarna
  await transporter.sendMail({
    from:    `"${name}" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to:      receiver,
    subject: `💼 Portfolio Message from ${name}`,
    html:    buildReceiverHtml(name, email, message),
    text:    `From: ${name} <${email}>\n\n${message}`,
  })

  // 2. Auto-reply to sender
  await transporter.sendMail({
    from:    `"Swarna T." <${process.env.GMAIL_USER}>`,
    to:      email,
    subject: `Got your message, ${name}! — Swarna.T`,
    html:    buildAutoReplyHtml(name),
    text:    `Hi ${name},\n\nThanks for reaching out! I'll reply within 24–48 hours.\n\nBest,\nSwarna T.\nAI Engineer · swarnakamali12@gmail.com`,
  })

  // 3. Save to MongoDB (if connected)
  try {
    await Contact.create({ name, email, message, status: 'pending' })
    console.log(`[Email] ✅ Message saved to MongoDB: ${email}`)
  } catch (dbErr) {
    console.warn('[Email] ⚠️  Could not save to MongoDB (optional):', dbErr instanceof Error ? dbErr.message : dbErr)
    // Don't throw — email was already sent successfully
  }
}
