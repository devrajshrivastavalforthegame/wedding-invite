import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowDown,
  CalendarDays,
  Clock,
  ExternalLink,
  Flower2,
  Heart,
  Landmark,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react'

import Countdown from './components/Countdown'
import EnvelopeReveal from './components/EnvelopeReveal'
import MusicPlayer from './components/MusicPlayer'
import PetalRain from './components/PetalRain'
import { wedding, type WeddingEvent } from './data/wedding'

import './App.css'

// Icon mapping for each event type
function getEventIcon(iconType: WeddingEvent['icon']) {
  switch (iconType) {
    case 'mehendi':
      return Flower2
    case 'music':
      return Music2
    case 'haldi':
      return Sun
    case 'wedding':
      return Landmark
    case 'bidaai':
      return Heart
    default:
      return Sparkles
  }
}

interface EventCardProps {
  event: WeddingEvent
  index: number
}

function EventCard({ event, index }: EventCardProps) {
  const Icon = getEventIcon(event.icon)
  const [imageFailed, setImageFailed] = useState(!event.image)

  return (
    <motion.article
      className="event-card"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
    >
      <div className="event-image-wrap">
        {!imageFailed && event.image ? (
          <img
            src={event.image}
            alt={event.venue || event.title}
            className="event-image"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="event-image-fallback">
            <div className="fallback-inner">
              <Icon size={34} className="fallback-icon" />
              <span className="fallback-tag">{event.title}</span>
              <span className="fallback-motif">❧ ✦ ❧</span>
            </div>
          </div>
        )}

        <div className="event-image-overlay" />

        <div className="event-icon-badge" aria-hidden="true">
          <Icon size={20} />
        </div>

        <span className="event-index-number">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="event-content">
        <div className="event-date-row">
          <CalendarDays size={14} className="text-antique-gold" />
          <span className="event-date-text">{event.date}</span>
        </div>

        <h3 className="event-title">{event.title}</h3>

        {event.subtitle && (
          <p className="event-subtitle">{event.subtitle}</p>
        )}

        <div className="event-meta-list">
          <div className="event-meta-item">
            <Clock size={15} className="meta-icon" />
            <span>{event.time}</span>
          </div>

          <div className="event-meta-item">
            <MapPin size={15} className="meta-icon" />
            <span>{event.venue}</span>
          </div>
        </div>

        {event.mapUrl && (
          <div className="event-action-wrap">
            <a
              className="map-location-btn"
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${event.venue} on Google Maps`}
            >
              <span>VIEW VENUE MAP</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  )
}

function WeddingCelebrationPage() {
  const [photoError, setPhotoError] = useState(false)

  const scrollToCelebration = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('celebration')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      className="wedding-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {/* Top Banner Header */}
      <header className="top-bar">
        <span className="top-bar-sub">THE WEDDING CELEBRATION OF</span>
        <span className="top-bar-names">
          {wedding.bride} <span className="top-amp">&</span> {wedding.groom}
        </span>
        <span className="top-bar-date">{wedding.weddingDate}</span>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-corner hero-corner-tl" aria-hidden="true">
          ❖
        </div>
        <div className="hero-corner hero-corner-tr" aria-hidden="true">
          ❖
        </div>

        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Invocation */}
          <span className="ganesh-invocation">
            {wedding.introduction.invocation}
          </span>

          <div className="hero-ornament">
            <span className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <span className="line" />
          </div>

          <p className="hero-pretitle">
            {wedding.introduction.heading}
          </p>

          {/* Framed Couple Portrait */}
          <div className="couple-photo-wrapper">
            <div className="couple-photo-frame">
              <div className="photo-outer-border">
                <div className="photo-inner-border">
                  {!photoError ? (
                    <img
                      src="/images/couple-placeholder.png"
                      alt="Isha & Yatharth - Wedding Couple"
                      className="couple-photo"
                      onError={() => setPhotoError(true)}
                    />
                  ) : (
                    <div className="couple-photo-fallback">
                      <div className="fallback-monogram">IY</div>
                      <span className="fallback-text">Isha & Yatharth</span>
                      <span className="fallback-date">12.12.2026</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Gold floral badges on photo frame */}
              <span className="photo-flower photo-flower-one" aria-hidden="true">
                ✿
              </span>
              <span className="photo-flower photo-flower-two" aria-hidden="true">
                ✿
              </span>
            </div>
          </div>

          {/* Bride & Groom Script Typography */}
          <h1 className="couple-names">
            <span className="bride-name">{wedding.bride}</span>
            <span className="names-ampersand">&</span>
            <span className="groom-name">{wedding.groom}</span>
          </h1>

          <p className="hero-message">{wedding.introduction.message}</p>

          {/* Wedding Date Display */}
          <div className="hero-date-block">
            <span className="date-border-line" />
            <div className="hero-date-content">
              <span className="hero-date-day">12</span>
              <span className="hero-date-month">DECEMBER</span>
              <span className="hero-date-year">2026</span>
            </div>
            <span className="date-border-line" />
          </div>

          <p className="hero-location">{wedding.location.toUpperCase()}</p>

          <a
            href="#celebration"
            onClick={scrollToCelebration}
            className="scroll-link"
            aria-label="Scroll to wedding celebration details"
          >
            <span>EXPLORE THE CELEBRATION</span>
            <ArrowDown size={15} className="scroll-arrow" />
          </a>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-inner">
          <div className="section-ornament">
            <span className="line" />
            <span className="symbol">✦ ❧ ✦</span>
            <span className="line" />
          </div>

          <span className="section-eyebrow">A SACRED UNION</span>

          <h2 className="welcome-title">{wedding.welcome.title}</h2>

          <p className="welcome-body">{wedding.welcome.message}</p>

          <div className="welcome-divider">
            <span>❖</span>
          </div>
        </div>
      </section>

      {/* Live Wedding Countdown */}
      <Countdown />

      {/* Wedding Events Section */}
      <section className="celebration-section" id="celebration">
        <div className="section-heading">
          <span className="section-eyebrow">AUSPICIOUS OCCASIONS</span>
          <h2>Wedding Celebrations</h2>
          <p className="section-subtext">
            Join us for each sacred ceremony as we embark on this sacred
            journey of love, laughter, and lifelong togetherness.
          </p>
          <div className="section-ornament">
            <span className="line" />
            <span className="symbol">✦ ॐ ✦</span>
            <span className="line" />
          </div>
        </div>

        <div className="events-grid">
          {wedding.events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </section>

      {/* Family Names & Blessings Section */}
      <section className="family-section" id="families">
        <div className="section-heading">
          <span className="section-eyebrow">TWO HEARTS, TWO FAMILIES</span>
          <h2>{wedding.families.sectionTitle}</h2>
          <p className="section-subtext">{wedding.families.sectionSubtitle}</p>
          <div className="section-ornament">
            <span className="line" />
            <span className="symbol">✦ ❧ ✦</span>
            <span className="line" />
          </div>
        </div>

        <div className="family-cards-grid">
          {/* Bride's Family Card */}
          <motion.div
            className="family-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="family-card-header">
              <span className="family-badge">BRIDE'S SIDE</span>
              <h3 className="family-surname">
                {wedding.families.bride.surname}
              </h3>
            </div>
            <div className="family-card-body">
              <p className="family-blessing">
                {wedding.families.bride.blessingsFrom}
              </p>
              <div className="family-ornament-divider">❖</div>
              <p className="family-parents">
                {wedding.families.bride.parents}
              </p>
              {wedding.families.bride.parentDesignation && (
                <p className="family-parent-designation">
                  {wedding.families.bride.parentDesignation}
                </p>
              )}
              <p className="family-note">
                {wedding.families.bride.familyNote}
              </p>
            </div>
          </motion.div>

          {/* Groom's Family Card */}
          <motion.div
            className="family-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="family-card-header">
              <span className="family-badge">GROOM'S SIDE</span>
              <h3 className="family-surname">
                {wedding.families.groom.surname}
              </h3>
            </div>
            <div className="family-card-body">
              <p className="family-blessing">
                {wedding.families.groom.blessingsFrom}
              </p>
              <div className="family-ornament-divider">❖</div>
              <p className="family-parents">
                {wedding.families.groom.parents}
              </p>
              <p className="family-note">
                {wedding.families.groom.familyNote}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="rsvp-section" id="rsvp">
        <div className="rsvp-container">
          <div className="section-heading">
            <span className="section-eyebrow">WITH WARM COMPLIMENTS</span>
            <h2>{wedding.rsvp.title}</h2>
            <p className="section-subtext">{wedding.rsvp.note}</p>
            <div className="section-ornament">
              <span className="line" />
              <span className="symbol">✦ ॐ ✦</span>
              <span className="line" />
            </div>
          </div>

          <div className="rsvp-grid">
            {wedding.rsvp.contacts.map((contact, index) => (
              <motion.div
                key={contact.name}
                className="rsvp-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="rsvp-icon-wrap">
                  <Users size={22} />
                </div>
                <h4 className="rsvp-name">{contact.name}</h4>
                <span className="rsvp-relation">{contact.relation}</span>
                <span className="rsvp-role">{contact.role}</span>

                <div className="rsvp-actions">
                  <a
                    href={`tel:${contact.phoneClean}`}
                    className="rsvp-action-btn rsvp-call-btn"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone size={14} />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${contact.phoneClean}?text=Hello%20${encodeURIComponent(contact.name)},%20we%20are%20delighted%20to%20attend%20Isha%20%26%20Yatharth%27s%20wedding%20celebration!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rsvp-action-btn rsvp-whatsapp-btn"
                    aria-label={`WhatsApp ${contact.name}`}
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="rsvp-advice-note">{wedding.rsvp.advice}</p>
        </div>
      </section>

      {/* Closing Section */}
      <section className="closing-section">
        <div className="closing-inner">
          <div className="closing-decoration">❧ ✦ ❧</div>

          <span className="section-eyebrow">WITH WARM REGARDS</span>

          <h2 className="closing-title">{wedding.closing.heading}</h2>

          <p className="closing-message">{wedding.closing.message}</p>

          <div className="closing-signature">
            <span className="closing-names">
              {wedding.bride} <span className="amp">&</span> {wedding.groom}
            </span>
            <span className="closing-date-badge">
              {wedding.closing.dateDisplay}
            </span>
          </div>

          <div className="closing-heart-wrap">
            <Heart className="closing-heart" size={24} />
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <span className="footer-title">THE WEDDING CELEBRATION</span>
          <span className="footer-tagline">
            Isha & Yatharth · Patna, Bihar
          </span>
          <span className="footer-date">December 2026</span>
        </div>
      </footer>
    </motion.div>
  )
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasAudioError, setHasAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Start audio on user click on the wax seal
  const handleStartAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0
    audio.muted = isMuted

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          let currentVol = 0
          const targetVol = 0.3
          const fadeInterval = window.setInterval(() => {
            currentVol = Math.min(targetVol, currentVol + 0.04)
            if (audioRef.current && !audioRef.current.muted) {
              audioRef.current.volume = currentVol
            }
            if (currentVol >= targetVol) {
              window.clearInterval(fadeInterval)
            }
          }, 120)
        })
        .catch((err) => {
          console.warn('Audio play request notice:', err)
        })
    }
  }, [isMuted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.muted = isMuted
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Play interrupted:', err))
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    const newMuted = !isMuted
    audio.muted = newMuted
    setIsMuted(newMuted)
  }

  const handleAudioError = () => {
    setHasAudioError(true)
    setIsPlaying(false)
  }

  return (
    <div className="app-root">
      {/* Floating festive marigold and rose petals & leaves shower */}
      <PetalRain />

      {/* Single persistent audio element across whole application */}
      <audio
        ref={audioRef}
        src="/music/wedding-theme.mp3"
        loop
        preload="auto"
        onError={handleAudioError}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {isOpen ? (
          <WeddingCelebrationPage key="wedding-celebration" />
        ) : (
          <EnvelopeReveal
            key="envelope-reveal"
            onOpen={() => setIsOpen(true)}
            onStartAudio={handleStartAudio}
          />
        )}
      </AnimatePresence>

      {/* Floating Music Controller when wedding page is open */}
      {isOpen && (
        <MusicPlayer
          isPlaying={isPlaying}
          isMuted={isMuted}
          hasAudioError={hasAudioError}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
        />
      )}
    </div>
  )
}
