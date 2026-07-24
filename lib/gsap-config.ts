'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

export const EASE = {
  outExpo: 'power4.out',
  outSmooth: 'power3.out',
  inOutSmooth: 'power3.inOut',
  bounceElastic: 'elastic.out(1, 0.75)',
  backOut: 'back.out(1.7)',
}
