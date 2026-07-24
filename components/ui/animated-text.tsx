'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'

interface AnimatedTextProps {
  text: string
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  triggerOnScroll?: boolean
  splitType?: 'words' | 'chars'
}

export default function AnimatedText({
  text,
  el: Tag = 'h1',
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  triggerOnScroll = true,
  splitType = 'words',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement & HTMLParagraphElement & HTMLDivElement>(null)

  const items = splitType === 'words' ? text.split(' ') : text.split('')

  useGSAP(
    () => {
      if (!containerRef.current) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const elements = containerRef.current.querySelectorAll('.anim-item')
      if (!elements.length) return

      const animationVars: gsap.TweenVars = {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: 'power3.out',
      }

      if (triggerOnScroll) {
        animationVars.scrollTrigger = {
          trigger: containerRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }

      gsap.fromTo(
        elements,
        { y: '110%', rotateX: -20, opacity: 0 },
        animationVars
      )
    },
    { scope: containerRef, dependencies: [text, delay, duration, splitType] }
  )

  return (
    <Tag
      ref={containerRef}
      className={`inline-block overflow-hidden [perspective:1000px] ${className}`}
    >
      {items.map((item, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden align-top"
          style={{ paddingRight: splitType === 'words' ? '0.25em' : '0em' }}
        >
          <span className="anim-item inline-block transform-gpu will-change-transform">
            {item === ' ' ? '\u00A0' : item}
          </span>
        </span>
      ))}
    </Tag>
  )
}
