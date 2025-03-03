from fastapi import FastAPI
from app.routers import users, wins, categories, subscribers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://editforpublicdomainlater.com",
]

app.include_router(users.router)
app.include_router(categories.router)
app.include_router(subscribers.router)
app.include_router(wins.router)


app.add_middleware(
    CORSMiddleware,
    # Specifying what URLs will be allowed to make requests
    allow_origins = origins,
    # Allows the passing of credentials, such as OAuth
    allow_credentials = True,
    # What methods are going to be allow: get, post, update, delete...
    allow_methods = ["*"],
    # We only accept one kind of header now so might change this later to add a minor layer of security
    allow_headers=["*"],
)
