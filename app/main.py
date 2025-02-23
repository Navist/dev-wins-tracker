from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import get_db, Base, engine
from app.models import DevWin
from app.schemas import DevWinCreate, DevWinResponse

# Initialize FastAPI app
app = FastAPI(title="Dev Wins Tracker API", version="1.0.0")

# Create database tables if they don’t exist
Base.metadata.create_all(bind=engine)

# API Endpoint: Fetch all dev wins
@app.get("/wins", response_model=list[DevWinResponse])
def get_wins(db: Session = Depends(get_db)):
    return db.query(DevWin).all()

# API Endpoint: Add a new dev win
@app.post("/wins", response_model=DevWinResponse)
def add_win(win: DevWinCreate, db: Session = Depends(get_db)):
    new_win = DevWin(**win.dict())
    db.add(new_win)
    db.commit()
    db.refresh(new_win)
    return new_win
