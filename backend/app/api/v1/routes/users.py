from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.v1.routes.auth import get_current_user
from app.schemas.user import UserResponse, UserUpdate
from app.core.security import hash_password
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


# --- Get My Profile ---
@router.get("/me", response_model=UserResponse)
async def get_my_profile(current_user=Depends(get_current_user)):
    return current_user


# --- Update My Profile ---
@router.patch("/me", response_model=UserResponse)
async def update_my_profile(
    payload: UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    update_data = payload.model_dump(exclude_unset=True)

    # Hash new password if provided
    if "password" in update_data:
        update_data["hashed_password"] = hash_password(update_data.pop("password"))

    for field, value in update_data.items():
        setattr(current_user, field, value)

    await db.flush()
    await db.refresh(current_user)
    return current_user


# --- Delete My Account ---
@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_my_account(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    await db.delete(current_user)