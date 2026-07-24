'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  asChild?: boolean
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const target = buttonRef.current
      if (!target) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        gsap.to(target, {
          x: deltaX,
          y: deltaY,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const handleMouseLeave = () => {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)',
        })
      }

      target.addEventListener('mousemove', handleMouseMove)
      target.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        target.removeEventListener('mousemove', handleMouseMove)
        target.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    { scope: buttonRef }
  )

  return (
    <div
      ref={buttonRef}
      onClick={onClick}
      className={`inline-block transition-transform duration-100 ease-out cursor-pointer ${className}`}
    >
      {children}
    </div>
  )
}
