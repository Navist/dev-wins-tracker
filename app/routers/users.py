from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.models import User, Subscriber
from app.checks import check_admin, check_db_user, get_db
from app.schemas import UserCreate, UserResponse, UserUpdate, UserLogin, UserPasswordUpdate
from app.security import (
    hash_password, 
    verify_password, 
    create_access_token, 
    create_refresh_token, 
    verify_token, 
    SECRET_KEY, 
    ALGORITHM
    )
import jwt


# Creating an API router for users
router = APIRouter(
    prefix="/users",
    tags=['Users']
)



# Creates the API call for creating an actual user. Also responds with the information they put in?
@router.post("/create/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        username=user.username, 
        email=user.email, 
        password_hash=hash_password(user.password)
        )
    


    db.add(db_user)
    db.commit()    
    db.refresh(db_user)
    sub_status = Subscriber(
        user_id = db_user.id
    )

    db.add(sub_status)
    db.commit()

    return db_user


@router.post("/login/")
def login(user: UserLogin, db: Session= Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    try:
        if not db_user.access_token == 'revoked' and db_user.access_token != None:
            jwt.decode(db_user.access_token, SECRET_KEY, algorithms=[ALGORITHM])
            jwt.decode(db_user.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
            return db_user #{"access_token": db_user.access_token, "refresh_token": db_user.refresh_token, "token_type": "bearer"}
    except jwt.ExpiredSignatureError:
        pass

    access_token = create_access_token(data={"sub": db_user.email, "user_id": db_user.id})
    refresh_token = create_refresh_token(db_user.id)


    db_user.access_token=access_token
    db_user.refresh_token=refresh_token

    db.commit()
    db.refresh(db_user)

    return db_user #{"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


@router.post("/logout/")
def logout(db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    db_user = check_db_user(db, token_data)

    if not db_user:
        return db_user
    
    db_user.access_token = 'revoked'
    db_user.refresh_token = 'revoked'

    db.commit()
    return {"message": "Successfully logged out"}


@router.post("/refresh/")
def refresh_token(db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    if token_data.get("type") != "refresh":
        raise HTTPException(status_code=400, detail="Invalid refresh token")
    
    db_user = check_db_user(db, token_data)

    if not db_user:
        return db_user

    new_access_token = create_access_token(data={"user_id": token_data["user_id"]})

    db_user.access_token = new_access_token

    db.commit()
    db.refresh(db_user)

    return {"access_token": new_access_token, "token_type": "bearer"}


# Queries the current database for all user information
@router.get("/get/all", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    check_admin(db, token_data)

    return db.query(User).all()

@router.get("/get/")
def get_user(db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    db_user = check_db_user(db, token_data)

    return db_user


# Updating an existing user. If there is no existing user, raise 404 error stating User not found
@router.put("/{user_id}/", response_model=UserResponse)
def update_user(
    user_id: int, 
    updated_user: UserUpdate, 
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    if token_data["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access Denied.")

    db_user = check_db_user(db, token_data)

    if not db_user:
        return db_user
    
    db_user.username = updated_user.username or db_user.username
    db_user.email = updated_user.email or db_user.email
    
    db.commit()
    db.refresh(db_user)

    return db_user

@router.put("/{user_id}/password", response_model=dict)
def update_password(
    updated_user: UserPasswordUpdate, 
    db: Session= Depends(get_db),
    token_data: dict = Depends(verify_token)
):
    
    db_user = check_db_user(db, token_data)

    if not db_user:
        return db_user

    if token_data["user_id"] != db_user.id:
        raise HTTPException(status_code=403, detail="Access Denied.")

    if not verify_password(updated_user.current_password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    db_user.password_hash = hash_password(updated_user.new_password)
    db.commit()
    db.refresh(db_user)

    return {"message": "Password updated successfully."}


@router.delete("/delete/")
def delete_user(
    username: str, 
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    db_user = db.query(User).filter_by(username=username).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")

    if token_data["sub"] != db_user.email:
        check_admin(db, token_data)
        # raise HTTPException(status_code=403, detail="Access Denied.")

    
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}


@router.put("/{user_id}/promote/", response_model=dict)
def promote_user(
    user_id: int, 
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):
    # Ensure only admins can promote others
    check_admin(db, token_data)

    target_user = db.query(User).filter(User.id == user_id).first()

    if not target_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Promote the user to admin
    target_user.permission_level = "admin"
    db.commit()
    db.refresh(target_user)

    return {"message": f"User {target_user.username} is now an admin."}
