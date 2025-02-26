from fastapi import FastAPI
from app.routers import users, wins, categories

app = FastAPI()


app.include_router(users.router)
app.include_router(wins.router)
app.include_router(categories.router)


# Displays how it's possible to add FastAPI functions inside the main py but it's easier and more modular to do it inside their own router files.
# @app.get("/")
# async def root():
#     return {"message": "Welcome to Dev Wins Tracker API 🚀"}
