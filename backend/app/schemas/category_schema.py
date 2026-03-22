from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CategoryBase(BaseModel):
    """Campos base compartidos entre creación y actualización."""

    name: str


class CategoryCreate(CategoryBase):
    """Schema para crear una categoría. Hereda los campos de CategoryBase."""

    pass


class CategoryUpdate(BaseModel):
    """Schema para actualizar una categoría. Todos los campos son opcionales."""

    name: Optional[str] = None


class CategoryResponse(CategoryBase):
    """Schema de respuesta. Incluye campos generados por la base de datos."""

    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        # Permite que Pydantic lea datos desde objetos ORM (SQLAlchemy)
        from_attributes = True