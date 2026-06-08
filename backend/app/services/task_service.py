from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException, status
from uuid import UUID

from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


async def create_task(db: AsyncSession, payload: TaskCreate, owner_id: UUID) -> Task:
    task = Task(**payload.model_dump(), owner_id=owner_id)
    db.add(task)
    await db.flush()
    await db.refresh(task)
    return task


async def get_task_by_id(db: AsyncSession, task_id: UUID, owner_id: UUID) -> Task:
    result = await db.execute(
        select(Task).where(Task.id == task_id, Task.owner_id == owner_id)
    )
    task = result.scalar_one_or_none()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    return task


async def get_all_tasks(
    db: AsyncSession,
    owner_id: UUID,
    page: int = 1,
    per_page: int = 10,
    status: str = None,
    priority: str = None,
) -> dict:
    query = select(Task).where(Task.owner_id == owner_id, Task.is_archived == False)

    if status:
        query = query.where(Task.status == status)
    if priority:
        query = query.where(Task.priority == priority)

    # Total count
    count_result = await db.execute(
        select(func.count()).select_from(query.subquery())
    )
    total = count_result.scalar()

    # Paginate
    query = query.offset((page - 1) * per_page).limit(per_page)
    result = await db.execute(query)
    tasks = result.scalars().all()

    return {"tasks": tasks, "total": total, "page": page, "per_page": per_page}


async def update_task(
    db: AsyncSession, task_id: UUID, payload: TaskUpdate, owner_id: UUID
) -> Task:
    task = await get_task_by_id(db, task_id, owner_id)

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    await db.flush()
    await db.refresh(task)
    return task


async def delete_task(db: AsyncSession, task_id: UUID, owner_id: UUID) -> None:
    task = await get_task_by_id(db, task_id, owner_id)
    await db.delete(task)