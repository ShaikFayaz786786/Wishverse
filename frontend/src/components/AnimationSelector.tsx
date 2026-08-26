import React from 'react'
import { ANIMATIONS } from '../styles/themes'
import { Check } from 'lucide-react'

interface AnimationSelectorProps {
  selectedAnimation: string
  onSelectAnimation: (animId: string) => void
}

export const AnimationSelector: React.FC<AnimationSelectorProps> = ({
  selectedAnimation,
  onSelectAnimation,
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
      {ANIMATIONS.map((anim) => {
        const isSelected = selectedAnimation === anim.id
        return (
          <div
            key={anim.id}
            onClick={() => onSelectAnimation(anim.id)}
            style={{
              background: isSelected ? 'rgba(192, 132, 252, 0.12)' : 'rgba(255, 255, 255, 0.04)',
              borderRadius: '14px',
              padding: '1.1rem 1rem',
              cursor: 'pointer',
              border: isSelected ? '2px solid var(--border-focus)' : '1px solid var(--border-subtle)',
              boxShadow: isSelected ? '0 0 15px rgba(192, 132, 252, 0.25)' : 'none',
              transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.75rem' }}>{anim.icon}</span>
              {isSelected && (
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--theme-accent, #c084fc)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                  }}
                >
                  <Check size={13} strokeWidth={3} />
                </div>
              )}
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#fff' }}>{anim.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px', lineHeight: 1.3 }}>
                {anim.description}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
