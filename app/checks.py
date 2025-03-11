from fastapi import HTTPException
from app.database import SessionLocal
from app.models import User

def check_db_user(db, token_data):

    db_user = db.query(User).filter(User.id == token_data["user_id"]).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user

def check_admin(db, token_data):
    db_user = check_db_user(db, token_data)

    if db_user.permission_level != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")
    
    return db_user


# Establishing a connection, if it fails, close the connection.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()