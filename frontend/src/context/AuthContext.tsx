import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'
import { getMe, login as apiLogin, signup as apiSignup, logout as apiLogout, tokenStorage } from '../services/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  signup: (payload: { email: string; password: string; full_name: string }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.get()
      if (token) {
        try {
          const userData = await getMe()
          setUser(userData)
        } catch {
          tokenStorage.clear()
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials: { email: string; password: string }) => {
    const res = await apiLogin(credentials)
    setUser(res.user)
  }

  const signup = async (payload: { email: string; password: string; full_name: string }) => {
    const res = await apiSignup(payload)
    setUser(res.user)
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
