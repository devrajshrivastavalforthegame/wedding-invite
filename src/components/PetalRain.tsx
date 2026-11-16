import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number // 0% to 100%
  animationDuration: number // 8s to 16s
  animationDelay: number // 0s to 10s
  size: number // 14px to 26px
  type: 'rose' | 'marigold' | 'gold-leaf' | 'leaf'
  opacity: number
  swayType: 'sway-left' | 'sway-right' | 'sway-spin'
}

export default function PetalRain() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    // Generate static randomized petals once to avoid hydration mismatch
    const types: Array<'rose' | 'marigold' | 'gold-leaf' | 'leaf'> = [
      'rose',
      'rose',
      'marigold',
      'marigold',
      'gold-leaf',
      'leaf',
    ]
    const sways: Array<'sway-left' | 'sway-right' | 'sway-spin'> = [
      'sway-left',
      'sway-right',
      'sway-spin',
    ]

    const items: Petal[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.round((i * 4.6 + Math.random() * 3) % 100),
      animationDuration: 9 + (i % 6) * 1.5 + Math.random() * 2,
      animationDelay: -(i * 0.8), // Stagger start so screen is immediately populated
      size: 14 + (i % 5) * 3,
      type: types[i % types.length],
      opacity: 0.65 + (i % 4) * 0.08,
      swayType: sways[i % sways.length],
    }))

    setPetals(items)
  }, [])

  return (
    <div className="petal-rain-container" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`petal-item ${petal.swayType}`}
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            opacity: petal.opacity,
          }}
        >
          {petal.type === 'rose' && (
            <svg viewBox="0 0 30 40" fill="none" className="petal-svg">
              {/* Romantic Rose Petal */}
              <path
                d="M15 2 C24 6, 29 18, 26 28 C23 37, 15 39, 13 38 C7 35, 2 27, 4 17 C6 7, 12 2, 15 2 Z"
                fill="url(#roseGradient)"
              />
              <path
                d="M15 6 C20 12, 21 22, 16 30"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient
                  id="roseGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#A2384D" />
                  <stop offset="60%" stopColor="#7B2538" />
                  <stop offset="100%" stopColor="#4F1623" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {petal.type === 'marigold' && (
            <svg viewBox="0 0 30 40" fill="none" className="petal-svg">
              {/* Auspicious Marigold (Genda) Petal */}
              <path
                d="M15 2 C23 5, 28 16, 25 28 C22 36, 16 38, 14 38 C8 36, 3 27, 5 15 C7 6, 11 2, 15 2 Z"
                fill="url(#marigoldGradient)"
              />
              <path
                d="M15 6 C18 14, 18 24, 14 32"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient
                  id="marigoldGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#F9C758" />
                  <stop offset="60%" stopColor="#E29D26" />
                  <stop offset="100%" stopColor="#B36B10" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {petal.type === 'gold-leaf' && (
            <svg viewBox="0 0 30 40" fill="none" className="petal-svg">
              {/* Royal Gold Shimmer Leaf */}
              <path
                d="M15 2 C25 10, 27 25, 15 38 C3 25, 5 10, 15 2 Z"
                fill="url(#goldLeafGradient)"
              />
              <path
                d="M15 4 L15 36 M15 14 L20 10 M15 22 L22 17 M15 14 L10 10 M15 22 L8 17"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              <defs>
                <linearGradient
                  id="goldLeafGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#F2DFAB" />
                  <stop offset="50%" stopColor="#C9A86A" />
                  <stop offset="100%" stopColor="#8E6E34" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {petal.type === 'leaf' && (
            <svg viewBox="0 0 30 40" fill="none" className="petal-svg">
              {/* Subtle Sage Green Mango/Paan Leaf */}
              <path
                d="M15 3 C25 10, 26 26, 15 37 C4 26, 5 10, 15 3 Z"
                fill="url(#leafGradient)"
              />
              <path
                d="M15 5 L15 34 M15 13 L21 10 M15 22 L22 18 M15 13 L9 10 M15 22 L8 18"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.8"
              />
              <defs>
                <linearGradient
                  id="leafGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#9FB388" />
                  <stop offset="60%" stopColor="#6C8254" />
                  <stop offset="100%" stopColor="#4A5C36" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
