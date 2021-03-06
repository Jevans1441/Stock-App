from fastapi import APIRouter


from app.api.api_v1.endpoints import user, login

api_router = APIRouter()
api_router.include_router(user.router, tags=["users"])
api_router.include_router(login.router, tags=["login"])
