from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, schemas
from app.core.config import settings
from app.db import base  # noqa: F401


async def init_db(db: AsyncSession) -> None:
    # Tables should be created with Alembic migrations

    user = await crud.user.get_by_username(db, username=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            username=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
        )
        user = await crud.user.create(db, obj_in=user_in)  # noqa: F841