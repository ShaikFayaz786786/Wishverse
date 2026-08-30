import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useSearchParams, Link } from 'react-router-dom'
import { Wish, WishFormData, MediaItem, WishTemplate } from '../types'
import { OCCASIONS } from '../styles/themes'
import { WISH_TEMPLATES } from '../data/templates'
import { ThemeSelector } from '../components/ThemeSelector'
import { AnimationSelector } from '../components/AnimationSelector'
import { MediaUploader } from '../components/MediaUploader'
import { WishPreviewCard } from '../components/WishPreviewCard'
import { TemplatePickerModal } from '../components/TemplatePickerModal'
import { createWish, getWish, updateWish, publishWish } from '../services/api'
import { 
  Sparkles, 
  Save, 
  Send, 
  Eye, 
  ArrowLeft, 
  Check, 
  Copy, 
  AlertCircle, 
  Palette, 
  FileText, 
  Image as ImageIcon,
  PartyPopper,
  Wand2
} from 'lucide-react'

export const WishCreatorPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const isEditing = Boolean(id)

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false)

  const [createdWish, setCreatedWish] = useState<Wish | null>(null)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [copiedLink, setCopiedLink] = useState<boolean>(false)

  const [formData, setFormData] = useState<WishFormData>({
    title: '',
    recipient_name: '',
    sender_name: '',
    message: '',
    occasion: 'Birthday',
    theme: 'magical-starlight',
    animation_preset: 'floating-sparkles',
  })

  // Load template from query param or location state if creating a new wish
  useEffect(() => {
    if (!id) {
      const templateState = (location.state as { template?: WishTemplate })?.template
      const templateIdFromUrl = searchParams.get('template')

      const matchedTemplate =
        templateState ||
        (templateIdFromUrl
          ? WISH_TEMPLATES.find((t) => t.id === templateIdFromUrl)
          : null)

      if (matchedTemplate) {
        setFormData({
          title: matchedTemplate.title,
          recipient_name: matchedTemplate.recipientName,
          sender_name: matchedTemplate.senderName,
          message: matchedTemplate.message,
          occasion: matchedTemplate.occasion,
          theme: matchedTemplate.theme,
          animation_preset: matchedTemplate.animationPreset,
        })
        setSuccessMessage(`Loaded template: "${matchedTemplate.name}". Customize it below!`)
      }
    }
  }, [id, location.state, searchParams])

  // Load existing wish if in edit mode
  useEffect(() => {
    if (id) {
      getWish(id)
        .then((w) => {
          setCreatedWish(w)
          setFormData({
            title: w.title,
            recipient_name: w.recipient_name,
            sender_name: w.sender_name,
            message: w.message,
            occasion: w.occasion,
            theme: w.theme,
            animation_preset: w.animation_preset,
          })
          setMediaItems(w.media || [])
        })
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : 'Failed to load wish details.')
        })
    }
  }, [id])

  const handleApplyTemplate = (tpl: WishTemplate) => {
    setFormData((prev) => ({
      ...prev,
      title: tpl.title,
      recipient_name: tpl.recipientName,
      sender_name: tpl.senderName,
      message: tpl.message,
      occasion: tpl.occasion,
      theme: tpl.theme,
      animation_preset: tpl.animationPreset,
    }))
    setSuccessMessage(`Applied template: "${tpl.name}". You can now edit the details!`)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveDraft = async () => {
    if (!formData.title || !formData.recipient_name || !formData.sender_name || !formData.message) {
      setError('Please fill in the title, recipient name, sender name, and message.')
      return
    }

    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      if (createdWish) {
        const updated = await updateWish(createdWish.id, formData)
        setCreatedWish(updated)
        setSuccessMessage('Wish updated successfully!')
      } else {
        const newWish = await createWish(formData)
        setCreatedWish(newWish)
        setSuccessMessage('Wish saved as draft! You can now upload photos/videos or publish it.')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save wish.')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!formData.title || !formData.recipient_name || !formData.sender_name || !formData.message) {
      setError('Please fill in the title, recipient name, sender name, and message before publishing.')
      return
    }

    setIsPublishing(true)
    setError(null)

    try {
      let targetWish = createdWish
      if (!targetWish) {
        targetWish = await createWish(formData)
        setCreatedWish(targetWish)
      } else {
        targetWish = await updateWish(targetWish.id, formData)
        setCreatedWish(targetWish)
      }

      const published = await publishWish(targetWish.id)
      setCreatedWish(published)
      setSuccessMessage('Your wish is now LIVE! Share the link below with your recipient.')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to publish wish.')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleCopyLink = () => {
    if (!createdWish) return
    const publicUrl = `${window.location.origin}/w/${createdWish.public_slug}`
    navigator.clipboard.writeText(publicUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 3000)
  }

  return (
    <div style={{ padding: '1rem 0 3rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/dashboard" className="btn btn-outline btn-sm">
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </Link>
          <h1 style={{ fontSize: '1.8rem' }}>
            {isEditing ? 'Edit Wish' : 'Create Magical Wish'}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="btn btn-outline"
            style={{
              background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)',
              borderColor: 'rgba(192, 132, 252, 0.5)',
              color: '#e9d5ff',
            }}
          >
            <Sparkles size={16} color="#c084fc" />
            <span>Browse Templates</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
            className={`btn ${activeTab === 'preview' ? 'btn-secondary' : 'btn-outline'}`}
          >
            <Eye size={16} />
            <span>{activeTab === 'preview' ? 'Back to Editor' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSaving || isPublishing}
            className="btn btn-secondary"
          >
            <Save size={16} />
            <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isSaving || isPublishing}
            className="btn btn-primary"
          >
            <Send size={16} />
            <span>{isPublishing ? 'Publishing...' : createdWish?.status === 'PUBLISHED' ? 'Update & Live' : 'Publish Wish'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          <PartyPopper size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Published Link Sharing Box */}
      {createdWish?.status === 'PUBLISHED' && (
        <div
          className="glass-card"
          style={{
            padding: '1.5rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(192, 132, 252, 0.1) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6ee7b7', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                <Sparkles size={16} />
                <span>Wish is Live! Zero-Login Recipient Link:</span>
              </div>
              <code style={{ fontSize: '0.92rem', color: '#f8fafc', background: 'rgba(0, 0, 0, 0.3)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                {window.location.origin}/w/{createdWish.public_slug}
              </code>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={handleCopyLink}
                className="btn btn-primary btn-sm"
              >
                {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Link'}</span>
              </button>

              <a
                href={`/w/${createdWish.public_slug}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
              >
                <Eye size={15} />
                <span>Open Receiver View</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Content Area: Editor or Live Preview */}
      {activeTab === 'preview' ? (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
              This is how your recipient will experience the wish:
            </span>
            <button
              onClick={() => setActiveTab('editor')}
              className="btn btn-secondary btn-sm"
            >
              Continue Editing
            </button>
          </div>

          <WishPreviewCard
            title={formData.title}
            recipientName={formData.recipient_name}
            senderName={formData.sender_name}
            message={formData.message}
            occasion={formData.occasion}
            theme={formData.theme}
            animationPreset={formData.animation_preset}
            media={mediaItems}
          />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Form Details & Media */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Wish Details Section */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={20} color="#c084fc" />
                  <h2 style={{ fontSize: '1.25rem' }}>1. Wish Details</h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="btn btn-outline btn-sm"
                  style={{
                    fontSize: '0.78rem',
                    background: 'rgba(192, 132, 252, 0.1)',
                    borderColor: 'rgba(192, 132, 252, 0.3)',
                    color: '#c084fc',
                  }}
                >
                  <Wand2 size={13} />
                  <span>Choose from Templates</span>
                </button>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="wish-title">
                  <span>Wish Headline / Title *</span>
                </label>
                <input
                  id="wish-title"
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. Happy 21st Birthday, Emily! 🎂"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="wish-recipient">
                    <span>Recipient's Name *</span>
                  </label>
                  <input
                    id="wish-recipient"
                    name="recipient_name"
                    type="text"
                    required
                    placeholder="e.g. Emily"
                    className="form-input"
                    value={formData.recipient_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="wish-sender">
                    <span>Your Name / Signature *</span>
                  </label>
                  <input
                    id="wish-sender"
                    name="sender_name"
                    type="text"
                    required
                    placeholder="e.g. Michael"
                    className="form-input"
                    value={formData.sender_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="wish-occasion">
                  <span>Occasion</span>
                </label>
                <select
                  id="wish-occasion"
                  name="occasion"
                  className="form-select"
                  value={formData.occasion}
                  onChange={handleInputChange}
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ} value={occ} style={{ background: '#130c24', color: '#fff' }}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="wish-message">
                  <span>Personal Message *</span>
                </label>
                <textarea
                  id="wish-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your heartfelt wish, favorite memory, or loving message here..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <ImageIcon size={20} color="#c084fc" />
                <h2 style={{ fontSize: '1.25rem' }}>2. Photos & Videos</h2>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                Attach special photos or short video clips to make your wish truly memorable.
              </p>

              <MediaUploader
                wishId={createdWish?.id}
                mediaItems={mediaItems}
                onMediaUpdated={(updated) => setMediaItems(updated)}
              />
            </div>
          </div>

          {/* Right Column: Theme & Animation Customizer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Palette size={20} color="#c084fc" />
                <h2 style={{ fontSize: '1.25rem' }}>3. Visual Theme</h2>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                Pick a color palette that matches the celebration vibe.
              </p>

              <ThemeSelector
                selectedTheme={formData.theme}
                onSelectTheme={(themeId) => setFormData((prev) => ({ ...prev, theme: themeId }))}
              />
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Sparkles size={20} color="#c084fc" />
                <h2 style={{ fontSize: '1.25rem' }}>4. Particle Animation Preset</h2>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                Choose dynamic floating particles to bring the wish to life.
              </p>

              <AnimationSelector
                selectedAnimation={formData.animation_preset}
                onSelectAnimation={(animId) =>
                  setFormData((prev) => ({ ...prev, animation_preset: animId }))
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Template Selector Modal */}
      <TemplatePickerModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleApplyTemplate}
      />
    </div>
  )
}
