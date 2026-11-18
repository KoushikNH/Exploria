"""Locally hosted short travel experiences and activities."""

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class Experience(Base):
    """A bookable micro-experience offered by a local host."""

    __tablename__ = "experiences"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(80), index=True, nullable=False)
    duration_hours: Mapped[int] = mapped_column(Integer, nullable=False)
    price_per_person: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    max_group_size: Mapped[int] = mapped_column(Integer, default=10, nullable=False)
    meeting_point: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="pending", nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    host_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    destination_id: Mapped[int] = mapped_column(
        ForeignKey("destinations.id"), nullable=False, index=True
    )

    host: Mapped["User"] = relationship(back_populates="hosted_experiences")
    destination: Mapped["Destination"] = relationship(back_populates="experiences")
