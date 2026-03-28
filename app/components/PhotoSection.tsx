'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const IMAGES = [
  { src: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',  alt: 'Casa Antibes exterior',   aspect: '3/4'  },
  { src: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg', alt: 'Casa Ferrara interior',   aspect: '4/5'  },
  { src: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',  alt: 'Villa Serena living',     aspect: '1/1'  },
  { src: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg', alt: 'Casa Doha dining',        aspect: '16/9' },
  { src: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',  alt: 'Casa Ravello facade',     aspect: '4/5'  },
  { src: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg', alt: 'Casa Pallazzo terrace',   aspect: '3/4'  },
]

export default function PhotoSection() {
  const [inView, setInView]       = useState(false)
  const [hovered, setHovered]     = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.06 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Didact+Gothic&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'Didact Gothic', sans-serif; }

        /* Grain */
        .pg-grain::before {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.45; mix-blend-mode: multiply;
        }

        /* Curtain wipe per image */
        .pg-curtain {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pg-curtain.open { clip-path: inset(0 0% 0 0); }

        /* Image zoom */
        .pg-img {
          transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(1.08);
          will-change: transform;
        }
        .pg-img.curtain-done { transform: scale(1.04); }
        .pg-cell:hover .pg-img { transform: scale(1.09) !important; }

        /* Hover overlay */
        .pg-hover-overlay {
          position: absolute; inset: 0;
          background: rgba(14, 9, 4, 0.0);
          transition: background 0.6s ease;
          z-index: 2;
        }
        .pg-cell:hover .pg-hover-overlay { background: rgba(14, 9, 4, 0.18); }

        /* Hover label slide up */
        .pg-label {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          padding: 20px 18px 18px;
          background: linear-gradient(to top, rgba(14,9,4,0.7) 0%, transparent 100%);
          transform: translateY(100%);
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .pg-cell:hover .pg-label { transform: translateY(0); }

        /* Thin border between cells */
        .pg-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        /* Count badge fade */
        .pg-badge {
          opacity: 0;
          transition: opacity 0.4s ease 0.1s;
        }
        .pg-cell:hover .pg-badge { opacity: 1; }
      `}</style>

      <section
        ref={sectionRef}
        className="pg-grain relative w-full bg-[#e5ddd3] overflow-hidden py-2"
      >
        <div className="relative z-10">

          {/* ═══════════════════════════════════════════
              ROW 1 — [tall 3:4] · [wide 16:9 top] [square]
          ═══════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row gap-[3px]">

            {/* Cell 1 — tall portrait */}
            <div
              className="pg-cell md:w-[30%]"
              style={{ aspectRatio: '3/4' }}
              onMouseEnter={() => setHovered(0)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`pg-curtain w-full h-full ${inView ? 'open' : ''}`} style={{ transitionDelay: '0ms' }}>
                <Image
                  src={IMAGES[0].src} alt={IMAGES[0].alt} fill
                  className={`object-cover pg-img ${inView ? 'curtain-done' : ''}`}
                />
              </div>
              <div className="pg-hover-overlay" />
              <div className="pg-label">
                <p className="font-display text-[#f0ece6] font-light text-lg leading-none">{IMAGES[0].alt}</p>
              </div>
            </div>

            {/* Right column — stacked */}
            <div className="flex flex-col gap-[3px] flex-1">

              {/* Cell 2 — wide landscape */}
              <div
                className="pg-cell w-full"
                style={{ aspectRatio: '16/7' }}
                onMouseEnter={() => setHovered(1)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`pg-curtain w-full h-full ${inView ? 'open' : ''}`} style={{ transitionDelay: '100ms' }}>
                  <Image
                    src={IMAGES[1].src} alt={IMAGES[1].alt} fill
                    className={`object-cover pg-img ${inView ? 'curtain-done' : ''}`}
                    style={{ objectPosition: 'center 40%' }}
                  />
                </div>
                <div className="pg-hover-overlay" />
                <div className="pg-label">
                  <p className="font-display text-[#f0ece6] font-light text-lg leading-none">{IMAGES[1].alt}</p>
                </div>
              </div>

              {/* Bottom row: two equal cells */}
              <div className="flex gap-[3px]">

                {/* Cell 3 — square */}
                <div
                  className="pg-cell flex-1"
                  style={{ aspectRatio: '1/1' }}
                  onMouseEnter={() => setHovered(2)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className={`pg-curtain w-full h-full ${inView ? 'open' : ''}`} style={{ transitionDelay: '180ms' }}>
                    <Image
                      src={IMAGES[2].src} alt={IMAGES[2].alt} fill
                      className={`object-cover pg-img ${inView ? 'curtain-done' : ''}`}
                    />
                  </div>
                  <div className="pg-hover-overlay" />
                  <div className="pg-label">
                    <p className="font-display text-[#f0ece6] font-light text-lg leading-none">{IMAGES[2].alt}</p>
                  </div>
                </div>

                {/* Cell 4 — square taller */}
                <div
                  className="pg-cell flex-1"
                  style={{ aspectRatio: '1/1' }}
                  onMouseEnter={() => setHovered(3)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className={`pg-curtain w-full h-full ${inView ? 'open' : ''}`} style={{ transitionDelay: '240ms' }}>
                    <Image
                      src={IMAGES[3].src} alt={IMAGES[3].alt} fill
                      className={`object-cover pg-img ${inView ? 'curtain-done' : ''}`}
                      style={{ objectPosition: 'center 30%' }}
                    />
                  </div>
                  <div className="pg-hover-overlay" />
                  <div className="pg-label">
                    <p className="font-display text-[#f0ece6] font-light text-lg leading-none">{IMAGES[3].alt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              ROW 2 — [wide] [portrait] [wide]
          ═══════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row gap-[3px] mt-[3px]">

            {/* Cell 5 */}
            <div
              className="pg-cell md:w-[42%]"
              style={{ aspectRatio: '4/3' }}
              onMouseEnter={() => setHovered(4)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`pg-curtain w-full h-full ${inView ? 'open' : ''}`} style={{ transitionDelay: '300ms' }}>
                <Image
                  src={IMAGES[4].src} alt={IMAGES[4].alt} fill
                  className={`object-cover pg-img ${inView ? 'curtain-done' : ''}`}
                />
              </div>
              <div className="pg-hover-overlay" />
              <div className="pg-label">
                <p className="font-display text-[#f0ece6] font-light text-lg leading-none">{IMAGES[4].alt}</p>
              </div>
            </div>

            {/* Cell 6 — portrait, center */}
            <div
              className="pg-cell md:w-[16%]"
              style={{ aspectRatio: '9/16' }}
              onMouseEnter={() => setHovered(5)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`pg-curtain w-full h-full ${inView ? 'open' : ''}`} style={{ transitionDelay: '380ms' }}>
                <Image
                  src={IMAGES[5].src} alt={IMAGES[5].alt} fill
                  className={`object-cover pg-img ${inView ? 'curtain-done' : ''}`}
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              <div className="pg-hover-overlay" />
              {/* No label on narrow cell */}
            </div>

            {/* Cell 7 — reuse img 0 with diff crop */}
            <div
              className="pg-cell flex-1"
              style={{ aspectRatio: '4/3' }}
              onMouseEnter={() => setHovered(6)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`pg-curtain w-full h-full ${inView ? 'open' : ''}`} style={{ transitionDelay: '460ms' }}>
                <Image
                  src={IMAGES[1].src} alt="Casa La Palma terrace" fill
                  className={`object-cover pg-img ${inView ? 'curtain-done' : ''}`}
                  style={{ objectPosition: 'center 60%' }}
                />
              </div>
              <div className="pg-hover-overlay" />
              <div className="pg-label">
                <p className="font-display text-[#f0ece6] font-light text-lg leading-none">Casa La Palma</p>
              </div>
            </div>
          </div>

          {/* ── Bottom thin strip — project count ── */}
          <div
            className="flex items-center justify-between px-5 py-4 mt-[3px]"
            style={{ background: 'rgba(42,31,20,0.04)', borderTop: '1px solid rgba(42,31,20,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#8b684060]" />
              <span className="font-body text-[8.5px] tracking-[0.32em] text-[#8b6840] uppercase">
                Portfolio · Selected Works
              </span>
            </div>
            <span className="font-body text-[8.5px] tracking-[0.25em] text-[rgba(42,31,20,0.35)] uppercase">
              2022 — 2025
            </span>
          </div>

        </div>
      </section>
    </>
  )
}