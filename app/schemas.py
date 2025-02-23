from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Schema for creating a new win
class WinCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str

# Schema for returning win data
class WinResponse(WinCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class DevWinCreate(BaseModel):
    title: str
    description: str | None = None

class DevWinResponse(DevWinCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True