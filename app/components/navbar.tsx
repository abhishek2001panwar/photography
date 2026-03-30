'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'HOME',      href: '#home' },
  { label: 'ABOUT US',  href: '#about' },
  { label: 'VISION',    href: '#vision' },
  { label: 'TEAM',      href: '#team' },
  { label: 'SERVICES',  href: '#services' },
  { label: 'PORTFOLIO',  href: '/portfolio' },
  { label: 'CONTACT',   href: '#contact' },
]

const CONTACT_INFO = {
  email:   'INFO@ARCCAGP.COM',
  phone:   '786 901 1622',
  address: '194 ISLA DORADA BLVD, CORAL GABLES, FL, 33143',
  hours:   'MONDAY TO FRIDAY: 9:00 AM – 6:00 PM',
  social:  ['INSTAGRAM', 'FACEBOOK', 'LINKEDIN'],
}

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    navbarText:       '#f0ece6',
    navbarAccent:     '#c9a96e',
    navbarPillBorder: 'rgba(201,169,110,0.50)',
    navbarPillText:   '#f0ece6',
    glassStyle: {
      background:      'rgba(8,13,19,0.62)',
      backdropFilter:  'blur(18px) saturate(1.8)',
      WebkitBackdropFilter: 'blur(18px) saturate(1.8)',
      borderBottom:    '1px solid rgba(201,169,110,0.18)',
    },
    leftBg:        '#1c1208',
    leftText:      '#f0ece6',
    leftDimmed:    'rgba(240,236,230,0.28)',
    leftDivider:   'rgba(240,236,230,0.10)',
    leftFooter:    'rgba(240,236,230,0.28)',
    leftUnderline: '#c9a96e',
    rightBg:       '#0e0905',
    rightLogo:     '#f0ece6',
    rightLabel:    '#c9a96e',
    rightText:     '#d6cfc4',
    rightMuted:    'rgba(214,207,196,0.42)',
    rightDivider:  'rgba(214,207,196,0.12)',
    rightClose:    '#d6cfc4',
    rightCloseHover: '#c9a96e',
  },
  light: {
    navbarText:       '#D3C7B9',
    navbarAccent:     '#D3C7B9',
    navbarPillBorder: 'rgba(211,199,185,0.55)',
    navbarPillText:   '#D3C7B9',
    glassStyle: {
      background:      'rgba(42,31,20,0.42)',
      backdropFilter:  'blur(20px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
      borderBottom:    '1px solid rgba(211,199,185,0.15)',
    },
    leftBg:        '#f2ece3',
    leftText:      '#2a1f14',
    leftDimmed:    'rgba(42,31,20,0.25)',
    leftDivider:   'rgba(42,31,20,0.10)',
    leftFooter:    'rgba(42,31,20,0.32)',
    leftUnderline: '#7a5c38',
    rightBg:       '#e3d9cc',
    rightLogo:     '#2a1f14',
    rightLabel:    '#7a5c38',
    rightText:     '#3d2c1e',
    rightMuted:    'rgba(61,44,30,0.45)',
    rightDivider:  'rgba(42,31,20,0.12)',
    rightClose:    '#3d2c1e',
    rightCloseHover: '#7a5c38',
  },
} as const

type ThemeKey = keyof typeof THEMES

interface NavbarProps {
  theme?: ThemeKey
}

// ──────────────────────────────────────────────────────────────────────────────

