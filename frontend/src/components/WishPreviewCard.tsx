import React, { useState } from 'react'
import { MediaItem } from '../types'
import { getMediaUrl } from '../services/api'
import { ParticleBackground } from './ParticleBackground'
import { Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react'

interface WishPreviewCardProps {
  title: string
  recipientName: string
  senderName: string
  message: string
  occasion: string
  theme: string
  animationPreset: string
  media: MediaItem[]
}

export const WishPreviewCard: React.FC<WishPreviewCardProps> = ({
  title,
  recipientName,
  senderName,
  message,
  occasion,
  theme,
  animationPreset,
  media,
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0)

  const hasMedia = media && media.length > 0
  const currentMedia = hasMedia ? media[activeMediaIndex] : null

  const handleNextMedia = () => {
    if (!hasMedia) return
    setActiveMediaIndex((prev) => (prev + 1) % media.length)
  }

  const handlePrevMedia = () => {
    if (!hasMedia) return
    setActiveMediaIndex((prev) => (prev - 1 + media.length) % media.length)
  }

  return (
    <div
      data-theme={theme}
      style={{
        position: 'relative',
        background: 'var(--theme-bg-gradient)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px var(--theme-accent-glow)',
        border: '1px solid var(--theme-card-border)',
        color: 'var(--theme-text-primary)',
        transition: 'all 0.4s ease',
        minHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Dynamic Background Particle System */}
      <ParticleBackground animationPreset={animationPreset} />

      {/* Header Info */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span
            style={{
              background: 'var(--theme-tag-bg)',
              color: 'var(--theme-tag-text)',
              padding: '0.35rem 0.85rem',
              borderRadius: '99px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--theme-card-border)',
            }}
          >
            <Sparkles size={13} />
            {occasion || 'Special Celebration'}
          </span>

          <div style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary)', opacity: 0.9 }}>
            A wish for <strong style={{ color: '#fff' }}>{recipientName || 'You'}</strong>
          </div>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.9rem',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          {title || 'A Special Wish For You'}
        </h2>
      </div>

      {/* Media Carousel / Gallery */}
      {hasMedia && currentMedia && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            margin: '1.25rem 0',
            borderRadius: '16px',
            overflow: 'hidden',
            maxHeight: '340px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid var(--theme-card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {currentMedia.media_type === 'IMAGE' ? (
            <img
              src={getMediaUrl(currentMedia.url)}
              alt="Wish celebration photo"
              style={{
                width: '100%',
                maxHeight: '340px',
                objectFit: 'contain',
                borderRadius: '16px',
              }}
            />
          ) : (
            <video
              src={getMediaUrl(currentMedia.url)}
              controls
              style={{
                width: '100%',
                maxHeight: '340px',
                borderRadius: '16px',
              }}
            />
          )}

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevMedia}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={handleNextMedia}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <ChevronRight size={20} />
              </button>
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '99px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  color: '#fff',
                }}
              >
                {activeMediaIndex + 1} / {media.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Message Body */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'var(--theme-card-bg)',
          border: '1px solid var(--theme-card-border)',
          borderRadius: '16px',
          padding: '1.5rem',
          backdropFilter: 'blur(12px)',
          margin: '1rem 0',
        }}
      >
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: 'var(--theme-text-primary)',
            whiteSpace: 'pre-line',
          }}
        >
          {message || 'Your personalized message will appear here in all its magical glory...'}
        </p>
      </div>

      {/* Footer / Sender Signature */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--theme-accent)' }}>
          <Heart size={16} fill="currentColor" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sent with love</span>
        </div>

        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
          From: <span style={{ color: 'var(--theme-accent)' }}>{senderName || 'A Well-Wisher'}</span>
        </div>
      </div>
    </div>
  )
}
