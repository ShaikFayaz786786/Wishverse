import os
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import settings
from app.core.database import init_db
from app.api.v1.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables with graceful startup
    try:
        init_db()
    except Exception:
        pass
    # Ensure upload directory exists
    try:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    except Exception:
        pass
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan,
)

# Set up CORS middleware for local and global multi-origin access
cors_origins = settings.BACKEND_CORS_ORIGINS if isinstance(settings.BACKEND_CORS_ORIGINS, list) else [settings.BACKEND_CORS_ORIGINS]
is_wildcard = "*" in cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins if not is_wildcard else ["*"],
    allow_credentials=not is_wildcard,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static media uploads directory mount
upload_dir_path = Path(settings.UPLOAD_DIR).resolve()
upload_dir_path.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(upload_dir_path)), name="uploads")

# Include API router under /api
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/api", tags=["root"])
async def root():
    return {
        "message": "Welcome to Wishverse API",
        "health_check": f"{settings.API_V1_STR}/health",
        "docs": f"{settings.API_V1_STR}/docs"
    }


# Serve React production build if available in frontend/dist or app/static (for Docker single-container production)
static_dist_path = Path(__file__).parent / "static"
if not static_dist_path.exists():
    static_dist_path = Path(__file__).parent.parent.parent / "frontend" / "dist"

if static_dist_path.exists() and (static_dist_path / "index.html").exists():
    app.mount("/assets", StaticFiles(directory=str(static_dist_path / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Do not route /api or /uploads 404s to index.html
        if full_path.startswith("api") or full_path.startswith("uploads"):
            raise HTTPException(status_code=404, detail="Resource not found")
        # Serve static file if it exists, otherwise fallback to index.html for client routing
        target_file = static_dist_path / full_path
        if full_path and target_file.is_file():
            return FileResponse(str(target_file))
        return FileResponse(str(static_dist_path / "index.html"))

