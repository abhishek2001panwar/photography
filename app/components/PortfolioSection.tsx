'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

const PROJECTS = [
  {
    id: 1,
    title: 'CASA ANTIBES',
    location: 'Coral Gables',
    category: 'RESIDENTIAL',
    year: '2024',
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',
  },
  {
    id: 2,
    title: 'CASA FERRARA',
    location: 'Pinecrest',
    category: 'RESIDENTIAL',
    year: '2024',
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',
  },
  {
    id: 3,
    title: 'VILLA SERENA',
    location: 'Coconut Grove',
    category: 'INTERIOR',
    year: '2023',
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',
  },
  {
    id: 4,
    title: 'CASA BISCAYNE',
    location: 'Miami Beach',
    category: 'ARCHITECTURE',
    year: '2023',
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',
  },
  {
    id: 5,
    title: 'RESIDENZA ALTA',
    location: 'Key Biscayne',
    category: 'RESIDENTIAL',
    year: '2022',
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',
  },
]

export default function PortfolioSection() {
  const [active, setActive]   = useState(0)
  const [prev, setPrev]       = useState<number | null>(null)
  const [dir, setDir]         = useState<'next' | 'prev'>('next')
  const [animating, setAnim]  = useState(false)
  const [inView, setInView]   = useState(false)
  const [hovered, setHovered] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const goTo = useCallback((next: number, direction: 'next' | 'prev' = 'next') => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, next))
    if (clamped === active || animating) return
    setDir(direction)
    setPrev(active)
    setActive(clamped)
    setAnim(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { setPrev(null); setAnim(false) }, 900)
  }, [active, animating])

  const goNext = () => goTo(active + 1, 'next')
  const goPrev = () => goTo(active - 1, 'prev')

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft')  goPrev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [active, animating])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const cur = PROJECTS[active]

  return (
    <>
      <style>{`
      

        /* Left panel fade-up */
        .fade-up { opacity:0; transform:translateY(24px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.show { opacity:1; transform:translateY(0); }

        /* Image crossfade */
        .img-slide {
          position:absolute; inset:0;
          transition: opacity 0s;
        }
        .img-slide.enter-next  { opacity:0; transform:scale(1.06); animation: enterNext 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-slide.enter-prev  { opacity:0; transform:scale(1.06); animation: enterPrev 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-slide.exit-next   { opacity:1; animation: exitNext  0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-slide.exit-prev   { opacity:1; animation: exitPrev  0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-slide.idle        { opacity:1; transform:scale(1); }

        @keyframes enterNext {
          from { opacity:0; transform:translateX(4%) scale(1.04); }
          to   { opacity:1; transform:translateX(0)  scale(1);    }
        }
        @keyframes enterPrev {
          from { opacity:0; transform:translateX(-4%) scale(1.04); }
          to   { opacity:1; transform:translateX(0)   scale(1);    }
        }
        @keyframes exitNext {
          from { opacity:1; transform:translateX(0)   scale(1);    }
          to   { opacity:0; transform:translateX(-3%) scale(0.98); }
        }
        @keyframes exitPrev {
          from { opacity:1; transform:translateX(0)  scale(1);    }
          to   { opacity:0; transform:translateX(3%) scale(0.98); }
        }

        /* Caption slide up */
        .caption-enter {
          animation: captionUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        @keyframes captionUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* Arrow button */
        .arrow-btn {
          width:52px; height:52px; border-radius:50%;
          border:1px solid rgba(240,236,230,0.35);
          background:rgba(240,236,230,0.08);
          backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          color:#f0ece6;
        }
        .arrow-btn:hover {
          background:rgba(240,236,230,0.22);
          border-color:rgba(240,236,230,0.7);
          transform:scale(1.08);
        }
        .arrow-btn:disabled {
          opacity:0.2; cursor:not-allowed; transform:none;
        }

        /* Counter */
        .count-num { font-variant-numeric: tabular-nums; }

        /* Progress dots */
        .dot {
          height:1.5px; border-radius:2px;
          background:rgba(240,236,230,0.35);
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease;
          cursor:pointer;
        }
        .dot.active-dot { background:rgba(240,236,230,0.9); }

        /* Divider line reveal */
        .line-reveal { width:0; transition: width 1s cubic-bezier(0.16,1,0.3,1) 0.4s; }
        .line-reveal.open { width:32px; }

        /* Image Ken Burns on idle */
        .kenburns { animation: kenburns 8s ease-in-out infinite alternate; }
        @keyframes kenburns {
          from { transform: scale(1)    translate(0,0); }
          to   { transform: scale(1.04) translate(-1%,-0.5%); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full h-screen flex overflow-hidden bg-[#1a1108]"
      >

        {/* ══════════════════════════════════════
            LEFT PANEL  — 25%
        ══════════════════════════════════════ */}
        <div className="relative z-10 flex flex-col justify-between w-[25%] shrink-0 px-10 py-14 bg-[#e5ddd3]">

          {/* Top block */}
          <div>
            {/* Monogram */}
          

            {/* Label */}
            <div
              className={`fade-up flex items-center gap-3  ${inView ? 'show' : ''}`}
              style={{ transitionDelay: '60ms' }}
            >
              <div className={`line-reveal h-px bg-[#8b6840] ${inView ? 'open' : ''}`} />
              <span className=" text-[9px] tracking-[0.35em] text-[#8b6840] uppercase">Portfolio</span>
            </div>

            {/* Heading */}
            <h2
              className={`fade-up font-display font-light text-[#1e140a] leading-[0.92] ${inView ? 'show' : ''}`}
              style={{ fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing:'-0.01em', transitionDelay: '100ms' }}
            >
              DESIGN,<br />
              <em className="not-italic" style={{ fontStyle:'italic' }}>Architecture</em><br />
              &amp; Interiors
            </h2>
          </div>

          {/* Bottom block — project info */}
          <div className={`fade-up ${inView ? 'show' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="h-px bg-[#2a1f1418] mb-6" />

            {/* Live project name — updates with carousel */}
            <p className="font-body text-[9px] tracking-[0.32em] text-[#8b6840] uppercase mb-2">
              Current Project
            </p>
            <p
              key={active}
              className="font-display text-[#1e140a] font-light leading-tight mb-1 caption-enter"
              style={{ fontSize: 'clamp(1.1rem,1.6vw,1.5rem)' }}
            >
              {cur.title}
            </p>
            <p
              key={`loc-${active}`}
              className="font-body text-[10px] tracking-[0.18em] text-[#8b6840] mb-6 caption-enter"
            >
              {cur.location} · {cur.year}
            </p>

            {/* Counter */}
            <div className="flex items-baseline gap-1 mb-4">
              <span
                key={`num-${active}`}
                className="font-display text-[#1e140a] font-light count-num caption-enter"
                style={{ fontSize: 'clamp(2rem,3vw,3rem)' }}
              >
                {String(active + 1).padStart(2,'0')}
              </span>
              <span className="font-body text-[#8b684080] text-xs tracking-widest">
                &thinsp;/&thinsp;{String(PROJECTS.length).padStart(2,'0')}
              </span>
            </div>

            {/* Progress line */}
            <div className="h-px w-full bg-[#2a1f1415] relative overflow-hidden rounded-full mb-6">
              <div
                className="absolute top-0 left-0 h-full bg-[#8b6840] rounded-full"
                style={{
                  width: `${((active + 1) / PROJECTS.length) * 100}%`,
                  transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </div>

            {/* View all link */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 group"
            >
              <span className="font-body text-[10px] tracking-[0.32em] text-[#2a1f14] group-hover:text-[#8b6840] transition-colors duration-300 uppercase">
                View All
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#2a1f14] group-hover:text-[#8b6840] transition-colors duration-300 group-hover:translate-x-0.5 transition-transform">
                <path d="M2 7h10M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT PANEL — 75% full-height image
        ══════════════════════════════════════ */}
        <div
          className="relative flex-1 h-full overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >

          {/* ── Previous image (exit) ── */}
          {prev !== null && animating && (
            <div className={`img-slide ${dir === 'next' ? 'exit-next' : 'exit-prev'}`}>
              <Image
                src={PROJECTS[prev].img}
                alt={PROJECTS[prev].title}
                fill
                className="object-cover object-center"
                draggable={false}
                priority
              />
            </div>
          )}

          {/* ── Active image (enter / idle) ── */}
          <div className={`img-slide ${animating ? (dir === 'next' ? 'enter-next' : 'enter-prev') : 'idle'}`}>
            <Image
              src={cur.img}
              alt={cur.title}
              fill
              className={`object-cover object-center ${!animating ? 'kenburns' : ''}`}
              draggable={false}
              priority
            />
          </div>

          {/* Scrim gradient — richer at bottom + left edge */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `
                linear-gradient(to top, rgba(14,9,4,0.78) 0%, rgba(14,9,4,0.25) 35%, transparent 65%),
                linear-gradient(to right, rgba(14,9,4,0.30) 0%, transparent 25%)
              `,
            }}
          />

          {/* ── Top-right: category tag ── */}
          <div className="absolute top-8 right-8 z-20">
            <div
              className="px-4 py-2 border border-[rgba(240,236,230,0.25)] backdrop-blur-md"
              style={{ background: 'rgba(14,9,4,0.45)' }}
            >
              <p className="font-body text-[9px] tracking-[0.32em] text-[#f0ece6] uppercase">
                {cur.category}
              </p>
            </div>
          </div>

          {/* ── Bottom caption ── */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-12 pb-12">
            <div className="flex items-end justify-between">

              {/* Title + location */}
              <div>
                <p
                  key={`cat-${active}`}
                  className=" text-[9px] tracking-[0.35em] text-[#c9a96e] uppercase mb-3 caption-enter"
                >
                  {cur.location}
                </p>
                <h3
                  key={`title-${active}`}
                  className="font-display font-light text-[#f0ece6] leading-none caption-enter"
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 4.2rem)' }}
                >
                  {cur.title}
                </h3>
              </div>

              {/* ── Arrow buttons — on image, bottom-right ── */}
              <div className="flex items-center gap-3 mb-1">
                <button
                  className="arrow-btn"
                  onClick={goPrev}
                  disabled={active === 0}
                  aria-label="Previous project"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="arrow-btn"
                  onClick={goNext}
                  disabled={active === PROJECTS.length - 1}
                  aria-label="Next project"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Dot strip */}
            <div className="flex items-center gap-2 mt-6">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > active ? 'next' : 'prev')}
                  className={`dot ${i === active ? 'active-dot' : ''}`}
                  style={{ width: i === active ? 36 : 14 }}
                  aria-label={`Go to ${PROJECTS[i].title}`}
                />
              ))}
            </div>
          </div>

          {/* Thin left-edge separator line */}
          <div className="absolute top-0 left-0 bottom-0 w-px bg-[rgba(229,221,211,0.15)] z-20" />
        </div>

      </section>
    </>
  )
}