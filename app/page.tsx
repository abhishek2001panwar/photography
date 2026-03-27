import React from 'react'
import Navbar from './components/navbar'
import HeroSection from './components/hero'
import AboutSection from './components/about'
import VideoSection from './components/video'

function page() {
  return (
    <div className="">
      <Navbar theme="light" />
      <HeroSection />
      <AboutSection />
      <VideoSection />
      
       
      </div>
  )
}

export default page