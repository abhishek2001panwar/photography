'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/navbar'

interface Video {
  id: number
  title: string
  category: 'Landscape' | 'Portrait' | 'Architecture' | 'Lifestyle' | 'Wedding'
  thumbnail: string
  videoUrl: string
  size: 'small' | 'medium' | 'large'
}

const VIDEOS: Video[] = [
  {
    id: 1,
    title: 'Sarah & James Wedding',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'large',
  },
  {
    id: 2,
    title: 'Elegant Ceremony',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'small',
  },
  {
    id: 3,
    title: 'First Dance',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'small',
  },
  {
    id: 4,
    title: 'Emma & Michael',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Reception Highlights',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1529887220633-360a91b0ee02?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'small',
  },
  {
    id: 6,
    title: 'Vows & Promises',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'medium',
  },
  {
    id: 7,
    title: 'Getting Ready',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'small',
  },
  {
    id: 8,
    title: 'Sunset Portraits',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'large',
  },
  {
    id: 9,
    title: 'Reception Glow',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'small',
  },
  {
    id: 10,
    title: 'Lisa & David',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1529887220633-360a91b0ee02?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'medium',
  },
  {
    id: 11,
    title: 'Magical Moments',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'small',
  },
  {
    id: 12,
    title: 'Forever Starts Today',
    category: 'Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    size: 'large',
  },
]

export default function FilmPage() {
  return (
    <>
      <Navbar theme="light" />
      
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1px;
        
          padding: 1px;
        }
        
        .video-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        
          aspect-ratio: 1;
        }

        .video-card.small {
          grid-column: span 1;
          grid-row: span 1;
        }

        .video-card.medium {
          grid-column: span 2;
          grid-row: span 1;
        }

        .video-card.large {
          grid-column: span 2;
          grid-row: span 2;
        }

        @media (max-width: 768px) {
          .video-card.medium {
            grid-column: span 1;
          }
          .video-card.large {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        .video-card img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }

        .video-card:hover img { 
          transform: scale(1.08);
        }

        .video-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(42,31,20,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-card:hover .video-card-overlay { 
          opacity: 1; 
        }

        .video-card-play {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #c9a96e;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .video-card:hover .video-card-play { 
          background: #f0ece6;
          transform: scale(1.2);
        }
      `}</style>

      {/* BENTO GRID - WEDDING FILMS */}
      <section className="w-full pt-24 pb-0 min-h-screen">
        <div className="px-8 md:px-16 lg:px-20 mb-12">
          <h1 className="capitalize font-heading font-light text-[clamp(2.5rem,4vw,4rem)] text-[#3b2a1f] leading-tight">
            Our Wedding Films
          </h1>
        </div>
        <div className="bento-grid">
          {VIDEOS.map(video => (
            <div
              key={video.id}
              className={`video-card ${video.size}`}
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                priority={video.size === 'large'}
              />
              <div className="video-card-overlay">
                <div className="video-card-play">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5L19 12L8 19V5Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}