from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Creates a cryptContext(hashes backend uses shaw256 to encrpt data), 'bcrypt is
# a hashing library
#  deprecated, will deprecate bcrypt if it is outdated, and throw error


def hash_password(password: str) -> str:
    """
    Hashes password to a string
    """
    return pwd_context.hash(password)


def verify_password(password: str, hash_password: str) -> bool:
    """
    Verify password to match hashed password
    """
    return pwd_context.verify(password, hash_password)


def create_access_token(
    subject: Union[str, Any], token_expire: timedelta = None
) -> str:
    """
    Creates access token that expires using access_token_expire_minutes from core/config
    uses the current time from login to set access. Encodes "subject" which is userID, 
    encodes expire token, nbf = not before current time.
    encoded_jwt encripts application with a secret 
    key that only the application only knows.
    """

    if token_expire:
        expire = datetime.utcnow() + token_expire
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "nbf": datetime.utcnow(),
    }

    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate_token(token: str) -> Any:
    payload = jwt.decode(token, key=settings.SECRET_KEY, algorithms=ALGORITHM)
    return payload
