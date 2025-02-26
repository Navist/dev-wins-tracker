from fastapi import APIRouter, Depends, HTTPException
from app.checks import check_admin, check_db_user, get_db
from sqlalchemy.orm import Session
from app.schemas import CustomCategoryCreate, CategoryResponse
from app.models import Win, CustomCategory, PredefinedCategory
from app.security import verify_token

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/categories/{category_name}", response_model=dict)
def create_category(category_name: str, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    # We need to check if the user already has a category with that name
    # If the category name is in predefined we set category_type == "predefine"
    category_entry = db.query(Win).filter(Win.description == category_name).first()

    if category_entry:
        raise HTTPException(status_code=403, detail="Category already exists.")


@router.delete("/categories/{category_id}", response_model=dict)
def delete_category(category_id: int, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    category_entry = db.query(Win).filter(Win.category_id == category_id).first()

    if not category_entry:
        raise HTTPException(status_code=404, detail="Category not found.")
    
    if category_entry.category_type == "custom":
        custom_category = db.query(CustomCategory).filter(CustomCategory.id == category_id).first()

        if custom_category:
            db.delete(custom_category)

            db.commit()
            return {"message": f"Custom category '{custom_category.name}' deleted successfully."}
        

    raise HTTPException(status_code=403, detail="Cannot delete predfined categories.")