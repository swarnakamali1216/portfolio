import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import '../styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Swarna T. — AI Engineer & Full-Stack Developer',
  description:
    'Portfolio of Swarna T., B.Tech AI & Data Science graduate. Specialising in Machine Learning, NLP, and Full-Stack development. Open to AI/ML internship roles.',
  keywords: ['AI Engineer', 'Machine Learning', 'Next.js', 'NLP', 'Full Stack', 'Swarna T.'],
  authors: [{ name: 'Swarna T.' }],
  openGraph: {
    title: 'Swarna T. — AI Engineer & Full-Stack Developer',
    description: 'B.Tech AI & Data Science · CGPA 8.2 · 3 ML Internships',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${grotesk.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
