import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface EnvelopeRevealProps {
  onOpen: () => void
  onStartAudio: () => void
}

export default function EnvelopeReveal({
  onOpen,
  onStartAudio,
}: EnvelopeRevealProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [flapOpened, setFlapOpened] = useState(false)

  const handleSealClick = () => {
    if (isOpening) return
    onStartAudio()
    setIsOpening(true)
  }

  useEffect(() => {
    if (!isOpening) return

    // Track flap fold state to adjust z-index cleanly in 3D
    const flapTimer = window.setTimeout(() => {
      setFlapOpened(true)
    }, 700)

    // Complete transition to main page at ~3.6s
    const completeTimer = window.setTimeout(() => {
      onOpen()
    }, 3600)

    return () => {
      window.clearTimeout(flapTimer)
      window.clearTimeout(completeTimer)
    }
  }, [isOpening, onOpen])

  return (
    <main
      className="envelope-screen"
      aria-label="Royal Wedding Envelope Invitation"
    >
      <div className="envelope-screen-vignette" />

      <div className="envelope-outer-frame">
        {/* Corner filigrees */}
        <span className="frame-corner corner-top-left" aria-hidden="true">
          ❖
        </span>
        <span className="frame-corner corner-top-right" aria-hidden="true">
          ❖
        </span>
        <span className="frame-corner corner-bottom-left" aria-hidden="true">
          ❖
        </span>
        <span className="frame-corner corner-bottom-right" aria-hidden="true">
          ❖
        </span>

        {/* Top Header */}
        <header className="envelope-top-header">
          <span className="ornament-glyph">✦</span>
          <span className="envelope-top-label">A CELEBRATION OF LOVE</span>
          <span className="ornament-glyph">✦</span>
        </header>

        {/* Envelope Stage */}
        <div className="envelope-stage">
          <motion.div
            className="royal-envelope-wrapper"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient gold glow behind envelope */}
            <div className="envelope-gold-glow" />

            <div className="royal-envelope">
              {/* Back flap / inside liner of the envelope */}
              <div className="envelope-back-liner" />

              {/* Emerging Ivory Invitation Card */}
              <motion.div
                className="emerging-invitation"
                initial={{ y: 20, scale: 0.96 }}
                animate={
                  isOpening
                    ? {
                        y: -190,
                        scale: 1.02,
                        filter: 'drop-shadow(0 20px 25px rgba(48, 41, 35, 0.25))',
                      }
                    : { y: 20, scale: 0.96 }
                }
                transition={{
                  duration: 1.6,
                  delay: isOpening ? 0.6 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="emerging-invitation-card">
                  <div className="emerging-card-inner-border">
                    <span className="card-top-ornament">✦ ॐ ✦</span>
                    <span className="card-invocation">श्री गणेशाय नमः</span>
                    <p className="card-intro">Together with their families</p>
                    <h1 className="card-couple-names">
                      Isha <span className="ampersand">&</span> Yatharth
                    </h1>
                    <div className="card-divider-ornament">
                      <span className="line" />
                      <span className="flower">❧</span>
                      <span className="line" />
                    </div>
                    <span className="card-wedding-date">
                      12 DECEMBER 2026
                    </span>
                    <span className="card-location">PATNA · BIHAR</span>
                  </div>
                </div>
              </motion.div>

              {/* Envelope Front Pocket (Masks the card inside) */}
              <div className="royal-envelope-body">
                <div className="envelope-inner-pattern" />
                <div className="envelope-front-border" />
                <div className="envelope-monogram">
                  <span>I</span>
                  <span className="amp">&</span>
                  <span>Y</span>
                </div>
                <div className="envelope-address">
                  <span>ROYAL WEDDING INVITATION</span>
                </div>
              </div>

              {/* 3D Top Flap */}
              <motion.div
                className={`royal-envelope-flap ${flapOpened ? 'flap-behind' : ''}`}
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{
                  duration: 0.95,
                  delay: isOpening ? 0.15 : 0,
                  ease: [0.65, 0, 0.35, 1],
                }}
              >
                <div className="flap-interior" />
                <div className="flap-border" />
              </motion.div>

              {/* Anchor positioned precisely at the apex tip (top: 57%, left: 50%) */}
              <div className="royal-wax-seal-anchor">
                <AnimatePresence>
                  {!isOpening && (
                    <motion.button
                      type="button"
                      className="royal-wax-seal"
                      aria-label="Break the wax seal to open your invitation"
                      onClick={handleSealClick}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        boxShadow: [
                          '0 6px 18px rgba(79, 30, 43, 0.45)',
                          '0 8px 24px rgba(184, 154, 97, 0.55)',
                          '0 6px 18px rgba(79, 30, 43, 0.45)',
                        ],
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.4,
                        filter: 'blur(4px)',
                        transition: { duration: 0.35, ease: 'easeOut' },
                      }}
                      transition={{
                        delay: 0.4,
                        duration: 0.6,
                        boxShadow: {
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <div className="seal-outer-rim" />
                      <div className="seal-inner-circle">
                        <span className="seal-monogram">IY</span>
                        <span className="seal-star">✦</span>
                      </div>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Envelope Ornamental Corners */}
              <span className="envelope-corner corner-tl">❧</span>
              <span className="envelope-corner corner-tr">❧</span>
              <span className="envelope-corner corner-bl">❧</span>
              <span className="envelope-corner corner-br">❧</span>
            </div>
          </motion.div>
        </div>

        {/* Footer instruction */}
        <footer className="envelope-footer">
          <p className="instruction-text">
            {isOpening
              ? 'Unfolding your royal invitation…'
              : 'Break the seal to open your invitation'}
          </p>
          <div className="envelope-bottom-label">
            ISHA & YATHARTH <span>·</span> 12 DECEMBER 2026
          </div>

          <button
            type="button"
            className="skip-intro-btn"
            onClick={() => {
              onStartAudio()
              onOpen()
            }}
          >
            Enter Website Directly →
          </button>
        </footer>
      </div>
    </main>
  )
}
