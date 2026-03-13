'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function GlobalCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const cursorRingRef = useRef<HTMLDivElement>(null)
    const mousePos = useRef({ x: -100, y: -100 }) // start offscreen
    const ringPos = useRef({ x: -100, y: -100 })
    const [isMobile, setIsMobile] = useState(true) // default to true to prevent hydration mismatch
    const pathname = usePathname()

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Add global generic class when on desktop so we can style <body> cursor: none
    useEffect(() => {
        if (!isMobile) {
            document.body.classList.add('custom-cursor-enabled')
        } else {
            document.body.classList.remove('custom-cursor-enabled')
        }
        return () => document.body.classList.remove('custom-cursor-enabled')
    }, [isMobile])

    useEffect(() => {
        if (isMobile) return

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${e.clientX}px`
                cursorDotRef.current.style.top = `${e.clientY}px`
            }
        }

        let animId: number
        const animate = () => {
            // Lerp ring toward mouse
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
            if (cursorRingRef.current) {
                cursorRingRef.current.style.left = `${ringPos.current.x}px`
                cursorRingRef.current.style.top = `${ringPos.current.y}px`
            }
            animId = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', handleMouseMove)
        animId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animId)
        }
    }, [isMobile])

    // Hover effects for a, button, etc. (re-run on pathname change)
    useEffect(() => {
        if (isMobile) return

        const handleEnter = () => {
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(2.5)'
                cursorDotRef.current.style.opacity = '0.5'
            }
            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
                cursorRingRef.current.style.opacity = '0.3'
            }
        }
        
        const handleLeave = () => {
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
                cursorDotRef.current.style.opacity = '1'
            }
            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
                cursorRingRef.current.style.opacity = '1'
            }
        }

        // Wait a tick for DOM to update after navigation
        const timeoutId = setTimeout(() => {
            const interactives = document.querySelectorAll('a, button, input, textarea, select, .project-number, [role="button"]')
            interactives.forEach((el) => {
                el.addEventListener('mouseenter', handleEnter)
                el.addEventListener('mouseleave', handleLeave)
            })
        }, 100)

        return () => {
            clearTimeout(timeoutId)
            const interactives = document.querySelectorAll('a, button, input, textarea, select, .project-number, [role="button"]')
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', handleEnter)
                el.removeEventListener('mouseleave', handleLeave)
            })
        }
    }, [isMobile, pathname])

    if (isMobile) return null

    return (
        <div className="hidden md:block">
            <div
                ref={cursorDotRef}
                className="fixed w-[10px] h-[10px] bg-white rounded-full pointer-events-none z-[9999] transition-[transform,opacity] duration-200 mix-blend-difference"
                style={{ transform: 'translate(-50%, -50%)', left: -100, top: -100 }}
            />
            <div
                ref={cursorRingRef}
                className="fixed w-[36px] h-[36px] border border-white/50 rounded-full pointer-events-none z-[9998] transition-[transform,opacity] duration-200 mix-blend-difference"
                style={{ transform: 'translate(-50%, -50%)', left: -100, top: -100 }}
            />
        </div>
    )
}
