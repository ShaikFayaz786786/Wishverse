import React, { useMemo } from 'react'

interface ParticleBackgroundProps {
  animationPreset: string
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ animationPreset }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.2 + Math.random() * 4) % 96}%`,
      top: `${Math.random() * 90}%`,
      delay: `${(i * 0.4).toFixed(2)}s`,
      duration: `${(6 + (i % 5) * 1.5).toFixed(1)}s`,
      size: `${14 + (i % 4) * 6}px`,
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
          { top: '22%', left: '20%', delay: '0s' },
          { top: '32%', left: '75%', delay: '1.2s' },
          { top: '65%', left: '28%', delay: '2.4s' },
          { top: '55%', left: '80%', delay: '0.8s' },
          { top: '15%', left: '50%', delay: '1.8s' },
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

  if (animationPreset === 'shooting-stars') {
    return (
      <div className="animation-particles-container">
        {[
          { top: '12%', right: '10%', delay: '0s', duration: '4s' },
          { top: '28%', right: '25%', delay: '1.5s', duration: '4.8s' },
          { top: '48%', right: '5%', delay: '3s', duration: '3.8s' },
          { top: '65%', right: '35%', delay: '2.2s', duration: '5.2s' },
        ].map((star, idx) => (
          <div
            key={idx}
            className="particle-item particle-shooting-star"
            style={{
              top: star.top,
              right: star.right,
              animationDelay: star.delay,
              animationDuration: star.duration,
              fontSize: '22px',
            }}
          >
            🌠
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
      case 'cherry-petals':
        return '🌸'
      case 'floating-lanterns':
        return '🏮'
      case 'snowfall-magic':
        return '❄️'
      case 'firefly-dance':
        return '✨'
      case 'champagne-bubbles':
        return '🫧'
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
      case 'cherry-petals':
        return 'particle-petal'
      case 'floating-lanterns':
        return 'particle-lantern'
      case 'snowfall-magic':
        return 'particle-snow'
      case 'firefly-dance':
        return 'particle-firefly'
      case 'champagne-bubbles':
        return 'particle-bubble'
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
