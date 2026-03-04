import nodemailer from 'nodemailer'

function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error('GMAIL_USER and GMAIL_PASS must be set in .env')
  }
  return nodemailer.createTransport({
    host:   'smtp.gmail.com',
    port:   587,
    secure: false,
    family: 4,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  } as any)
}

export interface EmailPayload {
  name:    string
  email:   string
  message: string
}

export async function sendContactEmail({ name, email, message }: EmailPayload): Promise<void> {
  const transporter = createTransporter()
  const receiver    = process.env.RECEIVER_EMAIL ?? process.env.GMAIL_USER!

  await transporter.sendMail({
    from:    `"${name}" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to:      receiver,
    subject: `Portfolio Message from ${name}`,
    text:    `From: ${name} <${email}>\n\n${message}`,
  })

  await transporter.sendMail({
    from:    `"Swarna T." <${process.env.GMAIL_USER}>`,
    to:      email,
    subject: `Got your message, ${name}! - Swarna.T`,
    text:    `Hi ${name},\n\nThanks for reaching out! I will reply within 24-48 hours.\n\nBest,\nSwarna T.`,
  })
}