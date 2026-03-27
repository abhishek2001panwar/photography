'use client'

import { useEffect, useRef, useState } from 'react'

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [scale, setScale] = useState(0.85)

  // 🎬 Scroll scale effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      let progress = 1 - rect.top / windowHeight
      progress = Math.max(0, Math.min(1, progress))

      const newScale = 0.85 + progress * 0.15
      setScale(newScale)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ▶️ Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return

    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  // 🔊 Mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return

    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  return (
    <div
      ref={sectionRef}
      className="w-full h-[120vh] bg-black flex items-center justify-center"
    >
      {/* VIDEO WRAPPER */}
      <div
        className="relative w-full h-screen overflow-hidden transition-transform duration-300"
        style={{ transform: `scale(${scale})` }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        >
          <source
            src="https://arccagroup.us/wp-content/uploads/2025/07/Video-Arcca-Renders.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* ▶️ Play Button */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-20 group"
          >
            <div className="w-20 h-20 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition">
              <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[10px] border-y-transparent ml-1"></div>
            </div>
          </button>
        )}

        {/* 🔊 Mute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 text-white text-sm tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-md hover:bg-black/60 transition"
        >
          {isMuted ? 'UNMUTE' : 'MUTE'}
        </button>
      </div>
    </div>
  )
}