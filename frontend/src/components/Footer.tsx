import React from 'react'
import { Sparkles, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(162, 91, 102, 0.16)',
      padding: '2.5rem 1.5rem',
      background: 'rgba(255, 248, 244, 0.68)',
      marginTop: 'auto',
      textAlign: 'center',
      fontSize: '0.88rem',
      color: 'var(--text-muted)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
          <Sparkles size={16} color="#c96e87" />
          <span>Wishverse V1</span>
        </div>
        <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.84rem' }}>
          Personalized digital wishes made effortless, interactive, and shareable with zero receiver friction.
        </p>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Crafted with <Heart size={13} color="#f43f5e" fill="#f43f5e" /> for heartfelt moments worldwide.
        </div>
      </div>
    </footer>
  )
}
