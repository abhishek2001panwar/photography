'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Navbar from '../components/navbar'

// ─── Data ─────────────────────────────────────────────────────────────────────
type Status = 'Current' | 'In Development' | 'Coming Soon' | 'Sold'

interface Project {
  id: number
  title: string
  location: string
  status: Status
  img: string
  href: string
}

const PROJECTS: Project[] = [
  { id: 1,  title: 'CASA LUME',     location: 'Coral Gables',           status: 'In Development', img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',  href: '/projects/casa-lume' },
  { id: 2,  title: 'CASA 88',       location: 'Miami Dade',             status: 'In Development', img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',   href: '/projects/casa-88' },
  { id: 3,  title: 'CASA DOHA',     location: 'Pinecrest',              status: 'Current',        img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',  href: '/projects/casa-doha' },
  { id: 4,  title: 'CASA ANTIBES',  location: 'Coral Gables',           status: 'Current',        img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',   href: '/projects/casa-antibes' },
  { id: 5,  title: 'CASA FERRARA',  location: 'Pinecrest',              status: 'Current',        img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',  href: '/projects/casa-ferrara' },
  { id: 6,  title: 'CASA RAVELLO',  location: 'High Pines Miami',       status: 'Current',        img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',   href: '/projects/casa-ravello' },
  { id: 7,  title: 'CASA PALLAZZO', location: 'Coral Gables',           status: 'Current',        img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',  href: '/projects/casa-pallazzo' },
  { id: 8,  title: 'CASA LA PALMA', location: 'Miami Dade',             status: 'Current',        img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',   href: '/projects/casa-la-palma' },
  { id: 9,  title: 'CASA DUE',      location: 'City of Miami',          status: 'Current',        img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',  href: '/projects/casa-due' },
  { id: 10, title: 'CASA GIOLLI',   location: 'Coral Gables',           status: 'Coming Soon',    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',   href: '/projects/casa-giolli' },
  { id: 11, title: 'CASA MARSI',    location: 'Pinecrest',              status: 'Coming Soon',    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',  href: '/projects/casa-marsi' },
  { id: 12, title: 'CASA MALTA',    location: 'Miami',                  status: 'Sold',           img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',   href: '/projects/casa-malta' },
  { id: 13, title: 'CASA ALMERIA',  location: 'Coral Gables',           status: 'Sold',           img: 'https://arccagroup.us/wp-content/uploads/2025/04/Render-2.jpg',  href: '/projects/casa-almeria' },
  { id: 14, title: 'CASA LANCIO',   location: 'Miami',                  status: 'Sold',           img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',   href: '/projects/casa-lancio' },
]

const FILTERS: { label: string; value: Status | 'All' }[] = [
  { label: 'All',          value: 'All' },
  { label: 'Current',      value: 'Current' },
  { label: 'In Development', value: 'In Development' },
  { label: 'Coming Soon',  value: 'Coming Soon' },
  { label: 'Sold',         value: 'Sold' },
]

const STATUS_COLORS: Record<Status, string> = {
  'Current':        '#c9a96e',
  'In Development': '#a8c4b8',
  'Coming Soon':    '#b0a898',
  'Sold':           '#8b6840',
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [active, setActive]   = useState(0)
  const [prev, setPrev]       = useState<number | null>(null)
  const [dir, setDir]         = useState<'next'|'prev'>('next')
  const [animating, setAnim]  = useState(false)
  const [filter, setFilter]   = useState<Status | 'All'>('All')
  const [gridInView, setGridInView] = useState(false)

  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const gridRef   = useRef<HTMLDivElement>(null)

  // Grid intersection
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGridInView(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    if (gridRef.current) obs.observe(gridRef.current)
    return () => obs.disconnect()
  }, [])

  const goTo = useCallback((next: number, d: 'next'|'prev' = 'next') => {
    const n = Math.max(0, Math.min(PROJECTS.length - 1, next))
    if (n === active || animating) return
    setDir(d); setPrev(active); setActive(n); setAnim(true)
    clearTimeout(timerRef.current as ReturnType<typeof setTimeout>)
    timerRef.current = setTimeout(() => { setPrev(null); setAnim(false) }, 900)
  }, [active, animating])

  useEffect(() => () => clearTimeout(timerRef.current as ReturnType<typeof setTimeout>), [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(active + 1, 'next')
      if (e.key === 'ArrowLeft')  goTo(active - 1, 'prev')
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [active, goTo])

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.status === filter)
  const cur = PROJECTS[active]

  return (
    <>
    <Navbar theme='dark'/>
      <style>{`
      
        /* ── Carousel image transitions ── */
        .cs-img { position:absolute; inset:0; }
        .cs-enter-next { animation: csEnterNext 0.95s cubic-bezier(0.16,1,0.3,1) both; }
        .cs-enter-prev { animation: csEnterPrev 0.95s cubic-bezier(0.16,1,0.3,1) both; }
        .cs-exit-next  { animation: csExitNext  0.95s cubic-bezier(0.16,1,0.3,1) both; }
        .cs-exit-prev  { animation: csExitPrev  0.95s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes csEnterNext { from{opacity:0;transform:translateX(5%) scale(1.05)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes csEnterPrev { from{opacity:0;transform:translateX(-5%) scale(1.05)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes csExitNext  { from{opacity:1;transform:translateX(0) scale(1)} to{opacity:0;transform:translateX(-3%) scale(0.97)} }
        @keyframes csExitPrev  { from{opacity:1;transform:translateX(0) scale(1)} to{opacity:0;transform:translateX(3%) scale(0.97)} }

        /* Caption slide */
        .cap-in { animation: capIn 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        @keyframes capIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* Ken Burns idle */
        .kenburns { animation: kb 10s ease-in-out infinite alternate; }
        @keyframes kb { from{transform:scale(1) translate(0,0)} to{transform:scale(1.05) translate(-1%,-0.5%)} }

        /* Center highlight glow */
        .center-glow {
          position:absolute; left:50%; top:0; bottom:0;
          transform:translateX(-50%);
          width:35%;
          background: linear-gradient(to bottom,
            rgba(201,169,110,0.0) 0%,
            rgba(201,169,110,0.07) 30%,
            rgba(201,169,110,0.12) 50%,
            rgba(201,169,110,0.07) 70%,
            rgba(201,169,110,0.0) 100%
          );
          pointer-events:none; z-index:5;
        }

        /* Vertical center line */
        .v-line {
          position:absolute; left:50%; top:0; bottom:0;
          width:1px;
          background: linear-gradient(to bottom, transparent 0%, rgba(201,169,110,0.4) 30%, rgba(201,169,110,0.4) 70%, transparent 100%);
          transform:translateX(-50%);
          pointer-events:none; z-index:6;
        }

        /* Carousel thumbnail strip */
        .thumb-strip { display:flex; align-items:center; gap:0; overflow:hidden; }
        .thumb-item {
          flex-shrink:0;
          overflow:hidden;
          cursor:pointer;
          transition: width 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease;
          position:relative;
        }
        .thumb-item.t-active { opacity:1; }
        .thumb-item.t-side   { opacity:0.45; }

        /* Arrow buttons */
        .arr-btn {
          width:48px; height:48px; border-radius:50%;
          border:1px solid rgba(240,236,230,0.25);
          background:rgba(14,9,4,0.45);
          backdrop-filter:blur(10px);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; color:#f0ece6;
          transition:all 0.3s ease;
        }
        .arr-btn:hover { background:rgba(240,236,230,0.15); border-color:rgba(240,236,230,0.6); transform:scale(1.05); }
        .arr-btn:disabled { opacity:0.2; cursor:not-allowed; transform:none; }

        /* Grid card */
        .grid-card { position:relative; overflow:hidden; cursor:pointer; }
        .grid-card img { transition:transform 1.1s cubic-bezier(0.16,1,0.3,1); }
        .grid-card:hover img { transform:scale(1.06); }
        .grid-card .card-info {
          position:absolute; bottom:0; left:0; right:0;
          padding:24px 20px 20px;
          background:linear-gradient(to top, rgba(14,9,4,0.85) 0%, transparent 100%);
          transform:translateY(8px);
          transition:transform 0.45s ease, opacity 0.45s ease;
        }
        .grid-card:hover .card-info { transform:translateY(0); }

        /* Grid fade in stagger */
        .grid-item { opacity:0; transform:translateY(20px);
          transition:opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .grid-item.reveal { opacity:1; transform:translateY(0); }

        /* Filter pills */
        .f-pill {
          font-family:'Didact Gothic',sans-serif;
          font-size:9px; letter-spacing:0.28em;
          padding:7px 18px; border-radius:999px;
          border:1px solid;
          cursor:pointer;
          transition:all 0.3s ease;
          text-transform:uppercase;
        }
        .f-pill-off { border-color:rgba(42,31,20,0.25); color:rgba(42,31,20,0.55); background:transparent; }
        .f-pill-off:hover { border-color:#2a1f14; color:#2a1f14; }
        .f-pill-on  { border-color:#2a1f14; color:#f0ece6; background:#2a1f14; }

        /* Section divider text */
        .section-label {
          font-family:'Didact Gothic',sans-serif;
          font-size:9px; letter-spacing:0.35em;
          text-transform:uppercase;
        }

        /* Progress bar */
        .prog-fill { transition:width 0.6s cubic-bezier(0.16,1,0.3,1); }

        /* Dot */
        .dot-pip {
          height:1.5px; border-radius:2px; cursor:pointer;
          transition:width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.3s ease;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO CAROUSEL  — dark, full-screen
      ══════════════════════════════════════════════════════ */}
      <section className=" pt-10 relative w-full h-screen overflow-hidden bg-[#0d0905]">

        {/* ── Background images ── */}
        {prev !== null && animating && (
          <div className={`cs-img ${dir === 'next' ? 'cs-exit-next' : 'cs-exit-prev'}`}>
            <Image src={PROJECTS[prev].img} alt="" fill className="object-cover" priority draggable={false} />
          </div>
        )}
        <div className={`cs-img ${animating ? (dir === 'next' ? 'cs-enter-next' : 'cs-enter-prev') : ''}`}>
          <Image
            src={cur.img} alt={cur.title} fill
            className={`object-cover ${!animating ? 'kenburns' : ''}`}
            priority draggable={false}
          />
        </div>

        {/* Dark scrim — heavier on edges, lighter center */}
        <div className="absolute inset-0 z-[2]" style={{
          background: `
            linear-gradient(to bottom, rgba(14,9,4,0.65) 0%, rgba(14,9,4,0.15) 40%, rgba(14,9,4,0.15) 60%, rgba(14,9,4,0.80) 100%),
            linear-gradient(to right,  rgba(14,9,4,0.70) 0%, rgba(14,9,4,0.10) 20%, rgba(14,9,4,0.10) 80%, rgba(14,9,4,0.70) 100%)
          `,
        }} />

        {/* Center vertical glow + line */}
        <div className="center-glow" />
        <div className="v-line" />

        

        {/* ── Center caption ── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
          <p key={`cat-${active}`} className="cap-in section-label text-[#c9a96e] mb-5">
            {cur.status}
          </p>
          <h1
            key={`title-${active}`}
            className="cap-in font-display font-light text-[#f0ece6] leading-[0.9]"
            style={{ fontSize: 'clamp(3.5rem,7vw,8rem)', letterSpacing:'-0.01em' }}
          >
            {cur.title}
          </h1>
          <p key={`loc-${active}`} className="cap-in font-body text-[rgba(240,236,230,0.65)] tracking-[0.25em] text-sm mt-4">
            {cur.location}
          </p>
        </div>

        {/* ── Bottom controls ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-12 pb-10">

          {/* Arrows + progress dots row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button className="arr-btn" onClick={() => goTo(active-1,'prev')} disabled={active===0} aria-label="Prev">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2.5L5 7l4 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="arr-btn" onClick={() => goTo(active+1,'next')} disabled={active===PROJECTS.length-1} aria-label="Next">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2.5L9 7l-4 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* View project CTA */}
            <a
              href={cur.href}
              className="font-body text-[10px] tracking-[0.32em] uppercase text-[#f0ece6] border border-[rgba(240,236,230,0.3)] px-6 py-3 hover:bg-[rgba(240,236,230,0.1)] transition-all duration-300"
            >
              View Project
            </a>
          </div>

          {/* Dot strip */}
          <div className="flex items-center gap-[6px]">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? 'next' : 'prev')}
                className="dot-pip"
                style={{
                  width:  i === active ? 32 : 10,
                  background: i === active ? 'rgba(201,169,110,0.9)' : 'rgba(240,236,230,0.25)',
                }}
                aria-label={PROJECTS[i].title}
              />
            ))}
          </div>
        </div>

        {/* Thin bottom-edge separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(201,169,110,0.15)] z-30" />
      </section>

      {/* ══════════════════════════════════════════════════════
          ALL PROJECTS GRID  — light sand bg
      ══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#e5ddd3] pt-24 pb-28 px-8 md:px-16" id="arcca">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <p className="section-label text-[#8b6840] mb-4">All Projects</p>
            <h2
              className="font-display font-light text-[#1e140a] leading-[0.92]"
              style={{ fontSize: 'clamp(2.8rem,5vw,5rem)', letterSpacing:'-0.01em' }}
            >
              Our Portfolio
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`f-pill ${filter === f.value ? 'f-pill-on' : 'f-pill-off'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2a1f1415] mb-14" />

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {filtered.map((project, i) => (
            <a
              key={project.id}
              href={project.href}
              className={`grid-item grid-card group ${gridInView ? 'reveal' : ''}`}
              style={{ transitionDelay: gridInView ? `${(i % 6) * 80}ms` : '0ms', aspectRatio: '4/3' }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Status badge — top left */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="font-body text-[8px] tracking-[0.28em] uppercase px-3 py-1.5"
                  style={{
                    background: 'rgba(14,9,4,0.55)',
                    backdropFilter: 'blur(6px)',
                    color: STATUS_COLORS[project.status],
                  }}
                >
                  {project.status}
                </span>
              </div>

              {/* Info overlay */}
              <div className="card-info z-10">
                <p className="font-body text-[9px] tracking-[0.28em] uppercase mb-2" style={{ color: STATUS_COLORS[project.status] }}>
                  {project.location}
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="font-display font-light text-[#f0ece6] leading-none"
                    style={{ fontSize: 'clamp(1.2rem,1.8vw,1.8rem)' }}
                  >
                    {project.title}
                  </h3>
                  {/* Arrow */}
                  <div className="w-8 h-8 rounded-full border border-[rgba(240,236,230,0.3)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-3">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7M6.5 3L9.5 6l-3 3" stroke="#f0ece6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-display text-[#2a1f14] text-3xl font-light mb-3">No projects yet</p>
            <p className="font-body text-[10px] tracking-[0.25em] text-[#8b6840] uppercase">Check back soon</p>
          </div>
        )}

        {/* Bottom count */}
        <div className="mt-16 flex items-center justify-between">
          <p className="font-body text-[10px] tracking-[0.25em] text-[#8b6840] uppercase">
            Showing {filtered.length} of {PROJECTS.length} projects
          </p>
          <div className="h-px flex-1 bg-[#2a1f1415] mx-8" />
          <p className="font-display text-[#2a1f14] text-2xl font-light">
            {String(filtered.length).padStart(2,'0')}
          </p>
        </div>
      </section>
    </>
  )
}