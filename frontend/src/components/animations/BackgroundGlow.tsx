'use client'

export default function BackgroundGlow() {
  return (
    <>
      {/* Ambient orb top-right */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      {/* Ambient orb bottom-left */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(2,132,199,0.10) 0%, transparent 70%)',
          animation: 'float 14s ease-in-out infinite reverse',
        }}
      />
    </>
  )
}
