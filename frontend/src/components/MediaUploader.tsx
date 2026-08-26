import React, { useState, useRef } from 'react'
import { MediaItem } from '../types'
import { uploadWishMedia, deleteWishMedia, getMediaUrl } from '../services/api'
import { UploadCloud, Trash2, Video, Image as ImageIcon, AlertCircle } from 'lucide-react'

interface MediaUploaderProps {
  wishId?: string
  mediaItems: MediaItem[]
  onMediaUpdated: (items: MediaItem[]) => void
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  wishId,
  mediaItems,
  onMediaUpdated,
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (!wishId) {
      setError('Please save the initial wish details before uploading media.')
      return
    }

    const file = files[0]
    // 25MB validation
    if (file.size > 25 * 1024 * 1024) {
      setError('File size must be under 25MB.')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const uploadedItem = await uploadWishMedia(wishId, file)
      onMediaUpdated([...mediaItems, uploadedItem])
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to upload file.')
      }
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async (mediaId: string) => {
    try {
      await deleteWishMedia(mediaId)
      onMediaUpdated(mediaItems.filter((item) => item.id !== mediaId))
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to remove media.')
      }
    }
  }

  return (
    <div>
      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed rgba(192, 132, 252, 0.35)',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          background: 'rgba(22, 13, 41, 0.4)',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          marginBottom: '1.5rem',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
          onChange={handleFileSelection}
          style={{ display: 'none' }}
          disabled={isUploading}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(192, 132, 252, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc',
            }}
          >
            <UploadCloud size={24} />
          </div>

          <div>
            <p style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.98rem' }}>
              {isUploading ? 'Uploading file to Wishverse...' : 'Click or drop photos & videos here'}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
              Supports JPG, PNG, WEBP, GIF, MP4, WEBM (Max 25MB)
            </p>
          </div>
        </div>
      </div>

      {/* Media Grid Preview */}
      {mediaItems.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '1rem',
          }}
        >
          {mediaItems.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '1',
                background: '#0d071a',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {item.media_type === 'IMAGE' ? (
                <img
                  src={getMediaUrl(item.url)}
                  alt="Wish media"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#130c24',
                    color: '#c084fc',
                    gap: '0.5rem',
                  }}
                >
                  <Video size={28} />
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Video</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  background: 'rgba(239, 68, 68, 0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                }}
                title="Delete media"
              >
                <Trash2 size={13} />
              </button>

              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '4px',
                  background: 'rgba(0, 0, 0, 0.65)',
                  borderRadius: '6px',
                  padding: '2px 5px',
                  fontSize: '0.68rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  color: '#cbd5e1',
                }}
              >
                {item.media_type === 'IMAGE' ? <ImageIcon size={10} /> : <Video size={10} />}
                <span>{(item.file_size / (1024 * 1024)).toFixed(1)}MB</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
