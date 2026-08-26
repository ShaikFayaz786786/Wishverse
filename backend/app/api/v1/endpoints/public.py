from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.wish import Wish
from app.schemas.wish import PublicWishResponse

router = APIRouter()


@router.get("/wishes/{slug}", response_model=PublicWishResponse)
def get_public_wish(
    slug: str,
    db: Session = Depends(get_db)
):
    """
    Public endpoint for receivers to view published wishes without login.
    """
    wish = db.query(Wish).filter(Wish.public_slug == slug).first()
    
    if not wish:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wish not found. Please verify the link.",
        )
    
    if wish.status != "PUBLISHED":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This wish is currently private or unpublished by its creator.",
        )

    return wish
