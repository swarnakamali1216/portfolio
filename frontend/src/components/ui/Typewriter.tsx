'use client'
import { useEffect, useState } from 'react'

interface TypewriterProps {
  words:    string[]
  speed?:   number   // ms per char (default 90)
  deleteSpeed?: number
  pauseMs?: number
}

export default function Typewriter({
  words,
  speed       = 90,
  deleteSpeed = 50,
  pauseMs     = 1800,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx,   setWordIdx]   = useState(0)
  const [charIdx,   setCharIdx]   = useState(0)
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const delay   = deleting ? deleteSpeed : speed

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pauseMs)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(i => (i + 1) % words.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx, words, speed, deleteSpeed, pauseMs])

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-0.5 h-5 bg-sky-500 ml-0.5 align-middle"
        style={{ animation: 'blink 0.8s ease infinite alternate' }}
      />
    </span>
  )
}
