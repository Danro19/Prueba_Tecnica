from fastapi import HTTPException, status
from app.repositories.category_repository import CategoryRepository
from app.schemas.category_schema import CategoryCreate, CategoryUpdate
from app.models.category import Category


class CategoryService:
    """Capa de lógica de negocio para categorías."""

    def __init__(self, repository: CategoryRepository):
        # Repositorio inyectado desde el exterior (principio de inversión de dependencias)
        self.repository = repository

    def get_all(self) -> list[Category]:
        """Retorna todas las categorías."""
        return self.repository.get_all()

    def get_by_id(self, category_id: int) -> Category:
        """Retorna una categoría por ID. Lanza 404 si no existe."""
        category = self.repository.get_by_id(category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Categoría con id {category_id} no encontrada."
            )
        return category

    def create(self, data: CategoryCreate) -> Category:
        """Crea una nueva categoría."""
        return self.repository.create(data)

    def update(self, category_id: int, data: CategoryUpdate) -> Category:
        """Actualiza una categoría existente. Lanza 404 si no existe."""
        # Primero verifica que la categoría exista
        category = self.get_by_id(category_id)
        return self.repository.update(category, data)

    def delete(self, category_id: int) -> None:
        """Elimina una categoría. Lanza 404 si no existe."""
        category = self.get_by_id(category_id)
        self.repository.delete(category)