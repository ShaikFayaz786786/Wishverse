import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Share2, Eye, ShieldCheck, ArrowRight, Wand2 } from 'lucide-react'
import { WishPreviewCard } from '../components/WishPreviewCard'
import { checkBackendHealth } from '../services/api'
import { HealthStatus } from '../types'

export const LandingPage: React.FC = () => {
  const [backendHealth, setBackendHealth] = useState<HealthStatus | null>(null)
  const [demoTheme, setDemoTheme] = useState<string>('magical-starlight')

  useEffect(() => {
    checkBackendHealth()
      .then(setBackendHealth)
      .catch(() => setBackendHealth(null))
  }, [])

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ padding: '3.5rem 0 4rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(192, 132, 252, 0.12)', border: '1px solid rgba(192, 132, 252, 0.25)', padding: '0.4rem 1rem', borderRadius: '99px', fontSize: '0.85rem', color: '#e9d5ff', marginBottom: '1.5rem' }}>
          <Sparkles size={15} color="#c084fc" />
          <span>Next-Gen Digital Wishes • Zero Receiver Friction</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', lineHeight: 1.15, fontWeight: 800, maxWidth: '900px', margin: '0 auto 1.25rem', letterSpacing: '-0.03em' }}>
          Craft & Share <span className="shimmer-text">Magical Digital Wishes</span>
        </h1>

        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#94a3b8', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Turn heartfelt moments into unforgettable interactive experiences. Add personalized messages, photos, videos, and dynamic themes—shareable with an instant, zero-login link.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <Link to="/create" className="btn btn-primary btn-lg">
            <span>Create a Wish Now</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/signup" className="btn btn-secondary btn-lg">
            <span>Sign Up Free</span>
          </Link>
        </div>

        {/* Live Interactive Hero Demo Card */}
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Eye size={14} color="#c084fc" /> Live Interactive Preview Demo:
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['magical-starlight', 'sunset-glow', 'neon-cyberpunk', 'romantic-blossom', 'golden-elegance'].map((th) => (
                <button
                  key={th}
                  onClick={() => setDemoTheme(th)}
                  style={{
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.72rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)',
                    background: demoTheme === th ? 'rgba(192, 132, 252, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {th.split('-')[0]}
                </button>
              ))}
            </div>
          </div>

          <WishPreviewCard
            title="Happy 25th Birthday, Sarah! 🎂"
            recipientName="Sarah"
            senderName="Alex & The Squad"
            message="May your year ahead be filled with boundless joy, spontaneous adventures, and unforgettable memories! We are so lucky to have you in our lives. Keep shining bright! ✨🌟"
            occasion="Birthday"
            theme={demoTheme}
            animationPreset="floating-sparkles"
            media={[]}
          />
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Why People Love Wishverse</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Engineered for effortless creation and delightful reception.</p>
        </div>

        <div className="grid-cards">
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              <Share2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Zero-Friction Sharing</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Recipients open your unique wish link directly in their browser. No signups, apps, or passwords needed.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
              <Wand2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>6 Magical Themes</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              From Cosmic Starlight to Golden Elegance, select handcrafted visual identities with ambient particle effects.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Cryptographic Privacy</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Every published wish gets a random unguessable slug (e.g. <code>/w/a8F3kLm92Qx7</code>) for secure, unguessable sharing.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Three Simple Steps</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
              1
            </div>
            <h4 style={{ fontSize: '1.1rem' }}>Personalize Message</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Write your heartfelt note, set the occasion, and add the recipient's name.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
              2
            </div>
            <h4 style={{ fontSize: '1.1rem' }}>Add Photos & Style</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Upload memorable photos/videos and choose from polished themes and animations.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
              3
            </div>
            <h4 style={{ fontSize: '1.1rem' }}>Publish & Share</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Get a unique link and send it via WhatsApp, iMessage, Instagram, or email.</p>
          </div>
        </div>
      </section>

      {/* Backend Health Status Badge */}
      <div style={{ padding: '2rem 0', textAlign: 'center', fontSize: '0.82rem', color: '#64748b' }}>
        {backendHealth ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
            Wishverse API Engine v{backendHealth.version} Online
          </span>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span>
            Connecting to Wishverse API...
          </span>
        )}
      </div>
    </div>
  )
}
