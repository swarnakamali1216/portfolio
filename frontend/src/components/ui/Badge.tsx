interface BadgeProps {
  children:  React.ReactNode
  variant?:  'sky' | 'green' | 'ink' | 'outline'
  size?:     'sm' | 'md'
  pulse?:    boolean
}

export default function Badge({
  children,
  variant = 'sky',
  size    = 'md',
  pulse   = false,
}: BadgeProps) {
  const variants = {
    sky:     'bg-sky-50 border-sky-200 text-sky-700',
    green:   'bg-green-50 border-green-200 text-green-700',
    ink:     'bg-ink/5 border-ink/10 text-ink-mid',
    outline: 'bg-white border-sky-200 text-sky-700',
  }
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-3 py-1',
  }

  return (
    <span className={`
      inline-flex items-center gap-1.5 border rounded-full font-mono font-semibold
      ${variants[variant]} ${sizes[size]}
    `}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
        </span>
      )}
      {children}
    </span>
  )
}
