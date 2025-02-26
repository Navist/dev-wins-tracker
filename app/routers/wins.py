from fastapi import APIRouter, Depends, HTTPException
from app.checks import check_admin, check_db_user, get_db
from sqlalchemy.orm import Session
from app.schemas import WinResponse, CustomCategoryCreate, WinCreate
from app.models import User, Win, CustomCategory
from app.security import verify_token

router = APIRouter(
    prefix="/wins",
    tags=['Wins']
)


# Create a delete_card function that both the user and admin can delete

# @router.post("/", response_model=WinResponse)
# def create_card(card: WinCardCreate, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
#     # Need to get user before trying to assign card
#     db_user = check_db_user(db, token_data)


@router.post("/", response_model=WinResponse)
def create_win(win: WinCreate, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    # Should check to see if user already has a category description so we don't create duplicates

    # db_win_exists = db.query(Win).filter(win.category_name == )

    # if db_win_exists:
    #     raise HTTPException(status_code=409, detail="Category description already exists")

    db_win = Win(
        user_id=token_data["user_id"],
        category_name=win.category_name,
        description=win.description,
        category_id=win.category_id,
        category_type=win.category_type
    )
    db.add(db_win)
    db.commit()
    db.refresh(db_win)
    return db_win



def read_win():
    pass

def update_win():
    pass


def delete_win():
    pass

