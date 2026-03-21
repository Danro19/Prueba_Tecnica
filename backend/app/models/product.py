from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Product(Base):
    """Product entity."""

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    category = relationship("Category", back_populates="products")