import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { WishTemplate, TemplateCategory } from '../types'
import { WISH_TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templates'
import { WishPreviewCard } from '../components/WishPreviewCard'
import { THEMES, ANIMATIONS } from '../styles/themes'
import { 
  Sparkles, 
  Search, 
  Eye, 
  ArrowRight, 
  Palette, 
  Wand2, 
  X, 
  Check,
  Layers
} from 'lucide-react'

export const TemplatesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [previewTemplate, setPreviewTemplate] = useState<WishTemplate | null>(null)

  const navigate = useNavigate()

  const filteredTemplates = useMemo(() => {
    return WISH_TEMPLATES.filter((tpl) => {
      const matchesCategory =
        selectedCategory === 'All' || tpl.category === selectedCategory
      const matchesSearch =
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.occasion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const handleUseTemplate = (tpl: WishTemplate) => {
    // Navigate to /create with query parameters or state
    navigate(`/create?template=${encodeURIComponent(tpl.id)}`, {
      state: { template: tpl },
    })
  }

  const getThemeName = (themeId: string) => {
    return THEMES.find((t) => t.id === themeId)?.name || themeId
  }

  const getAnimationName = (animId: string) => {
    return ANIMATIONS.find((a) => a.id === animId)?.name || animId
  }

  return (
    <div style={{ padding: '1rem 0 4rem' }}>
      {/* Hero Header */}
      <section style={{ textAlign: 'center', padding: '2rem 0 3rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(192, 132, 252, 0.12)',
            border: '1px solid rgba(192, 132, 252, 0.25)',
            padding: '0.4rem 1rem',
            borderRadius: '99px',
            fontSize: '0.85rem',
            color: '#e9d5ff',
            marginBottom: '1.25rem',
          }}
        >
          <Sparkles size={15} color="#c084fc" />
          <span>Curated Celebration Blueprints</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            fontWeight: 800,
            maxWidth: '850px',
            margin: '0 auto 1rem',
            letterSpacing: '-0.02em',
          }}
        >
          Wish Templates <span className="shimmer-text">For Every Emotion</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: '#94a3b8',
            maxWidth: '640px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}
        >
          Skip the blank canvas. Pick any professionally written, beautifully themed template and customize it in seconds for your loved ones.
        </p>

        {/* Quick Engine Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div
            className="glass-card"
            style={{
              padding: '0.6rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.85rem',
            }}
          >
            <Layers size={16} color="#c084fc" />
            <span><strong>{WISH_TEMPLATES.length}</strong> Pre-made Templates</span>
          </div>

          <div
            className="glass-card"
            style={{
              padding: '0.6rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.85rem',
            }}
          >
            <Palette size={16} color="#38bdf8" />
            <span><strong>{THEMES.length}</strong> Aesthetic Themes</span>
          </div>

          <div
            className="glass-card"
            style={{
              padding: '0.6rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.85rem',
            }}
          >
            <Sparkles size={16} color="#facc15" />
            <span><strong>{ANIMATIONS.length}</strong> Animation Presets</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Container */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
          }}
        >
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '99px',
                border: '1px solid',
                borderColor:
                  selectedCategory === cat ? '#c084fc' : 'rgba(255, 255, 255, 0.1)',
                background:
                  selectedCategory === cat
                    ? 'var(--primary-gradient)'
                    : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat ? '#fff' : '#94a3b8',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search templates (e.g. 21st birthday, wedding blessings, valentine, diwali, promotion)..."
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem', fontSize: '0.92rem' }}
          />
          <Search
            size={18}
            color="#94a3b8"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div
          className="glass-card"
          style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}
        >
          <Wand2 size={40} color="#c084fc" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>
            No matching templates found
          </h3>
          <p style={{ maxWidth: '420px', margin: '0 auto', fontSize: '0.92rem' }}>
            Try searching with different keywords or select a different occasion category.
          </p>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredTemplates.map((tpl) => {
            return (
              <div
                key={tpl.id}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
              >
                <div>
                  {/* Top Bar: Badge & Occasion */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: 'rgba(192, 132, 252, 0.15)',
                        color: '#c084fc',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '99px',
                      }}
                    >
                      {tpl.badge}
                    </span>

                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: '#94a3b8',
                        fontWeight: 500,
                      }}
                    >
                      {tpl.occasion}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      lineHeight: 1.3,
                      marginBottom: '0.5rem',
                      color: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span>{tpl.icon}</span>
                    <span>{tpl.name}</span>
                  </h3>

                  {/* Headline snippet */}
                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: '#c084fc',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    "{tpl.title}"
                  </div>

                  {/* Message body preview */}
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#94a3b8',
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '1rem',
                    }}
                  >
                    {tpl.message}
                  </p>

                  {/* Theme & Animation Indicators */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      fontSize: '0.75rem',
                      color: '#cbd5e1',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Palette size={12} color="#c084fc" />
                      {getThemeName(tpl.theme)}
                    </span>
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Sparkles size={12} color="#facc15" />
                      {getAnimationName(tpl.animationPreset)}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.6rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tpl)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                    title="Live interactive preview"
                  >
                    <Eye size={15} />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUseTemplate(tpl)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1.3 }}
                  >
                    <span>Use Template</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Live Preview Modal */}
      {previewTemplate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 2, 12, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto',
          }}
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '820px',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '2rem',
              border: '1px solid rgba(192, 132, 252, 0.35)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(192, 132, 252, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c084fc', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Sparkles size={15} />
                  <span>Template Live Experience Preview</span>
                </div>
                <h2 style={{ fontSize: '1.4rem' }}>{previewTemplate.name}</h2>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={() => handleUseTemplate(previewTemplate)}
                  className="btn btn-primary btn-sm"
                >
                  <Check size={16} />
                  <span>Customize This Wish</span>
                </button>

                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '0.4rem 0.6rem' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <WishPreviewCard
              title={previewTemplate.title}
              recipientName={previewTemplate.recipientName}
              senderName={previewTemplate.senderName}
              message={previewTemplate.message}
              occasion={previewTemplate.occasion}
              theme={previewTemplate.theme}
              animationPreset={previewTemplate.animationPreset}
              media={[]}
            />
          </div>
        </div>
      )}
    </div>
  )
}
