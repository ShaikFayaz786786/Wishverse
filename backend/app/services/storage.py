import os
import uuid
import shutil
from pathlib import Path
from typing import Tuple
from fastapi import UploadFile, HTTPException, status
from app.core.config import settings

ALLOWED_MIME_TYPES = {
    # Images
    "image/jpeg": "IMAGE",
    "image/jpg": "IMAGE",
    "image/png": "IMAGE",
    "image/webp": "IMAGE",
    "image/gif": "IMAGE",
    # Videos
    "video/mp4": "VIDEO",
    "video/webm": "VIDEO",
    "video/quicktime": "VIDEO",
}

EXTENSION_MAP = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "video/quicktime": ".mov",
}

MAX_FILE_BYTES = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024


class StorageService:
    def __init__(self):
        self.upload_dir = Path(settings.UPLOAD_DIR)
        self.upload_dir.mkdir(parents=True, exist_ok=True)

    async def save_media(self, file: UploadFile, wish_id: str) -> Tuple[str, str, str, str, int]:
        """
        Validates and saves an uploaded media file.
        Returns (storage_path, public_url, media_type, mime_type, file_size)
        """
        # Validate content type
        content_type = file.content_type
        if not content_type or content_type.lower() not in ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported file format '{content_type}'. Allowed types: JPEG, PNG, WEBP, GIF, MP4, WEBM, MOV."
            )
        
        normalized_mime = content_type.lower()
        media_type = ALLOWED_MIME_TYPES[normalized_mime]
        ext = EXTENSION_MAP.get(normalized_mime, ".bin")

        # Read content to check file size
        file_bytes = await file.read()
        file_size = len(file_bytes)
        
        if file_size == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty."
            )

        if file_size > MAX_FILE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB}MB."
            )

        # Generate safe destination path
        wish_dir = self.upload_dir / str(wish_id)
        wish_dir.mkdir(parents=True, exist_ok=True)

        file_id = str(uuid.uuid4())
        safe_filename = f"{file_id}{ext}"
        target_path = wish_dir / safe_filename

        # Write to disk securely
        with open(target_path, "wb") as f:
            f.write(file_bytes)

        # URL path for static file serving
        rel_path = f"{wish_id}/{safe_filename}"
        public_url = f"/uploads/{rel_path}"
        storage_path = str(target_path)

        return storage_path, public_url, media_type, normalized_mime, file_size

    def delete_media(self, storage_path: str) -> bool:
        """Deletes a local file safely."""
        try:
            target = Path(storage_path)
            # Basic path traversal protection: verify file is within upload_dir
            if target.is_relative_to(self.upload_dir) and target.is_file():
                target.unlink(missing_ok=True)
                return True
        except Exception:
            pass
        return False


storage_service = StorageService()
