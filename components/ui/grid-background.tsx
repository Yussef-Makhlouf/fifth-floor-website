'use client'

interface GridBackgroundProps {
    /**
     * Direction where the grid fades FROM - the grid is visible here
     * 'bottom' = grid visible at bottom, fades up
     * 'top' = grid visible at top, fades down
     * 'left' = grid visible at left, fades right
     * 'right' = grid visible at right, fades left
     * 'center' = grid visible in center, fades to edges
     * 'corner-bl' = grid visible at bottom-left corner
     * 'corner-br' = grid visible at bottom-right corner
     * 'corner-tl' = grid visible at top-left corner
     * 'corner-tr' = grid visible at top-right corner
     */
    fadeFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'corner-bl' | 'corner-br' | 'corner-tl' | 'corner-tr'
    gridColor?: string
    gridSizeX?: number
    gridSizeY?: number
    opacity?: number
    className?: string
}

const getMaskGradient = (fadeFrom: GridBackgroundProps['fadeFrom']) => {
    switch (fadeFrom) {
        case 'bottom':
            return 'radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)'
        case 'top':
            return 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)'
        case 'left':
            return 'radial-gradient(ellipse 60% 70% at 0% 50%, #000 60%, transparent 100%)'
        case 'right':
            return 'radial-gradient(ellipse 60% 70% at 100% 50%, #000 60%, transparent 100%)'
        case 'center':
            return 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)'
        case 'corner-bl':
            return 'radial-gradient(ellipse 80% 80% at 0% 100%, #000 40%, transparent 100%)'
        case 'corner-br':
            return 'radial-gradient(ellipse 80% 80% at 100% 100%, #000 40%, transparent 100%)'
        case 'corner-tl':
            return 'radial-gradient(ellipse 80% 80% at 0% 0%, #000 40%, transparent 100%)'
        case 'corner-tr':
            return 'radial-gradient(ellipse 80% 80% at 100% 0%, #000 40%, transparent 100%)'
        default:
            return 'radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)'
    }
}

export default function GridBackground({
    fadeFrom = 'bottom',
    gridColor = '#e2e8f0',
    gridSizeX = 20,
    gridSizeY = 30,
    opacity = 1,
    className = '',
}: GridBackgroundProps) {
    const maskGradient = getMaskGradient(fadeFrom)

    return (
        <div
            className={`absolute inset-0 z-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
                backgroundSize: `${gridSizeX}px ${gridSizeY}px`,
                WebkitMaskImage: maskGradient,
                maskImage: maskGradient,
                opacity,
            }}
        />
    )
}

// Additional decorative dot pattern
export function DotPattern({
    fadeFrom = 'bottom',
    dotColor = '#919191',
    dotSize = 2,
    spacing = 24,
    opacity = 0.3,
    className = '',
}: {
    fadeFrom?: GridBackgroundProps['fadeFrom']
    dotColor?: string
    dotSize?: number
    spacing?: number
    opacity?: number
    className?: string
}) {
    const maskGradient = getMaskGradient(fadeFrom)

    return (
        <div
            className={`absolute inset-0 z-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
                backgroundSize: `${spacing}px ${spacing}px`,
                WebkitMaskImage: maskGradient,
                maskImage: maskGradient,
                opacity,
            }}
        />
    )
}

// Cross pattern decoration
export function CrossPattern({
    fadeFrom = 'corner-br',
    color = '#919191',
    size = 12,
    spacing = 60,
    opacity = 0.15,
    className = '',
}: {
    fadeFrom?: GridBackgroundProps['fadeFrom']
    color?: string
    size?: number
    spacing?: number
    opacity?: number
    className?: string
}) {
    const maskGradient = getMaskGradient(fadeFrom)
    const halfSize = size / 2

    return (
        <div
            className={`absolute inset-0 z-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
                backgroundSize: `${size}px ${size}px`,
                backgroundPosition: `${halfSize}px ${halfSize}px`,
                WebkitMaskImage: `
          ${maskGradient},
          repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent ${spacing - size}px,
            #000 ${spacing - size}px,
            #000 ${spacing}px
          ),
          repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent ${spacing - size}px,
            #000 ${spacing - size}px,
            #000 ${spacing}px
          )
        `,
                WebkitMaskComposite: 'intersect',
                maskImage: maskGradient,
                maskComposite: 'intersect',
                opacity,
            }}
        />
    )
}
