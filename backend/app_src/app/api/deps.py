from typing import AsyncGenerator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, models, schemas
from app.core import security
from app.core.config import settings
from app.db.session import SessionLocal

reusable_oath2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)
# tells where OATH2 access token is located


async def get_db() -> AsyncGenerator:
    async with SessionLocal() as session:
        try:
            yield session
        except:  # noqa: E722
            await session.rollback()
            raise
        else:
            await session.commit()


async def validate_current_user(
    db: AsyncSession = Depends(get_db), token: str = Depends(reusable_oath2)
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = security.validate_token(token)
        user_id: int = payload.get("sub")
        # returns sub if inside value, if not sub returns nothing
        if user_id is None:
            raise credentials_exception
            # checks to see if token has a sub
        token_data = schemas.TokenPayload(id=user_id)
    except (jwt.JWTError, ValidationError):
        raise credentials_exception
    user = await crud.user.get(db, id=token_data.id)
    if user is None:
        raise credentials_exception
    return user
