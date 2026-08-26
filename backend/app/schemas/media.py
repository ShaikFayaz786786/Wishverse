from datetime import datetime
from pydantic import BaseModel


class MediaResponse(BaseModel):
    id: str
    wish_id: str
    url: str
    media_type: str
    mime_type: str
    file_size: int
    sort_order: int
    created_at: datetime

    model_config = {"from_attributes": True}


class MediaOrderUpdate(BaseModel):
    media_ids: list[str]
