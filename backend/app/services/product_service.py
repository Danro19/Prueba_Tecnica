from fastapi import HTTPException, status
from app.repositories.product_repository import ProductRepository
from app.repositories.category_repository import CategoryRepository
from app.schemas.product_schema import ProductCreate, ProductUpdate
from app.models.product import Product


class ProductService:
    """Capa de lógica de negocio para productos."""

    def __init__(self, product_repository: ProductRepository, category_repository: CategoryRepository):
        # Repositorios inyectados desde el exterior (principio de inversión de dependencias)
        self.product_repository = product_repository
        self.category_repository = category_repository

    def get_all(self) -> list[Product]:
        """Retorna todos los productos."""
        return self.product_repository.get_all()

    def get_by_id(self, product_id: int) -> Product:
        """Retorna un producto por ID. Lanza 404 si no existe."""
        product = self.product_repository.get_by_id(product_id)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Producto con id {product_id} no encontrado."
            )
        return product

    def create(self, data: ProductCreate) -> Product:
        """Crea un nuevo producto. Valida código único y existencia de categoría."""
        # Valida que el código no esté en uso
        if self.product_repository.get_by_code(data.code):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Ya existe un producto con el código '{data.code}'."
            )
        # Valida que la categoría exista
        if not self.category_repository.get_by_id(data.category_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Categoría con id {data.category_id} no encontrada."
            )
        return self.product_repository.create(data)

    def update(self, product_id: int, data: ProductUpdate) -> Product:
        """Actualiza un producto existente. Valida código único y existencia de categoría."""
        product = self.get_by_id(product_id)

        # Valida código único solo si se está cambiando
        if data.code and data.code != product.code:
            if self.product_repository.get_by_code(data.code):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Ya existe un producto con el código '{data.code}'."
                )

        # Valida que la categoría exista solo si se está cambiando
        if data.category_id and not self.category_repository.get_by_id(data.category_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Categoría con id {data.category_id} no encontrada."
            )

        return self.product_repository.update(product, data)

    def delete(self, product_id: int) -> None:
        """Elimina un producto. Lanza 404 si no existe."""
        product = self.get_by_id(product_id)
        self.product_repository.delete(product)