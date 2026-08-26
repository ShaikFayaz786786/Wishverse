import React, { useMemo } from 'react'

interface ParticleBackgroundProps {
  animationPreset: string
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ animationPreset }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.random() * 5) % 96}%`,
      top: `${Math.random() * 90}%`,
      delay: `${(i * 0.45).toFixed(2)}s`,
      duration: `${(6 + (i % 5) * 1.5).toFixed(1)}s`,
      size: `${14 + (i % 4) * 6}px`,
      colorOpacity: 0.5 + (i % 5) * 0.1,
    }))
  }, [])

  if (animationPreset === 'pulsing-glow') {
    return (
      <div className="animation-particles-container">
        <div
          className="ambient-glow-orb"
          style={{ width: '450px', height: '450px', top: '10%', left: '15%' }}
        />
        <div
          className="ambient-glow-orb"
          style={{ width: '400px', height: '400px', bottom: '15%', right: '15%', animationDelay: '-3s' }}
        />
      </div>
    )
  }

  if (animationPreset === 'cosmic-fireworks') {
    return (
      <div className="animation-particles-container">
        {[
          { top: '25%', left: '20%', delay: '0s' },
          { top: '35%', left: '75%', delay: '1.2s' },
          { top: '65%', left: '30%', delay: '2.4s' },
          { top: '55%', left: '80%', delay: '0.8s' },
        ].map((fw, idx) => (
          <div
            key={idx}
            className="particle-item particle-firework"
            style={{
              top: fw.top,
              left: fw.left,
              animationDelay: fw.delay,
              fontSize: '32px',
            }}
          >
            ✨
          </div>
        ))}
      </div>
    )
  }

  const renderSymbol = () => {
    switch (animationPreset) {
      case 'gentle-hearts':
        return '💖'
      case 'floating-balloons':
        return '🎈'
      case 'confetti-cascade':
        return '🎉'
      case 'floating-sparkles':
      default:
        return '✨'
    }
  }

  const getAnimationClass = () => {
    switch (animationPreset) {
      case 'gentle-hearts':
        return 'particle-heart'
      case 'floating-balloons':
        return 'particle-balloon'
      case 'confetti-cascade':
        return 'particle-sparkle'
      case 'floating-sparkles':
      default:
        return 'particle-sparkle'
    }
  }

  return (
    <div className="animation-particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle-item ${getAnimationClass()}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
          }}
        >
          {renderSymbol()}
        </div>
      ))}
    </div>
  )
}
