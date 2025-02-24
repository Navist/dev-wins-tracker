from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from app.schemas import UserCreate, UserResponse, UserUpdate


# Creating an API router for users
router = APIRouter(
    prefix="/users",
    tags=['Users']
)


# Establishing a connection, if it fails, close the connection.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# Creates the API call for creating an actual user. Also responds with the information they put in?
@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(username=user.username, email=user.email, password_hash=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Queries the current database for all user information
@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


# Updating an existing user. If there is no existing user, raise 404 error stating User not found
@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.username = updated_user.username or user.username
    user.email = updated_user.email or user.email
    db.commit()
    db.refresh(user)

    return user


@router.delete("/{user_id}", response_model=dict)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}