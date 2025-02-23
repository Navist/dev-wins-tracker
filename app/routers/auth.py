from fastapi import APIRouter

router = APIRouter()

@router.get("/auth")
async def test_auth():
    return {"message": "Auth route is working!"}
