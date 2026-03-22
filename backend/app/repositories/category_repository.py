from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category_schema import CategoryCreate, CategoryUpdate


class CategoryRepository:
    """Repositorio de categorías. Único punto de acceso a la base de datos para esta entidad."""

    def __init__(self, db: Session):
        # Sesión de base de datos inyectada desde el exterior (principio de inversión de dependencias)
        self.db = db

    def get_all(self) -> list[Category]:
        """Retorna todas las categorías registradas."""
        return self.db.query(Category).all()

    def get_by_id(self, category_id: int) -> Category | None:
        """Retorna una categoría por su ID. Retorna None si no existe."""
        return self.db.query(Category).filter(Category.id == category_id).first()

    def create(self, data: CategoryCreate) -> Category:
        """Crea y persiste una nueva categoría en la base de datos."""
        # Convierte el schema Pydantic a un modelo SQLAlchemy
        category = Category(**data.model_dump())
        self.db.add(category)
        self.db.commit()
        # Refresca el objeto para obtener los campos generados por la DB (id, created_at, updated_at)
        self.db.refresh(category)
        return category

    def update(self, category: Category, data: CategoryUpdate) -> Category:
        """Actualiza los campos de una categoría existente."""
        # Excluye campos no enviados (None) para no sobreescribir datos existentes
        changes = data.model_dump(exclude_unset=True)
        for field, value in changes.items():
            setattr(category, field, value)
        self.db.commit()
        self.db.refresh(category)
        return category

    def delete(self, category: Category) -> None:
        """Elimina una categoría de la base de datos."""
        self.db.delete(category)
        self.db.commit()