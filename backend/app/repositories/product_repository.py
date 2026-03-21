from sqlalchemy.orm import Session, joinedload
from app.models.product import Product
from app.schemas.product_schema import ProductCreate, ProductUpdate


class ProductRepository:
    """Repositorio de productos. Único punto de acceso a la base de datos para esta entidad."""

    def __init__(self, db: Session):
        # Sesión de base de datos inyectada desde el exterior (principio de inversión de dependencias)
        self.db = db

    def get_all(self) -> list[Product]:
        """Retorna todos los productos con su categoría cargada (eager loading)."""
        # joinedload evita el problema N+1 al cargar la relación category en una sola query
        return self.db.query(Product).options(joinedload(Product.category)).all()

    def get_by_id(self, product_id: int) -> Product | None:
        """Retorna un producto por su ID incluyendo su categoría. Retorna None si no existe."""
        return (
            self.db.query(Product)
            .options(joinedload(Product.category))
            .filter(Product.id == product_id)
            .first()
        )

    def get_by_code(self, code: str) -> Product | None:
        """Retorna un producto por su código único. Usado para validar duplicados."""
        return self.db.query(Product).filter(Product.code == code).first()

    def create(self, data: ProductCreate) -> Product:
        """Crea y persiste un nuevo producto en la base de datos."""
        # Convierte el schema Pydantic a un modelo SQLAlchemy
        product = Product(**data.model_dump())
        self.db.add(product)
        self.db.commit()
        # Refresca el objeto para obtener los campos generados por la DB (id, created_at, updated_at)
        self.db.refresh(product)
        return product

    def update(self, product: Product, data: ProductUpdate) -> Product:
        """Actualiza los campos de un producto existente."""
        # Excluye campos no enviados (None) para no sobreescribir datos existentes
        changes = data.model_dump(exclude_unset=True)
        for field, value in changes.items():
            setattr(product, field, value)
        self.db.commit()
        self.db.refresh(product)
        return product

    def delete(self, product: Product) -> None:
        """Elimina un producto de la base de datos."""
        self.db.delete(product)
        self.db.commit()