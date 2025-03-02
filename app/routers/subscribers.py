from fastapi import APIRouter, Depends, HTTPException
from app.checks import check_admin, check_db_user, get_db
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import select
from app.schemas import SubUpgrade, SubDelete, SubCreate, SubResponse
from app.models import Subscriber
from app.security import verify_token
from app.database import sub_tiers



router = APIRouter(
    prefix="/subscribers",
    tags = ["Subscriber"]
    )



@router.get("/read/")
async def get_subscription(target: SubResponse, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    sub_status = None
    
    if target.user_id == 'all':
        check_admin(db, token_data)
        sub_status = db.query(Subscriber).all()
    
    if target.user_id != token_data['user_id']:
        raise HTTPException(status_code=403, detail="Not the owner of this account")
    else:
        sub_status = db.query(Subscriber).where(Subscriber.user_id == token_data['user_id']).first()

    return {"message": f"Current subscription status for {token_data['sub']} is {sub_status.subscription_tier}"}


# Assume a sub entry already exists for all users
@router.put("/create_sub")
async def create_subscription(sub_tier: SubUpgrade, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    db_user_sub = db.query(Subscriber).where(Subscriber.user_id == token_data['user_id']).first()

    if not db_user_sub:
        raise HTTPException(status_code=404, detail="User subscription details not found.")
    
    if not sub_tiers.get(sub_tier.subscription_tier):
        raise HTTPException(status_code=404, detail="Subscription tier not found.")

    db_user_sub.subscription_tier = sub_tier.subscription_tier

    db.commit()

    db.refresh(db_user_sub)



# Just sets a user back to free
@router.delete("/delete")
async def delete_subscription(db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    pass


# Promotes a user, admin only!
@router.put("/promote")
async def promote_subscription(promote_target: SubUpgrade, db: Session = Depends(get_db), token_data: dict = Depends(verify_token)):
    check_admin(db, token_data)

    db_user = db.query(Subscriber).where(Subscriber.user_id == promote_target.user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")

    db_user.subscription_tier = promote_subscription

    db.commit()
    db.refresh(db_user)

    return db_user