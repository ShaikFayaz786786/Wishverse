from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.schemas.media import MediaResponse


class WishCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    recipient_name: str = Field(..., min_length=1, max_length=255)
    sender_name: str = Field(..., min_length=1, max_length=255)
    message: str = Field(..., min_length=1)
    occasion: str = Field(default="Birthday", max_length=100)
    theme: str = Field(default="magical-starlight", max_length=100)
    animation_preset: str = Field(default="floating-sparkles", max_length=100)

    @field_validator(
        "title", "recipient_name", "sender_name", "message",
        "occasion", "theme", "animation_preset",
    )
    @classmethod
    def reject_blank_text(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("This field cannot be blank.")
        return value


class WishUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    recipient_name: Optional[str] = Field(None, min_length=1, max_length=255)
    sender_name: Optional[str] = Field(None, min_length=1, max_length=255)
    message: Optional[str] = Field(None, min_length=1)
    occasion: Optional[str] = Field(None, max_length=100)
    theme: Optional[str] = Field(None, max_length=100)
    animation_preset: Optional[str] = Field(None, max_length=100)

    @field_validator(
        "title", "recipient_name", "sender_name", "message",
        "occasion", "theme", "animation_preset",
    )
    @classmethod
    def reject_blank_text(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and not value.strip():
            raise ValueError("This field cannot be blank.")
        return value


class WishResponse(BaseModel):
    id: str
    owner_id: str
    public_slug: str
    title: str
    recipient_name: str
    sender_name: str
    message: str
    occasion: str
    theme: str
    animation_preset: str
    status: str
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None
    media: List[MediaResponse] = []

    model_config = {"from_attributes": True}


class PublicWishResponse(BaseModel):
    public_slug: str
    title: str
    recipient_name: str
    sender_name: str
    message: str
    occasion: str
    theme: str
    animation_preset: str
    published_at: Optional[datetime] = None
    media: List[MediaResponse] = []

    model_config = {"from_attributes": True}
