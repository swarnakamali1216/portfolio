'use client'
import { useEffect } from 'react'
import Navbar         from '@/components/layout/Navbar'
import Footer         from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CustomCursor   from '@/components/ui/CustomCursor'
import Hero           from '@/components/sections/Hero'
import About          from '@/components/sections/About'
import Skills         from '@/components/sections/Skills'
import Experience     from '@/components/sections/Experience'
import Projects       from '@/components/sections/Projects'
import Certifications from '@/components/sections/Certifications'
import Contact        from '@/components/sections/Contact'

export default function Home() {
  useEffect(() => {
    if (sessionStorage.getItem('tracked')) return
    fetch('http://localhost:5000/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'home', referrer: document.referrer || 'direct' })
    }).then(() => sessionStorage.setItem('tracked', 'true')).catch(() => {})
  }, [])

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}