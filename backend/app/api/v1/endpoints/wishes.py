from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.wish import Wish
from app.models.media import Media
from app.schemas.wish import WishCreate, WishUpdate, WishResponse
from app.schemas.media import MediaResponse
from app.services.storage import storage_service

router = APIRouter()


@router.get("", response_model=List[WishResponse])
def get_user_wishes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all wishes owned by the authenticated user."""
    wishes = (
        db.query(Wish)
        .filter(Wish.owner_id == current_user.id)
        .order_by(Wish.created_at.desc())
        .all()
    )
    return wishes


@router.post("", response_model=WishResponse, status_code=status.HTTP_201_CREATED)
def create_wish(
    wish_in: WishCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new wish in draft status."""
    wish = Wish(
        owner_id=current_user.id,
        title=wish_in.title.strip(),
        recipient_name=wish_in.recipient_name.strip(),
        sender_name=wish_in.sender_name.strip(),
        message=wish_in.message.strip(),
        occasion=wish_in.occasion.strip(),
        theme=wish_in.theme.strip(),
        animation_preset=wish_in.animation_preset.strip(),
        status="DRAFT"
    )
    db.add(wish)
    db.commit()
    db.refresh(wish)
    return wish


@router.get("/{wish_id}", response_model=WishResponse)
def get_wish_by_id(
    wish_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific wish by ID (owner only)."""
    wish = db.query(Wish).filter(Wish.id == wish_id, Wish.owner_id == current_user.id).first()
    if not wish:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wish not found or access denied."
        )
    return wish


@router.put("/{wish_id}", response_model=WishResponse)
def update_wish(
    wish_id: str,
    wish_in: WishUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update wish details (owner only)."""
    wish = db.query(Wish).filter(Wish.id == wish_id, Wish.owner_id == current_user.id).first()
    if not wish:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wish not found or access denied."
        )
    
    update_data = wish_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if value is not None:
            if isinstance(value, str):
                setattr(wish, field, value.strip())
            else:
                setattr(wish, field, value)
    
    wish.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(wish)
    return wish


@router.delete("/{wish_id}", status_code=status.HTTP_200_OK)
def delete_wish(
    wish_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a wish and its associated media files (owner only)."""
    wish = db.query(Wish).filter(Wish.id == wish_id, Wish.owner_id == current_user.id).first()
    if not wish:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wish not found or access denied."
        )
    
    # Clean up physical files for all media
    for item in wish.media:
        storage_service.delete_media(item.storage_path)
    
    db.delete(wish)
    db.commit()
    return {"message": "Wish deleted successfully"}


@router.post("/{wish_id}/publish", response_model=WishResponse)
def publish_wish(
    wish_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Publish wish to make it publicly viewable via public_slug."""
    wish = db.query(Wish).filter(Wish.id == wish_id, Wish.owner_id == current_user.id).first()
    if not wish:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wish not found or access denied."
        )
    
    wish.status = "PUBLISHED"
    wish.published_at = datetime.now(timezone.utc)
    wish.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(wish)
    return wish


@router.post("/{wish_id}/unpublish", response_model=WishResponse)
def unpublish_wish(
    wish_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Unpublish wish reverting it to DRAFT status."""
    wish = db.query(Wish).filter(Wish.id == wish_id, Wish.owner_id == current_user.id).first()
    if not wish:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wish not found or access denied."
        )
    
    wish.status = "DRAFT"
    wish.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(wish)
    return wish


@router.post("/{wish_id}/media", response_model=MediaResponse, status_code=status.HTTP_201_CREATED)
async def upload_wish_media(
    wish_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Upload an image or video to a wish (owner only)."""
    wish = db.query(Wish).filter(Wish.id == wish_id, Wish.owner_id == current_user.id).first()
    if not wish:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wish not found or access denied."
        )
    
    storage_path, public_url, media_type, mime_type, file_size = await storage_service.save_media(
        file=file,
        wish_id=wish.id
    )

    # Get max current sort order
    max_order = len(wish.media)

    media_record = Media(
        wish_id=wish.id,
        owner_id=current_user.id,
        storage_path=storage_path,
        url=public_url,
        media_type=media_type,
        mime_type=mime_type,
        file_size=file_size,
        sort_order=max_order
    )
    db.add(media_record)
    db.commit()
    db.refresh(media_record)
    return media_record


@router.delete("/media/{media_id}", status_code=status.HTTP_200_OK)
def delete_media_item(
    media_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a specific media item (owner only)."""
    media = db.query(Media).filter(Media.id == media_id, Media.owner_id == current_user.id).first()
    if not media:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Media item not found or access denied."
        )
    
    storage_service.delete_media(media.storage_path)
    db.delete(media)
    db.commit()
    return {"message": "Media deleted successfully"}
