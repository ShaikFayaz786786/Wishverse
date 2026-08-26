import uuid
import secrets
import string
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


def generate_public_slug(length: int = 12) -> str:
    """Generate a cryptographically secure URL-safe slug."""
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(length))


class Wish(Base):
    __tablename__ = "wishes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    public_slug = Column(String(32), unique=True, index=True, default=generate_public_slug, nullable=False)
    
    title = Column(String(255), nullable=False)
    recipient_name = Column(String(255), nullable=False)
    sender_name = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    occasion = Column(String(100), default="Birthday", nullable=False)
    theme = Column(String(100), default="magical-starlight", nullable=False)
    animation_preset = Column(String(100), default="floating-sparkles", nullable=False)
    status = Column(String(50), default="DRAFT", nullable=False, index=True)  # DRAFT, PUBLISHED, ARCHIVED
    
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=get_utc_now, onupdate=get_utc_now, nullable=False)
    published_at = Column(DateTime(timezone=True), nullable=True)

    owner = relationship("User", back_populates="wishes")
    media = relationship("Media", back_populates="wish", cascade="all, delete-orphan", order_by="Media.sort_order")
