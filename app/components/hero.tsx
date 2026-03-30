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
      <div className="absolute inset-0 flex flex-col justify-end max-w-8xl mx-10">
        <div className="px-4 pb-12 md:flex flex-col justify-between gap-10 md:gap-3 w-full">
          <p className="font-body text-lg md:text-3xl text-white max-w-md animate-slide-up">
            Discover the art of photography through our stunning portfolio and
            expert tips. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sed numquam animi tempora sunt fuga ipsum!
          </p>

          <button className="group flex items-center gap-2 animate-slide-up-delay">
            <span className="text-white text-lg md:text-xl font-body underline decoration-white/50 decoration-1 underline-offset-4 group-hover:decoration-4 transition">
              EXPLORE 
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
