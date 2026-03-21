from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional
from app.schemas.category_schema import CategoryResponse


class ProductBase(BaseModel):
    """Campos base compartidos entre creación y actualización."""

    code: str
    name: str
    price: float
    category_id: int


class ProductCreate(ProductBase):
    """Schema para crear un producto. Hereda los campos de ProductBase."""

    pass


class ProductUpdate(BaseModel):
    """Schema para actualizar un producto. Todos los campos son opcionales."""

    code: Optional[str] = None
    name: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None


class ProductResponse(ProductBase):
    """Schema de respuesta. Incluye campos generados por la base de datos y la categoría anidada."""

    id: int
    # Retorna el objeto categoría completo en lugar de solo el ID
    category: CategoryResponse
    created_at: datetime
    updated_at: datetime

    class Config:
        # Permite que Pydantic lea datos desde objetos ORM (SQLAlchemy)
        from_attributes = True