from fastapi import APIRouter
from app.api.v1.endpoints import health, auth, wishes, public

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(wishes.router, prefix="/wishes", tags=["wishes"])
api_router.include_router(public.router, prefix="/public", tags=["public"])
