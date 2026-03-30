import React from "react";

function HeroSection() {
  return (
    <div className=" w-full h-screen ">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://arccagroup.us/wp-content/uploads/2025/07/Video-Arcca-Renders.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
       <div className="absolute inset-0 z-10 
        bg-gradient-to-b 
        from-black/70 via-black/20 to-black/10" 
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto">
        <div className="px-4 pb-12 flex justify-between items-end w-full">
          <p className="text-lg md:text-xl text-white max-w-sm">
            Discover the art of photography through our stunning portfolio and
            expert tips. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sed numquam animi tempora sunt fuga ipsum!
          </p>

          <button className="group flex items-center gap-2">
            <span className="text-white text-lg md:text-xl font-light">
              EXPLORE
            </span>
            <span className="text-white text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
