from datetime import datetime
import re
from pydantic import BaseModel, Field, field_validator


EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"


class UserSignUp(BaseModel):
    email: str = Field(..., min_length=5, max_length=255, description="Valid email address")
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters")
    full_name: str = Field(..., min_length=1, max_length=100)

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        cleaned = v.strip().lower()
        if not re.match(EMAIL_REGEX, cleaned):
            raise ValueError("Invalid email address format.")
        return cleaned


class UserLogin(BaseModel):
    email: str = Field(..., min_length=5, max_length=255)
    password: str

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        return v.strip().lower()


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
