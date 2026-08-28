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
FROM python:3.12-slim AS runtime
WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

# Install runtime Python dependencies only. psycopg2-binary ships precompiled wheels.
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/app ./app

# Copy built frontend assets into FastAPI static directory
COPY --from=frontend-builder /app/frontend/dist ./app/static

# Create uploads directory. Configure external storage or a persistent disk for production media.
RUN mkdir -p /app/uploads

# Run the service with limited filesystem permissions.
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Expose dynamic port
EXPOSE 8000

# Run FastAPI with Uvicorn bound to 0.0.0.0 and dynamic $PORT
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
