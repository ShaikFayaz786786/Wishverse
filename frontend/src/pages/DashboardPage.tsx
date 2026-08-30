import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Wish } from '../types'
import { getWishes, deleteWish, publishWish, unpublishWish } from '../services/api'
import { 
  PlusCircle, 
  Sparkles, 
  Edit3, 
  Trash2, 
  Eye, 
  Copy, 
  Check, 
  Globe, 
  Lock, 
  Search,
  AlertCircle
} from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const navigate = useNavigate()

  const loadWishes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getWishes()
      setWishes(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to load wishes.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadWishes()
  }, [])

  const handleDelete = async (wishId: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    try {
      await deleteWish(wishId)
      setWishes((prev) => prev.filter((w) => w.id !== wishId))
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete wish.')
    }
  }

  const handleTogglePublish = async (wish: Wish) => {
    try {
      if (wish.status === 'PUBLISHED') {
        const updated = await unpublishWish(wish.id)
        setWishes((prev) => prev.map((w) => (w.id === wish.id ? updated : w)))
      } else {
        const updated = await publishWish(wish.id)
        setWishes((prev) => prev.map((w) => (w.id === wish.id ? updated : w)))
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to change publish status.')
    }
  }

  const handleCopyLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/w/${slug}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 3000)
  }

  const filteredWishes = wishes.filter((wish) => {
    const matchesFilter =
      filter === 'ALL' ? true : wish.status === filter
    const matchesSearch =
      wish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wish.occasion.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const publishedCount = wishes.filter((w) => w.status === 'PUBLISHED').length
  const draftCount = wishes.filter((w) => w.status === 'DRAFT').length

  return (
    <div style={{ padding: '1rem 0 3rem' }}>
      {/* Header & Stats Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>My Wishes</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Manage, customize, and share your digital celebrations
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Link to="/templates" className="btn btn-secondary btn-lg">
            <Sparkles size={18} color="#c084fc" />
            <span>Templates</span>
          </Link>

          <Link to="/create" className="btn btn-primary btn-lg">
            <PlusCircle size={18} />
            <span>Create New Wish</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(192, 132, 252, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{wishes.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Wishes</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <Globe size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6ee7b7' }}>{publishedCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Live & Public</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(148, 163, 184, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            <Lock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#cbd5e1' }}>{draftCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Private Drafts</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: filter === tab ? 'var(--primary-gradient)' : 'rgba(255, 255, 255, 0.05)',
                color: filter === tab ? '#fff' : '#94a3b8',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'ALL' ? 'All Wishes' : tab === 'PUBLISHED' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <input
            type="text"
            placeholder="Search wishes..."
            className="form-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.3rem', paddingRight: '0.8rem', fontSize: '0.85rem' }}
          />
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Wishes List */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
          <Sparkles size={32} color="#c084fc" style={{ animation: 'spin 1.5s linear infinite', marginBottom: '1rem' }} />
          <p>Loading your wishes...</p>
        </div>
      ) : filteredWishes.length === 0 ? (
        /* Empty State */
        <div
          className="glass-card"
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'rgba(192, 132, 252, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc',
            }}
          >
            <Sparkles size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>
            {searchQuery || filter !== 'ALL' ? 'No matching wishes found' : 'No wishes created yet'}
          </h3>
          <p style={{ color: '#94a3b8', maxWidth: '420px', fontSize: '0.92rem' }}>
            {searchQuery || filter !== 'ALL'
              ? 'Try changing your search query or status filter.'
              : 'Create your first personalized digital wish with photos, audio, and custom animations!'}
          </p>
          {!searchQuery && filter === 'ALL' && (
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/templates" className="btn btn-secondary">
                <Sparkles size={16} color="#c084fc" />
                <span>Start from a Template</span>
              </Link>
              <Link to="/create" className="btn btn-primary">
                <PlusCircle size={16} />
                <span>Create from Scratch</span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid-cards">
          {filteredWishes.map((wish) => {
            const isPublished = wish.status === 'PUBLISHED'
            const isCopied = copiedSlug === wish.public_slug
            return (
              <div
                key={wish.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#c084fc', background: 'rgba(192, 132, 252, 0.12)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                      {wish.occasion}
                    </span>

                    <span className={`badge ${isPublished ? 'badge-published' : 'badge-draft'}`}>
                      {isPublished ? 'Live' : 'Draft'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                    {wish.title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                    For <strong style={{ color: '#f1f5f9' }}>{wish.recipient_name}</strong> from <span style={{ color: '#cbd5e1' }}>{wish.sender_name}</span>
                  </p>

                  <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {wish.message}
                  </p>
                </div>

                {/* Card Actions */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Share & Copy row if published */}
                  {isPublished && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(wish.public_slug)}
                        className="btn btn-outline btn-sm"
                        style={{ flex: 1, borderColor: isCopied ? '#10b981' : 'rgba(255, 255, 255, 0.15)', color: isCopied ? '#6ee7b7' : '#fff' }}
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
                      </button>

                      <a
                        href={`/w/${wish.public_slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                        title="View recipient experience"
                      >
                        <Eye size={14} />
                      </a>
                    </div>
                  )}

                  {/* Management buttons row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        onClick={() => navigate(`/edit/${wish.id}`)}
                        className="btn btn-outline btn-sm"
                        title="Edit Wish"
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTogglePublish(wish)}
                        className={`btn btn-sm ${isPublished ? 'btn-outline' : 'btn-primary'}`}
                        style={{ fontSize: '0.78rem' }}
                      >
                        {isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(wish.id, wish.title)}
                      className="btn btn-danger btn-sm"
                      title="Delete wish"
                      style={{ padding: '0.4rem 0.6rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
