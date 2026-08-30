# Wishverse V1 - Global Deployment & Hosting Guide

Wishverse is fully configured for global accessibility. You can deploy it live on the internet so
anyone in the world can create and view wishes, or tunnel it directly from your computer in seconds.

---

## 🌐 Option 1: 1-Click Cloud Deployment on Render (Recommended)

Render can build and run both the React frontend and FastAPI backend inside a single production
container using the included [Dockerfile](./Dockerfile).

### Steps:
1. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit - Wishverse V1"
git remote add origin https://github.com/YOUR_USERNAME/wishverse.git
git push -u origin main
```
2. **Deploy on Render**:
- Go to [dashboard.render.com](https://dashboard.render.com/)
- Click **New + > Web Service**
- Select your GitHub repository
- Environment: **Docker**
- In **Environment Variables**, set:
  - `PORT`: `8000`
  - `SECRET_KEY`: `(generate a random 64-char string or let Render generate one)`
  - `DATABASE_URL`: `(your Supabase PostgreSQL connection string, e.g. postgresql://...)`
  - `BACKEND_CORS_ORIGINS`: `*`
- Click **Create Web Service**.

Render will give you a public global URL (e.g. `https://wishverse.onrender.com`). Any wish links
created will automatically use this live domain!

> ⚠️ **Don't skip `DATABASE_URL`.** Render's web services use an ephemeral filesystem — if you leave
the database on local SQLite, every redeploy or restart wipes your data. Always point `DATABASE_URL`
at Supabase (or another managed Postgres) for anything beyond quick local testing.
>
> **Even easier:** instead of setting these environment variables by hand, click **New + >
Blueprint** and point it at this repo's [`render.yaml`](./render.yaml). It provisions a managed
Postgres database and wires `DATABASE_URL` and `SECRET_KEY` automatically.

---

## ⚡ Option 2: Split Hosting (Frontend on Vercel + Backend on Render)

If you prefer hosting the React client separately on Vercel or Netlify with the FastAPI backend on
Render or Railway:

### 1. Deploy Backend:
- Deploy `backend/` as a Python/Docker web service on Render or Railway.
- Note your backend URL (e.g. `https://wishverse-api.onrender.com`).

### 2. Deploy Frontend to Vercel:
- In [Vercel Dashboard](https://vercel.com/), import your repository and set the **Root Directory**
to `frontend`.
- Add the Environment Variable:
  - `VITE_API_URL`: `https://wishverse-api.onrender.com/api`
- Deploy! The frontend's `getMediaUrl` and dynamic slug sharing will automatically connect across
domains.

---

## 🚀 Option 3: Instant Global Access in 30 Seconds (No Cloud Deploy Needed)

If you want to test and share your local instance globally right now without setting up cloud
accounts, use a secure tunnel.

### Method A: Cloudflare Quick Tunnel (Free, No Sign-up Required)
Run this in PowerShell / Terminal:
```bash
# Start your local server first (e.g. backend + frontend build or dev proxy)
npx localtunnel --port 5173
```
or with Cloudflare:
```bash
# If cloudflared is installed:
cloudflared tunnel --url http://localhost:5173
```
This gives you an instant `https://*.trycloudflare.com` or `https://*.loca.lt` URL that anyone in the
world can open on their phone or computer!

### Method B: Ngrok
```bash
ngrok http 5173
```

---

## 🗄️ Supabase PostgreSQL Cloud Database Setup

To make your database persistent and globally accessible:
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase.
3. Paste and run the migration script from
[supabase/migrations/001_initial_schema.sql](./supabase/migrations/001_initial_schema.sql).
4. Copy the connection string from **Project Settings > Database > Connection URI**:
`postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
5. Set this string as `DATABASE_URL` in your hosting environment variables.

---

## ⚠️ Free-Tier Database Expiry (Render Postgres)

If you deploy via the `render.yaml` Blueprint, it provisions a Render-managed Postgres database on
the **free plan**. Be aware:

- Free Render Postgres databases are **automatically deleted 30 days after creation**.
- You get a **14-day grace period** to upgrade to a paid plan before the data is permanently deleted.
- Free-tier databases have **no built-in backups**.

This is fine for a demo or short-lived test, but risky for anything with real user data. Pick one:

1. **Upgrade the database to a paid plan** (from ~$6-7/mo) in the Render dashboard, or change `plan:
free` to a paid plan name in `render.yaml` and redeploy the Blueprint. This removes the expiry and
adds backups.
2. **Use Supabase's free Postgres instead** (see above) - it pauses inactive projects rather than
hard-deleting data, though you should still export backups periodically since "paused" projects can
eventually be removed too if left inactive long enough.
3. **Back up manually on a schedule.** Example using a GitHub Actions cron job:

```yaml
# .github/workflows/backup-db.yml
name: Backup Database
on:
  schedule:
    - cron: "0 3 * * *" # daily at 03:00 UTC
  workflow_dispatch: {}

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Dump database
        run: |
          sudo apt-get install -y postgresql-client
          pg_dump "${{ secrets.DATABASE_URL }}" | gzip > backup-$(date +%F).sql.gz
      - name: Upload backup artifact
        uses: actions/upload-artifact@v4
        with:
          name: db-backup
          path: backup-*.sql.gz
          retention-days: 30
```

Store `DATABASE_URL` as a GitHub Actions repository secret rather than committing it. This gives you
30 days of rolling backups even on a free database plan (though the database itself will still expire
on Render's own 30-day clock if you don't also upgrade or migrate off it).
