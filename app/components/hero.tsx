import React from "react";

function HeroSection() {
  return (
    <div className=" w-full h-screen ">
      {/* Keyframe Animations */}
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpFadeDelay {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUpFade 0.8s ease-out forwards;
        }

        .animate-slide-up-delay {
          animation: slideUpFadeDelay 0.8s ease-out 0.3s forwards;
        }
      `}</style>

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
        from-black/70 via-black/20 to-black/30" 
      />

      {/* Content */}
      <div className="absolute left-0 bottom-0 w-full flex flex-col justify-end h-screen pb-10 sm:pb-10 md:pb-10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4 sm:gap-6 md:gap-8">
          <p className="font-body-custom text-sm sm:text-lg md:text-2xl lg:text-2xl text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl animate-slide-up leading-tight sm:leading-snug md:leading-normal">
            Discover the art of photography through our stunning portfolio and
            expert tips. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sed numquam animi tempora sunt fuga ipsum!
          </p>

          <button className="group flex items-center gap-2 animate-slide-up-delay w-fit flex-shrink-0">
            <span className="text-white text-sm sm:text-base md:text-lg lg:text-lg font-button-custom underline decoration-white/50 decoration-1 underline-offset-4 group-hover:decoration-4 transition">
              EXPLORE 
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
