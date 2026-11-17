"""SQLAlchemy database connection and session utilities.

By default, Exploria uses a local SQLite database named ``exploria.db``
inside the AI_BACKEND directory. Set DATABASE_URL in the environment to
use another SQLAlchemy-supported database, such as PostgreSQL.
"""

import os
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

# Load AI_BACKEND/.env when this module is imported.
BACKEND_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BACKEND_DIR / ".env")

# SQLite is a convenient local default. A DATABASE_URL in .env overrides it.
DEFAULT_DATABASE_URL = f"sqlite:///{(BACKEND_DIR / 'exploria.db').as_posix()}"
DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL)

# SQLite needs this option when used by FastAPI across request threads.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)

# Import the same Base used by the models folder.
# This supports both running from AI_BACKEND (the recommended setup) and
# importing the package as part of a larger project.
try:
    from models.base import Base
except ModuleNotFoundError:
    from ..models.base import Base


def get_db() -> Generator[Session, None, None]:
    """Yield one database session per FastAPI request and always close it."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables() -> None:
    """Create tables for all registered models if they do not exist yet."""
    # Import model classes so SQLAlchemy registers their table definitions.
    try:
        import models.destination_model  # noqa: F401
        import models.experience_model  # noqa: F401
        import models.user_model  # noqa: F401
    except ModuleNotFoundError:
        from ..models import destination_model, experience_model, user_model  # noqa: F401

    Base.metadata.create_all(bind=engine)
