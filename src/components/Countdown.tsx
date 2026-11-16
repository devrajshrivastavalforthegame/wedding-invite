import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { wedding } from '../data/wedding'

const WEDDING_TIMESTAMP = new Date(wedding.targetDate.iso).getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPassed: boolean
}

function calculateTimeLeft(): TimeLeft {
  const difference = WEDDING_TIMESTAMP - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPassed: false,
  }
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft)

  useEffect(() => {
    // Initial check
    setTimeLeft(calculateTimeLeft())

    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ]

  return (
    <section className="countdown-section" aria-label="Wedding Countdown">
      <div className="section-heading">
        <span className="section-eyebrow">
          COUNTING DOWN TO FOREVER
        </span>

        <h2>Until the Auspicious Hour</h2>

        <div className="section-ornament">
          <span className="ornament-line" />
          <span className="ornament-glyph">✦ ॐ ✦</span>
          <span className="ornament-line" />
        </div>
      </div>

      <div className="countdown-grid">
        {units.map((unit, index) => (
          <motion.div
            className="countdown-card"
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="countdown-card-inner">
              <span className="countdown-value">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="countdown-label">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="countdown-target-note">
        12 December 2026 · 7:30 PM IST · Shangri-La Palace, Patna
      </p>
    </section>
  )
}
