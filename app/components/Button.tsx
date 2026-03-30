'use client'

import { useRef } from 'react'

export default function Button({
  children,
  variant = 'filled',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'filled' | 'outline'
    className?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    ref.current!.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = `translate(0px, 0px)`
    }
  }

  return (
    <button
      ref={ref}

      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}

      className={`inline-flex items-center rounded-full font-body text-[10px] tracking-[0.28em] uppercase transition-all duration-300 ${
        variant === 'filled'
          ? 'bg-[#2a1f14] text-[#f0ece6] px-7 py-3.5 hover:bg-[#3d2c1e]'
          : 'border border-[#2a1f14]/30 text-[#2a1f14] px-7 py-3 hover:border-[#2a1f14]/60'
      } ${className}`}
    >
     {children}
    </button>
  )
}