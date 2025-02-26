from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str = Field(..., min_length=4, max_length=32, description="Username must be between 4 and 32 characters long.")
    email: EmailStr
    password: str = Field(..., 
        min_length=8, 
        description="Password must be at least 8 characters long."
        )


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    

class UserPasswordUpdate(BaseModel):
    email: EmailStr
    current_password: str
    new_password: str = Field(..., 
        min_length=8, 
        description="Password must be at least 8 characters long."
        )

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=4, max_length=60)
    description: str

class CategoryGeneric(BaseModel):
    name: str

class CategoryResponse(BaseModel):
    pass

class WinCreate(BaseModel):
    category: str
    description: str

class WinDelete(BaseModel):
    id: int

class WinDeleteResponse(BaseModel):
    category: str
    description: str
    reason: Optional[str] = None


class WinResponse(BaseModel):
    category: str
    description: str