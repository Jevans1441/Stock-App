from typing import Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    async def create(self, db: AsyncSession, *, obj_in: UserCreate) -> User:
        obj_in_data = jsonable_encoder(obj_in)
        obj_in_data["hashed_password"] = obj_in.password
        del obj_in_data["password"]
        db_obj = User(**obj_in_data)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def get_by_username(
        self, db: AsyncSession, *, username: str
    ) -> Optional[User]:
        obj = await db.execute(
            select(self.model).filter(self.model.username == username).limit(1)
        )
        return obj.scalars().first()


user = CRUDUser(User)
