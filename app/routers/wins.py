from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/wins", tags=["Wins"])

@router.get("/", response_model=list[schemas.WinResponse])
async def get_wins(db: Session = Depends(get_db)):
    wins = db.query(models.Win).all()
    return wins  # No need to wrap in {"wins": wins}, FastAPI handles it

@router.post("/", response_model=schemas.WinResponse)
async def create_win(win: schemas.WinCreate, db: Session = Depends(get_db)):
    new_win = models.Win(**win.dict())
    db.add(new_win)
    db.commit()
    db.refresh(new_win)
    return new_win
