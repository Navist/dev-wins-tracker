from fastapi import FastAPI
from app.routers import users

app = FastAPI()


app.include_router(users.router)


# Displays how it's possible to add FastAPI functions inside the main py but it's easier and more modular to do it inside their own router files.
# @app.get("/")
# async def root():
#     return {"message": "Welcome to Dev Wins Tracker API 🚀"}
