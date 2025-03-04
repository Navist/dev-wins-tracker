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

class UserLogin(BaseModel):
    email: EmailStr
    password: str

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

class CategoryUpdate(BaseModel):
    name: str
    newname: str

class CategoryResponse(BaseModel):
    pass

class WinCreate(BaseModel):
    title: str = Field(..., min_length=4, max_length=60)
    category: str
    description: str

class WinUpdate(BaseModel):
    id: int
    title: str = Field(..., min_length=4, max_length=60)
    category: str
    description: str


class WinDelete(BaseModel):
    id: int

class WinDeleteResponse(BaseModel):
    category: str
    description: str
    reason: Optional[str] = None


class WinResponse(BaseModel):
    id: int
    title: str
    category: str
    description: str


class SubCreate(BaseModel):
    user_id: int
    subscription_tier: str


class SubUpdate(BaseModel):
    user_id: int
    subscription_tier: str

class SubDelete(BaseModel):
    user_id: int


# Admins can upgrade a person
class SubUpgrade(BaseModel):
    user_id: int
    subscription_tier: str


class SubResponse(BaseModel):
    user_id: int
    subscription_tier: str
