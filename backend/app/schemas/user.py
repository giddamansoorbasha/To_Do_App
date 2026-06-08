from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional
from datetime import datetime


# --- Base ---
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None


# --- Register Request ---
class UserCreate(UserBase):
    password: str


# --- Update Request ---
class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None


# --- Response (safe — no password) ---
class UserResponse(UserBase):
    id: UUID4
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[str] = None