# Wishverse V1

> **Personalized digital wishes made effortless, interactive, and shareable with zero receiver
friction.**

Wishverse is a modern full-stack web application where users can create personalized digital wishes
containing custom messages, photos, videos, themes, and dynamic particle animations. A creator can
publish a wish and receive a unique, unguessable cryptographic link (`/w/{slug}`) that any recipient
can open in seconds with zero login friction.

---

## 🌟 Key Features

- **Magical Landing Page**: Showcases live interactive wish demo cards, features, and quick CTAs.
- **Secure Authentication**: User sign up, login, JWT token sessions, and user isolation.
- **Creator Dashboard**: Manage wishes with real-time stats, filters (All, Live, Drafts), search, and
one-click actions.
- **Rich Theme Engine**: 6 handcrafted visual themes (*Magical Starlight*, *Sunset Glow*, *Neon
Cyberpunk*, *Romantic Blossom*, *Golden Elegance*, *Celestial Dream*).
- **Interactive Particle Animations**: 6 presets (*Floating Sparkles*, *Confetti Cascade*, *Gentle
Hearts*, *Cosmic Fireworks*, *Celebration Balloons*, *Pulsing Glow*).
- **Photo & Video Media Uploads**: Built-in drag-and-drop media uploader with 25MB file validation
and carousel viewer.
- **Live Interactive Preview**: Instant real-time preview reflecting styling, message, and media
before publishing.
- **Standalone Receiver Experience (`/w/{slug}`)**:
  - Zero login required!
  - Interactive "Tap to Open Wish" envelope animation with celebratory confetti bursts.
  - Full theme immersion, responsive mobile-first layout, and viral "Create your own wish" CTA.
- **Production-Ready Multi-Stage Dockerfile**: Single-container deployment bundling frontend &
FastAPI on dynamic `$PORT`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, React Router v6, Canvas Confetti, Lucide Icons, Vanilla CSS Design System |
| **Backend** | Python 3.10+, FastAPI, Uvicorn, SQLAlchemy 2.0, PyJWT, Bcrypt, Python-Multipart |
| **Database** | SQLite (zero-config local dev & testing) / PostgreSQL via Render or Supabase (production) |
| **Storage** | Local static uploads / Supabase Storage |
| **Deployment** | Docker, Render, Cloud Run |

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18+ (tested on v20 & v24)
- **Python**: v3.10+ (tested on v3.14)

---

### 2. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
# source .venv/bin/activate

# Install runtime dependencies
pip install -r requirements.txt

# Also install dev/test dependencies (pytest, httpx) - needed for the
# "Running Automated Tests" section below. Production/Docker builds skip
# this file on purpose - see Dockerfile.
pip install -r requirements-dev.txt

# Start FastAPI backend server
uvicorn app.main:app --reload --port 8000
```
- API Base: `http://127.0.0.1:8000/api`
- Swagger Interactive Docs: `http://127.0.0.1:8000/api/docs`
- Health Check: `http://127.0.0.1:8000/api/health`

---

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🧪 Running Automated Tests

### Backend Test Suite (Pytest)
Make sure you've installed `requirements-dev.txt` as shown in Backend Setup above - `pytest` is a
dev-only dependency and isn't part of the production `requirements.txt`.
```bash
cd backend
.venv\Scripts\pytest -v
```
Verifies:
- User signup, login, invalid credentials, token verification, `/auth/me`
- Wish creation, updating, deletion, and status transitions (Draft -> Published -> Unpublished)
- Ownership isolation (User B cannot view/update/delete User A's wish)
- Public receiver slug routing without authentication
- Media upload format validation (25MB max size) and deletion

### Frontend Type Check & Build
```bash
cd frontend
npm run build
```

---

## 🐳 Docker Deployment

Wishverse includes a production multi-stage `Dockerfile` that compiles the React application and
serves both the API and frontend from FastAPI.

```bash
# Build the Docker image
docker build -t wishverse-v1 .

# Run the container
docker run -p 8000:8000 -e PORT=8000 wishverse-v1
```
Access the application at `http://localhost:8000`.

---

## ☁️ Deploying to Render

**Easiest path:** click **New + > Blueprint** in the Render dashboard and point it at this repo's
[`render.yaml`](./render.yaml). It provisions a managed Postgres database and wires `DATABASE_URL`
and `SECRET_KEY` automatically - see [DEPLOYMENT.md](./DEPLOYMENT.md) for details and important notes
about the free database's 30-day expiry.

Manual setup instead:
1. Push your repository to **GitHub**.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + > Web Service**.
3. Connect your Wishverse GitHub repository.
4. Select **Docker** as the Environment.
5. In **Environment Variables**, set:
   - `SECRET_KEY`: `(generate a random 64-character string, e.g. openssl rand -hex 32)`
   - `DATABASE_URL`: `(your managed Postgres connection string - see DEPLOYMENT.md)`
   - `PORT`: `8000` (or leave default)
6. Click **Create Web Service**. Render will automatically build the Docker image and deploy your
live public URL!

---

## 🗄️ Database Setup (Production)

Wishverse needs a persistent Postgres database in production - see [DEPLOYMENT.md](./DEPLOYMENT.md)
for full instructions covering both Render's managed Postgres (via the `render.yaml` Blueprint) and
Supabase as an alternative.

---

## 📁 Project Structure

```
wishverse v1/
├── Dockerfile                   # Multi-stage Docker build for Render
├── render.yaml                  # Render Blueprint (web service + managed Postgres)
├── .dockerignore
├── .env.example                 # Config template
├── README.md                    # Project documentation
├── DEVELOPMENT.md               # Developer guidelines
├── DEPLOYMENT.md                # Deployment & hosting guide
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Supabase PostgreSQL migration
├── frontend/                    # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/          # Navbar, Footer, WishPreviewCard, ThemeSelector, MediaUploader
│   │   ├── context/             # AuthContext session provider
│   │   ├── pages/               # LandingPage, LoginPage, SignupPage, DashboardPage, WishCreatorPage, PublicWishViewer
│   │   ├── services/            # Typed API client
│   │   ├── styles/              # Themes & Particle Animations CSS
│   │   └── types/               # TypeScript interfaces
│   └── package.json
└── backend/                     # Python + FastAPI Service
    ├── requirements.txt         # Runtime dependencies (used by Docker/production)
    ├── requirements-dev.txt     # + pytest, httpx for local dev/testing
    └── app/
        ├── main.py              # FastAPI app with static media mount and SPA support
        ├── core/                # Database engine, JWT security, deps, config
        ├── models/              # SQLAlchemy models (User, Wish, Media)
        ├── schemas/             # Pydantic validation schemas
        ├── services/            # Media upload & storage service
        ├── api/v1/endpoints/    # /auth, /wishes, /public, /health
        └── tests/               # Pytest automated test suite
```

---

## 📄 License
MIT License. Built for creating magical digital moments.
