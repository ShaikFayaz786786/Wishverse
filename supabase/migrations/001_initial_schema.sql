-- ==============================================================================
-- Wishverse V1 - Supabase / PostgreSQL Schema Migration
-- ==============================================================================

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 2. Create Wishes Table
CREATE TABLE IF NOT EXISTS wishes (
    id VARCHAR(36) PRIMARY KEY,
    owner_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    public_slug VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    occasion VARCHAR(100) DEFAULT 'Birthday' NOT NULL,
    theme VARCHAR(100) DEFAULT 'magical-starlight' NOT NULL,
    animation_preset VARCHAR(100) DEFAULT 'floating-sparkles' NOT NULL,
    status VARCHAR(50) DEFAULT 'DRAFT' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_wishes_owner_id ON wishes(owner_id);
CREATE INDEX IF NOT EXISTS idx_wishes_public_slug ON wishes(public_slug);
CREATE INDEX IF NOT EXISTS idx_wishes_status ON wishes(status);

-- 3. Create Media Table
CREATE TABLE IF NOT EXISTS media (
    id VARCHAR(36) PRIMARY KEY,
    wish_id VARCHAR(36) NOT NULL REFERENCES wishes(id) ON DELETE CASCADE,
    owner_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    storage_path VARCHAR(512) NOT NULL,
    url VARCHAR(1024) NOT NULL,
    media_type VARCHAR(50) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_media_wish_id ON media(wish_id);
CREATE INDEX IF NOT EXISTS idx_media_owner_id ON media(owner_id);
