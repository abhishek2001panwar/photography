"use client";

import Image from "next/image";
import Button from "./Button";

const items = [
  {
    img: "https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg",
    title: "Modern Architecture",
    desc: "Crafting timeless spaces with elegance and precision.",
  },
  {
    img: "https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg",
    title: "Luxury Interiors",
    desc: "Where design meets comfort and sophistication.",
  },
  {
    img: "https://arccagroup.us/wp-content/uploads/2025/04/Front-1.jpg",
    title: "Urban Living",
    desc: "Redefining contemporary living experiences.",
  },
];

export default function Featured() {
  return (
    <section className="w-full">
      {items.map((item, i) => (
        <div
          key={i}
          className="w-full h-[80vh] sm:h-[85vh] md:h-screen sticky top-0"
          style={{ zIndex: i + 1 }}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src={item.img}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-cover rounded-3xl "
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-end justify-between px-4 sm:px-6 md:px-12 lg:px-16 pb-8 sm:pb-12 md:pb-16">
            <div className="w-full max-w-2xl text-white">
              <h2 className="font-subheading text-white font-light leading-[0.9] tracking-[-0.02em] mb-3 sm:mb-4 md:mb-6">
                <span className="block text-[clamp(2rem,8vw,4.5rem)] sm:text-[clamp(2rem,7vw,5rem)]">
                  {item.title.split(" ")[0]}
                </span>

                <span className="block text-[clamp(2rem,8vw,4.5rem)] sm:text-[clamp(2rem,7vw,5rem)]">
                  {item.title.split(" ")[1]}
                </span>
              </h2>
              <p className="font-body-custom text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-lg">
                {item.desc}
              </p>
            </div>
            {/* <Button variant="filled" className="mt-6">
              Explore
              </Button> */}
          </div>
        </div>
      ))}
    </section>
  );
}
