from pydantic import BaseModel, UUID4
from typing import Optional
from datetime import datetime
from enum import Enum


class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class StatusEnum(str, Enum):
    todo = "todo"
    in_progress = "in_progress"
    completed = "completed"


# --- Base ---
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: StatusEnum = StatusEnum.todo
    priority: PriorityEnum = PriorityEnum.medium
    due_date: Optional[datetime] = None


# --- Create Request ---
class TaskCreate(TaskBase):
    pass


# --- Update Request ---
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[StatusEnum] = None
    priority: Optional[PriorityEnum] = None
    due_date: Optional[datetime] = None
    is_archived: Optional[bool] = None


# --- Response ---
class TaskResponse(TaskBase):
    id: UUID4
    is_archived: bool
    owner_id: UUID4
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


# --- List Response ---
class TaskListResponse(BaseModel):
    tasks: list[TaskResponse]
    total: int
    page: int
    per_page: int