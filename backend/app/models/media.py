import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


def get_utc_now():
    return datetime.now(timezone.utc)


class Media(Base):
    __tablename__ = "media"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    wish_id = Column(String(36), ForeignKey("wishes.id", ondelete="CASCADE"), nullable=False, index=True)
    owner_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    storage_path = Column(String(512), nullable=False)
    url = Column(String(1024), nullable=False)
    media_type = Column(String(50), nullable=False)  # IMAGE, VIDEO
    mime_type = Column(String(100), nullable=False)
    file_size = Column(Integer, nullable=False)
    sort_order = Column(Integer, default=0, nullable=False)
    
    created_at = Column(DateTime(timezone=True), default=get_utc_now, nullable=False)

    wish = relationship("Wish", back_populates="media")
    owner = relationship("User", back_populates="media")
