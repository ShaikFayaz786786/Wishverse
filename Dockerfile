# ==============================================================================
# Wishverse V1 - Multi-Stage Production Dockerfile for Render / Cloud Deployment
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build React Frontend
# ------------------------------------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Python Backend Runtime
# ------------------------------------------------------------------------------
# NOTE: requirements.txt uses psycopg2-binary, which ships precompiled wheels
# with libpq statically bundled - no gcc/libpq-dev/libpq5 needed at all, at
# build or runtime. Keep this in mind if you ever switch to plain psycopg2.
FROM python:3.12-slim AS runtime
WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

# Install python dependencies (runtime only - see requirements-dev.txt for
# test-only deps like pytest, which are intentionally NOT installed here)
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/app ./app

# Copy built frontend assets into FastAPI static directory
COPY --from=frontend-builder /app/frontend/dist ./app/static

# Create uploads directory
# NOTE: this directory is NOT persistent on Render's free/standard plans -
# its contents are wiped on every deploy or restart. Attach a Render
# persistent disk, or store media in Supabase Storage / S3, for real use.
RUN mkdir -p /app/uploads

# Run as a non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Expose dynamic port
EXPOSE 8000

# Run FastAPI with Uvicorn bound to 0.0.0.0 and dynamic $PORT
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
