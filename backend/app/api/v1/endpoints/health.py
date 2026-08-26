from fastapi import APIRouter
from app.schemas.health import HealthCheck
from app.core.config import settings

router = APIRouter()


@router.get("/health", response_model=HealthCheck, summary="Health Check")
async def health_check() -> HealthCheck:
    """
    Return API health status.
    """
    return HealthCheck(
        status="healthy",
        app=settings.PROJECT_NAME,
        version=settings.VERSION
    )
