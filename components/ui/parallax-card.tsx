'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'

interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  parallaxSpeed?: number
}

export default function ParallaxCard({
  children,
  className = '',
  tiltAmount = 10,
  parallaxSpeed = 0,
}: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const card = cardRef.current
      if (!card) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      // 1. Optional Scroll Parallax
      if (parallaxSpeed !== 0) {
        gsap.to(card, {
          yPercent: parallaxSpeed * 10,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // 2. Interactive 3D Tilt on Hover
      if (tiltAmount > 0) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateX = ((y - centerY) / centerY) * -tiltAmount
          const rotateY = ((x - centerX) / centerX) * tiltAmount

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: 'power2.out',
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mousemove', handleMouseMove)
        card.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          card.removeEventListener('mousemove', handleMouseMove)
          card.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    },
    { scope: cardRef, dependencies: [tiltAmount, parallaxSpeed] }
  )

  return (
    <div ref={cardRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  )
}
