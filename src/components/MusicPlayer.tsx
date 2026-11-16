import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react'

interface MusicPlayerProps {
  isPlaying: boolean
  isMuted: boolean
  hasAudioError: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
}

export default function MusicPlayer({
  isPlaying,
  isMuted,
  hasAudioError,
  onTogglePlay,
  onToggleMute,
}: MusicPlayerProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  // Brief tooltip cue on first reveal
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2500)
    const hideTimer = setTimeout(() => setShowTooltip(false), 7500)
    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <aside
      className="music-controller-root"
      aria-label="Background Wedding Music Controls"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="music-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowTooltip(false)}
          >
            <span>
              {hasAudioError
                ? 'Place wedding-theme.mp3 in public/music/'
                : isPlaying
                  ? '♪ Playing Wedding Instrumental'
                  : 'Tap to play Wedding Theme'}
            </span>
            <div className="tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="music-player-pill">
        {/* Equalizer animation when playing */}
        <div
          className={`music-eq-indicator ${isPlaying && !isMuted && !hasAudioError ? 'is-active' : ''}`}
          title={isPlaying ? 'Music playing' : 'Music paused'}
          onClick={() => setShowTooltip((v) => !v)}
          role="button"
          tabIndex={0}
          aria-label="Music status indicator"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setShowTooltip((v) => !v)
          }}
        >
          <span className="eq-bar eq-bar-1" />
          <span className="eq-bar eq-bar-2" />
          <span className="eq-bar eq-bar-3" />
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          className="music-btn"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause size={15} className="music-btn-icon" />
          ) : (
            <Play size={15} className="music-btn-icon ml-0.5" />
          )}
        </button>

        {/* Mute/Unmute Button */}
        <button
          type="button"
          className="music-btn"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          title={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
            <VolumeX size={15} className="music-btn-icon" />
          ) : (
            <Volume2 size={15} className="music-btn-icon" />
          )}
        </button>

        <span className="music-badge-label">
          <Music size={11} className="inline mr-1 opacity-70" />
          Theme
        </span>
      </div>
    </aside>
  )
}
