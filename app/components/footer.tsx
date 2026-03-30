'use client'

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#3b2a1f] to-[#2a1d14] text-[#e8dfd3] px-6 md:px-20 py-20">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">

        {/* LEFT — BRAND */}
        <div>
          <h2 className="text-[clamp(2.8rem,5vw,4.5rem)] font-light tracking-[0.18em] leading-none">
            PHOTOGRAPHY
          </h2>

          <div className="w-12 h-[1px] bg-[#e8dfd3]/30 my-6"></div>

          <p className="text-sm text-[#e8dfd3]/70 max-w-xs leading-relaxed">
            Capturing timeless moments through refined storytelling,
            cinematic composition, and an artistic eye for emotion.
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-6 text-xs tracking-widest">
            {['INSTAGRAM', 'BEHANCE', 'DRIBBBLE'].map((item) => (
              <p key={item} className="font-body-custom cursor-pointer hover:text-white transition">
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* CENTER — LINKS */}
        <div className="flex flex-col md:items-center space-y-5">
          {['HOME', 'ABOUT', 'PROJECTS', 'SERVICES', 'CONTACT'].map((item) => (
            <p
              key={item}
              className="font-body-custom text-sm tracking-[0.25em] uppercase cursor-pointer relative group"
            >
              {item}

              {/* underline hover */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </p>
          ))}
        </div>

        {/* RIGHT — EMAIL */}
        <div className="md:text-right">
          <p className="font-body-custom uppercase text-xs tracking-[0.35em] mb-6 text-[#e8dfd3]/60">
            Stay Updated
          </p>

          <div className="flex md:justify-end">
            <div className="relative w-full max-w-sm">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-[#e8dfd3]/30 py-3 pr-20 text-sm outline-none placeholder:text-[#e8dfd3]/40 focus:border-white transition"
              />

              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs tracking-[0.2em] hover:opacity-70 transition">
                SUBMIT →
              </button>

            </div>
          </div>

          <p className="text-xs text-[#e8dfd3]/50 mt-4">
            Get latest shoots & stories. No spam.
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mt-16 border-t border-[#e8dfd3]/10"></div>

      {/* BOTTOM */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#e8dfd3]/50 tracking-wide">

        <p>© 2026 Photography Studio — All Rights Reserved</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <p className="hover:text-white cursor-pointer transition">Privacy</p>
          <p className="hover:text-white cursor-pointer transition">Terms</p>
          <p className="hover:text-white cursor-pointer transition">Licensing</p>
        </div>

      </div>

    </footer>
  )
}