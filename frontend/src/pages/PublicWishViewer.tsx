import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PublicWish } from '../types'
import { getPublicWish } from '../services/api'
import { WishPreviewCard } from '../components/WishPreviewCard'
import { Sparkles, Gift, Share2, Check, AlertCircle, ArrowRight, Wand2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export const PublicWishViewer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [wish, setWish] = useState<PublicWish | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [copiedLink, setCopiedLink] = useState<boolean>(false)

  useEffect(() => {
    if (!slug) {
      setError('Invalid link. No wish identifier provided.')
      setIsLoading(false)
      return
    }

    getPublicWish(slug)
      .then((data) => {
        setWish(data)
        setIsLoading(false)
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : 'This wish could not be loaded. It may have been unpublished or the link is invalid.'
        )
        setIsLoading(false)
      })
  }, [slug])

  const handleOpenWish = () => {
    setIsOpened(true)

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#f43f5e', '#fb923c', '#38bdf8', '#facc15', '#2dd4bf'],
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: wish?.title || 'A Wish on Wishverse',
          text: `Check out this magical wish for ${wish?.recipient_name || 'you'}!`,
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 3000)
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
        }}
      >
        <Sparkles size={40} color="#c084fc" style={{ animation: 'spin 1.5s linear infinite' }} />
        <h2 style={{ fontSize: '1.4rem' }}>Unlocking Your Magical Wish...</h2>
      </div>
    )
  }

  if (error || !wish) {
    return (
      <div style={{ maxWidth: '540px', margin: '4rem auto', padding: '0 1rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444',
              marginBottom: '1.25rem',
            }}
          >
            <AlertCircle size={32} />
          </div>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Wish Unavailable</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {error || 'This wish link is either invalid, expired, or currently set to private by its creator.'}
          </p>

          <Link to="/" className="btn btn-primary">
            <span>Explore Wishverse</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '840px', margin: '1.5rem auto 4rem', padding: '0 1rem' }}>
      {/* If unopened: Interactive Gift Envelope Presentation */}
      {!isOpened ? (
        <div
          data-theme={wish.theme}
          style={{
            background: 'var(--theme-bg-gradient)',
            borderRadius: '28px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid var(--theme-card-border)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px var(--theme-accent-glow)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div
              style={{
                width: '85px',
                height: '85px',
                borderRadius: '24px',
                background: 'var(--theme-envelope-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 10px 30px var(--theme-accent-glow)',
                animation: 'floatSparkle 4s ease-in-out infinite',
              }}
            >
              <Gift size={42} />
            </div>

            <div>
              <span
                style={{
                  background: 'var(--theme-tag-bg)',
                  color: 'var(--theme-tag-text)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '99px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '1rem',
                }}
              >
                <Sparkles size={14} />
                Special {wish.occasion} Wish
              </span>

              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '0.5rem', color: '#fff' }}>
                Dear <span style={{ color: 'var(--theme-accent)' }}>{wish.recipient_name}</span>,
              </h1>

              <p style={{ color: 'var(--theme-text-secondary)', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto' }}>
                A personalized celebration crafted especially for you by{' '}
                <strong style={{ color: '#fff' }}>{wish.sender_name}</strong> is ready to be opened.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenWish}
              className="btn btn-primary btn-lg"
              style={{
                background: 'var(--theme-btn-gradient)',
                padding: '1rem 2.5rem',
                fontSize: '1.2rem',
                borderRadius: '99px',
                boxShadow: '0 10px 30px var(--theme-accent-glow)',
                cursor: 'pointer',
              }}
            >
              <Sparkles size={20} />
              <span>Tap to Open Your Wish ✨</span>
            </button>
          </div>
        </div>
      ) : (
        /* Revealed Wish View */
        <div className="reveal-card-anim">
          {/* Top Actions for Receiver */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', padding: '0 0.5rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              <Sparkles size={14} color="#c084fc" />
              <span>Created with Wishverse</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="btn btn-secondary btn-sm"
            >
              {copiedLink ? <Check size={14} /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Wish'}</span>
            </button>
          </div>

          <WishPreviewCard
            title={wish.title}
            recipientName={wish.recipient_name}
            senderName={wish.sender_name}
            message={wish.message}
            occasion={wish.occasion}
            theme={wish.theme}
            animationPreset={wish.animation_preset}
            media={wish.media}
          />

          {/* Bottom Viral CTA for Receivers */}
          <div
            className="glass-card"
            style={{
              marginTop: '2.5rem',
              padding: '2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              background: 'linear-gradient(135deg, rgba(30, 10, 50, 0.6) 0%, rgba(13, 7, 26, 0.8) 100%)',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              <Wand2 size={22} />
            </div>

            <h3 style={{ fontSize: '1.3rem' }}>Loved this wish?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '460px' }}>
              Create your own magical personalized wish for a friend, partner, or family member in minutes.
            </p>

            <Link to="/create" className="btn btn-primary">
              <Sparkles size={16} />
              <span>Create a Wish on Wishverse</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
