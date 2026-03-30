'use client';
import React from 'react';
import Button from './Button';

const PremiumContact = () => {

  return (
    <section className="min-h-screen bg-[#F5F4EB] text-black font-body-custom selection:bg-black selection:text-white flex items-center justify-center p-3 sm:p-5 md:p-8 lg:p-12 py-2 sm:py-2 md:py-3">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
        
        {/* Left Side: Editorial Typography & Map */}
        <div className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Minimalist Logo */}
            <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 border border-black flex items-center justify-center">
              <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold leading-none tracking-tighter">AR<br/>CCA</span>
            </div>

            <h2 className="font-subheading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.85] uppercase">
              Let's <br />
              <span className="italic font-accent">Work</span> <br />
              Together
            </h2>
          </div>

          {/* Integrated Map Placeholder */}
          <div className="relative w-full aspect-square lg:aspect-video contrast-125 transition-all duration-700 rounded-sm overflow-hidden border border-black/5 shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Contact Details (2 Numbers) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-3 sm:pt-4 md:pt-5 border-t border-black/10">
            <div>
                <label className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.15em] font-bold uppercase opacity-50 ml-1">office</label>
              <p className="text-xs sm:text-sm md:text-base font-medium hover:underline cursor-pointer">+44 20 7946 0958</p>
            </div>
            <div>
                <label className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.15em] font-bold uppercase opacity-50 ml-1">office</label>
              <p className="text-xs sm:text-sm md:text-base font-medium hover:underline cursor-pointer">+1 212 555 0198</p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Boxed Form */}
        <div className="lg:col-span-7 flex flex-col justify-end">
          <form className="w-full space-y-3 sm:space-y-4 md:space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {/* Boxed Name Field */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.15em] font-bold uppercase opacity-50 ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/[0.03] border-b-2 border-black/10 px-2 sm:px-3 md:px-4 py-2 sm:py-3 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 rounded-t-md text-xs sm:text-sm md:text-base" 
                  placeholder=""
                />
              </div>

              {/* Boxed Email Field */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.15em] font-bold uppercase opacity-50 ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-black/[0.03] border-b-2 border-black/10 px-2 sm:px-3 md:px-4 py-2 sm:py-3 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 rounded-t-md text-xs sm:text-sm md:text-base" 
                  placeholder=""
                />
              </div>
            </div>

            {/* Boxed Phone Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.15em] font-bold uppercase opacity-50 ml-1">Phone Number</label>
              <input 
                type="tel" 
                className="w-full bg-black/[0.03] border-b-2 border-black/10 px-2 sm:px-3 md:px-4 py-2 sm:py-3 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 rounded-t-md text-xs sm:text-sm md:text-base" 
                placeholder=""
              />
            </div>

            {/* Boxed Message Field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="text-[7px] sm:text-[8px] md:text-[10px] tracking-[0.15em] font-bold uppercase opacity-50 ml-1">Project Details</label>
              <textarea 
                rows={3} 
                className="w-full bg-black/[0.03] border-b-2 border-black/10 px-2 sm:px-3 md:px-4 py-2 sm:py-3 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 rounded-t-md resize-none text-xs sm:text-sm md:text-base" 
                placeholder="Briefly describe your vision..."
              />
            </div>

            {/* SMS Consent */}
            <label className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group pt-1 sm:pt-2">
              <div className="relative flex items-center flex-shrink-0">
                <input type="checkbox" className="peer sr-only" />
                <div className="h-4 sm:h-5 w-4 sm:w-5 border border-black/20 bg-white peer-checked:bg-black transition-all duration-300"></div>
                <svg className="absolute w-2 sm:w-3 h-2 sm:h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                I agree to receive SMS updates.
              </span>
            </label>

            {/* Button */}
            <div className="pt-2 sm:pt-3">
          
              <Button variant="outline" className="mt-2 sm:mt-3 w-full md:w-auto px-6 sm:px-10 md:px-16 py-2 sm:py-3 md:py-4 border-black text-black text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:bg-black hover:text-white active:scale-[0.98]">
                 Submit Inquiry
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modern Floating Footer */}
      {/* <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full border border-black/5 shadow-sm hidden md:flex items-center space-x-8">
         <span className="text-[9px] font-bold tracking-[0.2em] uppercase cursor-pointer hover:opacity-50">Privacy</span>
         <div className="h-1 w-1 bg-black rounded-full opacity-20"></div>
        <button 
         
          className="text-[9px] font-bold tracking-[0.2em] uppercase cursor-pointer hover:opacity-50"
        >
          x
        </button>
         <span className="text-[9px] font-bold tracking-[0.2em] uppercase">© 2026 Arcca Group</span>
      </div> */}
  

      {/* Modern Floating Footer */}
      {/* <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full border border-black/5 shadow-sm hidden md:flex items-center space-x-8">
         <span className="text-[9px] font-bold tracking-[0.2em] uppercase cursor-pointer hover:opacity-50">Privacy</span>
         <div className="h-1 w-1 bg-black rounded-full opacity-20"></div>
        <button 
         
          className="text-[9px] font-bold tracking-[0.2em] uppercase cursor-pointer hover:opacity-50"
        >
          x
        </button>
         <span className="text-[9px] font-bold tracking-[0.2em] uppercase">© 2026 Arcca Group</span>
      </div> */}
    </section>
  );
};

export default PremiumContact;