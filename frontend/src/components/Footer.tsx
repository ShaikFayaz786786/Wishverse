import React from 'react'
import { Sparkles, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '2.5rem 1.5rem',
      background: 'rgba(9, 5, 20, 0.9)',
      marginTop: 'auto',
      textAlign: 'center',
      fontSize: '0.88rem',
      color: '#94a3b8',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#fff' }}>
          <Sparkles size={16} color="#c084fc" />
          <span>Wishverse V1</span>
        </div>
        <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.84rem' }}>
          Personalized digital wishes made effortless, interactive, and shareable with zero receiver friction.
        </p>
        <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Crafted with <Heart size={13} color="#f43f5e" fill="#f43f5e" /> for heartfelt moments worldwide.
        </div>
      </div>
    </footer>
  )
}
