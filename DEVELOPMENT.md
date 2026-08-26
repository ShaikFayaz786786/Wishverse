# Wishverse V1 - Developer Guide

This document provides developer guidelines, architectural patterns, and debugging tips for Wishverse V1.

---

## 🏗️ Architecture Design Patterns

### 1. Dual Database Strategy
- **Local Dev**: Zero-configuration SQLite (`wishverse.db`). Tables are automatically initialized on startup via `init_db()`.
- **Production**: Supabase / PostgreSQL. Activated simply by setting the `DATABASE_URL` environment variable.

### 2. Cryptographically Secure Public Slugs
Wishes are identified publicly via non-sequential, random cryptographic strings generated using Python's `secrets.choice` across ASCII letters and digits (e.g., `a8F3kLm92Qx7`). Database auto-increment IDs or predictable sequences are never exposed in public routes.

### 3. Receiver Experience Isolation
The public route `/w/:slug` queries `/api/public/wishes/:slug` which returns sanitized public data and requires **no authentication**. Receivers do not need to sign up, log in, or install anything.

### 4. Strict Ownership Protection
Every wish and media modification endpoint verifies that `current_user.id == wish.owner_id`. Any unauthorized attempt to view, edit, or delete another user's wish returns a 404 or 403 response.

---

## 💻 Local Developer Workflow

### Terminal 1: Backend
```powershell
cd backend
.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

### Terminal 2: Frontend
```powershell
cd frontend
npm run dev
```

---

## 🧪 Testing Checklist

Before opening pull requests or deploying:

1. **Run Backend Tests**:
   ```powershell
   cd backend
   .venv\Scripts\pytest -v
   ```
2. **Run Frontend Type Checking and Build**:
   ```powershell
   cd frontend
   npm run build
   ```

---

## 🔧 Troubleshooting

### Port 8000 or 5173 in use:
- To run FastAPI on an alternate port: `uvicorn app.main:app --reload --port 8080`
- To run Vite on an alternate port: `npm run dev -- --port 3000`

### CORS Errors during local development:
- Verify that `BACKEND_CORS_ORIGINS` in `.env` or `app/core/config.py` includes your frontend origin (`http://localhost:5173`).
