import { 
  AuthResponse, 
  User, 
  Wish, 
  PublicWish, 
  MediaItem, 
  WishFormData, 
  HealthStatus 
} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const TOKEN_KEY = 'wishverse_token'

export function getMediaUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url
  }
  // If API_BASE_URL is an absolute external origin (e.g. https://api.mysite.com/api)
  if (API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://')) {
    try {
      const urlObj = new URL(API_BASE_URL)
      const cleanPath = url.startsWith('/') ? url : `/${url}`
      return `${urlObj.origin}${cleanPath}`
    } catch {
      return url
    }
  }
  return url
}

export const tokenStorage = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

async function request<T>(
  endpoint: string, 
  options: RequestInit = {}, 
  requireAuth = false
): Promise<T> {
  const headers = new Headers(options.headers || {})
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const token = tokenStorage.get()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  } else if (requireAuth) {
    throw new Error('Authentication token is missing. Please log in.')
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`
    try {
      const errorData = await response.json()
      if (errorData && errorData.detail) {
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail
        } else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map((e: { msg?: string }) => e.msg || 'Validation error').join(', ')
        }
      }
    } catch {
      // Use fallback error message
    }
    throw new Error(errorMessage)
  }

  return response.json()
}

// -----------------------------------------------------------------------------
// Authentication Services
// -----------------------------------------------------------------------------

export async function signup(payload: { email: string; password: string; full_name: string }): Promise<AuthResponse> {
  const data = await request<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  tokenStorage.set(data.access_token)
  return data
}

export async function login(payload: { email: string; password: string }): Promise<AuthResponse> {
  const data = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  tokenStorage.set(data.access_token)
  return data
}

export async function logout(): Promise<void> {
  try {
    await request('/auth/logout', { method: 'POST' })
  } catch {
    // ignore logout network errors
  } finally {
    tokenStorage.clear()
  }
}

export async function getMe(): Promise<User> {
  return request<User>('/auth/me', { method: 'GET' }, true)
}

// -----------------------------------------------------------------------------
// Wish Management Services
// -----------------------------------------------------------------------------

export async function getWishes(): Promise<Wish[]> {
  return request<Wish[]>('/wishes', { method: 'GET' }, true)
}

export async function getWish(id: string): Promise<Wish> {
  return request<Wish>(`/wishes/${id}`, { method: 'GET' }, true)
}

export async function createWish(payload: WishFormData): Promise<Wish> {
  return request<Wish>('/wishes', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, true)
}

export async function updateWish(id: string, payload: Partial<WishFormData>): Promise<Wish> {
  return request<Wish>(`/wishes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }, true)
}

export async function deleteWish(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/wishes/${id}`, {
    method: 'DELETE',
  }, true)
}

export async function publishWish(id: string): Promise<Wish> {
  return request<Wish>(`/wishes/${id}/publish`, {
    method: 'POST',
  }, true)
}

export async function unpublishWish(id: string): Promise<Wish> {
  return request<Wish>(`/wishes/${id}/unpublish`, {
    method: 'POST',
  }, true)
}

// -----------------------------------------------------------------------------
// Media Services
// -----------------------------------------------------------------------------

export async function uploadWishMedia(wishId: string, file: File): Promise<MediaItem> {
  const formData = new FormData()
  formData.append('file', file)

  return request<MediaItem>(`/wishes/${wishId}/media`, {
    method: 'POST',
    body: formData,
  }, true)
}

export async function deleteWishMedia(mediaId: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/wishes/media/${mediaId}`, {
    method: 'DELETE',
  }, true)
}

// -----------------------------------------------------------------------------
// Public Receiver & Health Services
// -----------------------------------------------------------------------------

export async function getPublicWish(slug: string): Promise<PublicWish> {
  return request<PublicWish>(`/public/wishes/${slug}`, { method: 'GET' })
}

export async function checkBackendHealth(): Promise<HealthStatus> {
  return request<HealthStatus>('/health', { method: 'GET' })
}
