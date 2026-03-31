'use client'

import Image from 'next/image'
import Button from './Button'

export default function About2() {
  return (
    <section className="w-full bg-[#e8dfd3] py-10 md:py-10 ">
      
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-6 md:gap-10 px-6 md:px-16 lg:px-24">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center max-w-md">
          
          {/* Logo + Label */}
          <div className="">
           
            <p className="mt-3 text-xs tracking-[0.3em] text-[#8b6840] uppercase">
              Architecture
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-[#2a1f14] font-light leading-[1] mb-6">
            <h1 className="block text-[clamp(3rem,4vw,5rem)]">
              INSPIRED
            </h1>
            <h1 className="block text-[clamp(3rem,4vw,5rem)]">
              BY NOW
            </h1>
          </h2>

          {/* Paragraph */}
          <p className="text-[#4a3728] text-sm leading-relaxed mb-6 CustomBody">
            At Arcca Group, we believe design transforms the everyday into
            something extraordinary.
          </p>

          <p className="text-[#4a3728] text-sm leading-relaxed mb-6">
            Each project begins with a vision where aesthetics, functionality,
            and emotion coexist in perfect balance.
          </p>

          <p className="text-[#4a3728] text-sm leading-relaxed mb-8">
            Inspired by icons like Fallingwater and modern residences, we see
            architecture as a living dialogue with its surroundings.
          </p>

          {/* Button */}
          <Button variant='filled' className="mt-10 px-6 py-2 rounded-full bg-[#3d2b1f] text-white text-xs tracking-[0.2em]  w-fit hover:bg-[#2a1d15] transition">
            About Us
          </Button>
        </div>

        {/* CENTER IMAGE */}
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
          <Image
            src="/img1.jpg" // replace
            alt="Interior"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
          <Image
            src="/img2.jpg" // replace
            alt="Interior"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  )
}