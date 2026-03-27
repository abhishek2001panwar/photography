'use client'

import Image from 'next/image'

const items = [
  {
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',
    title: 'Modern Architecture',
    desc: 'Crafting timeless spaces with elegance and precision.',
  },
  {
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',
    title: 'Luxury Interiors',
    desc: 'Where design meets comfort and sophistication.',
  },
  {
    img: 'https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg',
    title: 'Urban Living',
    desc: 'Redefining contemporary living experiences.',
  },
]

export default function Featured() {
  return (
    <section className="w-full">
      {items.map((item, i) => (
        <div
          key={i}
          className="h-screen sticky top-0"
          style={{ zIndex: i + 1 }}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-end px-6 md:px-16 pb-16">
            <div className="max-w-xl text-white">
              
            <h2 className="text-white font-light leading-[0.9] tracking-[-0.02em]">
  
  <span className="block text-[clamp(3rem,10vw,10rem)]">
    CASA
  </span>

  <span className="block text-[clamp(3rem,10vw,10rem)]">
    FERRARA
  </span>

</h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {item.desc}
              </p>

            </div>
          </div>
        </div>
      ))}
    </section>
  )
}