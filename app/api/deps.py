from typing import AsyncGenerator

from app.db.session import SessionLocal


async def get_db() -> AsyncGenerator:
    async with SessionLocal() as session:
        try:
            yield session
        except:  # noqa: E722
            await session.rollback()
            raise
        else:
            await session.commit()
