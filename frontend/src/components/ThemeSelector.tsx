import React from 'react'
import { THEMES } from '../styles/themes'
import { Check } from 'lucide-react'

interface ThemeSelectorProps {
  selectedTheme: string
  onSelectTheme: (themeId: string) => void
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onSelectTheme }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
      {THEMES.map((theme) => {
        const isSelected = selectedTheme === theme.id
        return (
          <div
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            style={{
              background: theme.previewGradient,
              borderRadius: '16px',
              padding: '1.25rem 1rem',
              cursor: 'pointer',
              border: isSelected ? `2px solid ${theme.accentColor}` : '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: isSelected ? `0 0 20px ${theme.accentColor}55` : 'none',
              transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '130px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(4px)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '99px',
                  color: '#fff',
                }}
              >
                {theme.badge}
              </span>
              {isSelected && (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: theme.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                  }}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                {theme.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.3 }}>
                {theme.description}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