export default function Navbar({ theme = 'dark' }: NavbarProps) {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [visible, setVisible]         = useState(true)
  const [atTop, setAtTop]             = useState(true)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const lastScrollY = useRef(0)
  const ticking     = useRef(false)
  const t = THEMES[theme]

  // Scroll logic
  const handleScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const y     = window.scrollY
      const delta = y - lastScrollY.current
      setAtTop(y < 10)
      if (y < 80)          setVisible(true)
      else if (delta > 6)  { setVisible(false); setMenuOpen(false) }
      else if (delta < -6) setVisible(true)
      lastScrollY.current = y
      ticking.current = false
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navStyle: React.CSSProperties = atTop && !menuOpen
    ? { background: 'transparent', backdropFilter: 'none', WebkitBackdropFilter: 'none', borderBottom: '1px solid transparent' }
    : (t.glassStyle as React.CSSProperties)

  return (
    <>
      <style>{`
      

        .nav-visible { transform: translateY(0);    opacity: 1;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease; }
        .nav-hidden  { transform: translateY(-110%); opacity: 0;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease; }

        /* Mobile: Top/Bottom reveal | Desktop: Left/Right slide */
        .panel-left {
          transform: translateY(-100%);
          transition: transform 0.78s cubic-bezier(0.16,1,0.3,1);
        }
        .panel-right {
          transform: translateY(100%);
          transition: transform 0.78s cubic-bezier(0.16,1,0.3,1);
        }
        
        @media (min-width: 768px) {
          .panel-left {
            transform: translateX(-100%);
            transition: transform 0.78s cubic-bezier(0.16,1,0.3,1);
          }
          .panel-right {
            transform: translateX(100%);
            transition: transform 0.78s cubic-bezier(0.16,1,0.3,1);
          }
        }
        
        .panel-open { transform: translateX(0) translateY(0) !important; }

        .nav-item {
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .nav-item.show { opacity: 1; transform: translateY(0); }

        .grow-line { width: 0; transition: width 0.65s ease; }
        .grow-line.open { width: 100%; }



        .bar { display:block; width:100%; height:1px; background:currentColor;
          transition: transform 0.42s ease, opacity 0.3s ease; }
        .b-top-x { transform: rotate(45deg) translate(4px, 4px); }
        .b-mid-x { opacity:0; transform: scaleX(0); }
        .b-bot-x { transform: rotate(-45deg) translate(4px,-4px); }

        header { transition: background 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease; }
      `}</style>

      {/* ══════════════  NAVBAR  ══════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-[64px] md:h-[72px] font-button-custom ${visible ? 'nav-visible' : 'nav-hidden'}`}
        style={navStyle}
      >
        <div className="max-w-screen-2xl mx-auto h-full px-3 sm:px-5 md:px-10 flex items-center justify-between gap-2 sm:gap-4">

          {/* Left */}
          <div className="flex-1 flex items-center">
            <a
              href="/portfolio"
              className="hidden lg:inline-flex items-center rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-[7px] text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.22em] font-button-custom transition-all duration-300"
              style={{ border: `1px solid ${t.navbarPillBorder}`, color: t.navbarPillText }}
            >
              OUR PORTFOLIO
            </a>
          </div>

          {/* Center – Logo */}
          <div className="flex-1 flex justify-center">
            <a
              href="/"
              className=" text-[1.1rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[2rem] tracking-[0.1em] select-none"
              style={{ color: t.navbarText , fontFamily: "" }}
            >
              PHOTOGRAPHY
            </a>
          </div>

          {/* Right */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 md:gap-5">
           

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="relative w-7 h-[18px] flex flex-col justify-between cursor-pointer z-[200] shrink-0"
              style={{ color: t.navbarText }}
            >
              <span className={`bar ${menuOpen ? 'b-top-x' : ''}`} />
              <span className={`bar ${menuOpen ? 'b-mid-x' : ''}`} />
              <span className={`bar ${menuOpen ? 'b-bot-x' : ''}`} />
            </button>
          </div>

        </div>
      </header>

      {/* ══════════════  OVERLAY MENU  ══════════════ */}
      <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden={!menuOpen}>

        {/* ── LEFT PANEL (Top on mobile, Left on desktop) ── */}
        <div
          className={`absolute top-0 left-0 md:left-0 h-[60vh] md:h-full w-full md:w-[52%] flex flex-col panel-left ${menuOpen ? 'panel-open pointer-events-auto' : ''}`}
          style={{ background: t.leftBg }}
        >
          <div className="h-16 sm:h-[64px] md:h-[72px] shrink-0" />

          <nav className="flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-14 overflow-hidden">
            {NAV_LINKS.map((link, i) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setMenuOpen(false)}
                  className={`nav-item link-ul font-regular tracking-[0.02em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.4rem] py-2 sm:py-3 md:py-[14px] ${menuOpen ? 'show' : ''}`}
                  style={{
                    color: hoveredLink && hoveredLink !== link.label ? t.leftDimmed : t.leftText,
                    transitionDelay: menuOpen ? `${i * 60 + 90}ms` : '0ms',
                    '--ul-color': t.leftUnderline,
                  } as React.CSSProperties}
                >
                  {link.label}
                </a>
                {i < NAV_LINKS.length - 1 && (
                  <div
                    className={`grow-line h-px ${menuOpen ? 'open' : ''}`}
                    style={{ background: t.leftDivider, transitionDelay: menuOpen ? `${i * 60 + 70}ms` : '0ms' }}
                  />
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="px-4 sm:px-8 md:px-14 pb-6 sm:pb-8 text-[8px] sm:text-[9px] tracking-[0.3em] font-button-custom" style={{ color: t.leftFooter }}>
            © 2025 ARCCA
          </div>
        </div>

        {/* ── RIGHT PANEL (Bottom on mobile, Right on desktop) ── */}
        <div
          className={`absolute top-auto bottom-0 right-0 md:top-0 md:bottom-auto h-[40vh] md:h-full w-full md:w-[48%] flex flex-col panel-right ${menuOpen ? 'panel-open pointer-events-auto' : ''}`}
          style={{ background: t.rightBg }}
        >
          {/* Top bar */}
          <div className="h-16 sm:h-[64px] md:h-[72px] shrink-0 flex items-center justify-between px-4 sm:px-8 md:px-12">
            <span
              className="font-display text-lg sm:text-xl tracking-[0.38em] font-light md:invisible"
              style={{ color: t.rightLogo }}
            >
              ARCCA
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.28em] font-button-custom transition-colors duration-200 ml-auto"
              style={{ color: t.rightClose }}
              onMouseEnter={e => (e.currentTarget.style.color = t.rightCloseHover)}
              onMouseLeave={e => (e.currentTarget.style.color = t.rightClose)}
            >
              CLOSE
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 md:px-12 pb-6 sm:pb-8 md:pb-10 overflow-y-auto">

            {/* Wordmark */}
            <div className="mt-4 sm:mt-6 md:mt-10">
              <p
                className="font-display font-light tracking-[0.14em] text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-none"
                style={{ color: t.rightLogo }}
              >
                ARCCA
              </p>
              <p className="mt-0.5 sm:mt-1 text-[8px] sm:text-[9px] tracking-[0.22em] font-button-custom" style={{ color: t.rightLabel }}>®</p>
            </div>

            {/* Contact grid */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-7">

              {[
                {
                  label: 'EMAIL',
                  content: (
                    <a
                      href={`mailto:${CONTACT_INFO.email.toLowerCase()}`}
                      className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] font-body transition-colors duration-200 block"
                      style={{ color: t.rightText }}
                      onMouseEnter={e => (e.currentTarget.style.color = t.rightLabel)}
                      onMouseLeave={e => (e.currentTarget.style.color = t.rightText)}
                    >
                      {CONTACT_INFO.email}
                    </a>
                  ),
                },
                {
                  label: 'ADDRESS',
                  content: (
                    <>
                      <p className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.1em] leading-relaxed font-body-custom" style={{ color: t.rightText }}>
                        {CONTACT_INFO.address}
                      </p>
                      <p className="mt-1.5 sm:mt-2 md:mt-2.5 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.1em] font-body-custom" style={{ color: t.rightMuted }}>
                        {CONTACT_INFO.hours}
                      </p>
                    </>
                  ),
                },
                {
                  label: 'PHONE',
                  content: (
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                      className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] font-body transition-colors duration-200 block"
                      style={{ color: t.rightText }}
                      onMouseEnter={e => (e.currentTarget.style.color = t.rightLabel)}
                      onMouseLeave={e => (e.currentTarget.style.color = t.rightText)}
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  ),
                },
                {
                  label: 'SOCIAL',
                  content: (
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                      {CONTACT_INFO.social.map(s => (
                        <a
                          key={s}
                          href="#"
                          className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] font-body transition-colors duration-200"
                          style={{ color: t.rightText }}
                          onMouseEnter={e => (e.currentTarget.style.color = t.rightLabel)}
                          onMouseLeave={e => (e.currentTarget.style.color = t.rightText)}
                        >
                          {s}
                        </a>
                      ))}
                    </div>
                  ),
                },
              ].map(({ label, content }) => (
                <div key={label}>
                  <p className="text-[9px] tracking-[0.32em] mb-2.5 font-button-custom" style={{ color: t.rightLabel }}>
                    {label}
                  </p>
                  {content}
                </div>
              ))}

            </div>

            {/* Footer */}
            <div>
              <div className="h-px my-7" style={{ background: t.rightDivider }} />
              <div className="flex justify-between items-center">
                <a
                  href="#"
                  className="text-[9px] tracking-[0.25em] font-button-custom transition-colors duration-200"
                  style={{ color: t.rightMuted }}
                  onMouseEnter={e => (e.currentTarget.style.color = t.rightLabel)}
                  onMouseLeave={e => (e.currentTarget.style.color = t.rightMuted)}
                >
                  PRIVACY POLICY
                </a>
                <p className="text-[9px] tracking-[0.2em] font-body-custom" style={{ color: t.rightMuted }}>
                  © 2025 ARCCA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile click-away */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] md:hidden" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}