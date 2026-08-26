export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface MediaItem {
  id: string
  wish_id: string
  url: string
  media_type: 'IMAGE' | 'VIDEO'
  mime_type: string
  file_size: number
  sort_order: number
  created_at: string
}

export type WishStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface Wish {
  id: string
  owner_id: string
  public_slug: string
  title: string
  recipient_name: string
  sender_name: string
  message: string
  occasion: string
  theme: string
  animation_preset: string
  status: WishStatus
  created_at: string
  updated_at: string
  published_at?: string | null
  media: MediaItem[]
}

export interface PublicWish {
  public_slug: string
  title: string
  recipient_name: string
  sender_name: string
  message: string
  occasion: string
  theme: string
  animation_preset: string
  published_at?: string | null
  media: MediaItem[]
}

export interface WishFormData {
  title: string
  recipient_name: string
  sender_name: string
  message: string
  occasion: string
  theme: string
  animation_preset: string
}

export interface HealthStatus {
  status: string
  app: string
  version: string
}

export interface ThemeDefinition {
  id: string
  name: string
  description: string
  previewGradient: string
  accentColor: string
  badge: string
}

export interface AnimationDefinition {
  id: string
  name: string
  description: string
  icon: string
}
