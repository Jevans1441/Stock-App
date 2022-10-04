from typing import Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.security import hash_password, verify_password
from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    async def create(self, db: AsyncSession, *, obj_in: UserCreate) -> User:
        """
        Hashes password and creates user in database
        """
        obj_in_data = jsonable_encoder(obj_in)
        obj_in_data["hashed_password"] = hash_password(obj_in.password)
        # hashes user password
        del obj_in_data["password"]
        # deletes unhashed password
        db_obj = User(**obj_in_data)
        # All data put into user call makes a user object
        db.add(db_obj)
        # adds user in orm
        await db.commit()
        # adds user to database
        await db.refresh(db_obj)
        # refreshes object in memory store
        return db_obj

    async def get_by_username(
        self, db: AsyncSession, *, username: str
    ) -> Optional[User]:
        """
        Searches through database to select from users to find username provided
        If it doesn't find username returns none.
        """
        obj = await db.execute(
            select(self.model).filter(self.model.username == username).limit(1)
        )
        return obj.scalars().first()

    async def authenticate(
        self, db: AsyncSession, *, username: str, password: str
    ) -> Optional[User]:
        """
        Authenticate username and password that was provided
        Look in database that user provided to
        to check if it is correct.
        """
        user = await self.get_by_username(db, username=username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user


user = CRUDUser(User)
