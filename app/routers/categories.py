from fastapi import APIRouter, Depends, HTTPException
from app.checks import check_admin, check_db_user, get_db
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import exists
from app.schemas import CategoryCreate, CategoryResponse, CategoryGeneric, CategoryUpdate
from app.models import User, CustomCategory, PredefinedCategory
from app.security import verify_token
from app.database import sub_tiers

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/create/custom_category/", response_model=dict)
def create_custom_category(category: CategoryCreate, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    category_db = db.query(CustomCategory)
    category_exists = category_db.filter(CustomCategory.name == category.name).first()

    if category_exists:
        raise HTTPException(status_code=409, detail="Category already exists")
    
    db_user = db.query(User).filter_by(id=token_data['user_id']).first()
    number_of = category_db.filter_by(user_id=token_data['user_id']).count()

    if number_of >= sub_tiers.get(db_user.subscription_tier, 0):
        raise HTTPException(status_code=403, detail="Max number of categories reached. Consider upgrading to a higher tier for more customization!")

    create_category = CustomCategory(
        user_id = token_data['user_id'],
        name = category.name,
        description = category.description
    )

    db.add(create_category)
    db.commit()
    
    return {"message": f"'{category.name}' with description '{category.description}' successfully created!"}


@router.post("/create/predefined_category/", response_model=dict)
def create_predefined_category(category: CategoryCreate, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):

    check_admin(db, token_data)

    # We need to check if the user already has a category with that name
    # If the category name is in predefined we set category_type == "predefine"
    category_entry = db.query(PredefinedCategory).filter(PredefinedCategory.name == category.name).first()

    if category_entry:
        raise HTTPException(status_code=403, detail="Category already exists.")
    
    create_predefined = PredefinedCategory(
        name = category.name,
        description = category.description
    )

    db.add(create_predefined)
    db.commit()

    return {"message": f"Created {category.name} with description: {category.description}"}



@router.delete("/delete/custom_category", response_model=dict)
def delete_category(category: CategoryGeneric, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    # Find all categories the user has, if category_name exists, delete it, otherwise raise HTTPException NOT FOUND
    user_categories = db.query(CustomCategory).filter(CustomCategory.user_id == token_data['user_id']).filter(CustomCategory.name == category.name).first()
    
    if not user_categories:
        raise HTTPException(status_code=404, detail=f"No category with name '{category.name}' found.")


    db.delete(user_categories)
    db.commit()

    return {"message": f"'{category.name}' succesfully deleted."}



@router.delete("/delete/predefined_category", response_model=dict)
def delete_category(category: CategoryGeneric, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):

    check_admin(db, token_data)

    predefined_category = db.query(PredefinedCategory).filter(category.name == PredefinedCategory.name).first()

    if not predefined_category:
        raise HTTPException(status_code=404, detail=f"'{category.name}' not found.")

    db.delete(predefined_category)
    db.commit()

    return {"message": f"'{category.name}' successfully delete."}


@router.get("/read/custom_categories")
def read_custom_categories(db: Session= Depends(get_db), token_data: dict= Depends(verify_token)):
    
    user_categories = db.query(CustomCategory).filter(CustomCategory.user_id == token_data['user_id']).all()

    if len(user_categories) <= 0:
        return {"message": "No categories found."}

    return user_categories


@router.get("/read/predefined_categories")
def read_custom_categories(db: Session= Depends(get_db), token_data: dict= Depends(verify_token)):
    check_admin(db, token_data)
    
    predefined_categories = db.query(PredefinedCategory).all()

    return predefined_categories


@router.get("/read/all/")
def read_all_categories(db: Session = Depends(get_db), token_data: dict= Depends(verify_token)):

    user_categories = db.query(CustomCategory).where(CustomCategory.user_id == token_data['user_id']).all()

    predefined_categories = db.query(PredefinedCategory).all()

    all_categories = user_categories + predefined_categories

    return all_categories
    

@router.put("/update")
def update_category(category: CategoryUpdate, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):

    # Take a user input and adjust the category name if it is their category to alter.
    # Needs to update all existing win entries to that new category.
    db_predef = db.query(PredefinedCategory).where(PredefinedCategory.name == category.name).first()

    # Admins should have the ability to edit user categories?
    db_custom = db.query(CustomCategory).filter(CustomCategory.name == category.name, CustomCategory.user_id == token_data['user_id']).first()

    db_new_custom = db.query(exists().where(
        (CustomCategory.name == category.newname) & 
        (CustomCategory.user_id == token_data['user_id'])
        )
        ).scalar()
    db_new_predef = db.query(exists().where(
        PredefinedCategory.name == category.newname)
        ).scalar()

    if db_new_custom or db_new_predef:
        raise HTTPException(status_code=409, 
                            detail=f"Category '{category.newname}' already exists.")

    if not db_predef and not db_custom:
        raise HTTPException(status_code=404, 
                            detail=f"Category '{category.name}' not found.")
    

    if db_predef:
        check_admin(db, token_data)
        db_predef.name = category.newname

    if db_custom:
        
        db_custom.name = category.newname

    db.commit()

    return {"message": f"Updated {category.name} to {category.newname} successfully"}