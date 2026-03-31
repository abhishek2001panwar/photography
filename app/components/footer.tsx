'use client'

import { FaInstagram, FaLinkedin, FaBehance, FaXTwitter, FaPinterest } from 'react-icons/fa6'

const allLinks = ['Home', 'Portfolio', 'About', 'Services', 'Contact', 'Blog']

const awards = [
  { title: 'IA Awards', year: '2024' },
  { title: 'Design Excellence', year: '2023' },
  { title: 'Feature Architects', year: '2023' },
]

const socialLinks = [
  { label: 'Instagram', url: '#', icon: FaInstagram },
  // { label: 'LinkedIn', url: '#', icon: FaLinkedin },
  // { label: 'Behance', url: '#', icon: FaBehance },
  // { label: 'Twitter', url: '#', icon: FaXTwitter },
  // { label: 'Pinterest', url: '#', icon: FaPinterest },
]

export default function Footer() {

  return (
    <footer className="w-full bg-gradient-to-b from-[#3b2a1f] to-[#2a1d14] text-[#e8dfd3] px-6 md:px-20 py-16 md:py-20">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* LEFT — BRAND & SOCIAL ICONS */}
        <div>
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-heading font-light tracking-[0.18em] leading-none">
            ARCCA
          </h1>

          <div className="w-12 h-[1px] bg-[#e8dfd3]/30 my-6"></div>

          <p className="text-xs sm:text-sm text-[#e8dfd3]/70 max-w-xs leading-relaxed">
            Architectural excellence through innovative design, meticulous craftsmanship, and timeless vision.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              return (
                <a
                  key={idx}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e8dfd3]/10 text-[#e8dfd3] hover:bg-[#c9a96e] hover:text-[#2a1d14] transition-all duration-300 transform hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>
        </div>

        {/* RIGHT — LINKS & RECOGNITION */}
        <div className="space-y-8">
          {/* LINKS ROW */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#e8dfd3]/60 mb-4">Navigation</p>
            <div className="flex flex-wrap gap-6 md:gap-8">
              {allLinks.map((item) => (
                <p
                  key={item}
                  className="font-button-custom text-xs tracking-[0.2em] capitalize cursor-pointer relative group inline-block whitespace-nowrap"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#c9a96e] transition-all duration-300 group-hover:w-full"></span>
                </p>
              ))}
            </div>
          </div>

          {/* RECOGNITION ROW */}
          <div className="pt-4 border-t border-[#e8dfd3]/20">
            <p className="text-xs uppercase tracking-[0.3em] text-[#e8dfd3]/60 mb-4">Awards</p>
            <div className="flex flex-wrap gap-8">
              {awards.map((award, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <p className="font-subheading text-xs sm:text-sm text-[#c9a96e] group-hover:text-white transition">
                    {award.title}
                  </p>
                  <p className="text-xs text-[#e8dfd3]/50 group-hover:text-[#e8dfd3]/70 transition">
                    {award.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mt-12 md:mt-16 border-t border-[#e8dfd3]/10"></div>

      {/* BOTTOM */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#e8dfd3]/50 tracking-wide gap-4">

        <p>© 2026 Arcca Group - All Rights Reserved</p>

        <div className="flex gap-6">
          <p className="hover:text-[#c9a96e] cursor-pointer transition">Privacy</p>
          <p className="hover:text-[#c9a96e] cursor-pointer transition">Terms</p>
          <p className="hover:text-[#c9a96e] cursor-pointer transition">Sitemap</p>
        </div>

      </div>
       
    </footer>
  )
}