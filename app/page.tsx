import React from 'react'
import Navbar from './components/navbar'
import HeroSection from './components/hero'
import AboutSection from './components/about'
import VideoSection from './components/video'
import PortfolioSection from './components/PortfolioSection'
import Featured from './components/featured'
import About2 from './components/about2'
import ContactSection from './components/contact'
import PremiumContact from './components/contact'
import CTASection from './components/cta'
import PhotoSection from './components/PhotoSection'

function page() {
  return (
    <div className="">
      <Navbar theme="light" />
      <HeroSection />
      <AboutSection />
      <PhotoSection />
      <VideoSection />
      <PortfolioSection />
      <CTASection />
      <Featured />
      <About2 />
      <PremiumContact />
      
       
      </div>
  )
}

export default page