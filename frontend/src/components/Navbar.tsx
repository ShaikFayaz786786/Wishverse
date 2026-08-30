import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, PlusCircle, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        <Link to="/" className="brand-link">
          <div className="brand-icon-box">
            <Sparkles size={20} color="#fff" />
          </div>
          <span>Wishverse</span>
        </Link>

        <nav className="nav-actions">
          <Link to="/templates" className="btn btn-outline btn-sm" style={{ borderColor: 'rgba(192, 132, 252, 0.35)', color: '#e9d5ff' }}>
            <Sparkles size={15} color="#c084fc" />
            <span>Templates</span>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary btn-sm">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>

              <Link to="/create" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                <span>Create Wish</span>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: '0.5rem' }}>
                <span className="user-name" style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 500 }}>
                  <UserIcon size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {user?.full_name}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline btn-sm"
                  title="Sign out"
                  style={{ padding: '0.4rem 0.6rem' }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
