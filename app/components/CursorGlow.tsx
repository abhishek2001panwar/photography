'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return

      glowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] z-50"
    >
      <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(180,148,100,0.25)_0%,transparent_70%)] blur-3xl" />
    </div>
  )
}