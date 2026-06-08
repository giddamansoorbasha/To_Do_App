from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from typing import Optional

from app.core.database import get_db
from app.api.v1.routes.auth import get_current_user
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse, TaskListResponse
from app.services.task_service import (
    create_task,
    get_task_by_id,
    get_all_tasks,
    update_task,
    delete_task,
)

router = APIRouter(prefix="/tasks", tags=["Tasks"])


# --- Create Task ---
@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create(
    payload: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await create_task(db, payload, current_user.id)


# --- Get All Tasks ---
@router.get("/", response_model=TaskListResponse)
async def get_all(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=100),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await get_all_tasks(db, current_user.id, page, per_page, status, priority)


# --- Get Single Task ---
@router.get("/{task_id}", response_model=TaskResponse)
async def get_one(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await get_task_by_id(db, task_id, current_user.id)


# --- Update Task ---
@router.patch("/{task_id}", response_model=TaskResponse)
async def update(
    task_id: UUID,
    payload: TaskUpdate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await update_task(db, task_id, payload, current_user.id)


# --- Delete Task ---
@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    await delete_task(db, task_id, current_user.id)