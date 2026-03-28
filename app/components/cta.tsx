'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function CTASection() {
  const [inView, setInView]   = useState(false)
  const [email, setEmail]     = useState('')
  const [submitted, setSubmit] = useState(false)
  const [focused, setFocused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmit(true)
    setEmail('')
  }

  return (
    <>
      <style>{`
       

        /* Grain texture */
        .cta-grain {
          position: relative;
        }
        .cta-grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.045'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.55;
          mix-blend-mode: multiply;
        }

        /* Word reveal */
        .word-mask { overflow: hidden; display: inline-block; }
        .word-inner {
          display: inline-block;
          transform: translateY(110%);
          transition: transform 1s cubic-bezier(0.16,1,0.3,1);
        }
        .word-inner.revealed { transform: translateY(0); }

        /* Fade up */
        .fade-up {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }

        /* Image float-in */
        .img-float {
          opacity: 0; transform: translateY(16px) scale(0.97);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .img-float.show { opacity: 1; transform: translateY(0) scale(1); }

        /* Subtle image hover */
        .img-hover { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .img-hover:hover { transform: scale(1.03) rotate(-0.5deg); }

        /* Email input */
        .email-line {
          border: none;
          border-bottom: 1px solid rgba(42,31,20,0.3);
          background: transparent;
          outline: none;
          width: 100%;
          transition: border-color 0.3s ease;
          font-family: 'Didact Gothic', sans-serif;
        }
        .email-line:focus { border-bottom-color: #2a1f14; }
        .email-line::placeholder { color: rgba(42,31,20,0.35); }

        /* Submit arrow button */
        .submit-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          background: #2a1f14; color: #f0ece6;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .submit-arrow:hover { background: #1a1209; transform: scale(1.08); }

        /* Talk to us pill */
        .talk-pill {
          display: inline-flex; align-items: center;
          background: #2a1f14; color: #f0ece6;
          border-radius: 999px;
          font-family: 'Didact Gothic', sans-serif;
          font-size: 10px; letter-spacing: 0.28em;
          text-transform: uppercase;
          padding: 14px 28px;
          transition: background 0.3s ease, letter-spacing 0.4s ease;
          text-decoration: none;
        }
        .talk-pill:hover { background: #1a1209; letter-spacing: 0.36em; }

        /* Success check */
        .check-circle {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid #8b6840;
          display: flex; align-items: center; justify-content: center;
          animation: popIn 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes popIn { from{transform:scale(0)} to{transform:scale(1)} }
      `}</style>

      <section
        ref={sectionRef}
        className="cta-grain relative w-full bg-[#ddd6cc] overflow-hidden"
      >
        {/* ── Content wrapper ── */}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 md:px-16 pt-20 md:pt-28 pb-20 md:pb-28">

          {/* ══════════════════════════════════
              EDITORIAL HEADLINE BLOCK
          ══════════════════════════════════ */}
          <div className="relative">

            {/* Row 1 — INSPIRED  [image right] */}
            <div className="relative flex items-baseline justify-between mb-0 md:mb-[-0.15em]">
              {/* Left body copy — positioned absolutely over the whitespace */}
              <div
                className={`hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 max-w-[240px] fade-up ${inView ? 'show' : ''}`}
                style={{ transitionDelay: '400ms' }}
              >
                <p className="font-body text-[#3d2c1e] text-[0.72rem] leading-[1.9] mb-3">
                  At Arcca Group, every project is conceived as a creation that transcends architecture — a space designed to{' '}
                  <strong className="font-body" style={{ fontWeight: 400, color: '#1e140a' }}>elevate everyday life</strong> through:
                </p>
                <p className="font-body text-[#3d2c1e] text-[0.72rem] leading-[1.9]">
                  luxury, exceptional craftsmanship,<br />and thoughtful design.
                </p>
              </div>

              {/* INSPIRED */}
              <div className="flex-1 flex justify-center lg:justify-start lg:pl-[30%]">
                <div className="word-mask">
                  <span
                    className={`word-inner font-display font-light text-[#2a1f14] leading-none ${inView ? 'revealed' : ''}`}
                    style={{
                      fontSize: 'clamp(4rem, 11vw, 13rem)',
                      letterSpacing: '-0.02em',
                      transitionDelay: '0ms',
                    }}
                  >
                    INSPIRED
                  </span>
                </div>
              </div>

              {/* Image 1 — dining room, top right */}
              <div
                className={`hidden md:block img-float img-hover flex-shrink-0 ${inView ? 'show' : ''}`}
                style={{
                  transitionDelay: '300ms',
                  width: 'clamp(140px, 16vw, 240px)',
                  aspectRatio: '4/3',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg"
                  alt="ARCCA interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Row 2 — DESIGN  [image inline]  BY */}
            <div className="flex items-baseline justify-start md:justify-center gap-4 md:gap-6 mb-0 md:mb-[-0.1em] flex-wrap md:flex-nowrap">

              <div className="word-mask">
                <span
                  className={`word-inner font-display font-light text-[#2a1f14] leading-none ${inView ? 'revealed' : ''}`}
                  style={{
                    fontSize: 'clamp(4rem, 11vw, 13rem)',
                    letterSpacing: '-0.02em',
                    transitionDelay: '80ms',
                  }}
                >
                  DESIGN
                </span>
              </div>

              {/* Image 2 — living room, inline between words */}
              <div
                className={`hidden md:block img-float img-hover self-center flex-shrink-0 ${inView ? 'show' : ''}`}
                style={{
                  transitionDelay: '350ms',
                  width: 'clamp(100px, 10vw, 160px)',
                  aspectRatio: '1/1',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  flexShrink: 0,
                  marginBottom: '0.1em',
                }}
              >
                <Image
                  src="https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg"
                  alt="ARCCA living"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="word-mask">
                <span
                  className={`word-inner font-display font-light text-[#2a1f14] leading-none ${inView ? 'revealed' : ''}`}
                  style={{
                    fontSize: 'clamp(4rem, 11vw, 13rem)',
                    letterSpacing: '-0.02em',
                    transitionDelay: '140ms',
                  }}
                >
                  BY
                </span>
              </div>
            </div>

            {/* Row 3 — ARCCA®  +  TALK TO US pill */}
            <div className="flex items-end justify-start md:justify-center gap-6 flex-wrap md:flex-nowrap">
              <div className="word-mask">
                <span
                  className={`word-inner font-display font-light text-[#2a1f14] leading-none ${inView ? 'revealed' : ''}`}
                  style={{
                    fontSize: 'clamp(4rem, 11vw, 13rem)',
                    letterSpacing: '-0.02em',
                    transitionDelay: '200ms',
                  }}
                >
                  ARCCA
                  <sup
                    className="font-display"
                    style={{
                      fontSize: '0.28em',
                      letterSpacing: 0,
                      verticalAlign: 'super',
                      lineHeight: 0,
                    }}
                  >
                    ®
                  </sup>
                </span>
              </div>

              {/* Talk to us pill — sits at baseline of ARCCA */}
              <div
                className={`fade-up mb-4 md:mb-6 ${inView ? 'show' : ''}`}
                style={{ transitionDelay: '500ms' }}
              >
                <a href="#contact" className="talk-pill">
                  Talk To Us
                </a>
              </div>
            </div>
          </div>

         


          {/* ══════════════════════════════════
              MOBILE body copy (shown below heading on mobile)
          ══════════════════════════════════ */}
          <div
            className={`lg:hidden fade-up mt-10 ${inView ? 'show' : ''}`}
            style={{ transitionDelay: '680ms' }}
          >
            <p className="font-body text-[#3d2c1e] text-sm leading-[1.9] max-w-sm">
              At Arcca Group, every project is conceived as a creation that transcends architecture — a space designed to{' '}
              <strong className="font-body" style={{ fontWeight: 400, color: '#1e140a' }}>elevate everyday life</strong>{' '}
              through luxury, exceptional craftsmanship, and thoughtful design.
            </p>
          </div>

        </div>

        {/* ── Bottom micro footer row ── */}
        <div
          className={`relative z-10 border-t border-[#2a1f1412] px-6 sm:px-10 md:px-16 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 fade-up ${inView ? 'show' : ''}`}
          style={{ transitionDelay: '750ms' }}
        >
          <p className="font-body text-[8.5px] tracking-[0.25em] text-[rgba(42,31,20,0.38)] uppercase">
            © 2025 ARCCA Group — All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms', 'Accessibility'].map(l => (
              <a
                key={l}
                href="#"
                className="font-body text-[8.5px] tracking-[0.22em] text-[rgba(42,31,20,0.38)] hover:text-[#2a1f14] transition-colors duration-200 uppercase"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}