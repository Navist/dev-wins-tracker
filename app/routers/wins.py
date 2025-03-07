from fastapi import APIRouter, Depends, HTTPException
from app.checks import check_admin, check_db_user, get_db
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select
from app.schemas import WinResponse, WinDelete, WinDeleteResponse, WinUpdate, WinCreateSQL, WinCategoryPost 
from app.models import Win, CustomCategory, PredefinedCategory
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


@router.post("/create/", response_model=WinCreateSQL)
def create_win(win: WinCategoryPost, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    # Should check to see if user already has a category description so we don't create duplicates
    # This will be called to create a new win when the user wants to add one but the categories will be pulled from both predefined sql table and custom categories.
    # An option on the drop down menu will include "Create New Category" or similar for creating custom.
    # Current method of posting doesn't require that the category already exist inside the predefined or custom tables but will be added later.

    check_predef_exists = db.query(PredefinedCategory).filter(PredefinedCategory.name == win.category).first()
    check_custom_exists = db.query(CustomCategory).filter(CustomCategory.name == win.category).first()

    if not check_predef_exists and not check_custom_exists:
        raise HTTPException(status_code=404, detail="Category not found")

    db_win = Win(
        user_id=token_data["user_id"],
        title=win.title,
        category=win.category,
        description=win.description
    )
    db.add(db_win)
    db.commit()
    db.refresh(db_win)
    return db_win


@router.get("/read/all", response_model=list[WinResponse])
def read_wins(db: Session = Depends(get_db), token_data: dict=Depends(verify_token)):
    user_wins = db.query(Win).filter(Win.user_id == token_data['user_id']).all()

    if len(user_wins) <= 0:
        raise HTTPException(status_code=404, detail="Create some memories!")

    return user_wins


@router.get("/read/filtered", response_model=list[WinResponse])
def read_win(win: WinResponse, db: Session = Depends(get_db), token_data: dict=Depends(verify_token)):
    Win_table = db.query(Win)
    user_wins = Win_table.filter(Win.user_id == token_data['user_id'])
    specific_category = user_wins.filter(Win.category.ilike(f"%{win.category}%")).all()


    if len(specific_category) <= 0:
        raise HTTPException(status_code=404, detail="Create some memories!")

    return specific_category

@router.put("/update/", response_model=WinResponse)
def update_win(win: WinUpdate, db: Session = Depends(get_db), token_data: dict=Depends(verify_token)):
    
    
    predef_cat_exists = db.query(PredefinedCategory).where(PredefinedCategory.name == win.category).first()

    custom_cat_exists = db.query(CustomCategory).where(CustomCategory.name == win.category).first()

    if not predef_cat_exists and not custom_cat_exists:
        raise HTTPException(status_code=404, detail="Category not found.")

    user_wins = db.query(Win).filter(Win.user_id == token_data['user_id'])

    specific_win = user_wins.filter_by(id=win.id).first()

    cur_title = specific_win.title
    cur_category = specific_win.category
    cur_description = specific_win.description

    if not specific_win:
        raise HTTPException(status_code=404, detail="No wins with that id found.")

    # Needs a check for whether or not the category being pushed exists.
    specific_win.title = win.title
    specific_win.category = win.category
    specific_win.description = win.description
    # Choose variable and alter it before commit to update

    db.commit()

    return specific_win
    # return {'message': f"Your win has been updated! From: '{cur_category}' '{cur_title}':'{cur_description}' to '{win.category}' '{win.title}':'{win.description}'"}


@router.delete("/delete/{win_id}", response_model=WinDeleteResponse)
def delete_win(win_id: int, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    user_wins = db.query(Win).filter(Win.user_id == token_data['user_id'])

    specific_win = user_wins.filter_by(id=win_id).first()

    if not specific_win:
        raise HTTPException(status_code=404, detail="No wins with that ID found.")

    response_data = {
        "category": specific_win.category,
        "description": specific_win.description,
        "reason": "deleted"
    }

    db.delete(specific_win)
    db.commit()

    return response_data


