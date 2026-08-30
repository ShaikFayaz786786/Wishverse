import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Share2, Eye, ShieldCheck, ArrowRight, Palette } from 'lucide-react'
import { WishPreviewCard } from '../components/WishPreviewCard'
import { WISH_TEMPLATES } from '../data/templates'
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

  const featuredTemplates = WISH_TEMPLATES.slice(0, 3)

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
          Turn heartfelt moments into unforgettable interactive experiences. Pick from 24+ pre-built templates, add photos & videos, and share instantly with zero receiver friction.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <Link to="/create" className="btn btn-primary btn-lg">
            <span>Create a Wish Now</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/templates" className="btn btn-secondary btn-lg">
            <Sparkles size={18} color="#c084fc" />
            <span>Explore 24+ Templates</span>
          </Link>
        </div>

        {/* Live Interactive Hero Demo Card */}
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0 0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Eye size={14} color="#c084fc" /> Live Interactive Preview Demo:
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['magical-starlight', 'aurora-borealis', 'cherry-blossom', 'sunset-glow', 'neon-cyberpunk', 'golden-elegance'].map((th) => (
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

      {/* Featured Templates Showcase Section */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c084fc', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              <Sparkles size={14} /> Ready-Made Inspiration
            </div>
            <h2 style={{ fontSize: '2rem' }}>Featured Celebration Templates</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Jumpstart your wish with handcrafted messages and matching themes.</p>
          </div>

          <Link to="/templates" className="btn btn-outline btn-sm">
            <span>View All 24+ Templates</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid-cards">
          {featuredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', padding: '0.2rem 0.55rem', borderRadius: '99px' }}>
                    {tpl.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{tpl.occasion}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>{tpl.icon}</span>
                  <span>{tpl.name}</span>
                </h3>

                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {tpl.message}
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link
                  to={`/create?template=${encodeURIComponent(tpl.id)}`}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Use This Template</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
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
              <Palette size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>14 Visual Themes & 12 Animations</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              From Sakura Petals and Aurora Borealis to Golden Elegance, select handcrafted visual identities with dynamic ambient particles.
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
            <h4 style={{ fontSize: '1.1rem' }}>Pick or Write Message</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Choose from 24+ rich templates or write your heartfelt custom note.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
              2
            </div>
            <h4 style={{ fontSize: '1.1rem' }}>Add Photos & Style</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Upload memorable photos/videos and choose from 14 themes and 12 animation presets.</p>
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
