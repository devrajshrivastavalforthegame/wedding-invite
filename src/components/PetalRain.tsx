import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: number
  animationDuration: number
  animationDelay: number
  size: number
  type: 'rose' | 'marigold' | 'gold-leaf' | 'leaf'
  opacity: number
  swayType: 'sway-left' | 'sway-right' | 'sway-spin'
}

export default function PetalRain() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const types: Array<'rose' | 'marigold' | 'gold-leaf' | 'leaf'> = [
      'rose',
      'marigold',
      'gold-leaf',
      'leaf',
    ]
    const sways: Array<'sway-left' | 'sway-right' | 'sway-spin'> = [
      'sway-left',
      'sway-right',
      'sway-spin',
    ]

    // Low intensity: only 10 gentle, subtle petals drifting slowly
    const items: Petal[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.round((i * 10 + 4 + Math.random() * 4) % 96),
      animationDuration: 14 + (i % 4) * 2.5 + Math.random() * 3, // Slow and calm
      animationDelay: -(i * 1.8),
      size: 13 + (i % 3) * 2.5, // Smaller delicate size
      type: types[i % types.length],
      opacity: 0.3 + (i % 3) * 0.08, // Soft, transparent, low intensity (0.30 - 0.46)
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
              <path
                d="M15 2 C24 6, 29 18, 26 28 C23 37, 15 39, 13 38 C7 35, 2 27, 4 17 C6 7, 12 2, 15 2 Z"
                fill="url(#roseGradientSubtle)"
              />
              <defs>
                <linearGradient
                  id="roseGradientSubtle"
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
              <path
                d="M15 2 C23 5, 28 16, 25 28 C22 36, 16 38, 14 38 C8 36, 3 27, 5 15 C7 6, 11 2, 15 2 Z"
                fill="url(#marigoldGradientSubtle)"
              />
              <defs>
                <linearGradient
                  id="marigoldGradientSubtle"
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
              <path
                d="M15 2 C25 10, 27 25, 15 38 C3 25, 5 10, 15 2 Z"
                fill="url(#goldLeafGradientSubtle)"
              />
              <defs>
                <linearGradient
                  id="goldLeafGradientSubtle"
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
              <path
                d="M15 3 C25 10, 26 26, 15 37 C4 26, 5 10, 15 3 Z"
                fill="url(#leafGradientSubtle)"
              />
              <defs>
                <linearGradient
                  id="leafGradientSubtle"
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
