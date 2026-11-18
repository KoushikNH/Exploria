"""Shared SQLAlchemy declarative base for Exploria database models."""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class inherited by all database models."""

    pass
