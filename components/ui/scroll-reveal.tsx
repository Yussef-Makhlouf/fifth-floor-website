'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'stagger'
  delay?: number
  duration?: number
  staggerAmount?: number
  className?: string
  threshold?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 1,
  staggerAmount = 0.15,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Check prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      let fromVars: gsap.TweenVars = { opacity: 0 }
      let toVars: gsap.TweenVars = {
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      }

      switch (variant) {
        case 'fade-up':
          fromVars.y = 50
          toVars.y = 0
          break
        case 'fade-down':
          fromVars.y = -50
          toVars.y = 0
          break
        case 'fade-left':
          fromVars.x = 60
          toVars.x = 0
          break
        case 'fade-right':
          fromVars.x = -60
          toVars.x = 0
          break
        case 'scale':
          fromVars.scale = 0.92
          toVars.scale = 1
          break
        case 'stagger':
          const targets = containerRef.current.children
          if (targets.length > 0) {
            gsap.fromTo(
              targets,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: duration,
                delay: delay,
                stagger: staggerAmount,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: 'top 85%',
                  toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                },
              }
            )
            return
          }
          break
      }

      gsap.fromTo(containerRef.current, fromVars, toVars)
    },
    { scope: containerRef, dependencies: [variant, delay, duration] }
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
