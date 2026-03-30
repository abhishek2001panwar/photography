'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Button from './Button'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const [inView, setInView] = useState(false)
  const [textInView, setTextInView] = useState(false)

  // 👇 Intersection trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setTextInView(true), 100)
          setTimeout(() => setInView(true), 250)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // 👇 PARALLAX EFFECT
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return

      const rect = imageRef.current.getBoundingClientRect()
      const offset = rect.top * 0.15

      imageRef.current.style.transform = `translateY(${offset}px) scale(1.05)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .line-hidden {
          opacity: 0;
          transform: translateY(40px);
        }

        .line-visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.9s cubic-bezier(0.16,1,0.3,1);
        }

        .img-reveal {
          transform: translateX(120px);
          opacity: 0;
        }

        .img-visible {
          transform: translateX(0);
          opacity: 1;
          transition: all 1.2s cubic-bezier(0.16,1,0.3,1);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full bg-[#e8e0d5] flex flex-col md:flex-row overflow-hidden"
      >

        {/* LEFT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-14 lg:px-24 py-12 sm:py-16 md:py-20 lg:py-0 space-y-6 md:space-y-8 min-h-auto md:min-h-screen">

          <p className={`text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8b6840] ${textInView ? 'line-visible' : 'line-hidden'}`}>
            Why Florida?
          </p>

          <h2 className="font-light text-[#1e140a] leading-[1.05]">
            {["WE SHAPE", "THE ESSENCE", "OF LIVING"].map((line, i) => (
              <div
                key={i}
                className={`${textInView ? 'line-visible' : 'line-hidden'}`}
                style={{
                  transitionDelay: `${i * 120 + 100}ms`,
                  fontSize: 'clamp(1.75rem, 6vw, 3.5rem)',
                }}
              >
                {line}
              </div>
            ))}
          </h2>

          <p
            className={`text-sm sm:text-base text-[#4a3728] leading-[1.8] max-w-[100%] md:max-w-[420px] ${
              textInView ? 'line-visible' : 'line-hidden'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            We envision spaces that are not just lived in, but felt — where
            every element has been curated to inspire connection, serenity,
            and a profound sense of belonging.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8 ${
              textInView ? 'line-visible' : 'line-hidden'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <Button variant="filled">Projects</Button>
            <Button variant="outline">Our Vision</Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full md:w-1/2 h-[300px] sm:h-[380px] md:h-[500px] lg:h-[80vh] xl:h-screen overflow-hidden">

          <div
            ref={imageRef}
            className={`absolute inset-0 ${inView ? 'img-visible' : 'img-reveal'}`}
          >
            <Image
              src="https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg"
              alt="Architecture"
              fill
              className="object-cover"
              priority
            />

            {/* subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
          </div>
        </div>
      </section>
    </>
  )
}