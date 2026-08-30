import React, { useState, useMemo } from 'react'
import { WishTemplate, TemplateCategory } from '../types'
import { WISH_TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templates'
import { WishPreviewCard } from './WishPreviewCard'
import { X, Search, Sparkles, Eye, Check, ArrowRight, Wand2 } from 'lucide-react'

interface TemplatePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: WishTemplate) => void
}

export const TemplatePickerModal: React.FC<TemplatePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [previewTemplate, setPreviewTemplate] = useState<WishTemplate | null>(null)

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

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 2, 12, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '1020px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          border: '1px solid rgba(192, 132, 252, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(192, 132, 252, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(46, 16, 101, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                {previewTemplate ? 'Template Preview' : 'Celebration Template Library'}
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                {previewTemplate
                  ? `Previewing "${previewTemplate.name}" with dynamic animation & styling`
                  : 'Choose a pre-written, beautifully styled wish template to jumpstart your creation.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.4rem 0.6rem', borderRadius: '50%' }}
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        {previewTemplate ? (
          <div style={{ padding: '1.75rem', overflowY: 'auto', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="btn btn-outline btn-sm"
              >
                ← Back to All Templates
              </button>

              <button
                onClick={() => {
                  onSelectTemplate(previewTemplate)
                  onClose()
                }}
                className="btn btn-primary"
              >
                <Check size={16} />
                <span>Use This Template</span>
              </button>
            </div>

            <div style={{ maxWidth: '780px', margin: '0 auto' }}>
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
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Filter & Search Bar */}
            <div
              style={{
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                background: 'rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Category Pills */}
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
                      padding: '0.4rem 0.85rem',
                      borderRadius: '99px',
                      border: '1px solid',
                      borderColor:
                        selectedCategory === cat ? '#c084fc' : 'rgba(255, 255, 255, 0.1)',
                      background:
                        selectedCategory === cat
                          ? 'rgba(192, 132, 252, 0.25)'
                          : 'rgba(255, 255, 255, 0.04)',
                      color: selectedCategory === cat ? '#fff' : '#94a3b8',
                      fontSize: '0.82rem',
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

              {/* Search input */}
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Search templates by keyword, occasion, message content..."
                  className="form-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2.4rem', fontSize: '0.9rem' }}
                />
                <Search
                  size={16}
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

            {/* Templates Grid Container */}
            <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
              {filteredTemplates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                  <Wand2 size={32} color="#c084fc" style={{ marginBottom: '0.75rem' }} />
                  <h3>No templates match your search</h3>
                  <p style={{ fontSize: '0.88rem', marginTop: '0.4rem' }}>
                    Try searching for different keywords or select "All" categories.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  {filteredTemplates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="glass-card"
                      style={{
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div>
                        {/* Top Badge & Category */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.6rem',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              background: 'rgba(192, 132, 252, 0.15)',
                              color: '#c084fc',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '99px',
                            }}
                          >
                            {tpl.badge}
                          </span>

                          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                            {tpl.occasion}
                          </span>
                        </div>

                        {/* Title & Preview Text */}
                        <h4
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            marginBottom: '0.4rem',
                            color: '#f8fafc',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                          }}
                        >
                          <span>{tpl.icon}</span>
                          <span>{tpl.name}</span>
                        </h4>

                        <p
                          style={{
                            fontSize: '0.82rem',
                            color: '#94a3b8',
                            lineHeight: 1.45,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            marginBottom: '0.75rem',
                          }}
                        >
                          {tpl.message}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid var(--border-subtle)',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setPreviewTemplate(tpl)}
                          className="btn btn-outline btn-sm"
                          style={{ flex: 1, fontSize: '0.78rem' }}
                          title="Preview full interactive wish"
                        >
                          <Eye size={14} />
                          <span>Preview</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectTemplate(tpl)
                            onClose()
                          }}
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1.2, fontSize: '0.78rem' }}
                        >
                          <span>Use Template</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
