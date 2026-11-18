"""Destination information stored by Exploria."""

from datetime import datetime

from sqlalchemy import DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class Destination(Base):
    """A place that tourists can discover in Exploria."""

    __tablename__ = "destinations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(150), index=True, nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    country: Mapped[str] = mapped_column(String(100), default="India", nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    best_time_to_visit: Mapped[str | None] = mapped_column(String(150), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    experiences: Mapped[list["Experience"]] = relationship(
        back_populates="destination", cascade="all, delete-orphan"
    )
