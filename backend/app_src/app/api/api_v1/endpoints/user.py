from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, schemas, models
from app.api import deps

router = APIRouter()


@router.post("/users/", response_model=schemas.User)
async def create_user(
    *,
    db: AsyncSession = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    current_user: models.User = Depends(deps.validate_current_user)
) -> Any:
    """
    Create a new user in the database.
    """

    user = await crud.user.get_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=400, detail="A user with this username already exists"
        )
    user = await crud.user.create(db, obj_in=user_in)
    return user


@router.delete("/users/{username}", response_model=schemas.User)
async def delete_user(
    *,
    db: AsyncSession = Depends(deps.get_db),
    username: str,
    current_user: models.User = Depends(deps.validate_current_user)
) -> Any:

    if username == current_user.username:
        raise HTTPException(
            status_code=400, detail="Can't delete yourself"
        )
    user = await crud.user.get_by_username(db, username=username)
    if not user:
        raise HTTPException(
            status_code=404, detail="No user found"
        )
    user_deleted = await crud.user.remove(db, id=user.id)
    return user_deleted

@router.get("/users/me", response_model=schemas.User)
async def read_user_self(
    db: AsyncSession = Depends(deps.get_db),
    current_user: models.User = Depends(deps.validate_current_user),
) -> Any:
    """
    Returns the current logged in user.
    """
    return current_user